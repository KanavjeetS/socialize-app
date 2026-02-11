import React, { useState, useEffect } from 'react';
import { Bell, Search, Filter, Sparkles, MapPin, X, UserPlus, Heart, Zap } from 'lucide-react';
import { ActivityCard } from '../components/cards/ActivityCard';
import { GlassCard } from '../components/cards/GlassCard';
import { Skeleton } from '../components/feedback/Skeleton';
import { ACTIVITIES, CURRENT_USER } from '../constants';
import { Activity, ViewState } from '../types';

interface HomeProps {
  onActivityClick: (activity: Activity) => void;
  onNavigate: (view: ViewState) => void;
}

const MOCK_NOTIFICATIONS = [
  { id: 1, icon: UserPlus, color: 'text-blue-400', title: 'New Join Request', message: 'Sarah wants to join Tennis Doubles', time: '2m ago', unread: true },
  { id: 2, icon: Heart, color: 'text-pink-400', title: 'Vibe Check', message: 'Mike liked your activity vibe', time: '15m ago', unread: true },
  { id: 3, icon: Zap, color: 'text-yellow-400', title: 'Trust Score Up!', message: 'You reached 94 Trust Score', time: '1h ago', unread: false },
  { id: 4, icon: MapPin, color: 'text-emerald-400', title: 'Nearby', message: '3 new activities in Central Park', time: '2h ago', unread: false },
];

export const HomeView: React.FC<HomeProps> = ({ onActivityClick, onNavigate }) => {
  const [filterVerified, setFilterVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simulate initial data load
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const displayedActivities = filterVerified 
    ? ACTIVITIES.filter(a => a.host.isVerified) 
    : ACTIVITIES;

  return (
    <div className="pb-24 pt-4 px-5 space-y-8 animate-fade-in relative">
      
      {/* LIQUID GLASS NOTIFICATION DRAWER OVERLAY */}
      <div 
        className={`fixed inset-0 z-40 bg-royal-950/60 backdrop-blur-md transition-opacity duration-500 ease-in-out ${showNotifications ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowNotifications(false)}
      />

      {/* LIQUID GLASS NOTIFICATION DRAWER */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-80 z-50 transform transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1) ${showNotifications ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full w-full bg-royal-900/40 backdrop-blur-3xl border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col">
            {/* Liquid Reflections */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-50" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Header */}
            <div className="p-6 pt-8 flex justify-between items-center border-b border-white/5 relative z-10">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Notifications</h2>
                    <p className="text-xs text-slate-400">You have 2 unread updates</p>
                </div>
                <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 relative z-10 no-scrollbar">
                {MOCK_NOTIFICATIONS.map((notif, idx) => {
                    const Icon = notif.icon;
                    return (
                        <div 
                            key={notif.id} 
                            className={`p-4 rounded-2xl border transition-all duration-300 flex gap-4 ${notif.unread ? 'bg-white/10 border-white/20 shadow-glass' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                            style={{ animation: showNotifications ? `slideIn 0.4s ease-out ${idx * 0.1}s forwards` : 'none', opacity: 0, transform: 'translateX(20px)' }}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-black/30 shrink-0 ${notif.color}`}>
                                <Icon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm font-bold truncate ${notif.unread ? 'text-white' : 'text-slate-400'}`}>{notif.title}</h4>
                                    <span className="text-[10px] text-slate-500">{notif.time}</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-snug">{notif.message}</p>
                            </div>
                            {notif.unread && (
                                <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 shrink-0 animate-pulse" />
                            )}
                        </div>
                    );
                })}

                <div className="mt-8 text-center">
                    <button className="text-xs text-brand-secondary font-bold hover:text-white transition-colors">View All History</button>
                </div>
            </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
            <MapPin size={12} className="text-brand-primary" />
            <span>New York City</span>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400 tracking-tight">
            SOCIALIZE
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          
          {/* Notification Button */}
          <button 
            onClick={() => setShowNotifications(true)}
            className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300 text-white group active:scale-95"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
            <Bell size={24} strokeWidth={2} className="relative z-10 group-hover:text-brand-primary transition-colors" />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-brand-accent rounded-full border-2 border-royal-900 animate-pulse z-10" />
          </button>
          
          {/* Profile Button */}
          <button 
            onClick={() => onNavigate('PROFILE')}
            className="relative group active:scale-95 transition-transform duration-200"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
            <img 
                src={CURRENT_USER.avatar} 
                alt="Profile" 
                className="relative w-10 h-10 rounded-full border-2 border-white/20 group-hover:border-white/50 shadow-lg object-cover transition-colors" 
            />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group z-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-slate-400 group-focus-within:text-brand-primary transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="What's your vibe today?" 
          className="w-full glass-input rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 shadow-lg transition-all"
        />
        <button 
            onClick={() => setFilterVerified(!filterVerified)}
            className={`absolute inset-y-2 right-2 px-3 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all ${filterVerified ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
        >
            <Filter size={14} /> Verified
        </button>
      </div>

      {/* AI Suggestion Teaser */}
      <GlassCard variant="highlight" className="p-1 border-dashed">
        <div className="bg-royal-900/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
            <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                    <Sparkles size={16} className="text-brand-warm animate-pulse-slow" /> AI Concierge
                </h3>
                <p className="text-xs text-slate-400">Found 3 spontaneous plans for you.</p>
            </div>
            <button className="bg-white text-royal-900 text-xs font-bold px-4 py-2 rounded-lg hover:scale-105 transition-transform">View</button>
        </div>
      </GlassCard>

      {/* Nearby Feed */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h2 className="text-lg font-bold text-white tracking-tight">Happening Nearby</h2>
          <button className="text-xs text-brand-primary font-bold hover:text-brand-secondary transition-colors">View Map</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
          {isLoading ? (
            <>
               <Skeleton width={288} height={320} className="flex-shrink-0" />
               <Skeleton width={288} height={320} className="flex-shrink-0" />
            </>
          ) : (
             displayedActivities.slice(0, 3).map(activity => (
              <ActivityCard 
                  key={activity.id} 
                  activity={activity} 
                  onClick={() => onActivityClick(activity)} 
                  variant="compact" 
              />
            ))
          )}
        </div>
      </div>

      {/* Main Feed */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white px-1">For You</h2>
        {isLoading ? (
            <>
                <Skeleton height={250} className="w-full" />
                <Skeleton height={250} className="w-full" />
            </>
        ) : (
            displayedActivities.map(activity => (
            <ActivityCard 
                key={activity.id} 
                activity={activity} 
                onClick={() => onActivityClick(activity)} 
                variant="full" 
            />
            ))
        )}
      </div>
    </div>
  );
};