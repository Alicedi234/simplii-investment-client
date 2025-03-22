import {useParams} from "react-router-dom";
import StockFundamental from "../../component/StockFundamental/StockFundamental";
import Candlestick from "../../component/Candlestick/Candlestick";
import LineChart from "../../component/LineChart/LineChartGeneral";
import {Link} from "react-router-dom";
import "./SingleStockPage.scss";
import chartlineup from "../../assets/icon/chart-line-up.png";






export default function SingleStockPage(){
  const {stockId} = useParams();

  return(
    <>
    <h1 className= "singlestock__title">Stock Detail:{stockId}
      <img src={chartlineup} alt="back" className="singlestock__icon"/>
    </h1>
    <Candlestick symbol = {stockId} />
    <div className="singlestock__button">
      <Link to = "/portfolio/create">
      <button className="singlestock__button--sell">Sell</button>
      </Link>
      <Link to = "/portfolio/create">
      <button className="singlestock__button--buy">Buy
      </button>
      </Link>
    </div>
    <LineChart symbol = {stockId} />
    <StockFundamental symbol={stockId} />
    </>

  )
}