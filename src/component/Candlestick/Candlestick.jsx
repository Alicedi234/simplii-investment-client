import {Chart, registerables} from "chart.js";
import "chartjs-chart-financial";
import  {CandlestickController, CandlestickElement, OhlcController, OhlcElement} from 'chartjs-chart-financial';
import {Chart as ReactChart} from "react-chartjs-2";
import "chartjs-adapter-date-fns";

//chats have to be registered before using them
Chart.register(...registerables, CandlestickController, CandlestickElement, OhlcController, OhlcElement);

export default function Candlestick({data}){

const chartData = {
  datasets:[
    {
      label: "K line",
      data: data.map((d)=>(
        {
          x:new Date(d.time),
          o:d.open,
          h:d.high,
          l:d.low,
          c:d.close,
        })),
        type:"candlestick",
        borderColor:"black",
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
        }
      },
      y: {
        beginAtZero: false,

      }
    }
  }
  return (
    <div>
      <ReactChart type = "candlestick" data ={chartData} options={options} />
    </div>
  );

}