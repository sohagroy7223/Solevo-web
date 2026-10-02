import { Link, NavLink } from "react-router";
import Logo from "../../../Components/Logo/Logo";
import { AuthContext } from "../../../Context/AuthContext";
import { use } from "react";

const Navbar = () => {
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
          to="/"
          className={({ isActive }) =>
            isActive ? "mr-4 font-bold bg-primary" : "mr-4"
          }
        >
          Shop
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
          About
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
    </>
  );

  const { user } = use(AuthContext);
  console.log(user);

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
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to="login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
