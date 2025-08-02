import React, { useState } from 'react';

const DBSHeader = ({ balanceVisible, toggleBalance, onLogout }) => {
  return (
    <div className="relative text-gray-800 py-3 px-4 md:px-6 font-dbs">
      {/* Perfect horizontal alignment - all icons at same baseline */}
      <div className="flex items-center justify-between h-8">
        
        {/* Left side - Bell and Eye grouped together */}
        <div className="flex items-center gap-1">
          {/* Notification Bell */}
          <img
            src="/assets/icons/bell.svg"
            alt="Notifications"
            className="w-6 h-6 md:w-7 md:h-7 drop-shadow-sm"
          />
          
          {/* Eye toggle for balance visibility */}
          <button
            onClick={toggleBalance}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <img
              src="/assets/icons/eye.svg"
              alt={balanceVisible ? "Hide balance" : "Show balance"}
              className="w-5 h-4 md:w-6 md:h-5 drop-shadow-sm"
            />
          </button>
        </div>
        
        {/* Right side - Help and Logout */}
        <div className="flex items-center gap-3">
          {/* Help icon */}
          <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors">
            <img
              src="/assets/icons/helpicon.svg"
              alt="Help"
              className="w-5 h-5 md:w-6 md:h-6 drop-shadow-sm"
            />
          </button>
          
          {/* Logout icon - 10x larger */}
          <button
            onClick={onLogout}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <img
              src="/assets/icons/logout.svg"
              alt="Logout"
              className="w-20 h-20 md:w-24 md:h-24 drop-shadow-lg"
            />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default DBSHeader;