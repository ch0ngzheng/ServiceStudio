import React, { useState } from 'react';
import AccountCard from '../banking/AccountCard';
import BudgetCard from '../banking/budgetCard';
import TransportCardBanner from '../banking/TransportCardBanner';
import AddTransactionForm from '../banking/AddTransactionForm';

const AccountsSection = ({ balance, balanceVisible, userId, transportSpending }) => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransactionAdded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const account = {
    name: 'My Account',
    number: '120-741443-0',
    balance: `SGD ${balance.toFixed(2)}`
  };

  return (
    <div className="px-4 mb-6">
      {/* CENTER THE TABS */}
      <div className="flex justify-center border-b border-gray-200 mb-4">
        <div className="flex-8">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`pb-2 px-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'accounts'
                ? 'border-primary-red text-primary-red'
                : 'border-transparent text-gray-500'
            }`}
          >
            ACCOUNTS
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`pb-2 px-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'insights'
                ? 'border-primary-red text-primary-red'
                : 'border-transparent text-gray-500'
            }`}
          >
            INSIGHTS
          </button>
        </div>
      </div>

      {activeTab === 'accounts' && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-900">Deposits</h3>
            <span className="text-gray-400">›</span>
          </div>
          <AccountCard account={account} balanceVisible={balanceVisible} />
        </div>
      )}

      {activeTab === 'insights' && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-900">Insights</h3>
            <span className="text-gray-400">›</span>
          </div>
                    <BudgetCard userId={userId} refreshKey={refreshKey} />
          <TransportCardBanner transportSpending={transportSpending} />
          <div className="mt-6">
            <AddTransactionForm userId={userId} onTransactionAdded={handleTransactionAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsSection;