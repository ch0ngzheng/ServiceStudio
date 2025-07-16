import React from 'react';
import { X } from 'lucide-react';

const InvestmentBanner = () => {
  return (
    <div className="relative w-full h-80 overflow-hidden font-dbs">
      {/* Mountain Background */}
      <div className="absolute inset-0">
        <img 
          src="/assets/mountain-background.png"
          alt="Mountain background"
          className="w-full h-full object-cover"
        />
        {/* Fallback gradient background if image doesn't load */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600"></div>
      </div>

      {/* CSS Mountain Background (fallback/alternative) */}
      <div className="absolute inset-0">
        {/* Back mountains */}
        <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-yellow-300 to-transparent"
             style={{ clipPath: 'polygon(0% 100%, 25% 30%, 50% 45%, 75% 20%, 100% 35%, 100% 100%)' }}>
        </div>
        {/* Middle mountains */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-yellow-400 to-transparent"
             style={{ clipPath: 'polygon(0% 100%, 30% 40%, 60% 15%, 85% 50%, 100% 25%, 100% 100%)' }}>
        </div>
        {/* Front mountains */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-yellow-500 to-transparent"
             style={{ clipPath: 'polygon(0% 100%, 40% 25%, 70% 45%, 100% 30%, 100% 100%)' }}>
        </div>
      </div>

      {/* Climbing Figure - Fixed positioning */}
      <div className="absolute top-20 left-20 w-8 h-8 z-20">
        {/* Try to load image first, fallback to CSS figure */}
        <img 
          src="/assets/climber-figure.png"
          alt="Climbing figure"
          className="absolute inset-0 w-8 h-8 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        {/* CSS Fallback figure - hidden by default */}
        <div className="absolute inset-0 w-8 h-8 flex-col items-center justify-center hidden">
          {/* Head */}
          <div className="w-2 h-2 bg-dbs-dark rounded-full"></div>
          {/* Body and limbs container */}
          <div className="relative flex flex-col items-center">
            {/* Body */}
            <div className="w-0.5 h-3 bg-dbs-dark"></div>
            {/* Arms */}
            <div className="absolute top-1 -left-1.5 w-3 h-0.5 bg-dbs-dark transform rotate-12"></div>
            <div className="absolute top-1 -right-1.5 w-3 h-0.5 bg-dbs-dark transform -rotate-12"></div>
            {/* Legs */}
            <div className="absolute top-2.5 -left-1 w-2 h-0.5 bg-dbs-dark transform rotate-45"></div>
            <div className="absolute top-2.5 -right-1 w-2 h-0.5 bg-dbs-dark transform -rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Main Content - Bottom Left */}
      <div className="max-w-xs text-left border border-dbs-red border-dashed">
        {/* Main Headline */}
        <h2 className="text-dbs-red text-base font-bold leading-tight mb-3 font-dbs">
          5 months of steady pay – time to make it work for you!
        </h2>
        {/* Description */}
        <p className="text-dbs-dark text-sm leading-relaxed mb-6 font-dbs">
          Let's grow it further with the <span className="font-medium">Asia ETF.</span>
        </p>
        {/* CTA Button - positioned at bottom right */}
        <div className="flex justify-end mb-4">
          <button className="bg-dbs-red hover:bg-dbs-red-hover text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg font-dbs">
            Start Investing
          </button>
        </div>
        
        {/* Last Login Footer - moved outside main content div */}
        <div className="absolute bottom-0 left-0 right-0 bg-dbs-red z-30">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-base text-white font-dbs">
              Last Login: 09 Jul 2025, 09:43 AM (SG)
            </p>
            <button 
              className="text-white hover:text-dbs-red-light transition-colors"
              onClick={() => console.log('Close clicked')}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentBanner;