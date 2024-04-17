import { Alert, AlertTitle, AlertDescription, Center, Wrap, WrapItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import IdeaCard from "../components/IdeaCard";
import { getIdeas } from "../redux/actions/ideaActions";

import { IoMdAlert } from "react-icons/io";

const IdeasScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, ideas, pagination } = useSelector((state) => state.idea);

  useEffect(() => {
    dispatch(getIdeas(1));
  }, [dispatch]);

  return (
    <>
      {ideas.length >= 1 && (
        <Box>
          <Wrap spacing='30px' justify='center' minHeight='80vh' mx={{ base: "12", md: "20", lg: "32" }}>
            {error ? (
              <Alert sx={{ backgroundColor: "yellow" }} status='error'>
                <IoMdAlert />
                <AlertTitle>We are sorry!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              ideas.map((idea) => (
                <WrapItem key={idea._id}>
                  <Center w='250px' h='450px'>
                    <IdeaCard idea={idea} loading={loading} />
                  </Center>
                </WrapItem>
              ))
            )}
          </Wrap>
        </Box>
      )}
    </>
  );
};

export default IdeasScreen;
