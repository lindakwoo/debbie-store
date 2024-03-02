import React from "react";
import { styled, Box, Stack } from "@mui/system";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { BsPhoneFlip } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => (
  <Box sx={{ maxWidth: "90%" }}>
    <Stack justifyContent='space-between' direction={{ xs: "column", md: "row" }} sx={{}}>
      <Stack alignItems='start'>
        <BsPhoneFlip />
        <p>Debbie's store</p>
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
