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
        <div className="absolute top-[10%] left-[15%] flex items-center z-30">
          <span className="text-[#002663] font-bold text-[0.6rem] sm:text-xs md:text-sm mr-2">Renovation Savings</span>
        </div>

        {/* Downpayment Done */}
        <div className="absolute top-[35%] left-[53%] flex items-center z-30">
          <span className="text-[#002663] font-bold text-[0.6rem] sm:text-xs md:text-sm mr-2">Downpayment Done</span>
        </div>

        {/* Climbing Figure */}
        <div className="absolute bottom-[27%] left-[35%] w-8 h-8 z-20 rotate-[-60deg]">
          <img 
            src="/assets/climber-figure.svg"
            alt="Climbing figure"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Main Content*/}
        <div className="absolute top-[48%] right-[4%] text-right z-10 w-[45%]">
            <h2 className="text-dbs-red-600 text-xs sm:text-sm font-bold leading-tight mb-2">
              New home, new goals — let’s grow your future.
            </h2>
            <p className="text-gray-800 text-[10px] sm:text-xs leading-relaxed justify-end">
              You’ve taken a big step with your BTO. Keep building your financial future with digiPortfolio, starting from just S$1,000
            </p>
        </div>

        {/* Investing Button*/}
        <div className="absolute bottom-[8%] left-[4%] z-40">
          <button 
            className="bg-dbs-red-600 hover:bg-dbs-red-700 text-white rounded-lg font-medium shadow-lg flex items-center justify-center h-[2.5vw] md:h-[3vw] px-[2vw] md:px-6 text-[2.5vw] md:text-xs"
            onClick={() => navigate(`/savings/${userId}`)}
          >
            Start Investing
          </button>
        </div>
      </div>

      {/* Last Login Footer */}
      <div className="bg-dbs-red-600">
        <div className="flex items-center justify-between px-4 py-1">
          <p className="text-xs sm:text-sm text-white">
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