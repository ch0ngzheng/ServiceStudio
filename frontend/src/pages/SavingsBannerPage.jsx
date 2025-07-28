import { PieChart, TrendingUp, Shield, DollarSign, BarChart3, Home, CreditCard, ArrowUpDown, Menu, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BottomNavigation from '../components/layout/BottomNavigation';


function SavingsBannerPage() {
  const { userId } = useParams(); // Assuming you get userId from the route
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
                src="/assets/icons/bell.svg" 
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
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center text-center gap-1">
            <img 

              src="/assets/icons/digiportfolio.svg" 
              alt="digiPortfolio" 
              className="w-14 h-14"

              onError={(e) => {
                console.log('Failed to load digiportfolio icon');
                e.target.style.display = 'none';
              }}
            />
            <span className="text-xs text-gray-700">digiPortfolio</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <img 

              src="/assets/icons/ESA.svg" 
              alt="ESA" 
              className="w-14 h-14"

              onError={(e) => {
                console.log('Failed to load ESA icon');
                e.target.style.display = 'none';
              }}
            />
            <span className="text-xs text-gray-700">ESA</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <img 
              src="/assets/icons/SGS.svg" 
              alt="SGS" 
              className="w-14 h-14"
              onError={(e) => {
                console.log('Failed to load SGS icon');
                e.target.style.display = 'none';
              }}
            />
            <span className="text-xs text-gray-700">SGS</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <img 
              src="/assets/icons/EPS.svg" 
              alt="EPS" 
              className="w-14 h-14"
              onError={(e) => {
                console.log('Failed to load EPS icon');
                e.target.style.display = 'none';
              }}
            />
            <span className="text-xs text-gray-700">EPS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        <h2 className="text-base font-normal text-gray-600 mb-2 text-left px-4">
          Your personalised Investment Guide
        </h2>

        {/* Investment Guide Card with Mountain Background */}
        <div className="bg-white shadow-sm overflow-hidden relative mb-2">
          {/* Asia ETF Button - Positioned with absolute positioning */}
          <div className="absolute bottom-[8%] left-1/2 transform -translate-x-1/2 z-20">
            <button className="font-bold hover:opacity-90 transition-colors flex items-center justify-center bg-[#C1121F] shadow-lg rounded-full text-white text-sm md:text-base py-2 px-8">
              {recommendedProduct}
            </button>
          </div>
          {/* Background Image: Scales to set the aspect ratio */}
          <div className="h-[350px]">
            <img 
              src="/assets/mountain-background-no-red-dots.svg"
              alt="Mountain background with milestone markers"

              className="w-full h-full object-cover"
              onError={() => setBgImgError(true)}
              style={bgImgError ? { display: 'none' } : {}}
            />
          </div>

          {/* Fallback solid color background if the image fails */}
          {bgImgError && (
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600"></div>
          )}

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 p-4">
            {/* Header Text - Centered */}
            <div className="text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-[#003049]" style={{ textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)' }}>
                Hi, Bumairah!
              </h3>
              <p className="text-black text-sm md:text-base w-full sm:w-[80%] md:w-[60%]">
                You're all set to invest but you've yet to complete your CKA and CAR.
              </p>
            </div>

            {/* Steps Container */}
            <div className="mt-8 pl-4">
              {/* Step 1 - CKA not Completed */}
              <div className="text-left flex items-start w-full mb-6">
                <div className="text-white flex items-center justify-center font-bold mr-3 md:mr-5 flex-shrink-0 rounded-full bg-[#003049] w-8 h-8 md:w-10 md:h-10 text-base md:text-xl">
                  1.
                </div>
                <div className="flex-1">
                  <span className="font-bold underline text-base md:text-lg text-[#003049]">CKA not Completed</span>
                  <p className="text-black text-sm md:text-base mb-2 text-left">
                    Investment Knowledge not Verified
                  </p>
                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden w-full max-w-[210px]">
                    <div className="h-full rounded-full bg-[#003049]" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>

              {/* Step 2 - CAR not Completed */}
              <div className="text-left flex items-start w-full mb-6">
                <div className="text-white flex items-center justify-center font-bold mr-3 md:mr-5 flex-shrink-0 rounded-full bg-[#003049] w-8 h-8 md:w-10 md:h-10 text-base md:text-xl">
                  2.
                </div>
                <div className="flex-1">
                  <span className="font-bold underline text-base md:text-lg text-[#003049]">CAR not Completed</span>
                  <p className="text-black text-sm md:text-base mb-2 text-left">
                    Risk Profile not Established
                  </p>
                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden w-full max-w-[210px]">
                    <div className="h-full rounded-full bg-[#003049]" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>

              {/* Step 3 - Ready to Invest */}
              <div className="text-left flex items-center w-full">
                <div className="text-white flex items-center justify-center font-bold mr-3 md:mr-5 flex-shrink-0 rounded-full bg-red-700 w-8 h-8 md:w-10 md:h-10 text-base md:text-xl">
                  3.
                </div>
                <div className="flex-1">
                  <span className="font-bold text-base md:text-lg text-[#003049]">Ready to Invest!</span>
                </div>
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

export default SavingsBannerPage;