import React, { useState } from 'react';
import { Radio, BarChart2, Sliders, Box, BookOpen, User, Command, Activity, LogIn, LogOut, Shield } from 'lucide-react';
import CommandPaletteModal from './CommandPaletteModal';
import { useAuth } from '../../context/AuthContext';

export default function CommandDock({
  activeWorkspace,
  onSelectWorkspace,
  activeIem,
  onSelectIem,
  onSelectTargetCurve
}) {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const { user, openAuthModal, logout } = useAuth();

  const navItems = [
    { id: 'hub', label: 'Audio Hub', icon: Radio },
    { id: 'studio', label: 'Frequency Studio', icon: BarChart2 },
    { id: 'tuning', label: 'AI Tuning Lab', icon: Sliders },
    { id: 'vault', label: 'The Vault', icon: Box },
    { id: 'compare', label: 'Control Room', icon: Activity },
    { id: 'magazine', label: 'Magazine Desk', icon: BookOpen },
    { id: 'passport', label: 'Audio Passport', icon: User }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#C9E2F7] px-4 py-2.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand & Studio Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectWorkspace('hub')}>
              <div className="w-8 h-8 rounded-lg bg-[#0D47A1] text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
                R
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-[#0D47A1]">REVERA</span>
                <span className="text-[10px] block font-mono font-semibold text-[#2196F3] -mt-1">AUDIOPHILE OS</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1.5 pl-3 border-l border-[#C9E2F7] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span className="text-[#6B7280] font-medium">32-Bit / 384kHz DSP</span>
            </div>
          </div>

          {/* Center: Command Center Floating Navigation Dock */}
          <nav className="flex items-center gap-1 bg-[#F8FBFF] border border-[#C9E2F7] rounded-xl p-1 shadow-xs">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeWorkspace === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectWorkspace(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2196F3] text-white shadow-xs'
                      : 'text-[#4B5563] hover:text-[#0D47A1] hover:bg-[#E3F2FD]'
                  }`}
                >
                  <Icon size={14} />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: User Authentication State & Command Palette Launcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="flex items-center gap-2 bg-[#F8FBFF] hover:bg-[#E3F2FD] border border-[#C9E2F7] hover:border-[#2196F3] text-[#111827] px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all shadow-xs"
            >
              <Command size={14} className="text-[#2196F3]" />
              <span className="hidden sm:inline">Palette</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 bg-white border border-[#C9E2F7] rounded text-[10px] font-mono text-[#6B7280]">
                ⌘K
              </kbd>
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#C9E2F7]">
                <div className="flex items-center gap-1.5 bg-[#E3F2FD] border border-[#C9E2F7] px-2.5 py-1 rounded-lg text-xs">
                  <User size={14} className="text-[#0D47A1]" />
                  <span className="font-extrabold text-[#0D47A1] truncate max-w-[100px]">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-[#6B7280] hover:text-[#EF4444] hover:bg-[#F8FBFF] rounded-lg transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 bg-[#0D47A1] hover:bg-[#1976D2] text-white px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all shadow-xs"
              >
                <LogIn size={14} />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectWorkspace={onSelectWorkspace}
        onSelectIem={onSelectIem}
        onSelectTargetCurve={onSelectTargetCurve}
      />
    </>
  );
}
