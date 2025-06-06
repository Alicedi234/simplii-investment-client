import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StockSearch.scss";

export default function StockSearch() {
  const [searchSymbol, setSearchSymbol] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchSymbol.trim() !== "") {
      navigate(`/stock/${searchSymbol.toUpperCase()}`);
    }
  };

  return (
    <div className="stockSearch">
      <form onSubmit={handleSubmit} className="stockSearch__form">
        <label className="stockSearch__label lable2">
          Power Up Your Investment
        </label>
        <label className="stockSearch__label">
          Try Our Real-Time Stock Searching
        </label>
        <input
          className="stockSearch__input"
          type="text"
          placeholder="Enter your stock symbol (e.g. AAPL) Note: Must be valid stock symbol :)"
          value={searchSymbol}
          onChange={(e) => setSearchSymbol(e.target.value)}
        />
        <button type="submit" className="stockSearch__button">
          Search
        </button>
      </form>
    </div>
  );
}
