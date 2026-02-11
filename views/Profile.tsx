import React, { useEffect, useState } from 'react';
import { ShieldCheck, Star, Zap, Settings, LogOut, Award, ChevronRight, Lock, Sparkles, Plus, Camera } from 'lucide-react';
import { CURRENT_USER, ACHIEVEMENTS } from '../constants';
import { Button } from '../components/buttons/Button';
import { GlassCard } from '../components/cards/GlassCard';
import { Badge } from '../components/badges/Badge';
import { Achievement, ViewState } from '../types';
import { Modal } from '../components/modals/Modal';

interface ProfileProps {
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileProps> = ({ onNavigate, onLogout }) => {
  const [trustScoreAnim, setTrustScoreAnim] = useState(0);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [equippedBadge, setEquippedBadge] = useState<Achievement | undefined>(CURRENT_USER.equippedBadge);

  useEffect(() => {
    const timer = setTimeout(() => {
        setTrustScoreAnim(CURRENT_USER.trustScore);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEquipBadge = (badge: Achievement) => {
    if (badge.unlocked) {
        setEquippedBadge(badge);
        setShowBadgeModal(false);
    }
  };

  return (
    <div className="pb-24 animate-fade-in bg-royal-950 min-h-full">
        {/* Banner Section */}
        <div className="h-52 relative group overflow-hidden">
            {/* Custom Banner Image */}
            {CURRENT_USER.banner ? (
                <img 
                    src={CURRENT_USER.banner} 
                    alt="Profile Banner" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-primary via-royal-800 to-royal-950 relative">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                </div>
            )}
            
            {/* Gradient Overlay for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-royal-950/90"></div>

            {/* Edit Banner Button (Visible on Hover) */}
            <button className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 hover:scale-105">
                <Camera size={18} />
                <span className="sr-only">Edit Banner</span>
            </button>

            {/* Settings Button */}
            <div className="absolute top-4 right-4 z-20">
                <Button 
                    variant="glass" 
                    size="icon" 
                    className="rounded-full animate-pop hover:bg-black/40 border-white/10"
                    onClick={() => onNavigate('SETTINGS')}
                >
                    <Settings size={20} />
                </Button>
            </div>
        </div>

        <div className="px-5 -mt-24 relative z-10">
            <div className="flex flex-col items-center">
                {/* Profile Image with Interactive Badge Slot */}
                <div className="relative mb-4 animate-pop delay-100 group">
                    <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-brand-primary via-white to-brand-secondary shadow-2xl relative z-10">
                        <img 
                            src={CURRENT_USER.avatar} 
                            alt="Profile" 
                            className="w-full h-full rounded-full border-4 border-royal-900 object-cover bg-royal-900"
                        />
                    </div>
                    
                    {/* EQUIPPED BADGE SLOT */}
                    <button
                        onClick={() => setShowBadgeModal(true)}
                        className="absolute bottom-1 right-1 w-12 h-12 bg-royal-900 rounded-full border-4 border-royal-950 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all z-20 overflow-hidden"
                    >
                        {equippedBadge ? (
                            <div className={`w-full h-full bg-gradient-to-br ${equippedBadge.gradient} flex items-center justify-center text-xl`}>
                                {equippedBadge.emoji}
                            </div>
                        ) : (
                             <div className="w-full h-full bg-white/10 flex items-center justify-center text-slate-400">
                                <Plus size={20} />
                             </div>
                        )}
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-full pointer-events-none"></div>
                    </button>
                    
                    {/* Badge Tooltip hint */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white bg-black/50 backdrop-blur-md px-2 py-1 rounded-full pointer-events-none whitespace-nowrap">
                        Change Badge
                    </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2 animate-slide-up stagger-1">
                    {CURRENT_USER.name}
                </h2>
                <div className="flex gap-2 mb-6 animate-slide-up stagger-2">
                    <Badge type="verified" />
                    <Badge type="host" />
                </div>

                {/* Trust Meter Card */}
                <GlassCard className="w-full p-6 mb-6 border-brand-primary/30 relative overflow-hidden animate-slide-up stagger-3">
                    <div className="absolute -right-10 -top-10 bg-brand-primary/20 w-40 h-40 rounded-full blur-3xl animate-pulse-slow"></div>
                    
                    <div className="flex justify-between items-end mb-4 relative z-10">
                        <div>
                            <h3 className="text-slate-300 text-xs font-bold uppercase tracking-wide mb-1">Trust Score</h3>
                            <div className="text-3xl font-bold text-white tracking-tight">{trustScoreAnim}<span className="text-lg text-slate-500 font-medium">/100</span></div>
                        </div>
                        <div className="text-right">
                             <div className="text-brand-secondary font-bold text-sm">Excellent</div>
                             <div className="text-[10px] text-slate-500">Top 5% of community</div>
                        </div>
                    </div>
                    
                    <div className="w-full h-4 bg-royal-900/50 rounded-full overflow-hidden border border-white/5 relative z-10">
                        <div 
                            className="h-full bg-gradient-to-r from-brand-secondary to-brand-primary shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000 ease-out" 
                            style={{ width: `${trustScoreAnim}%` }}
                        />
                    </div>
                </GlassCard>

                {/* ACHIEVEMENTS / BADGES SECTION */}
                <div className="w-full mb-8 animate-slide-up stagger-4">
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h3 className="text-white font-bold text-sm flex items-center gap-2">
                            <Award size={16} className="text-brand-warm" /> Achievements
                        </h3>
                        <button 
                            onClick={() => setShowBadgeModal(true)} 
                            className="text-xs text-brand-primary font-bold hover:text-white transition-colors"
                        >
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {ACHIEVEMENTS.slice(0, 4).map((badge) => (
                            <div 
                                key={badge.id}
                                onClick={() => handleEquipBadge(badge)}
                                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 group relative overflow-hidden ${badge.unlocked ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-white/5 opacity-50 border border-dashed border-white/10'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg relative ${badge.unlocked ? `bg-gradient-to-br ${badge.gradient}` : 'bg-slate-700'}`}>
                                    {badge.unlocked ? badge.emoji : <Lock size={14} className="text-slate-400" />}
                                    
                                    {/* Equipped Indicator */}
                                    {equippedBadge?.id === badge.id && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary rounded-full border-2 border-royal-900 flex items-center justify-center">
                                            <Zap size={8} className="text-white fill-white" />
                                        </div>
                                    )}
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 text-center px-1 truncate w-full">{badge.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 w-full mb-8 animate-slide-up stagger-5">
                    <GlassCard variant="base" className="p-4 flex flex-col items-center justify-center gap-1 hover:bg-white/5 transition-colors">
                        <span className="text-2xl font-bold text-white">24</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Joined</span>
                    </GlassCard>
                    <GlassCard variant="base" className="p-4 flex flex-col items-center justify-center gap-1 hover:bg-white/5 transition-colors">
                        <span className="text-2xl font-bold text-white">8</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hosted</span>
                    </GlassCard>
                    <GlassCard variant="base" className="p-4 flex flex-col items-center justify-center gap-1 hover:bg-white/5 transition-colors">
                        <span className="text-2xl font-bold text-white">4.9</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rating</span>
                    </GlassCard>
                </div>
                
                {/* Menu Options */}
                <div className="w-full space-y-3 mb-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
                     {[
                        { label: 'Account Settings', action: () => onNavigate('SETTINGS') },
                        { label: 'Safety Center', action: () => {} },
                        { label: 'Premium Plan', action: () => {} },
                        { label: 'Help & Support', action: () => {} }
                     ].map((item) => (
                         <GlassCard 
                            key={item.label} 
                            onClick={item.action}
                            className="p-4 flex justify-between items-center group cursor-pointer hover:bg-white/5 transition-all"
                         >
                            <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{item.label}</span>
                            <ChevronRight size={16} className="text-slate-500 group-hover:text-white transition-colors group-hover:translate-x-1" />
                         </GlassCard>
                     ))}
                </div>

                <Button 
                    variant="danger" 
                    className="w-full mb-4 flex items-center gap-2 animate-slide-up" 
                    style={{ animationDelay: '400ms' }}
                    onClick={onLogout}
                >
                    <LogOut size={16} /> Log Out
                </Button>
                
                <p className="text-[10px] text-slate-600 pb-4">Version 1.2.0 • Majestic Build</p>
            </div>
        </div>

        {/* BADGE COLLECTION MODAL */}
        <Modal 
            isOpen={showBadgeModal} 
            onClose={() => setShowBadgeModal(false)} 
            title="Badge Collection" 
            variant="bottom-sheet"
        >
            <div className="pb-8">
                <div className="bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 p-4 rounded-xl border border-white/10 mb-6 flex items-start gap-4">
                     <div className="w-16 h-16 rounded-full bg-royal-900 border-2 border-dashed border-brand-primary/50 flex items-center justify-center shrink-0">
                        {equippedBadge ? (
                            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${equippedBadge.gradient} flex items-center justify-center text-2xl shadow-neon`}>
                                {equippedBadge.emoji}
                            </div>
                        ) : (
                            <Award size={24} className="text-slate-500" />
                        )}
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-sm">Equipped Badge</h4>
                        <p className="text-xs text-slate-400 mt-1 mb-2">This badge appears on your profile picture.</p>
                        {equippedBadge && (
                             <span className="text-[10px] bg-brand-primary text-white px-2 py-0.5 rounded-full font-bold">
                                {equippedBadge.title}
                             </span>
                        )}
                     </div>
                </div>

                <h4 className="text-white font-bold text-sm mb-4">All Achievements</h4>
                <div className="grid grid-cols-2 gap-3">
                    {ACHIEVEMENTS.map((badge) => (
                        <button
                            key={badge.id}
                            onClick={() => handleEquipBadge(badge)}
                            disabled={!badge.unlocked}
                            className={`
                                relative p-3 rounded-xl border text-left transition-all duration-200 group
                                ${equippedBadge?.id === badge.id 
                                    ? 'bg-brand-primary/10 border-brand-primary shadow-[0_0_15px_rgba(249,115,22,0.2)]' 
                                    : badge.unlocked 
                                        ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                                        : 'bg-black/20 border-white/5 opacity-60 cursor-not-allowed'
                                }
                            `}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg ${badge.unlocked ? `bg-gradient-to-br ${badge.gradient}` : 'bg-slate-700'}`}>
                                    {badge.unlocked ? badge.emoji : <Lock size={14} className="text-slate-400" />}
                                </div>
                                {equippedBadge?.id === badge.id && <CheckCircleBadge />}
                            </div>
                            
                            <h5 className={`text-sm font-bold mb-1 ${badge.unlocked ? 'text-white' : 'text-slate-500'}`}>{badge.title}</h5>
                            <p className="text-[10px] text-slate-400 leading-tight">{badge.description}</p>
                            
                            {!badge.unlocked && badge.progress && (
                                <div className="mt-2 w-full bg-royal-950 rounded-full h-1.5 overflow-hidden">
                                    <div className="h-full bg-slate-600 w-1/2"></div>
                                    <div className="text-[9px] text-right text-slate-500 mt-1">{badge.progress}</div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </Modal>
    </div>
  );
};

const CheckCircleBadge = () => (
    <div className="w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-lg animate-pop">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    </div>
);