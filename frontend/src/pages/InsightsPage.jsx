import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaBell, FaEye, FaQuestionCircle, FaTrash, FaPlusCircle, FaPencilAlt } from 'react-icons/fa';
import BottomNavigation from '../components/layout/BottomNavigation';


const InsightsPage = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const { totalBudget, year, month } = location.state || {};

    if (!totalBudget) {
      setMessage('No budget amount was set. Please go back and set a budget.');
      return;
    }

    const fetchOptimizedBudget = async () => {
      try {
        const response = await fetch('http://localhost:5001/optimize-budget', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            user_id: userId, 
            total_budget: totalBudget,
            year,
            month
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setIsSuccess(true);
          setMessage(result.message || 'Budget optimized successfully!');
          if (result.optimized_budget) {
            const updatedCategories = Object.keys(result.optimized_budget).map(key => ({
              name: key,
              amount: result.optimized_budget[key].toFixed(2),
            }));
            setCategories(updatedCategories);
          }
        } else {
          setMessage(result.error || 'Failed to optimize budget.');
        }
      } catch (error) {
        setMessage('An error occurred while optimizing the budget.');
        console.error('Optimization error:', error);
      }
    };

    fetchOptimizedBudget();
  }, [userId, location.state]);

  return (
    <div className="bg-light-gray-background min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <FaBell className="text-light-gray" size={20} />
                    <span className="absolute -top-1 -right-1 bg-dbs-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">15</span>
                </div>
                <FaEye className="text-light-gray" size={20} />
            </div>
            <div className="flex items-center space-x-4">
                <FaQuestionCircle className="text-light-gray" size={20} />
                <button className="border border-dbs-red-500 text-dbs-red-500 px-4 py-1 rounded-full text-sm font-semibold">LOG OUT</button>
            </div>
      </header>

      <main className="p-4 pb-32">
        <h1 className="text-light-gray text-lg mb-4">Your optimized monthly budget</h1>

        {/* Budget Categories */}
        <div className="space-y-2">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-light-gray">
                <h2 className="font-semibold text-darker-gray text-lg">{category.name}</h2>
                <hr className="my-4" />
                <input
                  type="text"
                  value={`SGD ${category.amount}`}
                  readOnly
                  className="w-full p-6 text-lg border border-medium-gray rounded-md bg-light-gray-background"
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">{message || 'Loading optimized budget...'}</p>
          )}
        </div>

        {/* Message Display */}
        <div className="mt-8 flex flex-col items-center text-center">
            {message && <p className="text-light-gray text-lg mb-4">{message}</p>}
            {isSuccess && (
              <button 
                onClick={() => navigate(`/homePage/${userId}`)}
                className="mt-4 w-full max-w-xs bg-dbs-teal-400 text-white px-6 py-3 rounded-full shadow-md font-bold hover:bg-dbs-teal-500 transition-colors duration-300"
              >
                Back to Homepage
              </button>
            )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default InsightsPage;