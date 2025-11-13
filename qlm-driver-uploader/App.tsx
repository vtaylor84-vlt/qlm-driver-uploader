// components/SubmitButton.tsx
import React from 'react';
import { Company } from '../types';

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  company: Company | '';
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  disabled,
  isLoading,
  company,
}) => {
  const gradientClass = !company
    ? 'gradient-submit'
    : company === 'Greenleaf Xpress'
    ? 'gradient-submit-green'
    : 'gradient-submit-blue';

  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`px-8 py-4 ${gradientClass} rounded-xl font-orbitron font-bold text-white text-lg shadow-2xl transform transition-all duration-200 hover:scale-105 hover:shadow-${company === 'Greenleaf Xpress' ? 'emerald' : company === 'BST Expedite' ? 'sky' : 'cyan'}-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
      >
        {isLoading ? 'Submitting...' : 'Submit Load'}
      </button>
    </div>
  );
};