"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./utils/data-table-toolbar";
import { DataTablePagination } from "./utils/data-table-pagination";
import { debounce } from "@/utils/utils";
import { initialTableParams } from "@/config/table/data-table.config";
import { useDataTableContext } from "@/contexts/app/DataTableContext";

// import { DataTablePagination } from "./data-table-pagination";
// import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // data: TData[];
  lazyQueryHook: any;
}

export function DataTable<TData, TValue>({
  columns,
  // data,
  lazyQueryHook,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { tableParams, setTableParams } = useDataTableContext();
  const [tableData, setTableData] = React.useState([]);
  const [loadData, { data, isFetching: isLoading }] = lazyQueryHook;
  console.log("tableLoading", isLoading);
  const { setDataTableProps, dataTableProps } = useDataTableContext();
  const debouncedLoad = React.useCallback(
    debounce((params) => {
      loadData(params).then(() => {
        // setIsLoading(false);
      });
    }, 500),
    []
  );
  console.log("tableData", tableData);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const fetchTable = React.useCallback(() => {
    debouncedLoad(tableParams);
  }, [debouncedLoad, tableParams]);

  React.useEffect(() => {
    setDataTableProps({
      table,
      refetch: fetchTable,
      data: tableData,
      // isLoading,
    });
  }, [fetchTable, setDataTableProps, table, tableData]);

  React.useEffect(() => {
    setDataTableProps({
      ...dataTableProps,
      isLoading,
    });
  }, [isLoading]);

  React.useEffect(() => {
    console.log("datatable", data);
    setTableData(data?.data || []);
  }, [data]);

  console.log("tablefilter", table.getState().columnFilters);

  React.useEffect(() => {
    fetchTable();
  }, [
    tableParams.limit,
    tableParams.page,
    tableParams.sort,
    tableParams?.search,
    fetchTable,
  ]);

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
