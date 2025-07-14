import React from 'react';

const SmartShortcut = ({ icon: Icon, label, onClick }) => (
  <div 
    className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-all duration-200 active:scale-95"
    onClick={onClick}
  >
    <div className="w-12 h-12 bg-red-50 rounded-lg mb-2"
    style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
      >
      <Icon className="w-6 h-6 text-red-600" style={{ 
          width: '24px', 
          height: '24px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)' 
          }} 
      />
    </div>
    <span className="text-xs text-gray-700 text-center leading-tight">{label}</span>
  </div>
);

export default SmartShortcut;