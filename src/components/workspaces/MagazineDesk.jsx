import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ThumbsUp, ThumbsDown, Award, Star, ArrowRight } from 'lucide-react';
import { IEM_LIST } from '../../data/iemData';

export default function MagazineDesk({ activeIem, onSelectIem, onSelectWorkspace }) {
  const [selectedIem, setSelectedIem] = useState(activeIem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Editorial Header */}
      <div className="bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-[#0D47A1]" />
            <h1 className="text-xl font-extrabold text-[#0D47A1]">REVERA MAGAZINE & EDITORIAL REVIEWS</h1>
            <span className="text-xs font-mono bg-[#E3F2FD] text-[#0D47A1] px-2 py-0.5 rounded font-semibold border border-[#C9E2F7]">
              ISSUE #42
            </span>
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            In-depth acoustic engineering breakdowns, acoustic chamber analysis, and reference test impressions.
          </p>
        </div>

        {/* Article Selector */}
        <select
          value={selectedIem.id}
          onChange={(e) => {
            const found = IEM_LIST.find(i => i.id === e.target.value);
            setSelectedIem(found);
            onSelectIem(found);
          }}
          className="bg-[#F8FBFF] border border-[#C9E2F7] text-xs font-extrabold text-[#0D47A1] p-2.5 rounded-lg outline-none cursor-pointer"
        >
          {IEM_LIST.map(i => (
            <option key={i.id} value={i.id}>Editorial Article: {i.name}</option>
          ))}
        </select>
      </div>

      {/* Main Magazine Article Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Main Editorial Review */}
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-8 shadow-xs space-y-6">
          
          <div className="border-b border-[#C9E2F7] pb-4">
            <span className="text-xs font-bold text-[#2196F3] uppercase tracking-wider">
              IN-DEPTH ACOUSTIC EDITORIAL REVIEW
            </span>
            <h2 className="text-2xl font-extrabold text-[#111827] mt-1">
              {selectedIem.name}: Technical Mastery or Pure Acoustic Emotion?
            </h2>
            <div className="flex items-center gap-4 text-xs text-[#6B7280] mt-2 font-medium">
              <span>By {selectedIem.review.author}</span>
              <span>•</span>
              <span>Driver Setup: {selectedIem.driverTopology}</span>
              <span>•</span>
              <span className="text-[#0D47A1] font-bold font-mono">${selectedIem.price}</span>
            </div>
          </div>

          {/* Verdict Box */}
          <div className="bg-[#F8FBFF] border-l-4 border-l-[#0D47A1] border border-[#C9E2F7] p-4 rounded-r-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0D47A1] uppercase tracking-wider">
              <Award size={16} />
              <span>Editorial Master Verdict</span>
            </div>
            <p className="text-sm font-semibold text-[#111827] mt-1">
              "{selectedIem.review.verdict}"
            </p>
          </div>

          {/* Acoustic Impressions Section */}
          <div className="space-y-4 text-sm text-[#4B5563] leading-relaxed">
            <h3 className="text-base font-extrabold text-[#111827]">Sub-bass Impact & Transient Response</h3>
            <p>
              The {selectedIem.name} utilizes a specialized acoustic arrangement ({selectedIem.specs.bassType}) to deliver visceral rumble that remains cleanly separated from lower midrange male vocals. Transient decay is extremely fast without mud.
            </p>

            <h3 className="text-base font-extrabold text-[#111827]">Midrange Clarity & Pinna Gain Alignment</h3>
            <p>
              Vocal presentation is rendered with {selectedIem.specs.midrangeType}. The 3kHz pinna gain peak aligns closely with human ear canal transfer functions, preventing ear fatigue during extended sessions.
            </p>

            <h3 className="text-base font-extrabold text-[#111827]">Treble Extension & Holographic Soundstage</h3>
            <p>
              High frequency resolution is handled with {selectedIem.specs.trebleType}. Cymbal strikes shimmer naturally with zero sibilance spikes.
            </p>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-[#C9E2F7] flex justify-end">
            <button
              onClick={() => onSelectWorkspace('studio')}
              className="flex items-center gap-2 bg-[#2196F3] hover:bg-[#1976D2] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <span>Analyze Frequency Measurement Graph</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {/* Right 4 Cols: Score Breakdown & Pros/Cons */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Rating Radar / Score Box */}
          <div className="bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#C9E2F7]">
              <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">Acoustic Scorecard</span>
              <span className="text-sm font-mono font-extrabold text-[#0D47A1] bg-[#E3F2FD] px-2 py-0.5 rounded border border-[#C9E2F7]">
                ★ {selectedIem.rating} / 5.0
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[#111827]">Technicalities</span>
                  <span className="font-mono font-bold text-[#0D47A1]">{selectedIem.scores.technicalities}/100</span>
                </div>
                <div className="w-full bg-[#E3F2FD] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0D47A1] h-full" style={{ width: `${selectedIem.scores.technicalities}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[#111827]">Timbre & Realism</span>
                  <span className="font-mono font-bold text-[#2196F3]">{selectedIem.scores.timbre}/100</span>
                </div>
                <div className="w-full bg-[#E3F2FD] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2196F3] h-full" style={{ width: `${selectedIem.scores.timbre}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[#111827]">Soundstage Depth</span>
                  <span className="font-mono font-bold text-[#4B5563]">{selectedIem.scores.soundstage}/100</span>
                </div>
                <div className="w-full bg-[#E3F2FD] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4B5563] h-full" style={{ width: `${selectedIem.scores.soundstage}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Pros & Cons Cards */}
          <div className="bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#22C55E] mb-2 uppercase">
                <ThumbsUp size={16} />
                <span>Acoustic Strengths</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#4B5563]">
                {selectedIem.review.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#22C55E] font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#C9E2F7]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#EF4444] mb-2 uppercase">
                <ThumbsDown size={16} />
                <span>Trade-offs & Considerations</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#4B5563]">
                {selectedIem.review.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
