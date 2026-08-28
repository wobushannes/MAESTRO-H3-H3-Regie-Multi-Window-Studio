import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Sun,
  Aperture,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  SlidersHorizontal,
  Bookmark,
  BookOpen,
  Film,
  Layers,
  Search,
  Bot,
  Tag,
  Image as ImageIcon,
  Shirt,
  Mic,
} from 'lucide-react';
import { PromptBuildState, PresetTemplate } from '../types';
import {
  CAMERA_OPTIONS,
  LIGHTING_OPTIONS,
  LENS_AESTHETIC_OPTIONS,
  AUDIO_CUE_OPTIONS,
  WARDROBE_OPTIONS,
  NARRATOR_VOICE_OPTIONS,
} from '../data/parameters';
import { PRESET_TEMPLATES } from '../data/presets';
import {
  compileCleanVisualVideoPrompt,
  compileStudioTheatricalScript,
  getNarratorVoiceFallbackForCategory,
} from '../utils/promptCompiler';

interface PromptWizardProps {
  state: PromptBuildState;
  setState: React.Dispatch<React.SetStateAction<PromptBuildState>>;
  onSwitchToProMode: () => void;
  onSavePreset: () => void;
  onShowToast: (msg: string) => void;
}

export const PromptWizard: React.FC<PromptWizardProps> = ({
  state,
  setState,
  onSwitchToProMode,
  onSavePreset,
  onShowToast,
}) => {
  const isEn = state.language === 'en';
  const [currentStep, setCurrentStep] = useState(1);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [presetSearch, setPresetSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Available reference tags
  const referenceTags = [
    { tag: 'picture 1', label: isEn ? 'Main Subject / Face' : 'Haupt-Subjekt / Gesicht' },
    { tag: 'picture 2', label: isEn ? 'Style / Environment' : 'Stil / Umgebung' },
    { tag: 'picture 3', label: isEn ? 'Prop / Action Object' : 'Requisite / Objekt' },
  ];

  const handleInjectTag = (tag: string) => {
    setState((prev) => {
      const existing = prev.rawConcept;
      const space = existing.length > 0 && !existing.endsWith(' ') ? ' ' : '';
      return {
        ...prev,
        rawConcept: `${existing}${space}(${tag})`,
      };
    });
    onShowToast(isEn ? `Tag "(${tag})" added to prompt!` : `Tag "(${tag})" zum Prompt hinzugefügt!`);
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
            id: `ref-wiz-${Date.now()}-${i}`,
            label: i === 1 ? (isEn ? 'Subject Reference' : 'Subjekt-Referenz') : i === 2 ? (isEn ? 'Style Reference' : 'Stil-Referenz') : (isEn ? `Reference Image ${i}` : `Referenzbild ${i}`),
            tag: `picture ${i}`,
            role: i === 1 ? 'subject' : 'style',
            url: i === 1
              ? 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80'
              : 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
            description: i === 1 ? (isEn ? 'Main Character / Face Anchor' : 'Hauptcharakter / Gesichts-Anker') : (isEn ? `Reference Picture ${i}` : `Referenz Bild ${i}`),
          });
        }
      }
      return { ...prev, referenceImages: current };
    });
    if (count === 1) {
      onShowToast(isEn ? '🖼️ Exactly 1 reference image (picture 1) active!' : '🖼️ Exakt 1 Referenzbild (picture 1) aktiv!');
    } else if (count === 0) {
      onShowToast(isEn ? '🚫 Reference images deactivated (0 images)' : '🚫 Referenzbilder deaktiviert (0 Bilder)');
    } else {
      onShowToast(isEn ? `🖼️ ${count} reference images selected!` : `🖼️ ${count} Referenzbilder gewählt!`);
    }
  };

  const handleApplyPreset = (preset: PresetTemplate) => {
    setState((prev) => {
      const newState: PromptBuildState = {
        ...prev,
        rawConcept: preset.prompt,
        cameraMotion: preset.camera,
        lighting: preset.lighting,
        lensStyle: preset.lens,
        motionSpeed: preset.motionSpeed || '24fps Normal',
        audioCue: preset.audioCue || '',
        negativePrompt: preset.negativePrompt,
        styleCode: preset.styleCode || 'ASTROCINEMAV01K2T',
        wardrobeStyle: preset.wardrobeStyle || '',
        clothingDetails: preset.clothingDetails || '',
        movieTitle: preset.movieTitle || preset.title.toUpperCase(),
        dialogueLines: preset.dialogueLines || '',
        narratorVoice: preset.narratorVoice || getNarratorVoiceFallbackForCategory(preset.category, preset.title),
        characterPersonaDescription: preset.characterPersonaDescription || '',
      };

      if (preset.windowsCount && preset.windowsCount > 1) {
        newState.generatorMode = 'multi';
        newState.windows = Array.from({ length: preset.windowsCount }, (_, i) => i + 1).map((idx) => ({
          id: `win-wiz-${Date.now()}-${idx}`,
          windowNumber: idx,
          timeRange: `${(idx - 1) * 3}s - ${idx * 3}s`,
          prompt:
            idx === 1
              ? preset.prompt
              : isEn ? `Continuation of action in Window ${idx}` : `Fortführung der Handlung in Window ${idx}`,
          cameraTrajectory: preset.camera || (isEn ? 'Dynamic camera continuation' : 'Dynamische Kameraweiterführung'),
          continuityNote: isEn ? `Seamless continuity from Window ${idx - 1}` : `Nahtlose Kontinuität aus Window ${idx - 1}`,
          motionSpeed: preset.motionSpeed || '24fps Normal',
          referenceImages: [],
        }));
      } else {
        newState.generatorMode = 'single';
      }

      return newState;
    });

    setShowPresetModal(false);
    onShowToast(isEn ? `✨ Template "${preset.title}" loaded!` : `✨ Vorlage "${preset.title}" geladen!`);
  };

  // Set Multi-Window Quantity helper
  const handleSetWindowCount = (targetCount: number) => {
    setState((prev) => {
      const current = [...prev.windows];
      if (targetCount > current.length) {
        for (let i = current.length + 1; i <= targetCount; i++) {
          const startSec = (i - 1) * 3;
          const endSec = i * 3;
          current.push({
            id: `win-wiz-${Date.now()}-${i}`,
            windowNumber: i,
            timeRange: `${startSec}s - ${endSec}s`,
            prompt: i === 1 ? prev.rawConcept || (isEn ? 'Scene start' : 'Szene Start') : (isEn ? `Continuation in Window ${i}` : `Fortführung der Bewegung in Window ${i}`),
            cameraTrajectory: prev.cameraMotion || (isEn ? 'Seamless camera continuation' : 'Nahtlose Kamera-Weiterführung'),
            continuityNote: isEn ? `Continuity from Window ${i - 1}` : `Kontinuität aus Window ${i - 1}`,
            motionSpeed: '24fps Normal',
            referenceImages: [],
          });
        }
      } else if (targetCount < current.length && targetCount >= 1) {
        current.splice(targetCount);
      }
      return { ...prev, windows: current, generatorMode: 'multi' };
    });
  };

  const steps = [
    { num: 1, title: isEn ? 'Idea & Concept' : 'Idee & Thema' },
    { num: 2, title: isEn ? 'Wardrobe & Style' : 'Mode & Kleidung' },
    { num: 3, title: isEn ? 'Clip vs. Multi-Window' : 'Clip vs. Multi-Window' },
    { num: 4, title: isEn ? 'Camera Motion' : 'Kamera & Fahrt' },
    { num: 5, title: isEn ? 'Lighting & Mood' : 'Licht & Atmosphäre' },
    { num: 6, title: isEn ? 'Lens & Optics' : 'Optik & Linsen' },
    { num: 7, title: isEn ? 'Audio & Format' : 'Audio & Format' },
    { num: 8, title: isEn ? 'Final Prompt' : 'Fertiger Prompt' },
  ];

  // Filter presets for modal
  const filteredPresets = PRESET_TEMPLATES.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(presetSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(presetSearch.toLowerCase()) ||
      p.prompt.toLowerCase().includes(presetSearch.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(presetSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Compile final outputs for review
  const compileLocalPrompt = () => compileCleanVisualVideoPrompt(state);
  const compileMaestroScript = () => compileStudioTheatricalScript(state);

  const handleCopyResult = () => {
    const text =
      state.generatorMode === 'single'
        ? compileLocalPrompt()
        : compileMaestroScript();
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    onShowToast(isEn ? '📋 Clean video prompt copied!' : '📋 Sauberen Video-Prompt kopiert!');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-28 animate-fadeIn">
      {/* Wizard Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-amber-400 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold tracking-tight">
                  {isEn ? 'Dialog Mode: Prompting Assistant (Wizard)' : 'Dialogmodus: Prompting-Assistent (Wizard)'}
                </h2>
                <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full uppercase">
                  {isEn ? 'Guided' : 'Geführt'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {isEn
                  ? 'Build your studio trailer including wardrobe, clothing, reference pictures (picture 1, picture 2) & multi-window logic!'
                  : 'Erstelle deinen Studio-Trailer inkl. Mode, Kleidung, Referenzbildern (picture 1, picture 2) & Multi-Window Logik!'}
              </p>
            </div>
          </div>

          <button
            onClick={onSwitchToProMode}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-400/30 rounded-xl text-xs font-extrabold transition-all shrink-0 self-start md:self-auto cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            {isEn ? 'Switch to Pro Mode' : 'Zum Profimodus wechseln'}
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="grid grid-cols-8 gap-1 sm:gap-2">
            {steps.map((s) => {
              const isCompleted = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setCurrentStep(s.num)}
                  className={`flex flex-col items-center gap-1.5 transition-all text-center group cursor-pointer ${
                    isCurrent
                      ? 'text-amber-400 font-extrabold'
                      : isCompleted
                      ? 'text-emerald-400 font-bold'
                      : 'text-slate-500 hover:text-slate-300 font-medium'
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md ring-4 ring-amber-500/20'
                        : isCompleted
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className="text-[10px] hidden sm:inline line-clamp-1">
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* STEP CONTENT CARDS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        {/* ================= STEP 1: IDEE & THEMA ================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {isEn ? 'What do you want to show in your video?' : 'Was möchtest du in deinem Video zeigen?'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isEn ? 'Describe your scene or choose from the curated templates library.' : 'Beschreibe die Szene oder wähle aus der Vorlagen-Bibliothek.'}
                  </p>
                </div>
              </div>

              {/* Big Template Library Button */}
              <button
                onClick={() => setShowPresetModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all shrink-0 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                {isEn ? `Select Template (${PRESET_TEMPLATES.length}+ Presets)` : `Fertige Vorlage wählen (${PRESET_TEMPLATES.length}+ Vorlagen)`}
              </button>
            </div>

            {/* Reference Image Quantity & Tag Bar in Wizard */}
            <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-extrabold text-slate-900">
                    {isEn ? 'Select Reference Images Count (0, 1, 2, 3):' : 'Referenzbilder-Anzahl wählen (0, 1, 2, 3):'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[0, 1, 2, 3, 4].map((num) => {
                    const isSelected = state.referenceImages.length === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleSetReferenceCount(num)}
                        className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                            : 'bg-white text-slate-800 border-slate-300 hover:bg-amber-100'
                        }`}
                      >
                        {num === 0
                          ? (isEn ? '0 Images' : '0 Bilder')
                          : num === 1
                          ? (isEn ? 'Exactly 1 Image (picture 1)' : 'Exakt 1 Bild (picture 1)')
                          : (isEn ? `${num} Images (picture 1–${num})` : `${num} Bilder (picture 1–${num})`)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {state.referenceImages.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-700">
                    {isEn ? 'Anchor tag in prompt:' : 'Tag im Prompt verankern:'}
                  </span>
                  {state.referenceImages.map((ref, idx) => (
                    <button
                      key={ref.id}
                      type="button"
                      onClick={() => handleInjectTag(`picture ${idx + 1}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-100 text-amber-950 font-mono text-xs font-extrabold border border-amber-300 rounded-xl shadow-2xs transition-all cursor-pointer"
                    >
                      <Tag className="w-3 h-3 text-amber-600" />
                      <span>picture {idx + 1}</span>
                      <span className="text-[10px] font-sans text-slate-600 font-medium">
                        ({ref.label})
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-[11px] text-slate-500 italic">
                  {isEn ? 'No reference images selected (0 images).' : 'Keine Referenzbilder gewählt (0 Bilder).'}
                </div>
              )}
            </div>

            {/* Quick Inspiration Featured Horror & Styles */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-800 block">
                {isEn ? 'Popular Quick Presets (Horror, Lovecraft, Alien, Construction, Real Estate, Food):' : 'Beliebte Schnell-Vorlagen (Horror, Lovecraft, Alien, Bau, Immobilien, Food):'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {PRESET_TEMPLATES.slice(0, 6).map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => handleApplyPreset(tpl)}
                    className="text-left p-3 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-xl text-xs transition-all space-y-1 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-extrabold text-slate-900 line-clamp-1 group-hover:text-amber-900">
                        {tpl.title}
                      </span>
                      {tpl.badge && (
                        <span className={`px-1.5 py-0.5 text-[9px] font-black rounded uppercase shrink-0 ${
                          tpl.category === 'horror' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {tpl.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-2">
                      {tpl.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Movie Title / Abspann Title Input */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-900 block">
                  {isEn ? 'Movie / Screenplay Title (for title card outro):' : 'Film- / Abspann-Titel (Eingabe für Abspann-Titelkarte):'}
                </label>
                <span className="text-[10px] text-amber-700 font-bold">
                  {isEn ? 'Displayed on ending title card' : 'Wird am Ende im Abspann eingeblendet'}
                </span>
              </div>
              <input
                type="text"
                value={state.movieTitle || ''}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, movieTitle: e.target.value }))
                }
                placeholder={isEn ? 'e.g. THE LAST LIGHTHOUSE, CTHULHU RISING, NEON PROTOCOL' : 'z.B. DAS ERWACHEN DES BÖSEN, THE LAST LIGHTHOUSE, CTHULHU RISING'}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-extrabold text-amber-950 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Free Text Input */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-900 block">
                  {isEn ? 'Your Scene Concept / Custom Prompt Text:' : 'Deine eigene Szenen-Beschreibung / Prompt-Text:'}
                </label>
                {state.rawConcept && (
                  <button
                    onClick={() => setState((prev) => ({ ...prev, rawConcept: '' }))}
                    className="text-[10px] text-slate-400 hover:text-rose-600 font-bold cursor-pointer"
                  >
                    {isEn ? 'Clear text' : 'Text löschen'}
                  </button>
                )}
              </div>
              <textarea
                value={state.rawConcept}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, rawConcept: e.target.value }))
                }
                placeholder={isEn ? 'Describe what happens in your video... Use (picture 1) for your face or main subject!' : 'Schreibe hier, was im Video passiert... Verwende (picture 1) für dein Gesicht oder Haupt-Subjekt!'}
                className="w-full h-36 bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 font-sans resize-none leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 2: MODE & KLEIDUNG ================= */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-amber-600" />
                  {isEn ? 'Fashion, Wardrobe & Character Styling' : 'Mode, Kleidung & Character Styling entscheiden'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isEn ? 'Define exact clothing, materials and accessories your character wears in the video.' : 'Bestimme exakt, welche Kleidung, Stoffe und Accessoires dein Charakter im Video trägt.'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-800 block">
                {isEn ? 'Quick Select Outfit Categories:' : 'Schnellauswahl Outfit-Kategorien:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
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
                      className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-extrabold text-slate-900">{isEn ? opt.label : opt.labelDe}</div>
                      <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        {opt.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div>
                <label className="text-xs font-extrabold text-slate-800 block mb-1">
                  {isEn ? 'Clothing Description (Custom text):' : 'Kleidungs-Beschreibung (Freitext):'}
                </label>
                <input
                  type="text"
                  value={state.clothingDetails || ''}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, clothingDetails: e.target.value }))
                  }
                  placeholder={isEn ? 'e.g. Weatherproof trenchcoat, distressed leather, silk scarf' : 'z.B. Wetterfester Ölmantel, abgewetztes Leder, Seidenschal'}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-800 block mb-1">
                  {isEn ? 'Accessories & Jewelry:' : 'Accessoires & Schmuck:'}
                </label>
                <input
                  type="text"
                  value={state.fashionAccessories || ''}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, fashionAccessories: e.target.value }))
                  }
                  placeholder={isEn ? 'e.g. Brass goggles, silver pocket chain, vintage watch' : 'z.B. Runde Messing-Brille, Silberkette, Vintage-Uhr'}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CLIP VS. MULTI-WINDOW ================= */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {isEn ? 'Single Clip or Multi-Window Sequence?' : 'Möchtest du 1 Einzel-Clip oder eine Multi-Window Sequenz?'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isEn ? 'Choose between a standalone clip or a structured multi-window studio progression.' : 'Wähle zwischen einzelnem Clip oder strukturierter Multi-Window Abfolge.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option Single Clip */}
              <button
                onClick={() =>
                  setState((prev) => ({ ...prev, generatorMode: 'single' }))
                }
                className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  state.generatorMode === 'single'
                    ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-amber-500 text-slate-950 rounded-xl">
                    <Film className="w-5 h-5" />
                  </div>
                  {state.generatorMode === 'single' && (
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <h4 className="font-extrabold text-sm text-slate-900">
                  {isEn ? 'Single Clip (No Windows)' : 'Einzelner Clip (Keine Windows)'}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isEn ? 'Generates 1 cohesive prompt for a fluid 3s–10s video clip.' : 'Generiert 1 zusammenhängenden Prompt für ein flüssiges 3s–10s Video.'}
                </p>
              </button>

              {/* Option Multi-Window */}
              <button
                onClick={() => {
                  setState((prev) => ({ ...prev, generatorMode: 'multi' }));
                  if (state.windows.length === 0) handleSetWindowCount(2);
                }}
                className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  state.generatorMode === 'multi'
                    ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-amber-500 text-slate-950 rounded-xl">
                    <Layers className="w-5 h-5" />
                  </div>
                  {state.generatorMode === 'multi' && (
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <h4 className="font-extrabold text-sm text-slate-900">
                  {isEn ? 'Multi-Window Sequence' : 'Multi-Window Sequenz'}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isEn ? 'Connects multiple consecutive 3s windows into a full studio trailer.' : 'Verbindet mehrere zusammenhängende 3s-Windows zu einem Studio-Trailer.'}
                </p>
              </button>
            </div>

            {/* If Multi-Window selected, ask for window count */}
            {state.generatorMode === 'multi' && (
              <div className="bg-slate-900 text-white rounded-xl p-4 space-y-3">
                <label className="text-xs font-extrabold text-amber-400 block">
                  {isEn ? 'How many Windows do you want to connect?' : 'Wie viele Windows möchtest du verbinden?'}
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {[2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleSetWindowCount(num)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        state.windows.length === num
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {num} Windows ({num * 3} {isEn ? 'Seconds' : 'Sekunden'})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 4: KAMERA & BEWEGUNG ================= */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-600" />
                  {isEn ? 'How should the camera move?' : 'Wie soll sich die Kamera bewegen?'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isEn ? 'Camera dynamics provide high-end cinematic momentum.' : 'Die Kameradynamik verleiht dem Video cineastischen Schwung.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {CAMERA_OPTIONS.map((opt) => {
                const isSelected = state.cameraMotion === opt.value;
                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        cameraMotion: isSelected ? '' : opt.value,
                      }))
                    }
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-slate-900">
                      {isEn ? opt.label : opt.labelDe}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                      {opt.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 5: LICHT & ATMOSPHÄRE ================= */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shrink-0">
                5
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-600" />
                  {isEn ? 'Which lighting mood fits the scene?' : 'Welche Lichtstimmung passt zur Szene?'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isEn ? 'Select lighting for maximum visual drama and contrast.' : 'Wähle die Beleuchtung für maximale visuelle Dramatik.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {LIGHTING_OPTIONS.map((opt) => {
                const isSelected = state.lighting === opt.value;
                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        lighting: isSelected ? '' : opt.value,
                      }))
                    }
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-slate-900">
                      {isEn ? opt.label : opt.labelDe}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                      {opt.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 6: OPTIK & LINSEN ================= */}
        {currentStep === 6 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shrink-0">
                6
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Aperture className="w-5 h-5 text-amber-600" />
                  {isEn ? 'Which lens & render look should be used?' : 'Welcher Linsen- & Render-Look soll genutzt werden?'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isEn ? 'Defines depth of field, anamorphic flares, optical grain and texture.' : 'Bestimmt Schärfentiefe, Anamorph-Flares und Textur.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {LENS_AESTHETIC_OPTIONS.map((opt) => {
                const isSelected = state.lensStyle === opt.value;
                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        lensStyle: isSelected ? '' : opt.value,
                      }))
                    }
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-slate-900">
                      {isEn ? opt.label : opt.labelDe}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                      {opt.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 7: AUDIO & FORMAT ================= */}
        {currentStep === 7 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center shrink-0">
                7
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-amber-600" />
                  {isEn ? 'Sound Cues, Narrator & Format Settings' : 'Sound-Cues & Videoformat einstellen'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isEn ? 'Add synchronized sound effects, narrator voices, and aspect ratios.' : 'Füge Soundeffekte hinzu und wähle das Seitenverhältnis.'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-800 block">
                {isEn ? 'Sound Cue (Optional):' : 'Sound-Cue (Optional):'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {AUDIO_CUE_OPTIONS.map((opt) => {
                  const isSelected = state.audioCue === opt.value;
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          audioCue: isSelected ? '' : opt.value,
                        }))
                      }
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="font-bold">{isEn ? opt.label : opt.labelDe}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Narrator Voice Selection */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-amber-600" />
                {isEn ? '🎙️ Cinema Narrator & Voice Character:' : '🎙️ Kino-Sprecher & Stimme (Narrator Voice):'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {NARRATOR_VOICE_OPTIONS.map((opt) => {
                  const isSelected =
                    state.narratorVoice === opt.value ||
                    (Boolean(state.narratorVoice) &&
                      state.narratorVoice.toLowerCase().includes(opt.label.toLowerCase().slice(0, 15)));
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          narratorVoice: isSelected ? '' : opt.value,
                        }))
                      }
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 border-amber-600 text-slate-950 font-extrabold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50/50'
                      }`}
                    >
                      <div className="font-extrabold">{isEn ? opt.label : opt.labelDe}</div>
                      <div className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-slate-950/80 font-bold' : 'text-slate-500'}`}>
                        {opt.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-4 text-xs font-bold">
              <span>{isEn ? 'Aspect Ratio:' : 'Seitenverhältnis:'}</span>
              <select
                value={state.aspectRatio}
                onChange={(e: any) =>
                  setState((prev) => ({ ...prev, aspectRatio: e.target.value }))
                }
                className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900"
              >
                <option value="16:9">{isEn ? '16:9 (Cinema / TV)' : '16:9 (Kino / TV)'}</option>
                <option value="9:16">{isEn ? '9:16 (TikTok / Shorts)' : '9:16 (TikTok / Shorts)'}</option>
                <option value="1:1">{isEn ? '1:1 (Square)' : '1:1 (Quadrat)'}</option>
                <option value="2.39:1">{isEn ? '2.39:1 (Widescreen)' : '2.39:1 (Widescreen)'}</option>
              </select>
            </div>
          </div>
        )}

        {/* ================= STEP 8: FERTIGER PROMPT / EXPORT ================= */}
        {currentStep === 8 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">
                ✓
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {isEn ? 'Your prompt is compiled and ready!' : 'Dein Prompt ist fertig zusammengestellt!'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isEn
                    ? 'Here is your optimized result for MiniMax H3. You can copy it directly or refine in Pro Mode.'
                    : 'Hier ist dein Ergebnis für MiniMax H3. Du kannst es direkt kopieren oder im Profimodus weiterbearbeiten.'}
                </p>
              </div>
            </div>

            {/* Reference Anchor Bar in Step 8 */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                {isEn ? 'Anchor Reference Image in Prompt:' : 'Referenzbild verankern:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {referenceTags.map((rt) => (
                  <button
                    key={rt.tag}
                    onClick={() => handleInjectTag(rt.tag)}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-slate-900 font-mono text-[11px] font-bold border border-amber-300 rounded-lg transition-all cursor-pointer"
                  >
                    {rt.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Output */}
            <div className="bg-slate-900 text-amber-300 p-4 rounded-xl font-mono text-xs leading-relaxed max-h-56 overflow-y-auto select-all shadow-inner">
              {state.generatorMode === 'single'
                ? compileLocalPrompt()
                : compileMaestroScript()}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCopyResult}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-md transition-all cursor-pointer"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4" /> {isEn ? 'Copied!' : 'Kopiert!'}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> {isEn ? 'Copy Video Prompt' : 'Prompt kopieren'}
                  </>
                )}
              </button>

              <button
                onClick={onSwitchToProMode}
                className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                {isEn ? 'Fine-tune in Pro Mode' : 'Im Profimodus anpassen'}
              </button>

              <button
                onClick={() => {
                  onSavePreset();
                  onShowToast(isEn ? '💾 Saved to your templates!' : '💾 In deinen Vorlagen gespeichert!');
                }}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs border border-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-slate-600" /> {isEn ? 'Save as Template' : 'Als Vorlage speichern'}
              </button>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> {isEn ? 'Back' : 'Zurück'}
          </button>

          <span className="text-xs font-mono font-bold text-slate-400">
            {isEn ? `Step ${currentStep} of ${steps.length}` : `Schritt ${currentStep} von ${steps.length}`}
          </span>

          {currentStep < steps.length ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
              className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
            >
              {isEn ? 'Next' : 'Weiter'} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> {isEn ? 'Restart' : 'Neustart'}
            </button>
          )}
        </div>
      </div>

      {/* FULL PRESET MODAL FOR WIZARD STEP 1 */}
      {showPresetModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl font-black">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">
                    {isEn ? 'Choose Template Library' : 'Vorlagen-Bibliothek wählen'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {isEn
                      ? `Select from ${PRESET_TEMPLATES.length} curated Horror, Sci-Fi, Construction, Real Estate & Fashion styles`
                      : `Wähle aus ${PRESET_TEMPLATES.length} vorgefertigten Horror-, Bau-, Immobilien- & Fashion-Stilen`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPresetModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Filter Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={presetSearch}
                    onChange={(e) => setPresetSearch(e.target.value)}
                    placeholder={isEn ? 'Search templates (e.g. Lovecraft, Fog, Alien, Portrait, Welding)...' : 'Suche in Vorlagen (z.B. Lovecraft, Nebel, Alien, Gesicht, Schweißen)...'}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                {/* Categories */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', label: isEn ? 'All' : 'Alle' },
                    { id: 'horror', label: '🧟 Horror' },
                    { id: 'sitcom', label: '📺 Sitcom' },
                    { id: 'scify', label: '🚀 Sci-Fi' },
                    { id: 'bau', label: isEn ? '🏗️ Construction' : '🏗️ Bau' },
                    { id: 'immobilien', label: isEn ? '🏛️ Real Estate' : '🏛️ Immobilien' },
                    { id: 'restaurant', label: isEn ? '🍳 Food & Dining' : '🍳 Gastro' },
                    { id: 'cyberpunk', label: '🌆 Cyberpunk' },
                    { id: 'fashion', label: '💃 Fashion' },
                    { id: 'action', label: '⚡ Action' },
                    { id: 'fantasy', label: '🧙 Fantasy' },
                    { id: 'nature', label: isEn ? '🌿 Nature' : '🌿 Natur' },
                    { id: 'comic', label: '📖 Comic' },
                    { id: 'war', label: isEn ? '🎖️ War Cinema' : '🎖️ Kriegsfilm' },
                    { id: 'politics', label: isEn ? '🏛️ Politics' : '🏛️ Politik' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid Content */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1 bg-slate-100/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredPresets.map((preset) => (
                  <div
                    key={preset.id}
                    className="bg-white border border-slate-200 hover:border-amber-500 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all hover:shadow-md group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-extrabold text-xs text-slate-900 group-hover:text-amber-900 leading-snug">
                          {preset.title}
                        </span>
                        {preset.isNsfw && (
                          <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[9px] font-black rounded uppercase shrink-0">
                            NSFW
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-3 leading-normal">
                        {preset.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {preset.tags.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyPreset(preset)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {isEn ? 'Load this Template' : 'Diese Vorlage laden'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
