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
              src={balanceVisible ? "/assets/eye.png" : "/assets/eye-off.png"}
              alt={balanceVisible ? "Hide balance" : "Show balance"}
              className="w-5 h-4 drop-shadow-sm"
            />
          </button>
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
            className="bg-gray-500 bg-opacity-20 justify-end px-4 py-1 rounded-full text-xs font-small w-30"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DBSHeader;