import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, Bookmark, Plus, CheckCircle, ShieldCheck } from 'lucide-react';
import { IEM_LIST } from '../../data/iemData';

export default function AudioPassport({ activeIem, onSelectIem }) {
  const [audiogramData, setAudiogramData] = useState([
    { f: 250, label: '250Hz', dbThreshold: 0 },
    { f: 1000, label: '1kHz', dbThreshold: 0 },
    { f: 3000, label: '3kHz', dbThreshold: 5 },
    { f: 8000, label: '8kHz', dbThreshold: 10 },
    { f: 12000, label: '12kHz', dbThreshold: 15 }
  ]);

  const handleThresholdChange = (index, value) => {
    const next = [...audiogramData];
    next[index].dbThreshold = parseInt(value);
    setAudiogramData(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <User size={20} className="text-[#0D47A1]" />
            <h1 className="text-xl font-extrabold text-[#0D47A1]">AUDIO PASSPORT & LISTENING JOURNAL</h1>
            <span className="text-xs font-mono bg-[#E3F2FD] text-[#0D47A1] px-2 py-0.5 rounded font-semibold border border-[#C9E2F7]">
              MEMBER ID #8841-DS
            </span>
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Manage your personal HRTF hearing sensitivity audiogram, custom EQ target presets, and listening log.
          </p>
        </div>
      </div>

      {/* Main Passport Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: Hearing Audiogram Calibration */}
        <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#C9E2F7]">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-[#0D47A1]" />
              <h2 className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
                Personal Hearing Audiogram Sensitivity
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#22C55E] bg-[#E3F2FD] px-2 py-0.5 rounded font-bold border border-[#C9E2F7]">
              CALIBRATED
            </span>
          </div>

          <p className="text-xs text-[#4B5563]">
            Adjust frequency hearing thresholds (dB SPL) to calibrate personalized target curve compensation for your ears.
          </p>

          <div className="space-y-4 mt-4 text-xs">
            {audiogramData.map((item, idx) => (
              <div key={item.f}>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#111827]">{item.label} Frequency Sensitivity</span>
                  <span className="font-mono text-[#0D47A1]">{item.dbThreshold > 0 ? `+${item.dbThreshold}` : item.dbThreshold} dB</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="25"
                  value={item.dbThreshold}
                  onChange={(e) => handleThresholdChange(idx, e.target.value)}
                  className="w-full accent-[#2196F3] cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="bg-[#F8FBFF] border border-[#C9E2F7] rounded-lg p-3 text-xs text-[#4B5563]">
            <span className="font-bold text-[#0D47A1] block">Personal HRTF Compensation</span>
            Higher frequency sensitivity loss at 12kHz is automatically counter-balanced in your saved Revera targets.
          </div>
        </div>

        {/* Right 6 Cols: Gear Collection Rack & Saved Presets */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Saved Target Presets */}
          <div className="bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#C9E2F7]">
              <div className="flex items-center gap-2">
                <Bookmark size={18} className="text-[#0D47A1]" />
                <h3 className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">Saved Target Curves</h3>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-bold text-[#2196F3] cursor-pointer hover:underline">
                <Plus size={14} />
                <span>New Preset</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#F8FBFF] border border-[#C9E2F7] rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-[#111827] block">Late-Night Acoustic Warmth</span>
                  <span className="text-[10px] text-[#6B7280]">+3dB Sub-bass, -1.5dB 3kHz Pinna Peak</span>
                </div>
                <span className="font-mono text-[10px] bg-[#E3F2FD] text-[#0D47A1] px-2 py-0.5 rounded font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="p-3 bg-[#FFFFFF] border border-[#C9E2F7] rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-[#111827] block">Vocal Analytical Reference</span>
                  <span className="text-[10px] text-[#6B7280]">Flat Bass, +2dB Midrange, +4dB EST Air</span>
                </div>
                <button className="text-[10px] font-bold text-[#2196F3] hover:underline cursor-pointer">
                  Load Preset
                </button>
              </div>
            </div>
          </div>

          {/* Personal Gear Rack */}
          <div className="bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs space-y-3">
            <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider block border-b border-[#C9E2F7] pb-2">
              My Owned IEM Vault (3 Items)
            </span>

            <div className="space-y-2 text-xs">
              {IEM_LIST.slice(0, 3).map(iem => (
                <div
                  key={iem.id}
                  onClick={() => onSelectIem(iem)}
                  className="p-2.5 bg-[#F8FBFF] border border-[#C9E2F7] rounded-lg flex items-center justify-between cursor-pointer hover:border-[#2196F3] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: iem.accentColor }} />
                    <span className="font-bold text-[#111827]">{iem.name}</span>
                  </div>
                  <span className="font-mono text-[#6B7280]">${iem.price}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
