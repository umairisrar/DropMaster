"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-column-header";
import FormsAndTemplatesSchema from "../schemas/forms-and-templates-schema";
import { FormsAndTemplatesTableRowActions } from "../actions/forms-and-templates-actions";
import { Button } from "@/components/ui/button";

export function formAndTemplatesColumn(
  onRemove: (id: string) => Promise<void>,
  onEdit: (template: FormsAndTemplatesSchema) => void
): ColumnDef<FormsAndTemplatesSchema>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="text-ellipsis text-left overflow-hidden whitespace-nowrap w-[350px]">
          {row.getValue("name")}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <div className="overflow-hidden text-left whitespace-nowrap w-[350px]">
          {row.getValue("description")}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "url",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="URL" />
      ),
      cell: ({ row }) => (
        <div className="text-ellipsis text-left overflow-hidden whitespace-nowrap w-[150px]">
          <Button
            variant="link"
            // asChild
            className="p-0 cursor-pointer"
            onClick={() => {
              console.log(row);
              window.open(row.original.url, "_blank");
            }}
          >
            OPEN
          </Button>
        </div>
      ),
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <FormsAndTemplatesTableRowActions
            row={row}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        </div>
      ),
    },
  ];
}
