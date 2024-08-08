"use client";
import { statuses } from "@/__mock__/table/table.mock";
import { DataTable } from "@/components/table/DataTable";
import { DataTableColumnHeader } from "@/components/table/utils/data-table-column-header";
import { DataTableRowActions } from "@/components/table/utils/data-table-row-action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { useDataTableContext } from "@/contexts/app/DataTableContext";
import { WithDataTable, withDataTableHOC } from "@/hoc/app/table/WithDataTable";
import { useLazyGetOrdersQuery } from "@/services/rtk/ordersApi";
import {
  useLazyGetAllTablesQuery,
  useLazyGetRestaurantMenusQuery,
} from "@/services/rtk/setupApi";
import { RootState } from "@/services/store";
import { ColumnDef } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AddMenuSheetContainer from "./create/AddMenuSheetContainer";
import useModalHandler from "@/hooks/app/useModalHandler";

const MenusTableContainer = () => {
  const { setParamValue } = useDataTableContext();
  const { user } = useSelector((state: RootState) => state.user);
  const lazyQueryHook = useLazyGetRestaurantMenusQuery();
  const [isOpen, toggle, show, hide] = useModalHandler(false);

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "Name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div className="">{row?.original?.name || "-"}</div>,
    },
    {
      accessorKey: "Description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        return <div>{row?.original?.description || "-"}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue("status")
        );

        if (!status) {
          return null;
        }

        return (
          <div className="flex w-[100px] items-center">
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{status.label || "-"}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "Price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span>{row?.original?.price}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions options={statuses} row={row} />,
    },
  ];

  useEffect(() => {
    if (user?.restaurant?._id) {
      setParamValue("restaurant", user?.restaurant?._id);
    }
  }, [user?.restaurant?._id]);

  return (
    <WithDataTable>
      <Container className="my-6">
        <div className="flex justify-between items-center my-4">
          {/* <h1 className="my-3 text-lg">Tables</h1> */}
          <Heading>Menus</Heading>
          <Button size="sm" className="h-8 gap-1" type="button" onClick={show}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Menu
            </span>
          </Button>
        </div>
        <AddMenuSheetContainer hide={hide} isOpen={isOpen} />
        <DataTable columns={columns} lazyQueryHook={lazyQueryHook} />
      </Container>
    </WithDataTable>
  );
};

export default withDataTableHOC(MenusTableContainer);
