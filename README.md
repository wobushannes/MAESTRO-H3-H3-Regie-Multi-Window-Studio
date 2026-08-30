# 🎬 Studio Prompt Compiler & Director's Cut Sequencer (MAESTRO H3)

A professional, full-stack React and TypeScript workspace built to compile high-fidelity cinematic video prompts, audio sound design, and structured multi-shot scripts for next-generation AI video models (including **MiniMax Hailuo H3**, **Kling AI**, **Luma Dream Machine**, **Runway Gen-3**, and **Sora**).

This workspace features an advanced **Safe Visual Filter** that strips out metadata labels from visual prompts to prevent video generators from rendering text on-screen or speaking technical parameters in AI voiceovers.

---

## ✨ Key Features & Neuerungen

### 1. 🎬 Anti-Voiceover Safe Visual Filter
Many advanced AI video generators (like Hailuo MiniMax or Kling) attempt to speak or render on-screen text when they detect standard structured headers like `Camera:`, `Lighting:`, or `1. Target Duration:`. 
* The **Studio Prompt Compiler** automatically processes and weaves all camera movements, optics, wardrobe styling, and lighting into a **seamless, 100% natural visual paragraph**.
* Absolutely **zero technical labels** are passed to the generator, completely eliminating the "reading prompt text aloud" bug.

### 2. 📷 Analog Engine (Vintage Film & Lens Simulation Studio)
* **24 Authentic Film Stock Presets**: Simulate legendary analog camera physics and chemistry, including Kodak Portra 400, Kodachrome 64, Fujifilm Velvia 50, CineStill 800T, Tri-X 400 B&W, Leica Monochrome, Technicolor Process 4, Agfachrome, 16mm/35mm Film Grain, and Vintage Polaroid.
* **Optical & Processing Emulation**: Customize lens flares, chromatic aberration, halation glow, push/pull grain ISO, color temperature, and anamorphic bokeh.

### 3. 📣 Commercials & Ads Studio (Commercial Master Engine)
* **High-End Commercial Generator**: Specialized for TV, Social Media, and Luxury Advertising campaigns (15s & 30s formats).
* **3D Spatial Text Overlays**: Integrate floating architectural titles, lower-third cinema tags, and facade-glass tracking.
* **Gastro & Fine Dining Special**: Features presets like **Funk Royal Fine Dining (6-Pic Time-Lapse)** where background crowds flow in fast motion while the couple remains still in intimate foreground focus. Includes Michelin Chef Tables, Skyline Rooftops, Italian Trattoria Candlelight, Omakase Flaming Wagyu, and Parisian Brasserie Terraces.
* **Grill & Outdoor Kitchen Special**: Luxury outdoor living and Flammkraft-style high-end barbecue campaign presets.

### 4. 🎞️ Multi-Window Sequence Editor (Director's Cut)
* Break down your scenes into a sequence of continuous **3-second windows**.
* Plan transitions, trajectory continuity, dialogue whispers, and sound design markers.
* The compiler builds a synchronized timeline that tracks characters, objects, and speed variables across the entire runtime.

### 5. 🎙️ Comprehensive Sound Design & Narrator Presets
* Access a rich library of pre-configured cinematic audio cues (from deep industrial humming to whispering horror drones).
* Choose from a curated selection of **8 voice profiles** (e.g., Deep Cinematic Trailer Voice, Eerie ASMR Whisper, 1940s Vintage Radio Host, and Grit-Heavy Old Cowboy) to construct perfect voiceover templates for ElevenLabs or Suno.

### 6. 🗃️ Massive 1,100+ Cinematic Template Library
* Explore **13+ distinct visual genres** (Sci-Fi, Horror, Sitcom, Construction, Real Estate, Gastro & Fine Dining, Grill & Outdoor Kitchen, Gourmet Food, Cyberpunk, Fashion, Boudoir, and Nature Landscapes).
* Thousands of hand-crafted, production-ready templates to load with a single click.
* Create and save your own custom presets using local storage persistence.

### 7. 🤖 AI Prompt-Schablone (Export & Import Interface)
* **LLM Compatibility**: Copy a fully structured markdown/JSON schema directly from the sidebar to give to Claude, Gemini, or ChatGPT.
* **Instant Workspace Parsing**: Feed raw generated JSON configurations from external AIs back into the import panel to instantly populate your camera angles, lighting layouts, wardrobe choices, character descriptions, and Multi-Window timelines!

---

## 🤝 Sponsoren & Kontaktmöglichkeiten

Dieses Projekt wird unterstützt und gefördert durch folgende Partnerprojekte & Initiativen. Hier findest du auch direkte Kontaktmöglichkeiten für Anfragen, KI-Beratung und Custom-Entwicklungen:

* 🧙‍♂️ **[AI-Wizards.de](https://ai-wizards.de/)** — *Sponsor & KI-Partner*
  * Spezialisiert auf maßgeschneiderte KI-Lösungen, Prompting-Frameworks, AI Automation Workflows und Unternehmenstraining.
  * Website & Kontakt: [https://ai-wizards.de/](https://ai-wizards.de/)

* 👨‍💻 **[Johannes Wobus](https://johannes-wobus.de/)** — *Sponsor & Creator*
  * Full-Stack Softwareentwicklung, AI Studio Architecture, Design & Projektkontakt.
  * Website & Portfolio: [https://johannes-wobus.de/](https://johannes-wobus.de/)

---

## 🛠️ Architecture & Tech Stack

* **Frontend:** React 18+ with Vite and Tailwind CSS.
* **Component Framework:** Modular custom React components under `src/components/` and types declared in `src/types.ts`.
* **Icons:** `lucide-react` vector iconography.
* **State Management:** Declarative local React state with automatic synchronization to standard clipboard APIs.
* **Linter & Type Safety:** Pristine TypeScript validation (`tsc --noEmit`).

---

## 🚀 Quick Start Guide

### How to use the Studio Prompt Compiler:
1. **Choose your Mode:** Select either **Single Clip** (for simple shots) or **Multi-Window Sequence** (to construct multi-shot scenes).
2. **Setup your Trailer:** Customize the **Film Title**, **Narrator Voice**, and **Dialogues/Whispers**. Use the quick-click narrator presets to instantly load professional voice configurations.
3. **Configure the Wardrobe & Style:** Define precise clothing, materials, and accessories using the dedicated Wardrobe panel.
4. **Select Camera & Lighting:** Use the click-builder to apply advanced crane shots, orbital camera tracks, chiaroscuro lighting, volumetric sunbeams, or anamorphic lens filters.
5. **Add Sound Effects:** Apply specialized sound cue tags to synchronize the audio timeline.
6. **Compile and Export:**
   * **Sauberer Video-Prompt:** Copy this clean paragraph into your video generator (Hailuo, Kling, etc.).
   * **Audio & Voiceover:** Copy this block for your text-to-speech engine.
   * **Regie-Drehbuch:** Copy this structured timecode document for your archives or screenwriting.

---

## 📝 Configuration Files

- `package.json` — System dependencies and build scripts.
- `metadata.json` — Application title, description, and major capabilities.
- `src/data/parameters.ts` — High-fidelity parameters (Wardrobe, Camera, Lighting, Lens, Motion, Audio, Voices, and mature edge-keywords).
- `src/data/commercialPresetsData.ts` — Commercial & Ad preset dataset.
- `src/utils/analogMasterEngine.ts` — Analog film simulation engine.
- `src/data/presets/` — The modular genre preset datasets.
