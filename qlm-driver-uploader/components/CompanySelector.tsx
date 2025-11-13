// components/CompanySelector.tsx
import React from 'react';
import { COMPANIES } from '../constants';
import { Company } from '../types';

interface CompanySelectorProps {
  company: Company | '';
  onChange: (company: Company | '') => void;
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({ company, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">Company</label>
      <select
        value={company}
        onChange={(e) => onChange(e.target.value as Company | '')}
        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 glow-focus focus:border-cyan-500 focus:ring-cyan-500 transition-all duration-200"
      >
        <option value="">Select Company</option>
        {COMPANIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
};