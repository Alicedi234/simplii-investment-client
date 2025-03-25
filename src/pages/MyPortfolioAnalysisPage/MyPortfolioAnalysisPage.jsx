import PortfolioAnalysis from "../../component/PortfolioAnalysis/PortfolioAnalysis";
import PieChart from "../../component/PieChart/PieChart";
import BarChart from "../../component/BarChart/BarChart";
import LineChartPortfolio from "../../component/LineChart/LineChartPortfolio";

export default function MyPortfolioAnalysisPage() {
  return (
    <>
      <BarChart />
      <LineChartPortfolio />
      <PieChart />
      <PortfolioAnalysis />
    </>
  );
}
