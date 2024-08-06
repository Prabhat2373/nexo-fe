import { DataTableContextProvider } from "@/contexts/app/DataTableContext";
import React, { ComponentType, ReactNode } from "react";

// Wrap the WrappedComponent with the DataTableContextProvider
export const WithDataTable = ({ children }: { children: ReactNode }) => {
  return <DataTableContextProvider>{children}</DataTableContextProvider>;
};
