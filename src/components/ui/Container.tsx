// components/Container.tsx

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  size = "md",
  className = "",
}) => {
  let paddingClasses;

  switch (size) {
    case "xs":
      paddingClasses = "px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10";
      break;
    case "sm":
      paddingClasses = "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12";
      break;
    case "md":
      paddingClasses = "px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14";
      break;
    case "lg":
      paddingClasses = "px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16";
      break;
    case "xl":
      paddingClasses = "px-10 sm:px-12 md:px-14 lg:px-16 xl:px-18";
      break;
    default:
      paddingClasses = "px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14";
  }

  return (
    <div className={`mx-auto ${paddingClasses} ${className}`}>{children}</div>
  );
};

export default Container;
