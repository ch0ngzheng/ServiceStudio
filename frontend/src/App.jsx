import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TransactionPage from '../pages/transactionPage'; 
import './App.css';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h1>DBS App</h1>
      <button onClick={() => navigate('/transactionPage')}>
        TEST
      </button>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactionPage" element={<TransactionPage />} />
      </Routes>
    </Router>
  );
}

export default App;