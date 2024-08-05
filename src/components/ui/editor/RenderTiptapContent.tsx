"use client";
import React, { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";

const RenderTiptapContent = ({ content }) => {
  console.log("content", content);
  const output = useMemo(() => {
    return generateHTML(content, [
      Document,
      Paragraph,
      Text,
      Bold,
      // other extensions …
    ]);
  }, [content]);
  console.log("output", output);
  return <div>RenderTiptapContent</div>;
};

export default RenderTiptapContent;
