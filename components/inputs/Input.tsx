import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
}

export const Input: React.FC<InputProps> = ({ label, icon, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide ml-1">{label}</label>}
      <div className="relative group">
        {icon && <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors">{icon}</div>}
        <input 
          className={`w-full glass-input rounded-xl ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all duration-200 ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-brand-accent text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({ label, icon, options, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide ml-1">{label}</label>}
      <div className="relative group">
        {icon && <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors">{icon}</div>}
        <select 
          className={`w-full glass-input rounded-xl ${icon ? 'pl-11' : 'pl-4'} pr-8 py-3.5 text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 appearance-none bg-transparent transition-all duration-200 ${className}`}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-royal-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};