import React from "react";
import { Link } from "react-router-dom";
import { Box, styled, Stack } from "@mui/system";

const Button = styled("button")({});
const StyledLink = styled(Link)({});

const NavLink = ({ children, route }) => (
  <StyledLink to={route}>
    <Button>{children}</Button>
  </StyledLink>
);

export default NavLink;
