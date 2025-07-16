import React from 'react';

const InvestmentBanner = () => {
  return (
    <div className="bg-red-700 rounded-lg p-4 mb-4">
      <h2 className="font-semibold text-white mb-1 text-left">New to investing?</h2>
      <p className="text-sm text-red-100 mb-3 text-left">
        Grow your extra cash with our range of ready-made digiPortfolios. Start from just S$100.
      </p>
      <div className="flex justify-start">
        <button className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
          LEARN MORE
        </button>
      </div>
    </div>
  );
};

export default InvestmentBanner;