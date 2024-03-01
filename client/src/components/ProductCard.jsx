import React, { useState } from "react";
import { styled, Box, Stack } from "@mui/system";
import { BiExpand } from "react-icons/bi";
import { Link } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const Image = styled("img")(() => {});
const StyledIcon = styled(MdOutlineFavorite)({});
const StyledIconBorder = styled(MdOutlineFavoriteBorder)({});
const Expand = styled(BiExpand)({});
const StyledLink = styled(Link)({});

const ProductCard = ({ product, loading }) => {
  const [isShown, setIsShown] = useState(false);
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.product);
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
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          sx={{ height: "200px", width: "200px" }}
          src={product.images[isShown ? (product.images.length === 2 ? 1 : 0) : 0]}
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
        <Stack direction='row' justifyContent='space-between'>
          {favorites.includes(product._id) ? (
            <Box
              onClick={() => {
                console.log("clicked");
                dispatch(removeFromFavorites(product._id));
              }}
            >
              <StyledIcon
                sx={{
                  fill: "red",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
          ) : (
            <Box
              onClick={() => {
                console.log("clicked off");
                dispatch(addToFavorites(product._id));
              }}
            >
              <StyledIconBorder
                sx={{
                  stroke: "red",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
          )}
          <StyledLink to={`/product/${product._id}`}>
            <Expand />
          </StyledLink>
        </Stack>
      </Box>
    </>
  );
};

export default ProductCard;
