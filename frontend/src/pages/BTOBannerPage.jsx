import { PieChart, TrendingUp, Shield, DollarSign, BarChart3, Home, CreditCard, ArrowUpDown, Menu, Bell, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BottomNavigation from '../components/layout/BottomNavigation';
import InvestmentFOMOBanner from '../components/banking/InvestmentFOMOBanner';

function BTOBannerPage() {
  const { userId } = useParams(); // Assuming you get userId from the route
  const [bgImgError, setBgImgError] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState('Income Portfolio');
  const [activeTab, setActiveTab] = useState('invest');
  const [isCKAPopupOpen, setIsCKAPopupOpen] = useState(false);
  const [isCARPopupOpen, setIsCARPopupOpen] = useState(false);

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

  const toggleCKAPopup = () => {
    setIsCKAPopupOpen(!isCKAPopupOpen);
  };

  const toggleCARPopup = () => {
    setIsCARPopupOpen(!isCARPopupOpen);
  };

  const closePopups = () => {
    setIsCKAPopupOpen(false);
    setIsCARPopupOpen(false);
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
        {/* First row - 4 icons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
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
          </div>
        </div>
        
        {/* Second row - check rates below digiPortfolio */}
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center text-center gap-1">
            <img 
              src="/assets/icons/checkrates.svg" 
              alt="Check Rates" 
              className="w-14 h-14"
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
        <div className="bg-white shadow-sm overflow-hidden relative mb-2">
          {/* Income Portfolio Button - Positioned with absolute positioning */}
          <div className="absolute bottom-[8%] left-1/2 transform -translate-x-1/2 z-20">
            <button className="font-bold hover:opacity-90 transition-colors flex items-center justify-center bg-primary-red shadow-lg rounded-full text-white text-sm md:text-base py-2 px-8">
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
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-dark-blue" style={{ textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)' }}>
                Hi, {userId || 'User'}!
              </h3>
              <p className="text-black text-sm md:text-base w-full sm:w-[80%] md:w-[60%]">
                You're all set to invest but you've yet to complete your CKA and CAR.
              </p>
            </div>

            {/* Steps Container */}
            <div className="mt-8 pl-4">
              {/* Step 1 - CKA not Completed */}
              <div className="text-left flex items-start w-full mb-6">
                <div className="text-white flex items-center justify-center font-bold mr-3 md:mr-5 flex-shrink-0 rounded-full bg-dark-blue w-8 h-8 md:w-10 md:h-10 text-base md:text-xl">
                  1.
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold underline text-base md:text-lg text-dark-blue">CKA not Completed</span>
                    <img 
                      src="/assets/icons/help.svg"
                      alt="Help"
                      className="w-4 h-4 cursor-pointer"
                      onClick={toggleCKAPopup}
                      onError={(e) => {
                        console.log('Failed to load help icon, showing fallback');
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'inline';
                      }}
                    />
                    <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 hidden cursor-pointer" onClick={toggleCKAPopup}>?</span>
                  </div>
                  <p className="text-black text-sm md:text-base mb-2 text-left">
                    Investment Knowledge not Verified
                  </p>
                </div>
              </div>

              {/* Step 2 - CAR not Completed */}
              <div className="text-left flex items-start w-full mb-6">
                <div className="text-white flex items-center justify-center font-bold mr-3 md:mr-5 flex-shrink-0 rounded-full bg-dark-blue w-8 h-8 md:w-10 md:h-10 text-base md:text-xl">
                  2.
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold underline text-base md:text-lg text-dark-blue">CAR not Completed</span>
                    <img 
                      src="/assets/icons/help.svg"
                      alt="Help"
                      className="w-4 h-4 cursor-pointer"
                      onClick={toggleCARPopup}
                      onError={(e) => {
                        console.log('Failed to load help icon, showing fallback');
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'inline';
                      }}
                    />
                    <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 hidden cursor-pointer" onClick={toggleCARPopup}>?</span>
                  </div>
                  <p className="text-black text-sm md:text-base mb-2 text-left">
                    Risk Profile not Established
                  </p>
                </div>
              </div>

              {/* Step 3 - Ready to Invest */}
              <div className="text-left flex items-center w-full">
                <div className="text-white flex items-center justify-center font-bold mr-3 md:mr-5 flex-shrink-0 rounded-full bg-primary-red w-8 h-8 md:w-10 md:h-10 text-base md:text-xl">
                  3.
                </div>
                <div className="flex-1">
                  <span className="font-bold text-base md:text-lg text-dark-blue">Ready to Invest!</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        <InvestmentFOMOBanner />

        {/* Popular Section */}
        <div className="mt-8 mb-4">
          <h3 className="text-base font-normal text-gray-600 mb-4 text-left px-4">POPULAR</h3>
        </div>
        
        {/* Fixed Deposit */}
        <div className="bg-white rounded-lg shadow-sm mb-2 p-4 mx-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-light-red-background">
                <div className="w-6 h-6 rounded-full relative bg-secondary-red">
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-secondary-red"></div>
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
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-light-red-background">
                <TrendingUp className="w-6 h-6 text-secondary-red" />
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

      {/* CKA Popup - Moved to root level to avoid z-index conflicts */}
      {isCKAPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4" 
          style={{ 
            zIndex: 999999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }} 
          onClick={closePopups}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 relative border border-gray-100" 
            style={{ 
              zIndex: 1000000,
              position: 'relative'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with DBS red accent */}
            <div className="text-center mb-5 mt-2">
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Customer Knowledge Assessment</h3>
              <p className="text-sm text-gray-600 font-medium">(CKA)</p>
            </div>

            {/* Close button */}
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100" 
              onClick={closePopups}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content sections */}
            <div className="space-y-3 text-center px-4">
              <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-600 mx-2">
                <h4 className="font-semibold text-red-800 mb-1 text-sm">What is CKA?</h4>
                <p className="text-xs text-red-700 leading-relaxed">
                  A mandatory evaluation that helps DBS understand your investment knowledge and experience level.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-600 mx-2">
                <h4 className="font-semibold text-blue-800 mb-1 text-sm">Why is it required?</h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Ensures you have the necessary knowledge to make informed investment decisions and access appropriate products.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-600 mx-2">
                <h4 className="font-semibold text-green-800 mb-1 text-sm">What happens after?</h4>
                <p className="text-xs text-green-700 leading-relaxed">
                  You'll be able to invest in a wider range of products and services tailored to your knowledge level.
                </p>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-3 mb-2 text-center px-6">
              <button 
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={closePopups}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CAR Popup */}
      {isCARPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4" 
          style={{ 
            zIndex: 999999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }} 
          onClick={closePopups}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 relative border border-gray-100" 
            style={{ 
              zIndex: 1000000,
              position: 'relative'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with DBS red accent */}
            <div className="text-center mb-5 mt-2">
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Customer Account Review</h3>
              <p className="text-sm text-gray-600 font-medium">(CAR)</p>
            </div>

            {/* Close button */}
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100" 
              onClick={closePopups}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content sections */}
            <div className="space-y-3 text-center px-4">
              <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-600 mx-2">
                <h4 className="font-semibold text-red-800 mb-1 text-sm">What is CAR?</h4>
                <p className="text-xs text-red-700 leading-relaxed">
                  A comprehensive review to establish your investment risk profile and financial objectives.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-600 mx-2">
                <h4 className="font-semibold text-blue-800 mb-1 text-sm">Why is it important?</h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Helps us recommend suitable investment products that match your risk tolerance and goals.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-600 mx-2">
                <h4 className="font-semibold text-green-800 mb-1 text-sm">What's next?</h4>
                <p className="text-xs text-green-700 leading-relaxed">
                  Once completed, you'll have access to personalized investment recommendations and advisory services.
                </p>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-3 mb-2 text-center px-6">
              <button 
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={closePopups}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default BTOBannerPage;