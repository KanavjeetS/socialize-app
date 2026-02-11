import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Activity } from '../../types';
import { GlassCard } from './GlassCard';
import { Badge } from '../badges/Badge';

interface ActivityCardProps {
  activity: Activity;
  onClick: () => void;
  variant?: 'compact' | 'full';
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick, variant = 'full' }) => {
  return (
    <GlassCard 
      onClick={onClick}
      className={`relative overflow-hidden group ${variant === 'compact' ? 'w-72 flex-shrink-0' : 'w-full mb-6'}`}
    >
      {/* Image Section */}
      <div className={`relative ${variant === 'compact' ? 'h-40' : 'h-52'} overflow-hidden`}>
        <img 
          src={activity.image} 
          alt={activity.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-950 via-transparent to-transparent opacity-90" />
        
        <div className="absolute top-3 left-3 flex gap-2">
            <span className="glass-panel px-3 py-1 rounded-lg text-xs font-bold text-white shadow-lg backdrop-blur-md">
                {activity.category}
            </span>
        </div>
        
        <div className="absolute top-3 right-3">
             {activity.safetyLevel === 'High' && <Badge type="safety-high" />}
             {activity.safetyLevel === 'Medium' && <Badge type="safety-medium" />}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className={`font-bold text-white leading-tight mb-3 ${variant === 'compact' ? 'text-base truncate' : 'text-xl'}`}>
          {activity.title}
        </h3>

        <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2 text-slate-300 text-xs">
                <Clock size={14} className="text-brand-secondary" />
                <span className="font-medium">{activity.time}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-xs">
                <MapPin size={14} className="text-brand-accent" />
                <span className="truncate max-w-[200px] font-medium">{activity.location}</span>
                <span className="text-slate-500">• {activity.distance}</span>
            </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-white/5">
            <div className="flex -space-x-3">
                {activity.participants.slice(0, 3).map((p, i) => (
                    <img 
                        key={i} 
                        src={p.avatar} 
                        className="w-8 h-8 rounded-full border-2 border-royal-900" 
                        alt={p.name} 
                    />
                ))}
                 {activity.participants.length > 3 && (
                    <div className="w-8 h-8 rounded-full border-2 border-royal-900 bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
                        +{activity.participants.length - 3}
                    </div>
                 )}
            </div>
            
            <div className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-3 py-1.5 rounded-lg">
                {activity.cost}
            </div>
        </div>
      </div>
    </GlassCard>
  );
};