import React, { ComponentProps, ComponentType } from "react";

const Asterisk = (props: ComponentProps<"span">) => {
  return (
    <span className="text-red-500" {...props}>
      *
    </span>
  );
};

export default Asterisk;
