import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function StockSearch () {
  const [searchSymbol, setSearchSymbol] =useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchSymbol.trim() !== "") {
      navigate(`/stock/${searchSymbol.toUpperCase()}`);
    }
  };

  return (
    <div>
    <form onSubmit = {handleSubmit}>
      <label htmlFor="">Simplii Investment</label>
      <input type="text" 
      palceholder ="Enter your stock symbol (e.g. AAPL)"
      value = {searchSymbol}
      onChange = {(e) => setSearchSymbol(e.target.value)}
      />
      <button type ="button">Search</button>
    </form>
      </div>
  )
}