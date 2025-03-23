import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart() {
  const { portfolioId } = useParams();
  const [analysis, setAnalysis] = useState(null);

  const baseUrl = import.meta.env.VITE_PORTFOLIO_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${baseUrl}/api/myportfolio/${portfolioId}/analysis`);
      const data = await res.json();
      setAnalysis(data);
    };
    fetchData();
  }, [portfolioId]);

  if (!analysis) return <p>Loading chart...</p>;

  const labels = analysis.holdings.map((h) => h.symbol);
  const invested = analysis.holdings.map((h) => h.invested);
  const currentValue = analysis.holdings.map((h) => h.currentValue);

  const data = {
    labels,
    datasets: [
      {
        label: "Invested",
        data: invested,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Current Value",
        data: currentValue,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center" }}>Investment vs Current Value</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
