import React from "react";
import { FaArrowRight } from "react-icons/fa";

import { styled, Box, Stack } from "@mui/system";

import { useSelector } from "react-redux";

const Button = styled("button")({});
const OrderSummary = () => {
  const { subtotal, shipping } = useSelector((state) => state.cart);
  return (
    <Stack sx={{ border: "solid 1px cyan", width: "300px", borderRadius: "8px", p: "8px" }}>
      <h2>Order Summary</h2>
      <Stack direction='row' spacing={5}>
        <Box>Subtotal</Box>
        <Box>${subtotal}</Box>
      </Stack>
      <Stack direction='row' spacing={5}>
        <Box>Shipping</Box>
        <Box>${shipping}</Box>
      </Stack>
      <Stack direction='row' spacing={5}>
        <Box>Total</Box>
        <Box>${Number(subtotal) + Number(shipping)}</Box>
      </Stack>
      <Button>
        Checkout <FaArrowRight />
      </Button>
    </Stack>
  );
};

export default OrderSummary;
