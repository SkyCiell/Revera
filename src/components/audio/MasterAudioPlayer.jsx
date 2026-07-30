import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Disc, Sliders, Repeat, Sparkles } from 'lucide-react';
import { AUDIO_SAMPLES, IEM_LIST } from '../../data/iemData';
import { playSynthSample, stopSample, getIsPlaying, getAudioSpectrumData } from '../../services/audioEngine';

export default function MasterAudioPlayer({ activeIem, onSelectIem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSample, setSelectedSample] = useState(AUDIO_SAMPLES[0]);
  const [abMode, setAbMode] = useState(false);
  const [abTargetIem, setAbTargetIem] = useState(IEM_LIST[1]); // Default Sennheiser IE600
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      stopSample();
      setIsPlaying(false);
    } else {
      const iemToUse = abMode ? abTargetIem : activeIem;
      playSynthSample(selectedSample, iemToUse ? iemToUse.curve : null);
      setIsPlaying(true);
    }
  };

  const handleSampleChange = (sample) => {
    setSelectedSample(sample);
    if (isPlaying) {
      const iemToUse = abMode ? abTargetIem : activeIem;
      playSynthSample(sample, iemToUse ? iemToUse.curve : null);
    }
  };

  const toggleAbMode = () => {
    const nextAb = !abMode;
    setAbMode(nextAb);
    if (isPlaying) {
      const iemToUse = nextAb ? abTargetIem : activeIem;
      playSynthSample(selectedSample, iemToUse ? iemToUse.curve : null);
    }
  };

  // Real-time canvas spectrum renderer
  useEffect(() => {
    const drawSpectrum = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const dataArray = getAudioSpectrumData();
        const barWidth = (width / 32);
        let x = 0;

        for (let i = 0; i < 32; i++) {
          const barHeight = isPlaying ? (dataArray[i * 2] / 255) * height : 4;
          
          // Revera Solid Colors
          if (i < 10) ctx.fillStyle = '#0D47A1'; // Bass
          else if (i < 22) ctx.fillStyle = '#2196F3'; // Mid
          else ctx.fillStyle = '#90CAF9'; // Treble

          ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
          x += barWidth;
        }
      }
      animRef.current = requestAnimationFrame(drawSpectrum);
    };

    drawSpectrum();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4">
      <div className="bg-[#FFFFFF] border-2 border-[#C9E2F7] rounded-xl p-3 shadow-lg flex items-center justify-between gap-4">
        
        {/* Left: Play Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-lg bg-[#2196F3] hover:bg-[#1976D2] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
            title={isPlaying ? "Pause Sound Engine" : "Play Sound Engine"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#111827]">{selectedSample.title}</span>
              <span className="text-[10px] font-mono font-semibold text-[#0D47A1] bg-[#E3F2FD] px-1.5 py-0.5 rounded border border-[#C9E2F7]">
                {selectedSample.genre}
              </span>
            </div>
            <p className="text-[11px] text-[#4B5563] mt-0.5">{selectedSample.freqFocus}</p>
          </div>
        </div>

        {/* Center: Track Selector & A/B Sound Simulator Switch */}
        <div className="flex items-center gap-3">
          <select
            value={selectedSample.id}
            onChange={(e) => handleSampleChange(AUDIO_SAMPLES.find(s => s.id === e.target.value))}
            className="bg-[#F8FBFF] border border-[#C9E2F7] text-xs text-[#111827] rounded-lg px-2.5 py-1.5 font-medium outline-none cursor-pointer hover:border-[#2196F3]"
          >
            {AUDIO_SAMPLES.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>

          {/* A/B Simulator Button */}
          <button
            onClick={toggleAbMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              abMode
                ? 'bg-[#0D47A1] text-white border-[#0D47A1]'
                : 'bg-[#E3F2FD] text-[#0D47A1] border-[#C9E2F7] hover:bg-[#90CAF9]'
            }`}
            title="Toggle live sound comparison between IEM A & B"
          >
            <Sliders size={14} />
            <span>A/B: {abMode ? abTargetIem.name : activeIem?.name || 'Stock Reference'}</span>
          </button>
        </div>

        {/* Right: Live Spectrum Canvas */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280]">Spectrum DSP</span>
            <div className="text-xs font-mono font-bold text-[#0D47A1]">
              {isPlaying ? 'DSP ACTIVE' : 'STANDBY'}
            </div>
          </div>
          <canvas
            ref={canvasRef}
            width={120}
            height={32}
            className="bg-[#F8FBFF] border border-[#C9E2F7] rounded-lg block"
          />
        </div>
      </div>
    </div>
  );
}
