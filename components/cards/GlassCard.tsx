import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: 'base' | 'highlight' | 'dark';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  variant = 'base',
  style,
  ...props 
}) => {
  const variants = {
    base: 'glass-card',
    highlight: 'bg-gradient-to-br from-brand-primary/20 to-brand-secondary/10 border-brand-primary/30',
    dark: 'bg-black/40 border-white/5',
  };

  return (
    <div 
      onClick={onClick}
      className={`${variants[variant]} backdrop-blur-xl rounded-2xl border transition-all duration-300 ${onClick ? 'cursor-pointer active:scale-[0.98] hover:shadow-glass-hover' : ''} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};