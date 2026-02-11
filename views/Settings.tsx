import React, { useState } from 'react';
import { ArrowLeft, User, Shield, Bell, Lock, Globe, HelpCircle, LogOut, ChevronRight, Eye, Smartphone, Trash2, Mail, Fingerprint, Code, Download } from 'lucide-react';
import { Button } from '../components/buttons/Button';
import { GlassCard } from '../components/cards/GlassCard';
import { Toggle } from '../components/inputs/Toggle';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1 mt-6 first:mt-2">{children}</h3>
);

interface SettingItemProps {
  icon: React.ElementType;
  label: string;
  subLabel?: string;
  action?: React.ReactNode;
  danger?: boolean;
}

const SettingItem = ({ 
  icon: Icon, 
  label, 
  subLabel, 
  action, 
  danger 
}: SettingItemProps) => (
  <div className="flex items-center justify-between py-3 group">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${danger ? 'bg-red-500/10 text-red-500' : 'bg-white/5 text-slate-300 group-hover:text-white group-hover:bg-white/10'} transition-colors`}>
        <Icon size={16} />
      </div>
      <div>
        <div className={`text-sm font-medium ${danger ? 'text-red-500' : 'text-slate-200 group-hover:text-white'} transition-colors`}>{label}</div>
        {subLabel && <div className="text-[10px] text-slate-500">{subLabel}</div>}
      </div>
    </div>
    <div className="flex items-center">
      {action || <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400" />}
    </div>
  </div>
);

export const SettingsView: React.FC<SettingsProps> = ({ onBack, onLogout }) => {
  const [ghostMode, setGhostMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [biometric, setBiometric] = useState(true);

  return (
    <div className="bg-royal-950 min-h-full pb-8 animate-slide-in">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-royal-950/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center gap-4">
        <Button variant="glass" size="icon" onClick={onBack} className="rounded-full w-8 h-8">
          <ArrowLeft size={16} />
        </Button>
        <h1 className="text-lg font-bold text-white">Settings</h1>
      </div>

      <div className="px-5 pt-2">
        {/* Account Section */}
        <SectionTitle>Account</SectionTitle>
        <GlassCard className="px-4 py-1">
          <SettingItem icon={User} label="Personal Information" subLabel="Name, Age, Verified Status" />
          <div className="h-px bg-white/5" />
          <SettingItem icon={Smartphone} label="Linked Devices" subLabel="iPhone 14 Pro • Active now" />
          <div className="h-px bg-white/5" />
          <SettingItem icon={Globe} label="Language" subLabel="English (US)" />
        </GlassCard>

        {/* Developer Options */}
        <SectionTitle>Developer</SectionTitle>
        <GlassCard className="px-4 py-1">
          <div className="cursor-pointer" onClick={() => alert("Check REACT_NATIVE_BLUEPRINT.md in project root")}>
             <SettingItem icon={Code} label="React Native Source" subLabel="Download NativeWind Blueprint" action={<Download size={16} className="text-brand-primary" />} />
          </div>
        </GlassCard>

        {/* Privacy & Safety */}
        <SectionTitle>Privacy & Safety</SectionTitle>
        <GlassCard className="px-4 py-1">
          <SettingItem 
            icon={Eye} 
            label="Ghost Mode" 
            subLabel="Hide your location from map" 
            action={<Toggle checked={ghostMode} onChange={setGhostMode} />} 
          />
          <div className="h-px bg-white/5" />
          <SettingItem icon={Shield} label="Safety Center" subLabel="Emergency contacts, ID verification" />
          <div className="h-px bg-white/5" />
          <SettingItem icon={Lock} label="Blocked Users" subLabel="2 blocked contacts" />
          <div className="h-px bg-white/5" />
          <SettingItem 
            icon={Fingerprint} 
            label="Biometric Login" 
            action={<Toggle checked={biometric} onChange={setBiometric} />} 
          />
        </GlassCard>

        {/* Notifications */}
        <SectionTitle>Notifications</SectionTitle>
        <GlassCard className="px-4 py-1">
          <SettingItem 
            icon={Bell} 
            label="Push Notifications" 
            action={<Toggle checked={notifications} onChange={setNotifications} />} 
          />
          <div className="h-px bg-white/5" />
          <SettingItem 
            icon={Mail} 
            label="Email Digest" 
            subLabel="Weekly activity summary"
            action={<Toggle checked={emailDigest} onChange={setEmailDigest} />} 
          />
        </GlassCard>

        {/* Support */}
        <SectionTitle>Support & Legal</SectionTitle>
        <GlassCard className="px-4 py-1">
          <SettingItem icon={HelpCircle} label="Help Center" />
          <div className="h-px bg-white/5" />
          <SettingItem icon={Shield} label="Report a Problem" />
          <div className="h-px bg-white/5" />
          <SettingItem icon={Lock} label="Privacy Policy" />
        </GlassCard>

        {/* Actions */}
        <SectionTitle>Actions</SectionTitle>
        <GlassCard className="px-4 py-1 mb-6 border-red-500/20">
            <div onClick={onLogout} className="cursor-pointer">
                <SettingItem icon={LogOut} label="Log Out" danger />
            </div>
            <div className="h-px bg-white/5" />
            <div className="cursor-pointer">
                <SettingItem icon={Trash2} label="Delete Account" danger />
            </div>
        </GlassCard>

        <div className="text-center pb-8">
            <p className="text-[10px] text-slate-600 font-mono">SOCIALIZE v1.2.0 (Native Ready)</p>
            <p className="text-[10px] text-slate-700">Made with 🧡 in NYC</p>
        </div>
      </div>
    </div>
  );
};