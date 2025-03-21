import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./MyPortfolioCreate.scss";

export default function MyPortfolio(){
  
  const baseUrl = import.meta.env.VITE_PORTFOLIO_API_BASE_URL;



  const navigate = useNavigate()
  const [portfolioName, setPortfolioName] = useState("");
  const [stocks, setStocks] = useState([
    {
      symbol: "",
      totalAmount: "",
      buyInPrice: "",
      buyInDate: "",
    }
  ])

  const handleStockChange = (index, field, value) => {
    const updated = [...stocks];
    updated[index][field] = value;
    setStocks(updated);
  };

  const handleAddStock = () => {
    setStocks([
      ...stocks,
      {
        symbol: "",
        totalAmount: "",
        buyInPrice: "",
        buyInDate: "",
      }
    ])
  }

  const handleRemoveStock = (index) => {
    setStocks(stocks.filter((_,i) =>i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      portfolioName,
      createdAt: new Date().toISOString(),
      holdings: stocks,
    }
    try {
      const response = await fetch(`${baseUrl}/api/myportfolio/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      
      if (response.ok) {
        const data = await response.json();
        navigate(`/portfolio/${data.portfolioId}`);
      } else{
        alert("Failed to create portfolio");
      }
    } catch (error) {
      console.error("Error submitting portfolio", error);
    }
  }
  
  return (
    <div className="myportfolio">
      <h1 className="myportfolio__title">Create Your Portfolio</h1>
      <form onSubmit={handleSubmit} className="myportfolio__form">
        <div>
          <label className="myportfolio__label">Portfolio Name</label>
          <input
            type="text"
            className="myportfolio__input"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
            required
          />
        </div>

        <h2 className="myportfolio__title">Stocks</h2>
        {stocks.map((stock, index) => (
          <div key={index} className="myporfolio__stock">
            <di>
              <input
                type="text"
                placeholder="Symbol (e.g. AAPL)"
                value={stock.symbol}
                onChange={(e) => handleStockChange(index, "symbol", e.target.value)}
                className="myportfolio__input"
                required
              />
              <input
                type="number"
                placeholder="Total Amount ($)"
                value={stock.totalAmount}
                onChange={(e) => handleStockChange(index, "totalAmount", e.target.value)}
                className="myportfolio__input"
                required
              />
              <input
                type="number"
                placeholder="Buy-in Price"
                value={stock.buyInPrice}
                onChange={(e) => handleStockChange(index, "buyInPrice", e.target.value)}
                className="myportfolio__input"
                required
              />
              <input
                type="date"
                value={stock.buyInDate}
                onChange={(e) => handleStockChange(index, "buyInDate", e.target.value)}
                className="myportfolio__input"
                required
              />
            </di>
            {stocks.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveStock(index)}
                className="myportfolio__button"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddStock}
          className="myportfolio__button"
        >
          + Add Another Stock
        </button>

        <div>
          <button
            type="submit"
            className="myportfolio__button"
          >
            Create Portfolio
          </button>
        </div>
      </form>
    </div>
  );
}






  
