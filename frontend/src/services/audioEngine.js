// Web Audio API engine for Revera: Real-time DSP parametric equalization & spectrum visualization

let audioCtx = null;
let sourceNode = null;
let filterNodes = [];
let analyserNode = null;
let isPlaying = false;
let currentSampleId = null;

export function initAudioEngine() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
    
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 256;
    analyserNode.smoothingTimeConstant = 0.8;
  }
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  return audioCtx;
}

export function playSynthSample(sample, iemCurve = null) {
  initAudioEngine();
  stopSample();

  const freq = sample ? (sample.synthToneFreq || 440) : 440;
  
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const masterGain = audioCtx.createGain();

  osc1.type = 'sawtooth';
  osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);

  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 0.5, audioCtx.currentTime);

  filterNodes = [];
  const lowFilter = audioCtx.createBiquadFilter();
  lowFilter.type = 'lowshelf';
  lowFilter.frequency.setValueAtTime(120, audioCtx.currentTime);

  const midFilter = audioCtx.createBiquadFilter();
  midFilter.type = 'peaking';
  midFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
  midFilter.Q.setValueAtTime(1.0, audioCtx.currentTime);

  const pinnaFilter = audioCtx.createBiquadFilter();
  pinnaFilter.type = 'peaking';
  pinnaFilter.frequency.setValueAtTime(3000, audioCtx.currentTime);
  pinnaFilter.Q.setValueAtTime(1.4, audioCtx.currentTime);

  const trebleFilter = audioCtx.createBiquadFilter();
  trebleFilter.type = 'highshelf';
  trebleFilter.frequency.setValueAtTime(8000, audioCtx.currentTime);

  filterNodes = [lowFilter, midFilter, pinnaFilter, trebleFilter];

  if (iemCurve && iemCurve.length > 0) {
    const bassPoint = iemCurve.find(p => p.f === 50) || iemCurve[0];
    const midPoint = iemCurve.find(p => p.f === 1000) || iemCurve[5];
    const pinnaPoint = iemCurve.find(p => p.f === 3000) || iemCurve[7];
    const treblePoint = iemCurve.find(p => p.f === 8000) || iemCurve[10];

    lowFilter.gain.setValueAtTime(bassPoint ? bassPoint.db * 0.8 : 3, audioCtx.currentTime);
    midFilter.gain.setValueAtTime(midPoint ? midPoint.db * 0.5 : 0, audioCtx.currentTime);
    pinnaFilter.gain.setValueAtTime(pinnaPoint ? (pinnaPoint.db - 5) * 0.7 : 2, audioCtx.currentTime);
    trebleFilter.gain.setValueAtTime(treblePoint ? treblePoint.db * 0.6 : 1, audioCtx.currentTime);
  } else {
    lowFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    midFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    pinnaFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    trebleFilter.gain.setValueAtTime(0, audioCtx.currentTime);
  }

  masterGain.gain.setValueAtTime(0.15, audioCtx.currentTime);

  osc1.connect(lowFilter);
  osc2.connect(lowFilter);
  lowFilter.connect(midFilter);
  midFilter.connect(pinnaFilter);
  pinnaFilter.connect(trebleFilter);
  trebleFilter.connect(masterGain);
  masterGain.connect(analyserNode);
  analyserNode.connect(audioCtx.destination);

  osc1.start();
  osc2.start();

  sourceNode = { osc1, osc2, masterGain };
  isPlaying = true;
  currentSampleId = sample ? sample.id : 'default';
}

export function applyEqFilterDeltas(bassGain, midGain, trebleGain) {
  if (filterNodes.length === 4 && audioCtx) {
    filterNodes[0].gain.setValueAtTime(bassGain, audioCtx.currentTime);
    filterNodes[1].gain.setValueAtTime(midGain, audioCtx.currentTime);
    filterNodes[3].gain.setValueAtTime(trebleGain, audioCtx.currentTime);
  }
}

export function stopSample() {
  if (sourceNode) {
    try {
      if (sourceNode.osc1) sourceNode.osc1.stop();
      if (sourceNode.osc2) sourceNode.osc2.stop();
      if (sourceNode.masterGain) sourceNode.masterGain.disconnect();
    } catch (e) {
      console.warn("Audio stop warning:", e);
    }
    sourceNode = null;
  }
  isPlaying = false;
  currentSampleId = null;
}

export function getAudioSpectrumData() {
  if (!analyserNode) return new Uint8Array(64);
  const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
  analyserNode.getByteFrequencyData(dataArray);
  return dataArray;
}

export function getIsPlaying() {
  return isPlaying;
}

export function getCurrentSampleId() {
  return currentSampleId;
}
