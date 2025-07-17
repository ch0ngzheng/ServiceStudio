import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/transactionPage';
import './App.css';
import InvestmentPage from './pages/InvestmentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/investment" element={<InvestmentPage />} />
        <Route path="/transactionPage" element={<TransactionPage />} />
      </Routes>
    </Router>
  );
}

export default App;