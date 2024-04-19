import React, { useEffect } from "react";
import { Box, Stack, styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import NewCard from "../components/NewCard";
import { columns } from "../util";

const NewProductsScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products, pagination, favoritesToggled } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch]);

  let productsCounter = -1;
  console.log(products);

  const stack = columns.map((column, index) => {
    return (
      <Stack key={`column - ${index}`} direction='column' sx={{ width: "250px", height: "100%" }}>
        {column.map((card, i) => {
          productsCounter++;
          return (
            <NewCard
              product={products[productsCounter]}
              kew={`card - ${i}`}
              height={`${card.size}px`}
              backgroundColor={card.color}
              image={card.image1}
              image2={card.image2}
            />
          );
        })}
      </Stack>
    );
  });

  return (
    <Stack sx={{ mt: "24px" }} alignItems='center' justifyContent='center'>
      <Stack direction='row' gap={2} sx={{ flexWrap: "wrap" }}>
        {stack}
      </Stack>
    </Stack>
  );
};

export default NewProductsScreen;
