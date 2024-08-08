import { DataTableContextProvider } from "@/contexts/app/DataTableContext";
import React, { ComponentType, ReactNode } from "react";

// Wrap the WrappedComponent with the DataTableContextProvider
export const WithDataTable = ({ children }: { children: ReactNode }) => {
  return <DataTableContextProvider>{children}</DataTableContextProvider>;
};

// import { DataTableContextProvider } from "@/contexts/app/DataTableContext";
// import React, { ComponentType, ReactNode } from "react";

// Define the type for the withDataTableContext HOC
type WithDataTableContextProps = {
  children: ReactNode;
};

// Wrap the WrappedComponent with the DataTableContextProvider
export const withDataTableHOC = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: WithDataTableContextProps) => {
    return (
      <DataTableContextProvider>
        <WrappedComponent {...props} />
      </DataTableContextProvider>
    );
  };
};
