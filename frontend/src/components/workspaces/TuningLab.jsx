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
      <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[#2F5D50]" />
            <h1 className="text-xl font-extrabold text-[#1B1B1B]">AI TUNING LAB & RECOMMENDATION ENGINE</h1>
            <span className="text-xs font-mono bg-[#ECEDE8] text-[#2F5D50] px-2 py-0.5 rounded font-semibold border border-[#D8DBD2]">
              SONIC SYNTHESIZER
            </span>
          </div>
          <p className="text-xs text-[#5E615C] mt-1">
            Synthesize your ideal acoustic target using multi-axis sound controls or natural language sonic prompts.
          </p>
        </div>
      </div>

      {/* Main Tuning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs space-y-6">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#D8DBD2]">
              <Sliders size={18} className="text-[#2F5D50]" />
              <h2 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Tonal Balance Synthesizer</h2>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#1B1B1B]">Sub-bass Slam & Punch</span>
                  <span className="font-mono text-[#2F5D50]">{prefBass}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={prefBass}
                  onChange={(e) => setPrefBass(parseInt(e.target.value))}
                  className="w-full accent-[#2F5D50] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#1B1B1B]">Vocal Forwardness & Mid Range</span>
                  <span className="font-mono text-[#2F5D50]">{prefVocal}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={prefVocal}
                  onChange={(e) => setPrefVocal(parseInt(e.target.value))}
                  className="w-full accent-[#2F5D50] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#5E615C]">Treble Detail & EST Air</span>
                  <span className="font-mono text-[#9B7E46]">{prefTreble}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={prefTreble}
                  onChange={(e) => setPrefTreble(parseInt(e.target.value))}
                  className="w-full accent-[#9B7E46] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-[#1B1B1B]">Soundstage Width & Holography</span>
                  <span className="font-mono text-[#2F5D50]">{prefStage}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={prefStage}
                  onChange={(e) => setPrefStage(parseInt(e.target.value))}
                  className="w-full accent-[#2F5D50] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#D8DBD2]">
            <span className="text-xs font-bold text-[#2F5D50] uppercase tracking-wider block mb-2">
              Natural Language Acoustic Query
            </span>
            <div className="relative">
              <input
                type="text"
                value={naturalPrompt}
                onChange={(e) => setNaturalPrompt(e.target.value)}
                placeholder="Describe desired sound signature..."
                className="w-full bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg p-2.5 text-xs text-[#1B1B1B] focus:border-[#2F5D50] outline-none"
              />
            </div>
            <p className="text-[11px] text-[#8C9188] mt-1.5">
              AI model parses acoustic traits against measured IEM frequency curves.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-[#2F5D50]" />
              <h2 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">
                SYNTHESIZED IEM MATCHES ({matchedIems.length})
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-[#2F5D50] bg-[#ECEDE8] px-2 py-0.5 rounded border border-[#D8DBD2]">
              SORTED BY AFFINITY
            </span>
          </div>

          <div className="space-y-3">
            {matchedIems.map((iem, idx) => (
              <div
                key={iem.id}
                className="bg-[#FFFFFF] border border-[#D8DBD2] hover:border-[#2F5D50] rounded-xl p-4 shadow-xs flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#ECEDE8] border border-[#D8DBD2] flex flex-col items-center justify-center font-mono">
                    <span className="text-xs font-extrabold text-[#2F5D50]">{iem.matchScore}%</span>
                    <span className="text-[9px] text-[#8C9188]">MATCH</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-[#1B1B1B]">{iem.name}</h3>
                      {idx === 0 && (
                        <span className="text-[10px] font-bold text-white bg-[#2F5D50] px-1.5 py-0.5 rounded">
                          TOP MATCH
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#8C9188]">{iem.brand} • {iem.driverTopology}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#9B7E46]">${iem.price}</span>
                  <button
                    onClick={() => {
                      onSelectIem(iem);
                      onSelectWorkspace('studio');
                    }}
                    className="flex items-center gap-1.5 bg-[#2F5D50] hover:bg-[#24483E] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
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
