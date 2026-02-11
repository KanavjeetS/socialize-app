import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width, 
  height, 
  variant = 'rect' 
}) => {
  const baseStyles = "bg-white/5 animate-pulse rounded-lg overflow-hidden relative";
  const variants = {
    rect: "rounded-2xl",
    circle: "rounded-full",
    text: "rounded-md",
  };

  const style = {
    width: width,
    height: height,
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </div>
  );
};