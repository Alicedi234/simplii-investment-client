import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SingleStockPage from "./pages/SingleStockPage/SingleStockPage";
import MyPortfolioPage from "./pages/MyPortfolioPage/MyPortfolioPage";
import MyPortfolioAnalysisPage from "./pages/MyPortfolioAnalysisPage/MyPortfolioAnalysisPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import MyPortfolioList from "./component/MyPortfolio/MyPortfolio";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock/:stockId" element={<SingleStockPage />} />
          <Route path="/portfolio/create" element={<MyPortfolioPage />} />
          <Route
            path="/portfolio/:portfolioId"
            element={<MyPortfolioAnalysisPage />}
          />
          <Route path="/portfolio/list" element={<MyPortfolioList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
