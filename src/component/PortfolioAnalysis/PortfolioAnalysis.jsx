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


  const { portfolioName, totalInvested, totalCurrentValue, portfolioROI, holdings } = analysis;
  return (
    <div className="analysis">
      <h1 className="analysis__title">Portfolio Analysis</h1>
      {/* 如果需要货币符号可以加在后面 */}
      <p>Portfolio Name: {portfolioName}</p>
      <p>Total Invested: ${totalInvested.toFixed(2)}</p>
      <p>Current Value: ${totalCurrentValue.toFixed(2)}</p>
      <p>ROI: {(portfolioROI * 100).toFixed(2)}%</p>

      <h2>Holdings:</h2>
      {holdings.map((stock) => (
        <div key={stock.symbol} style={{ border: "1px solid #ccc", margin: "8px 0", padding: "8px" }}>
          <p>Symbol: {stock.symbol}</p>
          <p>Shares: {stock.shares.toFixed(4)}</p>
          <p>Buy Price: ${stock.buy_price}</p>
          <p>Invested: ${stock.invested.toFixed(2)}</p>
          <p>Current Price: ${stock.currentPrice.toFixed(2)}</p>
          <p>Current Value: ${stock.currentValue.toFixed(2)}</p>
          <p>ROI: {(stock.roi * 100).toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );

}
