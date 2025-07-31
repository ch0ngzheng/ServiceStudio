import React from 'react';

const TransportCardBanner = ({ cashbackAmount = 'XXX' }) => {
  return (
    <div className="p-6 rounded-2xl shadow-md my-4" style={{ background: 'linear-gradient(to bottom right, #FFEFBA, #FFC3A0)' }}>
      <div className="flex justify-between items-center">
        {/* Left Side Content */}
        <div>
          <p className="text-gray-800">Get 5% Cashback with the</p>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            DBS<br />
            Transport<br />
            Card
          </h2>
        </div>

        {/* Right Side Content */}
        <div className="text-right flex flex-col items-end">
          <p className="text-gray-800 mb-4 max-w-xs">
            With your spending, you can get up to <span className="font-bold">${cashbackAmount}</span> Cashback!
          </p>
          <button className="bg-white text-gray-800 font-semibold py-2 px-6 border border-gray-400 rounded-lg shadow hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransportCardBanner;
