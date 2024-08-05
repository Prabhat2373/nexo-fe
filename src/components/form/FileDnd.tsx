import React, { useState, useRef, ChangeEvent, DragEvent } from "react";

interface FileData {
  file: File;
  preview: string;
}

const FileDnD = ({ onChange, files, setFiles }) => {
  //   const [files, setFiles] = useState<FileData[]>([]);
  const [fileDragging, setFileDragging] = useState<number | null>(null);
  const [fileDropping, setFileDropping] = useState<number | null>(null);
  const dndRef = useRef<HTMLDivElement>(null);

  const humanFileSize = (size: number): string => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (fileDragging !== null && fileDropping !== null) {
      let newFiles = [...files];
      const draggedFile = newFiles.splice(fileDragging, 1)[0];
      newFiles.splice(fileDropping, 0, draggedFile);
      setFiles(newFiles);
      setFileDragging(null);
      setFileDropping(null);
    } else {
      const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }

    if (dndRef.current) {
      dndRef.current.classList.remove(
        "border-blue-400",
        "ring-4",
        "ring-inset"
      );
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setFileDropping(index);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();
    setFileDragging(index);
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dndRef.current) {
      dndRef.current.classList.add("border-blue-400", "ring-4", "ring-inset");
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dndRef.current) {
      dndRef.current.classList.remove(
        "border-blue-400",
        "ring-4",
        "ring-inset"
      );
    }
  };

  return (
    <div className="bg-white p-7 rounded w-9/12 mx-auto">
      <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
        <div
          ref={dndRef}
          className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            accept="*"
            type="file"
            multiple
            className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
            onChange={handleFilesChange}
          />
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <svg
              className="w-6 h-6 mr-1 text-current-50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="m-0">Drag your files here or click in this area.</p>
          </div>
        </div>
        {files.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6">
            {files.map((fileData, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none ${
                  fileDragging === index ? "border-blue-600" : ""
                }`}
                style={{ paddingTop: "100%" }}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
              >
                <button
                  className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                  type="button"
                  onClick={() => removeFile(index)}
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                {fileData?.file?.type?.includes("image/") && (
                  <img
                    className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                    src={fileData.preview}
                    alt="Preview"
                  />
                )}
                {fileData?.file?.type?.includes("audio/") && (
                  <svg
                    className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                )}
                {fileData?.file?.type?.includes("application/") ||
                  (fileData?.file?.type === "" && (
                    <svg
                      className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  ))}
                {fileData?.file?.type?.includes("video/") && (
                  <video
                    className="absolute inset-0 object-cover w-full h-full border-4 border-white pointer-events-none preview"
                    src={fileData?.preview}
                    controls
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                  <span className="w-full font-bold text-gray-900 truncate">
                    {fileData?.file?.name}
                  </span>
                  <span className="text-xs text-gray-900">
                    {humanFileSize(fileData?.file?.size)}
                  </span>
                </div>
                <div
                  className={`absolute inset-0 z-40 transition-colors duration-300 ${
                    fileDropping === index && fileDragging !== index
                      ? "bg-blue-200 bg-opacity-80"
                      : ""
                  }`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDnD;
