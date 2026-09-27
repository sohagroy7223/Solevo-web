import { Outlet, useLocation } from "react-router";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";
import { useEffect } from "react";

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="max-w-11/12 mx-auto space-y-10">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
