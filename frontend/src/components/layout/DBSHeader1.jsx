import React from 'react';

const DBSHeader = ({ balanceVisible, toggleBalance, onLogout }) => {
  return (
    <div className="relative text-white p-4 bg-dbs-red font-dbs">
      {/* Header content with higher z-index to appear above mountain background */}
      <div className="flex justify-between items-center relative z-20">
       
        {/* Left side - Notification and Eye icons */}
        <div className="flex items-center gap-3">
          {/* Notification Bell with red dot */}
          <div className="relative">
            <img
              src="/assets/notification-bell.png"
              alt="Notifications"
              className="w-5 h-5 drop-shadow-sm"
            />
            {/* Red notification dot using custom DBS red */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-dbs-red-light rounded-full border border-white"></div>
          </div>
         
          {/* Eye toggle for balance visibility */}
          <button
            onClick={toggleBalance}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <img
              src={balanceVisible ? "/assets/eye.png" : "/assets/eye.png"}
              alt={balanceVisible ? "Hide balance" : "Show balance"}
              className="w-5 h-5 drop-shadow-sm"
            />
          </button>
        </div>

        {/* Center - 5 Months pay text */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white drop-shadow-sm font-dbs">5 Months pay</span>
          {/* Small mountain/triangle icon */}
          <div className="flex items-end gap-0.5">
            <div className="w-2 h-3 bg-yellow-400 rounded-sm drop-shadow-sm"></div>
            <div className="w-2 h-4 bg-yellow-500 rounded-sm drop-shadow-sm"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-sm drop-shadow-sm"></div>
          </div>
        </div>

        {/* Right side - Help and Logout */}
        <div className="flex items-center gap-3">
          {/* Help/Question icon */}
          <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors">
            <img
              src="/assets/help-icon.png"
              alt="Help"
              className="w-5 h-5 drop-shadow-sm"
            />
          </button>
         
          {/* LOG OUT button - using custom DBS colors */}
          <button 
            onClick={onLogout}
            className="bg-gray-600 bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DBSHeader;