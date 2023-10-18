import Link from "next/link";
import styled from "styled-components";
import css from "styled-jsx/css";

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}

  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  ${(props) =>
    props.primary &&
    css`
      background-color: #5542f6;
      color: #fff;
      border: 1px solid #5542f6;
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `}
`;
function ButtonLink(props) {
  return <StyledLink {...props}></StyledLink>;
}

export default ButtonLink;
