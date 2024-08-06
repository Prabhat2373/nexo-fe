export const isSuccess = (res: any) => {
  if (res) {
    return res?.data?.status?.toLowerCase() === "success";
  }
  return false;
};

export const colors = ["blue", "orange", "purple", "green", "red", "yellow"];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const extractFirstParagraph = (jsonArray) => {
  for (const element of jsonArray) {
    if (element.type === "paragraph" && element.content) {
      return element.content.map((content) => content.text).join("");
    }
  }
  return null; // Return null if no paragraph is found
};

export const getAcronym = (input: string): string => {
  if (!input) return "";
  const words = input.trim().split(/\s+/);
  return words
    .slice(0, 3) // Take only the first three words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

export const debounce = (fn: any, timeout: number) => {
  let timer: number = null;
  // setLoader(true)
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, timeout, ...args);
  };
};
