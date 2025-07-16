import React from 'react';
import { Eye, EyeOff, Bell, User } from 'lucide-react';

const DBSHeader = ({ balanceVisible, toggleBalance, onLogout, user }) => {
  return (
    <div className="bg-red-600 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        
        {/* Left side - User info and controls */}
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5" />
          <button
            onClick={toggleBalance}
            className="p-1 hover:bg-red-700 rounded"
            title={balanceVisible ? 'Hide balance' : 'Show balance'}
          >
            {balanceVisible ? <Eye className="w-5 h-5 text-white" /> : <EyeOff className="w-5 h-5 text-white" />}
          </button>
        </div>

        {/* Right side - User menu and logout */}
        <div className="flex items-center gap-3">
          {/* User info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-right">
              <p className="text-xs font-medium">
                {user?.name || user?.username || 'User'}
              </p>
              <p className="text-xs text-red-100">
                {user?.email || 'user@dbs.com'}
              </p>
            </div>
          </div>
          
          {/* Logout button */}
          <button 
            onClick={onLogout}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full text-sm font-medium transition-colors"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DBSHeader;