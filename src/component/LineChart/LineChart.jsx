import {Chart, registerables} from "chart.js";
import {Chart as ReactChart} from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import "./LineChart.scss";

Chart.register(...registerables);


export default function LineChart({dailydata}){

  //set the correct order
  const sorted = [...dailydata].sort(
    (a,b) => new Date(a.time) - new Date(b.time)
  );

  const chartData = {
    labels: sorted.map((d)=> new Date(d.time)),
    datasets:[
      {
        label: "Close Price",
        data: sorted.map((d) => d.close),
        borderColor: "#26a69a",
        backgroundColor: "rgba(38, 166, 154, 0.2)",
        pointRadius: 2,
        tension: 0.2,
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
        text: "AAPL Stock Price - 7day"
      }
    },
    scales: {
      x: {
        type: "time",
        title:{
          display: true,
          text: "date",
        },
        time: {
          unit: "day",
        },
        ticks: {
          color: "#666",
        },
        grid: {
          color: "#eee",
        },
        
      },
      y: {
        ticks: {
          color: "#666",
        },
        grid: {
          color: "#eee",
        },
        title:{
          display: true,
          text: "stock price",
        },
      },
    },
  };

  return(
    <div className= "linechart-container">
      <ReactChart type = "line" data = {chartData} options = {options} />
    </div>
    
  );
}