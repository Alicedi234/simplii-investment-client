import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PortfolioAnalysisPage() {
  const { portfolioId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const baseUrl = import.meta.env.VITE_PORTFOLIO_API_BASE_URL;

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
    if (portfolioId) fetchAnalysis();
  }, [portfolioId]);

  if (loading) return <p>Loading Analysis...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!analysis) return <p>No data</p>;

  const { totalInvested, totalCurrentValue, portfolioROI, holdings } = analysis;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio Analysis</h1>
      <p>Portfolio ID: {analysis.portfolioId}</p>
      <p>Total Invested: ${totalInvested.toFixed(2)}</p>
      <p>Current Value: ${totalCurrentValue.toFixed(2)}</p>
      <p>ROI: {(portfolioROI * 100).toFixed(2)}%</p>

      <h2 className="text-xl font-semibold mt-6">Holdings Detail</h2>
      {holdings.map((stock) => (
        <div key={stock.symbol} className="border p-2 mb-2">
          <p>Symbol: {stock.symbol}</p>
          <p>Shares: {stock.shares.toFixed(2)}</p>
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
