// hooks/useUploader.ts
import { useState } from 'react';
import { uploadToBackend } from '../services/uploadService';

export const useUploader = () => {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (submission: any) => {
    setIsUploading(true);
    try {
      await uploadToBackend(submission);
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
};