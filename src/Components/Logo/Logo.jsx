import { Link } from "react-router";
import logo from "../../../public/Solevo.png";
const Logo = () => {
  return (
    <Link to="/">
      <div className="flex w-20 h-18">
        <img src={logo} alt="" />
      </div>
    </Link>
  );
};

export default Logo;
