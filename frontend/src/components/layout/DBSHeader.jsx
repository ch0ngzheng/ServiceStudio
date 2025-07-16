import React from 'react';
import { Eye, EyeOff, Bell, Home } from 'lucide-react';

const DBSHeader = ({ balanceVisible, toggleBalance, onLogout }) => {
  return (
    <div className="bg-red-600 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        
        {/* Empty left side to push content right */}
        <div>
            <Bell className="w-5 h-5" />
          <button
            onClick={toggleBalance}
            className="p-1 hover:bg-red-700 rounded"
          >
            {balanceVisible ? <Eye className="w-5 h-5 text-white" /> : <EyeOff className="w-5 h-5 text-white" />}
          </button>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-3">
          
          
          <button 
            onClick={onLogout}
            className="bg-dbs-red bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DBSHeader;