import React, { useState, useEffect } from 'react';
import { Search, Command, X, Sliders, Radio, Box, BarChart2, BookOpen, User, ArrowRight } from 'lucide-react';
import { IEM_LIST, TARGET_CURVES } from '../../data/iemData';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onSelectWorkspace,
  onSelectIem,
  onSelectTargetCurve
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredIems = IEM_LIST.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.brand.toLowerCase().includes(query.toLowerCase()) ||
    item.soundSignature.toLowerCase().includes(query.toLowerCase())
  );

  const workspaces = [
    { id: 'hub', name: 'Audio Exploration Hub', icon: Radio, desc: 'Asymmetric studio workstation' },
    { id: 'studio', name: 'Frequency Studio', icon: BarChart2, desc: 'High-precision graph & parametric EQ' },
    { id: 'tuning', name: 'AI Tuning Lab', icon: Sliders, desc: 'Sound signature wizard & target generator' },
    { id: 'vault', name: 'The Vault', icon: Box, desc: 'Digital shelf & driver topology rack' },
    { id: 'compare', name: 'Control Room Compare', icon: Sliders, desc: 'Multi-IEM spec & graph control room' },
    { id: 'magazine', name: 'Magazine Desk', icon: BookOpen, desc: 'Editorial review log & impressions' },
    { id: 'passport', name: 'Audio Passport', icon: User, desc: 'Listening journal & hearing audiogram' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-none">
      <div className="bg-[#FFFFFF] border-2 border-[#C9E2F7] rounded-xl w-full max-w-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-[#C9E2F7] gap-3">
          <Search size={18} className="text-[#2196F3]" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, search IEM (e.g. Monarch, IE600), or switch workspace..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-[#111827] placeholder-[#6B7280] outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-[#E3F2FD] cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Command Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          
          {/* Workspaces Section */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1] px-2">
              Workspaces & Control Rooms
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1.5">
              {workspaces.map(ws => {
                const Icon = ws.icon;
                return (
                  <button
                    key={ws.id}
                    onClick={() => {
                      onSelectWorkspace(ws.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-[#C9E2F7] hover:border-[#2196F3] hover:bg-[#F8FBFF] text-left cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-[#E3F2FD] text-[#0D47A1] group-hover:bg-[#2196F3] group-hover:text-white transition-colors">
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#111827]">{ws.name}</div>
                        <div className="text-[10px] text-[#6B7280]">{ws.desc}</div>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-[#6B7280] group-hover:text-[#2196F3] transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* IEM Search Results */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1] px-2">
              Matched In-Ear Monitors ({filteredIems.length})
            </span>
            <div className="space-y-1 mt-1.5">
              {filteredIems.map(iem => (
                <button
                  key={iem.id}
                  onClick={() => {
                    onSelectIem(iem);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg border border-[#C9E2F7] hover:border-[#2196F3] hover:bg-[#E3F2FD] text-left cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: iem.accentColor }} />
                    <div>
                      <span className="text-xs font-bold text-[#111827]">{iem.name}</span>
                      <span className="text-[11px] text-[#6B7280] ml-2">({iem.driverTopology})</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0D47A1]">${iem.price}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer shortcuts */}
        <div className="bg-[#F8FBFF] px-4 py-2 border-t border-[#C9E2F7] flex items-center justify-between text-[11px] text-[#6B7280]">
          <span>Use <kbd className="px-1.5 py-0.5 bg-white border border-[#C9E2F7] rounded text-[10px] font-mono">ESC</kbd> to close</span>
          <span className="font-mono text-[#0D47A1]">REVERA COMMAND v2.4</span>
        </div>
      </div>
    </div>
  );
}
