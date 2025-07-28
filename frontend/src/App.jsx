import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HomePage1 from './pages/HomePage1';
import TransactionPage from './pages/transactionPage';
import Login from './pages/Login';
import './App.css'; 
import PayBannerPage from './pages/PayBannerPage.jsx';
import SavingsBannerPage from './pages/SavingsBannerPage.jsx';
import BTOBannerPage from './pages/BTOBannerPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/transactionPage" element={<TransactionPage />} />
        <Route path="/homePage/:userId" element={<HomePage />} />
        <Route path="/homePage1/:userId" element={<HomePage1 />} />
        <Route path="/pay/:userId" element={<PayBannerPage />} />
        <Route path="/savings/:userId" element={<SavingsBannerPage />} />
        <Route path="/bto/:userId" element={<BTOBannerPage />} />
      </Routes>
    </Router>
  );
}

export default App;