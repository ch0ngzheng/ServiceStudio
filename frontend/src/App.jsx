import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/transactionPage';
import Login from './pages/Login';
import './App.css'; 
import PayBannerPage from './pages/PayBannerPage.jsx';
import SavingsBannerPage from './pages/SavingsBannerPage.jsx';
import BTOBannerPage from './pages/BTOBannerPage.jsx';
import InsightsPage from './pages/InsightsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/transactionPage" element={<TransactionPage />} />
        <Route path="/homePage/:userId" element={<HomePage />} />
        <Route path="/pay/:userId" element={<PayBannerPage />} />
        <Route path="/savings/:userId" element={<SavingsBannerPage />} />
        <Route path="/bto/:userId" element={<BTOBannerPage />} />
        <Route path="/transactionPage" element={<TransactionPage />} />
        <Route path="/insights/:userId" element={<InsightsPage />} />
      </Routes>
    </Router>
  );
}

export default App;