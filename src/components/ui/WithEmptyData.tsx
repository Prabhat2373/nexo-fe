import classNames from "classnames";
import React, { ReactNode } from "react";

interface IWithEmptyData {
  isEmpty: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  actionComponent?: JSX.Element;
}
const WithEmptyData = ({
  isEmpty,
  title,
  description,
  children,
  actionComponent,
}: IWithEmptyData) => {
  console.log("isEmpty", isEmpty);

  return (
    <>
      <div
        className={classNames("flex flex-col gap-3 items-center", {
          hidden: !isEmpty,
        })}
      >
        <h1>{title}</h1>
        <p>{description}</p>
        <div>{actionComponent}</div>
      </div>
      <div
        className={classNames({
          hidden: isEmpty,
        })}
      >
        {children}
      </div>
    </>
  );
};

export default WithEmptyData;
