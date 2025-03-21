import { Link } from "react-router-dom";
import "./Header.scss";
export default function Header(){
  return(
    <div className="header">
      <ul className="header__nav">
        <li className="header__nav-item">Simplii Investment</li>
        <Link to="/">
        <li className="header__nav-item">HomePage</li>
        </Link>
        <Link to="/portfolio/create">
        <li className="header__nav-item">MyPortfolio</li>
        </Link>
        <li className="header__nav-item">MyFavoriate</li>
      </ul>
    
    </div>
  ) 
}

