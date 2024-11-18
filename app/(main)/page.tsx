"use client";
import { Product } from "@/types/products";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log("Fetching products...", products);
    const fetchProducts = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT_HERE");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console?.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
    </div>
  );
}
