import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/images/logo.svg";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Ricardo logo" />
      </Link>
    </header>
  );
};

export default Header;
