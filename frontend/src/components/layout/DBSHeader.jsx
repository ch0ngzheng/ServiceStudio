import React, { useState } from 'react';

const DBSHeader = ({ balanceVisible, toggleBalance, onLogout }) => {
  // The component is already using Tailwind CSS classes for styling,
  // which is a great way to handle responsiveness.
  // We can adjust classes based on screen size.

  return (
    // Added responsive padding: p-2 for small screens, p-3 for medium and up.
        <div className="relative text-gray-800 p-2 md:p-3 font-dbs">
      <div className="flex items-center z-20 w-full">
        {/* Left side - Notification and Eye icons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Notification Bell with red dot */}
          <div className="relative">
            <img
              src="/assets/notification-bell1.svg"
              alt="Notifications"
              // Responsive size for the icon
              className="w-5 h-5 md:w-6 md:h-6 drop-shadow-sm"
            />
            {/* Red notification dot */}
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
              // Responsive size for the icon
              className={`${balanceVisible ? "w-5 h-3.5 md:w-6 md:h-4" : "w-5 h-4 md:w-6 md:h-5"} drop-shadow-sm`}
            />
          </button>
        </div>

        {/* Right side - Help and Logout */}
        <div className="relative flex items-center gap-2 md:gap-3 w-full justify-end">
          {/* Help/Question icon */}
          <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors">
            <img
              src="/assets/help-icon.png"
              alt="Help"
              // Responsive size for the icon
              className="w-4 h-4 md:w-5 md:h-5 drop-shadow-sm"
            />
          </button>

          {/* LOG OUT button */}
          <button
            onClick={onLogout}
            // Using arbitrary vw units for responsive sizing, with reduced rounding
            className="bg-gray-500 bg-opacity-20 rounded-2xl font-medium flex items-center justify-center h-[3vw] md:h-auto md:py-1 px-[2vw] md:px-4 text-[3vw] md:text-xs"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DBSHeader;