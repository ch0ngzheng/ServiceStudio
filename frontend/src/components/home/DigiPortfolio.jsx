import React from 'react';
import { PieChart } from 'lucide-react';

const DigiPortfolio = () => {
  return (
    <div className="px-4 mb-20">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-dark-blue rounded-lg flex items-center justify-center">
            <PieChart className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">digiPortfolio</span>
              <span className="bg-lighter-gray-background text-xs px-2 py-1 rounded font-medium">
                DIGIPORTFOLIO
              </span>
            </div>
            <p className="text-sm text-medium-gray">
              Invest in ready-made fund portfolio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigiPortfolio;