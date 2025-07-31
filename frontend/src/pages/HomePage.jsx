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
        const response = await fetch(`http://localhost:3000/api/transactions/${userId}`);
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
    if (tabId === 'invest') {
      navigate(`/invest/${userId}`);
    } else {
      console.log(`Tab changed to: ${tabId}`);
    }
  };

  const BannerComponent = bannerToShow ? bannerComponents[bannerToShow] : InvestmentBannerSavings; // Default banner

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* Header + Banner Section - Layered */}
      <div className="relative w-full">
        {/* Banner takes up the full space */}
        <BannerComponent userId={userId} />
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
        <SmartShortcuts onNavigate={handleNavigation} userId={userId} />
        <AccountsSection balanceVisible={balanceVisible} userId={userId} />
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