import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue as mode,
  Text,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { Link as ReactLink } from "react-router-dom";
import { BsPhoneFlip } from "react-icons/bs";
import axios from "axios";

const LandingScreen = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const fetchRepos = async () => {
    try {
      const { data } = await axios.get(`https://api.github.com/users/${username}/repos`);
      console.log(data);

      setRepos(data);
      setError(null);
    } catch (error) {
      setRepos([]);
      setError("user not found or there was an error fetching the repos", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRepos();
  };

  return (
    <Box maxW='8xl' mx='auto' p={{ base: "0", lg: "12" }} minH='6xl'>
      <div>
        <form onSubmit={handleSubmit}>
          <label for='username'>username</label>
          <input
            name='username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type='text'
          ></input>
          <button type='submit'>get repos</button>
        </form>
        {repos && (
          <ul>
            {repos.map((repo, i) => {
              return (
                <li key={`repo: ${repo} ${i}`}>
                  <a href={repo.html_url}>{repo.name}</a>
                </li>
              );
            })}
          </ul>
        )}
        {error && <div>{error}</div>}
      </div>
      <Stack direction={{ base: "column-reverse", lg: "row" }} spacing={{ base: "0", lg: "20" }}>
        <Box
          width={{ lg: "sm" }}
          transform={{ base: "translateY(-50%)", lg: "none" }}
          bg={{ base: mode("cyan.50", "gray.700"), lg: "transparent" }}
          mx={{ base: "6", md: "8", lg: "0" }}
          px={{ base: "6", md: "8", lg: "0" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack spacing={{ base: "8", lg: "10" }}>
            <Stack spacing={{ base: "2", lg: "4" }}>
              <Flex alignItems='center'>
                <Icon as={BsPhoneFlip} h={12} w={12} color={mode("cyan.500", "yellow.200")} />
                <Text fontSize='4xl' fontWeight='bold'>
                  Debbie's store
                </Text>
              </Flex>
              <Heading size='xl' fontWeight='normal'>
                Refresh your equipment
              </Heading>
            </Stack>
            <HStack spacing='3'>
              <Link as={ReactLink} to='/products' color={mode("cyan.500", "yellow.200")}>
                Discover now
              </Link>
              <Icon color={mode("cyan.500", "yellow.200")} as={FaArrowRight} />
            </HStack>
          </Stack>
        </Box>
        <Flex flex='1' overflow='hidden'>
          <Image
            src={mode("images/landing-light.jpg", "images/landing-dark.jpg")}
            fallback={<Skeleton />}
            maxH='550px'
            minW='300px'
            objectFit='cover'
            flex='1'
          />
        </Flex>
      </Stack>
    </Box>
  );
};

export default LandingScreen;
