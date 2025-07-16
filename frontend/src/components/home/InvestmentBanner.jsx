import React, { useState } from 'react';
import { X } from 'lucide-react';

const InvestmentBanner = () => {
  const [bgImgError, setBgImgError] = useState(false);

  return (
    <div className="relative w-full h-80 overflow-hidden">
      {/* Mountain Background */}
      <div className="absolute inset-0">
        <img 
          src="/assets/mountain-background.png"
          alt="Mountain background"
          className="w-full h-full object-cover"
          onError={() => setBgImgError(true)}
          style={bgImgError ? { display: 'none' } : {}}
        />
        {/* Fallback gradient background if image doesn't load */}
        {bgImgError && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600"></div>
        )}
      </div>

      {/* Climbing Figure - Fixed positioning */}
      <div className="absolute top-5 left-1/3 w-8 h-8 z-20">
        {/* Try to load image first, fallback to CSS figure */}
        <img 
          src="/assets/climber-figure.svg"
          alt="Climbing figure"
          className="w-8 h-8 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        {/* CSS Fallback figure - hidden by default */}
        <div className="w-8 h-8 flex-col items-center justify-center hidden">
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
      <div className="absolute top-1/4 right-6 text-right z-10 w-[130px]">
          {/* Main Headline */}
          <h2 className="text-dbs-red-600 text-sm font-bold leading-tight">
            5 months of steady pay - time to make it work for you!
          </h2>
        <div className="w-full">
          {/* Description */}
          <p className="text-gray-800 text-[10px] leading-relaxed">
            Let's grow it further with the <span className="font-medium">Asia ETF.</span>
          </p>
        </div>
      </div>

      {/* Investing Button*/}
      <div className="absolute text-centre bottom-12 left-4 right-4 z-10">
        <div className="flex justify-start py-6">
          <button className="bg-dbs-red-600 hover:bg-dbs-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg">
              Start Investing
          </button>
        </div>
      </div>

      {/* Last Login Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-dbs-red-600 z-30">
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
    </div>
  );
};

export default InvestmentBanner;