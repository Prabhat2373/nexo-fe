import React from "react";
import classNames from "classnames";

interface InputErrorProps {
  children: React.ReactNode;
  classNames?: string;
}

const InputError: React.FC<InputErrorProps> = (props) => {
  const { children, classNames: additionalClassNames } = props;

  const className = classNames(
    "font-poppins",
    "font-normal",
    "text-xs",
    "text-red-500",
    additionalClassNames
  );

  return <small className={className}>{children}</small>;
};

export default InputError;
