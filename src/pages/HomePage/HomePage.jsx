import {useState, useEffect} from "react";
import axios from "axios";
import Candlestick from "../../component/Candlestick/Candlestick";
import LineChart from "../../component/LineChart/LineChart";
import StockSearch from "../../component/StockSearch/StockSearch";



export default function HomePage(){

  const [intradata, setIntraData] = useState([]);
  const [dailydata, setDailyData] = useState([]);


  const url_intra = "http://127.0.0.1:8000/api/intrastock?symbol=AAPL";
  const url_daily = "http://127.0.0.1:8000/api/dailystock?symbol=AAPL";
  
  
  //get intradata
  useEffect(() =>{
    const fetchData = async () =>{
      const response = await axios.get(url_intra);
      console.log(response.data);
      setIntraData(response.data);
    }
    fetchData();
  },[]);

  //get dailydata
  useEffect(() =>{
    const fetchData = async () =>{
      const response = await axios.get(url_daily);
      console.log(response.data);
      setDailyData(response.data);
    }
    fetchData();
  },[]);



  
  return(

    <>
    <StockSearch />
    <LineChart dailydata = {dailydata} />
    </>
  )
}