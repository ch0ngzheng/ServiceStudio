import { PieChart, TrendingUp, Shield, DollarSign, BarChart3, Home, CreditCard, ArrowUpDown, Menu, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BottomNavigation from '../components/layout/BottomNavigation';

function InvestmentPage2() {
  const { userId } = useParams();
  const [bgImgError, setBgImgError] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState('Unit Trusts');
  const [activeTab, setActiveTab] = useState('invest');

  useEffect(() => {
    const storedProduct = localStorage.getItem('recommendedProduct');
    if (storedProduct) {
      setRecommendedProduct(storedProduct);
    }
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    console.log(`Tab changed to: ${tabId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <img 
                src="/assets/icons/bell.svg?v=1" 
                alt="Notifications" 
                className="w-7 h-7"
                onError={(e) => {
                  console.log('Failed to load bell icon, showing fallback');
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <Bell className="w-7 h-7 text-gray-500 hidden" />
            </div>
          </div>
          
          {/* Centered digiPortfolio title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold text-gray-900">digiPortfolio</h1>
          </div>
          
          {/* Help/Question icon */}
          <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
            <img 
              src="/assets/icons/helpicon.svg"
              alt="Help"
              className="w-6 h-6"
              onError={(e) => {
                console.log('Failed to load help icon, showing fallback');
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <span className="text-sm text-gray-600 hidden">?</span>
          </button>
        </div>
      </div>

      {/* Icon Navigation */}
      <div className="bg-white px-4 py-4 mb-2">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center text-center">
            <img 
              src="/assets/icons/digiportfolio.svg"
              alt="digiPortfolio"
              className="w-20 h-20"
              onError={(e) => {
                console.log('Failed to load digiportfolio icon');
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <img 
              src="/assets/icons/ESA.svg"
              alt="ESA"
              className="w-20 h-20"
              onError={(e) => {
                console.log('Failed to load ESA icon');
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <img 
              src="/assets/icons/SGS.svg"
              alt="SGS"
              className="w-20 h-20"
              onError={(e) => {
                console.log('Failed to load SGS icon');
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <img 
              src="/assets/icons/EPS.svg"
              alt="EPS"
              className="w-20 h-20"
              onError={(e) => {
                console.log('Failed to load EPS icon');
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="flex flex-col items-center text-center">
            <img 
              src="/assets/icons/checkrates.svg"
              alt="Check Rates"
              className="w-20 h-20"
              onError={(e) => {
                console.log('Failed to load checkrates icon');
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        <h2 className="text-base font-normal text-gray-600 mb-2 text-left px-4">
          Your personalised Investment Guide
        </h2>

        {/* Investment Guide Card with Mountain Background */}
        <div className="bg-white shadow-sm overflow-hidden relative mb-2" style={{ height: '420px' }}>
          {/* Mountain Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/assets/icons/mountain.svg"
              alt="Mountain background"
              className="w-full h-full object-cover"
              onError={() => setBgImgError(true)}
              style={bgImgError ? { display: 'none' } : {}}
            />
            {/* Fallback gradient background if image doesn't load */}
            {bgImgError && (
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 opacity-60">
                <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-yellow-400 to-transparent"
                     style={{ clipPath: 'polygon(0% 100%, 25% 30%, 45% 10%, 65% 40%, 80% 20%, 100% 35%, 100% 100%)' }}>
                </div>
                <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-yellow-500 to-transparent opacity-80"
                     style={{ clipPath: 'polygon(0% 100%, 30% 45%, 50% 25%, 70% 50%, 90% 30%, 100% 45%, 100% 100%)' }}>
                </div>
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-yellow-600 to-transparent opacity-60"
                     style={{ clipPath: 'polygon(0% 100%, 40% 60%, 60% 40%, 80% 65%, 100% 50%, 100% 100%)' }}>
                </div>
              </div>
            )}
          </div>

          {/* Content Layer */}
          <div className="relative z-10 p-4">
            {/* Header Text */}
            <div className="mb-4 text-left">
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#003049', textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)' }}>
                Hi, Bumairah!
              </h3>
              <p className="text-black text-base">
                You're all set to invest but you've yet to complete your CKA and CAR.
              </p>
            </div>

            <div className="flex flex-col items-center w-full">
              {/* Step 1 - CKA not Completed */}
              <div className="flex items-start w-full max-w-md mb-16">
                <div className="text-white flex items-center justify-center font-bold mr-5 flex-shrink-0 rounded-full" style={{ width: '42px', height: '42px', backgroundColor: '#003049', fontSize: '20px' }}>
                  1.
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold underline text-lg" style={{ color: '#003049' }}>CKA not Completed</span>
                    <img 
                      src="/assets/icons/helpicon.svg"
                      alt="Help"
                      className="w-6 h-6"
                      onError={(e) => {
                        console.log('Failed to load help icon');
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <p className="text-black text-base mb-2 text-left">
                    Investment Knowledge not Verified
                  </p>
                </div>
              </div>

              {/* Step 2 - CAR not Completed */}
              <div className="flex items-start w-full max-w-md mb-16">
                <div className="text-white flex items-center justify-center font-bold mr-5 flex-shrink-0 rounded-full" style={{ width: '42px', height: '42px', backgroundColor: '#003049', fontSize: '20px' }}>
                  2.
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold underline text-lg" style={{ color: '#003049' }}>CAR not Completed</span>
                    <img 
                      src="/assets/icons/helpicon.svg"
                      alt="Help"
                      className="w-6 h-6"
                      onError={(e) => {
                        console.log('Failed to load help icon');
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <p className="text-black text-base mb-2 text-left">
                    Risk Profile not Established
                  </p>
                </div>
              </div>

              {/* Step 3 - Ready to Invest */}
              <div className="flex items-start w-full max-w-md">
                <div className="text-white flex items-center justify-center font-bold mr-5 flex-shrink-0 rounded-full" style={{ width: '42px', height: '42px', backgroundColor: '#B31410', fontSize: '20px' }}>
                  3.
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg" style={{ color: '#003049' }}>Ready to Invest!</span>
                  </div>
                </div>
              </div>

              {/* Investment Button */}
              <div className="relative w-full">
                <button className="font-bold hover:opacity-90 transition-colors flex items-center justify-center absolute" style={{ width: 125, height: 42, background: '#B31410', boxShadow: '0px 4px 8px rgba(179, 20, 16, 0.4), 0px 2px 4px rgba(0, 0, 0, 0.25)', borderRadius: 40, color: '#FDF0D5', fontSize: '16px', left: '70px', top: '-15px' }}>
                  {recommendedProduct}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Section */}
        <div className="mt-8 mb-4">
          <h3 className="text-base font-normal text-gray-600 mb-4 text-left px-4">POPULAR</h3>
        </div>
        
        {/* Fixed Deposit */}
        <div className="bg-white rounded-lg shadow-sm mb-2 p-4 mx-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fca5a5' }}>
                <div className="w-6 h-6 rounded-full relative" style={{ backgroundColor: '#B31410' }}>
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: '#B31410' }}></div>
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
        <div className="bg-white rounded-lg shadow-sm p-4 mx-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fca5a5' }}>
                <TrendingUp className="w-6 h-6" style={{ color: '#B31410' }} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">ETFs</h4>
                <p className="text-gray-500 text-sm">Start investing from just SGD 1,000.</p>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation using SVG */}
      <div className="fixed bottom-0 left-0 right-0 w-full">
        <img 
          src="/assets/icons/bottom bar.svg"
          alt="Bottom Navigation"
          className="w-full h-auto block"
          style={{ 
            display: 'block',
            width: '100%',
            height: 'auto',
            maxHeight: 'none',
            objectFit: 'cover'
          }}
          onError={(e) => {
            console.log('Failed to load bottom bar SVG, showing fallback');
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'block';
          }}
        />
        {/* Fallback navigation if SVG fails */}
        <div className="w-full bg-gray-800 py-2 hidden">
          <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>
    </div>
  );
}

export default InvestmentPage2;