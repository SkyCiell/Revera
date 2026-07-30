import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Sliders, Award, Zap, ArrowRight, BarChart2, CheckCircle2, ChevronLeft, ChevronRight, Info, Play, Sparkles, Activity, Layers } from 'lucide-react';
import FrequencyGraphCanvas from '../audio/FrequencyGraphCanvas';
import ContextInspector from '../audio/ContextInspector';
import { IEM_LIST, TARGET_CURVES, AUDIO_SAMPLES } from '../../data/iemData';
import { playSynthSample } from '../../services/audioEngine';

export default function ExplorationHub({
  activeIem,
  onSelectIem,
  onSelectWorkspace,
  eqGain,
  onEqChange
}) {
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('highlights');

  const currentIndex = IEM_LIST.findIndex(i => i.id === activeIem.id);

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + IEM_LIST.length) % IEM_LIST.length;
    onSelectIem(IEM_LIST[nextIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % IEM_LIST.length;
    onSelectIem(IEM_LIST[nextIdx]);
  };

  const defaultImgUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfG9xYCRRX3Lm0xW4jiOJuN1NsnKTuOnGrm41LE5p_ayhg832cjdKE5Xu7&s=10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="space-y-8"
    >
      
      {/* ========================================================= */}
      {/* ULTRA-MODERN SPLIT HERO WORKSTATION STAGE */}
      {/* ========================================================= */}
      <div 
        className="relative rounded-2xl overflow-hidden border-2 border-[#D8DBD2] shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[540px]"
        style={{ background: 'linear-gradient(to right, #1B1B1B 50%, #9B7E46 50%)' }}
      >
        
        {/* LEFT STAGE (COLS 1-5): DARK INDUSTRIAL SLATE */}
        <div className="lg:col-span-5 relative text-white p-8 md:p-10 flex flex-col justify-between overflow-hidden">
          
          {/* Vertical Rotated Watermark Model Text */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[11px] font-mono tracking-[0.3em] uppercase text-[#8C9188] pointer-events-none select-none hidden sm:block">
            {activeIem.brand} • {activeIem.name}
          </div>

          {/* Top Bar inside Left Panel */}
          <div className="flex items-center justify-between sm:pl-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#2F5D50] text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
                R
              </div>
              <span className="font-extrabold text-sm tracking-wider uppercase">REVERA OS</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-[#8C9188] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#3F7D58] inline-block animate-pulse" />
              <span>LIVE AUDIO MATRIX</span>
            </div>
          </div>

          {/* Center Title & Counter inside Left Panel */}
          <div className="my-6 sm:pl-8 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-mono font-extrabold text-[#9B7E46] block">
                0{currentIndex + 1}
              </span>
              <span className="text-xs font-mono text-[#8C9188]">/ 0{IEM_LIST.length}</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase">
              {activeIem.name}
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold bg-[#2F5D50] text-white px-2.5 py-1 rounded-md border border-[#3F7D58]">
                {activeIem.soundSignature}
              </span>
              <span className="text-xs font-mono text-[#8C9188] bg-[#2A2A2A] px-2 py-1 rounded-md border border-[#333]">
                {activeIem.driverTopology}
              </span>
            </div>

            <p className="text-xs text-[#8C9188] leading-relaxed mt-2 max-w-sm">
              {activeIem.overview}
            </p>
          </div>

          {/* Bottom Controls inside Left Panel */}
          <div className="flex items-center justify-between sm:pl-8 pt-4 border-t border-[#333333]">
            <div className="flex items-center gap-3 text-xs font-mono">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 bg-[#2A2A2A] hover:bg-[#383838] text-white px-3 py-1.5 rounded-lg border border-[#444] cursor-pointer transition-colors"
              >
                <ChevronLeft size={16} /> PREV
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-1 bg-[#2A2A2A] hover:bg-[#383838] text-white px-3 py-1.5 rounded-lg border border-[#444] cursor-pointer transition-colors"
              >
                NEXT <ChevronRight size={16} />
              </button>
            </div>

            <span className="text-sm font-mono font-extrabold text-[#9B7E46] bg-[#2A2A2A] px-3 py-1 rounded-lg border border-[#444]">
              ${activeIem.price} USD
            </span>
          </div>

        </div>

        {/* CENTER STAGE (COLS 6-7): DEDICATED CENTERPIECE IMAGE COLUMN */}
        <div className="lg:col-span-2 relative flex items-center justify-center p-4 z-20">
          <div className="relative group">
            {/* Seamless blended image container with drop shadow */}
            <div className="w-48 h-76 rounded-2xl bg-white border-2 border-[#9B7E46] shadow-2xl p-3 flex items-center justify-center overflow-hidden transition-all duration-300 transform group-hover:scale-105">
              <img
                src={activeIem.imageUrl || defaultImgUrl}
                alt={activeIem.name}
                className="w-full h-full object-contain mix-blend-multiply filter contrast-105"
              />
            </div>
            {/* Clean Spec Pill */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#2F5D50] text-white px-3 py-1 rounded-full text-[10px] font-mono font-extrabold border border-[#9B7E46] shadow-lg tracking-wider whitespace-nowrap">
              {activeIem.impedance} Ω / {activeIem.sensitivity} dB
            </div>
          </div>
        </div>

        {/* RIGHT STAGE (COLS 8-12): WARM INDUSTRIAL BRONZE TEXT */}
        <div className="lg:col-span-5 relative text-white p-8 md:p-10 flex flex-col justify-between overflow-hidden">
          
          {/* Top Bar inside Right Panel */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/90">
              ACOUSTIC HARDWARE MATRIX
            </span>

            <select
              value={activeIem.id}
              onChange={(e) => onSelectIem(IEM_LIST.find(i => i.id === e.target.value))}
              className="bg-[#84693B] border border-white/30 text-xs font-bold text-white px-3 py-1.5 rounded-lg outline-none cursor-pointer hover:border-white"
            >
              {IEM_LIST.map(i => (
                <option key={i.id} value={i.id}>{i.brand} - {i.name}</option>
              ))}
            </select>
          </div>

          {/* Center Specs / Highlights Tabs inside Right Panel */}
          <div className="my-6 space-y-6">
            
            {/* Tab Switches */}
            <div className="flex items-center gap-2 bg-[#84693B] p-1 rounded-lg w-fit border border-white/20">
              <button
                onClick={() => setActiveTab('highlights')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'highlights'
                    ? 'bg-white text-[#9B7E46] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Highlights
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-white text-[#9B7E46] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Specifications
              </button>
            </div>

            {/* Tab Body */}
            {activeTab === 'highlights' ? (
              <ul className="space-y-3 text-xs md:text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                  <span><strong>Driver Architecture:</strong> {activeIem.driverTopology}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                  <span><strong>Acoustic Tuning:</strong> {activeIem.specs.bassType}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                  <span><strong>Ear-Tip Synergy:</strong> {activeIem.specs.recommendedTips}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                  <span><strong>Cable Synergy:</strong> {activeIem.specs.recommendedCable}</span>
                </li>
              </ul>
            ) : (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#84693B] p-3 rounded-lg border border-white/20">
                  <span className="text-[10px] text-white/70 block uppercase">Impedance</span>
                  <span className="font-mono font-bold text-sm">{activeIem.impedance} Ω</span>
                </div>
                <div className="bg-[#84693B] p-3 rounded-lg border border-white/20">
                  <span className="text-[10px] text-white/70 block uppercase">Sensitivity</span>
                  <span className="font-mono font-bold text-sm">{activeIem.sensitivity} dB/mW</span>
                </div>
                <div className="bg-[#84693B] p-3 rounded-lg border border-white/20">
                  <span className="text-[10px] text-white/70 block uppercase">Connector</span>
                  <span className="font-mono font-bold text-xs">{activeIem.connector}</span>
                </div>
                <div className="bg-[#84693B] p-3 rounded-lg border border-white/20">
                  <span className="text-[10px] text-white/70 block uppercase">Isolation</span>
                  <span className="font-mono font-bold text-xs">{activeIem.specs.isolation}</span>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Actions inside Right Panel */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/20">
            <button
              onClick={() => onSelectWorkspace('studio')}
              className="flex items-center gap-2 bg-white text-[#9B7E46] hover:bg-[#F8F8F6] px-4 py-2 rounded-lg text-xs font-extrabold cursor-pointer transition-all shadow-xs"
            >
              <BarChart2 size={16} />
              <span>Inspect Frequency Studio</span>
            </button>

            <button
              onClick={() => {
                playSynthSample(AUDIO_SAMPLES[0], activeIem.curve);
              }}
              className="flex items-center gap-2 bg-[#2F5D50] hover:bg-[#24483E] text-white px-4 py-2 rounded-lg text-xs font-extrabold cursor-pointer transition-all shadow-xs"
            >
              <Play size={16} />
              <span>Play A/B Test</span>
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* SECONDARY SECTION: WORKSTATION CANVAS & PARAMETRIC RACK */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Main Interactive Graph Monitor */}
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio size={18} className="text-[#2F5D50]" />
              <h2 className="text-sm font-extrabold text-[#1B1B1B]">ACTIVE IEM ACOUSTIC SIGNATURE</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8C9188]">Target Reference:</span>
              <span className="text-xs font-bold text-[#2F5D50] bg-[#ECEDE8] px-2 py-0.5 rounded border border-[#D8DBD2]">
                Harman 2019v2
              </span>
            </div>
          </div>

          <FrequencyGraphCanvas
            curves={[
              { id: 'harman', name: 'Harman Target', points: TARGET_CURVES.harman.points, color: '#2F5D50', isTarget: true },
              { id: activeIem.id, name: activeIem.name, points: activeIem.curve, color: '#9B7E46', isTarget: false }
            ]}
            interactiveEq={true}
            eqGain={eqGain}
            height={320}
          />
        </div>

        {/* Right 4 Cols: Parametric Quick Equalizer Rack */}
        <div className="lg:col-span-4 bg-[#F8F8F6] border border-[#D8DBD2] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#D8DBD2]">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-[#2F5D50]" />
                <h3 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Quick Parametric Rack</h3>
              </div>
              <button
                onClick={() => onEqChange({ bass: 0, mid: 0, treble: 0 })}
                className="text-[10px] font-mono text-[#2F5D50] hover:underline cursor-pointer"
              >
                Reset EQ
              </button>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#1B1B1B]">Sub-bass Shelf (20-100Hz)</span>
                  <span className="font-mono font-bold text-[#2F5D50]">
                    {eqGain.bass > 0 ? `+${eqGain.bass}` : eqGain.bass} dB
                  </span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="0.5"
                  value={eqGain.bass}
                  onChange={(e) => onEqChange({ ...eqGain, bass: parseFloat(e.target.value) })}
                  className="w-full accent-[#2F5D50] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#1B1B1B]">Midrange Gain (500-2kHz)</span>
                  <span className="font-mono font-bold text-[#2F5D50]">
                    {eqGain.mid > 0 ? `+${eqGain.mid}` : eqGain.mid} dB
                  </span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="0.5"
                  value={eqGain.mid}
                  onChange={(e) => onEqChange({ ...eqGain, mid: parseFloat(e.target.value) })}
                  className="w-full accent-[#2F5D50] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#5E615C]">Treble Air Boost (6k-20kHz)</span>
                  <span className="font-mono font-bold text-[#9B7E46]">
                    {eqGain.treble > 0 ? `+${eqGain.treble}` : eqGain.treble} dB
                  </span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="0.5"
                  value={eqGain.treble}
                  onChange={(e) => onEqChange({ ...eqGain, treble: parseFloat(e.target.value) })}
                  className="w-full accent-[#9B7E46] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#ECEDE8] border border-[#D8DBD2] rounded-lg p-3 text-xs space-y-1">
            <span className="font-bold text-[#2F5D50] block">Real-time DSP Processing</span>
            <p className="text-[#5E615C]">
              Equalizer gain adjustments immediately reshape the active graph and apply to Web Audio playback.
            </p>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* THIRD SECTION: CURATED IEM WORKSTATION MATRIX TILES */}
      {/* ========================================================= */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-[#2F5D50]" />
            <h2 className="text-sm font-extrabold text-[#1B1B1B] uppercase tracking-wider">
              CURATED IEM WORKSTATION MATRIX
            </h2>
          </div>
          <span className="text-xs text-[#8C9188]">Select an IEM to load its full acoustic profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {IEM_LIST.map((iem, idx) => {
            const isSelected = activeIem.id === iem.id;

            return (
              <div
                key={iem.id}
                onClick={() => {
                  onSelectIem(iem);
                  setIsInspectorOpen(true);
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between bg-[#FFFFFF] ${
                  isSelected
                    ? 'border-2 border-[#2F5D50] shadow-md'
                    : 'border-[#D8DBD2] hover:border-[#C7CBC0] shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#2F5D50] uppercase tracking-wider">
                        {iem.brand}
                      </span>
                      <h3 className="text-base font-extrabold text-[#1B1B1B] mt-0.5">{iem.name}</h3>
                    </div>
                    <span className="text-sm font-mono font-extrabold text-[#9B7E46] bg-[#ECEDE8] px-2.5 py-1 rounded-lg border border-[#D8DBD2]">
                      ${iem.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#5E615C] mt-2 line-clamp-2">{iem.overview}</p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="text-[11px] font-semibold bg-[#ECEDE8] text-[#2F5D50] px-2 py-0.5 rounded border border-[#D8DBD2]">
                      {iem.driverTopology}
                    </span>
                    <span className="text-[11px] font-semibold bg-[#F8F8F6] text-[#5E615C] px-2 py-0.5 rounded border border-[#D8DBD2]">
                      {iem.soundSignature}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D8DBD2] grid grid-cols-4 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-[#8C9188] block">Technical</span>
                    <span className="text-xs font-mono font-bold text-[#2F5D50]">{iem.scores.technicalities}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C9188] block">Timbre</span>
                    <span className="text-xs font-mono font-bold text-[#1B1B1B]">{iem.scores.timbre}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C9188] block">Soundstage</span>
                    <span className="text-xs font-mono font-bold text-[#5E615C]">{iem.scores.soundstage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C9188] block">Resolution</span>
                    <span className="text-xs font-mono font-bold text-[#9B7E46]">{iem.scores.resolution}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sliding Context Inspector Panel */}
      <ContextInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        iem={activeIem}
        onSelectWorkspace={onSelectWorkspace}
      />
    </motion.div>
  );
}
