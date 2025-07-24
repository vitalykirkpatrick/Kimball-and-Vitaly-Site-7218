import React from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiCheck } = FiIcons;

const SpamProtection = ({ onVerify, isVerified }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(true);
  };

  if (isVerified) {
    return (
      <div className="flex items-center space-x-2 text-green-600 text-sm">
        <SafeIcon icon={FiCheck} className="w-4 h-4" />
        <span>Verified</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="not-robot"
        onChange={() => onVerify(true)}
        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />
      <label htmlFor="not-robot" className="text-sm text-gray-700">
        I'm not a robot
      </label>
      <SafeIcon icon={FiShield} className="w-4 h-4 text-indigo-500 ml-1" />
    </div>
  );
};

export default SpamProtection;