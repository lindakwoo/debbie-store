import React from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorites } from "../redux/actions/productActions";
import { styled, Box } from "@mui/system";

const styledIcon = styled(MdOutlineFavorite)({});
const styledIconBorder = styled(MdOutlineFavoriteBorder)({});
const Header = () => {
  const dispatch = useDispatch();
  const { favoritesToggled } = useSelector((state) => state.product);
  return (
    <>
       {favoritesToggled ? (
        <Box
          onClick={() => {
            dispatch(toggleFavorites(false));
          }}
        >
          <MdOutlineFavorite />
        </Box>
      ) : (
        <Box
          onClick={() => {
            dispatch(toggleFavorites(true));
          }}
        >
          <MdOutlineFavoriteBorder />
        </Box>
      )} 
    </>
  );
};

export default Header;
