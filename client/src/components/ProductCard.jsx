import React from "react";
import { styled, Box, Stack } from "@mui/system";
import { BiExpand } from "react-icons/bi";

const Image = styled("img")(() => {});

const ProductCard = ({ product, loading }) => {
  return (
    <>
      <Box
        sx={{
          border: "1px solid black",
          overflow: "hidden",
          p: "5px",
          boxShadow: " 2px 3px grey",
          "&:hover": { transform: "scale(1.1)", transitionDuration: "1s" },
          mx: "10px",
          width: "235px",
        }}
      >
        <Image
          sx={{ height: "200px", width: "200px" }}
          src={product.images[0]}
          fallbackSrc='https://via.placeholder.com/150'
          height='200px'
        />{" "}
        {product.stock < 5 ? (
          <Box sx={{ backgroundColor: "yellow" }}>only {product.stock} left </Box>
        ) : product.stock < 1 ? (
          <Box sx={{ backgroundColor: "pink" }}>Sold out</Box>
        ) : (
          <Box sx={{ backgroundColor: "green" }}>In Stock</Box>
        )}
        {product.productIsNew && <Box>New</Box>}
        <Box sx={{ fontSize: "32px", fontWeight: "semibold", marginTop: "25px", marginBottom: "0" }}>
          {product.brand} {product.name}{" "}
        </Box>
        <Box sx={{ fontSize: "16px", marginTop: "5px", color: "gray" }}>{product.subtitle}</Box>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Box sx={{ backgroundColor: "#71dede" }}>{product.category}</Box>
          <Box sx={{ fontWeight: "semibold", marginTop: "5px", color: "#71dede" }}>${product.price}</Box>
        </Stack>
      </Box>
    </>
  );
};

export default ProductCard;
