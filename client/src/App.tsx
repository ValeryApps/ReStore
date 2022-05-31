import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import AboutPage from "./Page/AboutPage";
import Catalog from "./Page/catalogs/Catalog";
import ProductDetails from "./Page/catalogs/ProductDetails";
import ContactPage from "./Page/ContactPage";
import ErrorsPage from "./Page/errors/ErrorsPage";
import HomePage from "./Page/HomePage";
import 'react-toastify/dist/ReactToastify.css'
import BasketPage from "./Page/basket/BasketPage";
import LoadingComponent from "./components/LoadingComponent";
import CheckoutPage from "./Page/checkout/CheckoutPage";
import Counter from "./test/Counter";
import { useAppDispatch } from "./store/configStore";
import { fetchBasketAsync } from "./store/basket/basketSlice";
import NotFound from "./Page/errors/NotFound";
import Register from "./Page/account/Register";
import Login from "./Page/account/Login";
import { fetchCurrentUserAsync } from "./store/account/accountSlice";
import OrdersPage from "./Page/orders/OrdersPage";

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUserAsync());
      await dispatch(fetchBasketAsync())
    } catch (error) {
      console.log(error);

    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => {
      setLoading(false);
    })
  }, [initApp])

  const [darkmode, setDarkmode] = useState(false);
  const paletteMode = darkmode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteMode,
      background: {
        default: paletteMode === 'light' ? '#eaeaea' : '#121212'
      }
    }

  })
  const changeTheme = () => {
    setDarkmode(!darkmode);
  }
  if (loading) return <LoadingComponent message="Initializing app..." />
  return (
    <ThemeProvider theme={theme} >
      <ToastContainer position="bottom-right" theme="colored" />
      <CssBaseline />
      <Header switchColor={changeTheme} />



      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/errors" element={<ErrorsPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/notfound" element={<NotFound />} />
      </Routes>

    </ThemeProvider>
  );
}

export default App;
