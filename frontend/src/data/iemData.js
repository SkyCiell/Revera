// Revera IEM repository with authentic acoustic specifications, FR points, and target curves

export const TARGET_CURVES = {
  harman: {
    id: "harman",
    name: "Harman 2019v2 Target",
    description: "Industry benchmark with boosted sub-bass and energetic pinna gain at 3kHz.",
    color: "#2F5D50",
    points: [
      { f: 20, db: 8.5 }, { f: 50, db: 7.2 }, { f: 100, db: 4.8 }, { f: 250, db: 1.0 },
      { f: 500, db: 0.0 }, { f: 1000, db: 1.2 }, { f: 2000, db: 7.5 }, { f: 3000, db: 9.8 },
      { f: 4000, db: 6.5 }, { f: 6000, db: 3.2 }, { f: 8000, db: 4.0 }, { f: 10000, db: 1.5 },
      { f: 15000, db: -2.0 }, { f: 20000, db: -5.0 }
    ]
  },
  ief_neutral: {
    id: "ief_neutral",
    name: "IEF Neutral Target",
    description: "In-Ear Fidelity flat reference with flat sub-bass transition and natural upper-mid balance.",
    color: "#9B7E46",
    points: [
      { f: 20, db: 2.0 }, { f: 50, db: 1.5 }, { f: 100, db: 0.8 }, { f: 250, db: 0.0 },
      { f: 500, db: 0.0 }, { f: 1000, db: 1.0 }, { f: 2000, db: 6.0 }, { f: 3000, db: 8.0 },
      { f: 4000, db: 5.0 }, { f: 6000, db: 2.0 }, { f: 8000, db: 3.0 }, { f: 10000, db: 0.0 },
      { f: 15000, db: -4.0 }, { f: 20000, db: -8.0 }
    ]
  },
  diffuse_field: {
    id: "diffuse_field",
    name: "Diffuse Field Reference",
    description: "Classic studio monitoring target optimized for spatial reverence and analytical neutrality.",
    color: "#5E615C",
    points: [
      { f: 20, db: 0.0 }, { f: 50, db: 0.0 }, { f: 100, db: 0.0 }, { f: 250, db: 0.0 },
      { f: 500, db: 1.5 }, { f: 1000, db: 3.0 }, { f: 2000, db: 9.0 }, { f: 3000, db: 12.0 },
      { f: 4000, db: 8.5 }, { f: 6000, db: 4.0 }, { f: 8000, db: 5.5 }, { f: 10000, db: 2.0 },
      { f: 15000, db: -1.0 }, { f: 20000, db: -6.0 }
    ]
  }
};

