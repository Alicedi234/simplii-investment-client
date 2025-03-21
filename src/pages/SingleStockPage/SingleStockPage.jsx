import {useParams} from "react-router-dom";
import StockFundamental from "../../component/StockFundamental/StockFundamental";
import Candlestick from "../../component/Candlestick/Candlestick";
import LineChart from "../../component/LineChart/LineChartGeneral";

export default function SingleStockPage(){
  const {stockId} = useParams();


  return(
    <>
    <h1>Stock Detail:{stockId}</h1>
    <Candlestick symbol = {stockId} />
    <LineChart symbol = {stockId} />
    <StockFundamental symbol={stockId} />
    </>

  )
}