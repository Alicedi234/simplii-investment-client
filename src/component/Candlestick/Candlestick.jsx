import {Chart, registerables} from "chart.js";
import "chartjs-chart-financial";
import  {CandlestickController, CandlestickElement, OhlcController, OhlcElement} from 'chartjs-chart-financial';
import {Chart as ReactChart} from "react-chartjs-2";
import "chartjs-adapter-date-fns";

//chats have to be registered before using them
Chart.register(...registerables, CandlestickController, CandlestickElement, OhlcController, OhlcElement);

export default function Candlestick({dailydata}){

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
    scales: {
      x: {
        type: "time",
        time:{
          tooltipFormat: "MMM dd HH:mm",
          unit: "day",
        }
      },
      y: {
        beginAtZero: false,
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