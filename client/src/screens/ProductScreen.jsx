import React, { useEffect, useState } from "react";
import { BiMinus, BiAddToQueue, BiCheckShield, BiPackage, BiSupport } from "react-icons/bi";
import { styled, Box, Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/actions/productActions";
import Star from "../components/Star";
import { addCartItem } from "../redux/actions/cartActions";

const Minus = styled(BiMinus)({});
const Add = styled(BiAddToQueue)({});
const Package = styled(BiPackage)({});
const CheckShield = styled(BiCheckShield)({});
const Support = styled(BiSupport)({});
const Image = styled("img")(() => {});

const ProductScreen = () => {
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const changeAmount = (input) => {
    if (input === "plus") {
      setAmount(amount + 1);
    }
    if (input === "minus") {
      setAmount(amount - 1);
    }
  };

  const addItem = () => {
    if (cartItems.some((cartItem) => cartItem.id === id)) {
      cartItems.find((cartItem) => cartItem.id === id);
      dispatch(addCartItem(id, amount));
    } else {
      dispatch(addCartItem(id, amount));
    }
  };
  return (
    <>
      <Stack justifyItems='center' sx={{ minHeight: "100vh" }}>
        {loading ? (
          <Box>Loading...</Box>
        ) : error ? (
          <Box sx={{}}>sorry, there's an error: {error}</Box>
        ) : (
          product && (
            <Box
              sx={{
                maxWidth: { xs: "90%", lg: "80%" },
                mx: "auto",
                px: { xs: "10px", md: "12px", lg: "16px" },
                py: { xs: "10px", md: "12px", lg: "16px" },
              }}
            >
              <Stack direction={{ xs: "column", md: "row" }} alignItems='flex-start'>
                <Stack direction='row'>
                  <Image src={product.images[0] || "https://via.placeholder.com/250"} alt={product.name} />
                  {/* <Image src={product.images[1] || "https://via.placeholder.com/250"} alt={product.name} /> */}
                </Stack>
                <Stack>
                  {product.productIsNew && <Box sx={{ p: "10px", borderRadius: "8px" }}>New</Box>}{" "}
                  {product.stock === 0 && <Box sx={{ p: "10px", borderRadius: "8px", color: "red" }}>sold out</Box>}
                  <h2>
                    {product.brand} {product.name}
                  </h2>
                  <Stack spacing={5}>
                    <Box>
                      {" "}
                      <Box>${product.price}</Box>
                      <Stack direction='row'>
                        <Star color='cyan' />
                        <Star rating={product.rating} star={2} />
                        <Star rating={product.rating} star={3} />
                        <Star rating={product.rating} star={4} />
                        <Star rating={product.rating} star={5} />
                      </Stack>
                      <Box> {product.numberOfReviews} Reviews</Box>
                    </Box>
                    <Box> {product.subtitle}</Box>
                    <Box> Quantity</Box>
                    <Stack
                      spacing={5}
                      direction='row'
                      sx={{ width: "170px", p: "5px", border: "1px solid gray", alignItems: "center" }}
                    >
                      {" "}
                      <button disabled={amount <= 1} onClick={() => changeAmount("minus")}>
                        <Minus />
                      </button>
                      <Box>{amount}</Box>
                      <button disabled={amount >= product.stock} onClick={() => changeAmount("plus")}>
                        <Add />
                      </button>
                    </Stack>
                    <Box> In stock: {product.stock} </Box>
                    <button
                      onClick={() => {
                        addItem();
                      }}
                      disabled={product.stock === 0}
                    >
                      Add to cart
                    </button>
                    <Stack spacing={1}>
                      <Stack direction='row' alignItems='center'>
                        <Package size='20px' />
                        <Box>Shipped in 2-3 days</Box>
                      </Stack>
                      <Stack alignItems='center' direction='row'>
                        <CheckShield size='20px' />
                        <Box>2 year extended warranty</Box>
                      </Stack>
                      <Stack alignItems='center' direction='row'>
                        <Support size='20px' />
                        <Box>We're here for you 24/7</Box>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          )
        )}
      </Stack>
    </>
  );
};

export default ProductScreen;
