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
      <div className="bg-[#FFFFFF] border border-[#D8DBD2] rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Box size={20} className="text-[#2F5D50]" />
            <h1 className="text-xl font-extrabold text-[#1B1B1B]">THE VAULT: DIGITAL HARDWARE SHELF</h1>
            <span className="text-xs font-mono bg-[#ECEDE8] text-[#2F5D50] px-2 py-0.5 rounded font-semibold border border-[#D8DBD2]">
              HARDWARE RACK UNITS
            </span>
          </div>
          <p className="text-xs text-[#5E615C] mt-1">
            Digital shelf showcasing IEM driver architecture, ear-tip acoustic synergy, and cable matchings.
          </p>
        </div>

        {/* Filter rack */}
        <div className="flex items-center gap-1.5 bg-[#F0F1EC] border border-[#D8DBD2] rounded-lg p-1">
          {['all', 'dynamic', 'tribrid', 'ba'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedDriverType(type)}
              className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase transition-all cursor-pointer ${
                selectedDriverType === type
                  ? 'bg-[#2F5D50] text-white'
                  : 'text-[#5E615C] hover:bg-[#ECEDE8]'
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
                  ? 'border-2 border-[#2F5D50] bg-[#F8F8F6]'
                  : 'border-[#D8DBD2] hover:border-[#C7CBC0]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#D8DBD2]">
                  <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-[#2F5D50]" />
                    <span className="text-xs font-bold text-[#2F5D50] uppercase">{iem.brand}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#9B7E46] bg-[#ECEDE8] px-2 py-0.5 rounded border border-[#D8DBD2]">
                    ${iem.price}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#1B1B1B] mt-3">{iem.name}</h3>
                <p className="text-xs text-[#8C9188] mt-1 font-mono">{iem.driverTopology}</p>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg p-2">
                    <span className="text-[10px] text-[#8C9188] block">Impedance</span>
                    <span className="font-mono font-bold text-[#2F5D50]">{iem.impedance} $\Omega$</span>
                  </div>

                  <div className="bg-[#F8F8F6] border border-[#D8DBD2] rounded-lg p-2">
                    <span className="text-[10px] text-[#8C9188] block">Sensitivity</span>
                    <span className="font-mono font-bold text-[#1B1B1B]">{iem.sensitivity} dB/mW</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#5E615C]">
                    <span className="font-semibold">Recommended Tip:</span>
                    <span className="font-medium text-[#1B1B1B]">{iem.specs.recommendedTips}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#5E615C]">
                    <span className="font-semibold">Cable Match:</span>
                    <span className="font-medium text-[#1B1B1B] truncate max-w-[150px]">
                      {iem.specs.recommendedCable}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D8DBD2] flex items-center justify-between text-xs text-[#8C9188]">
                <span>Connector: {iem.connector}</span>
                {isSelected && (
                  <span className="flex items-center gap-1 text-[#2F5D50] font-bold">
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
