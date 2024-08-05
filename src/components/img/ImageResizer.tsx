// src/components/ImageResizer.tsx
import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import "./ImageResizer.css";

const ImageResizer: React.FC = () => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleDrag = (e: any, ui: any, side: string) => {
    const newWidth = width + ui.deltaX;
    const newHeight = height + ui.deltaY;

    switch (side) {
      case "right":
        setWidth(newWidth);
        break;
      case "bottom":
        setHeight(newHeight);
        break;
      case "bottom-right":
        setWidth(newWidth);
        setHeight(newHeight);
        break;
      default:
        break;
    }
  };

  return (
    <div className="image-resizer-container">
      <div className="image-wrapper" style={{ width, height }}>
        <img
          ref={imageRef}
          src="your-image-source.jpg"
          alt="Resizable"
          style={{ width: "100%", height: "100%" }}
        />
        <Draggable axis="x" onDrag={(e, ui) => handleDrag(e, ui, "right")}>
          <div className="resize-dot resize-right" />
        </Draggable>
        <Draggable axis="y" onDrag={(e, ui) => handleDrag(e, ui, "bottom")}>
          <div className="resize-dot resize-bottom" />
        </Draggable>
        <Draggable onDrag={(e, ui) => handleDrag(e, ui, "bottom-right")}>
          <div className="resize-dot resize-bottom-right" />
        </Draggable>
      </div>
    </div>
  );
};

export default ImageResizer;
