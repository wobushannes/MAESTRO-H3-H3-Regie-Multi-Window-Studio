# 🎬 Studio Prompt Compiler & Director's Cut Sequencer

A professional, full-stack React and TypeScript workspace built to compile high-fidelity cinematic video prompts, audio sound design, and structured multi-shot scripts for next-generation AI video models (including **MiniMax Hailuo H3**, **Kling AI**, **Luma Dream Machine**, **Runway Gen-3**, and **Sora**).

This workspace features an advanced **Safe Visual Filter** that strips out metadata labels from visual prompts to prevent video generators from rendering text on-screen or speaking technical parameters in AI voiceovers.

---

## ✨ Key Features

### 1. 🎬 Anti-Voiceover Safe Visual Filter
Many advanced AI video generators (like Hailuo MiniMax or Kling) attempt to speak or render on-screen text when they detect standard structured headers like `Camera:`, `Lighting:`, or `1. Target Duration:`. 
* The **Studio Prompt Compiler** automatically processes and weaves all camera movements, optics, wardrobe styling, and lighting into a **seamless, 100% natural visual paragraph**.
* Absolutely **zero technical labels** are passed to the generator, completely eliminating the "reading prompt text aloud" bug.

### 2. 🎞️ Multi-Window Sequence Editor (Director's Cut)
* Break down your scenes into a sequence of continuous **3-second windows**.
* Plan transitions, trajectory continuity, dialogue whispers, and sound design markers.
* The compiler builds a synchronized timeline that tracks characters, objects, and speed variables across the entire runtime.

### 3. 🎙️ Comprehensive Sound Design & Narrator Presets
* Access a rich library of pre-configured cinematic audio cues (from deep industrial humming to whispering horror drones).
* Choose from a curated selection of **8 voice profiles** (e.g., Deep Cinematic Trailer Voice, Eerie ASMR Whisper, 1940s Vintage Radio Host, and Grit-Heavy Old Cowboy) to construct perfect voiceover templates for ElevenLabs or Suno.

### 4. 🗃️ Massive 275+ Cinematic Template Library
* Explore **11 distinct visual genres** (Horror, Sitcom, Sci-Fi, Construction, Real Estate, Gourmet Food, Cyberpunk, Fashion, Action, Dark Fantasy, and Nature Landscapes).
* Each category contains exactly **25 hand-crafted, production-ready templates** (275 templates total) to load with a single click.
* Create and save your own custom presets using local storage persistence.

### 5. 🎛️ Premium Left Sidebar & Workspace Controls
* **Integrated Command Deck**: A dark luxury sidebar replacing cluttered navigation headers, housing all prompt compiling categories, active window states, system languages, and NSFW filters.
* **Responsive Layout**: Fluidly folds into a mobile top bar on small screens while sticking as an elegant widescreen panel on desktop.

### 6. 🤖 AI Prompt-Schablone (Export & Import Interface)
* **LLM Compatibility**: Copy a fully structured markdown/JSON schema directly from the sidebar to give to Claude, Gemini, or ChatGPT.
* **Instant Workspace Parsing**: Feed raw generated JSON configurations from external AIs back into the import panel to instantly populate your camera angles, lighting layouts, wardrobe choices, character descriptions, and Multi-Window timelines!

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
- `src/data/presets/` — The modular genre preset datasets.
