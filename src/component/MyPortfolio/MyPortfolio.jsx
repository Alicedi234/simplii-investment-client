import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Portfolios</h1>
      {portfolios.map((portfolio) => (
        <div
          key={portfolio.id}
          className="border border-gray-300 rounded p-4 mb-4 hover:shadow cursor-pointer"
          onClick={() => navigate(`/portfolio/${portfolio.id}`)}
        >
          <h2 className="text-xl font-semibold">{portfolio.name}</h2>
          <p className="text-sm text-gray-500">Created at: {portfolio.created_at}</p>
          <ul className="mt-2">
            {portfolio.holdings.map((h, i) => (
              <li key={i} className="text-sm text-gray-700">
                {h.symbol} — {h.shares} shares @ ${h.buy_price} (${h.total_amount})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}