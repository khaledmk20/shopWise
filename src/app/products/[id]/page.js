"use client";
import Button from "@/app/components/Button";
import Center from "@/app/components/Center";
import Header from "@/app/components/Header";
import ProductImages from "@/app/components/ProductImages";
import Spinner from "@/app/components/Spinner";
import Title from "@/app/components/Title";
import WhiteBox from "@/app/components/WhiteBox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { HiShoppingCart } from "react-icons/hi";
import { formatCurrency } from "@/app/utils/helpers";
import { CartContext } from "@/app/components/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import StyledComponentsRegistry from "@/app/registry";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Price = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
`;
function ProductPage() {
  const { addProduct } = useContext(CartContext);
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],

    queryFn: async () => {
      const response = await axios.get(`/api/product?id=${id}`);
      return response?.data;
    },
  });
  return isLoading ? (
    <Spinner />
  ) : (
    <StyledComponentsRegistry>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <Price>{formatCurrency(product.price)}</Price>
              <div>
                <Button
                  primary={1}
                  onClick={() => {
                    addProduct(product._id);
                    toast.success(
                      `${product.title} has been added to cart successfully`
                    );
                  }}
                >
                  <HiShoppingCart style={{ marginRight: "5px" }} /> Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </StyledComponentsRegistry>
  );
}
export default ProductPage;
