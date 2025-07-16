import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DBSHeader from '../components/layout/DBSHeader1';
import InvestmentBanner from '../components/home/InvestmentBannerSavings';
import SmartShortcuts from '../components/home/SmartShortcuts';
import AccountsSection from '../components/home/AccountsSection';
import DigiPortfolio from '../components/home/DigiPortfolio';
import BottomNavigation from '../components/layout/BottomNavigation';


const HomePage = () => {
  const navigate = useNavigate();
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


  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* Header + Banner Section - Layered */}
      <div className="relative w-full h-80">
        <InvestmentBanner />
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
