"use client";
import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import { HiShoppingCart } from "react-icons/hi";
import ButtonLink from "./ButtonLink";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";
import Image from "next/image";
const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
    img {
      max-width: 100%;
    }
    div:nth-child(1) {
      order: 0;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
    toast.success(`${product.title} has been added to cart successfully`);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={`/products/${product._id}`}
                  white={1}
                  outline={1}
                >
                  Read more
                </ButtonLink>
                <Button white={1} onClick={() => addFeaturedToCart()}>
                  <HiShoppingCart style={{ marginRight: "5px" }} /> Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <Image
              width={300}
              height={200}
              style={{
                objectFit: "contain",
              }}
              src="https://ecommerce-dashboard.s3.amazonaws.com/1696963188021.png"
              alt="featured image"
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

export default Featured;
