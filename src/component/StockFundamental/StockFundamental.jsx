import {useState, useEffect} from "react";
import axios from "axios";
import "./StockFundamental.scss";
export default function StockFundamental ({symbol}){

  const baseUrl = import.meta.env.VITE_STOCK_API_BASE_URL;
  const [fundadata, setFundadata] = useState([])
  const urlfunda = `${baseUrl}/fundastock`;

  
  // get funda data
  useEffect (()=>{
    const fetchData = async () =>{
      const response = await axios.get(urlfunda, {params: { symbol } });
      console.log(response.data);
      setFundadata(response.data);
    }
    fetchData();
  },[symbol, urlfunda]);
  
  

  return(
    <div className="stockfundamental">
      <h2 className="stockfundamental__title">Fundamentals for {fundadata.symbol}</h2>
      <ul className="stockfundamental__list">
        <li className="stockfundamental__list--item">Symbol: <span className="stockfundamental__list--item-value">{fundadata.symbol}</span></li>
        <li className="stockfundamental__list--item">Name: <span className="stockfundamental__list--item-value">{fundadata.name}</span></li>
        <li className="stockfundamental__list--item">Exchange: <span className="stockfundamental__list--item-value">{fundadata.exchange}</span></li>
        <li className="stockfundamental__list--item">Industry: <span className="stockfundamental__list--item-value">{fundadata.industry}</span></li>
        <li className="stockfundamental__list--item">MartketCap: <span className="stockfundamental__list--item-value">{fundadata.marketCap}</span></li>
        <li className="stockfundamental__list--item">PE: <span className="stockfundamental__list--item-value">{fundadata.peRatio}</span></li>
        <li className="stockfundamental__list--item">DividendYield: <span className="stockfundamental__list--item-value">{fundadata.dividendYield}</span></li>
        <li className="stockfundamental__list--item">Beta: <span className="stockfundamental__list--item-value">{fundadata.beta}</span></li>
        <li className="stockfundamental__list--item">EPS: <span className="stockfundamental__list--item-value">{fundadata.eps}</span></li>
      </ul>
    </div>

  )
}