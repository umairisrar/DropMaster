"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { RefreshCcw, X } from "lucide-react";
import { useState } from "react";

import { DataTableToolbarProps } from "@/hooks/schema/data-table";

export function CommonDataTableToolbar<TData>({
  table,
  onRefresh,
  handleGlobalFilterChange,
}: DataTableToolbarProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const isFiltered = globalFilter !== "";

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value);
    handleGlobalFilterChange(event.target.value);
  };

  return (
    <div className={`flex ${"items-center"} justify-between  `}>
      <div className="flex flex-1 items-center space-x-2 p-1">
        <>
          <Input
            placeholder="Filter..."
            value={globalFilter}
            onChange={handleFilterChange}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                setGlobalFilter("");
                table.setGlobalFilter("");
              }}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </>
      </div>

      <div className="px-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="ml-auto hidden h-8 lg:flex"
        >
          <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
