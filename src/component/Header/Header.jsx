import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/icon/logo.png";

export default function Header(){
  return(
    <div className="header">
      <ul className="header__nav">
        <div className="header__nav--logo">
          <img src={logo} alt="logo" id="header__logo" />
        </div>
        <div className="header__nav--item">
        <Link to="/" className="header__nav--link">
        <li className="header__nav--text">Home</li>
        </Link>
        </div>
        <div className="header__nav--item">
        <Link to="/portfolio/create" className="header__nav--link">
        <li className="header__nav--text">CreateMyPortfolio</li>
        </Link>
        </div>
        <div className="header__nav--item">
        <Link to="/portfolio/list" className="header__nav--link">
        <li className="header__nav--text">MyPortfolios</li>
        </Link>
        </div>
      </ul>
    
    </div>
  ) 
}

