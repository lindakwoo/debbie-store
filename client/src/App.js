import ProductsScreen from "./screens/ProductsScreen";
import { styled, Box, Stack, ThemeProvider } from "@mui/system";
import LandingScreen from "./screens/LandingScreen";
import ProductScreen from "./screens/ProductScreen";
import { theme } from "./theme";
import Header from "./components/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />{" "}
        <main>
          <Routes>
            <Route path='/products' element={<ProductsScreen />} />
            <Route path='/' element={<LandingScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
          
          </Routes>
        </main>
        <Footer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
