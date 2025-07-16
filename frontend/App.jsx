import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/transactionPage';
import './App.css';

/**
 * Main App Component
 * 
 * Handles routing and authentication flow:
 * - /login: Login page (public)
 * - /register: Registration page (public)
 * - /: Home page (protected)
 * - /transactionPage: Transaction page (protected)
 * 
 * Data Flow:
 * 1. User accesses protected route
 * 2. ProtectedRoute checks authentication
 * 3. If not authenticated, redirects to /login
 * 4. User submits login form
 * 5. Frontend sends credentials to backend API
 * 6. Backend verifies credentials against MongoDB
 * 7. If valid, backend returns JWT token
 * 8. Frontend stores token and redirects to protected route
 * 9. Subsequent requests include token for verification
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactionPage" 
            element={
              <ProtectedRoute>
                <TransactionPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;