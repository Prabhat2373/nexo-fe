// export const extractHeadings = (doc) => {
//   const headings = [];

//   const traverse = (node) => {
//     if (node.type === "heading" && node.attrs && node.attrs.level) {
//       const textNode = node.content.find((n) => n.type === "text");
//       if (textNode) {
//         headings.push({
//           level: node.attrs.level,
//           text: textNode.text,
//         });
//       }
//     }
//     if (node.content) {
//       node.content.forEach(traverse);
//     }
//   };

//   traverse(doc);
//   return headings;
// };

export const extractHeadings = (doc) => {
  const headings = [];

  const traverse = (node) => {
    if (node.type === "heading" && node.attrs && node.attrs.level) {
      const textNode = node.content.find((n) => n.type === "text");
      if (textNode) {
        headings.push({
          level: node.attrs.level,
          text: textNode.text,
          id: node.attrs.id,
        });
      }
    }
    if (node.content) {
      node.content.forEach(traverse);
    }
  };

  traverse(doc);
  return headings;
};
