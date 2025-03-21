import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function MyPortfolio(){

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
      const response = await fetch("http://localhost:3000/api/myportfolio/create", {
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
    <div >
      <h1 className="text-2xl font-bold mb-4">Create Your Portfolio</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Portfolio Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
            required
          />
        </div>

        <h2 className="text-xl font-semibold mt-6">Stocks</h2>
        {stocks.map((stock, index) => (
          <div key={index} className="border p-4 rounded mb-2 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Symbol (e.g. AAPL)"
                value={stock.symbol}
                onChange={(e) => handleStockChange(index, "symbol", e.target.value)}
                className="flex-1 p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Total Amount ($)"
                value={stock.totalAmount}
                onChange={(e) => handleStockChange(index, "totalAmount", e.target.value)}
                className="w-40 p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Buy-in Price"
                value={stock.buyInPrice}
                onChange={(e) => handleStockChange(index, "buyInPrice", e.target.value)}
                className="w-40 p-2 border rounded"
                required
              />
              <input
                type="date"
                value={stock.buyInDate}
                onChange={(e) => handleStockChange(index, "buyInDate", e.target.value)}
                className="w-40 p-2 border rounded"
                required
              />
            </div>
            {stocks.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveStock(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddStock}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Another Stock
        </button>

        <div>
          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
          >
            Create Portfolio
          </button>
        </div>
      </form>
    </div>
  );
}






  
