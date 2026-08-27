import React from 'react';
import {
  Camera,
  Sun,
  Aperture,
  Gauge,
  Volume2,
  Flame,
  Plus,
  X,
  RotateCcw,
  Tag,
  Film,
  Layers,
  Trash2,
  Copy,
  PlusCircle,
  Clock,
  Sparkles,
  Clapperboard,
  Mic,
  MessageSquare,
  Shirt,
  Image as ImageIcon,
} from 'lucide-react';
import { PromptBuildState, MaestroWindow } from '../types';
import {
  WARDROBE_OPTIONS,
  CAMERA_OPTIONS,
  LIGHTING_OPTIONS,
  LENS_AESTHETIC_OPTIONS,
  MOTION_SPEED_OPTIONS,
  AUDIO_CUE_OPTIONS,
  NSFW_MATURE_KEYWORDS,
  NARRATOR_VOICE_OPTIONS,
} from '../data/parameters';

interface PromptBuilderProps {
  state: PromptBuildState;
  setState: React.Dispatch<React.SetStateAction<PromptBuildState>>;
  onShowToast?: (msg: string) => void;
}

export const PromptBuilder: React.FC<PromptBuilderProps> = ({
  state,
  setState,
  onShowToast,
}) => {
  const handleSelectOption = (
    field: keyof PromptBuildState,
    value: string
  ) => {
    setState((prev) => ({
      ...prev,
      [field]: prev[field as keyof PromptBuildState] === value ? '' : value,
    }));
  };

  const handleToggleNsfwKeyword = (kwValue: string) => {
    setState((prev) => {
      const exists = prev.selectedNsfwKeywords.includes(kwValue);
      return {
        ...prev,
        selectedNsfwKeywords: exists
          ? prev.selectedNsfwKeywords.filter((k) => k !== kwValue)
          : [...prev.selectedNsfwKeywords, kwValue],
      };
    });
  };

  const handleReset = () => {
    setState((prev) => ({
      ...prev,
      rawConcept: '',
      wardrobeStyle: '',
      clothingDetails: '',
      fashionAccessories: '',
      cameraMotion: '',
      motionSpeed: '',
      lighting: '',
      lensStyle: '',
      atmosphere: '',
      subjectAction: '',
      audioCue: '',
      narratorVoice: '',
      dialogueLines: '',
      selectedNsfwKeywords: [],
    }));
  };

  // Quick inject reference picture tag
  const handleInjectTag = (tag: string) => {
    setState((prev) => {
      const existing = prev.rawConcept;
      const space = existing.length > 0 && !existing.endsWith(' ') ? ' ' : '';
      return {
        ...prev,
        rawConcept: `${existing}${space}${tag}`,
      };
    });
    if (onShowToast) onShowToast(`Tag "${tag}" eingefügt!`);
  };

  // Window Quantity Setter
  const handleSetWindowCount = (targetCount: number) => {
    setState((prev) => {
      const current = [...prev.windows];
      if (targetCount > current.length) {
        for (let i = current.length + 1; i <= targetCount; i++) {
          const startSec = (i - 1) * 3;
          const endSec = i * 3;
          current.push({
            id: `win-${Date.now()}-${i}`,
            windowNumber: i,
            timeRange: `${startSec}s - ${endSec}s`,
            prompt: i === 1 ? prev.rawConcept || 'Szene Start' : `Fortführung der Bewegung in Window ${i}`,
            cameraTrajectory: prev.cameraMotion || 'Nahtlose Kamera-Weiterführung',
            continuityNote: `Kontinuität aus Window ${i - 1}`,
            motionSpeed: '24fps Normal',
            referenceImages: [],
            dialogue: i === 1 ? 'Narrator: "The mystery begins..."' : '',
            sfxImpact: i === targetCount ? 'Final deep impact.' : 'Trailer impact.',
          });
        }
      } else if (targetCount < current.length && targetCount >= 1) {
        current.splice(targetCount);
      }
      return { ...prev, windows: current };
    });
  };

  const handleAddWindow = () => {
    handleSetWindowCount(state.windows.length + 1);
  };

  const handleRemoveWindow = (id: string) => {
    setState((prev) => {
      const filtered = prev.windows.filter((w) => w.id !== id);
      const reindexed = filtered.map((w, idx) => ({
        ...w,
        windowNumber: idx + 1,
        timeRange: `${idx * 3}s - ${(idx + 1) * 3}s`,
      }));
      return { ...prev, windows: reindexed };
    });
  };

  const handleSetReferenceCount = (count: number) => {
    setState((prev) => {
      let current = [...prev.referenceImages];
      if (count === 0) {
        current = [];
      } else if (count < current.length) {
        current = current.slice(0, count);
      } else if (count > current.length) {
        for (let i = current.length + 1; i <= count; i++) {
          current.push({
            id: `ref-pro-${Date.now()}-${i}`,
            label: i === 1 ? 'Subjekt-Referenz' : i === 2 ? 'Stil-Referenz' : `Referenzbild ${i}`,
            tag: `picture ${i}`,
            role: i === 1 ? 'subject' : 'style',
            url: i === 1
              ? 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80'
              : 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
            description: i === 1 ? 'Hauptcharakter / Subjekt Anker' : `Referenz Bild ${i}`,
          });
        }
      }
      return { ...prev, referenceImages: current };
    });
    if (count === 1) {
      onShowToast('🖼️ Exakt 1 Referenzbild (picture 1) gewählt!');
    } else if (count === 0) {
      onShowToast('🚫 Referenzbilder deaktiviert (0 Bilder)');
    } else {
      onShowToast(`🖼️ ${count} Referenzbilder gewählt!`);
    }
  };

  const handleUpdateWindow = (id: string, updated: Partial<MaestroWindow>) => {
    setState((prev) => ({
      ...prev,
      windows: prev.windows.map((w) => (w.id === id ? { ...w, ...updated } : w)),
    }));
  };

  return (
    <div className="space-y-6 pb-28">
      {/* 1. CLEAR MODE SELECTION */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-extrabold tracking-tight">
                Generator-Modus wählen
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Du entscheidest: Möchtest du einen einfachen Einzel-Clip oder eine strukturierte Multi-Window Studio-Sequenz generieren?
            </p>
          </div>

          <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setState((prev) => ({ ...prev, generatorMode: 'single' }))}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                state.generatorMode === 'single'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Film className="w-4 h-4" />
              Einzelner Clip
            </button>

            <button
              onClick={() => {
                setState((prev) => ({ ...prev, generatorMode: 'multi' }));
                if (state.windows.length === 0) {
                  handleSetWindowCount(2);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                state.generatorMode === 'multi'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              Multi-Window Sequenz ({state.windows.length || 2} Windows)
            </button>
          </div>
        </div>

        {/* Multi-Window Quick Configuration Bar */}
        {state.generatorMode === 'multi' && (
          <div className="pt-4 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="font-bold text-amber-400">Anzahl Windows wählen:</span>
              <div className="flex items-center gap-1.5">
                {[2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleSetWindowCount(num)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      state.windows.length === num
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {num} Windows ({num * 3}s)
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddWindow}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Window hinzufügen
            </button>
          </div>
        )}
      </div>

      {/* 2. THEATRICAL TRAILER STYLE & NARRATOR CONTROLS */}
      <div className="bg-gradient-to-r from-amber-50/90 to-amber-100/50 border border-amber-200/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
          <div className="flex items-center gap-2">
            <Clapperboard className="w-5 h-5 text-amber-700" />
            <h3 className="text-sm font-extrabold text-slate-900">
              Kino-Trailer Setup (Studio Specification)
            </h3>
          </div>
          <span className="px-2.5 py-0.5 bg-amber-600 text-white font-mono font-bold text-[10px] rounded-full uppercase">
            Studio Standard
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs font-extrabold text-slate-800 block mb-1">
              Film- / Abspann-Titel:
            </label>
            <input
              type="text"
              value={state.movieTitle || ''}
              onChange={(e) =>
                setState((prev) => ({ ...prev, movieTitle: e.target.value }))
              }
              placeholder="z.B. THE LAST LIGHTHOUSE"
              className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-extrabold text-amber-950 focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-800 block mb-1">
              Kamera- & Stil-Code:
            </label>
            <input
              type="text"
              value={state.styleCode || 'ASTROCINEMAV01K2T'}
              onChange={(e) =>
                setState((prev) => ({ ...prev, styleCode: e.target.value }))
              }
              placeholder="z.B. ASTROCINEMAV01K2T"
              className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-800 block mb-1">
              Sprecher / Narrator:
            </label>
            <div className="relative">
              <Mic className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={state.narratorVoice || ''}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, narratorVoice: e.target.value }))
                }
                placeholder="z.B. Deep male narrator with gravitas"
                className="w-full pl-8 pr-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-800 block mb-1">
              Dialoge / Whispers (Einzel-Modus):
            </label>
            <div className="relative">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={state.dialogueLines || ''}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, dialogueLines: e.target.value }))
                }
                placeholder='z.B. She whispers: "Dad?"'
                className="w-full pl-8 pr-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Quick Voice Selector */}
        <div className="pt-3 border-t border-amber-200/60">
          <label className="text-xs font-extrabold text-amber-950 block mb-2">
            🎙️ Schnellauswahl Kino-Sprecher & Stimmen (Narrators):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {NARRATOR_VOICE_OPTIONS.map((opt) => {
              const isSelected = state.narratorVoice === opt.value;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      narratorVoice: isSelected ? '' : opt.value,
                    }));
                  }}
                  className={`text-left p-2.5 rounded-xl border text-[11px] transition-all ${
                    isSelected
                      ? 'bg-amber-600 border-amber-700 text-white font-extrabold shadow-sm'
                      : 'bg-white border-amber-200/50 text-slate-700 hover:border-amber-300 hover:bg-amber-100/50'
                  }`}
                >
                  <div className={`font-extrabold ${isSelected ? 'text-white' : 'text-slate-900'}`}>{opt.labelDe}</div>
                  <div className={`text-[9px] line-clamp-1 mt-0.5 ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* NEW SECTION: MODE, KLEIDUNG & OUTFIT (WARDROBE / CHARACTER STYLING) */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Shirt className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Mode, Kleidung & Outfit (Wardrobe / Character Styling)
              </h3>
              <p className="text-[11px] text-slate-500">
                Bestimme präzise Kleidung, Materialien, Stil & Accessoires für Charaktere und Darsteller.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] rounded-full uppercase">
            Kleidungs-Control
          </span>
        </div>

        {/* Quick Selector Preset Cards */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-slate-800 block">
            Schnellauswahl Mode- & Kleidung-Stile:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {state.wardrobeStyle && !WARDROBE_OPTIONS.some((opt) => opt.label === state.wardrobeStyle) && (
              <button
                type="button"
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    wardrobeStyle: '',
                    clothingDetails: '',
                  }));
                }}
                className="col-span-1 sm:col-span-2 text-left p-2.5 rounded-xl border border-emerald-500 bg-emerald-50 text-slate-950 font-bold shadow-xs relative overflow-hidden"
              >
                <span className="absolute top-1 right-2 text-[8px] bg-emerald-600 text-white font-extrabold px-1 py-0.2 rounded uppercase animate-pulse">
                  Vorlage aktiv
                </span>
                <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Spezial-Garderobe & Kleidung
                </div>
                <div className="text-[10px] text-emerald-800 mt-0.5 line-clamp-1 font-mono">
                  {state.wardrobeStyle}
                </div>
              </button>
            )}
            {WARDROBE_OPTIONS.map((opt) => {
              const isSelected = state.wardrobeStyle === opt.label;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    if (isSelected) {
                      setState((prev) => ({
                        ...prev,
                        wardrobeStyle: '',
                        clothingDetails: '',
                      }));
                    } else {
                      setState((prev) => ({
                        ...prev,
                        wardrobeStyle: opt.label,
                        clothingDetails: opt.value,
                      }));
                    }
                  }}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-extrabold text-slate-900">{opt.labelDe}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {opt.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Text Controls for Wardrobe */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="text-xs font-extrabold text-slate-800 block mb-1">
              Haupt-Outfit / Kleidungs-Stil:
            </label>
            <input
              type="text"
              value={state.wardrobeStyle || ''}
              onChange={(e) =>
                setState((prev) => ({ ...prev, wardrobeStyle: e.target.value }))
              }
              placeholder="z.B. Gothic Victorian Trenchcoat, 1920er Wollmantel"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-800 block mb-1">
              Materialien & Details:
            </label>
            <input
              type="text"
              value={state.clothingDetails || ''}
              onChange={(e) =>
                setState((prev) => ({ ...prev, clothingDetails: e.target.value }))
              }
              placeholder="z.B. Dunkler Samt, Messingknöpfe, Seidenschal, Abgewetzte Stiefel"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-slate-800 block mb-1">
              Accessoires & Schmuck:
            </label>
            <input
              type="text"
              value={state.fashionAccessories || ''}
              onChange={(e) =>
                setState((prev) => ({ ...prev, fashionAccessories: e.target.value }))
              }
              placeholder="z.B. Messing-Brille, Taschenuhr, Ledertasche"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>
        </div>

        {/* NEW SUB-SECTION: DETAILREICHE PERSONABERSCHREIBUNG & REQUISITEN */}
        <div className="pt-4 border-t border-slate-100">
          <label className="text-xs font-extrabold text-slate-800 block mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">🎭 Detailreiches Charakter-Profil & Persona-Beschreibung:</span>
            <span className="text-[10px] text-amber-600 font-extrabold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 uppercase">KI-Video Booster</span>
          </label>
          <textarea
            value={state.characterPersonaDescription || ''}
            onChange={(e) =>
              setState((prev) => ({ ...prev, characterPersonaDescription: e.target.value }))
            }
            rows={2}
            placeholder="Beschreibe das Gesicht, Alter, Haare, ethnische Herkunft, Narben, Mimik, Stimmung oder Charaktereigenschaften des Darstellers (z.B. 'A grizzled 45-year-old Scandinavian sea captain with intense piercing blue eyes, weather-beaten skin, heavy silver-flecked beard, looking directly into the camera with a steel gaze, jaw clenched')"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-y font-mono text-[11px]"
          />
          {/* Quick Persona Inspiration Chips */}
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-[9px] font-extrabold text-slate-400 self-center uppercase mr-1">Auswahl-Inspirationen:</span>
            {[
              { label: 'Grizzled Captain', value: 'A grizzled 45-year-old Scandinavian sea captain, wind-beaten face, deep scars on left cheek, piercing steel blue eyes, heavy grey-flecked beard, stern expression.' },
              { label: 'Cyber Netrunner', value: 'A sleek 24-year-old Asian netrunner, glowing neon wire optic patterns trailing on cheekbones, sharp gaze, asymmetric undercut hair dyed neon violet.' },
              { label: 'Gothic Priestess', value: 'An elegant 30-year-old woman with pale porcelain skin, intense dark eyes shadowed by long lashes, dark braided black hair, looking up towards the light source.' },
              { label: 'Weary Superintendent', value: 'A weary 50-year-old female construction superintendent, dusty sunburned skin, safety goggles sitting on her forehead, determined expression, sweat beads on jawline.' },
              { label: 'Michelin Sushi Master', value: 'An elder 60-year-old Japanese sushi master, serene focus, hair tied in a traditional white headband, intense precision in eyes, subtle wrinkles of wisdom around mouth.' },
              { label: 'Sensual Elegance (NSFW)', value: 'An alluring 35-year-old woman with deep emerald eyes, wearing backless dark lace bodice, shoulder bare, soft skin highlighted by candlelight, an air of intense romantic passion and intimate visual tension.' },
              { label: 'Seductive Rebel (NSFW)', value: 'A charismatic 28-year-old athletic man, half-unbuttoned wet linen shirt, strong jawline, messy dark hair, mischievous half-smile, high visual intimacy, cinematic moodiness.' }
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => setState((prev) => ({ ...prev, characterPersonaDescription: chip.value }))}
                className="text-[9px] px-2 py-0.5 bg-slate-100 hover:bg-amber-100/60 active:bg-amber-100 border border-slate-200 hover:border-amber-400 rounded-lg text-slate-700 font-bold transition-colors"
              >
                + {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CONCEPT INPUT / MULTI-WINDOW EDITOR */}
      {state.generatorMode === 'single' ? (
        /* SINGLE CLIP CONCEPT INPUT */
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Szenen-Beschreibung (Haupt-Konzept)
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Zurücksetzen
            </button>
          </div>

          {/* Reference Image Quantity & Tag Bar */}
          <div className="mb-3 bg-amber-50/90 border border-amber-300 rounded-xl p-3 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-2">
              <span className="font-extrabold text-amber-950 text-xs flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-700" />
                Referenzbilder-Anzahl wählen:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[0, 1, 2, 3, 4].map((num) => {
                  const isSelected = state.referenceImages.length === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleSetReferenceCount(num)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all border ${
                        isSelected
                          ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                          : 'bg-white text-slate-800 border-slate-300 hover:bg-amber-100'
                      }`}
                    >
                      {num === 0
                        ? '0 Bilder'
                        : num === 1
                        ? 'Exakt 1 Bild (picture 1)'
                        : `${num} Bilder (picture 1–${num})`}
                    </button>
                  );
                })}
              </div>
            </div>

            {state.referenceImages.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-bold text-slate-700">
                  Tag im Text verankern:
                </span>
                {state.referenceImages.map((ref, idx) => (
                  <button
                    key={ref.id}
                    type="button"
                    onClick={() => handleInjectTag(`(picture ${idx + 1})`)}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-950 font-mono text-[11px] font-extrabold border border-amber-300 rounded-lg transition-all shadow-2xs"
                  >
                    +(picture {idx + 1})
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 italic">
                Keine Referenzbilder gewählt. Der Output wird keine "reference_pictures:" Zeile enthalten.
              </div>
            )}
          </div>

          <textarea
            value={state.rawConcept}
            onChange={(e) =>
              setState((prev) => ({ ...prev, rawConcept: e.target.value }))
            }
            placeholder="z.B. Sweeping aerial view of a remote rocky island during a violent storm. A woman in her early thirties (picture 1) wearing a heavy wool coat explores..."
            className="w-full h-28 bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none font-sans"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                Format:
                <select
                  value={state.aspectRatio}
                  onChange={(e: any) =>
                    setState((prev) => ({ ...prev, aspectRatio: e.target.value }))
                  }
                  className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                >
                  <option value="16:9">16:9 (Kino / TV)</option>
                  <option value="9:16">9:16 (TikTok / Shorts)</option>
                  <option value="1:1">1:1 (Quadrat)</option>
                  <option value="2.39:1">2.39:1 (Anamorph Widescreen)</option>
                </select>
              </span>

              <span className="flex items-center gap-1.5 font-medium">
                Dauer:
                <select
                  value={state.durationSeconds}
                  onChange={(e: any) =>
                    setState((prev) => ({
                      ...prev,
                      durationSeconds: Number(e.target.value),
                    }))
                  }
                  className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-slate-900 font-bold focus:outline-none focus:border-amber-500"
                >
                  <option value={3}>3s Clip</option>
                  <option value={6}>6s Standard (MiniMax H3)</option>
                  <option value={10}>10s Verlängert</option>
                  <option value={12}>12s Studio Trailer (12 Sec)</option>
                  <option value={14}>14s Extended Director Cut (14s) (Standard)</option>
                </select>
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* MULTI-WINDOW DIRECT SEQUENCER CARDS WITH DIALOGUE & IMPACTS */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              Windows & Shot Sequence ({state.windows.length} Windows = {state.windows.length * 3} Sekunden)
            </h3>
            <button
              onClick={handleAddWindow}
              className="text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg border border-amber-300 transition-colors flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Window {state.windows.length + 1} hinzufügen
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {state.windows.map((win, idx) => (
              <div
                key={win.id}
                className="bg-white border border-slate-300 rounded-2xl p-4 shadow-xs relative space-y-3 hover:border-amber-400 transition-all"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 font-black text-xs rounded-full">
                      Shot {win.windowNumber} / Window {win.windowNumber}
                    </span>
                    <span className="text-xs text-slate-500 font-mono font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {win.timeRange}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(win.prompt);
                        if (onShowToast) onShowToast(`Window ${win.windowNumber} Prompt kopiert!`);
                      }}
                      className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Prompt dieses Windows kopieren"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {state.windows.length > 1 && (
                      <button
                        onClick={() => handleRemoveWindow(win.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Window löschen"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700">
                        Szenen-Visuelles & Kamera-Aktion (Referenz als picture 1, picture 2 nutzen):
                      </label>
                      <textarea
                        value={win.prompt}
                        onChange={(e) =>
                          handleUpdateWindow(win.id, { prompt: e.target.value })
                        }
                        placeholder={`Shot ${win.windowNumber} Visuals... z.B. Person (picture 1) betritt den Raum...`}
                        className="w-full h-20 bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 font-sans resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700">
                        Sprecher / Dialog / Whisper in Shot {win.windowNumber}:
                      </label>
                      <input
                        type="text"
                        value={win.dialogue || ''}
                        onChange={(e) =>
                          handleUpdateWindow(win.id, { dialogue: e.target.value })
                        }
                        placeholder='z.B. Narrator: "The light went dark."'
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700">
                        Kamera-Trajektorie / Bewegung:
                      </label>
                      <input
                        type="text"
                        value={win.cameraTrajectory}
                        onChange={(e) =>
                          handleUpdateWindow(win.id, {
                            cameraTrajectory: e.target.value,
                          })
                        }
                        placeholder="z.B. Sweeping aerial view over rocky island"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700">
                        Kontinuitäts-Notiz (Maestro Link):
                      </label>
                      <input
                        type="text"
                        value={win.continuityNote}
                        onChange={(e) =>
                          handleUpdateWindow(win.id, {
                            continuityNote: e.target.value,
                          })
                        }
                        placeholder={`Fortführung der Bewegung aus Shot ${idx > 0 ? idx : 1}`}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700">
                        Sound Impact / SFX Cue:
                      </label>
                      <input
                        type="text"
                        value={win.sfxImpact || ''}
                        onChange={(e) =>
                          handleUpdateWindow(win.id, { sfxImpact: e.target.value })
                        }
                        placeholder="z.B. Heavy trailer impact."
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. KLICK-SYSTEM PARAMETER SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* SECTION 1: KAMERA-FAHRT */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-600" />
              <h3 className="font-extrabold text-sm text-slate-900">Kamera-Fahrt & Bewegung</h3>
            </div>
            {state.cameraMotion && (
              <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-mono font-bold truncate max-w-[200px]" title={state.cameraMotion}>
                📹 {state.cameraMotion}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {state.cameraMotion && !CAMERA_OPTIONS.some((opt) => opt.value === state.cameraMotion) && (
              <button
                type="button"
                onClick={() => setState((prev) => ({ ...prev, cameraMotion: '' }))}
                className="col-span-1 sm:col-span-2 text-left p-2.5 rounded-xl border border-emerald-500 bg-emerald-50 text-slate-950 font-bold shadow-xs relative overflow-hidden"
              >
                <span className="absolute top-1 right-2 text-[8px] bg-emerald-600 text-white font-extrabold px-1 py-0.2 rounded uppercase animate-pulse">
                  Vorlage aktiv
                </span>
                <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Spezial-Kamera (Vorlage)
                </div>
                <div className="text-[10px] text-emerald-800 mt-0.5 line-clamp-1 font-mono">
                  {state.cameraMotion}
                </div>
              </button>
            )}
            {CAMERA_OPTIONS.map((opt) => {
              const isSelected = state.cameraMotion === opt.value;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('cameraMotion', opt.value)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900">{opt.labelDe}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {opt.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: BELEUCHTUNG */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-600" />
              <h3 className="font-extrabold text-sm text-slate-900">Beleuchtung & Stimmung</h3>
            </div>
            {state.lighting && (
              <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-mono font-bold truncate max-w-[200px]" title={state.lighting}>
                ☀️ {state.lighting}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {state.lighting && !LIGHTING_OPTIONS.some((opt) => opt.value === state.lighting) && (
              <button
                type="button"
                onClick={() => setState((prev) => ({ ...prev, lighting: '' }))}
                className="col-span-1 sm:col-span-2 text-left p-2.5 rounded-xl border border-emerald-500 bg-emerald-50 text-slate-950 font-bold shadow-xs relative overflow-hidden"
              >
                <span className="absolute top-1 right-2 text-[8px] bg-emerald-600 text-white font-extrabold px-1 py-0.2 rounded uppercase animate-pulse">
                  Vorlage aktiv
                </span>
                <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Spezial-Beleuchtung (Vorlage)
                </div>
                <div className="text-[10px] text-emerald-800 mt-0.5 line-clamp-1 font-mono">
                  {state.lighting}
                </div>
              </button>
            )}
            {LIGHTING_OPTIONS.map((opt) => {
              const isSelected = state.lighting === opt.value;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('lighting', opt.value)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900">{opt.labelDe}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {opt.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: LINSEN */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Aperture className="w-4 h-4 text-amber-600" />
              <h3 className="font-extrabold text-sm text-slate-900">Linsen & Render-Ästhetik</h3>
            </div>
            {state.lensStyle && (
              <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-mono font-bold truncate max-w-[200px]" title={state.lensStyle}>
                🔍 {state.lensStyle}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {state.lensStyle && !LENS_AESTHETIC_OPTIONS.some((opt) => opt.value === state.lensStyle) && (
              <button
                type="button"
                onClick={() => setState((prev) => ({ ...prev, lensStyle: '' }))}
                className="col-span-1 sm:col-span-2 text-left p-2.5 rounded-xl border border-emerald-500 bg-emerald-50 text-slate-950 font-bold shadow-xs relative overflow-hidden"
              >
                <span className="absolute top-1 right-2 text-[8px] bg-emerald-600 text-white font-extrabold px-1 py-0.2 rounded uppercase animate-pulse">
                  Vorlage aktiv
                </span>
                <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Spezial-Linsen & Look (Vorlage)
                </div>
                <div className="text-[10px] text-emerald-800 mt-0.5 line-clamp-1 font-mono">
                  {state.lensStyle}
                </div>
              </button>
            )}
            {LENS_AESTHETIC_OPTIONS.map((opt) => {
              const isSelected = state.lensStyle === opt.value;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('lensStyle', opt.value)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900">{opt.labelDe}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: GESCHWINDIGKEIT */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-600" />
              <h3 className="font-extrabold text-sm text-slate-900">Bewegungs-Geschwindigkeit</h3>
            </div>
            {state.motionSpeed && (
              <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-mono font-bold truncate max-w-[200px]" title={state.motionSpeed}>
                ⚡ {state.motionSpeed}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {state.motionSpeed && !MOTION_SPEED_OPTIONS.some((opt) => opt.value === state.motionSpeed) && (
              <button
                type="button"
                onClick={() => setState((prev) => ({ ...prev, motionSpeed: '' }))}
                className="col-span-1 sm:col-span-2 text-left p-2.5 rounded-xl border border-emerald-500 bg-emerald-50 text-slate-950 font-bold shadow-xs relative overflow-hidden"
              >
                <span className="absolute top-1 right-2 text-[8px] bg-emerald-600 text-white font-extrabold px-1 py-0.2 rounded uppercase animate-pulse">
                  Vorlage aktiv
                </span>
                <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Spezial-Geschwindigkeit (Vorlage)
                </div>
                <div className="text-[10px] text-emerald-800 mt-0.5 line-clamp-1 font-mono">
                  {state.motionSpeed}
                </div>
              </button>
            )}
            {MOTION_SPEED_OPTIONS.map((opt) => {
              const isSelected = state.motionSpeed === opt.value;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption('motionSpeed', opt.value)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-slate-900">{opt.labelDe}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AUDIO / SOUND GENERATION TAGS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-600" />
            <h3 className="font-extrabold text-sm text-slate-900">
              Audio & Sound-Cues (MiniMax Audio Sync)
            </h3>
          </div>
          {state.audioCue && (
            <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-mono font-bold truncate max-w-[200px]" title={state.audioCue}>
              🎵 {state.audioCue}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {state.audioCue && !AUDIO_CUE_OPTIONS.some((opt) => opt.value === state.audioCue) && (
            <button
              type="button"
              onClick={() => setState((prev) => ({ ...prev, audioCue: '' }))}
              className="col-span-1 sm:col-span-2 text-left p-2.5 rounded-xl border border-emerald-500 bg-emerald-50 text-slate-950 font-bold shadow-xs relative overflow-hidden"
            >
              <span className="absolute top-1 right-2 text-[8px] bg-emerald-600 text-white font-extrabold px-1 py-0.2 rounded uppercase animate-pulse">
                Vorlage aktiv
              </span>
              <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                Spezial-Sound-Cue (Vorlage)
              </div>
              <div className="text-[10px] text-emerald-800 mt-0.5 line-clamp-1 font-mono">
                {state.audioCue}
              </div>
            </button>
          )}
          {AUDIO_CUE_OPTIONS.map((opt) => {
            const isSelected = state.audioCue === opt.value;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption('audioCue', opt.value)}
                className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                  isSelected
                    ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-slate-900">{opt.labelDe}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* NSFW & MATURE KEYWORD PANEL */}
      {state.nsfwMode && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 shadow-xs relative overflow-hidden space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-rose-200 pb-2.5">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-600 animate-pulse" />
              <div>
                <h3 className="font-extrabold text-sm text-rose-950">
                  NSFW & Edge-Keyword Bibliothek (Aktiv)
                </h3>
                <p className="text-[11px] text-rose-700">
                  Nutzt kinoreife & anatomische Begriffe für unfilterbare viszerale Intensität in MiniMax H3.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-rose-600 text-white text-xs font-mono font-bold rounded-full shadow-xs">
              UNFILTERED HORROR / EDGE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {NSFW_MATURE_KEYWORDS.map((kw) => {
              const isSelected = state.selectedNsfwKeywords.includes(kw.value);
              return (
                <button
                  key={kw.id}
                  onClick={() => handleToggleNsfwKeyword(kw.value)}
                  className={`text-left p-3 rounded-xl border text-xs transition-all relative ${
                    isSelected
                      ? 'bg-rose-200 border-rose-500 text-rose-950 font-bold shadow-xs'
                      : 'bg-white border-rose-200 text-slate-800 hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-rose-900 mb-1">
                    <span>{kw.labelDe}</span>
                    {isSelected ? (
                      <X className="w-3.5 h-3.5 text-rose-700" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-rose-400" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-600 leading-tight">
                    {kw.description}
                  </div>
                  <div className="mt-1.5 text-[10px] font-mono text-rose-800 truncate">
                    {kw.value}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
