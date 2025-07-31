import React, { useState, useEffect } from 'react';
import { Car, ShoppingBag, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'; // Example icons
import BudgetBreakdown from './BudgetBreakdown';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// A simple toggle switch component
const ToggleSwitch = ({ enabled, setEnabled }) => (
  <button 
    onClick={() => setEnabled(!enabled)}
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${enabled ? 'bg-red-500' : 'bg-gray-300'}`}>
    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const BudgetCard = ({ 
  userId, 
  refreshKey,
  adjustments = [
    { icon: Car, amount: 20, from: 'Entertainment', to: 'Transport' },
    { icon: ShoppingBag, amount: 50, from: 'Shopping', to: 'Food' },
  ],
  onSetNextMonthBudget = () => {},
}) => {
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [budget, setBudget] = useState(null); // This will hold the rebalanced budget for display logic
  const [originalBudget, setOriginalBudget] = useState(null); // This will hold the original budget for display totals
  const [spending, setSpending] = useState(null);
  const [monthWrapped, setMonthWrapped] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Dynamically calculate day and total days in the month
  const currentDay = selectedDate.getDate();
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

  const handleMonthChange = (months) => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + months);
      return newDate;
    });
  };

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        setLoading(true);

        // Fetch all budget data from the single, enhanced endpoint
        const response = await axios.get(`http://localhost:5001/budget/${userId}/${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}`);
        
        if (!response.data.success) {
          throw new Error('Failed to fetch budget data.');
        }

        const { original_budget: budgetData, spending_breakdown: spendingData, rebalanced_budget: rebalancedBudgetData } = response.data;

        // Standard categories that should be displayed
        const standardCategories = ["Transport", "Food", "Shopping", "Entertainment", "Miscellaneous"];
        
        // Create a new budget object with the correct structure for the *original* budget
        const processedOriginalBudget = {};
        standardCategories.forEach(cat => {
          processedOriginalBudget[cat] = 0;
        });

        for (const category in budgetData) {
          if (category === "Meals" || category === "Groceries") {
            processedOriginalBudget["Food"] = (processedOriginalBudget["Food"] || 0) + budgetData[category];
          } else if (standardCategories.includes(category)) {
            processedOriginalBudget[category] = budgetData[category];
          }
        }

        // Store both the original and rebalanced budgets
        setOriginalBudget(processedOriginalBudget);
        setBudget(rebalancedBudgetData);
        setSpending(spendingData);

        // Calculate month-wrapped data dynamically using the original budget values
        const totalBudget = Object.values(processedOriginalBudget).reduce((sum, val) => sum + val, 0);
        const totalSpent = Object.values(spendingData).reduce((sum, value) => sum + value, 0);
        const totalSaved = totalBudget - totalSpent;

        const currentMonth = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        const nextMonthDate = new Date(selectedDate);
        nextMonthDate.setMonth(selectedDate.getMonth() + 1);
        const nextMonth = nextMonthDate.toLocaleString('default', { month: 'long' });

        setMonthWrapped({
          status: totalSpent <= totalBudget ? 'On Track' : 'Overspent',
          totalBudget,
          totalSpent,
          totalSaved,
          month: currentMonth,
          nextMonth,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, [userId, selectedDate, refreshKey]);

  if (!isExpanded) {
    return (
      <div 
        className="bg-white p-4 rounded-2xl shadow-sm mb-4 cursor-pointer hover:bg-gray-100 transition-all"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Budget Analysis</h2>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 font-sans">
      {/* Month Selector Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => handleMonthChange(-1)} className="p-2 rounded-full hover:bg-gray-200">
          &lt;
        </button>
        <h2 className="text-lg font-bold">
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => handleMonthChange(1)} className="p-2 rounded-full hover:bg-gray-200">
          &gt;
        </button>
      </div>

      {/* Header with Title and Toggle */}
      <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setIsExpanded(false)}>
        <h2 className="font-bold text-lg">Budget Analysis</h2>
        <ChevronUp className="w-5 h-5 text-gray-400" />
      </div>

      <div className="text-left mb-2">
        <span className="text-xs font-bold text-gray-500">● DAY {currentDay}/{daysInMonth}</span>
      </div>

      {/* Smart Adjustments Card */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-bold text-lg">Smart Adjustments <span className="text-gray-400">({adjustments.length})</span></h2>
          <div className="flex items-center">
            <span className="text-xs text-gray-400 mr-2">Redistribute</span>
            <ToggleSwitch enabled={automationEnabled} setEnabled={setAutomationEnabled} />
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">We've automatically adjusted your budgets to keep you on track</p>
        <div className="flex gap-4 mb-2">
          {adjustments.map((adj, index) => (
            <div key={index} className="flex-1 bg-red-50 p-3 rounded-2xl border border-red-200 flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <adj.icon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-sm">Moved ${adj.amount}</p>
                <p className="text-xs text-gray-600">{adj.from} to {adj.to}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-red-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
        </div>
      </div>

      {/* Budget Breakdown Card */}
      {/* Budget Breakdown Card */}
      <div className="mb-4">
        {loading && <p>Loading budget...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {originalBudget && spending ? (
          <BudgetBreakdown 
            key={refreshKey}
            categories={Object.keys(originalBudget).map(category => ({
              name: category,
              total: originalBudget[category], // Use original budget for the total
              spent: spending[category] || 0,
            }))}
          />
        ) : (
          !error && <p>Loading budget details...</p>
        )}
      </div>

      {/* Month Wrapped Card */}
      {monthWrapped ? (
      <div className="bg-blue-50 p-4 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-blue-900">Month Wrapped</h2>
          <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">{monthWrapped.status}</span>
        </div>
        <div className="flex text-center border-b border-blue-200 pb-4 mb-4">
          <div className="w-1/2 border-r border-blue-200">
            <p className="text-xs text-gray-500">SGD</p>
            <p className="text-2xl font-bold text-blue-900">{monthWrapped.totalBudget.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total Budget for {monthWrapped.month}</p>
          </div>
          <div className="w-1/2">
            <p className="text-xs text-gray-500">SGD</p>
            <p className="text-2xl font-bold text-blue-900">{monthWrapped.totalSpent.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total Spent for {monthWrapped.month}</p>
          </div>
        </div>
        <div className="text-center mb-4">
          <p className="text-xs text-gray-500">SGD</p>
          <p className="text-3xl font-bold text-blue-900">{monthWrapped.totalSaved.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Total Saved for {monthWrapped.month} after Smart Reallocations.</p>
        </div>
        <button onClick={() => navigate(`/set-budget/${userId}`)} className="w-full py-3 px-4 bg-green-300 text-green-900 font-bold rounded-full hover:bg-green-400 transition-colors">
          Set Budget for {monthWrapped.month}
        </button>
      </div>
      ) : (
        <div className="bg-blue-50 p-4 rounded-2xl shadow-sm text-center">
          <p>Loading month summary...</p>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;