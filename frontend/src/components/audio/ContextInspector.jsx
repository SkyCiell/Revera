import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, Cpu, Activity, ThumbsUp, ThumbsDown, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function ContextInspector({
  isOpen,
  onClose,
  iem,
  onSelectWorkspace,
  onPlayAb
}) {
  if (!iem || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="fixed top-16 right-4 bottom-28 z-30 w-80 sm:w-96 bg-[#FFFFFF] border-2 border-[#D8DBD2] rounded-xl shadow-xl p-5 overflow-y-auto flex flex-col justify-between"
      >
        <div className="space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#D8DBD2]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: iem.accentColor || '#2F5D50' }} />
              <div>
                <span className="text-[10px] font-bold text-[#2F5D50] uppercase tracking-wider block">
                  CONTEXT INSPECTOR
                </span>
                <h3 className="text-sm font-extrabold text-[#1B1B1B]">{iem.name}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#8C9188] hover:text-[#1B1B1B] hover:bg-[#ECEDE8] cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Topology & Overview */}
          <div className="bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg p-3 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[#5E615C]">Brand:</span>
              <span className="font-bold text-[#1B1B1B]">{iem.brand}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5E615C]">Driver Setup:</span>
              <span className="font-mono font-bold text-[#2F5D50]">{iem.driverTopology}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5E615C]">Price:</span>
              <span className="font-mono font-bold text-[#9B7E46]">${iem.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5E615C]">Impedance / Sensitivity:</span>
              <span className="font-mono text-[#1B1B1B]">{iem.impedance} $\Omega$ / {iem.sensitivity} dB</span>
            </div>
          </div>

          {/* Scores Breakdown */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F5D50] block mb-2">
              Acoustic Measurement Metrics
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-lg p-2 text-center">
                <span className="text-[10px] text-[#5E615C] block">Technicalities</span>
                <span className="font-mono font-bold text-[#2F5D50] text-sm">{iem.scores.technicalities}/100</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-lg p-2 text-center">
                <span className="text-[10px] text-[#5E615C] block">Timbre Realism</span>
                <span className="font-mono font-bold text-[#1B1B1B] text-sm">{iem.scores.timbre}/100</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-lg p-2 text-center">
                <span className="text-[10px] text-[#5E615C] block">Soundstage Depth</span>
                <span className="font-mono font-bold text-[#5E615C] text-sm">{iem.scores.soundstage}/100</span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-lg p-2 text-center">
                <span className="text-[10px] text-[#5E615C] block">Resolution</span>
                <span className="font-mono font-bold text-[#9B7E46] text-sm">{iem.scores.resolution}/100</span>
              </div>
            </div>
          </div>

          {/* Acoustic Synergy */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F5D50] block">
              Synergy & Pairing Guide
            </span>
            <div className="p-2 bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg flex items-center justify-between">
              <span className="text-[#5E615C]">Ear-Tip Synergy:</span>
              <span className="font-semibold text-[#1B1B1B]">{iem.specs.recommendedTips}</span>
            </div>
            <div className="p-2 bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg flex items-center justify-between">
              <span className="text-[#5E615C]">Cable Match:</span>
              <span className="font-semibold text-[#1B1B1B] truncate max-w-[140px]">{iem.specs.recommendedCable}</span>
            </div>
          </div>

          {/* Editorial Verdict */}
          <div className="p-3 bg-[#ECEDE8] border border-[#D8DBD2] rounded-lg text-xs space-y-1">
            <span className="font-bold text-[#2F5D50] block">Master Review Verdict</span>
            <p className="text-[#1B1B1B] italic font-medium">"{iem.review.verdict}"</p>
          </div>

        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#D8DBD2] space-y-2">
          <button
            onClick={() => onSelectWorkspace('studio')}
            className="w-full flex items-center justify-center gap-2 bg-[#2F5D50] hover:bg-[#24483E] text-white py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer shadow-xs"
          >
            <Activity size={14} />
            <span>Launch Frequency Measurement</span>
          </button>
          
          <button
            onClick={() => onSelectWorkspace('compare')}
            className="w-full flex items-center justify-center gap-2 bg-[#F8F8F6] hover:bg-[#ECEDE8] border border-[#D8DBD2] text-[#1B1B1B] py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <Sliders size={14} />
            <span>Compare in Control Room</span>
          </button>
        </div>

      </motion.aside>
    </AnimatePresence>
  );
}
