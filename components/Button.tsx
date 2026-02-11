import React, { useState, useRef } from 'react';
import { Check } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  isSuccess?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading,
  isSuccess,
  className = '',
  fullWidth = false,
  onClick,
  ...props 
}) => {
  const [ripples, setRipples] = useState<{x: number, y: number, id: number}[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || isSuccess || props.disabled) return;

    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);

    if (onClick) onClick(e);
  };

  const baseStyles = "relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 rounded-2xl overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 border border-transparent",
    secondary: "bg-white text-royal-900 hover:bg-slate-100 shadow-lg shadow-white/10",
    glass: "glass-panel text-white hover:bg-white/10 hover:border-white/30",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
    danger: "bg-brand-accent/10 text-brand-accent border border-brand-accent/20 hover:bg-brand-accent/20",
    icon: "glass-panel text-white hover:bg-white/10 hover:border-white/30 rounded-full",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-sm",
    lg: "px-8 py-4 text-base",
    icon: "p-3",
  };

  const widthClass = fullWidth && !isLoading && !isSuccess ? 'w-full' : '';
  
  // Logic to handle button morphing into a circle/spinner or checkmark
  const morphClass = (isLoading || isSuccess) ? 'w-[3.5rem] px-0 !rounded-full' : widthClass;

  return (
    <button 
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${morphClass} ${className}`} 
      disabled={isLoading || isSuccess || props.disabled}
      onClick={createRipple}
      {...props}
    >
      {/* Ripple Effect Layer */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: '10px',
            height: '10px',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Content Layer */}
      <div className="flex items-center justify-center transition-all duration-300">
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
        ) : isSuccess ? (
          <Check size={20} className="text-white animate-pop" strokeWidth={3} />
        ) : (
          children
        )}
      </div>
    </button>
  );
};