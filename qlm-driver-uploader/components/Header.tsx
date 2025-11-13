// components/Header.tsx
import React from 'react';
import { GreenleafLogo } from './GreenleafLogo';
import { BstLogo } from './BstLogo';
import { Company } from '../types';

interface HeaderProps {
  company: Company | '';
}

export const Header: React.FC<HeaderProps> = ({ company }) => {
  if (!company) {
    return (
      <header className="text-center py-6">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          QLM Driver Upload
        </h1>
      </header>
    );
  }

  return company === 'Greenleaf Xpress' ? <GreenleafLogo /> : <BstLogo />;
};