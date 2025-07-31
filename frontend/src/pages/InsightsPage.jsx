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
  const [setAsDefault, setSetAsDefault] = useState(false);

  useEffect(() => {
    const { totalBudget } = location.state || {};
    if (totalBudget) {
      fetchOptimizedBudget(false); // Initial fetch without setting as default
    }
  }, [userId, location.state]);

  const fetchOptimizedBudget = async (isDefault) => {
    const { totalBudget, year, month } = location.state || {};
    if (!totalBudget) {
      setMessage('No budget amount was set. Please go back and set a budget.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/optimize-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          total_budget: totalBudget,
          year,
          month,
          set_as_default: isDefault,
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
        return true; // Indicate success
      } else {
        setMessage(result.error || 'Failed to optimize budget.');
        return false; // Indicate failure
      }
    } catch (error) {
      setMessage('An error occurred while optimizing the budget.');
      console.error('Optimization error:', error);
      return false; // Indicate failure
    }
  };

  const handleConfirmBudget = async () => {
    setMessage('Saving your preferences...');
    const success = await fetchOptimizedBudget(setAsDefault);
    if (success) {
      setMessage('Budget confirmed and saved!');
      setTimeout(() => navigate(`/homePage/${userId}`), 1500);
    }
  };

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

        {/* Set as Default Checkbox */}
        {isSuccess && (
          <div className="mt-6 flex items-center justify-center">
            <input
              type="checkbox"
              id="setDefault"
              checked={setAsDefault}
              onChange={() => setSetAsDefault(!setAsDefault)}
              className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="setDefault" className="ml-2 block text-sm text-gray-900">
              Set as default for upcoming months
            </label>
          </div>
        )}

        {/* Message Display */}
        <div className="mt-8 flex flex-col items-center text-center">
            {message && <p className="text-light-gray text-lg mb-4">{message}</p>}
            {isSuccess && (
              <button 
                onClick={handleConfirmBudget}
                className="mt-4 w-full max-w-xs bg-teal-400 text-white px-6 py-3 rounded-full shadow-md font-bold hover:bg-teal-500 transition-colors duration-300"
              >
                Confirm Budget
              </button>
            )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default InsightsPage;