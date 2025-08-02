import React from 'react';

const TransportCardBanner = ({ cashbackAmount = 'XXX' }) => {
  return (
    <div className="p-6 rounded-2xl shadow-md my-4" style={{ background: 'linear-gradient(135deg, #E8E5FF 0%, #FFE4E8 100%)' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          DBS Live Fresh Card
        </h1>
        <p className="text-sm text-gray-700">
          Earn up to <span className="text-purple-600 font-semibold">6% back</span> on all your transport - buses, MRT, and rides.
        </p>
      </div>

      {/* Card Comparison */}
      <div className="flex gap-3 mb-4 justify-center">
        {/* Regular Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 flex-1 max-w-32 text-center">
          <h3 className="text-purple-600 font-semibold text-xs mb-2">Regular Card</h3>
          <div className="text-2xl font-bold text-gray-900 mb-1">$xx</div>
          <p className="text-gray-700 text-xs">after cashback</p>
        </div>

        {/* Live Fresh Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 flex-1 max-w-32 text-center">
          <h3 className="text-purple-600 font-semibold text-xs mb-2">Live Fresh Card</h3>
          <div className="text-2xl font-bold text-gray-900 mb-1">$xx</div>
          <p className="text-gray-700 text-xs">after cashback</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow">
          DBS Live Fresh Card
        </button>
      </div>
    </div>
  );
};

export default TransportCardBanner;
