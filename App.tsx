import React, { useState } from 'react';
import { ViewState, Activity } from './types';
import { BottomNav } from './components/navigation/BottomNav';
import { HomeView } from './views/Home';
import { CreateView } from './views/Create';
import { ChatView } from './views/Chat';
import { ProfileView } from './views/Profile';
import { SettingsView } from './views/Settings';
import { OnboardingView } from './views/Onboarding';
import { AuthView } from './views/Auth';
import { ActivityDetailModal } from './components/modals/ActivityDetailModal';
import Galaxy from './components/Galaxy';
import { Compass } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('AUTH');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [navVisible, setNavVisible] = useState(true);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleCloseModal = () => {
    setSelectedActivity(null);
  };

  const renderView = () => {
    switch (currentView) {
        case 'AUTH':
            return (
                <AuthView 
                    onLogin={() => setCurrentView('HOME')} 
                    onSignupComplete={() => setCurrentView('ONBOARDING')} 
                />
            );
        case 'ONBOARDING':
            return <OnboardingView onComplete={() => setCurrentView('HOME')} />;
        case 'HOME':
            return <HomeView onActivityClick={handleActivityClick} onNavigate={setCurrentView} />;
        case 'EXPLORE':
            return (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 pt-32">
                    <Compass size={64} className="mb-4 opacity-50" />
                    <h2 className="text-lg font-bold">Map View</h2>
                    <p className="text-sm">Coming in the next update.</p>
                </div>
            );
        case 'CREATE':
            return <CreateView />;
        case 'CHATS':
            return <ChatView onToggleNav={setNavVisible} />;
        case 'PROFILE':
            return <ProfileView onNavigate={setCurrentView} onLogout={() => setCurrentView('AUTH')} />;
        case 'SETTINGS':
            return <SettingsView onBack={() => setCurrentView('PROFILE')} onLogout={() => setCurrentView('AUTH')} />;
        default:
            return <HomeView onActivityClick={handleActivityClick} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      {/* Mobile Container Simulator */}
      <div className="w-full max-w-md h-screen md:h-[90vh] bg-royal-900 md:rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col border border-white/5">
        
        {/* Galaxy Background Layer */}
        {/* Increased intensity and density for better visibility */}
        <div className="absolute inset-0 z-0 opacity-100">
            <Galaxy 
                mouseRepulsion
                mouseInteraction
                density={2.5}  // Increased from 1
                glowIntensity={0.8} // Increased from 0.3
                saturation={0}
                hueShift={140}
                twinkleIntensity={0.5}
                rotationSpeed={0.15}
                repulsionStrength={2}
                autoCenterRepulsion={0}
                starSpeed={0.6}
                speed={1}
            />
        </div>

        {/* Dynamic Content - Reduced background opacity to let galaxy shine through */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar z-10 relative bg-royal-950/20 backdrop-blur-sm">
            {renderView()}
        </div>

        {/* Modal Overlay */}
        {selectedActivity && (
            <ActivityDetailModal activity={selectedActivity} onClose={handleCloseModal} />
        )}

        {/* Navigation - Hidden on Onboarding, Auth, & Settings */}
        {currentView !== 'ONBOARDING' && currentView !== 'AUTH' && currentView !== 'SETTINGS' && (
             <BottomNav 
                currentView={currentView} 
                onNavigate={setCurrentView} 
                hidden={!navVisible}
             />
        )}
      </div>
    </div>
  );
};

export default App;