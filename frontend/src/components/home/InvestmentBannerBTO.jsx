import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const InvestmentBanner = ({ userId }) => {
  const navigate = useNavigate();
  const [bgImgError, setBgImgError] = useState(false);

  return (
    <>
      <div className="relative w-full">
        {/* Background Image: Scales to set the aspect ratio */}
        <img 
          src="/assets/mountain-background.svg"
          alt="Mountain background"
          className="w-full h-auto"
          onError={() => setBgImgError(true)}
          style={bgImgError ? { display: 'none' } : {}}
        />

        {/* Fallback solid color background if the image fails */}
        {bgImgError && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600"></div>
        )}

        {/* All content is absolutely positioned on top of the image */}

        {/* Renovation Savings */}
        <div className="absolute top-[18%] left-[8%] flex items-center z-30">
          <span className="text-[#002663] font-bold text-[clamp(0.7rem,2.5vw,0.875rem)] mr-2">Renovation Savings</span>
        </div>

        {/* Downpayment Done */}
        <div className="absolute top-[40%] left-[18%] flex items-center z-30">
          <span className="text-[#002663] font-bold text-[clamp(0.7rem,2.5vw,0.875rem)] mr-2">Downpayment Done</span>
        </div>

        {/* Climbing Figure - Dynamic positioning */}
        <div className="absolute top-[58%] left-[35%] w-[8vw] h-[8vw] max-w-[32px] max-h-[32px] z-20 rotate-[-60deg]">
          <img 
            src="/assets/climber-figure.svg"
            alt="Climbing figure"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          {/* CSS Fallback figure - hidden by default */}
          <div className="w-full h-full flex-col items-center justify-center hidden">
            {/* Head */}
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            {/* Body and limbs container */}
            <div className="relative flex flex-col items-center">
              {/* Body */}
              <div className="w-0.5 h-3 bg-gray-800"></div>
              {/* Arms */}
              <div className="absolute top-1 -left-1.5 w-3 h-0.5 bg-gray-800 transform rotate-12"></div>
              <div className="absolute top-1 -right-1.5 w-3 h-0.5 bg-gray-800 transform -rotate-12"></div>
              {/* Legs */}
              <div className="absolute top-2.5 -left-1 w-2 h-0.5 bg-gray-800 transform rotate-45"></div>
              <div className="absolute top-2.5 -right-1 w-2 h-0.5 bg-gray-800 transform -rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Main Content*/}
        <div className="absolute top-[45%] right-[4%] text-right z-10 w-[45%]">
            {/* Main Headline */}
            <h2 className="text-dbs-red-600 text-[clamp(0.7rem,3vw,0.875rem)] font-bold leading-tight">
              New home, new goals — let’s grow your future.
            </h2>
          <div className="w-full mt-1">
            {/* Description */}
            <p className="text-gray-800 text-[clamp(0.6rem,2.5vw,0.75rem)] leading-relaxed">
              You’ve taken a big step with your BTO. Keep building your financial future with digiPortfolio, starting from just S$1,000
            </p>
          </div>
        </div>

        {/* Investing Button*/}
        <div className="absolute bottom-[8%] left-[4%] z-40">
          <button 
            className="bg-dbs-red-600 hover:bg-dbs-red-700 text-white rounded-lg font-medium shadow-lg flex items-center justify-center h-[8vw] max-h-[40px] px-4 text-[clamp(0.75rem,3vw,1rem)]" 
            onClick={() => navigate(`/bto/${userId}`)}
          >
              Start Investing
          </button>
        </div>
      </div>

      {/* Last Login Footer */}
      <div className="bg-dbs-red-600">
        <div className="flex items-center justify-between px-4 py-2">
          <p className="text-sm text-white">
            Last Login: 09 Jul 2025, 09:43 AM (SG)
          </p>
          <button 
            className="text-white hover:text-dbs-red-200 transition-colors p-1"
            onClick={() => console.log('Close clicked')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default InvestmentBanner;