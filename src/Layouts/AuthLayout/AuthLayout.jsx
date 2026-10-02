import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Logo from "../../Components/Logo/Logo";
const AuthLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="max-w-11/12 mx-auto space-y-10">
      <div className="px-5 py-3">
        <Logo></Logo>
      </div>
      <div className="flex items-center justify-center h-screen">
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
