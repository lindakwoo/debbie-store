import React, { useState, useEffect } from "react";
import { Box, } from "@mui/system";

import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { setFavorites } from "../redux/slices/product";

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products, pagination } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(1));
    const favoritesFromStorage = JSON.parse(window.localStorage.getItem("favorites") || "[]");
    dispatch(setFavorites(favoritesFromStorage));
  }, [dispatch]);

  return (
    <>
      {" "}
      {products.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            p: "10px",
            minHeight: "80vh",
            mx: { base: "12", md: "20", lg: "32" },
            placeItems: "center",
          }}
        >
          {products.map((product) => {
            return <ProductCard product={product} loading={loading} />;
          })}
        </Box>
      )}
    </>
  );
};

export default ProductsScreen;
