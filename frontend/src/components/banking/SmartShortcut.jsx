import React from 'react';

const SmartShortcut = ({ icon: Icon, label, onClick }) => (
  <div 
    className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-all duration-200 active:scale-95"
    onClick={onClick}
  >
    <div className="relative flex items-center justify-center w-12 h-12 mb-2 rounded-lg bg-dbs-red-50">
      <Icon className="w-6 h-6 text-dbs-red-600" />
    </div>
    <span className="text-xs text-center text-gray-700 leading-tight">{label}</span>
  </div>
);

export default SmartShortcut;