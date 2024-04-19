import { Box, Flex, FormControl, Heading, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { setShipping } from "../redux/actions/cartActions";
import { setAddress, setPayment } from "../redux/actions/orderActions";
import TextField from "./TextField";
import { Link as ReactLink } from "react-router-dom";
import { styled, Stack } from "@mui/system";

const Input = styled("input")({});
const Label = styled("label")({ marginLeft: "10px", "& span": { fontWeight: "800" } });
const Button = styled("button")({});

const ShippingInformation = () => {
  const { shipping } = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(setAddress(values));
    dispatch(setPayment());
  };

  return (
    <Formik
      initialValues={{
        address: shippingAddress ? shippingAddress.address : "",
        postalCode: shippingAddress ? shippingAddress.postalCode : "",
        city: shippingAddress ? shippingAddress.city : "",
        country: shippingAddress ? shippingAddress.country : "",
      }}
      validationSchema={Yup.object({
        address: Yup.string().required("We need an address.").min(2, "This address is too short."),
        postalCode: Yup.string().required("We need a postal code.").min(2, "This postal code is too short."),
        city: Yup.string().required("We need a city.").min(2, "This city is too short."),
        country: Yup.string().required("We need a country.").min(2, "This country is too short."),
      })}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <>
          <Stack sx={{}} as='form'>
            <FormControl>
              <TextField name='address' placeholder='Street Address' label='Street Address' />
              <Flex>
                <Box flex='1' mr='10'>
                  <TextField name='postalCode' placeholder='Postal Code' label='Postal Code' type='number' />
                </Box>
                <Box flex='2'>
                  <TextField name='city' placeholder='City' label='City' />
                </Box>
              </Flex>
              <TextField name='country' placeholder='Country' label='Country' />
            </FormControl>
            <Box w='100%' pr='5'>
              <Heading fontSize='2xl' fontWeight='extrabold' mb='10'>
                Shipping Method
              </Heading>

              <Input
                type='radio'
                id='express'
                name='fav_language'
                value='14.99'
                defaultChecked={shipping === 14.99}
                onChange={() => {
                  dispatch(setShipping(Number(14.99).toFixed(2)));
                }}
              />
              <Label for='express'>
                <span>Express 14.99</span> (Dispatched in 24 hours){" "}
              </Label>
              <br />
              <Input
                type='radio'
                id='standard'
                name='fav_language'
                value='4.99'
                defaultChecked={shipping === 4.99}
                onChange={() => {
                  dispatch(setShipping(Number(4.99).toFixed(2)));
                }}
              />
              <Label for='standard'>
                <span>Standard 4.99</span> (Dispatched in 2-3 days)
              </Label>
              <br />
            </Box>
          </Stack>
          <Stack sx={{ mt: "24px" }} justifyContent='space-between' gap='2' direction={{ base: "column", lg: "row" }}>
            <Button variant='outline' colorScheme='cyan' w='100%' as={ReactLink} to='/cart'>
              Back to cart
            </Button>
            <Button
              variant='outline'
              colorScheme='cyan'
              w='100%'
              as={ReactLink}
              to='/payment'
              onClick={formik.handleSubmit}
            >
              Continue to Payment
            </Button>
          </Stack>
        </>
      )}
    </Formik>
  );
};

export default ShippingInformation;
