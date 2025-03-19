import {useState, useEffect} from "react";
import axios from "axios";

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
    <div>
      <h2>Fundamentals for {fundadata.symbol}</h2>
      <ul>
        <li>Symbol: {fundadata.symbol}</li>
        <li>Name: {fundadata.name}</li>
        <li>Exchange: {fundadata.exchange}</li>
        <li>Industry: {fundadata.industry}</li>
        <li>MartketCap: {fundadata.marketCap}</li>
        <li>PE: {fundadata.peRatio}</li>
        <li>DividendYield: {fundadata.dividendYield}</li>
        <li>Beta: {fundadata.beta}</li>
        <li>EPS: {fundadata.eps}</li>
      </ul>
    </div>

  )
}