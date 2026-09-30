import { Link } from "react-router";
import logo from "/Solevo.png";
const Logo = () => {
  return (
    <Link to="/">
      <div className="flex w-23 h-20 p-0">
        <img src={logo} alt="" />
      </div>
    </Link>
  );
};

export default Logo;
