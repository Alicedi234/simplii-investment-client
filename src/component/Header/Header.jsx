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
        <Link to="/">
        <li className="header__nav--text">Home</li>
        </Link>
        </div>
        <div className="header__nav--item">
        <Link to="/portfolio/create">
        <li className="header__nav--text">MyPortfolio</li>
        </Link>
        </div>
        <div className="header__nav--item">
        <Link to="/favorite">
        <li className="header__nav--text">MyFavorite</li>
        </Link>
        </div>
      </ul>
    
    </div>
  ) 
}

