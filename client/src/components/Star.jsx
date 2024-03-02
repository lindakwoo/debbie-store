import React from "react";
import { BiStar } from "react-icons/bi";
import { styled, Box, Stack } from "@mui/system";

const StyledStar = styled(BiStar)({});

const Star = ({ rating = 0, star = 0 }) => (
  <StyledStar sx={{ color: rating >= star || rating === 0 ? "cyan" : "gray" }} />
);

export default Star;
