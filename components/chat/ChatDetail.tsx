import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Video, Phone, MoreVertical, Paperclip, Camera, Mic, Send, 
  Smile, Image as ImageIcon, FileText, MapPin, User, Headphones, Check, CheckCheck 
} from 'lucide-react';
import { ChatGroup, Message } from '../../types';
import { Button } from '../buttons/Button';
import { GlassCard } from '../cards/GlassCard';

interface ChatDetailProps {
  chat: ChatGroup;
  onBack: () => void;
}

// Mock initial messages for the chat
const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'u2',
    senderName: 'Sarah',
    avatar: 'https://picsum.photos/100/100?random=2',
    text: 'Hey everyone! Is the tennis match still on for 6 PM? 🎾',
    timestamp: '5:30 PM',
    status: 'read',
    type: 'text'
  },
  {
    id: 'm2',
    senderId: 'me',
    text: 'Yes! I just booked the court. Bringing extra rackets!',
    timestamp: '5:32 PM',
    status: 'read',
    type: 'text'
  },
  {
    id: 'm3',
    senderId: 'u3',
    senderName: 'Mike',
    avatar: 'https://picsum.photos/100/100?random=3',
    text: 'Awesome. I might be 5 mins late, traffic is crazy 🚗',
    timestamp: '5:35 PM',
    status: 'read',
    type: 'text'
  },
  {
    id: 'm4',
    senderId: 'u2',
    senderName: 'Sarah',
    avatar: 'https://picsum.photos/100/100?random=2',
    type: 'audio',
    audioDuration: '0:15',
    timestamp: '5:36 PM',
    status: 'read'
  }
];

