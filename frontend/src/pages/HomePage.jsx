import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DBSHeader from '../components/layout/DBSHeader';
import InvestmentBannerBTO from '../components/home/InvestmentBannerBTO';
import InvestmentBannerPay from '../components/home/InvestmentBannerPay';
import InvestmentBannerSavings from '../components/home/InvestmentBannerSavings';
import SmartShortcuts from '../components/home/SmartShortcuts';
import AccountsSection from '../components/home/AccountsSection';
import DigiPortfolio from '../components/home/DigiPortfolio';
import BottomNavigation from '../components/layout/BottomNavigation';

const bannerComponents = {
  InvestmentBannerBTO,
  InvestmentBannerPay,
  InvestmentBannerSavings,
};

const HomePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from URL
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [bannerToShow, setBannerToShow] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchTransactionData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/transactions/${userId}`);
        const data = await response.json();
        if (data.banner_to_show) {
          setBannerToShow(data.banner_to_show);
        }
      } catch (error) {
        console.error('Failed to fetch transaction data:', error);
      }
    };

    fetchTransactionData();
  }, [userId]);

  const toggleBalance = () => {
    setBalanceVisible(!balanceVisible);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    console.log('Tab changed to:', tabId);
  };

  const BannerComponent = bannerToShow ? bannerComponents[bannerToShow] : InvestmentBannerSavings; // Default banner

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* Header + Banner Section - Layered */}
      <div className="relative w-full h-80">
        <BannerComponent />
        <div className="absolute top-0 left-0 right-0 w-full z-30">
          <DBSHeader 
            balanceVisible={balanceVisible}
            toggleBalance={toggleBalance}
            onLogout={handleLogout}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-gray-50">
        <SmartShortcuts onNavigate={handleNavigation} />
        <AccountsSection balanceVisible={balanceVisible} />
        <DigiPortfolio />
      </div>
      
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default HomePage; 
