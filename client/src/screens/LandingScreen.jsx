import React from "react";
import { styled, Box, Stack } from "@mui/system";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsPhoneFlip } from "react-icons/bs";

const PhoneIcon = styled(BsPhoneFlip)({});
const Heading = styled("headinmg")({});
const Image = styled("img")(() => {});
const ArrowRight = styled(FaArrowRight)({});
const StyledLink = styled(Link)({});

const LandingScreen = () => (
  <>
    <Box sx={{ maxWidth: "80%", mx: "auto", px: { xs: 0, lg: "12px", minHeight: "60%" } }}>
      <Stack direction={{ xs: "column-reverse", lg: "row" }} spacing='20px'>
        <Box
          sx={{
            transform: { xs: "trasnlateY(-50%", lg: "none" },
            backgroundColor: { xs: "gray", lg: "transparent" },
            mx: { xs: "6px", md: "8px", lg: "0" },
            px: { xs: "6px", md: "8px", lg: "0" },
            py: { xs: "6px", md: "8px", lg: "12px" },
          }}
        >
          <Stack spacing={{ xs: "8px", lg: "10px" }}>
            <Stack spacing={{ xs: "2px", lg: "4px" }}>
              <Stack direction='row' alignItems='center'>
                <PhoneIcon sx={{ height: "40px", width: "40px" }} />
                <Box sx={{ fontSize: "40px" }}>Debbie's Site</Box>
              </Stack>
              <Heading sx={{ fontSize: "36px" }}>Refresh your equipment</Heading>
            </Stack>
            <Stack direction='row' spacing='10px'>
              <StyledLink sx={{ textDecoration: "none" }} to='/products'>
                Discover Now{" "}
              </StyledLink>
              <ArrowRight sx={{ color: "red" }} />
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ overflow: "hidden" }}>
          <Image sx={{ maxHeight: "550px", minWidth: "300px" }} src='images/landing-light.jpg' />
        </Box>
      </Stack>
    </Box>
  </>
);

export default LandingScreen;
