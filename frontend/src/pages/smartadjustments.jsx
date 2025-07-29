import { useState } from "react";
import { useParams } from 'react-router-dom';
import BudgetCard from '../components/banking/budgetCard';

const SmartAdjustments = ({ onNavigateToFriend }) => {
  const { userId } = useParams();

  return (
    <div className="bg-gray-100 flex justify-center min-h-screen">
      {/* Mobile Container - iPhone 14 Pro Max */}
      <div 
        className="relative"
        style={{
          width: '430px',
          minHeight: '932px',
          backgroundColor: '#FFFFFF'
        }}
      >
        
        {/* Status Bar */}
        <div 
          className="absolute top-0 left-0 w-full bg-white"
          style={{
            height: '56px'
          }}
        >
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black rounded-full"></div>
          
          <div className="absolute top-[20px] left-[40px]">
            <img 
              src="/assets/icons/leftside.svg" 
              alt="Time 9:41" 
              style={{ width: '28.426px', height: '11.089px' }}
              onError={(e) => { e.target.outerHTML = '<div class="text-black font-medium text-sm">9:41</div>'; }}
            />
          </div>

          <div className="absolute top-[20px] right-[20px]">
            <img 
              src="/assets/icons/rightside.svg" 
              alt="Signal WiFi Battery" 
              style={{ width: '66.661px', height: '11.336px' }}
              onError={(e) => { e.target.outerHTML = '<div class="text-black">📶🔋</div>'; }}
            />
          </div>
        </div>

        {/* SHADOW BELOW NAVIGATION TABS */}
        <div 
          className="absolute"
          style={{
            top: '145px',
            left: '0px',
            width: '430px',
            height: '4px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            zIndex: 1
          }}
        ></div>

        {/* Header Icons */}
        <div className="absolute left-0 bg-white" style={{ top: '56px', width: '430px', height: '36px' }}>
          <div style={{ position: 'absolute', top: '8px', left: '39px' }}>
            <img src="/assets/icons/bell.svg" alt="Bell" style={{ width: '21px', height: '26px' }} />
          </div>
          <div style={{ position: 'absolute', top: '10px', left: '67px' }}>
            <img src="/assets/icons/eye.svg" alt="Eye" style={{ width: '28px', height: '24px' }} />
          </div>
          <div style={{ position: 'absolute', top: '8px', left: '284px' }}>
            <img src="/assets/icons/helpicon.svg" alt="Help" style={{ width: '23px', height: '23px' }} />
          </div>
          <div style={{ position: 'absolute', top: '8px', left: '316px' }}>
            <img src="/assets/icons/logout.svg" alt="Logout" style={{ width: '89px', height: '25px' }} />
          </div>
        </div>

        {/* FIRST RED LINE - ABOVE NAVIGATION */}
        <div className="absolute" style={{
          top: '96px',
          left: '0px', 
          width: '430px',
          height: '1px',
          backgroundColor: '#C91611'
        }}></div>

        {/* Navigation Tabs */}
        <div className="absolute bg-white" style={{ top: '97px', left: '0px', width: '430px', height: '48px' }}>
          <button style={{
            position: 'absolute', top: '11px', left: '60px', width: '150px', height: '26px',
            fontFamily: 'Inter', fontSize: '20px', fontWeight: '500', color: '#979797',
            background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>ACCOUNTS</button>

          <button style={{
            position: 'absolute', top: '11px', left: '250px', width: '120px', height: '26px',
            fontFamily: 'Inter', fontSize: '20px', fontWeight: '500', color: '#000000',
            background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>INSIGHTS</button>
        </div>

        {/* SECOND RED LINE - UNDER INSIGHTS */}
        <div className="absolute" style={{
          top: '145px',
          left: '215px',
          width: '215px', 
          height: '3px',
          backgroundColor: '#C91611'
        }}></div>

        {/* Smart Adjustments Dashboard Container */}
        <div style={{ 
          marginTop: '149px',
          width: '430px', 
          height: 'auto',
          minHeight: '700px',
          position: 'relative'
        }}>
          <div className="p-4">
            <BudgetCard userId={userId} />
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div style={{ 
          width: '430px', 
          height: 'auto'
        }}>
          {/* Bottom Navigation SVG - Using your bottom bar.svg file */}
          <img 
            src="/assets/icons/bottom bar.svg" 
            alt="Bottom Navigation Bar"
            className="w-full"
            style={{ 
              width: '430px', 
              height: 'auto',
              display: 'block'
            }}
            onError={(e) => {
              // Fallback if SVG fails to load - create a simple bottom nav
              e.target.outerHTML = `
                <div style="width: 430px; height: 80px; background-color: #2c3e50; display: flex; align-items: center; justify-content: space-around;">
                  <div style="color: white; text-align: center; font-size: 12px;">
                    <div>🏠</div>
                    <div>Home</div>
                  </div>
                  <div style="color: white; text-align: center; font-size: 12px;">
                    <div>💰</div>
                    <div>Invest</div>
                  </div>
                  <div style="color: white; text-align: center; font-size: 12px;">
                    <div>💳</div>
                    <div>Pay & Transfer</div>
                  </div>
                  <div style="color: white; text-align: center; font-size: 12px;">
                    <div>📊</div>
                    <div>Plan</div>
                  </div>
                  <div style="color: white; text-align: center; font-size: 12px;">
                    <div>⋯</div>
                    <div>More</div>
                  </div>
                </div>
              `;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SmartAdjustments;