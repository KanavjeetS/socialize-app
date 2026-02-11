import React, { useState } from 'react';
import { ArrowLeft, Share2, MapPin, Clock, Shield, DollarSign, Users, CheckCircle, Navigation, X } from 'lucide-react';
import { Activity } from '../../types';
import { Button } from '../buttons/Button';
import { Badge } from '../badges/Badge';
import { GlassCard } from '../cards/GlassCard';

interface ActivityDetailModalProps {
  activity: Activity;
  onClose: () => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({ activity, onClose }) => {
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [participantCount, setParticipantCount] = useState(activity.participants.length);

  const handleJoin = async () => {
    setIsJoining(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsJoining(false);
    setHasJoined(true);
    setParticipantCount(prev => prev + 1);
  };

  // Select video based on category or default
  const getVideoSrc = () => {
      // Using generic placeholder videos
      if (activity.category === 'Sports') return 'https://assets.mixkit.co/videos/preview/mixkit-playing-tennis-on-a-clay-court-2044-large.mp4';
      if (activity.category === 'Nightlife') return 'https://assets.mixkit.co/videos/preview/mixkit-people-dancing-at-a-concert-4639-large.mp4';
      if (activity.category === 'Cafe') return 'https://assets.mixkit.co/videos/preview/mixkit-coffee-beans-falling-in-a-glass-jar-4950-large.mp4';
      return 'https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-partying-happily-4640-large.mp4';
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
       {/* Backdrop with 80% Blur Effect */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-royal-950/90 rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-pop flex flex-col max-h-[85vh]">
        
        {/* Video Background Header */}
        <div className="relative h-64 w-full shrink-0 group">
             <video 
                src={getVideoSrc()} 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-royal-950/95" />
             
             <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
             >
                <X size={20} />
             </button>

             <div className="absolute bottom-4 left-6 right-6">
                <div className="flex gap-2 mb-2">
                    <Badge type={activity.safetyLevel === 'High' ? 'safety-high' : 'safety-medium'} />
                    <span className="glass-panel px-2 py-0.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">{activity.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-white leading-tight">{activity.title}</h2>
             </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            
            {/* Host Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={activity.host.avatar} className="w-12 h-12 rounded-full border-2 border-brand-primary" alt="Host" />
                    <div>
                        <div className="flex items-center gap-1">
                            <span className="text-white font-bold text-sm">{activity.host.name}</span>
                            {activity.host.isVerified && <CheckCircle size={14} className="text-blue-400" />}
                        </div>
                        <span className="text-xs text-slate-400">Super Host</span>
                    </div>
                </div>
                <div className="text-right">
                     <div className="text-xl font-bold text-brand-primary">{activity.cost}</div>
                     <div className="text-[10px] text-slate-500">per person</div>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3">
                <GlassCard variant="base" className="p-3 flex items-center gap-3">
                    <Clock size={18} className="text-brand-secondary" />
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Time</div>
                        <div className="text-xs text-white font-bold">{activity.time.split(',')[0]}</div>
                    </div>
                </GlassCard>
                <GlassCard variant="base" className="p-3 flex items-center gap-3">
                    <MapPin size={18} className="text-brand-accent" />
                    <div className="overflow-hidden">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Location</div>
                        <div className="text-xs text-white font-bold truncate">{activity.location}</div>
                    </div>
                </GlassCard>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-sm font-bold text-white mb-2">About the Event</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                    {activity.description}
                </p>
            </div>

            {/* Participants */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-white">Who's Going ({participantCount}/{activity.maxParticipants})</h3>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {activity.participants.map(p => (
                        <img key={p.id} src={p.avatar} className="w-10 h-10 rounded-full border border-white/10" alt={p.name} />
                    ))}
                    {hasJoined && (
                         <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary text-[10px] text-brand-primary font-bold">You</div>
                    )}
                    {Array.from({ length: activity.maxParticipants - participantCount }).map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border border-dashed border-slate-600 flex items-center justify-center">
                            <Users size={16} className="text-slate-600" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-white/5 bg-royal-950/50 backdrop-blur-md">
            {hasJoined ? (
                <div className="w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-3 rounded-xl flex items-center justify-center gap-2 animate-pop">
                    <CheckCircle size={18} /> You're on the list!
                </div>
            ) : (
                <Button fullWidth onClick={handleJoin} isLoading={isJoining}>
                    Join Activity
                </Button>
            )}
        </div>

      </div>
    </div>
  );
};