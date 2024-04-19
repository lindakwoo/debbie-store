import { BiExpand } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import { addToFavorites, removeFromFavorites } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";
import { addCartItem } from "../redux/actions/cartActions";
import { TbShoppingCartPlus } from "react-icons/tb";
import { styled, Stack, Box } from "@mui/system";

const Image = styled("img")({});
const Input = styled("input")({});
const Label = styled("label")({});
const IdeaCard = ({ idea, loading }) => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (idea && idea.reviews) {
      if (userInfo) {
        const hasReviewed = idea.reviews.some((review) => {
          return review.name === userInfo?.name;
        });
        setAlreadyReviewed(hasReviewed);
      }
    }
  }, [idea, userInfo]);

  return (
    <ReactLink to={`/idea/${idea._id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Stack
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
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        {idea.name}
        <Image
          sx={{ height: "auto", width: "100%" }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          src={idea.images[isShown && idea.images.length === 2 ? 1 : 0] || "https://via.placeholder.com/150"}
          alt={idea.name}
          // height='200px'
        />
        {userInfo && (
          <Stack direction='row' justifyContent='space-around' sx={{ width: "100%" }}>
            <Label sx={{ fontSize: "12px" }}> reviewed by {userInfo.name}</Label>
            <Input type='checkbox' checked={alreadyReviewed} />
          </Stack>
        )}
      </Stack>
    </ReactLink>
  );
};

export default IdeaCard;
