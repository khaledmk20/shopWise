import styled from "styled-components";
import Button from "./Button";
import { HiShoppingCart } from "react-icons/hi";
import { formatCurrency } from "../utils/helpers";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";
import Image from "next/image";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const Title = styled(Link)`
  display: flex;
  justify-content: center;
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  margin-top: 2px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

// const Price = styled.div`
//   font-size: 1.1rem;
//   font-weight: 600;
//   @media screen and (max-width: 768px) {
//     font-size: 1.5rem;
//   }
// `;

function ProductBox({ _id, title, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = `/products/${_id}`;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <Image
          width={100}
          height={100}
          style={{
            objectFit: "contain",
          }}
          src={images?.[0]}
          alt={title}
        />
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Button
            onClick={() => {
              addProduct(_id);
            }}
            primary={1}
            outline={1}
          >
            Add to cart - {<b> {formatCurrency(price)}</b>}
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

export default ProductBox;
