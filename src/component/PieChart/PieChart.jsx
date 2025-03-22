import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// ====== Chart.js & Pie Chart imports ======
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart() {
  const { portfolioId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const baseUrl = import.meta.env.VITE_PORTFOLIO_API_BASE_URL

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/myportfolio/${portfolioId}/analysis`);
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
  const dataValues = holdings.map((h) => h.currentValue); // 以 currentValue 绘图
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
    <div style={{ padding: "1rem" }}>
      {/* <h1 className="text-2xl font-bold">Portfolio Analysis</h1> */}
      {/* <p>Portfolio ID: {analysis.portfolioId}</p>
      <p>Total Invested: ${totalInvested.toFixed(2)}</p>
      <p>Current Value: ${totalCurrentValue.toFixed(2)}</p>
      <p>ROI: {(portfolioROI * 100).toFixed(2)}%</p> */}

      {/* 饼图 */}
      <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
        <h2 style={{ textAlign: "center" }}>Allocation by Current Value</h2>
        <Pie data={pieData} options={pieOptions} />
      </div>

      {/* 如果想列举每只股票的详细信息，也可以在这里循环 holdings */}
      {holdings.map((stock) => (
        <div key={stock.symbol} style={{ border: "1px solid #ccc", marginTop: "1rem", padding: "1rem" }}>
          <p>Symbol: {stock.symbol}</p>
          <p>Shares: {stock.shares}</p>
          <p>Buy Price: {stock.buy_price}</p>
          <p>Invested: {stock.invested}</p>
          <p>Current Price: {stock.currentPrice}</p>
          <p>Current Value: {stock.currentValue.toFixed(2)}</p>
          <p>ROI: {(stock.roi * 100).toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );
}
