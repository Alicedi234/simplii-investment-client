import {useState, useEffect} from "react";

export function StockFundamental ({}){

  const [fundadata, setFundadata] = useState([])

  //get fundamental data
  const url_funda = "http://127.0.0.1:8000/api/fundastock?symbol=AAPL"
  useEffect (()=>{
    const fetchData = async () =>{
      const response = await axios.get(url_funda);
      console.log(response.data);
      setFundadata(response.data);
    }
    fetchData();
  },[]);
  return(
    <div>
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