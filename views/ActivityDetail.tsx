import React, { useState } from 'react';
import { ArrowLeft, Share2, MapPin, Clock, Shield, DollarSign, Users, CheckCircle, Navigation } from 'lucide-react';
import { Activity } from '../types';
import { Button } from '../components/buttons/Button';
import { Badge } from '../components/badges/Badge';
import { GlassCard } from '../components/cards/GlassCard';
import { Modal } from '../components/modals/Modal';

interface ActivityDetailProps {
  activity: Activity;
  onBack: () => void;
}

export const ActivityDetailView: React.FC<ActivityDetailProps> = ({ activity, onBack }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [participantCount, setParticipantCount] = useState(activity.participants.length);

  const handleJoin = async () => {
    setIsJoining(true);
    // Simulate API call duration
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsJoining(false);
    setHasJoined(true);
    setParticipantCount(prev => prev + 1);
    
    // Auto close modal after success animation
    setTimeout(() => {
        setShowConfirm(false);
    }, 1200);
  };

  return (
    <div className="bg-royal-950 min-h-full pb-24 animate-slide-up relative">
      {/* Confetti (Only renders when joined) */}
      {hasJoined && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex justify-center overflow-hidden">
             {Array.from({ length: 20 }).map((_, i) => (
                 <div 
                    key={i} 
                    className="confetti" 
                    style={{ 
                        left: `${Math.random() * 100}%`, 
                        animationDelay: `${Math.random() * 0.5}s`,
                        backgroundColor: ['#6366f1', '#f43f5e', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 4)]
                    }} 
                />
             ))}
        </div>
      )}

      {/* Header Image */}
      <div className="relative h-80 w-full group overflow-hidden">
        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-royal-950" />
        
        {/* Nav */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
          <Button variant="glass" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft size={20} />
          </Button>
          <Button variant="glass" size="icon" className="rounded-full">
            <Share2 size={20} />
          </Button>
        </div>
        
        <div className="absolute bottom-0 left-0 p-6 w-full animate-float-up">
            <div className="flex gap-2 mb-3">
                <span className="bg-brand-primary shadow-lg shadow-brand-primary/40 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">{activity.category}</span>
                {activity.safetyLevel === 'High' && <Badge type="safety-high" />}
            </div>
            <h1 className="text-3xl font-bold text-white leading-tight drop-shadow-lg">{activity.title}</h1>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-10 space-y-6 stagger-container">
        {/* Host Card */}
        <GlassCard className="p-4 flex items-center justify-between shadow-glass animate-slide-up stagger-1">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img src={activity.host.avatar} className="w-14 h-14 rounded-full border-2 border-brand-primary" alt="Host" />
                    <div className="absolute -bottom-1 -right-1 bg-brand-primary text-white text-[10px] font-bold px-1.5 rounded-full border border-royal-900">
                        98%
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm flex items-center gap-1">
                        {activity.host.name} 
                        {activity.host.isVerified && <Badge type="verified" className="px-1 py-0.5" />}
                    </h3>
                    <div className="text-xs text-slate-400 mt-1">Super Host • 12 Hosted</div>
                </div>
            </div>
            <Button variant="secondary" size="sm" className="rounded-xl">Message</Button>
        </GlassCard>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up stagger-2">
            <GlassCard variant="base" className="p-4 flex flex-col justify-between h-28 hover:bg-white/5 transition-colors">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wide flex items-center gap-2"><Clock size={14} className="text-brand-secondary"/> Time</div>
                <div className="text-white font-bold text-lg leading-tight">{activity.time.split(',')[0]}<br/><span className="text-sm font-medium text-slate-400">{activity.time.split(',')[1]}</span></div>
            </GlassCard>
            <GlassCard variant="base" className="p-4 flex flex-col justify-between h-28 hover:bg-white/5 transition-colors">
                 <div className="text-slate-400 text-xs font-bold uppercase tracking-wide flex items-center gap-2"><DollarSign size={14} className="text-brand-warm"/> Cost</div>
                 <div className="text-white font-bold text-lg">{activity.cost}</div>
                 <div className="text-[10px] text-slate-500">Per person</div>
            </GlassCard>
        </div>

        <GlassCard className="p-4 animate-slide-up stagger-3">
             <div className="flex justify-between items-center mb-3">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wide flex items-center gap-2"><MapPin size={14} className="text-brand-accent"/> Location</div>
                <span className="text-xs text-brand-primary font-bold">Get Directions</span>
             </div>
             <div className="text-white font-bold text-base mb-2">{activity.location}</div>
             <div className="h-32 rounded-xl bg-slate-800 w-full relative overflow-hidden group cursor-pointer border border-white/10">
                <img src="https://picsum.photos/600/300?grayscale" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg group-hover:scale-110 transition-transform">
                        <Navigation size={20} className="ml-0.5 mt-0.5" />
                    </div>
                </div>
             </div>
        </GlassCard>

        {/* Description */}
        <div className="py-2 animate-slide-up stagger-4">
            <h3 className="text-white font-bold text-lg mb-3">The Plan</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light">{activity.description}</p>
        </div>

        {/* Participants */}
        <div className="animate-slide-up stagger-5">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold text-lg">Who's Going</h3>
                <span className="text-xs text-slate-400 font-medium transition-all duration-300 transform key={participantCount}">
                    {participantCount} / {activity.maxParticipants} spots filled
                </span>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {activity.participants.map(p => (
                    <div key={p.id} className="flex flex-col items-center gap-2 min-w-[64px] animate-pop">
                        <img src={p.avatar} className="w-16 h-16 rounded-full border-2 border-royal-800 p-0.5 bg-gradient-to-tr from-brand-primary to-brand-secondary" alt={p.name} />
                        <span className="text-[10px] font-medium text-slate-300 text-center truncate w-full">{p.name.split(' ')[0]}</span>
                    </div>
                ))}
                
                {hasJoined && (
                    <div className="flex flex-col items-center gap-2 min-w-[64px] animate-pop">
                        <div className="w-16 h-16 rounded-full border-2 border-brand-primary p-0.5 bg-royal-800 flex items-center justify-center">
                             <div className="w-full h-full rounded-full bg-brand-primary/20 flex items-center justify-center text-white font-bold text-xs">
                                 You
                             </div>
                        </div>
                         <span className="text-[10px] font-medium text-brand-primary text-center truncate w-full">Me</span>
                    </div>
                )}

                 {Array.from({ length: activity.maxParticipants - participantCount }).map((_, i) => (
                     <div key={i} className="flex flex-col items-center gap-2 min-w-[64px]">
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center bg-white/5">
                            <Users size={24} className="text-slate-600" />
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">Open</span>
                    </div>
                 ))}
            </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-royal-950 via-royal-950 to-transparent z-40 max-w-md mx-auto">
        {hasJoined ? (
            <div className="w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 animate-pop">
                <CheckCircle size={20} /> You're on the list!
            </div>
        ) : (
            <Button fullWidth size="lg" onClick={() => setShowConfirm(true)} className="shadow-neon">Request to Join</Button>
        )}
      </div>

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Join Activity" variant="bottom-sheet">
        <div className="space-y-4">
            <p className="text-sm text-slate-300 text-center mb-4">
                You are about to join <strong>{activity.title}</strong>. 
                Please ensure you can arrive by {activity.time}.
            </p>
            <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-4 flex gap-3 items-start animate-pulse-slow">
                <Shield size={20} className="text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-white text-sm font-bold">Safety First</h4>
                    <p className="text-xs text-slate-400 mt-1">This group has a High Safety Score. Please respect the community guidelines.</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <Button variant="ghost" onClick={() => setShowConfirm(false)}>Cancel</Button>
                <Button 
                    onClick={handleJoin} 
                    isLoading={isJoining}
                    isSuccess={hasJoined}
                    className={hasJoined ? "bg-emerald-500 border-emerald-500" : ""}
                >
                    {hasJoined ? "Confirmed" : "Confirm Join"}
                </Button>
            </div>
        </div>
      </Modal>
    </div>
  );
};