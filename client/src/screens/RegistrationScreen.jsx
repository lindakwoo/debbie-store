import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Stack,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { IoMdAlert } from "react-icons/io";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import PasswordField from "../components/PasswordField";
import { register, resetPassword, resetState } from "../redux/actions/userActions";
import TextField from "../components/TextField";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { googleLogin } from "../redux/actions/userActions";

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = "/products";
  const toast = useToast();
  const { loading, error, userInfo } = useSelector((state) => state.user);
  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        })
        .then((res) => res.data);
      const { sub, email, name, picture } = userInfo;
      dispatch(googleLogin(sub, email, name, picture));
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({
        description: userInfo.firstLogin ? "Account created. Welcome aboard." : `Welcome back ${userInfo.name}`,
        status: "success",
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("A name is required."),
        email: Yup.string().email("Invalid email").required("This email address is required."),
        password: Yup.string()
          .min(1, "Password is too short - must contain at least 1 character.")
          .required("Password is required."),
        confirmPassword: Yup.string()
          .min(1, "Password is too short - must contain at least 1 character.")
          .required("Password is required.")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Container sx={{ mx: "auto" }} maxW='lg' py={{ base: "12", md: "24" }} px={{ base: "0", md: "8" }} minH='4xl'>
          <Stack spacing='8'>
            <Stack spacing='6'>
              <Stack spacing={{ base: "2", md: "3" }} textAlign='center'>
                <Heading sx={{ fontSize: "36px" }} fontSize={{ base: "md", lg: "xl" }}>
                  Create an account.
                </Heading>
                <HStack spacing='1' justify='center'>
                  <Text color='muted'>Already a user?</Text>
                  <Button
                    sx={{ color: "cyan", fontWeight: "1000" }}
                    as={ReactLink}
                    to='/login'
                    variant='link'
                    colorScheme='cyan'
                  >
                    Sign in
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={{ boxBR }}
              boxShadow={{ base: "none", md: "xl" }}
            >
              <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status='error'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <IoMdAlert />
                    <AlertTitle>We are sorry!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing='5'>
                  <FormControl>
                    <TextField type='text' name='name' placeholder='Your first and last name.' label='Full name' />
                    <TextField type='text' name='email' placeholder='you@example.com' label='Email' />
                    <PasswordField type='password' name='password' placeholder='Your password' label='Password' />
                    <PasswordField
                      type='password'
                      name='confirmPassword'
                      placeholder='Confirm your new password'
                      label='Confirm your password'
                    />
                  </FormControl>
                </Stack>
                <Stack spacing='6'>
                  <Button colorScheme='cyan' size='lg' fontSize='md' isLoading={loading} type='submit'>
                    Sign up
                  </Button>
                  <Button
                    leftIcon={<FcGoogle />}
                    colorScheme='cyan'
                    size='lg'
                    fontSize='md'
                    isLoading={loading}
                    onClick={() => handleGoogleLogin()}
                  >
                    Google sign up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default RegistrationScreen;
