import { useState, useEffect } from "react";
import axios from "axios";
import "./StockFundamental.scss";

export default function StockFundamental({ symbol }) {
  const baseUrl = import.meta.env.VITE_STOCK_API_BASE_URL;
  const [fundadata, setFundadata] = useState({});
  const [intradata, setIntraData] = useState([]);
  const urlfunda = `${baseUrl}/fundastock`;
  const urlintra = `${baseUrl}/intrastock`;

  const [showFundamentals, setShowFundamentals] = useState(true);
  const [showTechnicals, setShowTechnicals] = useState(false);

  // get funda data
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(urlfunda, { params: { symbol } });
      console.log(response.data);
      setFundadata(response.data);
    };
    fetchData();
  }, [symbol, urlfunda]);

  //get intraday data

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(urlintra, { params: { symbol } });
      console.log(response.data);
      setIntraData(response.data);
    };
    fetchData();
  }, [symbol, urlintra]);

  const last = intradata.length > 0 ? intradata[intradata.length - 1] : null;
  const open = last ? last.open : "Loading...";
  const high = last ? last.high : "Loading...";
  const low = last ? last.low : "Loading...";
  const close = last ? last.close : "Loading...";

  return (
    <div className="stockfundamental__container">
      <div className="stockfundamental__button">
        <button
          onClick={() => setShowFundamentals(!showFundamentals)}
          className="stockfundamental__button-item fundamental-button"
        >
          {showFundamentals ? "Hide Fundamentals" : "ShowFundamentals"}
        </button>

        <button
          onClick={() => setShowTechnicals(!showTechnicals)}
          className="stockfundamental__button-item technical-button"
        >
          {showTechnicals
            ? "Hide Technical Indicators"
            : "Show Technical Indicators"}
        </button>
      </div>

      {showFundamentals && (
        <div className="stockfundamental">
          <h2 className="stockfundamental__title">
            Fundamentals for {fundadata.symbol}
          </h2>
          <ul className="stockfundamental__list">
            <li className="stockfundamental__list--item">
              <span className="stockfundamental__list--label">Symbol</span>
              <span className="stockfundamental__list--value">
                {fundadata.symbol}
              </span>
            </li>
            <li className="stockfundamental__list--item">
              <span className="stockfundamental__list--label">Name</span>
              <span className="stockfundamental__list--value">
                {fundadata.name}
              </span>
            </li>
            <li className="stockfundamental__list--item">
              <span className="stockfundamental__list--label">Exchange</span>
              <span className="stockfundamental__list--value">
                {fundadata.exchange}
              </span>
            </li>
            <li className="stockfundamental__list--item">
              <span className="stockfundamental__list--label">Industry</span>
              <span className="stockfundamental__list--value">
                {fundadata.industry}
              </span>
            </li>
            <li className="stockfundamental__list--item">
              <span className="stockfundamental__list--label">MarketCap</span>
              <span className="stockfundamental__list--value">
                {fundadata.marketCap}
              </span>
            </li>
            <li className="stockfundamental__list--item">
              <span className="stockfundamental__list--label">PE Ratio</span>
              <span className="stockfundamental__list--value">
                {fundadata.peRatio}
              </span>
            </li>
            <li className="stockfundamental__list--item">
              <span className="stockfundamental__list--label">
                Dividend Yield
              </span>
              <span className="stockfundamental__list--value">
                {fundadata.dividendYield}
              </span>
            </li>
            <li className="stockfundamental__list--item">
              <span className="stockfundamental__list--label">Beta</span>
              <span className="stockfundamental__list--value">
                {fundadata.beta}
              </span>
            </li>
            <li className="stockfundamental__list--item">
              <span className="stockfundamental__list--label">EPS</span>
              <span className="stockfundamental__list--value">
                {fundadata.eps}
              </span>
            </li>
          </ul>
        </div>
      )}

      {showTechnicals && (
        <div className="stocktechnical">
          <h2 className="stocktechnical__title">Technical Indicators</h2>
          <ul className="stocktechnical__list">
            <li className="stocktechnical__list--item">
              <span className="stocktechnical__list--label">Open</span>
              <span className="stocktechnical__list--value">{open}</span>
            </li>
            <li className="stocktechnical__list--item">
              <span className="stocktechnical__list--label">High</span>
              <span className="stocktechnical__list--value">{high}</span>
            </li>
            <li className="stocktechnical__list--item">
              <span className="stocktechnical__list--label">Low</span>
              <span className="stocktechnical__list--value">{low}</span>
            </li>
            <li className="stocktechnical__list--item">
              <span className="stocktechnical__list--label">Close</span>
              <span className="stocktechnical__list--value">{close}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
