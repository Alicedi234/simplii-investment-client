import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PortfolioAnalysis.scss";
import webdesign from "../../assets/icon/web-design.png";

export default function PortfolioAnalysisPage() {
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
    if (portfolioId) fetchAnalysis();
  }, [portfolioId]);

  if (loading) return <p>Loading Analysis...</p>;
  if (error) return <p>Error: {error}</p>;

  const {
    portfolioName,
    totalInvested,
    totalCurrentValue,
    portfolioROI,
    holdings,
  } = analysis;
  return (
    <div className="analysis__container">
      <h1 className="analysis__title">
        Portfolio Analysis
        <img src={webdesign} alt="webdesign" className="analysis__icon" />
      </h1>
      <div className="analysis">
        <p className="analysis__row">
          <span className="analysis__label">Portfolio Name</span>
          <span className="analysis__value">{portfolioName}</span>
        </p>
        <p className="analysis__row">
          <span className="analysis__label">Total Invested</span>
          <span className="analysis__value">${totalInvested.toFixed(2)}</span>
        </p>
        <p className="analysis__row">
          <span className="analysis__label">Current Value</span>
          <span className="analysis__value">
            ${totalCurrentValue.toFixed(2)}
          </span>
        </p>
        <p className="analysis__row">
          <span className="analysis__label">ROI</span>
          <span className="analysis__value">
            {(portfolioROI * 100).toFixed(2)}%
          </span>
        </p>
      </div>
    </div>
  );
}
