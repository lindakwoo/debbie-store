import React from "react";
import { styled, Box, Stack } from "@mui/system";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

const StyledLink = styled(Link)({});

const CartScreen = () => {
  const { loading, error, cartItems } = useSelector((state) => state.cart);
  const getHeadingContent = () => (cartItems.length === 1 ? "(1Item)" : `(${cartItems.length} Items`);
  return (
    <Stack>
      {loading ? (
        <Box>Loading...</Box>
      ) : error ? (
        <Box sx={{}}>sorry, there's an error: {error}</Box>
      ) : cartItems.length <= 0 ? (
        <Box> your cart is empty</Box>
      ) : (
        <Box sx={{ mx: "auto", px: "40px", py: "8px", width: { xs: "95%", md: "75%", lg: "55%" } }}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems={{ lg: "flex-start" }} spacing={8}>
            <Stack>
              <h2>Shopping Cart</h2>
              <Stack>
                {cartItems.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
            <Stack>
              <OrderSummary />
              <Stack>
                <p>or</p>
                <StyledLink sx={{}} to='/products'>
                  Continue Shopping
                </StyledLink>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default CartScreen;
