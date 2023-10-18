"use client";

import Header from "../components/Header";
import Center from "../components/Center";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductsGrid from "../components/ProductsGrid";
import Title from "../components/Title";
import Spinner from "../components/Spinner";

function ProductsPage() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return axios.get("/api/product");
    },
  });

  return (
    <>
      {isLoading && <Spinner />}
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products?.data} />
      </Center>
    </>
  );
}

export default ProductsPage;
