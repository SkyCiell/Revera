import React, { useState } from 'react';
import { Search, Command, User, LogIn, LogOut } from 'lucide-react';
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
    { id: 'hub', label: 'Hub' },
    { id: 'studio', label: 'Frequency Studio' },
    { id: 'tuning', label: 'AI Lab' },
    { id: 'vault', label: 'Vault' },
    { id: 'compare', label: 'Compare' },
    { id: 'magazine', label: 'Magazine' },
    { id: 'passport', label: 'Passport' }
  ];

  return (
    <>
      {/* Minimalist & Simple Header */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E4E6DF] px-6 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          
          {/* Brand: Clean Typography */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none" 
            onClick={() => onSelectWorkspace('hub')}
          >
            <span className="font-extrabold text-base tracking-widest text-[#1B1B1B]">REVERA</span>
            <span className="text-xs text-[#8C9188] font-mono">• OS</span>
          </div>

          {/* Center: Minimalist Text Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map(item => {
              const isActive = activeWorkspace === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectWorkspace(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2F5D50] text-white'
                      : 'text-[#5E615C] hover:text-[#1B1B1B] hover:bg-[#F0F1EC]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Search & Account */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="flex items-center gap-2 text-xs text-[#5E615C] hover:text-[#1B1B1B] bg-[#F0F1EC] hover:bg-[#ECEDE8] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Search size={14} className="text-[#5E615C]" />
              <span className="hidden sm:inline font-medium">Search</span>
              <kbd className="hidden md:inline text-[10px] font-mono text-[#8C9188] bg-white px-1.5 py-0.5 rounded border border-[#D8DBD2]">
                ⌘K
              </kbd>
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#E4E6DF]">
                <span className="text-xs font-bold text-[#2F5D50] truncate max-w-[100px]">{user.username}</span>
                <button
                  onClick={logout}
                  className="p-1 text-[#8C9188] hover:text-[#D94A4A] transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="text-xs font-bold text-[#2F5D50] hover:text-[#24483E] transition-colors cursor-pointer"
              >
                Sign In
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
