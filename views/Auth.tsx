import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Calendar, ArrowRight, ArrowLeft, Shield, CheckCircle, Smartphone, Camera, Fingerprint, Upload } from 'lucide-react';
import { Button } from '../components/buttons/Button';
import { Input, Select } from '../components/inputs/Input';
import { FileUpload } from '../components/inputs/FileUpload';
import { GlassCard } from '../components/cards/GlassCard';

interface AuthProps {
  onLogin: () => void;
  onSignupComplete: () => void;
}

export const AuthView: React.FC<AuthProps> = ({ onLogin, onSignupComplete }) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [signupStep, setSignupStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    phone: '',
    bio: '',
    vibe: '',
    docType: 'aadhaar'
  });
  
  const [verifications, setVerifications] = useState({
    email: false,
    phone: false,
    id: false
  });

  const [verifying, setVerifying] = useState<string | null>(null);

  const VIBES = ['Playful', 'Lonely', 'Fun', 'Flirty', 'Friendly', 'Nerdy', 'Chaotic', 'Chill', 'Spontaneous'];

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onLogin();
  };

  const verifyField = async (field: 'email' | 'phone') => {
    setVerifying(field);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setVerifications(prev => ({ ...prev, [field]: true }));
    setVerifying(null);
  };

  const handleSignupNext = () => {
    if (signupStep < 3) {
        setSignupStep(prev => prev + 1);
    } else {
        handleSignupSubmit();
    }
  };

  const handleSignupSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onSignupComplete();
  };

  // --- RENDER LOGIN ---
  if (mode === 'LOGIN') {
    return (
      <div className="h-full flex flex-col justify-center px-6 pt-20 pb-10 animate-fade-in">
        <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-2xl mx-auto rotate-3 flex items-center justify-center shadow-neon mb-4">
                <span className="text-3xl font-bold text-white">S</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Login to continue your social journey.</p>
        </div>

        <div className="space-y-4 mb-8">
            <Input 
                icon={<Mail size={18} />} 
                placeholder="Email Address" 
                value={loginData.email}
                onChange={e => setLoginData({...loginData, email: e.target.value})}
            />
            <Input 
                type="password"
                icon={<Lock size={18} />} 
                placeholder="Password" 
                value={loginData.password}
                onChange={e => setLoginData({...loginData, password: e.target.value})}
            />
            <div className="flex justify-end">
                <button className="text-xs text-brand-primary font-bold hover:text-white transition-colors">Forgot Password?</button>
            </div>
        </div>

        <Button fullWidth size="lg" onClick={handleLogin} isLoading={isLoading}>
            Log In
        </Button>

        <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
                Don't have an account?{' '}
                <button onClick={() => setMode('SIGNUP')} className="text-white font-bold hover:underline">
                    Sign Up
                </button>
            </p>
        </div>
      </div>
    );
  }

  // --- RENDER SIGNUP ---
  return (
    <div className="h-full flex flex-col px-6 pt-12 pb-10 animate-fade-in">
        <div className="flex items-center mb-6">
            {signupStep > 1 && (
                <button onClick={() => setSignupStep(prev => prev - 1)} className="p-2 -ml-2 text-slate-400 hover:text-white">
                    <ArrowLeft size={20} />
                </button>
            )}
            <div className="flex-1 text-center pr-6">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">Step {signupStep} of 3</span>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
            <h2 className="text-2xl font-bold text-white mb-6">
                {signupStep === 1 && "Create Account"}
                {signupStep === 2 && "Verification"}
                {signupStep === 3 && "Your Vibe"}
            </h2>

            {/* STEP 1: BASIC INFO */}
            {signupStep === 1 && (
                <div className="space-y-4 animate-slide-in">
                    <Input 
                        icon={<User size={18} />} 
                        placeholder="Full Name" 
                        value={signupData.fullName}
                        onChange={e => setSignupData({...signupData, fullName: e.target.value})}
                    />
                    <Input 
                        icon={<Mail size={18} />} 
                        placeholder="Email Address" 
                        value={signupData.email}
                        onChange={e => setSignupData({...signupData, email: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                         <Input 
                            type="number"
                            icon={<Calendar size={18} />} 
                            placeholder="Age" 
                            value={signupData.age}
                            onChange={e => setSignupData({...signupData, age: e.target.value})}
                        />
                        <Input 
                            icon={<Smartphone size={18} />} 
                            placeholder="Mobile" 
                            value={signupData.phone}
                            onChange={e => setSignupData({...signupData, phone: e.target.value})}
                        />
                    </div>
                    <Input 
                        type="password"
                        icon={<Lock size={18} />} 
                        placeholder="Password" 
                        value={signupData.password}
                        onChange={e => setSignupData({...signupData, password: e.target.value})}
                    />
                    <Input 
                        type="password"
                        icon={<Lock size={18} />} 
                        placeholder="Confirm Password" 
                        value={signupData.confirmPassword}
                        onChange={e => setSignupData({...signupData, confirmPassword: e.target.value})}
                    />
                </div>
            )}

            {/* STEP 2: VERIFICATION */}
            {signupStep === 2 && (
                <div className="space-y-6 animate-slide-in">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-white flex items-center gap-2">
                                <Mail size={16} className="text-brand-secondary" /> Email Verification
                            </span>
                            {verifications.email ? (
                                <CheckCircle size={16} className="text-emerald-500" />
                            ) : (
                                <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-brand-primary h-8 px-2"
                                    onClick={() => verifyField('email')}
                                    isLoading={verifying === 'email'}
                                >
                                    Verify
                                </Button>
                            )}
                        </div>
                        <p className="text-xs text-slate-500">{signupData.email || 'No email provided'}</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-white flex items-center gap-2">
                                <Phone size={16} className="text-brand-warm" /> Mobile Verification
                            </span>
                            {verifications.phone ? (
                                <CheckCircle size={16} className="text-emerald-500" />
                            ) : (
                                <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-brand-primary h-8 px-2"
                                    onClick={() => verifyField('phone')}
                                    isLoading={verifying === 'phone'}
                                >
                                    Verify
                                </Button>
                            )}
                        </div>
                        <p className="text-xs text-slate-500">{signupData.phone || 'No phone provided'}</p>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Identity Verification</label>
                        <Select 
                            options={[
                                { value: 'aadhaar', label: 'Aadhaar Card' },
                                { value: 'passport', label: 'Passport' },
                                { value: 'college', label: 'College ID' },
                                { value: 'license', label: 'Driving License' }
                            ]}
                            value={signupData.docType}
                            onChange={(e) => setSignupData({...signupData, docType: e.target.value})}
                            icon={<Fingerprint size={16} />}
                        />
                        <FileUpload label="Upload ID Document" />
                        <p className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Shield size={10} /> Your ID is encrypted and used for verification only.
                        </p>
                    </div>
                </div>
            )}

            {/* STEP 3: PROFILE & VIBE */}
            {signupStep === 3 && (
                <div className="space-y-6 animate-slide-in">
                    <div className="flex justify-center mb-6">
                         <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden hover:border-brand-primary transition-colors">
                                <Camera size={24} className="text-slate-400" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-brand-primary rounded-full p-2 text-white shadow-lg">
                                <Upload size={14} />
                            </div>
                         </div>
                    </div>

                    <Input 
                        placeholder="Bio / Description"
                        value={signupData.bio}
                        onChange={e => setSignupData({...signupData, bio: e.target.value})}
                    />

                    <div>
                         <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-wide">What's your vibe? <span className="text-brand-primary">(Pick 1)</span></label>
                         <div className="flex flex-wrap gap-2">
                            {VIBES.map(vibe => (
                                <button
                                    key={vibe}
                                    onClick={() => setSignupData({...signupData, vibe})}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                                        signupData.vibe === vibe
                                        ? 'bg-brand-primary border-brand-primary text-white shadow-neon scale-105'
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {vibe}
                                </button>
                            ))}
                         </div>
                    </div>
                </div>
            )}
        </div>

        {/* BOTTOM ACTION */}
        <div className="mt-4">
             <Button 
                fullWidth 
                size="lg" 
                onClick={handleSignupNext} 
                isLoading={isLoading}
                iconRight={signupStep < 3 ? <ArrowRight size={18} /> : undefined}
            >
                {signupStep === 3 ? "Complete Registration" : "Continue"}
            </Button>
            
            {signupStep === 1 && (
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{' '}
                        <button onClick={() => setMode('LOGIN')} className="text-white font-bold hover:underline">
                            Log In
                        </button>
                    </p>
                </div>
            )}
        </div>
    </div>
  );
};