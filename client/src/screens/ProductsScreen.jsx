import { Box, styled, Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../redux/actions/productActions";
import { setFavorites } from "../redux/slices/product";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

const LeftArrow = styled(HiArrowSmallLeft)({});
const RightArrow = styled(HiArrowSmallRight)({});
const Button = styled("button")({});

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products, pagination, favoritesToggled } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(1));
    const favoritesFromStorage = JSON.parse(window.localStorage.getItem("favorites") || "[]");
    dispatch(setFavorites(favoritesFromStorage));
  }, [dispatch]);

  const paginationButtonClick = (page) => {
    dispatch(getProducts(page));
  };

  return (
    <>
      {" "}
      {products.length >= 1 && (
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
          {!favoritesToggled && (
            <>
              <Stack sx={{ mt: "24px" }} direction='row'>
                <Button onClick={() => paginationButtonClick(1)}>
                  <LeftArrow />
                </Button>
                {Array.from(Array(pagination.totalPages), (e, i) => {
                  return (
                    <Button
                      sx={{ backgroundColor: pagination.currentPage === i + 1 ? "aqua" : "grey" }}
                      key={i}
                      onClick={() => paginationButtonClick(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  );
                })}
                <Button onClick={() => paginationButtonClick(pagination.totalPages)}>
                  <RightArrow />
                </Button>
              </Stack>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default ProductsScreen;
