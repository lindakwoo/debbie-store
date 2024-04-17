import { Box, Image, Text, Badge, Flex, IconButton, Skeleton, useToast, Tooltip } from "@chakra-ui/react";
import { BiExpand } from "react-icons/bi";
import React, { useState } from "react";
import { addToFavorites, removeFromFavorites } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";
import { addCartItem } from "../redux/actions/cartActions";
import { useEffect } from "react";
import { TbShoppingCartPlus } from "react-icons/tb";

const IdeaCard = ({ idea, loading }) => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);
  console.log(idea.images);

  return (
    <Skeleton isLoaded={!loading}>
      <ReactLink to={`/idea/${idea._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Box
          _hover={{ transform: "scale(1.1)", transitionDuration: "0.5s" }}
          borderWidth='1px'
          overflow='hidden'
          p='4'
          shadow='md'
          sx={{
            borderRadius: "10px",
            // backgroundImage: `url("${product.images[0]}")`,
            // backgroundRepeat: "no-repeat",
            // backgroundSize: "cover",
            backgroundColor: "pink",
            height: "400px",
            width: "250px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {idea.name}
          <Image
            sx={{ height: "auto", width: "100%" }}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            src={idea.images[isShown && idea.images.length === 2 ? 1 : 0]}
            fallbackSrc='https://via.placeholder.com/150'
            alt={idea.name}
            // height='200px'
          />
        </Box>
      </ReactLink>
    </Skeleton>
  );
};

export default IdeaCard;
