import {useState, useEffect} from "react";
import axios from "axios";
import Candlestick from "../../component/Candlestick/Candlestick";


export default function HomePage(){

  const [data, setData] = useState;

  const baseUrl = "http://127.0.0.1:8000/api/stock?symbol=AAPL";
  
  useEffect(() =>{
    const fetchData = async () =>{
      const response = await axios.get();
      console.log(response.data);
      setData(response.data);
    }
    fetchData();
  },[]);
  
  
  return(

    <>
  <h1>this is homePage</h1>
    <Candlestick data = {data}/>
    </>
  )
}