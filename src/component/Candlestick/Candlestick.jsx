import {Chart, registerables} from "chart.js";
import "chartjs-chart-financial";
import  {CandlestickController, CandlestickElement, OhlcController, OhlcElement} from 'chartjs-chart-financial';
import {Chart as ReactChart} from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import axios from "axios";
import {useState, useEffect} from "react";
import "./Candlestick.scss";

//chats have to be registered before using them
Chart.register(...registerables, CandlestickController, CandlestickElement, OhlcController, OhlcElement);

export default function Candlestick({symbol}){


  const [dailydata, setDailydata] = useState([])
  const baseUrl = import.meta.env.VITE_STOCK_API_BASE_URL;
  const urldaily = `${baseUrl}/dailystock`




  useEffect(() =>{
    const fetchData = async () =>{
      const response = await axios.get(urldaily, {params: { symbol}});
      console.log(response.data);
      setDailydata(response.data);
    }
    fetchData();
  },[symbol, urldaily]);





  const last14 = dailydata.slice(-14);
  const chartData = {
    datasets:[
      {
        label: "K line",
        data: last14.map((d)=>(
          {
            x:new Date(d.time),
            o:d.open,
            h:d.high,
            l:d.low,
            c:d.close,
          })),
          type:"candlestick",
          borderColor:"black",
          barThickness: 10,
          borderWidth:1
      }
    ]
  }
    const options = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#333",
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
        title:{
          display: true,
          text: `${symbol} Stock Price - 14day Candlestick Chart`
        }
      },
      scales: {
        x: {
          type: "time",
          time:{
            tooltipFormat: "MMM dd HH:mm",
            unit: "day",
          },
          title:{
            display:true,
            text: "date"
          },
          ticks:{
            color:"#666",
          }
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "stock price",
          },
        }
      }
    }
  return (
    <div className = "candlestick__container">
      {dailydata.length >0 ? (
        <ReactChart type = "candlestick" data ={chartData} options={options} />
      ) : (
        <p className = "candlestick__loading">Loading data...</p>
      )
    }
      </div>
  );

}