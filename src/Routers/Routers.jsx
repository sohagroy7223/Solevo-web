import { createBrowserRouter } from "react-router";

import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Profile from "../Components/UserProfile/Profile";
import Error from "../Components/Error/Error";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Card from "../Pages/Card/Card";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashborad/Dashboard";
import Payment_success from "../Components/Payment/Payment_success";
import PaymentCancel from "../Components/Payment/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },

      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/card",
        Component: Card,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "dashboard/payment-success",
        Component: Payment_success,
      },
      {
        path: "dashboard/payment-cancel",
        Component: PaymentCancel,
      },
    ],
  },
]);
