import React, { useState } from 'react';
import { FaBell, FaEye, FaQuestionCircle, FaTrash, FaPlusCircle, FaPencilAlt } from 'react-icons/fa';
import BottomNavigation from '../components/layout/BottomNavigation';


const InsightsPage = () => {
  const [categories, setCategories] = useState([
    { name: 'Food', amount: '100.00', isEditing: false },
    { name: 'Entertainment', amount: '60.00', isEditing: false },
    { name: 'Shopping', amount: '50.00', isEditing: false },
    { name: 'Transportation', amount: '50.00', isEditing: false },
    { name: 'Miscellaneous', amount: '50.00', isEditing: false },
  ]);

  const handleNameChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].name = value;
    setCategories(newCategories);
  };

  const toggleEdit = (index) => {
    const newCategories = [...categories];
    newCategories[index].isEditing = !newCategories[index].isEditing;
    setCategories(newCategories);
  };

  const handleAmountChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].amount = value;
    setCategories(newCategories);
  };

  const removeCategory = (index) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
  };

  const addCategory = () => {
    const newCategory = { name: 'New Category', amount: '0.00', isEditing: true };
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <FaBell className="text-gray-600" size={20} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">15</span>
                </div>
                <FaEye className="text-gray-600" size={20} />
            </div>
            <div className="flex items-center space-x-4">
                <FaQuestionCircle className="text-gray-600" size={20} />
                <button className="border border-red-500 text-red-500 px-4 py-1 rounded-full text-sm font-semibold">LOG OUT</button>
            </div>
      </header>

      <main className="p-4 pb-32">
        <h1 className="text-gray-500 text-sm mb-4">Your monthly budget</h1>

        {/* Budget Categories */}
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                {category.isEditing ? (
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    onBlur={() => toggleEdit(index)}
                    autoFocus
                    className="font-semibold text-gray-800 text-lg bg-transparent border-b border-gray-400 focus:outline-none"
                  />
                ) : (
                  <h2 className="font-semibold text-gray-800 text-lg">{category.name}</h2>
                )}
                <div className="flex items-center space-x-3">
                  <button onClick={() => toggleEdit(index)}>
                    <FaPencilAlt className="text-gray-400" />
                  </button>
                  <button onClick={() => removeCategory(index)}>
                    <FaTrash className="text-gray-400" />
                  </button>
                </div>
              </div>
              <hr className="my-4" />
              <input
                type="text"
                value={`SGD ${category.amount}`}
                onChange={(e) => handleAmountChange(index, e.target.value.replace('SGD ', ''))}
                className="w-full p-6 text-lg border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center">
            <button onClick={addCategory} className="flex items-center justify-center w-full max-w-xs bg-white border border-gray-400 text-black px-6 py-3 rounded-md">
                <FaPlusCircle className="mr-2 text-gray-500" /> Add categories
            </button>
            <button className="mt-6 w-full max-w-xs bg-teal-200 text-black px-6 py-3 rounded-full shadow-md font-bold">
                Optimize budget
            </button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default InsightsPage;