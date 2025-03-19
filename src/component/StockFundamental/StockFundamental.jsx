import {useState, useEffect} from "react";

export default function StockFundamental ({symbol}){

  const [fundadata, setFundadata] = useState([])
  const baseUrl = import.meta.env.VITE_STOCK_API_BASE_URL;
  const urlfunda = `${baseUrl}/fundastock`;



  //get fundamental data
  const url_funda = `${baseUrl}/fundastock`
  useEffect (()=>{
    const fetchData = async () =>{
      const response = await axios.get(urlfunda, {params: { symbol } });
      console.log(response.data);
      setFundadata(response.data);
    }
    fetchData();
  },[symbol, url]);
  return(
    <div>
      <h2>Fundamentals for {fundadata.symbol}</h2>
      <ul>
        <li>{fundadata.symbol}</li>
        <li>{fundadata.name}</li>
        <li>{fundadata.exchange}</li>
        <li>{fundadata.industry}</li>
        <li>{fundadata.marketCap}</li>
        <li>{fundadata.peRatio}</li>
        <li>{fundadata.dividendYield}</li>
        <li>{fundadata.beta}</li>
        <li>{fundadata.eps}</li>
      </ul>
    </div>

  )
}