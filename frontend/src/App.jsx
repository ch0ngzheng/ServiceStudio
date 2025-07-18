import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/transactionPage';
import Login from './pages/Login';
import './App.css'; 
import InvestmentPage from './pages/InvestmentPage';
import InvestmentPage2 from './pages/InvestmentPage2.jsx';
import InvestmentPage3 from './pages/InvestmentPage3.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/transactionPage" element={<TransactionPage />} />
        <Route path="/homePage/:userId" element={<HomePage />} />
        <Route path="/investment" element={<InvestmentPage />} />
        <Route path="/investment2" element={<InvestmentPage2 />} />
        <Route path="/investment3" element={<InvestmentPage3 />} />
        <Route path="/transactionPage" element={<TransactionPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;