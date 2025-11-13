// hooks/useGemini.ts
import { useState } from 'react';
import { generateGeminiDescription } from '../services/geminiService';

export const useGemini = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDescription = async (files: File[]) => {
    setIsGenerating(true);
    try {
      return await generateGeminiDescription(files);
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateDescription, isGenerating };
};