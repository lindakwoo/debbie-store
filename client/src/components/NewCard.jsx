import React, { useState } from "react";
import { Box, styled } from "@mui/system";
import { Image } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const NewCard = ({ height, backgroundColor, image, image2, product }) => {
  const imageHeight = parseInt(height.replace("px", "")) - 50;
  const [isShown, setIsShown] = useState(false);

  return (
    <ReactLink to={`/product/${product?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: height,
          backgroundColor: backgroundColor,
          width: "100%",
          my: "8px",
          borderRadius: "25px",
          "&:hover": {
            transform: "scale(1.1)",
            transitionDuration: "0.5s",
          },
        }}
      >
        <Image
          sx={{ height: `${imageHeight}px`, width: "auto" }}
          src={product?.images[isShown && product?.images.length === 2 ? 1 : 0]}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          fallbackSrc='https://via.placeholder.com/150'
          alt='tshirt'
        />
      </Box>
    </ReactLink>
  );
};

export default NewCard;
