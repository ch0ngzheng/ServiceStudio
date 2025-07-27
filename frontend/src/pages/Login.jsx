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
      const response = await axios.post('http://localhost:3000/api/login', {
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

              <div className="mt-1 w-[80%] mx-auto flex items-center gap-2">
                <User className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <input
                  id="id"
                  name="id"
                  type="text"
                  required
                  value={formData.id}
                  onChange={handleInputChange}
                  className="w-full h-[40px] pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your user ID"
                />
              </div>
            </div>

            <div>

              <div className="mt-1 w-[80%] mx-auto flex items-center gap-2">
                <Lock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <div className="relative w-full">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full h-[40px] pl-6 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-[80%] mx-auto py-2 px-4 rounded-md text-white font-medium ${
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