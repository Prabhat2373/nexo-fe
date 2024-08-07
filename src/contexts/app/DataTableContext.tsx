import { initialTableParams } from "@/config/table/data-table.config";
import { ColumnDef } from "@tanstack/react-table";
import React, { createContext, useContext, useState } from "react";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];

  selectedRows?: any;
  id?: string;
  response?: any;
  hidePagination?: boolean;
  hideToolbar?: boolean;
  toolbar?: JSX.Element;
  hideHeader?: boolean;
  hideRowSelected?: boolean;
  showNumbering?: boolean;
  lazyQueryHook?: any;
  extraFilters?: any;

  table?: any;
  query?: any;

  isLoading: boolean;
}

interface DataTableContextValue<TData, TValue> {
  dataTableProps: DataTableProps<TData, TValue>;
  setDataTableProps: React.Dispatch<
    React.SetStateAction<DataTableProps<TData, TValue>>
  >;
  query: any;
  // queryOptions: QueryParamFunctions;
  tableQuery: any;
  refetch: () => void;
  selectedRows: any[];
  setSelectedRows: React.Dispatch<React.SetStateAction<never[]>>;
  setTableParams: React.Dispatch<
    React.SetStateAction<{
      limit: number;
      page: number;
      sort: string;
    }>
  >;
  tableParams: {
    limit: number;
    page: number;
    sort: string;
  };
  setParamValue: (field: string, value: any) => void;
}

const DataTableContext = createContext<
  DataTableContextValue<any, any> | undefined
>(undefined);

export const useDataTableContext = <TData, TValue>() => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error(
      "useDataTableContext must be used within a DataTableContextProvider"
    );
  }
  return context;
};

interface DataTableContextProviderProps<TData, TValue> {
  children: React.ReactNode;
}

export const DataTableContextProvider = <TData, TValue>({
  children,
}: DataTableContextProviderProps<TData, TValue>) => {
  const [dataTableProps, setDataTableProps] = React.useState<
    DataTableProps<TData, TValue>
  >({});

  const [tableParams, setTableParams] = React.useState(initialTableParams);

  const setParamValue = (field: string, value?: any) => {
    setTableParams({
      ...tableParams,
      [field]: value,
    });
  };

  const [selectedRows, setSelectedRows] = useState([]);

  // const [queryId, setQueryId] = useState('')
  // const [options, setOptions] = useState({
  //   set: () => {},
  // })
  // useEffect(() => {
  //   if (dataTableProps.id) setQueryId(dataTableProps.id)
  // }, [dataTableProps.id])
  // const [query, queryOptions] = useQueryParam(queryId)

  // useEffect(() => {
  //   queryOptions?.set({ filter: JSON.stringify({}) })
  // }, [queryId])
  const value = {
    dataTableProps,
    setDataTableProps,
    refetch: dataTableProps?.refetch,
    query: dataTableProps?.query,
    tableQuery: dataTableProps?.tableQuery,
    setSelectedRows,
    selectedRows,
    setTableParams,
    tableParams,
    setParamValue,
    // query,
    // queryOptions,
  };

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
};
