import { Outlet, useLocation, useNavigate } from "react-router";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";
import { useEffect } from "react";

const RootLayout = () => {
  const { pathname } = useLocation();
  const { state } = useNavigate();

  // 🔹 State to control initial loading

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, state]);

  return (
    <div className="max-w-11/12 mx-auto space-y-10">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
