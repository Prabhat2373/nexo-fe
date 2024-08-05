// type Content = {
//   type: string;
//   attrs?: any;
//   content?: Content[];
//   text?: string;
// };

// export function extractText(content: Content[]): string {
//   let text = "";

//   content.forEach((node) => {
//     if (node.type === "text" && node.text) {
//       text += node.text + " ";
//     }

//     if (node.content) {
//       text += extractText(node.content);
//     }
//   });

//   return text;
// }

// export function countWords(text: string): number {
//   // Split text by whitespace characters and filter out empty strings
//   return text.split(/\s+/).filter((word) => word.length > 0).length;
// }

// export function estimateReadingTime(
//   wordCount: number,
//   wordsPerMinute: number = 200
// ): number {
//   return Math.ceil(wordCount / wordsPerMinute);
// }

type Content = {
  type: string;
  attrs?: any;
  content?: Content[];
  text?: string;
};

export function extractText(content: Content[]): string {
  const textParts: string[] = [];

  const stack: Content[] = [...content];
  while (stack.length > 0) {
    const node = stack.pop();
    if (!node) continue;

    if (node.type === "text" && node.text) {
      textParts.push(node.text);
    }

    if (node.content) {
      stack.push(...node.content);
    }
  }

  return textParts.join(" ");
}

export function countWords(text: string): number {
  let wordCount = 0;
  let inWord = false;
  for (let i = 0; i < text.length; i++) {
    if (/\s/.test(text[i])) {
      if (inWord) {
        wordCount++;
        inWord = false;
      }
    } else {
      inWord = true;
    }
  }
  if (inWord) {
    wordCount++;
  }
  return wordCount;
}

export function estimateReadingTime(
  wordCount: number,
  wordsPerMinute: number = 200
): number {
  return Math.ceil(wordCount / wordsPerMinute);
}
