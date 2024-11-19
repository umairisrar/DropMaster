"use client";

import { failedToast } from "@/components/customizeToast";
import { Product } from "@/types/products";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { productColumns } from "@/components/data-table/columns/products";

async function fetchPage(
  pageNumber: number,
  pageSize: number,
  searchQuery: string = ""
): Promise<{ total: number; data: Product[] }> {
  try {
    const response = await fetch("/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: pageNumber,
        pageSize: pageSize,
        search: searchQuery,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }

    const result = await response.json();
    return { total: result.totalItems || 0, data: result.items || [] };
  } catch (error) {
    console.log("Error fetching contacts:", error);
    throw error;
  }
}

export default function ProductsPage() {
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [recordCount, setRecordCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPage(currentPage + 1, pageSize, searchQuery);

      setListProducts(data.data);
      setRecordCount(data.total);
    } catch (error: any) {
      failedToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, pageSize, searchQuery]);

  const handleGlobalFilterChange = (filter: string) => {
    if (!searchQuery && !filter) {
      fetchContacts();
    } else {
      setSearchQuery(filter);
    }

    setCurrentPage(0);
  };

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); // Reset to the first page when page size changes
  };

  return (
    <Card className="border-none shadow-none">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 p-[20px]">
        <DataTable
          data={listProducts}
          columns={productColumns()}
          onGlobalFilterChange={handleGlobalFilterChange}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          currentPage={currentPage}
          loading={loading}
          error={error}
          rowCount={recordCount}
          commontoolbar={true}
        />
      </div>
    </Card>
  );
}
