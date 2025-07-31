import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/transactionPage';
import Login from './pages/Login';
import './App.css';

import PayBannerPage from './pages/PayBannerPage.jsx';
import InvestPage from './pages/InvestPage.jsx';
import BTOBannerPage from './pages/BTOBannerPage.jsx';
import SmartShortcuts from "./components/home/SmartShortcuts.jsx";
import InsightsPage from './pages/InsightsPage';
import SetBudgetPage from './pages/SetBudgetPage';


// Wrapper component for SmartAdjustments with navigation
const SmartAdjustmentsWrapper = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleNavigateToInsights = () => {
    navigate(`/insights/${userId}`);
  };

  return <SmartShortcuts onNavigateToFriend={handleNavigateToInsights} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/transactionPage" element={<TransactionPage />} />
        <Route path="/homepage/:userId" element={<HomePage />} />
        <Route path="/pay/:userId" element={<PayBannerPage />} />
        <Route path="/invest/:userId" element={<InvestPage />} />
        <Route path="/bto/:userId" element={<BTOBannerPage />} />
        <Route path="/smartshortcuts/:userId" element={<SmartAdjustmentsWrapper />} />
        <Route path="/set-budget/:userId" element={<SetBudgetPage />} />
        <Route path="/insights/:userId" element={<InsightsPage />} />
      </Routes>
    </Router>
  );
}

export default App;