"use client";
import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { AiOutlineMenu } from "react-icons/ai";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const StyledNav = styled.nav`
  display: ${(props) => (props.mobileNavigationActive ? "block" : "none")};
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #222;
  padding: 70px 20px 20px;

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  width: 30px;
  height: 30px;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
function Header() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>ShopWise</Logo>
          <StyledNav mobileNavigationActive={mobileNavigationActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton
            onClick={() => setMobileNavigationActive(!mobileNavigationActive)}
          >
            <AiOutlineMenu />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

export default Header;
