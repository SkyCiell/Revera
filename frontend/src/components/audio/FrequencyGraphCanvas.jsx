import React, { useRef, useEffect, useState } from 'react';

function freqToX(freq, width, paddingLeft, paddingRight) {
  const minF = Math.log10(20);
  const maxF = Math.log10(20000);
  const fLog = Math.log10(Math.max(20, Math.min(20000, freq)));
  const ratio = (fLog - minF) / (maxF - minF);
  return paddingLeft + ratio * (width - paddingLeft - paddingRight);
}

function dbToY(db, height, paddingTop, paddingBottom, minDb = -5, maxDb = 20) {
  const ratio = (db - minDb) / (maxDb - minDb);
  return height - paddingBottom - ratio * (height - paddingTop - paddingBottom);
}

function xToFreq(x, width, paddingLeft, paddingRight) {
  const minF = Math.log10(20);
  const maxF = Math.log10(20000);
  const graphWidth = width - paddingLeft - paddingRight;
  const ratio = Math.max(0, Math.min(1, (x - paddingLeft) / graphWidth));
  return Math.pow(10, minF + ratio * (maxF - minF));
}

export default function FrequencyGraphCanvas({
  curves = [],
  interactiveEq = false,
  eqGain = { bass: 0, mid: 0, treble: 0 },
  onEqChange = null,
  height = 360
}) {
  const canvasRef = useRef(null);
  const [hoverData, setHoverData] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 800;
    const canvasHeight = height;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const padL = 50;
    const padR = 25;
    const padT = 30;
    const padB = 40;

    // Solid Industrial Ceramic Surface
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, canvasHeight);

    // Region Shading
    const xBass1 = freqToX(20, width, padL, padR);
    const xBass2 = freqToX(250, width, padL, padR);
    ctx.fillStyle = 'rgba(27, 27, 27, 0.03)';
    ctx.fillRect(xBass1, padT, xBass2 - xBass1, canvasHeight - padT - padB);

    const xMid2 = freqToX(2000, width, padL, padR);
    ctx.fillStyle = 'rgba(47, 93, 80, 0.04)';
    ctx.fillRect(xBass2, padT, xMid2 - xBass2, canvasHeight - padT - padB);

    const xTreble2 = freqToX(20000, width, padL, padR);
    ctx.fillStyle = 'rgba(155, 126, 70, 0.04)';
    ctx.fillRect(xMid2, padT, xTreble2 - xMid2, canvasHeight - padT - padB);

    // Grid Lines & Labels
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#D8DBD2';
    ctx.fillStyle = '#5E615C';
    ctx.font = '11px Inter, sans-serif';

    const dBLines = [-5, 0, 5, 10, 15, 20];
    dBLines.forEach(db => {
      const y = dbToY(db, canvasHeight, padT, padB);
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(width - padR, y);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.fillText(`${db > 0 ? '+' : ''}${db} dB`, padL - 8, y + 4);
    });

    const freqTicks = [20, 50, 100, 250, 500, 1000, 2000, 5000, 10000, 20000];
    freqTicks.forEach(f => {
      const x = freqToX(f, width, padL, padR);
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, canvasHeight - padB);
      ctx.stroke();

      ctx.textAlign = 'center';
      const label = f >= 1000 ? `${f / 1000}k` : `${f}`;
      ctx.fillText(label, x, canvasHeight - padB + 16);
    });

    ctx.font = '600 10px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#1B1B1B';
    ctx.fillText('BASS (20-250Hz)', xBass1 + 6, padT + 14);
    ctx.fillStyle = '#2F5D50';
    ctx.fillText('MIDRANGE (250-2kHz)', xBass2 + 6, padT + 14);
    ctx.fillStyle = '#9B7E46';
    ctx.fillText('TREBLE (2k-20kHz)', xMid2 + 6, padT + 14);

    // Curves
    curves.forEach(curve => {
      if (!curve.points || curve.points.length === 0) return;

      ctx.beginPath();
      ctx.lineWidth = curve.isTarget ? 2 : 3;
      ctx.strokeStyle = curve.color || '#2F5D50';

      if (curve.isTarget) {
        ctx.setLineDash([6, 4]);
      } else {
        ctx.setLineDash([]);
      }

      const points = curve.points.map(p => {
        let dbVal = p.db;
        if (!curve.isTarget && interactiveEq) {
          if (p.f <= 250) dbVal += eqGain.bass;
          else if (p.f <= 2000) dbVal += eqGain.mid;
          else dbVal += eqGain.treble;
        }
        return {
          x: freqToX(p.f, width, padL, padR),
          y: dbToY(dbVal, canvasHeight, padT, padB)
        };
      });

      if (points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Reticle
    if (hoverData) {
      const hX = freqToX(hoverData.freq, width, padL, padR);
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#2F5D50';
      ctx.moveTo(hX, padT);
      ctx.lineTo(hX, canvasHeight - padB);
      ctx.stroke();

      curves.forEach(curve => {
        const closestPoint = curve.points.reduce((prev, curr) => 
          Math.abs(curr.f - hoverData.freq) < Math.abs(prev.f - hoverData.freq) ? curr : prev
        );
        if (closestPoint) {
          let dbVal = closestPoint.db;
          if (!curve.isTarget && interactiveEq) {
            if (closestPoint.f <= 250) dbVal += eqGain.bass;
            else if (closestPoint.f <= 2000) dbVal += eqGain.mid;
            else dbVal += eqGain.treble;
          }
          const pY = dbToY(dbVal, canvasHeight, padT, padB);
          
          ctx.beginPath();
          ctx.arc(hX, pY, 5, 0, Math.PI * 2);
          ctx.fillStyle = curve.color || '#2F5D50';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#FFFFFF';
          ctx.stroke();
        }
      });
    }
  }, [curves, hoverData, interactiveEq, eqGain, height]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const padL = 50;
    const padR = 25;
    
    if (x >= padL && x <= rect.width - padR) {
      const freq = Math.round(xToFreq(x, rect.width, padL, padR));
      setHoverData({ freq });
    } else {
      setHoverData(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  return (
    <div className="relative w-full bg-white rounded-xl border border-[#D8DBD2] p-3 shadow-xs">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider">Acoustic Analysis Board</span>
          {hoverData && (
            <span className="text-xs font-mono font-semibold text-[#2F5D50] bg-[#ECEDE8] px-2 py-0.5 rounded border border-[#D8DBD2]">
              {hoverData.freq >= 1000 ? `${(hoverData.freq / 1000).toFixed(2)} kHz` : `${hoverData.freq} Hz`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          {curves.map(c => (
            <div key={c.id} className="flex items-center gap-1.5">
              <span 
                className="w-3 h-1 rounded-full inline-block" 
                style={{ backgroundColor: c.color }}
              />
              <span className="text-[#1B1B1B]">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full cursor-crosshair block"
        style={{ height: `${height}px` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
