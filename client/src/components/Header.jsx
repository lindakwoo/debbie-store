import React, { useEffect, useState } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { TbShoppingCart } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import NavLink from "./NavLink";
import { toggleFavorites } from "../redux/actions/productActions";
import { styled, Box, Stack } from "@mui/system";
import { BsPhoneFlip } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiUserCheck } from "react-icons/bi";
import useDisclosure from "../hooks/useDisclosure";
import Hamburger from "hamburger-react";

import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

const StyledIcon = styled(MdOutlineFavorite)({});
const StyledIconBorder = styled(MdOutlineFavoriteBorder)({});
const ShoppingCart = styled(TbShoppingCart)({});
const PhoneIcon = styled(BsPhoneFlip)({});
const StyledLink = styled(Link)({});
const StyledHamburger = styled(Hamburger)({});

const Links = [
  { name: "Products", route: "/products" },
  { name: "Hot Deals", route: "/hot-deals" },
  { name: "Contact", route: "/contact" },
  { name: "Services", route: "/services" },
];
const Header = () => {
  const dispatch = useDispatch();
  const { favoritesToggled } = useSelector((state) => state.product);
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {}, [favoritesToggled, dispatch]);
  return (
    <Box sx={{ backgroundColor: "cyan", height: "100px" }}>
      <Stack direction='row' sx={{ height: "100px" }} alignItems='center' justifyContent='space-between'>
        <Stack sx={{ display: { xs: "flex", md: "none" } }} alignItems='center'></Stack>
        <Stack direction='row' spacing={8} sx={{ alignItems: "center" }}>
          <Stack
            direction='row'
            alignContent='center'
            justifyContent='center'
            sx={{ display: { xs: "flex", md: "none" } }}
            spacing={8}
          >
            <StyledHamburger toggled={isOpen} toggle={setIsOpen} />
            <Stack direction='row' alignItems='center'>
              <StyledLink to='/cart'>
                <ShoppingCart sx={{ height: "24px", width: "24px" }} />
                {cartItems.length > 0 && <Box>{cartItems.length}</Box>}
              </StyledLink>
            </Stack>
          </Stack>
          <StyledLink to='/' sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <PhoneIcon sx={{ height: "50px", width: "50px" }} />
            <Box sx={{ fontSize: "40px" }}>Debbie's store</Box>
          </StyledLink>
          <Stack direction='row' spacing={8} sx={{ display: { xs: "none", md: "flex" } }}>
            {Links.map((link) => (
              <NavLink route={link.route} key={link.route}>
                <Box>{link.name}</Box>
              </NavLink>
            ))}
            <Stack direction='row' alignItems='center'>
              <StyledLink to='/cart'>
                <ShoppingCart sx={{ height: "24px", width: "24px" }} />
                {cartItems.length > 0 && <Box sx={{ ml: "12px" }}>{cartItems.length}</Box>}
              </StyledLink>
            </Stack>
          </Stack>

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
        </Stack>
        <Stack>
          <BiUserCheck />
        </Stack>
      </Stack>
      <Box sx={{ display: "flex" }}>
        {isOpen && (
          <Box sx={{ display: { md: "none" } }}>
            <Stack>
              {" "}
              {Links.map((link) => (
                <NavLink route={link.route} key={link.route}>
                  <Box>{link.name}</Box>
                </NavLink>
              ))}
            </Stack>
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
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
