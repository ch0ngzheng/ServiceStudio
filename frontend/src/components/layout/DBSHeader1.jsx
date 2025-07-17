import { useNavigate } from 'react-router-dom';
import { PieChart, TrendingUp, Shield, DollarSign, BarChart3 } from 'lucide-react';
import BottomNavigation from "./BottomNavigation";
import { useState } from 'react';

function InvestmentPage() {
  const navigate = useNavigate();
  const [bgImgError, setBgImgError] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <img
                src="/assets/notification-bell1.svg"
                alt="Notifications"
                className="w-6 h-6"
              />
              {/* Red notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
            
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">digiPortfolio</h1>
          </div>
          
          {/* Help/Question icon */}
          <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
            <img
              src="/assets/help-icon.png"
              alt="Help"
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>

      {/* Icon Navigation */}
      <div className="bg-white px-4 py-6 mb-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-2">
              <PieChart className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs text-gray-600 leading-tight">digiPortfolio</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs text-gray-600 leading-tight">ESA</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-2">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs text-gray-600 leading-tight">SGS</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-2">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs text-gray-600 leading-tight">EPS</span>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-2">
              <BarChart3 className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-xs text-gray-600 leading-tight">Check Rates</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-20">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Your personalised Investment Guide
        </h2>

        {/* Investment Guide Card with Mountain Background */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
          {/* Mountain Background with exact styling */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/assets/mountain-background.png"
              alt="Mountain background"
              className="w-full h-full object-cover"
              onError={() => setBgImgError(true)}
              style={bgImgError ? { display: 'none' } : {}}
            />
            {/* Fallback gradient background if image doesn't load */}
            {bgImgError && (
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 opacity-60">
                {/* CSS Mountain shapes */}
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-yellow-400 to-transparent"
                     style={{ clipPath: 'polygon(0% 100%, 30% 40%, 60% 15%, 85% 50%, 100% 25%, 100% 100%)' }}>
                </div>
                <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-yellow-500 to-transparent"
                     style={{ clipPath: 'polygon(0% 100%, 40% 35%, 70% 55%, 100% 40%, 100% 100%)' }}>
                </div>
              </div>
            )}
          </div>

          {/* Content Layer */}
          <div className="relative z-10 p-6">
            {/* Header Text - Left Aligned */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Hi, Bumairah!
              </h3>
              <p className="text-gray-700">
                You're all set to invest, but you've yet to complete your CKA and CAR.
              </p>
            </div>

            {/* Step 1 - CKA not Completed */}
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 underline text-lg">CKA not Completed</span>
                  <span className="text-red-600 text-lg">✗</span>
                </div>
                <p className="text-gray-600 mb-3">
                  Investment Knowledge not Verified
                </p>
                <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>

            {/* Step 2 - CAR not Completed */}
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 underline text-lg">CAR not Completed</span>
                  <span className="text-red-600 text-lg">✗</span>
                </div>
                <p className="text-gray-600 mb-3">
                  Risk Profile not Established
                </p>
                <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>

            {/* Step 3 - Ready to Invest */}
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-2 text-lg">
                  Ready to Invest!
                </p>
                <p className="text-gray-600 mb-4">
                  You're eligible for (click to find out more):
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-slate-800 text-white font-medium rounded text-base hover:bg-slate-700 transition-colors">
                    Asia ETF
                  </button>
                  <button className="px-8 py-3 bg-slate-800 text-white font-medium rounded text-base hover:bg-slate-700 transition-colors">
                    Unit Trust
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-500 mb-4">POPULAR</h3>
          
          {/* Fixed Deposit */}
          <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full relative">
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                    <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fixed Deposit</h4>
                  <p className="text-gray-500 text-sm">Place a Deposit in currency of your choice.</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </div>

          {/* Unit Trusts & ETFs */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Unit Trusts & ETFs</h4>
                  <p className="text-gray-500 text-sm">Start investing from just SGD 100 a month.</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="invest" />
    </div>
  );
}

export default InvestmentPage;