import classNames from "classnames";
import React, { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  size?: any;
  color?: string;
  repoSize?: string;
}

const Heading = ({ children, className, size, color }: IProps) => {
  const getSize = () => {
    switch (size) {
      case "4xl":
        return "sm:text-4xl text-xl";
      case "2xl":
        return "sm:text-2xl text-lg";
      case "xl":
        return "sm:text-xl text-base";
      case "lg":
        return "sm:text-lg text-base";
      case "base":
        return "sm:text-base text-sm";
      case "sm":
        return "sm:text-sm text-xs";
      case "md":
        return "text-sm";
      case "xs":
        return "sm:text-xs text-xxs";
      default:
        return "sm:text-lg text-base";
    }
  };

  const tagSize = getSize();

  let colorClass = color ? `text-${color}` : "text-primary";

  return (
    <div
      className={classNames(
        `dark:text-gray-100 font-medium font-poppins ${tagSize}`,
        colorClass,
        className
      )}
    >
      {children}
    </div>
  );
};
export default Heading;
