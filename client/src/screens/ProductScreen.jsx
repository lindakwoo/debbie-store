import React, { useEffect, useState } from "react";
import { BiMinus, BiAddToQueue, BiCheckShield, BiPackage, BiSupport } from "react-icons/bi";
import { styled, Box, Stack } from "@mui/system";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/actions/productActions";
import Star from "../components/Star";

const Minus = styled(BiMinus)({});
const Add = styled(BiAddToQueue)({});

const ProductScreen = () => {
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.product);
  console.log(id);

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
              <Stack alignItems='flex-start' direction={{ xs: "column", lg: "row" }}>
                {product.productIsNew && <Box sx={{ p: "10px", borderRadius: "8px" }}>New</Box>}{" "}
                {product.stock === 0 && <Box sx={{ p: "10px", borderRadius: "8px", color: "red" }}>sold out</Box>}
                <h2>
                  {product.brand} {product.name}
                </h2>
              </Stack>
            </Box>
          )
        )}
      </Stack>
    </>
  );
};

export default ProductScreen;
