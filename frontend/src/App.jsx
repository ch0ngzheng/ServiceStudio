import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/transactionPage';
import Login from './pages/Login';
import './App.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/transactionPage" element={<TransactionPage />} />
        <Route path="/homePage/:userId" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;