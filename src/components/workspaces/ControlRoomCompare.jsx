import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Sliders, ArrowRightLeft, Check, Play, Pause } from 'lucide-react';
import FrequencyGraphCanvas from '../audio/FrequencyGraphCanvas';
import { IEM_LIST } from '../../data/iemData';
import { playSynthSample, stopSample } from '../../services/audioEngine';
import { AUDIO_SAMPLES } from '../../data/iemData';

export default function ControlRoomCompare({ activeIem, onSelectIem }) {
  const [iemA, setIemA] = useState(activeIem);
  const [iemB, setIemB] = useState(IEM_LIST.find(i => i.id !== activeIem.id) || IEM_LIST[1]);
  const [activeAbPlayer, setActiveAbPlayer] = useState('A');
  const [isPlayingAb, setIsPlayingAb] = useState(false);

  const toggleAbAudio = (target) => {
    if (isPlayingAb && activeAbPlayer === target) {
      stopSample();
      setIsPlayingAb(false);
    } else {
      setActiveAbPlayer(target);
      const chosenIem = target === 'A' ? iemA : iemB;
      playSynthSample(AUDIO_SAMPLES[0], chosenIem.curve);
      setIsPlayingAb(true);
    }
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
            <Activity size={20} className="text-[#0D47A1]" />
            <h1 className="text-xl font-extrabold text-[#0D47A1]">CONTROL ROOM: SIDE-BY-SIDE COMPARISON</h1>
            <span className="text-xs font-mono bg-[#E3F2FD] text-[#0D47A1] px-2 py-0.5 rounded font-semibold border border-[#C9E2F7]">
              DUAL IEM DSP MATRIX
            </span>
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Compare frequency response graphs, acoustic specs, and perform live A/B sound simulation.
          </p>
        </div>
      </div>

      {/* Selector Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IEM A */}
        <div className="bg-[#FFFFFF] border-2 border-[#0D47A1] rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider">IEM CHANNEL A</span>
            <button
              onClick={() => toggleAbAudio('A')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isPlayingAb && activeAbPlayer === 'A'
                  ? 'bg-[#0D47A1] text-white'
                  : 'bg-[#E3F2FD] text-[#0D47A1] hover:bg-[#90CAF9]'
              }`}
            >
              {isPlayingAb && activeAbPlayer === 'A' ? <Pause size={14} /> : <Play size={14} />}
              <span>Listen A</span>
            </button>
          </div>

          <select
            value={iemA.id}
            onChange={(e) => {
              const selected = IEM_LIST.find(i => i.id === e.target.value);
              setIemA(selected);
              onSelectIem(selected);
            }}
            className="w-full bg-[#F8FBFF] border border-[#C9E2F7] text-sm font-extrabold text-[#0D47A1] p-2.5 rounded-lg outline-none cursor-pointer"
          >
            {IEM_LIST.map(i => (
              <option key={i.id} value={i.id}>{i.brand} - {i.name} (${i.price})</option>
            ))}
          </select>
        </div>

        {/* IEM B */}
        <div className="bg-[#FFFFFF] border-2 border-[#2196F3] rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2196F3] uppercase tracking-wider">IEM CHANNEL B</span>
            <button
              onClick={() => toggleAbAudio('B')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isPlayingAb && activeAbPlayer === 'B'
                  ? 'bg-[#2196F3] text-white'
                  : 'bg-[#E3F2FD] text-[#2196F3] hover:bg-[#90CAF9]'
              }`}
            >
              {isPlayingAb && activeAbPlayer === 'B' ? <Pause size={14} /> : <Play size={14} />}
              <span>Listen B</span>
            </button>
          </div>

          <select
            value={iemB.id}
            onChange={(e) => setIemB(IEM_LIST.find(i => i.id === e.target.value))}
            className="w-full bg-[#F8FBFF] border border-[#C9E2F7] text-sm font-extrabold text-[#2196F3] p-2.5 rounded-lg outline-none cursor-pointer"
          >
            {IEM_LIST.map(i => (
              <option key={i.id} value={i.id}>{i.brand} - {i.name} (${i.price})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dual Curve Overlay Graph */}
      <div className="bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs">
        <FrequencyGraphCanvas
          curves={[
            { id: iemA.id, name: `A: ${iemA.name}`, points: iemA.curve, color: '#0D47A1', isTarget: false },
            { id: iemB.id, name: `B: ${iemB.name}`, points: iemB.curve, color: '#2196F3', isTarget: false }
          ]}
          height={380}
        />
      </div>

      {/* Side-by-Side Spec Comparison Matrix Table */}
      <div className="bg-[#FFFFFF] border border-[#C9E2F7] rounded-xl p-5 shadow-xs overflow-x-auto">
        <h3 className="text-xs font-bold text-[#0D47A1] uppercase tracking-wider mb-4">
          ACOUSTIC SPEC MATRIX COMPARISON
        </h3>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#C9E2F7] text-[#6B7280]">
              <th className="py-2.5 font-semibold">PARAMETER</th>
              <th className="py-2.5 font-extrabold text-[#0D47A1]">{iemA.name} (A)</th>
              <th className="py-2.5 font-extrabold text-[#2196F3]">{iemB.name} (B)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9E2F7] text-[#111827]">
            <tr>
              <td className="py-3 font-semibold text-[#4B5563]">Price</td>
              <td className="py-3 font-mono font-bold text-[#0D47A1]">${iemA.price}</td>
              <td className="py-3 font-mono font-bold text-[#2196F3]">${iemB.price}</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-[#4B5563]">Driver Topology</td>
              <td className="py-3 font-medium">{iemA.driverTopology}</td>
              <td className="py-3 font-medium">{iemB.driverTopology}</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-[#4B5563]">Sound Signature</td>
              <td className="py-3 font-medium">{iemA.soundSignature}</td>
              <td className="py-3 font-medium">{iemB.soundSignature}</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-[#4B5563]">Impedance / Sensitivity</td>
              <td className="py-3 font-mono">{iemA.impedance} $\Omega$ / {iemA.sensitivity} dB</td>
              <td className="py-3 font-mono">{iemB.impedance} $\Omega$ / {iemB.sensitivity} dB</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-[#4B5563]">Technicalities Score</td>
              <td className="py-3 font-mono font-bold text-[#0D47A1]">{iemA.scores.technicalities}/100</td>
              <td className="py-3 font-mono font-bold text-[#2196F3]">{iemB.scores.technicalities}/100</td>
            </tr>
            <tr>
              <td className="py-3 font-semibold text-[#4B5563]">Resolution Score</td>
              <td className="py-3 font-mono font-bold text-[#0D47A1]">{iemA.scores.resolution}/100</td>
              <td className="py-3 font-mono font-bold text-[#2196F3]">{iemB.scores.resolution}/100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
