import React from 'react';

const AccountCard = ({ account, balanceVisible }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-600">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-gray-900">{account.name}</h3>
        <p className="text-sm text-gray-500">{account.number}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Balance</p>
        <p className="font-semibold text-gray-900">
          {balanceVisible ? account.balance : '••••••'}
        </p>
      </div>
    </div>
  </div>
);

export default AccountCard;