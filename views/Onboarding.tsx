import React, { useState } from 'react';
import { Button } from '../components/buttons/Button';
import { INTERESTS } from '../constants';
import { Check } from 'lucide-react';

interface OnboardingProps {
    onComplete: () => void;
}

export const OnboardingView: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [step, setStep] = useState(0);

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    if (step === 0) {
        return (
            <div className="h-full flex flex-col justify-between p-6 animate-fade-in pt-20">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-3xl mx-auto rotate-12 mb-8 shadow-2xl shadow-brand-primary/50 flex items-center justify-center">
                        <span className="text-4xl">S</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Never go anywhere<br/>alone again.</h1>
                    <p className="text-slate-400">Find companions for sports, hobbies, and spontaneous adventures in your city.</p>
                </div>
                <Button onClick={() => setStep(1)} size="lg">Get Started</Button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col p-6 animate-slide-up pt-12">
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">What are you into?</h2>
                <p className="text-slate-400 text-sm mb-8">Select at least 3 to customize your feed.</p>
                
                <div className="flex flex-wrap gap-3">
                    {INTERESTS.map(interest => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                            <button
                                key={interest}
                                onClick={() => toggleInterest(interest)}
                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                    isSelected 
                                    ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30' 
                                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                }`}
                            >
                                {interest}
                                {isSelected && <Check size={14} />}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="py-6">
                 <Button 
                    fullWidth 
                    size="lg" 
                    onClick={onComplete}
                    disabled={selectedInterests.length < 3}
                >
                    Continue
                </Button>
                <p className="text-center text-xs text-slate-500 mt-4">
                    By continuing, you agree to our <span className="underline">Safety Guidelines</span>.
                </p>
            </div>
        </div>
    );
};