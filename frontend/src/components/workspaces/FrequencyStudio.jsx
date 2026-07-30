import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Layers, CheckSquare, Square, Info, Sliders, RefreshCw } from 'lucide-react';
import FrequencyGraphCanvas from '../audio/FrequencyGraphCanvas';
import { IEM_LIST, TARGET_CURVES } from '../../data/iemData';

export default function FrequencyStudio({
  activeIem,
  onSelectIem,
  eqGain,
  onEqChange
}) {
  const [activeTargets, setActiveTargets] = useState({
    harman: true,
    ief_neutral: false,
    diffuse_field: false
  });

  const toggleTarget = (key) => {
    setActiveTargets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const curvesToRender = [];

  curvesToRender.push({
    id: activeIem.id,
    name: activeIem.name,
    points: activeIem.curve,
    color: '#2F5D50',
    isTarget: false
  });

  if (activeTargets.harman) {
    curvesToRender.push({
      id: 'harman',
      name: TARGET_CURVES.harman.name,
      points: TARGET_CURVES.harman.points,
      color: TARGET_CURVES.harman.color,
      isTarget: true
    });
  }
  if (activeTargets.ief_neutral) {
    curvesToRender.push({
      id: 'ief_neutral',
      name: TARGET_CURVES.ief_neutral.name,
      points: TARGET_CURVES.ief_neutral.points,
      color: TARGET_CURVES.ief_neutral.color,
      isTarget: true
    });
  }
  if (activeTargets.diffuse_field) {
    curvesToRender.push({
      id: 'diffuse_field',
      name: TARGET_CURVES.diffuse_field.name,
      points: TARGET_CURVES.diffuse_field.points,
      color: TARGET_CURVES.diffuse_field.color,
      isTarget: true
    });
  }

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
            <BarChart2 size={20} className="text-[#2F5D50]" />
            <h1 className="text-xl font-extrabold text-[#1B1B1B]">FREQUENCY STUDIO WORKBENCH</h1>
            <span className="text-xs font-mono bg-[#ECEDE8] text-[#2F5D50] px-2 py-0.5 rounded font-semibold border border-[#D8DBD2]">
              ACOUSTIC MEASUREMENT ENGINE
            </span>
          </div>
          <p className="text-xs text-[#5E615C] mt-1">
            Compare raw frequency response measurements against industry targets and tune custom parametric EQ profiles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#8C9188]">Inspected IEM:</span>
          <select
            value={activeIem.id}
            onChange={(e) => onSelectIem(IEM_LIST.find(i => i.id === e.target.value))}
            className="bg-[#F8F8F6] border border-[#D8DBD2] text-xs font-bold text-[#2F5D50] px-3 py-2 rounded-lg outline-none cursor-pointer hover:border-[#C7CBC0]"
          >
            {IEM_LIST.map(item => (
              <option key={item.id} value={item.id}>{item.brand} - {item.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 9 Cols: Full Canvas Graph */}
        <div className="lg:col-span-9 bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D8DBD2]">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-[#2F5D50]" />
              <span className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">
                Target Reference Overlays
              </span>
            </div>

            <div className="flex items-center gap-3">
              {Object.keys(TARGET_CURVES).map(key => {
                const target = TARGET_CURVES[key];
                const isChecked = activeTargets[key];
                return (
                  <button
                    key={key}
                    onClick={() => toggleTarget(key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-[#ECEDE8] text-[#2F5D50] border-[#2F5D50]'
                        : 'bg-[#F8F8F6] text-[#8C9188] border-[#D8DBD2]'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: target.color }} />
                    <span>{target.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <FrequencyGraphCanvas
            curves={curvesToRender}
            interactiveEq={true}
            eqGain={eqGain}
            height={420}
          />
        </div>

        {/* Right 3 Cols: Parametric Tuning & Landmarks */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#D8DBD2]">
              <span className="text-xs font-bold text-[#2F5D50] uppercase tracking-wider">Parametric EQ</span>
              <button
                onClick={() => onEqChange({ bass: 0, mid: 0, treble: 0 })}
                className="p-1 text-[#8C9188] hover:text-[#2F5D50] cursor-pointer"
                title="Reset EQ"
              >
                <RefreshCw size={14} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#2F5D50] font-semibold block mb-1">Sub-bass Shelf (+{eqGain.bass} dB)</span>
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
                <span className="text-[#1B1B1B] font-semibold block mb-1">Midrange (+{eqGain.mid} dB)</span>
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
                <span className="text-[#9B7E46] font-semibold block mb-1">Treble Air (+{eqGain.treble} dB)</span>
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

          <div className="bg-[#F8F8F6] border border-[#D8DBD2] rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F5D50]">
              <Info size={16} />
              <span>Acoustic Landmarks</span>
            </div>

            <div className="space-y-2 text-xs text-[#5E615C]">
              <div className="p-2 bg-white border border-[#D8DBD2] rounded-lg">
                <span className="font-bold text-[#1B1B1B] block">20Hz - 100Hz Sub-bass</span>
                <p className="text-[11px] text-[#8C9188]">Visceral rumble and physical bass impact without mid bleed.</p>
              </div>

              <div className="p-2 bg-white border border-[#D8DBD2] rounded-lg">
                <span className="font-bold text-[#2F5D50] block">3kHz Pinna Gain</span>
                <p className="text-[11px] text-[#8C9188]">Ear canal resonance compensation for natural vocal presence.</p>
              </div>

              <div className="p-2 bg-white border border-[#D8DBD2] rounded-lg">
                <span className="font-bold text-[#9B7E46] block">8kHz - 15kHz Air</span>
                <p className="text-[11px] text-[#8C9188]">Micro-detail extension, cymbal shimmer, and soundstage ambience.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
