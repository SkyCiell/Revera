import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/navigation/AuthModal';
import CommandDock from './components/navigation/CommandDock';
import MasterAudioPlayer from './components/audio/MasterAudioPlayer';
import ExplorationHub from './components/workspaces/ExplorationHub';
import FrequencyStudio from './components/workspaces/FrequencyStudio';
import TuningLab from './components/workspaces/TuningLab';
import TheVault from './components/workspaces/TheVault';
import ControlRoomCompare from './components/workspaces/ControlRoomCompare';
import MagazineDesk from './components/workspaces/MagazineDesk';
import AudioPassport from './components/workspaces/AudioPassport';
import { IEM_LIST } from './data/iemData';

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState('hub');
  const [activeIem, setActiveIem] = useState(IEM_LIST[0]);
  const [eqGain, setEqGain] = useState({ bass: 0, mid: 0, treble: 0 });

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F8FBFF] text-[#111827] flex flex-col font-sans pb-28">
        {/* Top Floating Command Navigation Dock */}
        <CommandDock
          activeWorkspace={activeWorkspace}
          onSelectWorkspace={setActiveWorkspace}
          activeIem={activeIem}
          onSelectIem={setActiveIem}
        />

        {/* Main Workspace Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-6 pb-12">
          <AnimatePresence mode="wait">
            {activeWorkspace === 'hub' && (
              <ExplorationHub
                key="hub"
                activeIem={activeIem}
                onSelectIem={setActiveIem}
                onSelectWorkspace={setActiveWorkspace}
                eqGain={eqGain}
                onEqChange={setEqGain}
              />
            )}

            {activeWorkspace === 'studio' && (
              <FrequencyStudio
                key="studio"
                activeIem={activeIem}
                onSelectIem={setActiveIem}
                eqGain={eqGain}
                onEqChange={setEqGain}
              />
            )}

            {activeWorkspace === 'tuning' && (
              <TuningLab
                key="tuning"
                onSelectIem={setActiveIem}
                onSelectWorkspace={setActiveWorkspace}
              />
            )}

            {activeWorkspace === 'vault' && (
              <TheVault
                key="vault"
                activeIem={activeIem}
                onSelectIem={setActiveIem}
              />
            )}

            {activeWorkspace === 'compare' && (
              <ControlRoomCompare
                key="compare"
                activeIem={activeIem}
                onSelectIem={setActiveIem}
              />
            )}

            {activeWorkspace === 'magazine' && (
              <MagazineDesk
                key="magazine"
                activeIem={activeIem}
                onSelectIem={setActiveIem}
                onSelectWorkspace={setActiveWorkspace}
              />
            )}

            {activeWorkspace === 'passport' && (
              <AudioPassport
                key="passport"
                activeIem={activeIem}
                onSelectIem={setActiveIem}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Floating Bottom Web Audio Player Bar */}
        <MasterAudioPlayer
          activeIem={activeIem}
          onSelectIem={setActiveIem}
        />

        {/* Auth Modal for Login / Registration */}
        <AuthModal />
      </div>
    </AuthProvider>
  );
}
