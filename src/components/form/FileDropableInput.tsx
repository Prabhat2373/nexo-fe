import React from "react";
import { FileUploader } from "react-drag-drop-files";

interface IFileDropableInput {
  onChange?: (file: File) => void;
  multiple?: boolean;
  fileTypes?: string[];
  name?: string;
}

const FileDropableInput = (props: IFileDropableInput) => {
  const defaultFileTypes = ["JPEG", "PNG"];
  return (
    <>
      <FileUploader
        className="w-full"
        classes="file_drop_area"
        {...props}
        handleChange={(file) => {
          if (props?.onChange) {
            props?.onChange(file);
          }
        }}
        // name="file"
        types={props?.fileTypes || defaultFileTypes}
      />
    </>
  );
};

export default FileDropableInput;
