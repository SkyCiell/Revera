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
      <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <User size={20} className="text-[#2F5D50]" />
            <h1 className="text-xl font-extrabold text-[#1B1B1B]">AUDIO PASSPORT & LISTENING JOURNAL</h1>
            <span className="text-xs font-mono bg-[#ECEDE8] text-[#2F5D50] px-2 py-0.5 rounded font-semibold border border-[#D8DBD2]">
              MEMBER ID #8841-DS
            </span>
          </div>
          <p className="text-xs text-[#5E615C] mt-1">
            Manage your personal HRTF hearing sensitivity audiogram, custom EQ target presets, and listening log.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D8DBD2]">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-[#2F5D50]" />
              <h2 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">
                Personal Hearing Audiogram Sensitivity
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#3F7D58] bg-[#ECEDE8] px-2 py-0.5 rounded font-bold border border-[#D8DBD2]">
              CALIBRATED
            </span>
          </div>

          <p className="text-xs text-[#5E615C]">
            Adjust frequency hearing thresholds (dB SPL) to calibrate personalized target curve compensation for your ears.
          </p>

          <div className="space-y-4 mt-4 text-xs">
            {audiogramData.map((item, idx) => (
              <div key={item.f}>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#1B1B1B]">{item.label} Frequency Sensitivity</span>
                  <span className="font-mono text-[#2F5D50]">{item.dbThreshold > 0 ? `+${item.dbThreshold}` : item.dbThreshold} dB</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="25"
                  value={item.dbThreshold}
                  onChange={(e) => handleThresholdChange(idx, e.target.value)}
                  className="w-full accent-[#2F5D50] cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg p-3 text-xs text-[#5E615C]">
            <span className="font-bold text-[#2F5D50] block">Personal HRTF Compensation</span>
            Higher frequency sensitivity loss at 12kHz is automatically counter-balanced in your saved Revera targets.
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#D8DBD2]">
              <div className="flex items-center gap-2">
                <Bookmark size={18} className="text-[#2F5D50]" />
                <h3 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Saved Target Curves</h3>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-bold text-[#2F5D50] cursor-pointer hover:underline">
                <Plus size={14} />
                <span>New Preset</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-[#1B1B1B] block">Late-Night Acoustic Warmth</span>
                  <span className="text-[10px] text-[#8C9188]">+3dB Sub-bass, -1.5dB 3kHz Pinna Peak</span>
                </div>
                <span className="font-mono text-[10px] bg-[#ECEDE8] text-[#2F5D50] px-2 py-0.5 rounded font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="p-3 bg-[#FFFFFF] border border-[#D8DBD2] rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-[#1B1B1B] block">Vocal Analytical Reference</span>
                  <span className="text-[10px] text-[#8C9188]">Flat Bass, +2dB Midrange, +4dB EST Air</span>
                </div>
                <button className="text-[10px] font-bold text-[#2F5D50] hover:underline cursor-pointer">
                  Load Preset
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs space-y-3">
            <span className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider block border-b border-[#D8DBD2] pb-2">
              My Owned IEM Vault (3 Items)
            </span>

            <div className="space-y-2 text-xs">
              {IEM_LIST.slice(0, 3).map(iem => (
                <div
                  key={iem.id}
                  onClick={() => onSelectIem(iem)}
                  className="p-2.5 bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg flex items-center justify-between cursor-pointer hover:border-[#2F5D50] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: iem.accentColor }} />
                    <span className="font-bold text-[#1B1B1B]">{iem.name}</span>
                  </div>
                  <span className="font-mono text-[#8C9188]">${iem.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
