import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./pieChart.scss";
import color1 from "../../assets/icon/color1.png";
import color2 from "../../assets/icon/color2.png";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const { portfolioId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_PORTFOLIO_API_BASE_URL;

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/myportfolio/${portfolioId}/analysis`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch analysis, status ${res.status}`);
        }
        const data = await res.json();
        setAnalysis(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (portfolioId) {
      fetchAnalysis();
    }
  }, [portfolioId]);

  if (loading) return <p>Loading Analysis...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!analysis) return <p>No data</p>;

  const { totalInvested, totalCurrentValue, portfolioROI, holdings } = analysis;

  // PieChart Logic

  const labels = holdings.map((h) => h.symbol);
  const dataValues = holdings.map((h) => h.currentValue);
  const pieData = {
    labels,
    datasets: [
      {
        label: "Portfolio Allocation",
        data: dataValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#32CD32",
          "#ffa600",
          "#bc5090",
        ],
      },
    ],
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="piechart">
      <div className="piechart__chart">
        <h2 style={{ textAlign: "center" }} className="piechart__chart--title">
          Allocation by Current Value
          <img src={color1} alt="" className="piechart__icon" />
        </h2>
        <Pie data={pieData} options={pieOptions} />
      </div>

      <div className="piechart__stockdata-container">
        <h2 className="piechart__stockdata__title">
          Holding List
          <img src={color2} alt="" className="piechart__icon" />
        </h2>
        {holdings.map((stock) => (
          <div
            key={stock.symbol}
            style={{
              border: "1px solid #ccc",
              marginTop: "1rem",
              padding: "1rem",
            }}
            className="piechart__stockdata"
          >
            <p className="piechart__stockdata--row">
              <span className="piechart__stockdata--label">Symbol</span>
              <span className="piechart__stockdata--value">{stock.symbol}</span>
            </p>
            <p className="piechart__stockdata--row">
              <span className="piechart__stockdata--label">Shares</span>
              <span className="piechart__stockdata--value">{stock.shares}</span>
            </p>
            <p className="piechart__stockdata--row">
              <span className="piechart__stockdata--label">Buy Price</span>
              <span className="piechart__stockdata--value">
                {stock.buy_price}
              </span>
            </p>
            <p className="piechart__stockdata--row">
              <span className="piechart__stockdata--label">Invested</span>
              <span className="piechart__stockdata--value">
                {stock.invested}
              </span>
            </p>
            <p className="piechart__stockdata--row">
              <span className="piechart__stockdata--label">Current Price</span>
              <span className="piechart__stockdata--value">
                {stock.currentPrice}
              </span>
            </p>
            <p className="piechart__stockdata--row">
              <span className="piechart__stockdata--label">Current Value</span>
              <span className="piechart__stockdata--value">
                {stock.currentValue.toFixed(2)}
              </span>
            </p>
            <p className="piechart__stockdata--row">
              <span className="piechart__stockdata--label">ROI</span>
              <span className="piechart__stockdata--value">
                {(stock.roi * 100).toFixed(2)}%
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
