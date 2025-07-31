import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SetBudgetPage = () => {
  const { userId } = useParams();
  const [totalBudget, setTotalBudget] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalBudget) {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // JS months are 0-indexed
      navigate(`/insights/${userId}`, { 
        state: { 
          totalBudget: parseFloat(totalBudget),
          year,
          month
        } 
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Set Your Monthly Budget</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="totalBudget" className="block text-gray-700 text-sm font-bold mb-2">
              Total Budget Amount (SGD)
            </label>
            <input
              type="number"
              id="totalBudget"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="e.g., 1500"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-teal-400 text-white px-6 py-3 rounded-full shadow-md font-bold hover:bg-teal-500 transition-colors duration-300"
          >
            Optimize My Budget
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetBudgetPage;
