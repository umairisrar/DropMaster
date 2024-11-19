import React from "react";
import { Skeleton } from "./skeleton";
import { TableCell } from "./table";

const DataTableSkeleton = () => {
  return (
    <div className="animate-pulse w-full">
      {[...Array(10)].map((_, i) => (
        <div key={i}>
          <TableCell>
            <Skeleton className="h-[14px] w-[99%] rounded-sm absolute  " />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[14px] w-[99%] rounded-sm absolute " />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[14px] w-[99%] rounded-sm absolute " />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[14px] w-[99%] rounded-sm  absolute" />
          </TableCell>
        </div>
      ))}
    </div>
  );
};

export default DataTableSkeleton;
