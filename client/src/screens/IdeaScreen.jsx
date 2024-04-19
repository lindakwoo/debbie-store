import { styled, Stack, Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIdea, createIdeaReview } from "../redux/actions/ideaActions";
import { useToast } from "@chakra-ui/react";
import { removeReview } from "../redux/actions/ideaActions";
const Input = styled("textArea")({});
const Button = styled("button")({});
const Image = styled("img")({});
const Table = styled("table")({ textAlign: "left" });

const IdeaScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { idea } = useSelector((state) => state.idea);
  const { userInfo } = useSelector((state) => state.user);
  const toast = useToast();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  useEffect(() => {
    dispatch(getIdea(id));
  }, [dispatch, id, showReviews]);

  useEffect(() => {
    if (idea && idea.reviews) {
      setReviews(idea.reviews);
      setRating(1);
      setComment("");
      if (userInfo) {
        const hasReviewed = idea.reviews.some((review) => {
          return review.name === userInfo?.name;
        });
        setAlreadyReviewed(hasReviewed);
      }
    }
  }, [idea, userInfo]);

  const submitReview = async () => {
    await dispatch(createIdeaReview(id, comment, rating, userInfo?.name));
    await dispatch(getIdea(id)); // Fetch latest idea data including the new review

    toast({
      description: "Review has been added.",
      status: "success",
      isClosable: true,
    });
  };

  const deleteReview = async (reviewId) => {
    await dispatch(removeReview(id, reviewId));
    await dispatch(getIdea(id));

    toast({
      description: "Review has been deleted.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <>
      {idea && (
        <>
          <Stack sx={{ mx: "124px" }}>
            <Stack justifyContent='center' direction='row' gap={20}>
              <Stack gap={5} alignItems='start'>
                <Box sx={{ fontSize: "32px" }}>T-Shirt: {idea.name}</Box>
                {!alreadyReviewed && userInfo && (
                  <Stack direction='column' gap={5}>
                    <Stack>
                      <Box fontWeight='bold'>Rating</Box>

                      <select
                        maxW='68px'
                        value={rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </Stack>

                    <Stack>
                      <Box fontWeight='bold'>Comment</Box>

                      <Input
                        // sx={{ height: "100px", px: "5px", width: "400px" }}
                        sx={{ height: "100px", px: "5px" }}
                        type='text'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Stack>

                    <Button sx={{ backgroundColor: "yellow", p: "10px" }} onClick={() => submitReview()}>
                      Submit review
                    </Button>
                  </Stack>
                )}{" "}
                {alreadyReviewed && <Box>{userInfo.name}, you have added a review to this tshirt idea.</Box>}
                {!userInfo && <Box> You must sign in to review this shirt.</Box>}
              </Stack>

              <Stack>
                <Image
                  sx={{ width: "400px" }}
                  mb='30px'
                  src={idea.images[0]}
                  alt={idea.name}
                  fallbackSrc='https://via.placeholder.com/250'
                />
                {/* <Image
                sx={{ width: "400px" }}
                mb='30px'
                src={idea.images[1]}
                alt={idea.name}
                fallbackSrc='https://via.placeholder.com/250'
              /> */}
              </Stack>
            </Stack>
            <Stack justifyContent='end' alignItems='end'>
              <Button
                onClick={() => {
                  setShowReviews(!showReviews);
                }}
                sx={{ backgroundColor: "black", color: "white", p: "10px", width: "200px", mb: "24px" }}
              >
                {showReviews ? "Close reviews" : "See all reviews"}
              </Button>
            </Stack>
          </Stack>

          {showReviews && (
            <Stack sx={{ backgroundColor: "beige", px: "200px" }}>
              <Box sx={{ fontSize: "24px" }}>Reviews</Box>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews?.map((review, index) => (
                    <tr key={index}>
                      <td>{review.name}</td>
                      <td>{review.rating}</td>
                      <td>{review.comment}</td>
                      {userInfo?.name === review.name && (
                        <Button
                          onClick={() => {
                            deleteReview(review._id);
                          }}
                          sx={{ backgroundColor: "red", color: "white", p: "5px" }}
                        >
                          Delete my review
                        </Button>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default IdeaScreen;
