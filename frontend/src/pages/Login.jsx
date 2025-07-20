import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import axios from 'axios';


const LoginPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.id || !formData.password) {
      setError('Please enter both User ID and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        user_id: formData.id,
        password: formData.password
      });

      if (response.data.success) {
        // Store the recommended product in localStorage to make it accessible to other pages
        if (response.data.recommendedProduct) {
          localStorage.setItem('recommendedProduct', response.data.recommendedProduct);
        }
        navigate(`/homePage/${formData.id}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials. Please check your User ID and password.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">DBS Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <div className="mt-1 relative">
                <input
                  id="id"
                  name="id"
                  type="text"
                  required
                  value={formData.id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your user ID"
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Use your existing user_id and password from the database
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;