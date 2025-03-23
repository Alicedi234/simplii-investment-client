import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPortfolio.scss";

export default function MyPortfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_PORTFOLIO_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/myportfolio/list`);
        if (!res.ok) throw new Error("Failed to load portfolios");
        const data = await res.json();
        setPortfolios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [baseUrl]);

  if (loading) return <p>Loading portfolios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="myportfoliolist">
      <h1 className="myportfoliolist__title">My Portfolios</h1>
      {portfolios.map((portfolio) => (
        <div
          key={portfolio.id}
          className="myportfoliolist__container"
          onClick={() => navigate(`/portfolio/${portfolio.id}`)}
        >
          <h2 className="myportfoliolist__name">{portfolio.name}</h2>
          <ul className="myportfoliolist__list">
            {portfolio.holdings.map((h, i) => (
              <li key={i} className="myportfoliolist__list--item">
                {h.symbol} — {h.shares} shares @ ${h.buy_price} (${h.total_amount})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}