import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Wrap,
  useToast,
  Textarea,
  Input,
  Tooltip,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { BiCheckShield, BiPackage, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/actions/productActions";
import { useEffect, useState } from "react";
import { addCartItem } from "../redux/actions/cartActions";
import { IoMdAlert } from "react-icons/io";

const sizes = {
  "x-small": "xs",
  small: "s",
  medium: "m",
  large: "l",
  "x-large": "xl",
};

const ProductScreenWithSize = () => {
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("x-small");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const toast = useToast();

  const hasSize = (size) => {
    return product.sizes[size] > 0;
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const changeAmount = (input) => {
    if (input === "plus") {
      setAmount(amount + 1);
    }
    if (input === "minus") {
      setAmount(amount - 1);
    }
  };

  const addItem = () => {
    if (cartItems.some((cartItem) => cartItem.id === id)) {
      const existingItem = cartItems.find((cartItem) => cartItem.id === id);
      dispatch(addCartItem(id, amount + Number(existingItem.qty, sizes[size])));
    } else {
      dispatch(addCartItem(id, amount, sizes[size]));
    }
    toast({
      description: "Item has been added.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing='4'>
          <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
        </Stack>
      ) : error ? (
        <Alert sx={{ backgroundColor: "yellow" }} status='error'>
          <IoMdAlert />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: "3xl", lg: "5xl" }}
            mx='auto'
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            <Stack direction={{ base: "column", lg: "row" }} align='flex-start'>
              <Stack pr={{ base: "0", md: "row" }} flex='1.5' mb={{ base: "12", md: "none" }}>
                {product.productIsNew && (
                  <Badge p='2' rounded='md' w='50px' fontSize='0.8em' colorScheme='green'>
                    New
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge rounded='full' w='70px' fontSize='0.8em' colorScheme='red'>
                    sold out
                  </Badge>
                )}
                <Heading fontSize='2xl' fontWeight='extrabold'>
                  {product.brand} {product.name}
                </Heading>
                <Stack spacing='5'>
                  <Box>
                    <Text fontSize='xl'>${product.price}</Text>
                  </Box>
                  <Text>{product.subtitle}</Text>
                  <Text>{product.description}</Text>
                  <HStack spacing='8' alignItems='center'>
                    <Text fontWeight='bold'>Size</Text>
                    <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
                      <select
                        maxW='68px'
                        focusBorderColor={mode("cyan.500", "cyan.200")}
                        value={size}
                        onChange={(e) => {
                          setSize(e.target.value);
                        }}
                      >
                        <option disabled={!hasSize("xs")}>x-small</option>
                        <option disabled={!hasSize("s")}>small</option>
                        <option disabled={!hasSize("m")}>medium</option>
                        <option disabled={!hasSize("l")}>large</option>
                        <option disabled={!hasSize("xl")}>x-large</option>
                      </select>
                    </Flex>
                    <Text fontWeight='bold'>Quantity</Text>
                    <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
                      <Button isDisabled={amount <= 1} onClick={() => changeAmount("minus")}>
                        <MinusIcon />
                      </Button>
                      <Text mx='30px'>{amount}</Text>
                      <Button isDisabled={amount >= product.stock} onClick={() => changeAmount("plus")}>
                        <SmallAddIcon />
                      </Button>
                    </Flex>
                  </HStack>

                  <Badge fontSize='lg' width='170px' textAlign='center' colorScheme='gray'>
                    In Stock: {product.stock}
                  </Badge>
                  <Button
                    variant='outline'
                    isDisabled={product.stock === 0}
                    colorScheme='cyan'
                    onClick={() => addItem()}
                  >
                    Add to cart
                  </Button>
                  <Stack width='270px'>
                    <Flex alignItems='center'>
                      <BiPackage size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        Shipped in 2 - 3 days
                      </Text>
                    </Flex>
                    <Flex alignItems='center'>
                      <BiCheckShield size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        2 year extended warranty
                      </Text>
                    </Flex>
                    <Flex alignItems='center'>
                      <BiSupport size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        We're here for you 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex direction='column' align='center' flex='1' _dark={{ bg: "gray.900" }}>
                <Image
                  mb='30px'
                  src={product.images[0]}
                  alt={product.name}
                  fallbackSrc='https://via.placeholder.com/250'
                />
                <Image
                  mb='30px'
                  src={product.images[1]}
                  alt={product.name}
                  fallbackSrc='https://via.placeholder.com/250'
                />
              </Flex>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default ProductScreenWithSize;
