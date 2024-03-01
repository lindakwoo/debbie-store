import ProductsScreen from "./screens/ProductsScreen";
import { styled, Box, Stack, ThemeProvider } from "@mui/system";
import LandingScreen from "./screens/LandingScreen";
import ProductScreen from "./screens/ProductScreen";
import { theme } from "./theme";
import Header from "./components/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

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
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
