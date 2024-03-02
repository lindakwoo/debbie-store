import React, { useState, useEffect } from "react";
import { styled, Box, Stack } from "@mui/system";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { TbShoppingCartPlus } from "react-icons/tb";
import { addCartItem, removeCartItem } from "../redux/actions/cartActions";

const Image = styled("img")(() => {});
const Button = styled("button")({});
const Close = styled(MdOutlineClose)({});

const CartItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id, brand } = cartItem;
  const dispatch = useDispatch();
  return (
    <Stack direction='row' sx={{ minWidth: "300px", border: "1px solid black", borderRadius: "8px", width: "500px" }}>
      <Image sx={{ height: "120px" }} src={image} />
      <Stack alignItems='stretch' sx={{ p: "8px" }} spacing={3}>
        <Stack alignItems='space-around' justifyContent='space-around' direction='row'>
          <p>
            {brand} {name}
          </p>

          <Button
            sx={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => {
              dispatch(removeCartItem(id));
            }}
          >
            <Close size='40px' />
          </Button>
        </Stack>
        <Stack direction='row' spacing={5}>
          <select
            onChange={(e) => {
              dispatch(addCartItem(id, e.target.value));
            }}
            value={qty}
          >
            {[...Array(stock).keys()].map((item) => (
              <option key={item + 1} value={item + 1}>
                {item + 1}
              </option>
            ))}
          </select>
          <Box> ${price}</Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItem;
