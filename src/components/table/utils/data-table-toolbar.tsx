"use client";

import {
  Cross2Icon,
  ResetIcon,
  ReloadIcon,
  RotateCounterClockwiseIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faced-filter";
import { priorities, statuses } from "@/__mock__/table/table.mock";
import { DataTableViewOptions } from "./data-table-view-options";
import { RefreshCcw, RefreshCw } from "lucide-react";
import { useDataTableContext } from "@/contexts/app/DataTableContext";
import WithTooltip from "@/components/ui/WithTooltip";
import classNames from "classnames";
// import { DataTableViewOptions } from "@//components/data-table-view-options";

// import { priorities, statuses } from "../data/data";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { setTableParams, tableParams, refetch, dataTableProps } =
    useDataTableContext();
  const isLoading = dataTableProps?.isLoading;
  const tableFilters = dataTableProps?.tableFilters;
  console.log("isLoading", isLoading);

  console.log("tableParams", tableParams);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          type="search"
          placeholder="Search..."
          value={tableParams?.search || ""}
          onChange={(event) =>
            // table.getColumn("search")?.setFilterValue(event.target.value)
            setTableParams({
              ...tableParams,
              search: event.target.value,
            })
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {tableFilters ? <>{tableFilters}</> : null}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <WithTooltip description={"Refresh"}>
        <Button
          variant="outline"
          onClick={() => refetch?.()}
          className="h-8 px-2 lg:px-3 mx-2"
        >
          <RefreshCw
            className={classNames("h-4 w-4", {
              "animate-spin": isLoading,
            })}
          />
        </Button>
      </WithTooltip>
      <DataTableViewOptions table={table} />
    </div>
  );
}
