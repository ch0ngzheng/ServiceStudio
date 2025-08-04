import { PieChart, TrendingUp, Shield, DollarSign, BarChart3, Home, CreditCard, ArrowUpDown, Menu, Bell, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavigation from '../components/layout/BottomNavigation';
import InvestmentFOMOBanner from '../components/banking/InvestmentFOMOBanner';

function InvestPage() {
  const navigate = useNavigate();
  const { userId } = useParams(); // get user id from route
  const [bgImgError, setBgImgError] = useState(false);

  const [activeTab, setActiveTab] = useState('invest');
  const [isCKAPopupOpen, setIsCKAPopupOpen] = useState(false);
  const [isCARPopupOpen, setIsCARPopupOpen] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('recommendedProducts');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts)) {
          console.log('Debug: Recommended Products Loaded:', parsedProducts);
          setRecommendedProducts(parsedProducts);
        }
      } catch (error) {
        console.error('Failed to parse recommended products from localStorage', error);
      }
    }
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      navigate(`/homePage/${userId}`);
    } else {
      console.log(`Tab changed to: ${tabId}`);
    }
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
    <div className="min-h-screen bg-light-gray-background">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm border-b border-light-gray">
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
              <Bell className="w-7 h-7 text-light-gray hidden" />
            </div>
          </div>
          
          {/* Centered digiPortfolio title */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold text-darkest-gray">digiPortfolio</h1>
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
            <span className="text-sm text-light-gray hidden">?</span>
          </button>
        </div>
      </div>

      {/* Icon Navigation */}
      <div className="bg-white px-4 py-4 mb-2">
        {/* First row - 4 icons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="flex flex-col items-center text-center gap-1" onClick={() => navigate(`/digiportfolio/${userId}`)}>
            <img 
              src="/assets/icons/digiportfolio.svg" 
              alt="digiPortfolio" 
              className="w-14 h-14 cursor-pointer"
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
      </div>

      {/* Main Content */}
      <div className="pb-20">
        <h2 className="text-base font-normal text-light-gray mb-2 text-left px-4">
          Your personalised Investment Guide
        </h2>

        {/* Investment Guide Card with Mountain Background */}
        <div className="bg-white shadow-sm overflow-hidden relative mb-2">
          {/* Asia ETF Button - Positioned with absolute positioning */}
                                                            <div className="absolute bottom-[6%] left-1/2 transform -translate-x-1/2 z-20 flex flex-row gap-2 mt-4" onClick={() => navigate(`/digiportfolio/${userId}`)}>
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map((product, index) => (
                <button key={index} className="font-bold hover:opacity-90 transition-colors flex items-center justify-center bg-primary-red shadow-lg rounded-full text-white text-sm md:text-base py-2 px-8">
                  {product}
                </button>
              ))
            ) : (
              <button className="font-bold hover:opacity-90 transition-colors flex items-center justify-center bg-primary-red shadow-lg rounded-full text-white text-sm md:text-base py-2 px-8">
                Explore Investments
              </button>
            )}
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
            <div className="absolute inset-0 bg-gradient-to-br from-dbs-yellow-200 via-dbs-yellow-400 to-dbs-yellow-600"></div>
          )}

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 p-4">
            {/* Header Text - Centered */}
            <div className="text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-dbs-navy" style={{ textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)' }}>
                Hi, {userId || 'User'}!
              </h3>
              <p className="text-text-black text-sm md:text-base w-full sm:w-[80%] md:w-[60%]">
                You're all set to invest but you've yet to complete your CKA and CAR.
              </p>
            </div>

            {/* Steps Container */}
            <div className="mt-8 pl-4">
              {/* Step 1 - CKA not Completed */}
              <div className="text-left flex items-start w-full mb-6">
                <div className="text-white flex items-center justify-center font-bold mr-3 md:mr-5 flex-shrink-0 rounded-full bg-dbs-navy w-8 h-8 md:w-10 md:h-10 text-base md:text-xl">
                  1.
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold underline text-base md:text-lg text-dbs-navy">CKA not Completed</span>
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
                    <span className="w-4 h-4 bg-lighter-gray-background rounded-full flex items-center justify-center text-xs font-bold text-medium-gray hidden cursor-pointer" onClick={toggleCKAPopup}>?</span>
                  </div>
                  <p className="text-text-black text-sm md:text-base mb-2 text-left">
                    Investment Knowledge not Verified
                  </p>
                </div>
              </div>

              {/* Step 2 - CAR not Completed */}
              <div className="text-left flex items-start w-full mb-6">
                <div className="text-white flex items-center justify-center font-bold mr-3 md:mr-5 flex-shrink-0 rounded-full bg-dbs-navy w-8 h-8 md:w-10 md:h-10 text-base md:text-xl">
                  2.
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold underline text-base md:text-lg text-dbs-navy">CAR not Completed</span>
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
                    <span className="w-4 h-4 bg-lighter-gray-background rounded-full flex items-center justify-center text-xs font-bold text-medium-gray hidden cursor-pointer" onClick={toggleCARPopup}>?</span>
                  </div>
                  <p className="text-text-black text-sm md:text-base mb-2 text-left">
                    Risk Profile not Established
                  </p>
                </div>
              </div>

              {/* Step 3 - Ready to Invest */}
              <div className="text-left flex items-center w-full">
                <div className="text-white flex items-center justify-center font-bold mr-3 md:mr-5 flex-shrink-0 rounded-full bg-dbs-red-700 w-8 h-8 md:w-10 md:h-10 text-base md:text-xl">
                  3.
                </div>
                <div className="flex-1">
                  <span className="font-bold text-base md:text-lg text-dbs-navy">Ready to Invest!</span>
                  <p className="text-text-black text-sm md:text-base mb-2 text-left">
                    Based on your spending and income, we recommend the following products:
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InvestmentFOMOBanner />

        {/* Popular Section */}
        <div className="mt-8 mb-4">
          <h3 className="text-base font-normal text-light-gray mb-4 text-left px-4">POPULAR</h3>
        </div>
        
        {/* Fixed Deposit */}
        <div className="bg-white rounded-lg shadow-sm mb-2 p-4 mx-4 cursor-pointer" onClick={() => navigate(`/digiportfolio/${userId}`)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-dbs-red-200">
                <div className="w-6 h-6 rounded-full relative bg-dark-red">
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-dark-red"></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-darkest-gray">Fixed Deposit</h4>
                <p className="text-light-gray text-sm">Place a Deposit in currency of your choice.</p>
              </div>
            </div>
            <span className="text-lighter-gray">→</span>
          </div>
        </div>

        {/* Unit Trusts & ETFs */}
        <div className="bg-white rounded-lg shadow-sm p-4 mx-4 cursor-pointer" onClick={() => navigate(`/digiportfolio/${userId}`)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-dbs-red-200">
                <TrendingUp className="w-6 h-6 text-dark-red" />
              </div>
              <div>
                <h4 className="font-semibold text-darkest-gray">ETFs</h4>
                <p className="text-light-gray text-sm">Start investing from just SGD 1,000.</p>
              </div>
            </div>
            <span className="text-lighter-gray">→</span>
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
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 relative border border-border-light-gray" 
            style={{ 
              zIndex: 1000000,
              position: 'relative'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with DBS red accent */}
            <div className="text-center mb-5 mt-2">
              <div className="w-14 h-14 bg-gradient-to-br from-dbs-red-600 to-dbs-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl text-darkest-gray mb-2">Customer Knowledge Assessment</h3>
              <p className="text-sm text-light-gray font-medium">(CKA)</p>
            </div>

            {/* Close button */}
            <button 
              className="absolute top-4 right-4 text-lighter-gray hover:text-light-gray transition-colors p-1 rounded-full hover:bg-lighter-gray-background" 
              onClick={closePopups}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content sections */}
            <div className="space-y-3 text-center px-4">
              <div className="bg-dbs-red-50 rounded-lg p-3 border-l-4 border-dbs-red-600 mx-2">
                <h4 className="font-semibold text-dbs-red-800 mb-1 text-sm">What is CKA?</h4>
                <p className="text-xs text-dbs-red-700 leading-relaxed">
                  A mandatory evaluation that helps DBS understand your investment knowledge and experience level.
                </p>
              </div>

              <div className="bg-dbs-blue-50 rounded-lg p-3 border-l-4 border-dbs-blue-600 mx-2">
                <h4 className="font-semibold text-dbs-blue-800 mb-1 text-sm">Why is it required?</h4>
                <p className="text-xs text-dbs-blue-700 leading-relaxed">
                  Ensures you have the necessary knowledge to make informed investment decisions and access appropriate products.
                </p>
              </div>

              <div className="bg-dbs-green-50 rounded-lg p-3 border-l-4 border-dbs-green-600 mx-2">
                <h4 className="font-semibold text-dbs-green-800 mb-1 text-sm">What happens after?</h4>
                <p className="text-xs text-dbs-green-700 leading-relaxed">
                  You'll be able to invest in a wider range of products and services tailored to your knowledge level.
                </p>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-3 mb-2 text-center px-6">
              <button 
                className="bg-gradient-to-r from-dbs-red-600 to-dbs-red-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:from-dbs-red-700 hover:to-dbs-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
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
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 relative border border-border-light-gray" 
            style={{ 
              zIndex: 1000000,
              position: 'relative'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with DBS red accent */}
            <div className="text-center mb-5 mt-2">
              <div className="w-14 h-14 bg-gradient-to-br from-dbs-red-600 to-dbs-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl text-darkest-gray mb-2">Customer Appropriateness Review</h3>
              <p className="text-sm text-light-gray font-medium">(CAR)</p>
            </div>

            {/* Close button */}
            <button 
              className="absolute top-4 right-4 text-lighter-gray hover:text-light-gray transition-colors p-1 rounded-full hover:bg-lighter-gray-background" 
              onClick={closePopups}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content sections */}
            <div className="space-y-3 text-center px-4">
              <div className="bg-dbs-red-50 rounded-lg p-3 border-l-4 border-dbs-red-600 mx-2">
                <h4 className="font-semibold text-dbs-red-800 mb-1 text-sm">What is CAR?</h4>
                <p className="text-xs text-dbs-red-700 leading-relaxed">
                  A comprehensive assessment of your financial situation, investment goals, and risk tolerance.
                </p>
              </div>

              <div className="bg-dbs-blue-50 rounded-lg p-3 border-l-4 border-dbs-blue-600 mx-2">
                <h4 className="font-semibold text-dbs-blue-800 mb-1 text-sm">Why is it important?</h4>
                <p className="text-xs text-dbs-blue-700 leading-relaxed">
                  Ensures investment recommendations match your financial circumstances and risk profile.
                </p>
              </div>

              <div className="bg-dbs-green-50 rounded-lg p-3 border-l-4 border-dbs-green-600 mx-2">
                <h4 className="font-semibold text-dbs-green-800 mb-1 text-sm">What's included?</h4>
                <p className="text-xs text-dbs-green-700 leading-relaxed">
                  Income review, investment experience, financial goals, and risk appetite assessment.
                </p>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-3 mb-2 text-center px-6">
              <button 
                className="bg-gradient-to-r from-dbs-red-600 to-dbs-red-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:from-dbs-red-700 hover:to-dbs-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={closePopups}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      <BottomNavigation activeTab="invest" onTabChange={handleTabChange} />
    </div>
  );
}

export default InvestPage;