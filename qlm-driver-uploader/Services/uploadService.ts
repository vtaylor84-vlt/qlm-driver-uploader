// services/uploadService.ts
import { Submission } from '../types';

export const uploadToBackend = async (submission: Submission): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log('Uploading submission:', submission);
  
  // Simulate success
  return;
};