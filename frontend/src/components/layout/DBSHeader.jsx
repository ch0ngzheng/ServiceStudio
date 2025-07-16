import React from 'react';

const DBSHeader = ({ balanceVisible, toggleBalance, onLogout }) => {
  return (
    <div className="relative text-white p-3 bg-dbs-red font-dbs">
      {/* Header content with higher z-index to appear above mountain background */}
      <div className="flex items-center z-20 w-full">
       
        {/* Left side - Notification and Eye icons */}
        <div className="flex items-center gap-3">
          {/* Notification Bell with red dot */}
          <div className="relative">
            <img
              src="/assets/notification-bell1.svg"
              alt="Notifications"
              className="w-6 h-6 drop-shadow-sm"
            />
            {/* Red notification dot using custom DBS red */}
            <div className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-dbs-red-400 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-black">15</span>
            </div>
          </div>
         
          {/* Eye toggle for balance visibility */}
          <button
            onClick={toggleBalance}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <img
              src={balanceVisible ? "/assets/eye.png" : "/assets/eye-off.png"}
              alt={balanceVisible ? "Hide balance" : "Show balance"}
              className={balanceVisible ? "w-6 h-4 drop-shadow-sm" : "w-6 h-5 drop-shadow-sm"}
            />
          </button>
        </div>

        {/* Right side - Help and Logout */}
        <div className="relative flex items-center gap-3 w-full justify-end">
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
            className="bg-gray-500 bg-opacity-20 px-4 py-1 rounded-full text-sm font-medium w-32"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DBSHeader;