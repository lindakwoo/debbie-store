import { Box, Stack, Heading, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UsersTab from "../components/UsersTab";
import OrdersTab from "../components/OrdersTab";
import ProductsTab from "../components/ProductsTab";
import ReviewsTab from "../components/ReviewsTab";

const AdminConsoleScreen = () => {
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();

  return userInfo && userInfo.isAdmin ? (
    <Box p='20px' minH='100vh'>
      <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
        <Stack pr={{ base: 0, md: 14 }} spacing={{ base: 8, md: 10 }} flex='1.5' mb={{ base: 12, md: "none" }}>
          <Heading fontSize='2xl' fontWeight='extrabold'>
            Admin Console
          </Heading>
          <Tabs size='md' variant='enclosed'>
            <TabList sx={{ mb: "30px" }}>
              <Tab sx={{ p: "10px", backgroundColor: "yellow", ml: "20px" }}>Users</Tab>
              <Tab sx={{ p: "10px", backgroundColor: "yellow", ml: "20px" }}>Products</Tab>
              {/* <Tab>Reviews</Tab> */}
              <Tab sx={{ p: "10px", backgroundColor: "yellow", ml: "20px" }}>Orders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box sx={{ fontSize: "32px" }}>USERS</Box>
                <UsersTab />
              </TabPanel>
              <TabPanel>
                <Box sx={{ fontSize: "32px" }}>PRODUCTS</Box>
                <ProductsTab />
              </TabPanel>
              {/* <TabPanel>
                <ReviewsTab />
              </TabPanel> */}
              <TabPanel>
                <Box sx={{ fontSize: "32px" }}>ORDERS</Box>
                <OrdersTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Navigate to='/products' replace={true} state={{ from: location }} />
  );
};

export default AdminConsoleScreen;
