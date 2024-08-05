import React, { ReactNode } from "react";
import IconEmptyState from "../icons/app/IconEmptyState";

interface IEmptyState {
  title?: string;
  description?: string;
  actionComponent?: JSX.Element;
  children?: ReactNode;
  data?: any[];
}

const EmptyState = ({
  title,
  description,
  actionComponent,
  children,
  data,
}: IEmptyState) => {
  return (
    <>
      {data?.length ? (
        <>{children}</>
      ) : (
        <div className="flex justify-center items-center flex-col max-h-[80vh] gap-4 mt-10">
          <IconEmptyState />
          <h1 className="text-lg">{title}</h1>
          <p>{description}</p>
        </div>
      )}
    </>
  );
};

export default EmptyState;
