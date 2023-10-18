"use client";
import { useState } from "react";
import styled from "styled-components";
const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  border: 2px solid ${(props) => (props.active ? "#ccc" : "transparent")};
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

function ProductImages({ images }) {
  const [activeImg, setActiveImg] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImg} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            active={image === activeImg}
            key={image}
            onClick={() => setActiveImg(image)}
          >
            <Img src={image} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}

export default ProductImages;
