import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, Users, Check, Rocket } from 'lucide-react';
import { Button } from '../components/buttons/Button';
import { Input, Select } from '../components/inputs/Input';
import { GlassCard } from '../components/cards/GlassCard';
import { generateAIPlan } from '../services/geminiService';

export const CreateView: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    vibe: '',
    location: '',
    time: '',
    maxPeople: '4'
  });

  const handleGenerate = async () => {
    if (!formData.vibe) return;
    setIsGenerating(true);
    const suggestion = await generateAIPlan(formData.vibe, formData.location || 'Downtown');
    setAiSuggestion(suggestion);
    setIsGenerating(false);
  };

  const handlePublish = async () => {
      setIsPublishing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsPublishing(false);
      setIsPublished(true);
  };

  if (isPublished) {
      return (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-pop">
              <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mb-6 shadow-burst relative">
                  <Rocket size={40} className="text-brand-primary animate-bounce-subtle" />
                  <div className="absolute inset-0 border-4 border-brand-primary/30 rounded-full animate-ping opacity-50"></div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">It's Live!</h2>
              <p className="text-slate-400 mb-8">Your activity has been published. Get ready to meet new people.</p>
              <Button fullWidth onClick={() => window.location.reload()}>View Activity</Button>
          </div>
      )
  }

  return (
    <div className="px-5 pt-6 pb-24 animate-fade-in">
      <div className="mb-6 animate-slide-in">
        <h1 className="text-2xl font-bold text-white mb-1">Create Experience</h1>
        <p className="text-slate-400 text-sm">Host a safe, verified activity.</p>
      </div>

      {/* AI Assistant Card */}
      <GlassCard variant="highlight" className="p-6 mb-8 relative overflow-hidden group animate-slide-up stagger-1">
        <div className="absolute -right-6 -top-6 text-brand-primary/20 group-hover:text-brand-primary/30 transition-colors duration-500">
            <Sparkles size={100} />
        </div>
        <div className="relative z-10">
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                <Sparkles size={18} className="text-brand-warm animate-pulse" /> AI Concierge
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">Stuck on ideas? Describe a vibe and let us design the perfect plan.</p>
            
            <div className="flex gap-2 mb-4">
                <input 
                    type="text" 
                    placeholder="e.g. Chill tech talks, Midnight ramen..." 
                    className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-primary outline-none transition-colors"
                    value={formData.vibe}
                    onChange={(e) => setFormData({...formData, vibe: e.target.value})}
                />
                <Button size="icon" variant="primary" onClick={handleGenerate} isLoading={isGenerating}>
                    <Sparkles size={18} />
                </Button>
            </div>

            {aiSuggestion && (
                <div className="bg-white/5 rounded-xl p-4 text-xs text-slate-200 leading-relaxed border border-white/10 animate-fade-in shadow-inner">
                   {aiSuggestion.split('\n').filter(l => l.trim()).map((line, i) => (
                       <p key={i} className="mb-2 last:mb-0 animate-slide-in" style={{ animationDelay: `${i * 100}ms` }}>{line}</p>
                   ))}
                   <div className="mt-3 flex justify-end">
                        <Button size="sm" variant="ghost" onClick={() => setAiSuggestion(null)} className="text-brand-primary">Apply Plan</Button>
                   </div>
                </div>
            )}
        </div>
      </GlassCard>

      {/* Form Fields */}
      <div className="space-y-6 animate-slide-up stagger-2">
        <Input 
          label="Activity Title" 
          placeholder="Ex: Sunday Morning Tennis"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />

        <div className="grid grid-cols-2 gap-4">
            <Input 
               label="Date & Time"
               type="datetime-local"
               icon={<Calendar size={16} />}
            />
            <Select 
              label="Group Size"
              icon={<Users size={16} />}
              value={formData.maxPeople}
              onChange={(e) => setFormData({...formData, maxPeople: e.target.value})}
              options={[
                { value: '2', label: '2 People' },
                { value: '3', label: '3 People' },
                { value: '4', label: '4 People' },
                { value: '6', label: '6 People' },
                { value: '8', label: '8 People' },
              ]}
            />
        </div>

        <Input 
          label="Location"
          icon={<MapPin size={16} />}
          placeholder="Search for a place..."
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
        />

        <div>
            <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-wide ml-1">Intent Tags</label>
            <div className="flex flex-wrap gap-2">
                {['Casual', 'Professional', 'Silent', 'Energetic', 'Beginner Friendly'].map((tag, i) => (
                    <button 
                        key={tag} 
                        className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-medium text-slate-300 hover:bg-brand-primary/20 hover:border-brand-primary/50 hover:text-white transition-all active:scale-95 animate-pop"
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="mt-10 animate-slide-up stagger-3">
        <Button 
            fullWidth 
            size="lg" 
            onClick={handlePublish} 
            isLoading={isPublishing}
            isSuccess={isPublished}
        >
            {isPublished ? "Published!" : "Preview & Publish"}
        </Button>
      </div>
    </div>
  );
};