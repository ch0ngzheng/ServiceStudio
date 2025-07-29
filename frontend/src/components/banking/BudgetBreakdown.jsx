import React from 'react';

const BudgetCategory = ({ category, spent, total }) => {
  const percentage = total > 0 ? (spent / total) * 100 : 0;
  const isOverBudget = spent > total;

  let progressBarColor = 'bg-green-400';
  if (percentage > 85) progressBarColor = 'bg-yellow-400';
  if (isOverBudget) progressBarColor = 'bg-red-500';

  const statusText = isOverBudget
    ? `You're over budget by SGD ${(spent - total).toFixed(2)}`
    : `You've used ${Math.round(percentage)}% of your budget`;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold text-gray-800">{category}</h4>
        <span className="text-gray-400">›</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
        <div 
          className={`${progressBarColor} h-2 rounded-full`}
          style={{ width: `${isOverBudget ? 100 : percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between w-full text-sm">
        <span className={isOverBudget ? 'text-red-500' : 'text-gray-500'}>{statusText}</span>
        <span className="font-medium text-gray-600">SGD {spent.toFixed(2)} / SGD {total.toFixed(2)}</span>
      </div>
    </div>
  );
};

const BudgetBreakdown = ({ categories }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      {categories.map((cat, index) => (
        <BudgetCategory 
          key={index} // Using index as key is acceptable if list is static
          category={cat.name}
          spent={cat.spent}
          total={cat.total}
        />
      ))}
    </div>
  );
};

export default BudgetBreakdown;
