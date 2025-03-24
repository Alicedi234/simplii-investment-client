import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import "./LineChart.scss";
import color3 from "../../assets/icon/color3.png";

Chart.register(...registerables);

export default function PortfolioLineChart() {
  const { portfolioId } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_PORTFOLIO_API_BASE_URL;



  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/myportfolio/${portfolioId}/history`);
        setHistory(response.data);
      } catch (err) {
        setError("Failed to load portfolio history.");
      } finally {
        setLoading(false);
      }
    };

    if (portfolioId) fetchHistory();
  }, [portfolioId, baseUrl]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = {
    labels: sorted.map((d) => new Date(d.date)),
    datasets: [
      {
        label: "Total Portfolio Value",
        data: sorted.map((d) => d.totalValue),
        borderColor: "#3f51b5",
        backgroundColor: "rgba(63, 81, 181, 0.1)",
        pointRadius: 2,
        tension: 0.25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#333" },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        type: "time",
        title: {
          display: true,
          text: "Date",
        },
        time: {
          unit: "day",
        },
        ticks: { color: "#666" },
        grid: { color: "#eee" },
      },
      y: {
        ticks: { color: "#666" },
        grid: { color: "#eee" },
        title: {
          display: true,
          text: "Value ($)",
        },
      },
    },
  };

  return (
    <div className="linechart-container">
      <h2 className="linechart-container__title">Portfolio Value Over Time
        <img src={color3} alt="" className="linechart-container__icon"/>

      </h2>
      <ReactChart type="line" data={chartData} options={options} />
    </div>
  );
}
