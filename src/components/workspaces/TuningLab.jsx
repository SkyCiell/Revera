import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Sparkles, Target, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { IEM_LIST } from '../../data/iemData';

export default function TuningLab({ onSelectIem, onSelectWorkspace }) {
  const [prefBass, setPrefBass] = useState(80);
  const [prefVocal, setPrefVocal] = useState(75);
  const [prefTreble, setPrefTreble] = useState(70);
  const [prefStage, setPrefStage] = useState(85);
  const [naturalPrompt, setNaturalPrompt] = useState('Deep sub-bass impact with pristine female vocals & holographic soundstage');

  // Calculate matching scores for each IEM based on target preferences
  const matchedIems = IEM_LIST.map(iem => {
    const bassDiff = Math.abs(iem.scores.technicalities * 0.9 - prefBass);
    const vocalDiff = Math.abs(iem.scores.timbre - prefVocal);
    const trebleDiff = Math.abs(iem.scores.resolution - prefTreble);
    const stageDiff = Math.abs(iem.scores.soundstage - prefStage);
    const totalDiff = (bassDiff + vocalDiff + trebleDiff + stageDiff) / 4;
    const matchScore = Math.max(60, Math.min(99, Math.round(100 - totalDiff)));

    return { ...iem, matchScore };
  }).sort((a, b) => b.matchScore - a.matchScore);

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
            <Sparkles size={20} className="text-[#0D47A1]" />
            <h1 className="text-xl font-extrabold text-[#0D47A1]">AI TUNING LAB & RECOMMENDATION ENGINE</h1>
            <span className="text-xs font-mono bg-[#E3F2FD] text-[#0D47A1] px-2 py-0.5 rounded font-semibold border border-[#C9E2F7]">
              SONIC SYNTHESIZER
            </span>
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Synthesize your ideal acoustic target using multi-axis sound controls or natural language sonic prompts.
          </p>
        </div>
      </div>

      {/* Main Tuning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Sound Preference Controls */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs space-y-6">
          
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#C9E2F7]">
              <Sliders size={18} className="text-[#0D47A1]" />
              <h2 className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">Tonal Balance Synthesizer</h2>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#0D47A1]">Sub-bass Slam & Punch</span>
                  <span className="font-mono">{prefBass}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={prefBass}
                  onChange={(e) => setPrefBass(parseInt(e.target.value))}
                  className="w-full accent-[#0D47A1] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#2196F3]">Vocal Forwardness & Mid Range</span>
                  <span className="font-mono">{prefVocal}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={prefVocal}
                  onChange={(e) => setPrefVocal(parseInt(e.target.value))}
                  className="w-full accent-[#2196F3] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#4B5563]">Treble Detail & EST Air</span>
                  <span className="font-mono">{prefTreble}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={prefTreble}
                  onChange={(e) => setPrefTreble(parseInt(e.target.value))}
                  className="w-full accent-[#90CAF9] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#0D47A1]">Soundstage Width & Holography</span>
                  <span className="font-mono">{prefStage}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={prefStage}
                  onChange={(e) => setPrefStage(parseInt(e.target.value))}
                  className="w-full accent-[#0D47A1] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Natural Language Prompt Tuner */}
          <div className="pt-4 border-t border-[#C9E2F7]">
            <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider block mb-2">
              Natural Language Acoustic Query
            </span>
            <div className="relative">
              <input
                type="text"
                value={naturalPrompt}
                onChange={(e) => setNaturalPrompt(e.target.value)}
                placeholder="Describe desired sound signature..."
                className="w-full bg-[#F8FBFF] border border-[#C9E2F7] rounded-lg p-2.5 text-xs text-[#111827] focus:border-[#2196F3] outline-none"
              />
            </div>
            <p className="text-[11px] text-[#6B7280] mt-1.5">
              AI model parses acoustic traits against measured IEM frequency curves.
            </p>
          </div>

        </div>

        {/* Right 7 Cols: Match Results & Scorecards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-[#0D47A1]" />
              <h2 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                SYNTHESIZED IEM MATCHES ({matchedIems.length})
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#0D47A1] bg-[#E3F2FD] px-2 py-0.5 rounded border border-[#C9E2F7]">
              SORTED BY AFFINITY
            </span>
          </div>

          <div className="space-y-3">
            {matchedIems.map((iem, idx) => (
              <div
                key={iem.id}
                className="bg-[#FFFFFF] border border-[#C9E2F7] hover:border-[#2196F3] rounded-xl p-4 shadow-xs flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] border border-[#C9E2F7] flex flex-col items-center justify-center font-mono">
                    <span className="text-xs font-extrabold text-[#0D47A1]">{iem.matchScore}%</span>
                    <span className="text-[9px] text-[#6B7280]">MATCH</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-[#111827]">{iem.name}</h3>
                      {idx === 0 && (
                        <span className="text-[10px] font-bold text-white bg-[#0D47A1] px-1.5 py-0.5 rounded">
                          TOP MATCH
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#6B7280]">{iem.brand} • {iem.driverTopology}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#0D47A1]">${iem.price}</span>
                  <button
                    onClick={() => {
                      onSelectIem(iem);
                      onSelectWorkspace('studio');
                    }}
                    className="flex items-center gap-1.5 bg-[#2196F3] hover:bg-[#1976D2] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <span>Inspect Graph</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </motion.div>
  );
}
