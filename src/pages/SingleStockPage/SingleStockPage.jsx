import {useParams} from "react-router-dom";
import StockFundamental from "../../component/StockFundamental/StockFundamental";
import Candlestick from "../../component/Candlestick/Candlestick";


export default function SingleStockPage(){
  const {stockId} = useParams();


  return(
    <>
    <h1>Stock Detail:{stockId}</h1>
    <StockFundamental symbol={stockId} />
    <Candlestick symbol = {stockId} />
    </>

  )
}