"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table-column-header";
import { Product } from "@/types/products";

export function productColumns(): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <div className="text-ellipsis text-left overflow-hidden whitespace-nowrap w-[350px]">
          {row.getValue("title")}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap">
          ${row.getValue("price")}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "rating",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rating" />
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("rating")} ⭐</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "reviews",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Reviews" />
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("reviews")}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => (
        <div className="text-left whitespace-nowrap">
          {row.getValue("category")}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    },
  ];
}
