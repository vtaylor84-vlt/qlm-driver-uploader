// components/GeminiAISection.tsx
import React from 'react';
import { Company } from '../types';

interface GeminiAISectionProps {
  onGenerate: () => void;
  isGenerating: boolean;
  description: string;
  setDescription: (desc: string) => void;
  company: Company;
}

export const GeminiAISection: React.FC<GeminiAISectionProps> = ({
  onGenerate,
  isGenerating,
  description,
  setDescription,
  company,
}) => {
  const gradient = company === 'Greenleaf Xpress'
    ? 'from-emerald-600 to-emerald-500'
    : company === 'BST Expedite'
    ? 'from-sky-600 to-indigo-500'
    : 'from-cyan-600 to-purple-600';

  return (
    <div className="space-y-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-200">AI Description</h3>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`px-4 py-2 bg-gradient-to-r ${gradient} rounded-lg font-medium text-white hover:shadow-lg hover:shadow-${company === 'Greenleaf Xpress' ? 'emerald' : company === 'BST Expedite' ? 'sky' : 'cyan'}-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isGenerating ? 'Generating...' : 'Generate Description'}
        </button>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="AI-generated description will appear here..."
        className="w-full h-32 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 resize-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
      />
    </div>
  );
};