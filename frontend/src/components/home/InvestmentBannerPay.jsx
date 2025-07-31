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
          <div className="absolute inset-0 bg-gradient-to-br from-dbs-yellow-200 via-dbs-yellow-400 to-dbs-yellow-600"></div>
        )}

        {/* All content is absolutely positioned on top of the image */}

        {/* 5 Months pay */}
        <div className="absolute top-[10%] left-[22%] flex items-center z-30">
          <span className="text-dbs-navy font-bold text-[0.6rem] sm:text-xs md:text-sm mr-2">5 Months pay</span>
        </div>

        {/* 3 Months pay */}
        <div className="absolute top-[35%] left-[53%] flex items-center z-30">
          <span className="text-dbs-navy font-bold text-[0.6rem] sm:text-xs md:text-sm mr-2">3 Months pay</span>
        </div>

        {/* 1 Month pay */}
        <div className="absolute top-[65%] left-[27%] flex items-center z-30">
          <span className="text-dbs-navy font-bold text-[0.6rem] sm:text-xs md:text-sm mr-2">1 Month pay</span>
        </div>

        {/* Climbing Figure - Dynamic positioning */}
        <div className="absolute top-[20%] left-[47%] w-[8vw] h-[8vw] max-w-[32px] max-h-[32px] z-20 scale-x-[-1] rotate-[15deg]">
          <img 
            src="/assets/climber-figure.svg"
            alt="Climbing figure"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full flex-col items-center justify-center hidden">
            <div className="w-2 h-2 bg-dbs-navy rounded-full"></div>
            <div className="relative flex flex-col items-center">
              {/* Body */}
              <div className="w-0.5 h-3 bg-dbs-navy"></div>
              {/* Arms */}
              <div className="absolute top-1 -left-1.5 w-3 h-0.5 bg-dbs-navy transform rotate-12"></div>
              <div className="absolute top-1 -right-1.5 w-3 h-0.5 bg-dbs-navy transform -rotate-12"></div>
              {/* Legs */}
              <div className="absolute top-2.5 -left-1 w-2 h-0.5 bg-dbs-navy transform rotate-45"></div>
              <div className="absolute top-2.5 -right-1 w-2 h-0.5 bg-dbs-navy transform -rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Main Content*/}
        <div className="absolute top-[48%] right-[4%] text-right z-10 w-[45%]">
            <h2 className="text-dbs-red-600 text-xs sm:text-sm font-bold leading-tight mb-2">
              5 months of steady pay - time to make it work for you!
            </h2>
          <div className="w-full mt-1">
            <p className="text-darker-gray text-[10px] sm:text-xs leading-relaxed justify-end">
              Let's grow it further with the <span className="font-medium">Asia ETF.</span>
            </p>
          </div>
        </div>

        {/* Investing Button*/}
        <div className="absolute bottom-[8%] left-[4%] z-40">
          <button 
            className="bg-dbs-red-600 hover:bg-dbs-red-700 text-white rounded-lg font-medium shadow-lg flex items-center justify-center h-[2.5vw] md:h-[3vw] px-[2vw] md:px-6 text-[2.5vw] md:text-xs"
            onClick={() => navigate(`/pay/${userId}`)}
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