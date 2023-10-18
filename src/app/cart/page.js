"use client";
import styled from "styled-components";
import Header from "../components/Header";
import Center from "../components/Center";
import Button from "../components/Button";
import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import axios from "axios";
import Table from "../components/Table";
import { formatCurrency } from "../utils/helpers";
import Input from "../components/Input";
import toast from "react-hot-toast";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 80px;
    max-height: 80px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
  }
`;

const QuntityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
function CartPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);
  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  async function goToPayment(e) {
    e.preventDefault();

    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Your payment has been successful</h1>
              <p>we well email you when your order has been shipped</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}

            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt={product.title} />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuntityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuntityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        {formatCurrency(
                          cartProducts.filter((id) => id === product._id)
                            .length * product.price
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{formatCurrency(total)}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>

              <form onSubmit={goToPayment}>
                <Input
                  required
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CityHolder>
                  <Input
                    required
                    type="text"
                    placeholder="city"
                    value={city}
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    required
                    type="text"
                    placeholder="Postal code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </CityHolder>
                <Input
                  required
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streedAddress"
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
                <Input
                  required
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
                <Button black block type="submit">
                  Continue to payment
                </Button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}

export default CartPage;
