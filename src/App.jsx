import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import SingleStockPage from "./pages/SingleStockPage/SingleStockPage";
import MyPortfolioPage from "./pages/MyPortfolioPage/MyPortfolioPage";
import MyPortfolioAnalysisPage from "./pages/MyPortfolioAnalysisPage/MyPortfolioAnalysisPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";



import './App.css'

function App() {

  return (
  <BrowserRouter>
    <Header />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:stockId" element = {<SingleStockPage />} />
        <Route path="/:portfolioId" element = {<MyPortfolioPage  />} />
        <Route path="/portfolios" element = {<MyPortfolioAnalysisPage />} />
        <Route path ="/login" element = {<LoginPage />} />
        <Route path ="/signup" element = {<SignupPage />} />
    <Routes/>
    <Footer />
  </Routes>
  </BrowserRouter>
  )
}

export default App;
