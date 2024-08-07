"use client";
import { statuses } from "@/__mock__/table/table.mock";
import { DataTable } from "@/components/table/DataTable";
import { DataTableColumnHeader } from "@/components/table/utils/data-table-column-header";
import { DataTableRowActions } from "@/components/table/utils/data-table-row-action";
import { Checkbox } from "@/components/ui/checkbox";
import Container from "@/components/ui/Container";
import { WithDataTable } from "@/hoc/app/table/WithDataTable";
import { useLazyGetOrdersQuery } from "@/services/rtk/ordersApi";
import { ColumnDef } from "@tanstack/react-table";

const RestaurantOrdersContainer = () => {
  const lazyQueryHook = useLazyGetOrdersQuery();
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
      accessorKey: "customer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <div className="">{row?.original?.customer?.name || "-"}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "Table",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Table" />
      ),
      cell: ({ row }) => {
        return <div>{row?.original?.table?.number || "-"}</div>;
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
            <span>{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "Payment Status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payment Status" />
      ),
      cell: ({ row }) => {
        // const status = statuses.find(
        //   (status) => status.value === row.original?.paymentStatus
        // );

        // if (!status) {
        //   return null;
        // }

        return (
          <div className="flex w-[100px] items-center">
            <span>{row.original?.paymentStatus || "-"}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "Discount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Discount" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span>{row?.original?.discount || "0"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span>{row?.original?.totalAmount}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions options={statuses} row={row} />,
    },
  ];

  return (
    <WithDataTable>
      <Container className="my-6">
        <h1 className="my-3 text-lg">Orders</h1>
        <DataTable columns={columns} lazyQueryHook={lazyQueryHook} />
      </Container>
    </WithDataTable>
  );
};

export default RestaurantOrdersContainer;
