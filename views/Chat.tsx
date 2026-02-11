import React, { useState } from 'react';
import { CHATS } from '../constants';
import { Clock, MessageCircle, Search, MoreVertical, Hash } from 'lucide-react';
import { GlassCard } from '../components/cards/GlassCard';
import { ChatDetail } from '../components/chat/ChatDetail';
import { ChatGroup } from '../types';

interface ChatViewProps {
    onToggleNav?: (visible: boolean) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ onToggleNav }) => {
  const [selectedChat, setSelectedChat] = useState<ChatGroup | null>(null);

  const handleChatSelect = (chat: ChatGroup) => {
    setSelectedChat(chat);
    onToggleNav?.(false);
  };

  const handleBack = () => {
    setSelectedChat(null);
    onToggleNav?.(true);
  };

  if (selectedChat) {
    return <ChatDetail chat={selectedChat} onBack={handleBack} />;
  }

  return (
    <div className="h-full flex flex-col animate-fade-in pt-6">
      {/* Main Header */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white tracking-tight">Messages</h1>
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <Search size={20} />
            </button>
        </div>
        
        {/* Filter Pills */}
        <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-full bg-brand-primary text-white text-xs font-bold shadow-neon">All</button>
            <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-400 text-xs font-bold hover:bg-white/10">Groups</button>
            <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-400 text-xs font-bold hover:bg-white/10">Unread</button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-5 space-y-3 no-scrollbar pb-24">
        {CHATS.map((chat, index) => (
            <GlassCard 
                key={chat.id} 
                onClick={() => handleChatSelect(chat)}
                variant="base"
                className="group flex gap-4 p-4 items-center cursor-pointer hover:bg-white/10 active:scale-[0.98] transition-all animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
            >
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-800 to-royal-900 border border-white/10 flex items-center justify-center text-xl text-white font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                        {chat.image ? (
                            <img src={chat.image} alt={chat.title} className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                             <Hash size={24} className="text-slate-500" />
                        )}
                    </div>
                    {chat.unreadCount > 0 && (
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-royal-950 animate-pop shadow-neon">
                            {chat.unreadCount}
                        </div>
                    )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-white truncate text-base group-hover:text-brand-primary transition-colors">{chat.title}</h3>
                        <span className={`text-[10px] font-medium ${chat.unreadCount > 0 ? 'text-brand-primary' : 'text-slate-500'}`}>{chat.timestamp}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className={`text-xs truncate pr-2 ${chat.unreadCount > 0 ? 'text-slate-300 font-medium' : 'text-slate-500'}`}>
                            {chat.lastMessage}
                        </p>
                    </div>
                </div>
            </GlassCard>
        ))}
        
        <div className="flex flex-col items-center justify-center pt-8 pb-4 text-slate-500 gap-2 opacity-30">
            <MessageCircle size={32} strokeWidth={1.5} />
            <p className="text-[10px] uppercase tracking-widest">End-to-End Encrypted</p>
        </div>
      </div>
    </div>
  );
};