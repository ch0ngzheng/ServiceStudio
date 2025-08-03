import React, { useState } from 'react';
import axios from 'axios';

const AddTransactionForm = ({ userId, onTransactionAdded }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState('Miscellaneous'); // Default category
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!amount || !merchant) {
      setError('Please fill out all fields.');
      return;
    }

    const transactionData = {
      user_id: userId,
      amount: parseFloat(amount) * -1, // Spending is negative
      description,
      merchant,
      category, // This will be auto-overridden by the backend, but good to send
      timestamp: new Date().toISOString(),
      transaction_type: 'Purchase',
      currency: 'SGD',
    };

    try {
                  const response = await axios.post(`${import.meta.env.VITE_BUDGET_URL}/budget/transactions`, transactionData);
      setSuccess(response.data.notification || 'Transaction added successfully!');
      setAmount('');
      setDescription('');
      setMerchant('');
      if (onTransactionAdded) {
        onTransactionAdded(); // Callback to refresh data in parent
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add transaction.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
      <h2 className="font-bold text-lg mb-4">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (SGD)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dbs-indigo-500 focus:border-dbs-indigo-500 sm:text-sm"
            placeholder="e.g., 50.00"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dbs-indigo-500 focus:border-dbs-indigo-500 sm:text-sm"
            placeholder="e.g., Coffee with friends"
          />
        </div>
        <div>
          <label htmlFor="merchant" className="block text-sm font-medium text-gray-700">Merchant</label>
          <input
            type="text"
            id="merchant"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dbs-indigo-500 focus:border-dbs-indigo-500 sm:text-sm"
            placeholder="e.g., Starbucks"
          />
        </div>
        <button 
          type="submit"
          className="w-full py-2 px-4 bg-dbs-blue-600 text-white font-bold rounded-full hover:bg-dbs-blue-700 transition-colors"
        >
          Add Transaction
        </button>
        {error && <p className="text-dbs-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-dbs-green-500 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default AddTransactionForm;
