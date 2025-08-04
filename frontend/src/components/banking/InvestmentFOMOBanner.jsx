import React from 'react';
import { useNavigate } from 'react-router-dom';

const InvestmentFOMOBanner = ({ userId }) => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    if (userId) {
      navigate(`/invest/${userId}`);
    }
  };

  return (
    <div 
      className="p-4 mx-4 rounded-2xl shadow-md my-4 text-center cursor-pointer" 
      style={{ background: 'linear-gradient(135deg, #E8E5FF 0%, #FFE4E8 100%)' }}
      onClick={handleBannerClick}
    >
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg font-bold text-gray-900 mb-1">
          What happens to your $1000 in one year?
        </h1>
        <p className="text-sm text-gray-700">
          Make your money work harder - choose <span className="text-purple-600 font-semibold">DigiPortfolio</span>.
        </p>
      </div>

      {/* Investment Options */}
      <div className="flex gap-3 justify-center">
        {/* Savings Account */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 flex-1 max-w-32 text-center">
          <h3 className="font-semibold text-gray-900 text-xs mb-2">Savings Account</h3>
          <div className="text-2xl font-bold text-gray-900 mb-1">$1002</div>
          <p className="text-green-600 text-xs font-medium">+ $2 (0.25%)</p>
        </div>

        {/* Fixed Deposit */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 flex-1 max-w-32 text-center">
          <h3 className="font-semibold text-gray-900 text-xs mb-2">Fixed Deposit</h3>
          <div className="text-2xl font-bold text-gray-900 mb-1">$1025</div>
          <p className="text-green-600 text-xs font-medium">+ $25 (2.45%)</p>
        </div>

        {/* DigiPortfolio */}
        <div className="bg-purple-500 rounded-xl p-3 flex-1 max-w-32 text-center text-white">
          <h3 className="font-semibold text-xs mb-2">DigiPortfolio</h3>
          <div className="text-2xl font-bold mb-1">$1080</div>
          <p className="text-purple-200 text-xs font-medium">+ $80 (8%)</p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentFOMOBanner;
