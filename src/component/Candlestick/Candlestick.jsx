import {Chart, registerables} from "chart.js";
import {FinancialController, CandlestickElement} from "chartjs-chart-financial";
import {Chart as ReactChart} from "react-chartjs-2";

//chats have to be registered before using them
Chart.register(...registerables, FinancialController, CandlestickElement);

export default function CandlestickChart({data}){

const chartData = {
  datasets:[
    {
      label: "K line",
      data: data.map((d)=>(
        {
          x:d.time,
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
      }
    }
  }
  return (
    <div>
      <ReactChart type = "candlestick" data ={chartData} options={options} />
    </div>
  );

}