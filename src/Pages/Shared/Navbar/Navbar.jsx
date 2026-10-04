import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../../Components/Logo/Logo";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const handelSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be logOut",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logOut!",
    }).then((result) => {
      if (result.isConfirmed)
        logOutUser().then(() => {
          navigate("login");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "user logOut",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "mr-4 font-bold bg-primary" : "mr-4"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="allProducts"
          className={({ isActive }) =>
            isActive ? "mr-4 font-bold bg-primary" : "mr-4"
          }
        >
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "mr-4 font-bold bg-primary" : "mr-4"
          }
        >
          New Arrivals
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "mr-4 font-bold bg-primary" : "mr-4"
          }
        >
          Card
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "mr-4 font-bold bg-primary" : "mr-4"
          }
        >
          Collection
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "mr-4 font-bold bg-primary" : "mr-4"
          }
        >
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn hover:bg-primary hover:text-white">
              Account
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="profile">Profile</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                {user ? (
                  <Link onClick={handelSignOut}>Logout</Link>
                ) : (
                  <Link to="login">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