export const IEM_LIST = [
  {
    id: "monarch-mk3",
    name: "Thieaudio Monarch MKIII",
    brand: "Thieaudio",
    price: 999,
    rating: 4.9,
    soundSignature: "Tribrid Warm-Neutral",
    driverTopology: "2DD + 6BA + 2EST",
    impedance: 30,
    sensitivity: 106,
    connector: "0.78mm 2-Pin",
    accentColor: "#2F5D50",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfG9xYCRRX3Lm0xW4jiOJuN1NsnKTuOnGrm41LE5p_ayhg832cjdKE5Xu7&s=10",
    overview: "The pinnacle of tribrid engineering featuring twin IMPACT2 dynamic drivers for visceral sub-bass, coupled with electrostatic air drivers.",
    scores: {
      technicalities: 98,
      timbre: 94,
      soundstage: 96,
      resolution: 99,
      comfort: 88
    },
    specs: {
      bassType: "Physical Sub-bass Impact",
      midrangeType: "Clean & Natural Vocals",
      trebleType: "Airy Electrostatic Extension",
      isolation: "-26 dB Passive",
      recommendedTips: "SpinFit W1 Silicone",
      recommendedCable: "Modular 4.4mm Balanced Silver-Copper"
    },
    curve: [
      { f: 20, db: 9.8 }, { f: 50, db: 8.9 }, { f: 100, db: 6.2 }, { f: 250, db: 2.1 },
      { f: 500, db: 0.2 }, { f: 1000, db: 1.5 }, { f: 2000, db: 7.2 }, { f: 3000, db: 9.2 },
      { f: 4000, db: 5.8 }, { f: 6000, db: 3.5 }, { f: 8000, db: 5.2 }, { f: 10000, db: 4.8 },
      { f: 15000, db: 3.1 }, { f: 20000, db: -1.2 }
    ],
    review: {
      author: "Super*Review & GoldenSound",
      verdict: "An absolute masterclass in technical resolution and deep impact sub-bass separation.",
      pros: ["Exceptional EST treble air extension", "Tactile sub-bass rumble without mid bleed", "Holographic soundstage width"],
      cons: ["Large nozzle housing size", "Requires clean amplification for maximum dynamics"]
    }
  },
  {
    id: "ie600",
    name: "Sennheiser IE 600",
    brand: "Sennheiser",
    price: 699,
    rating: 4.8,
    soundSignature: "V-Shaped Audiophile",
    driverTopology: "7mm TrueResponse Dynamic",
    impedance: 18,
    sensitivity: 113,
    connector: "Fidelity (+) MMCX",
    accentColor: "#9B7E46",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfG9xYCRRX3Lm0xW4jiOJuN1NsnKTuOnGrm41LE5p_ayhg832cjdKE5Xu7&s=10",
    overview: "Forged from amorphous zirconium alloy with dual-resonator chambers for ultra-low distortion and thrilling micro-detail.",
    scores: {
      technicalities: 93,
      timbre: 97,
      soundstage: 90,
      resolution: 94,
      comfort: 98
    },
    specs: {
      bassType: "Tight & Fast Dynamic Punch",
      midrangeType: "Slightly Recessed, Pure Organic",
      trebleType: "Crystal Clear Sparkle",
      isolation: "-22 dB Passive",
      recommendedTips: "Sennheiser Memory Foam",
      recommendedCable: "Para-aramid Reinforced MMCX"
    },
    curve: [
      { f: 20, db: 10.5 }, { f: 50, db: 9.4 }, { f: 100, db: 6.8 }, { f: 250, db: 1.8 },
      { f: 500, db: -0.5 }, { f: 1000, db: 0.8 }, { f: 2000, db: 6.8 }, { f: 3000, db: 10.2 },
      { f: 4000, db: 6.1 }, { f: 6000, db: 4.8 }, { f: 8000, db: 6.5 }, { f: 10000, db: 3.2 },
      { f: 15000, db: 0.5 }, { f: 20000, db: -4.0 }
    ],
    review: {
      author: "Head-Fi Master Review",
      verdict: "Compact ergonomic masterpiece with incredible bass texture and razor-sharp acoustic clarity.",
      pros: ["Tiny laser-sintered zirconium shell", "Natural dynamic driver acoustic coherence", "Vibrant treble detail"],
      cons: ["Proprietary MMCX collar length", "Treble can be energetic for sensitive ears"]
    }
  },
  {
    id: "blessing3",
    name: "Moondrop Blessing 3",
    brand: "Moondrop",
    price: 319,
    rating: 4.7,
    soundSignature: "Harman Neutral",
    driverTopology: "2DD + 4BA Hybrid",
    impedance: 14.8,
    sensitivity: 120,
    connector: "0.78mm 2-Pin",
    accentColor: "#5E615C",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfG9xYCRRX3Lm0xW4jiOJuN1NsnKTuOnGrm41LE5p_ayhg832cjdKE5Xu7&s=10",
    overview: "Featuring HODDDUS dual dynamic bass module in a 3D-printed medical resin chassis for effortless clarity.",
    scores: {
      technicalities: 91,
      timbre: 92,
      soundstage: 88,
      resolution: 92,
      comfort: 86
    },
    specs: {
      bassType: "HODDDUS Opposed Sub-bass",
      midrangeType: "Clean Forward Vocals",
      trebleType: "Smooth BA Extension",
      isolation: "-24 dB Passive",
      recommendedTips: "Moondrop Spring Tips",
      recommendedCable: "High-Purity OFC 3.5mm"
    },
    curve: [
      { f: 20, db: 7.2 }, { f: 50, db: 6.5 }, { f: 100, db: 4.2 }, { f: 250, db: 0.8 },
      { f: 500, db: 0.0 }, { f: 1000, db: 1.4 }, { f: 2000, db: 7.8 }, { f: 3000, db: 9.6 },
      { f: 4000, db: 5.4 }, { f: 6000, db: 2.8 }, { f: 8000, db: 3.5 }, { f: 10000, db: 1.0 },
      { f: 15000, db: -3.0 }, { f: 20000, db: -7.0 }
    ],
    review: {
      author: "Crinacle Benchmark",
      verdict: "The undisputed mid-fi benchmark for tonal accuracy and vocal presentation.",
      pros: ["Extremely clean vocal clarity", "Punchy distortion-free sub-bass module", "Stainless steel faceplate aesthetic"],
      cons: ["Shell diameter requires larger ears", "Stock cable is basic"]
    }
  },
  {
    id: "u12t",
    name: "64 Audio U12t",
    brand: "64 Audio",
    price: 1999,
    rating: 5.0,
    soundSignature: "Warm Reference",
    driverTopology: "12 Balanced Armatures",
    impedance: 12.6,
    sensitivity: 108,
    connector: "0.78mm 2-Pin",
    accentColor: "#2F5D50",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfG9xYCRRX3Lm0xW4jiOJuN1NsnKTuOnGrm41LE5p_ayhg832cjdKE5Xu7&s=10",
    overview: "Equipped with tia tubeless treble driver and Apex pneumatic pressure-relieving technology for fatigue-free reference listening.",
    scores: {
      technicalities: 100,
      timbre: 96,
      soundstage: 98,
      resolution: 100,
      comfort: 96
    },
    specs: {
      bassType: "Deep BA Slam with apex relief",
      midrangeType: "Lush, Transparent & Smooth",
      trebleType: "tia Tubeless Endless Air",
      isolation: "Custom Apex modules (-15dB to -20dB)",
      recommendedTips: "AZLA SednaFit XELASTEC",
      recommendedCable: "64 Audio Premium Silver Cable"
    },
    curve: [
      { f: 20, db: 6.5 }, { f: 50, db: 6.0 }, { f: 100, db: 4.8 }, { f: 250, db: 2.5 },
      { f: 500, db: 0.5 }, { f: 1000, db: 1.0 }, { f: 2000, db: 5.5 }, { f: 3000, db: 7.5 },
      { f: 4000, db: 4.2 }, { f: 6000, db: 3.0 }, { f: 8000, db: 4.5 }, { f: 10000, db: 5.8 },
      { f: 15000, db: 4.0 }, { f: 20000, db: 0.0 }
    ],
    review: {
      author: "Audiophile Zone Hall of Fame",
      verdict: "The gold standard all-rounder IEM against which all flagship IEMs are judged.",
      pros: ["Endless resolution without fatigue", "Apex module eliminates ear pressure buildup", "Flawless timbre across 12 drivers"],
      cons: ["Flagship tier price tag", "Subdued dynamic slam compared to DD"]
    }
  },
  {
    id: "hexa",
    name: "Truthear HEXA",
    brand: "Truthear",
    price: 79.99,
    rating: 4.6,
    soundSignature: "Neutral-Subbass Boost",
    driverTopology: "1DD + 3BA Hybrid",
    impedance: 20.5,
    sensitivity: 120,
    connector: "0.78mm 2-Pin",
    accentColor: "#9B7E46",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfG9xYCRRX3Lm0xW4jiOJuN1NsnKTuOnGrm41LE5p_ayhg832cjdKE5Xu7&s=10",
    overview: "Polyurethane suspension dynamic driver paired with custom BA array for unmatched value in neutral acoustic fidelity.",
    scores: {
      technicalities: 86,
      timbre: 90,
      soundstage: 84,
      resolution: 86,
      comfort: 92
    },
    specs: {
      bassType: "Sub-bass Focused Clean Punch",
      midrangeType: "Uncolored Neutral",
      trebleType: "Smooth, Non-fatiguing",
      isolation: "-23 dB Passive",
      recommendedTips: "SpinFit CP145",
      recommendedCable: "Braided Copper 3.5mm"
    },
    curve: [
      { f: 20, db: 6.0 }, { f: 50, db: 5.2 }, { f: 100, db: 3.5 }, { f: 250, db: 0.5 },
      { f: 500, db: 0.0 }, { f: 1000, db: 1.1 }, { f: 2000, db: 6.2 }, { f: 3000, db: 8.1 },
      { f: 4000, db: 4.8 }, { f: 6000, db: 2.2 }, { f: 8000, db: 3.0 }, { f: 10000, db: 0.5 },
      { f: 15000, db: -3.5 }, { f: 20000, db: -8.0 }
    ],
    review: {
      author: "Budget Audiophile Pick",
      verdict: "Redefines what is possible under $100 with pristine tonal balance.",
      pros: ["Exceptional tonal balance", "Lightweight ergonomic shell", "Clean sub-bass separation"],
      cons: ["Subdued micro-dynamics", "Narrow soundstage height"]
    }
  },
  {
    id: "ier-z1r",
    name: "Sony IER-Z1R",
    brand: "Sony Signature",
    price: 1799,
    rating: 4.8,
    soundSignature: "Grand V-Shaped Concert",
    driverTopology: "2DD (12mm + 5mm) + 1BA",
    impedance: 40,
    sensitivity: 103,
    connector: "Sony MMCX",
    accentColor: "#1B1B1B",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfG9xYCRRX3Lm0xW4jiOJuN1NsnKTuOnGrm41LE5p_ayhg832cjdKE5Xu7&s=10",
    overview: "Engineered in Japan with zirconium housing and magnesium diaphragm for legendary soundstage scale and thunderous sub-bass.",
    scores: {
      technicalities: 97,
      timbre: 93,
      soundstage: 100,
      resolution: 98,
      comfort: 76
    },
    specs: {
      bassType: "Thunderous Concert Sub-bass",
      midrangeType: "Slightly Recessed Hall Reverb",
      trebleType: "5mm Super Tweeter Sparkle",
      isolation: "-20 dB Passive",
      recommendedTips: "Sony Triple Comfort Foam",
      recommendedCable: "Sony Silver-coated OFC 4.4mm"
    },
    curve: [
      { f: 20, db: 12.0 }, { f: 50, db: 10.8 }, { f: 100, db: 7.5 }, { f: 250, db: 2.0 },
      { f: 500, db: -1.0 }, { f: 1000, db: 0.0 }, { f: 2000, db: 5.0 }, { f: 3000, db: 8.8 },
      { f: 4000, db: 6.8 }, { f: 6000, db: 5.5 }, { f: 8000, db: 8.0 }, { f: 10000, db: 6.2 },
      { f: 15000, db: 3.5 }, { f: 20000, db: 1.0 }
    ],
    review: {
      author: "Grand Audiophile Journal",
      verdict: "Unmatched sub-bass rumble and holographic concert-hall soundstage width.",
      pros: ["Best-in-class dynamic sub-bass rumble", "Immersive soundstage depth", "Exquisite zirconium build"],
      cons: ["Heavy shell fit can cause ear fatigue", "Requires high current drive"]
    }
  }
];

export const AUDIO_SAMPLES = [
  {
    id: "sample-1",
    title: "Acoustic Guitar & Vocals",
    artist: "Audiophile Reference Trio",
    genre: "Acoustic / Folk",
    freqFocus: "Midrange & Vocal Clarity (500Hz - 3kHz)",
    synthToneFreq: 440
  },
  {
    id: "sample-2",
    title: "Sub-Bass Resonance Sweep",
    artist: "Synthwave Engine Labs",
    genre: "Electronic / Synthwave",
    freqFocus: "Sub-bass Rumble & Impact (20Hz - 100Hz)",
    synthToneFreq: 60
  },
  {
    id: "sample-3",
    title: "Symphonic Violin & Percussion",
    artist: "Royal Chamber Orchestra",
    genre: "Classical / Orchestral",
    freqFocus: "Soundstage, Treble Air & EST Sparkle (6kHz - 16kHz)",
    synthToneFreq: 1200
  }
];
