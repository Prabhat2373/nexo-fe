import { extractHeadings } from "@/utils/editor/editor.utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TableOfContent = ({ content }) => {
  console.log("content", content);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (content) {
    const extractedHeadings = extractHeadings(content);
      setHeadings(extractedHeadings);
    }
  }, [content]);

  const scrollToHeading = (id) => {
    console.log("clicking", id);
    const headingElement = document.getElementById(id);
    if (headingElement) {
      headingElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  console.log("headings", headings);
  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {headings.map((heading, index) => (
          //   <Link href={"javascript:void(0)"}>
          <li
            onClick={() => scrollToHeading(heading?.id)}
            key={index}
            // style={{ marginLeft: `${(heading.level - 1) * 20}px` }}
            className="max-w-100%"
          >
            {heading.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContent;
