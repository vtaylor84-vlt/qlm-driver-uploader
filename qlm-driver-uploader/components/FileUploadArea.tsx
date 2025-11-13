// components/FileUploadArea.tsx
import React, { useState, useRef, useCallback } from 'react';
import { FileItem, Company } from '../types';
import { getFilePreview, isDuplicateFile } from '../utils/fileUtils';

interface FileUploadAreaProps {
  title: string;
  accept: string;
  files: FileItem[];
  setFiles: (files: FileItem[]) => void;
  type: 'bol' | 'freight';
  company: Company;
  addToast: (toast: any) => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  title,
  accept,
  files,
  setFiles,
  type,
  company,
  addToast,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: File[]) => {
    const processed: FileItem[] = [];
    
    for (const file of newFiles) {
      if (isDuplicateFile(file, files)) {
        addToast({
          type: 'warning',
          message: `"${file.name}" is already selected.`,
          duration: 3000,
        });
        continue;
      }

      processed.push({
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: getFilePreview(file),
        type: type === 'bol' ? (file.type.includes('pdf') ? 'pdf' : 'image') : file.type.startsWith('video/') ? 'video' : 'image',
      });
    }

    setFiles([...files, ...processed]);
  }, [files, setFiles, addToast]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const reorderFiles = (dragIndex: number, dropIndex: number) => {
    const dragged = files[dragIndex];
    const newFiles = files.filter((_, i) => i !== dragIndex);
    newFiles.splice(dropIndex, 0, dragged);
    setFiles(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-200">{title}</h3>
        {type === 'bol' && files.length > 0 && (
          <select className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">
            <option>Pick Up</option>
            <option>Delivery</option>
          </select>
        )}
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${
          isDragging
            ? 'border-cyan-500 bg-cyan-500/10'
            : 'border-slate-700 hover:border-slate-600'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={handleInputChange}
          capture={accept.includes('image') ? 'environment' : undefined}
        />
        
        <div className="text-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-medium text-white hover:from-cyan-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
          >
            Choose Files or Tap to Use Camera
          </button>
          <p className="mt-2 text-sm text-slate-400">
            Supports {accept.replace(/[*]/g, '').replace(/[,]/g, ', ')}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {files.map((file, index) => (
            <div
              key={file.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('index', index.toString());
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const dragIndex = parseInt(e.dataTransfer.getData('index'));
                reorderFiles(dragIndex, index);
              }}
              className="relative group cursor-move"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                {file.preview ? (
                  <img src={file.preview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-2xl">📄</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="text-white text-xs">×</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};