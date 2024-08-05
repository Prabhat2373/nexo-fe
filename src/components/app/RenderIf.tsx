import React, { ReactNode } from "react";
interface IRenderIf {
  children: ReactNode;
  when: boolean;
}

const RenderIf = ({ children, when }: IRenderIf) => {
  return when ? children : null;
};

export default RenderIf;
