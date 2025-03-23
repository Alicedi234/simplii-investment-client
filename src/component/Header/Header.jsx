import { Link } from "react-router-dom";
import "./Header.scss";
export default function Header(){
  return(
    <div className="header">
      <ul className="header__nav">
        <div className="header__nav--item">
        <li className="header__nav--text">Simplii Investment</li>
        </div>
        <div className="header__nav--item">
        <Link to="/" className="header__nav--link">
        <li className="header__nav--text">Home</li>
        </Link>
        </div>
        <div className="header__nav--item">
        <Link to="/portfolio/create" className="header__nav--link">
        <li className="header__nav--text">Create Portfolio</li>
        </Link>
        </div>
        <div className="header__nav--item">
        <Link to="/portfolio/list" className="header__nav--link">
        <li className="header__nav--text">My Portfolios</li>
        </Link>
        </div>
      </ul>
    
    </div>
  ) 
}

