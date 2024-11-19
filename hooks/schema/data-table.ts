import type { ColumnDef, Table } from "@tanstack/react-table";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onRefresh: () => void;
  handleGlobalFilterChange: (filter: string) => void;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onGlobalFilterChange: (filter: string) => void;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSize: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  rowCount: number | 0;
  tableName?: string;
  isSync?: boolean | false;
  type?: string;
  selectedTab?: string;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
  commontoolbar?: boolean;
}
