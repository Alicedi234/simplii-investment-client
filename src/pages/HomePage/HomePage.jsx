import { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "../../component/LineChart/LineChart";
import StockSearch from "../../component/StockSearch/StockSearch";
import { Link } from "react-router-dom";
import "./HomePage.scss";

export default function HomePage() {
  const [intradata, setIntraData] = useState([]);
  const [dailydata, setDailyData] = useState([]);

  const url_intra = "http://127.0.0.1:8000/api/intrastock?symbol=AAPL";
  const url_daily = "http://127.0.0.1:8000/api/dailystock?symbol=AAPL";

  //get intradata
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url_intra);
      console.log(response.data);
      setIntraData(response.data);
    };
    fetchData();
  }, []);

  //get dailydata
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url_daily);
      console.log(response.data);
      setDailyData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="homepage__main">
      <div className="homepage__main--button">
        <Link to="/login">
          <button className="homepage__main--button-item">LogIn</button>
        </Link>
        <Link to="/signup">
          <button className="homepage__main--button-item">SignUp</button>
        </Link>
      </div>

      <StockSearch />
      <LineChart dailydata={dailydata} />
    </div>
  );
}
