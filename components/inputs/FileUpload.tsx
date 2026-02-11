import React, { useRef, useState } from 'react';
import { Upload, Check, X, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, accept = "image/*", onChange, error }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (onChange) onChange(file);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(null);
    if (inputRef.current) inputRef.current.value = '';
    if (onChange) onChange(null);
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide ml-1">{label}</label>
      <div 
        onClick={() => inputRef.current?.click()}
        className={`
          relative w-full h-14 rounded-xl border border-dashed transition-all cursor-pointer flex items-center px-4 gap-3
          ${fileName ? 'bg-brand-primary/10 border-brand-primary/50' : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'}
        `}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${fileName ? 'bg-brand-primary text-white' : 'bg-white/10 text-slate-400'}`}>
           {fileName ? <Check size={16} /> : <Upload size={16} />}
        </div>
        
        <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${fileName ? 'text-brand-primary' : 'text-slate-400'}`}>
                {fileName || 'Upload Document/Photo'}
            </p>
        </div>

        {fileName && (
            <button onClick={handleClear} className="p-1 hover:bg-black/20 rounded-full text-slate-400 hover:text-white">
                <X size={16} />
            </button>
        )}

        <input 
          ref={inputRef}
          type="file" 
          accept={accept}
          onChange={handleFileChange}
          className="hidden" 
        />
      </div>
      {error && <p className="text-brand-accent text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};