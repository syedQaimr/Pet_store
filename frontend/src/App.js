import "./App.css";
import Header from "./component/layout/Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState, useEffect } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Profile from "./component/User/Profile";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux/es/hooks/useSelector";
import UserOptions from "./component/layout/Header/UserOptions";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/orderDetails";
import Dashboard from "./component/Admin/Dashboard";
import NewProduct from "./component/Admin/NewProduct";
import ProductList from "./component/Admin/ProductList";
import OrderList from "./component/Admin/OrderList";
import UsersList from "./component/Admin/UserList";
import UpdateProduct from "./component/Admin/UpdateProduct";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UpdateUser from "./component/Admin/UpdateUser";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios?.get("/api/v1/stripeapikey");

    setStripeApiKey(data?.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/account" element={<Profile />} isAuthenticated />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route
          path="/process/payment"
          element={
            stripeApiKey ? (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* <Route path="/process/payment" element={<Payment/>} /> */}
        {/* <Route      component={
          window.location.pathname === "/process/payment" ? null : NotFound
        }
        /> */}

        <Route isAdmin={true} path="/admin/dashboard" element={<Dashboard />} />
        <Route
          path="/admin/products"
          isAdmin={true}
          element={<ProductList />}
        />
        <Route path="/admin/product" isAdmin={true} element={<NewProduct />} />

        <Route path="/admin/orders" isAdmin={true} element={<OrderList />} />

        <Route path="/admin/users" isAdmin={true} element={<UsersList />} />
        <Route
          path="/admin/product/:id"
          isAdmin={true}
          element={<UpdateProduct />}
        />

        <Route
          path="/admin/order/:id"
          isAdmin={true}
          element={<ProcessOrder />}
        />

        <Route path="/admin/user/:id" isAdmin={true} element={<UpdateUser />} />

        {/*

        

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        /> */}
      </Routes>

      {/* <Route exact path="/about" component={About} /> */}

      <Footer />
    </Router>
  );
}

export default App;
