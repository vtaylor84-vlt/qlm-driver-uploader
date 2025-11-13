// utils/fileUtils.ts
import { FileItem } from '../types';

export const getFilePreview = (file: File): string | null => {
  if (file.type.startsWith('image/')) {
    return URL.createObjectURL(file);
  }
  if (file.type.startsWith('video/')) {
    return URL.createObjectURL(file);
  }
  return null;
};

export const isDuplicateFile = (file: File, existing: FileItem[]): boolean => {
  return existing.some((item) => {
    return item.file.name === file.name &&
           item.file.size === file.size &&
           item.file.lastModified === file.lastModified;
  });
};