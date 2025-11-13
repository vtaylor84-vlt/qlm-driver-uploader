// types.ts
export type Company = 'Greenleaf Xpress' | 'BST Expedite';

export interface FileItem {
  id: string;
  file: File;
  preview: string | null;
  type: 'image' | 'video' | 'pdf';
}

export interface Location {
  city: string;
  state: string;
}

export interface Submission {
  id: string;
  company: Company;
  driverName: string;
  loadNumber: string;
  bolNumber: string;
  pickup: Location;
  delivery: Location;
  bolFiles: FileItem[];
  freightFiles: FileItem[];
  description: string;
  timestamp: string;
  status: 'pending' | 'uploading' | 'success' | 'failed';
}