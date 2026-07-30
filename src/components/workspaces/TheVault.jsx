import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Cpu, Shield, Layers, Disc, Check } from 'lucide-react';
import { IEM_LIST } from '../../data/iemData';

export default function TheVault({ activeIem, onSelectIem }) {
  const [selectedDriverType, setSelectedDriverType] = useState('all');

  const filtered = IEM_LIST.filter(iem => {
    if (selectedDriverType === 'all') return true;
    if (selectedDriverType === 'dynamic') return iem.driverTopology.includes('DD') || iem.driverTopology.includes('Dynamic');
    if (selectedDriverType === 'tribrid') return iem.driverTopology.includes('EST');
    if (selectedDriverType === 'ba') return iem.driverTopology.includes('BA') && !iem.driverTopology.includes('DD');
    return true;
  });

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
            <Box size={20} className="text-[#0D47A1]" />
            <h1 className="text-xl font-extrabold text-[#0D47A1]">THE VAULT: DIGITAL HARDWARE SHELF</h1>
            <span className="text-xs font-mono bg-[#E3F2FD] text-[#0D47A1] px-2 py-0.5 rounded font-semibold border border-[#C9E2F7]">
              HARDWARE RACK UNITS
            </span>
          </div>
          <p className="text-xs text-[#4B5563] mt-1">
            Digital shelf showcasing IEM driver architecture, ear-tip acoustic synergy, and cable matchings.
          </p>
        </div>

        {/* Filter rack */}
        <div className="flex items-center gap-1.5 bg-[#F8FBFF] border border-[#C9E2F7] rounded-lg p-1">
          {['all', 'dynamic', 'tribrid', 'ba'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedDriverType(type)}
              className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase transition-all cursor-pointer ${
                selectedDriverType === type
                  ? 'bg-[#0D47A1] text-white'
                  : 'text-[#4B5563] hover:bg-[#E3F2FD]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Digital Shelf Hardware Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(iem => {
          const isSelected = activeIem.id === iem.id;
          return (
            <div
              key={iem.id}
              onClick={() => onSelectIem(iem)}
              className={`bg-[#FFFFFF] border rounded-xl p-5 shadow-xs flex flex-col justify-between transition-all cursor-pointer ${
                isSelected
                  ? 'border-2 border-[#0D47A1] bg-[#F8FBFF]'
                  : 'border-[#C9E2F7] hover:border-[#2196F3]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#C9E2F7]">
                  <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-[#0D47A1]" />
                    <span className="text-xs font-bold text-[#0D47A1] uppercase">{iem.brand}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0D47A1] bg-[#E3F2FD] px-2 py-0.5 rounded border border-[#C9E2F7]">
                    ${iem.price}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#111827] mt-3">{iem.name}</h3>
                <p className="text-xs text-[#6B7280] mt-1 font-mono">{iem.driverTopology}</p>

                {/* Hardware Specs Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-[#F8FBFF] border border-[#C9E2F7] rounded-lg p-2">
                    <span className="text-[10px] text-[#6B7280] block">Impedance</span>
                    <span className="font-mono font-bold text-[#0D47A1]">{iem.impedance} $\Omega$</span>
                  </div>

                  <div className="bg-[#F8FBFF] border border-[#C9E2F7] rounded-lg p-2">
                    <span className="text-[10px] text-[#6B7280] block">Sensitivity</span>
                    <span className="font-mono font-bold text-[#2196F3]">{iem.sensitivity} dB/mW</span>
                  </div>
                </div>

                {/* Acoustic Synergy Recommendations */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#4B5563]">
                    <span className="font-semibold">Recommended Tip:</span>
                    <span className="font-medium text-[#0D47A1]">{iem.specs.recommendedTips}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#4B5563]">
                    <span className="font-semibold">Cable Match:</span>
                    <span className="font-medium text-[#0D47A1] truncate max-w-[150px]">
                      {iem.specs.recommendedCable}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#C9E2F7] flex items-center justify-between text-xs text-[#6B7280]">
                <span>Connector: {iem.connector}</span>
                {isSelected && (
                  <span className="flex items-center gap-1 text-[#0D47A1] font-bold">
                    <Check size={14} /> ACTIVE RACK
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
