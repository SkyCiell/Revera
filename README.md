# Revera — Audiophile Operating System & Workstation

![Revera Banner](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfG9xYCRRX3Lm0xW4jiOJuN1NsnKTuOnGrm41LE5p_ayhg832cjdKE5Xu7&s=10)

> **Revera** is a production-ready, professional audio workstation designed for audiophiles to discover, analyze, compare, collect, review, and equalize In-Ear Monitors (IEMs). Built with React 19, HTML5 Canvas, Web Audio API DSP sound engine, Express.js, and MySQL.

---

## 🌟 Key Workspaces & Features

### 1. Split Instrument Showcase & Audio Exploration Hub
- **Asymmetric 3-Zone Canvas**: Combines a featured model split-stage showcase with real-time acoustic measurement canvas and quick parametric EQ sliders.
- **Centerpiece Hardware Display**: High-resolution IEM shell display featuring dynamic impedance ($\Omega$) & sensitivity (dB/mW) badges.
- **Model Carousel**: Seamless model navigation between flagship IEMs (*Thieaudio Monarch MKIII, Sennheiser IE 600, 64 Audio U12t, Moondrop Blessing 3, Truthear HEXA, Sony IER-Z1R*).

### 2. Frequency Studio Measurement Workbench
- **High-Precision Canvas Graph**: Interactive 20Hz–20kHz logarithmic frequency response canvas with hover reticle readouts.
- **Target Reference Overlays**: Toggle industry targets (*Harman 2019v2*, *IEF Neutral*, *Diffuse Field*).
- **Interactive Parametric EQ**: Sub-bass shelf, midrange gain, and treble air faders with real-time canvas curve warping.

### 3. AI Tuning Lab & Sonic Synthesizer
- **Multi-Axis Tonal Controls**: Synthesize custom sound targets based on sub-bass slam, vocal forwardness, treble air, and soundstage width.
- **Natural Language Query Matcher**: Acoustic query parser matching IEM measurements to verbal sound descriptors (*"Deep sub-bass impact with pristine female vocals & holographic soundstage"*).

### 4. The Vault: Digital Hardware Shelf
- **Driver Architecture Matrix**: Hardware rack display showcasing driver topologies (*2DD+6BA+2EST*, *Planar*, *7mm TrueResponse Dynamic*).
- **Synergy Guide**: Recommended ear-tip pairings (*SpinFit W1, Memory Foam, Spring Tips*) and cable pairings (*Modular 4.4mm Balanced, Para-aramid MMCX*).

### 5. Control Room: Side-by-Side Comparison
- **Dual-Channel A/B Sound Simulator**: Live Web Audio API audio playback morphing between IEM Channel A and IEM Channel B.
- **Acoustic Spec Matrix**: Side-by-side spec comparison table & dual curve overlay graph.

### 6. Revera Magazine & Editorial Reviews
- In-depth acoustic engineering breakdowns, master review verdicts, pros/cons cards, and track testing notes.

### 7. Audio Passport & Listening Journal
- **HRTF Hearing Sensitivity Audiogram**: Interactive frequency hearing threshold calibration (dB SPL) with target curve compensation.
- **Saved Target Presets**: Preset management for personalized listening profiles.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Custom Industrial CSS Variables (`index.css`)
- **Animations**: Framer Motion
- **Audio Engine**: HTML5 Canvas API + Web Audio API DSP Parametric Equalization
- **HTTP Client & Forms**: Axios + React Hook Form
- **Icons**: Lucide React

### Backend
- **Server**: Express.js (Node.js)
- **Database**: MySQL (`backend/models/schema.sql`) with memory fallback store
- **Security & Auth**: JWT (`jsonwebtoken`) + Password Hashing (`bcryptjs`)
- **API Architecture**: REST API (`/api/auth`, `/api/iems`, `/api/reviews`, `/api/collections`, `/api/recommendations`, `/api/stats`)

---

## 🎨 Industrial Design System & Color Palette

Revera translates the tactile design principles of premium audio hardware (brushed aluminum, matte ceramic, precision-machined metal) into a minimal digital interface:

| Token | Hex / Value | Description |
|---|---|---|
| **Background Base** | `#F5F5F3` | Matte industrial ceramic surface |
| **Background Secondary** | `#F0F1EC` | Warm slate background |
| **Surface** | `#FFFFFF` | Solid clean white card surface |
| **Surface Alt** | `#ECEDE8` | Machined metal grey accent |
| **Primary (Studio Green)** | `#2F5D50` | Primary actions & active states |
| **Accent (Warm Bronze)** | `#9B7E46` | Highlights & pricing badges |
| **Borders & Lines** | `#D8DBD2` | Thin precision borders |
| **Text Primary** | `#1B1B1B` | High contrast primary text |
| **Text Secondary** | `#5E615C` | Midtone text & labels |
| **Text Muted** | `#8C9188` | Secondary captions & counters |

---

## 🚀 Getting Started & Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MySQL Server (optional, fallback memory store provided)

### 1. Clone the Repository
```bash
git clone https://github.com/SkyCiell/Revera.git
cd Revera
```

### 2. Backend Setup
```bash
cd backend
npm install
node server.js
```
The REST API server will start on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 📁 Repository Directory Structure

```
Revera/
├── backend/                  # Express.js REST API Server
│   ├── config/               # Database Pool & Fallback Store
│   ├── models/               # MySQL Database Schema (schema.sql)
│   ├── routes/               # REST API Endpoints
│   └── server.js             # Server Entry Point
│
├── frontend/                 # React 19 + Vite Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── audio/        # Canvas Frequency Graph & Web Audio DSP Player
│   │   │   ├── navigation/   # Command Dock Navbar & Command Palette Modal
│   │   │   └── workspaces/   # 7 Unique Workstation Views
│   │   ├── context/          # Auth Context Provider
│   │   ├── data/             # IEM Database & Measurement Targets
│   │   ├── services/         # Web Audio DSP Engine & Axios Client
│   │   └── index.css         # Industrial Design System Tokens
│   ├── index.html
│   └── vite.config.js
└── README.md
```

---

## 📝 License

Distributed under the MIT License. Created for audiophiles and acoustic engineering enthusiasts.
