import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DBSHeader from '../components/layout/DBSHeader';
import InvestmentBanner from '../components/home/InvestmentBanner';
import SmartShortcuts from '../components/home/SmartShortcuts';
import AccountsSection from '../components/home/AccountsSection';
import DigiPortfolio from '../components/home/DigiPortfolio';
import BottomNavigation from '../components/layout/BottomNavigation';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user data and logout function from auth context
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const toggleBalance = () => {
    setBalanceVisible(!balanceVisible);
  };

  /**
   * Handle user logout
   * Clears authentication data and redirects to login
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    console.log('Tab changed to:', tabId);
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen pb-16">
      {/* Header with Investment Banner inside */}
      <div className="bg-red-600 text-white">
        <DBSHeader 
          balanceVisible={balanceVisible}
          toggleBalance={toggleBalance}
          onLogout={handleLogout}
        />
        <InvestmentBanner />
        
        {/* Last Login Info with user greeting */}
        <div className="px-4 pb-4">
          <p className="text-xs text-red-100 text-left">
            Welcome back, {user?.name || user?.id || 'User'} | Last Login: 09 Jul 2025, 09:43 AM (SG)
          </p>
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