import React from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorites } from "../redux/actions/productActions";
import { styled, Box } from "@mui/system";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

const StyledIcon = styled(MdOutlineFavorite)({});
const StyledIconBorder = styled(MdOutlineFavoriteBorder)({});
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
          <StyledIcon
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </Box>
      ) : (
        <Box
          onClick={() => {
            dispatch(toggleFavorites(true));
          }}
        >
          <StyledIconBorder
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default Header;
