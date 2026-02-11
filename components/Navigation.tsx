import React from 'react';
import { Home, Compass, Plus, MessageCircle, User } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'HOME', icon: Home, label: 'Home' },
    { id: 'EXPLORE', icon: Compass, label: 'Explore' },
    { id: 'CREATE', icon: Plus, label: 'Create', isFab: true },
    { id: 'CHATS', icon: MessageCircle, label: 'Chats' },
    { id: 'PROFILE', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pt-2 px-4 pointer-events-none">
      <div className="glass-panel rounded-full px-2 py-2 flex items-center shadow-2xl pointer-events-auto bg-royal-900/80 max-w-sm w-full justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          if (item.isFab) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewState)}
                className="mx-2 -mt-8 bg-gradient-to-tr from-brand-primary to-brand-secondary p-4 rounded-full shadow-lg shadow-brand-primary/40 hover:scale-105 transition-transform active:scale-95 text-white"
              >
                <Icon size={28} strokeWidth={2.5} />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewState)}
              className={`p-3 rounded-full transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-accent rounded-full animate-fadeIn" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};