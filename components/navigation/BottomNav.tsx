import React, { useState } from 'react';
import { Home, Compass, Plus, MessageCircle, User } from 'lucide-react';
import { ViewState } from '../../types';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  hidden?: boolean;
}

export const BottomNav: React.FC<NavigationProps> = ({ currentView, onNavigate, hidden = false }) => {
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleNavClick = (view: ViewState) => {
    setAnimatingId(view);
    onNavigate(view);
    
    // Reset animation state after animation duration
    setTimeout(() => {
      setAnimatingId(null);
    }, 400);
  };

  const navItems = [
    { id: 'HOME', icon: Home, label: 'Home' },
    { id: 'EXPLORE', icon: Compass, label: 'Explore' },
    { id: 'CREATE', icon: Plus, label: 'Create', isFab: true },
    { id: 'CHATS', icon: MessageCircle, label: 'Chats' },
    { id: 'PROFILE', icon: User, label: 'Profile' },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pt-2 px-4 pointer-events-none transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${hidden ? 'translate-y-[200%]' : 'translate-y-0'}`}>
      <div className="rounded-full px-4 py-2 flex items-center shadow-2xl pointer-events-auto bg-royal-950/60 backdrop-blur-xl border border-white/10 max-w-sm w-full justify-between relative overflow-hidden h-16">
        {/* Subtle shine effect on the glass bar */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          const isAnimating = animatingId === item.id;
          
          if (item.isFab) {
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as ViewState)}
                className={`
                  bg-gradient-to-tr from-brand-primary to-brand-secondary 
                  w-10 h-10 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] 
                  text-white flex items-center justify-center
                  z-10 relative transition-transform duration-300 
                  ${isAnimating ? 'animate-bounce-click' : 'hover:scale-105 active:scale-95'}
                `}
              >
                <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-50" />
                <Icon size={20} strokeWidth={2.5} className="relative z-10" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as ViewState)}
              className={`p-2 rounded-full transition-all duration-300 relative group z-10 flex flex-col items-center justify-center ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'} ${isAnimating ? 'animate-bounce-click' : ''}`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={`transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`} />
              
              {isActive && (
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-accent rounded-full animate-fadeIn shadow-[0_0_8px_#f43f5e]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};