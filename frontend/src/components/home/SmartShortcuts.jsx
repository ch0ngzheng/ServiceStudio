import React from 'react';
import { Menu, ArrowUpDown, CreditCard, Receipt } from 'lucide-react';
import SmartShortcut from '../banking/SmartShortcut';

const SmartShortcuts = ({ onNavigate }) => {
  const shortcuts = [
    {
      icon: Menu,
      label: "Transaction History",
      action: () => onNavigate('/transactionPage')
    },
    {
      icon: ArrowUpDown,
      label: "Transfer Money",
      action: () => console.log('Transfer Money')
    },
    {
      icon: CreditCard,
      label: "Pay Bills",
      action: () => console.log('Pay Bills')
    },
    {
      icon: Receipt,
      label: "Pay Credit Card Bill",
      action: () => console.log('Pay Credit Card')
    }
  ];

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-medium text-darkest-gray">Smart Shortcuts</h2>
        <div className="w-4 h-4 bg-dbs-red-100 rounded-full flex items-center justify-center">
          <span className="text-xs text-dbs-red-600">?</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {shortcuts.map((shortcut, index) => (
          <SmartShortcut
            key={index}
            icon={shortcut.icon}
            label={shortcut.label}
            onClick={shortcut.action}
          />
        ))}
      </div>
    </div>
  );
};

export default SmartShortcuts;