import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DBSHeader from '../components/layout/DBSHeader';
import InvestmentBannerBTO from '../components/home/InvestmentBannerBTO';
import InvestmentBannerPay from '../components/home/InvestmentBannerPay';
import InvestmentBannerSavings from '../components/home/InvestmentBannerSavings';
import SmartShortcuts from '../components/home/SmartShortcuts';
import AccountsSection from '../components/home/AccountsSection';
import DigiPortfolio from '../components/home/DigiPortfolio';
import BottomNavigation from '../components/layout/BottomNavigation';

const HomePage1 = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from URL
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

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

  // To test other banners, change the component being rendered below.
  // For example, to test the Pay banner, use <InvestmentBannerPay userId={userId} />
  // To test the Savings banner, use <InvestmentBannerSavings userId={userId} />
  const BannerComponent = <InvestmentBannerBTO userId={userId} />;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* Header + Banner Section - Layered */}
      <div className="relative w-full">
        {/* Banner takes up the full space */}
        {BannerComponent}
        {/* Header is overlaid on top */}
        <div className="absolute inset-0 flex flex-col z-10">
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

export default HomePage1;