export const ChatDetail: React.FC<ChatDetailProps> = ({ chat, onBack }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [showAttachments, setShowAttachments] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    
    // Simulate reply
    setTimeout(() => {
        setMessages(prev => [
            ...prev, 
            { ...newMessage, status: 'delivered' }
        ]);
    }, 1000);
    
    setTimeout(() => {
        setMessages(prev => [
            ...prev.slice(0, -1),
            { ...newMessage, status: 'read' }
        ]);
    }, 2000);
  };

  const handleAttachment = (type: 'image' | 'file' | 'audio') => {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        type: type,
        text: type === 'image' ? 'IMG_2024.jpg' : type === 'file' ? 'Schedule.pdf' : undefined,
        image: type === 'image' ? `https://picsum.photos/400/300?random=${Date.now()}` : undefined,
        fileSize: type === 'file' ? '2.4 MB' : undefined,
        audioDuration: type === 'audio' ? '0:09' : undefined
      };
      setMessages(prev => [...prev, newMessage]);
      setShowAttachments(false);
  };

  return (
    <div className="flex flex-col h-full relative animate-fade-in overflow-hidden bg-transparent">
      
      {/* FLOATING HEADER */}
      <div className="absolute top-4 left-4 right-4 z-40 animate-slide-up">
        <GlassCard className="p-2 flex items-center justify-between shadow-2xl border-white/20 bg-royal-950/80">
            <div className="flex items-center gap-1">
                <button onClick={onBack} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-200 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-3 px-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/10">
                        {chat.title.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-white font-bold text-sm leading-tight max-w-[120px] truncate">{chat.title}</h2>
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <p className="text-[10px] text-slate-400">Active now</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1 pr-1">
                <button className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"><Phone size={18} /></button>
                <button className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"><Video size={18} /></button>
            </div>
        </GlassCard>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto px-4 pt-24 pb-28 space-y-4 relative no-scrollbar">
        {/* Mock Date Separator */}
        <div className="flex justify-center my-6 opacity-70">
            <span className="glass-panel px-4 py-1.5 rounded-full text-xs font-bold text-slate-300 shadow-sm backdrop-blur-md border-white/5">
                Today, 12:40 PM
            </span>
        </div>

        {messages.map((msg, idx) => {
            const isMe = msg.senderId === 'me';
            const showAvatar = !isMe && (idx === 0 || messages[idx - 1].senderId !== msg.senderId);

            return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group animate-slide-up`}>
                    
                    {!isMe && (
                        <div className={`mr-2 flex flex-col justify-end ${showAvatar ? 'visible' : 'invisible'}`}>
                             <img src={msg.avatar} className="w-8 h-8 rounded-2xl border border-white/10 shadow-lg object-cover" alt={msg.senderName} />
                        </div>
                    )}
                    
                    <div className={`
                        max-w-[75%] px-4 py-3 relative shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02]
                        ${isMe 
                            ? 'bg-gradient-to-br from-brand-primary to-brand-accent text-white rounded-[20px] rounded-tr-sm' 
                            : 'bg-white/10 border border-white/5 text-slate-100 rounded-[20px] rounded-tl-sm'
                        }
                    `}>
                        {/* Sender Name */}
                        {!isMe && showAvatar && <p className="text-[10px] font-bold text-brand-secondary mb-1 opacity-80">{msg.senderName}</p>}

                        {/* Content */}
                        {msg.type === 'text' && <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
                        
                        {msg.type === 'image' && (
                            <div className="rounded-xl overflow-hidden mt-1 mb-1 border border-white/10">
                                <img src={msg.image} alt="Sent" className="max-w-full h-auto" />
                            </div>
                        )}

                        {msg.type === 'file' && (
                            <div className="flex items-center gap-3 bg-black/20 rounded-xl p-2.5 min-w-[180px]">
                                <div className="bg-white/10 p-2 rounded-lg text-white">
                                    <FileText size={20} />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-bold truncate">{msg.text}</span>
                                    <span className="text-[10px] opacity-70">{msg.fileSize} • PDF Document</span>
                                </div>
                            </div>
                        )}

                        {msg.type === 'audio' && (
                            <div className="flex items-center gap-3 min-w-[160px] py-1">
                                <button className="w-8 h-8 rounded-full bg-white text-brand-primary flex items-center justify-center shadow-sm active:scale-90 transition-transform">
                                    <Check size={14} className="fill-current" />
                                </button>
                                <div className="flex-1 flex flex-col justify-center gap-1">
                                     <div className="h-1 bg-black/20 rounded-full w-full overflow-hidden">
                                        <div className="h-full bg-white w-1/3 rounded-full animate-pulse"></div>
                                     </div>
                                     <span className="text-[10px] font-medium opacity-80">{msg.audioDuration}</span>
                                </div>
                            </div>
                        )}

                        {/* Metadata Footer */}
                        <div className={`flex items-center justify-end gap-1 mt-1 opacity-70`}>
                            <span className="text-[9px] font-medium">{msg.timestamp}</span>
                            {isMe && (
                                <span>
                                    {msg.status === 'read' ? <CheckCheck size={12} /> : <Check size={12} />}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* FLOATING ATTACHMENT MENU */}
      <div className={`
        absolute bottom-24 left-4 right-4 bg-royal-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-400 ease-out origin-bottom
        ${showAttachments ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-90 pointer-events-none'}
      `}>
          <div className="grid grid-cols-4 gap-4">
              {[
                { icon: FileText, color: 'from-purple-500 to-indigo-600', label: 'Doc', action: () => handleAttachment('file') },
                { icon: Camera, color: 'from-pink-500 to-rose-600', label: 'Cam', action: () => handleAttachment('image') },
                { icon: ImageIcon, color: 'from-blue-400 to-cyan-500', label: 'Gallery', action: () => handleAttachment('image') },
                { icon: Headphones, color: 'from-orange-400 to-amber-500', label: 'Audio', action: () => handleAttachment('audio') },
                { icon: MapPin, color: 'from-emerald-400 to-teal-500', label: 'Loc', action: () => {} },
                { icon: User, color: 'from-slate-500 to-slate-600', label: 'Contact', action: () => {} },
                { icon: Smile, color: 'from-yellow-400 to-orange-500', label: 'Sticker', action: () => {} },
              ].map((item, i) => (
                  <button key={i} onClick={item.action} className="flex flex-col items-center gap-2 group">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-lg group-active:scale-90 transition-all duration-200 ring-2 ring-transparent group-hover:ring-white/20`}>
                          <item.icon size={24} strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-slate-300 group-hover:text-white">{item.label}</span>
                  </button>
              ))}
          </div>
      </div>

      {/* FLOATING INPUT BAR */}
      <div className="absolute bottom-6 left-4 right-4 z-40">
        <GlassCard className="p-1.5 pl-3 flex items-end gap-2 shadow-2xl bg-royal-950/80 border-white/10 backdrop-blur-xl">
            <button 
                onClick={() => setShowAttachments(!showAttachments)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${showAttachments ? 'bg-brand-primary text-white rotate-45' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
            >
                <PlusIcon expanded={showAttachments} />
            </button>
            
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white text-sm py-3 focus:outline-none max-h-32 min-h-[44px] resize-none overflow-y-auto no-scrollbar placeholder-slate-500"
                rows={1}
                onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
            />
            
            <div className="flex items-center gap-1 pb-1">
                {!inputText && (
                    <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                        <Camera size={20} />
                    </button>
                )}
                <button 
                    onClick={inputText ? handleSend : undefined}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 transform active:scale-90 ${inputText ? 'bg-brand-primary rotate-0' : 'bg-white/10 rotate-0'}`}
                >
                    {inputText ? <Send size={18} className="ml-0.5" /> : <Mic size={20} />}
                </button>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};

const PlusIcon = ({ expanded }: { expanded: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`}>
        <path d="M12 5v14M5 12h14" />
    </svg>
);