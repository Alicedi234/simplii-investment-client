import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPortfolioCreate.scss";
import coin from "../../assets/icon/coins.png";
import badgecheck from "../../assets/icon/badge-check.png";
import rocket from "../../assets/icon/rocket-lunch.png";

export default function MyPortfolio() {
  const baseUrl = import.meta.env.VITE_PORTFOLIO_API_BASE_URL;

  const navigate = useNavigate();
  const [portfolioName, setPortfolioName] = useState("");
  const [stocks, setStocks] = useState([
    {
      symbol: "",
      totalAmount: "",
      buyInPrice: "",
      buyInDate: "",
    },
  ]);

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
      },
    ]);
  };

  const handleRemoveStock = (index) => {
    setStocks(stocks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      portfolioName,
      createdAt: new Date().toISOString(),
      holdings: stocks,
    };
    try {
      const response = await fetch(`${baseUrl}/api/myportfolio/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/portfolio/${data.portfolioId}`);
      } else {
        alert("Failed to create portfolio");
      }
    } catch (error) {
      console.error("Error submitting portfolio", error);
    }
  };

  return (
    <div className="myportfolio">
      <h1 className="myportfolio__title maintitle">
        Create Your Portfolio
        <img src={coin} alt="" className="myportfolio__icon" />
      </h1>
      <form onSubmit={handleSubmit} className="myportfolio__form">
        <div className="myportfolio__portfolio">
          <label className="myportfolio__label">
            <img src={rocket} alt="" className="myportfolio__icon" />
            Portfolio Name
          </label>
          <input
            type="text"
            className="myportfolio__input"
            placeholder="Portfolio Name"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
            required
          />
        </div>

        {stocks.map((stock, index) => (
          <div key={index} className="myportfolio__stock">
            <label className="myportfolio__label">
              <img src={badgecheck} alt="" className="myportfolio__icon" />
              Stock Symbol
            </label>
            <input
              type="text"
              placeholder="Symbol (e.g. AAPL)"
              value={stock.symbol}
              onChange={(e) =>
                handleStockChange(index, "symbol", e.target.value)
              }
              className="myportfolio__input"
              required
            />
            <label className="myportfolio__label">
              <img src={badgecheck} alt="" className="myportfolio__icon" />
              Total Amount ($)
            </label>
            <input
              type="number"
              placeholder="Total Amount ($)"
              value={stock.totalAmount}
              onChange={(e) =>
                handleStockChange(index, "totalAmount", e.target.value)
              }
              className="myportfolio__input"
              required
            />
            <label className="myportfolio__label">
              <img src={badgecheck} alt="" className="myportfolio__icon" />
              Buy-In Price
            </label>
            <input
              type="number"
              placeholder="Buy-in Price"
              value={stock.buyInPrice}
              onChange={(e) =>
                handleStockChange(index, "buyInPrice", e.target.value)
              }
              className="myportfolio__input"
              required
            />
            <label className="myportfolio__label">
              <img src={badgecheck} alt="" className="myportfolio__icon" />
              Buy-In Date
            </label>
            <input
              type="date"
              value={stock.buyInDate}
              onChange={(e) =>
                handleStockChange(index, "buyInDate", e.target.value)
              }
              className="myportfolio__input"
              required
            />
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

        <div className="myportfolio__button-container">
          <button
            type="button"
            onClick={handleAddStock}
            className="myportfolio__button"
          >
            + Add Another Stock
          </button>

          <button type="submit" className="myportfolio__button">
            Create Portfolio
          </button>
        </div>
      </form>
    </div>
  );
}
