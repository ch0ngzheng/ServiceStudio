import React from 'react';
import { Home, CreditCard, ArrowUpDown, PieChart, Menu } from 'lucide-react';

const BottomNavigation = ({ activeTab = 'home', onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'cards', icon: CreditCard, label: 'Cards' },
    { id: 'pay', icon: ArrowUpDown, label: 'Pay & Transfer' },
    { id: 'invest', icon: PieChart, label: 'Invest' },
    { id: 'more', icon: Menu, label: 'More' }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full border-t border-gray-200 bg-dark-blue">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className="flex flex-col items-center py-2 px-3 min-w-0 flex-1"
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-300'}`} />
              <span className={`text-xs mt-1 truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;