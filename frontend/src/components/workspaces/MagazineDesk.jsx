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
      <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-[#2F5D50]" />
            <h1 className="text-xl font-extrabold text-[#1B1B1B]">REVERA MAGAZINE & EDITORIAL REVIEWS</h1>
            <span className="text-xs font-mono bg-[#ECEDE8] text-[#2F5D50] px-2 py-0.5 rounded font-semibold border border-[#D8DBD2]">
              ISSUE #42
            </span>
          </div>
          <p className="text-xs text-[#5E615C] mt-1">
            In-depth acoustic engineering breakdowns, acoustic chamber analysis, and reference test impressions.
          </p>
        </div>

        <select
          value={selectedIem.id}
          onChange={(e) => {
            const found = IEM_LIST.find(i => i.id === e.target.value);
            setSelectedIem(found);
            onSelectIem(found);
          }}
          className="bg-[#F8F8F6] border border-[#D8DBD2] text-xs font-extrabold text-[#2F5D50] p-2.5 rounded-lg outline-none cursor-pointer"
        >
          {IEM_LIST.map(i => (
            <option key={i.id} value={i.id}>Editorial Article: {i.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-8 shadow-xs space-y-6">
          <div className="border-b border-[#D8DBD2] pb-4">
            <span className="text-xs font-bold text-[#9B7E46] uppercase tracking-wider">
              IN-DEPTH ACOUSTIC EDITORIAL REVIEW
            </span>
            <h2 className="text-2xl font-extrabold text-[#1B1B1B] mt-1">
              {selectedIem.name}: Technical Mastery or Pure Acoustic Emotion?
            </h2>
            <div className="flex items-center gap-4 text-xs text-[#8C9188] mt-2 font-medium">
              <span>By {selectedIem.review.author}</span>
              <span>•</span>
              <span>Driver Setup: {selectedIem.driverTopology}</span>
              <span>•</span>
              <span className="text-[#9B7E46] font-bold font-mono">${selectedIem.price}</span>
            </div>
          </div>

          <div className="bg-[#F8F8F6] border-l-4 border-l-[#2F5D50] border border-[#D8DBD2] p-4 rounded-r-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2F5D50] uppercase tracking-wider">
              <Award size={16} />
              <span>Editorial Master Verdict</span>
            </div>
            <p className="text-sm font-semibold text-[#1B1B1B] mt-1">
              "{selectedIem.review.verdict}"
            </p>
          </div>

          <div className="space-y-4 text-sm text-[#5E615C] leading-relaxed">
            <h3 className="text-base font-extrabold text-[#1B1B1B]">Sub-bass Impact & Transient Response</h3>
            <p>
              The {selectedIem.name} utilizes a specialized acoustic arrangement ({selectedIem.specs.bassType}) to deliver visceral rumble that remains cleanly separated from lower midrange male vocals. Transient decay is extremely fast without mud.
            </p>

            <h3 className="text-base font-extrabold text-[#1B1B1B]">Midrange Clarity & Pinna Gain Alignment</h3>
            <p>
              Vocal presentation is rendered with {selectedIem.specs.midrangeType}. The 3kHz pinna gain peak aligns closely with human ear canal transfer functions, preventing ear fatigue during extended sessions.
            </p>

            <h3 className="text-base font-extrabold text-[#1B1B1B]">Treble Extension & Holographic Soundstage</h3>
            <p>
              High frequency resolution is handled with {selectedIem.specs.trebleType}. Cymbal strikes shimmer naturally with zero sibilance spikes.
            </p>
          </div>

          <div className="pt-4 border-t border-[#D8DBD2] flex justify-end">
            <button
              onClick={() => onSelectWorkspace('studio')}
              className="flex items-center gap-2 bg-[#2F5D50] hover:bg-[#24483E] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <span>Analyze Frequency Measurement Graph</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#D8DBD2]">
              <span className="text-xs font-bold text-[#2F5D50] uppercase tracking-wider">Acoustic Scorecard</span>
              <span className="text-sm font-mono font-extrabold text-[#9B7E46] bg-[#ECEDE8] px-2 py-0.5 rounded border border-[#D8DBD2]">
                ★ {selectedIem.rating} / 5.0
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[#1B1B1B]">Technicalities</span>
                  <span className="font-mono font-bold text-[#2F5D50]">{selectedIem.scores.technicalities}/100</span>
                </div>
                <div className="w-full bg-[#ECEDE8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2F5D50] h-full" style={{ width: `${selectedIem.scores.technicalities}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[#1B1B1B]">Timbre & Realism</span>
                  <span className="font-mono font-bold text-[#1B1B1B]">{selectedIem.scores.timbre}/100</span>
                </div>
                <div className="w-full bg-[#ECEDE8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1B1B1B] h-full" style={{ width: `${selectedIem.scores.timbre}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[#1B1B1B]">Soundstage Depth</span>
                  <span className="font-mono font-bold text-[#9B7E46]">{selectedIem.scores.soundstage}/100</span>
                </div>
                <div className="w-full bg-[#ECEDE8] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#9B7E46] h-full" style={{ width: `${selectedIem.scores.soundstage}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3F7D58] mb-2 uppercase">
                <ThumbsUp size={16} />
                <span>Acoustic Strengths</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#5E615C]">
                {selectedIem.review.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#3F7D58] font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#D8DBD2]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D94A4A] mb-2 uppercase">
                <ThumbsDown size={16} />
                <span>Trade-offs & Considerations</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#5E615C]">
                {selectedIem.review.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#D94A4A] font-bold">•</span>
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
