import React from 'react';
import { ShieldCheck, CheckCircle, Zap, Crown, UserCheck } from 'lucide-react';

export type BadgeType = 'verified' | 'safety-high' | 'safety-medium' | 'host' | 'premium' | 'new';

interface BadgeProps {
  type: BadgeType;
  label?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, label, className = '' }) => {
  const config = {
    verified: {
      icon: CheckCircle,
      style: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      text: 'Verified',
      hasShimmer: false,
    },
    'safety-high': {
      icon: ShieldCheck,
      style: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,153,0.3)]',
      text: 'Safe',
      hasShimmer: false,
    },
    'safety-medium': {
      icon: ShieldCheck,
      style: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      text: 'Moderate',
      hasShimmer: false,
    },
    host: {
      icon: UserCheck,
      style: 'bg-brand-secondary/20 text-brand-secondary border-brand-secondary/30',
      text: 'Host',
      hasShimmer: false,
    },
    premium: {
      icon: Crown,
      style: 'bg-brand-warm/20 text-brand-warm border-brand-warm/30 relative overflow-hidden',
      text: 'Premium',
      hasShimmer: true,
    },
    new: {
      icon: Zap,
      style: 'bg-brand-accent/20 text-brand-accent border-brand-accent/30',
      text: 'New',
      hasShimmer: false,
    }
  };

  const { icon: Icon, style, text, hasShimmer } = config[type];
  const displayText = label || text;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm transition-transform hover:scale-105 ${style} ${className}`}>
      {hasShimmer && (
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />
      )}
      <Icon size={12} strokeWidth={3} className="relative z-10" />
      <span className="relative z-10">{displayText}</span>
    </span>
  );
};