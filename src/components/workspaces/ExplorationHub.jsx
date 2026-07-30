import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Sliders, Award, Zap, ArrowUpRight, BarChart2, CheckCircle2, ShieldAlert } from 'lucide-react';
import FrequencyGraphCanvas from '../audio/FrequencyGraphCanvas';
import { IEM_LIST, TARGET_CURVES } from '../../data/iemData';

export default function ExplorationHub({
  activeIem,
  onSelectIem,
  onSelectWorkspace,
  eqGain,
  onEqChange
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Top Banner / Studio Control Header */}
      <div className="bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2196F3]" />
            <h1 className="text-xl font-extrabold text-[#0D47A1]">AUDIO EXPLORATION HUB</h1>
            <span className="text-xs font-mono bg-[#E3F2FD] text-[#0D47A1] px-2 py-0.5 rounded font-semibold border border-[#C9E2F7]">
              OS WORKSTATION v2.4
            </span>
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Asymmetric multi-zone control room. Explore IEM frequency signatures, target curve affinity, and driver topologies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectWorkspace('studio')}
            className="flex items-center gap-2 bg-[#2196F3] hover:bg-[#1976D2] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <BarChart2 size={16} />
            <span>Launch Frequency Studio</span>
          </button>
        </div>
      </div>

      {/* Asymmetric Composition Zone 1: Main Graph & Quick Parametric Rack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Main Interactive Graph Monitor */}
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio size={18} className="text-[#0D47A1]" />
              <h2 className="text-sm font-extrabold text-[#111827]">ACTIVE IEM ACOUSTIC SIGNATURE</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B7280]">Target Reference:</span>
              <span className="text-xs font-bold text-[#0D47A1] bg-[#E3F2FD] px-2 py-0.5 rounded border border-[#C9E2F7]">
                Harman 2019v2
              </span>
            </div>
          </div>

          {/* Graph Canvas */}
          <FrequencyGraphCanvas
            curves={[
              { id: 'harman', name: 'Harman Target', points: TARGET_CURVES.harman.points, color: '#0D47A1', isTarget: true },
              { id: activeIem.id, name: activeIem.name, points: activeIem.curve, color: '#2196F3', isTarget: false }
            ]}
            interactiveEq={true}
            eqGain={eqGain}
            height={320}
          />
        </div>

        {/* Right 4 Cols: Parametric Quick Equalizer Rack */}
        <div className="lg:col-span-4 bg-[#F8FBFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#C9E2F7]">
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-[#0D47A1]" />
                <h3 className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">Quick Parametric Rack</h3>
              </div>
              <button
                onClick={() => onEqChange({ bass: 0, mid: 0, treble: 0 })}
                className="text-[10px] font-mono text-[#2196F3] hover:underline cursor-pointer"
              >
                Reset EQ
              </button>
            </div>

            {/* EQ Sliders */}
            <div className="space-y-4 mt-4">
              {/* Bass Shelf */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#0D47A1]">Sub-bass Shelf (20-100Hz)</span>
                  <span className="font-mono font-bold text-[#0D47A1]">
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
                  className="w-full accent-[#0D47A1] cursor-pointer"
                />
              </div>

              {/* Midrange */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#2196F3]">Midrange Gain (500-2kHz)</span>
                  <span className="font-mono font-bold text-[#2196F3]">
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
                  className="w-full accent-[#2196F3] cursor-pointer"
                />
              </div>

              {/* Treble Air */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#4B5563]">Treble Air Boost (6k-20kHz)</span>
                  <span className="font-mono font-bold text-[#4B5563]">
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
                  className="w-full accent-[#90CAF9] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#E3F2FD] border border-[#C9E2F7] rounded-lg p-3 text-xs space-y-1">
            <span className="font-bold text-[#0D47A1] block">Real-time DSP Processing</span>
            <p className="text-[#4B5563]">
              Equalizer gain adjustments immediately reshape the active graph and apply to Web Audio playback.
            </p>
          </div>
        </div>

      </div>

      {/* Asymmetric Composition Zone 2: Modular Trending IEM Rack Tiles */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-[#0D47A1]" />
            <h2 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">
              CURATED IEM WORKSTATION MATRIX
            </h2>
          </div>
          <span className="text-xs text-[#6B7280]">Select an IEM to load its full acoustic profile</span>
        </div>

        {/* Asymmetric Grid: 1 large card spanning 2 columns, others 1 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {IEM_LIST.map((iem, idx) => {
            const isSelected = activeIem.id === iem.id;
            const isFeatured = idx === 0;

            return (
              <div
                key={iem.id}
                onClick={() => onSelectIem(iem)}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 bg-[#F8FBFF]' : 'bg-[#FFFFFF]'
                } ${
                  isSelected
                    ? 'border-2 border-[#0D47A1] shadow-md'
                    : 'border-[#C9E2F7] hover:border-[#2196F3] shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#2196F3] uppercase tracking-wider">
                        {iem.brand}
                      </span>
                      <h3 className="text-base font-extrabold text-[#111827] mt-0.5">{iem.name}</h3>
                    </div>
                    <span className="text-sm font-mono font-extrabold text-[#0D47A1] bg-[#E3F2FD] px-2.5 py-1 rounded-lg border border-[#C9E2F7]">
                      ${iem.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#4B5563] mt-2 line-clamp-2">{iem.overview}</p>

                  {/* Specs Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="text-[11px] font-semibold bg-[#E3F2FD] text-[#0D47A1] px-2 py-0.5 rounded border border-[#C9E2F7]">
                      {iem.driverTopology}
                    </span>
                    <span className="text-[11px] font-semibold bg-[#F8FBFF] text-[#4B5563] px-2 py-0.5 rounded border border-[#C9E2F7]">
                      {iem.soundSignature}
                    </span>
                  </div>
                </div>

                {/* Score Meters */}
                <div className="mt-4 pt-3 border-t border-[#C9E2F7] grid grid-cols-4 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-[#6B7280] block">Technical</span>
                    <span className="text-xs font-mono font-bold text-[#0D47A1]">{iem.scores.technicalities}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7280] block">Timbre</span>
                    <span className="text-xs font-mono font-bold text-[#2196F3]">{iem.scores.timbre}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7280] block">Soundstage</span>
                    <span className="text-xs font-mono font-bold text-[#4B5563]">{iem.scores.soundstage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7280] block">Resolution</span>
                    <span className="text-xs font-mono font-bold text-[#0D47A1]">{iem.scores.resolution}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </motion.div>
  );
}
