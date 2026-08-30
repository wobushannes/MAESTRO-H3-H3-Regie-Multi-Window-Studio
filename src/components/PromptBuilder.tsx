import React, { useState, useEffect } from 'react';
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
  Eye,
  Footprints,
  Wind,
  Snowflake,
  Hand,
  Activity,
  ShieldCheck,
  Zap,
  Users,
  User,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  ListFilter,
  Sliders,
  HelpCircle,
  Settings,
  Save,
  Edit3,
  UserCheck,
  Building2,
  UtensilsCrossed,
  Building,
  Gift,
  Home,
  Rocket,
  Wand2,
  Trees,
  Crosshair,
  Landmark,
  Heart,
  Utensils,
  PenTool,
  Sofa,
  Compass,
  Sparkle,
  Tv,
} from 'lucide-react';
import { PromptBuildState, MaestroWindow, StyleCategory, PersonCountType, ConfigurableQuickPreset } from '../types';
import {
  WARDROBE_OPTIONS,
  CAMERA_OPTIONS,
  LIGHTING_OPTIONS,
  LENS_AESTHETIC_OPTIONS,
  MOTION_SPEED_OPTIONS,
  AUDIO_CUE_OPTIONS,
  NSFW_MATURE_KEYWORDS,
  NARRATOR_VOICE_OPTIONS,
  POV_RIG_OPTIONS,
  POV_FOOTSTEPS_OPTIONS,
  POV_BREATH_VAPOR_OPTIONS,
  POV_HANDS_OPTIONS,
  POV_WEATHER_IMMERSION_OPTIONS,
} from '../data/parameters';
import {
  formatPrecisionTimeRange,
  getNarratorVoiceFallbackForCategory,
  getDialogueFallbackForCategory,
  getCategoryDefaultReferences,
} from '../utils/promptCompiler';
import {
  getCategoryPovDefaults,
  enforceCategoryPovKinetics,
  getAllPovKineticProfiles,
  CATEGORY_POV_CONFIGS,
} from '../utils/povCategoryDefaults';
import {
  loadQuickPresetsFromStorage,
  saveQuickPresetsToStorage,
  DEFAULT_QUICK_PRESETS,
} from '../utils/templateStorage';
import { ANALOG_MASTER_PRESETS } from '../utils/analogMasterEngine';
import {
  COMMERCIAL_MASTER_PRESETS,
  getCategoryCommercialDefaults,
  getCommercialPresetForCategoryOrTitle,
  CommercialPreset,
} from '../utils/commercialMasterEngine';

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
  const isEn = state.language === 'en';

  // UX Navigation state
  const [compilerSubTab, setCompilerSubTab] = useState<'standard' | 'commercial'>('standard');
  const [claimStudioOpen, setClaimStudioOpen] = useState<boolean>(true);
  const [regieModeExpanded, setRegieModeExpanded] = useState<boolean>(true);
  const commercialCategoryFilter = state.category || 'all';
  const [builderMode, setBuilderMode] = useState<'guided' | 'full'>('guided');
  const [activeStep, setActiveStep] = useState<number>(1);

  // Helper modals/panels
  const [showPovGuide, setShowPovGuide] = useState(false);
  const [voiceFilterCategory, setVoiceFilterCategory] = useState<'all' | 'de' | 'sensual' | 'female_de' | 'male_de' | 'en'>('all');
  const [voiceSearch, setVoiceSearch] = useState('');

  // Configurable Quick Presets State
  const [quickPresets, setQuickPresets] = useState<ConfigurableQuickPreset[]>(() =>
    loadQuickPresetsFromStorage()
  );
  const [showConfigQuickPresetsModal, setShowConfigQuickPresetsModal] = useState(false);
  const [showSaveQuickPresetModal, setShowSaveQuickPresetModal] = useState(false);

  // Parameter Editing State for a single quick preset
  const [editingPreset, setEditingPreset] = useState<ConfigurableQuickPreset | null>(null);

  // Form state for adding/editing a quick preset
  const [newPresetLabelEn, setNewPresetLabelEn] = useState('');
  const [newPresetLabelDe, setNewPresetLabelDe] = useState('');
  const [newPresetIcon, setNewPresetIcon] = useState('🎬');

  // Sync quick presets state to localStorage
  useEffect(() => {
    saveQuickPresetsToStorage(quickPresets);
  }, [quickPresets]);

  const handleOpenEditPresetModal = (qp: ConfigurableQuickPreset) => {
    setEditingPreset({ ...qp });
  };

  const handleSaveEditingPreset = () => {
    if (!editingPreset) return;
    setQuickPresets((prev) =>
      prev.map((p) => (p.id === editingPreset.id ? editingPreset : p))
    );
    const updatedTitle = isEn ? editingPreset.labelEn : editingPreset.labelDe;
    setEditingPreset(null);
    if (onShowToast) {
      onShowToast(
        isEn
          ? `✨ Preset "${updatedTitle}" parameters updated & saved!`
          : `✨ Schnellvorlage "${updatedTitle}" Parameter angepasst & gespeichert!`
      );
    }
  };

  const applyQuickPresetObject = (qp: ConfigurableQuickPreset) => {
    setState((prev) => ({
      ...prev,
      personCount: qp.personCount || '1_person',
      category: qp.category || 'action',
      referenceImages: getCategoryDefaultReferences(qp.category || 'action', qp.personCount || '1_person'),
      rawConcept: qp.rawConcept || prev.rawConcept,
      wardrobeStyle: qp.wardrobeStyle || prev.wardrobeStyle,
      clothingDetails: qp.clothingDetails || prev.clothingDetails,
      cameraMotion: qp.cameraMotion || prev.cameraMotion,
      lighting: qp.lighting || prev.lighting,
      lensStyle: qp.lensStyle || prev.lensStyle,
      narratorVoice: qp.narratorVoice || prev.narratorVoice,
      dialogueLines: qp.dialogueLines || prev.dialogueLines,
      isImmersivePov: qp.isImmersivePov !== undefined ? qp.isImmersivePov : prev.isImmersivePov,
      povFootsteps: (qp.povFootsteps as any) || prev.povFootsteps,
      povBreathVapor: (qp.povBreathVapor as any) || prev.povBreathVapor,
      povInteractiveHands: (qp.povInteractiveHands as any) || prev.povInteractiveHands,
    }));

    if (onShowToast) {
      const title = isEn ? qp.labelEn : qp.labelDe;
      onShowToast(isEn ? `Quick preset "${title}" applied!` : `Schnellvorlage "${title}" angewendet!`);
    }
  };

  const handleSaveCurrentAsQuickPreset = () => {
    if (!newPresetLabelEn.trim() && !newPresetLabelDe.trim()) return;

    const newQP: ConfigurableQuickPreset = {
      id: `qp-custom-${Date.now()}`,
      icon: newPresetIcon || '🎬',
      labelEn: newPresetLabelEn.trim() || newPresetLabelDe.trim(),
      labelDe: newPresetLabelDe.trim() || newPresetLabelEn.trim(),
      descriptionEn: 'Custom quick preset button',
      descriptionDe: 'Eigene Schnellvorlage',
      category: state.category || 'custom',
      personCount: state.personCount || '1_person',
      rawConcept: state.rawConcept || 'Custom prompt concept',
      wardrobeStyle: state.wardrobeStyle,
      clothingDetails: state.clothingDetails,
      cameraMotion: state.cameraMotion,
      lighting: state.lighting,
      lensStyle: state.lensStyle,
      narratorVoice: state.narratorVoice,
      dialogueLines: state.dialogueLines,
      isImmersivePov: state.isImmersivePov,
      isCustom: true,
    };

    setQuickPresets((prev) => [...prev, newQP]);
    setShowSaveQuickPresetModal(false);
    setNewPresetLabelEn('');
    setNewPresetLabelDe('');

    if (onShowToast) {
      onShowToast(isEn ? '✨ New Quick Preset created!' : '✨ Neue Schnellvorlage erstellt!');
    }
  };

  const handleDeleteQuickPreset = (id: string) => {
    setQuickPresets((prev) => prev.filter((p) => p.id !== id));
    if (onShowToast) {
      onShowToast(isEn ? 'Quick preset removed' : 'Schnellvorlage gelöscht');
    }
  };

  const handleResetQuickPresetsToDefault = () => {
    setQuickPresets(DEFAULT_QUICK_PRESETS);
    if (onShowToast) {
      onShowToast(isEn ? 'Quick presets reset to default!' : 'Schnellvorlagen zurückgesetzt!');
    }
  };

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
      characterPersonaDescription: '',
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
      isImmersivePov: false,
      personCount: '1_person',
      povFootsteps: 'walking_bob',
      povBreathVapor: 'auto',
      povInteractiveHands: 'holding_equipment',
      povWeatherImmersion: 'auto',
      povVisceralAudio: false,
    }));
    if (onShowToast) {
      onShowToast(isEn ? 'Builder parameters reset!' : 'Builder-Einstellungen zurückgesetzt!');
    }
  };

  // Inject reference tag into rawConcept
  const handleInjectTag = (tag: string) => {
    setState((prev) => {
      const existing = prev.rawConcept;
      const space = existing.length > 0 && !existing.endsWith(' ') ? ' ' : '';
      return {
        ...prev,
        rawConcept: `${existing}${space}${tag}`,
      };
    });
    if (onShowToast) {
      onShowToast(isEn ? `Tag "${tag}" injected!` : `Tag "${tag}" eingefügt!`);
    }
  };

  // Reference Count Setter
  const handleSetReferenceCount = (count: number) => {
    setState((prev) => {
      let current = [...prev.referenceImages];
      if (count === 0) {
        current = [];
      } else if (count < current.length) {
        current = current.slice(0, count);
      } else if (count > current.length) {
        for (let i = current.length + 1; i <= count; i++) {
          let label = '';
          let description = '';
          let role: 'subject' | 'style' | 'actor' = i === 1 ? 'subject' : 'style';

          if (prev.category === 'immobilien') {
            if (i === 1) {
              label = isEn ? 'House & Exterior Facade (picture 1)' : 'Haus & Fassade (picture 1)';
              description = isEn ? 'Exterior facade / villa property anchor' : 'Außenansicht & Gebäude-Anker';
              role = 'subject';
            } else if (i === 2) {
              label = isEn ? 'Floor Plan & Blueprint (picture 2)' : 'Grundriss & Bauplan (picture 2)';
              description = isEn ? 'Architectural floor plan blueprint anchor' : 'Architektonischer Grundriss-Plan Anker';
              role = 'style';
            } else if (i === 3) {
              label = isEn ? 'Agent / Person (picture 3)' : 'Makler / Person (picture 3)';
              description = isEn ? 'Real estate presenter / client anchor' : 'Makler / Presenter Anker';
              role = 'actor';
            } else {
              label = isEn ? 'Interior Luxury Style (picture 4)' : 'Innenraum & Ausstattungs-Stil (picture 4)';
              description = isEn ? 'Interior luxury design reference' : 'Innenraum & Ausstattungs-Stil';
              role = 'style';
            }
          } else if (prev.category === 'birthday') {
            if (i === 1) {
              label = isEn ? 'Birthday Star / Protagonist (picture 1)' : 'Jubilar / Geburtstagskind (picture 1)';
              description = isEn ? 'Birthday hero facial anchor' : 'Jubilar Gesichts-Anker';
              role = 'subject';
            } else if (i === 2) {
              label = isEn ? 'Singers / Musicians (picture 2)' : 'Musiker & Sänger (picture 2)';
              description = isEn ? 'Singing lead ensemble anchor' : 'Singende Band / Chor Lead';
              role = 'actor';
            } else if (i === 3) {
              label = isEn ? 'Backing Ensemble (picture 3)' : 'Chor & Begleitung (picture 3)';
              description = isEn ? 'Festive chorus anchor' : 'Festliches Begleit-Ensemble';
              role = 'actor';
            } else {
              label = isEn ? 'Cake & Party Setting (picture 4)' : 'Torte & Party-Deko (picture 4)';
              description = isEn ? 'Candles and festive table setting' : 'Kerzen & Party-Kulisse';
              role = 'style';
            }
          } else if (prev.category === 'bau') {
            if (i === 1) {
              label = isEn ? 'Building Facade (picture 1)' : 'Bauobjekt & Fassade (picture 1)';
              description = isEn ? 'Construction exterior anchor' : 'Bauprojekt Außenansicht Anker';
              role = 'subject';
            } else if (i === 2) {
              label = isEn ? 'Construction Plan (picture 2)' : 'Bauplan & Zeichnung (picture 2)';
              description = isEn ? 'CAD & 3D laser blueprint' : 'CAD-Plan & Laser-Messung';
              role = 'style';
            } else if (i === 3) {
              label = isEn ? 'Craftsman / Master (picture 3)' : 'Handwerker / Meister (picture 3)';
              description = isEn ? 'Safety gear craftsman anchor' : 'Handwerker mit Schutzkleidung';
              role = 'actor';
            } else {
              label = isEn ? 'Materials & Finish (picture 4)' : 'Material & Finish (picture 4)';
              description = isEn ? 'Concrete, steel, and tile finish' : 'Baustoff & Oberflächen-Finish';
              role = 'style';
            }
          } else {
            label = i === 1 ? (isEn ? 'Subject Reference (picture 1)' : 'Subjekt-Referenz (picture 1)') : i === 2 ? (isEn ? 'Co-Star / Style Reference (picture 2)' : 'Zweitperson / Stil (picture 2)') : (isEn ? `Reference Image ${i}` : `Referenzbild ${i}`);
            description = i === 1 ? (isEn ? 'Main Character / Subject Anchor' : 'Hauptcharakter / Subjekt Anker') : (isEn ? `Reference Picture ${i}` : `Referenz Bild ${i}`);
          }

          current.push({
            id: `ref-pro-${Date.now()}-${i}`,
            label,
            tag: `picture ${i}`,
            role,
            url: i === 1
              ? 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80'
              : 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
            description,
          });
        }
      }
      return { ...prev, referenceImages: current };
    });
    if (count === 1) {
      if (onShowToast) onShowToast(isEn ? '🖼️ Exactly 1 reference image (picture 1) selected!' : '🖼️ Exakt 1 Referenzbild (picture 1) gewählt!');
    } else if (count === 0) {
      if (onShowToast) onShowToast(isEn ? '🚫 Reference images disabled (0 images)' : '🚫 Referenzbilder deaktiviert (0 Bilder)');
    } else {
      if (onShowToast) onShowToast(isEn ? `🖼️ ${count} reference images selected!` : `🖼️ ${count} Referenzbilder gewählt!`);
    }
  };

  // Window Quantity Setter
  const handleSetWindowCount = (targetCount: number) => {
    setState((prev) => {
      const current = [...prev.windows];
      if (targetCount > current.length) {
        for (let i = current.length + 1; i <= targetCount; i++) {
          current.push({
            id: `win-${Date.now()}-${i}`,
            windowNumber: i,
            timeRange: formatPrecisionTimeRange(i, 14),
            prompt: i === 1 ? prev.rawConcept || 'Cinematic scene start with atmospheric depth' : `Seamless continuation of cinematic motion in Window ${i}`,
            cameraTrajectory: prev.cameraMotion || 'Seamless camera forward continuation',
            continuityNote: `Continuity from Window ${i - 1} maintaining lighting and subject anchor`,
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
        timeRange: formatPrecisionTimeRange(idx + 1, 14),
      }));
      return { ...prev, windows: reindexed };
    });
  };

  const handleUpdateWindow = (id: string, updated: Partial<MaestroWindow>) => {
    setState((prev) => ({
      ...prev,
      windows: prev.windows.map((w) => (w.id === id ? { ...w, ...updated } : w)),
    }));
  };

  // Filtered voice options
  const filteredVoices = NARRATOR_VOICE_OPTIONS.filter((voice) => {
    if (voiceFilterCategory === 'de' && !voice.label.toLowerCase().includes('deutsch') && !voice.labelDe.toLowerCase().includes('deutsch') && !voice.value.toLowerCase().includes('german')) return false;
    if (voiceFilterCategory === 'female_de' && (!voice.labelDe.toLowerCase().includes('frauenstimme') && !voice.labelDe.toLowerCase().includes('weiblich'))) return false;
    if (voiceFilterCategory === 'male_de' && (!voice.labelDe.toLowerCase().includes('männerstimme') && !voice.labelDe.toLowerCase().includes('männlich'))) return false;
    if (voiceFilterCategory === 'sensual' && (!voice.labelDe.toLowerCase().includes('sinnlich') && !voice.label.toLowerCase().includes('sensual') && !voice.labelDe.toLowerCase().includes('samtige'))) return false;
    if (voiceFilterCategory === 'en' && (voice.labelDe.toLowerCase().includes('deutsch') || voice.value.toLowerCase().includes('german'))) return false;

    if (voiceSearch.trim()) {
      const q = voiceSearch.toLowerCase();
      return voice.label.toLowerCase().includes(q) || voice.labelDe.toLowerCase().includes(q) || voice.value.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-28">
      {/* 🎬 STUDIO PROMPT COMPILER TOP MODE TABS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-md space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 font-mono font-black text-xs rounded-md uppercase tracking-wider shadow-sm">
              STUDIO PROMPT COMPILER
            </span>
            <span className="text-xs text-amber-400 font-bold font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {compilerSubTab === 'commercial' ? '📺 Commercial Ads & Werbefilme Engine (184+ Ads)' : '🎬 Standard Cinema Prompt Engine (3,800+)'}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono font-bold flex items-center gap-2">
            <span>Format: {state.aspectRatio || '16:9'}</span>
            <span>•</span>
            <span>Dauer: {state.durationSeconds || 14}s</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setCompilerSubTab('standard')}
            className={`px-4 py-3 rounded-xl border text-left font-black transition-all cursor-pointer flex items-center justify-between ${
              compilerSubTab === 'standard'
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-400/30'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Film className="w-5 h-5 shrink-0" />
              <div>
                <div className="text-sm">Tab (1) Standard Prompts (Normal)</div>
                <div className="text-[10px] opacity-80 font-normal">Kino-Trailer, Sci-Fi, Action, Drama & Multi-Shot</div>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-mono rounded-lg font-bold ${compilerSubTab === 'standard' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-amber-400 border border-slate-700'}`}>
              3,800+
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCompilerSubTab('commercial');
              if (!state.commercialBrandName) {
                const defaults = getCategoryCommercialDefaults(state.category || 'immobilien');
                setState(prev => ({
                  ...prev,
                  commercialBrandName: defaults.brandName,
                  commercialClaim: defaults.claim,
                  commercialCallToAction: defaults.callToAction,
                  spatialTextContent: defaults.spatialText,
                  spatialTextOverlayEnabled: true,
                }));
              }
            }}
            className={`px-4 py-3 rounded-xl border text-left font-black transition-all cursor-pointer flex items-center justify-between ${
              compilerSubTab === 'commercial'
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-400/30'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Clapperboard className="w-5 h-5 shrink-0" />
              <div>
                <div className="text-sm">Tab (2) Commercial Ads & Werbefilme</div>
                <div className="text-[10px] opacity-80 font-normal">184+ Ads, Regie-Drehbuch, Brand Slogans & Outro</div>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-mono rounded-lg font-bold ${compilerSubTab === 'commercial' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-amber-400 border border-slate-700'}`}>
              184+ Ads & Outro
            </span>
          </button>
        </div>
      </div>

      {/* 📺 COMMERCIAL ADS & WERBEFILME COCKPIT IN STUDIO PROMPT COMPILER */}
      {compilerSubTab === 'commercial' && (
        <div className="bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/40 rounded-2xl p-4 sm:p-5 text-white shadow-xl space-y-5 animate-fadeIn">
          {/* FEATURE BADGES & TOP STATUS BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 font-black text-[11px] rounded-md uppercase tracking-wider font-mono">
                  184+ Werbespots & Outro
                </span>
                <span className="px-2 py-0.5 bg-slate-800 text-amber-300 text-[11px] font-mono font-bold rounded border border-amber-500/30">
                  ✨ Sauberen Video-Prompt
                </span>
                <span className="px-2 py-0.5 bg-slate-800 text-emerald-300 text-[11px] font-mono font-bold rounded border border-emerald-500/30">
                  🚫 Kein Vorlesen!
                </span>
                <span className="px-2 py-0.5 bg-slate-800 text-cyan-300 text-[11px] font-mono font-bold rounded border border-cyan-500/30">
                  🎙️ Audio & Voiceover
                </span>
                <span className="px-2 py-0.5 bg-slate-800 text-purple-300 text-[11px] font-mono font-bold rounded border border-purple-500/30">
                  🎬 Regie-Drehbuch
                </span>
                <span className="px-2 py-0.5 bg-slate-800 text-amber-400 text-[11px] font-mono font-bold rounded border border-amber-500/30">
                  ⚙️ Wan/Comfy Local
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              {/* POV TOGGLE */}
              <button
                type="button"
                onClick={() => {
                  const nextPov = !state.isImmersivePov;
                  setState(prev => ({ ...prev, isImmersivePov: nextPov }));
                  if (onShowToast) onShowToast(nextPov ? '🥽 Ego-Perspektive (POV) AKTIVIERT' : '🎥 Ego-Perspektive (POV) DEAKTIVIERT');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border flex items-center gap-1.5 cursor-pointer ${
                  state.isImmersivePov
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-amber-500/50'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ego-Perspektive (POV): {state.isImmersivePov ? 'ON' : 'OFF'}</span>
              </button>

              <div className="px-3 py-1.5 bg-slate-950 text-amber-300 border border-slate-700 rounded-xl text-xs font-mono font-bold">
                Format: 16:9 | Dauer: 14s
              </div>
            </div>
          </div>

          {/* REGIE-DREHBUCH MODUS BANNER */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2.5">
              <Clapperboard className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-xs text-amber-100 font-bold leading-tight">
                Regie-Drehbuch Modus: Strukturierter multi-shot Prompt inklusive Timestamps für professionelle Filmplanung.
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setRegieModeExpanded(false)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  !regieModeExpanded
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                Minimieren
              </button>
              <button
                type="button"
                onClick={() => setRegieModeExpanded(true)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  regieModeExpanded
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                Maximieren
              </button>
            </div>
          </div>

          {/* WERBE-BRANCHE KATEGORIEN GRID & SPEZIAL BUTTONS */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                Werbe-Branche & Kategorien ({COMMERCIAL_MASTER_PRESETS.length} Presets):
              </span>
              <span className="text-[11px] text-amber-400 font-mono font-bold">
                1-Klick Vorschau & Auto-Branding
              </span>
            </div>

            {/* RESPONSIVE CATEGORY GRID - ALL 25 CATEGORIES CLEARLY VISIBLE */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-500/40">
              {[
                { id: 'all', label: 'Alle (184+)', icon: '✨' },
                { id: 'cinema', label: '🎬 Kino & Trailer', icon: '🎬' },
                { id: 'gastro', label: '🍷 Gastro & Bar', icon: '🍷' },
                { id: 'grill_aussenkueche', label: '🔥 Grill Outdoor', icon: '🔥' },
                { id: 'immobilien', label: '🏠 Immobilien', icon: '🏠' },
                { id: 'food', label: '🍽️ Food & Chef', icon: '🍽️' },
                { id: 'fashion', label: '👗 Fashion', icon: '👗' },
                { id: 'travel', label: '🏖️ Travel', icon: '🏖️' },
                { id: 'inneneinrichtung', label: '🛋️ Interior', icon: '🛋️' },
                { id: 'comic', label: '✏️ Comic Ads', icon: '✏️' },
                { id: 'restaurant', label: '🍱 Restaurant', icon: '🍱' },
                { id: 'lingerie', label: '🖤 Haute Lingerie', icon: '🖤' },
                { id: 'erotik', label: '💋 Sinnlich & Erotik', icon: '💋' },
                { id: 'birthday', label: '🎂 Geburtstag', icon: '🎂' },
                { id: 'horror', label: '👻 Horror Mystery', icon: '👻' },
                { id: 'sitcom', label: '📺 Sitcom Comedy', icon: '📺' },
                { id: 'scify', label: '🚀 Sci-Fi Weltraum', icon: '🚀' },
                { id: 'cyberpunk', label: '🌆 Cyberpunk', icon: '🌆' },
                { id: 'bau', label: '🏗️ Bau Handwerk', icon: '🏗️' },
                { id: 'action', label: '⚡ Action Blockbuster', icon: '⚡' },
                { id: 'fantasy', label: '🧙‍♂️ Dark Fantasy', icon: '🧙‍♂️' },
                { id: 'nature', label: '🌲 Natur Outdoor', icon: '🌲' },
                { id: 'war', label: '⚔️ Kriegsfilm', icon: '⚔️' },
                { id: 'politics', label: '🏛️ Politik', icon: '🏛️' },
                { id: 'immersive', label: '🥽 Ego-POV Ads', icon: '🥽' },
              ].map((c) => {
                const count = c.id === 'all'
                  ? COMMERCIAL_MASTER_PRESETS.length
                  : COMMERCIAL_MASTER_PRESETS.filter(p => p.category === c.id).length;
                return { ...c, count, label: c.id === 'all' ? c.label : `${c.label} (${count})` };
              })
              .filter(cat => cat.id === 'all' || cat.count > 0)
              .map((cat) => {
                const isSelected = commercialCategoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (cat.id !== 'all') {
                        const firstPreset = COMMERCIAL_MASTER_PRESETS.find(p => p.category === cat.id);
                        const defaults = getCategoryCommercialDefaults(cat.id);
                        setState(prev => ({
                          ...prev,
                          category: cat.id as any,
                          referenceImages: getCategoryDefaultReferences(cat.id, prev.personCount),
                          commercialPresetId: firstPreset ? firstPreset.id : prev.commercialPresetId,
                          commercialBrandName: firstPreset?.defaultBrand || defaults.brandName,
                          commercialClaim: firstPreset?.defaultClaim || defaults.claim,
                          commercialCallToAction: firstPreset?.defaultCta || defaults.callToAction,
                          spatialTextContent: firstPreset?.defaultSpatialText || defaults.spatialText,
                          spatialTextOverlayEnabled: true,
                          rawConcept: firstPreset ? firstPreset.promptSnippet : prev.rawConcept,
                          analogPresetId: firstPreset?.analogPresetId || prev.analogPresetId,
                        }));
                        if (onShowToast) {
                          onShowToast(`Kategorie "${cat.label}" + Spot geladen!`);
                        }
                      } else {
                        setState(prev => ({ ...prev, category: 'all' as any }));
                        if (onShowToast) onShowToast('Alle 184+ Werbespots aktiviert!');
                      }
                    }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border text-left flex items-center justify-between cursor-pointer truncate ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md font-black ring-2 ring-amber-400/40'
                        : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-amber-500/60 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* SPEZIAL SEQUENCE QUICK BUTTONS */}
            <div className="pt-2 flex items-center gap-2 flex-wrap border-t border-slate-800/80">
              <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider font-mono mr-1">
                Spezial-Sequenzen:
              </span>
              <button
                type="button"
                onClick={() => {
                  const p = COMMERCIAL_MASTER_PRESETS.find(x => x.id === 'comm-immob-1') || COMMERCIAL_MASTER_PRESETS.find(x => x.category === 'immobilien');
                  if (p) {
                    setState(prev => ({
                      ...prev,
                      category: 'immobilien',
                      referenceImages: getCategoryDefaultReferences('immobilien', prev.personCount),
                      commercialPresetId: p.id,
                      commercialBrandName: 'GENESIS LUXURY HOMES',
                      commercialClaim: 'Vom ersten Spatenstich zu Ihrem Wohntraum.',
                      commercialCallToAction: 'Jetzt Traumhaus anfragen | www.genesis.de',
                      spatialTextContent: '420 m² Wohnfläche • KfW 40 Plus Solardach • Panoramablick',
                      spatialTextOverlayEnabled: true,
                      rawConcept: p.promptSnippet,
                    }));
                    if (onShowToast) onShowToast('🏗️ 3-Pic Genesis Luxury Homes Sequenz geladen!');
                  }
                }}
                className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1"
              >
                🏗️ 3-Pic Genesis
              </button>

              <button
                type="button"
                onClick={() => {
                  const p = COMMERCIAL_MASTER_PRESETS.find(x => x.id === 'comm-immob-2') || COMMERCIAL_MASTER_PRESETS.find(x => x.category === 'immobilien');
                  if (p) {
                    setState(prev => ({
                      ...prev,
                      category: 'immobilien',
                      referenceImages: getCategoryDefaultReferences('immobilien', prev.personCount),
                      commercialPresetId: p.id,
                      commercialBrandName: 'ARCHITECTURAL LIVING',
                      commercialClaim: 'Ihr Raum. Ihre Vision. Ihre Realität.',
                      commercialCallToAction: 'Exposé anfordern | architectural-living.de',
                      spatialTextContent: 'Architektonischer Grundriss & CAD-Render Visualisierung',
                      spatialTextOverlayEnabled: true,
                      rawConcept: p.promptSnippet,
                    }));
                    if (onShowToast) onShowToast('📐 3-Pic Grundriss Sequenz geladen!');
                  }
                }}
                className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1"
              >
                📐 3-Pic Grundriss
              </button>

              <button
                type="button"
                onClick={() => {
                  const p = COMMERCIAL_MASTER_PRESETS.find(x => x.category === 'food' || x.category === 'gastro');
                  if (p) {
                    setState(prev => ({
                      ...prev,
                      category: 'food',
                      referenceImages: getCategoryDefaultReferences('food', prev.personCount),
                      commercialPresetId: p.id,
                      commercialBrandName: 'STERNEKOCH SELECTION',
                      commercialClaim: 'Handwerkskunst auf dem Teller.',
                      commercialCallToAction: 'Tisch buchen | sternekoch.de',
                      spatialTextContent: 'Michelin Star Gourmet Creation',
                      spatialTextOverlayEnabled: true,
                      rawConcept: p.promptSnippet,
                    }));
                    if (onShowToast) onShowToast('👨‍🍳 2-Pic Sternekoch Sequenz geladen!');
                  }
                }}
                className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1"
              >
                👨‍🍳 2-Pic Sternekoch
              </button>
            </div>
          </div>

          {/* WERBE-SPOT VORLAGE SELECTOR DROPDOWN */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-200 block">
              📺 Werbe-Spot Vorlage wählen ({COMMERCIAL_MASTER_PRESETS.filter(p => commercialCategoryFilter === 'all' || p.category === commercialCategoryFilter).length} Presets in dieser Kategorie):
            </label>
            <select
              value={state.commercialPresetId || ''}
              onChange={(e) => {
                const presetId = e.target.value;
                if (!presetId) {
                  setState(prev => ({ ...prev, commercialPresetId: undefined }));
                  return;
                }
                const preset = COMMERCIAL_MASTER_PRESETS.find(p => p.id === presetId);
                if (preset) {
                  setState(prev => ({
                    ...prev,
                    category: preset.category as any,
                    referenceImages: getCategoryDefaultReferences(preset.category, prev.personCount),
                    commercialPresetId: preset.id,
                    commercialBrandName: preset.defaultBrand,
                    commercialClaim: preset.defaultClaim,
                    commercialCallToAction: preset.defaultCta,
                    spatialTextOverlayEnabled: true,
                    spatialTextContent: preset.defaultSpatialText || preset.defaultClaim || preset.defaultBrand,
                    rawConcept: preset.promptSnippet,
                    cameraMotion: preset.cameraSetup || prev.cameraMotion,
                    lighting: preset.lightingStyle || prev.lighting,
                    lensStyle: preset.lensChoice || prev.lensStyle,
                    narratorVoice: preset.suggestedVoice || prev.narratorVoice,
                    analogPresetId: preset.analogPresetId || prev.analogPresetId,
                    voiceoverEnabled: true,
                  }));
                  if (onShowToast) {
                    onShowToast(`Werbespot "${preset.name}" & Markendaten geladen!`);
                  }
                }
              }}
              className="w-full bg-slate-950 border border-amber-500/60 rounded-xl px-3.5 py-2.5 text-xs font-bold text-amber-200 focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
            >
              <option value="">-- Werbespot-Vorlage aus Katalog wählen --</option>
              {COMMERCIAL_MASTER_PRESETS.filter(p => commercialCategoryFilter === 'all' || p.category === commercialCategoryFilter).map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.badge} — {preset.name}
                </option>
              ))}
            </select>
          </div>

          {/* ANALOG FILM STOCK & OPTIK ENGINE WIDGET (ADS & COMMERCIAL) */}
          <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <h4 className="font-black text-sm text-cyan-300">
                  🎞️ Analog Film Stock & Optik Engine (Kodak 35mm / Super 8 / Helios / Fuji)
                </h4>
              </div>
              {state.analogPresetId && (
                <button
                  type="button"
                  onClick={() => {
                    setState(prev => ({ ...prev, analogPresetId: undefined }));
                    if (onShowToast) onShowToast('Standard Digital 8K reaktiviert');
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 font-bold underline cursor-pointer"
                >
                  Clear Analog
                </button>
              )}
            </div>

            <p className="text-xs text-slate-300">
              Verleihe deinem Werbespot die charakteristische Optik von echtem Analogfilm, Bokeh-Speziallinsen oder Anamorphic Cinema Linsen.
            </p>

            {/* QUICK ANALOG PRESET BUTTONS */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { id: 'sov-zenit-helios-44m', label: '☭ Soviet Helios 44-2' },
                { id: 'col-kodak-portra-400', label: '🎞️ Kodak Portra 400' },
                { id: 'mp-kodak-vision3-500t', label: '📽️ Kodak Vision3 500T' },
                { id: 's8-kodak-tri-x-super8', label: '📸 Super 8mm Vintage' },
                { id: 'col-fuji-pro-400h', label: '🎨 Fujifilm Pro 400H' },
                { id: 'bw-kodak-tri-x-400', label: '🖤 Kodak Tri-X B&W' },
              ].map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    const match = ANALOG_MASTER_PRESETS.find(p => p.id === preset.id);
                    if (match) {
                      setState(prev => ({ ...prev, analogPresetId: match.id }));
                      if (onShowToast) onShowToast(`Analog-Look "${match.name}" aktiviert!`);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    state.analogPresetId === preset.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-sm ring-2 ring-cyan-400/30'
                      : 'bg-slate-900 text-cyan-200 border-slate-700 hover:border-cyan-500/60'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* FULL ANALOG PRESET DROPDOWN SELECTOR */}
            <select
              value={state.analogPresetId || ''}
              onChange={(e) => {
                const val = e.target.value;
                setState(prev => ({ ...prev, analogPresetId: val || undefined }));
                if (val && onShowToast) {
                  const p = ANALOG_MASTER_PRESETS.find(x => x.id === val);
                  if (p) onShowToast(`Analog Film "${p.name}" gewählt!`);
                }
              }}
              className="w-full bg-slate-900 border border-cyan-500/50 rounded-xl px-3 py-2 text-xs font-bold text-cyan-200 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
            >
              <option value="">-- Standard Digital High-End (Kein Analog-Look) --</option>
              {ANALOG_MASTER_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.badge} — {preset.name} ({preset.lens})
                </option>
              ))}
            </select>
          </div>

          {/* MARKEN-, SLOGAN- & ABSPANN-STUDIO (CLAIM-STUDIO) */}
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl overflow-hidden shadow-lg">
            <button
              type="button"
              onClick={() => setClaimStudioOpen(!claimStudioOpen)}
              className="w-full p-4 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 hover:bg-slate-850 text-left flex items-center justify-between cursor-pointer border-b border-amber-500/20"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <div>
                  <h4 className="font-black text-sm text-amber-300">
                    Marken-, Slogan- & Abspann-Studio
                  </h4>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Wird automatisch in Video-Prompt & Outro-Audio integriert
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400">
                <span>{claimStudioOpen ? 'Claim-Studio einklappen' : 'Marken-, Slogan- & Abspann-Studio ausklappen'}</span>
                {claimStudioOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {claimStudioOpen && (
              <div className="p-4 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-extrabold text-slate-300 block mb-1">
                      🏷️ Markenname / Kunde:
                    </label>
                    <input
                      type="text"
                      value={state.commercialBrandName || ''}
                      onChange={(e) => setState(prev => ({ ...prev, commercialBrandName: e.target.value }))}
                      placeholder="z.B. GENESIS LUXURY HOMES"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-200 font-bold focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-extrabold text-slate-300 block mb-1">
                      💬 Slogan / Claim (Abspann):
                    </label>
                    <input
                      type="text"
                      value={state.commercialClaim || ''}
                      onChange={(e) => setState(prev => ({ ...prev, commercialClaim: e.target.value }))}
                      placeholder="z.B. Vom ersten Spatenstich zu Ihrem Wohntraum."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-200 font-bold focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-extrabold text-slate-300 block mb-1">
                      📣 Handlungsaufruf (CTA):
                    </label>
                    <input
                      type="text"
                      value={state.commercialCallToAction || ''}
                      onChange={(e) => setState(prev => ({ ...prev, commercialCallToAction: e.target.value }))}
                      placeholder="z.B. Jetzt Traumhaus anfragen | www.genesis.de"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-200 font-bold focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* ABSPANN VISUAL-STIL SELECTOR */}
                <div>
                  <label className="text-[11px] font-extrabold text-slate-300 block mb-1">
                    🎬 Abspann Visual-Stil:
                  </label>
                  <select
                    value={state.spatialTextContent || ''}
                    onChange={(e) => setState(prev => ({ ...prev, spatialTextContent: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-200 font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="🎬 Cinematic Fade to Black (Edles Kino-Logo)">🎬 Cinematic Fade to Black (Edles Kino-Logo)</option>
                    <option value="✨ Modern Clean Minimalist Overlay">✨ Modern Clean Minimalist Overlay</option>
                    <option value="🔥 Golden Anamorphic Flare Reveal">🔥 Golden Anamorphic Flare Reveal</option>
                    <option value="🌆 Neon Cyberpunk Glow Emblem">🌆 Neon Cyberpunk Glow Emblem</option>
                    <option value="🏛️ Luxury Architectural Glass Typography">🏛️ Luxury Architectural Glass Typography</option>
                  </select>
                </div>

                {/* SCHNELL-SLOGANS QUICK PRESET BUTTONS */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider font-mono block">
                    ⚡ Schnell-Slogans:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { brand: 'GENESIS LUXURY HOMES', claim: 'Vom ersten Spatenstich zu Ihrem Wohntraum.', cta: 'Jetzt Traumhaus anfragen | www.genesis.de' },
                      { brand: 'ARCHITECTURAL LIVING', claim: 'Ihr Raum. Ihre Vision. Ihre Realität.', cta: 'Exposé anfordern | architectural-living.de' },
                      { brand: 'SKYLINE RESIDENCES', claim: 'Living Above the Ordinary.', cta: 'Penthouse besichtigen | skyline-residences.com' },
                      { brand: 'COSTA REALTY LUXURY', claim: 'Your Sanctuary by the Sea.', cta: 'Strandvilla entdecken | costa-realty.com' },
                      { brand: 'LE CHEF GOURMET', claim: 'Handwerkskunst auf dem Teller.', cta: 'Tisch buchen | lechef-gourmet.de' },
                      { brand: 'MAISON DE LUXE PARIS', claim: 'Eleganz ist die einzige Schönheit, die nie vergeht.', cta: 'Kollektion ansehen | maison-luxe.fashion' },
                      { brand: "L'ÉTOILE DU SOIR", claim: 'Exzellenter Geschmack & unvergessliche Augenblicke.', cta: 'Jetzt Tisch reservieren | funkgastro.de' },
                      { brand: 'BLACK BULL OUTDOOR', claim: '900°C Perfektion. Das ultimative Grillerlebnis.', cta: 'Showroom besichtigen | blackbull.com' },
                    ].map((slogan, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setState(prev => ({
                            ...prev,
                            commercialBrandName: slogan.brand,
                            commercialClaim: slogan.claim,
                            commercialCallToAction: slogan.cta,
                            spatialTextOverlayEnabled: true,
                            spatialTextContent: slogan.claim,
                          }));
                          if (onShowToast) {
                            onShowToast(`Slogan "${slogan.brand}" übernommen!`);
                          }
                        }}
                        className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/60 rounded-xl text-left transition-all cursor-pointer group"
                      >
                        <div className="text-xs font-extrabold text-amber-300 group-hover:text-amber-200">
                          {slogan.brand}: <span className="text-slate-200 font-normal">"{slogan.claim}"</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          CTA: {slogan.cta}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🚀 TOP HERO CONTROLS & BUILDER MODE SWITCHER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 font-mono font-black text-[10px] rounded-md uppercase tracking-wider">
                Interactive Click-Builder 3.0
              </span>
              <span className="text-xs text-amber-400 font-bold font-mono">
                {isEn ? 'Simplified UX & Person Logic' : 'Intuitive UX & Personen-Logik'}
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              {isEn ? 'Kling & MiniMax Visual Prompt Studio' : 'Kling & MiniMax Prompt-Builder Studio'}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {isEn
                ? 'Select parameters via simple click cards or follow our step-by-step guided mode. Automatic prompt compilation ensures 100% video model adherence.'
                : 'Klicke einfach auf die Kachel-Optionen oder nutze die geführte Schritt-für-Schritt Ansicht. Der Builder erstellt daraus garantiert sauberen Code.'}
            </p>
          </div>

          {/* BUILDER MODE TOGGLE & RESET */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <div className="bg-slate-950 p-1 border border-slate-700 rounded-xl flex items-center gap-1">
              <button
                type="button"
                onClick={() => setBuilderMode('guided')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  builderMode === 'guided'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                {isEn ? '🎯 Step-by-Step (Guided)' : '🎯 Schritt-für-Schritt (Geführt)'}
              </button>

              <button
                type="button"
                onClick={() => setBuilderMode('full')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  builderMode === 'full'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                {isEn ? '📜 Studio Overview (All)' : '📜 Gesamt-Übersicht (Alle Modul)'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title={isEn ? 'Reset all parameters' : 'Alle Auswahlen zurücksetzen'}
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              {isEn ? 'Reset' : 'Zurücksetzen'}
            </button>
          </div>
        </div>

        {/* 1-CLICK DYNAMIC CONFIGURABLE QUICK PRESETS BAR */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {isEn ? '1-Click Presets:' : 'Schnell-Vorlagen:'}
            </span>

            {quickPresets.map((qp) => {
              const label = isEn ? qp.labelEn : qp.labelDe;
              return (
                <div key={qp.id} className="inline-flex items-center shadow-xs">
                  <button
                    type="button"
                    onClick={() => applyQuickPresetObject(qp)}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/80 text-slate-200 text-xs font-extrabold rounded-l-lg transition-all flex items-center gap-1 cursor-pointer"
                    title={qp.descriptionDe || qp.descriptionEn || label}
                  >
                    <span>{qp.icon}</span> {label}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditPresetModal(qp);
                    }}
                    className="px-1.5 py-1 bg-slate-900 hover:bg-slate-800 border-t border-b border-r border-slate-700/80 hover:border-amber-500/80 text-slate-400 hover:text-amber-400 text-xs rounded-r-lg transition-all cursor-pointer"
                    title={isEn ? `Edit parameters for "${label}"` : `Parameter für "${label}" anpassen & speichern`}
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setNewPresetLabelEn(state.rawConcept ? state.rawConcept.slice(0, 24) : 'Custom Preset');
                setNewPresetLabelDe(state.rawConcept ? state.rawConcept.slice(0, 24) : 'Eigene Schnellvorlage');
                setShowSaveQuickPresetModal(true);
              }}
              className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
              title={isEn ? 'Save current configuration as a new quick preset button' : 'Aktuelles Setup als Schnellvorlagen-Button speichern'}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isEn ? 'Add Button' : 'Vorlage +'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowConfigQuickPresetsModal(true)}
              className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
              title={isEn ? 'Manage Quick Presets' : 'Schnellvorlagen verwalten'}
            >
              <Settings className="w-3.5 h-3.5 text-slate-300 hover:text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 🧭 STEP NAVIGATION TABS (GUIDED MODE ONLY) */}
      {builderMode === 'guided' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xs grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 1, title: isEn ? '1. Story & Person' : '1. Story & Person', icon: Film, desc: isEn ? 'Genre & Concept' : 'Genre & Idee' },
            { id: 2, title: isEn ? '2. Outfit & Reference' : '2. Outfit & Referenz', icon: Shirt, desc: isEn ? 'Look & Pictures' : 'Darsteller & Bilder' },
            { id: 3, title: isEn ? '3. Camera & Light' : '3. Kamera & Licht', icon: Camera, desc: isEn ? 'Motion & Style' : 'Kamera & Stimmung' },
            { id: 4, title: isEn ? '4. Voice & Audio' : '4. Stimme & Dialog', icon: Mic, desc: isEn ? 'Voiceover & Dialogue' : 'Sprecher & Text' },
            { id: 5, title: isEn ? '5. Multi-Shot' : '5. Multi-Shot', icon: Layers, desc: isEn ? 'Maestro Windows' : 'Szenen-Folge' },
          ].map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 font-black text-xs text-slate-900">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  {step.title}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-medium truncate">
                  {step.desc}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 1: STORY, GENRE & PERSONEN-LOGIK */}
      {/* ========================================================= */}
      {(builderMode === 'full' || activeStep === 1) && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-base text-slate-900">
                {isEn ? 'Step 1: Story Concept, Genre & Person Count' : 'Schritt 1: Story-Idee, Genre & Personen-Logik'}
              </h3>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-mono font-bold px-2.5 py-0.5 rounded-md">
              Modul 1 von 5
            </span>
          </div>

          {/* PERSON COUNT SELECTOR CARD (1 PERSON VS ≥2 PERSONEN) */}
          <div className="bg-gradient-to-r from-cyan-950/5 via-amber-950/5 to-purple-950/5 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600" />
                {isEn ? 'Person Count & Reference Image Logic:' : 'Personen-Logik & Referenzbild-Struktur:'}
              </label>
              <span className="text-[10px] font-mono text-slate-500 font-bold">
                {state.personCount === 'multi_person' ? '👥 3+ Persons Ensemble' : state.personCount === '2_person' ? '👥 2 Persons Duo' : '👤 1 Person Solo'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setState((prev) => ({
                  ...prev,
                  personCount: '1_person',
                  referenceImages: getCategoryDefaultReferences(prev.category, '1_person'),
                }))}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  state.personCount === '1_person'
                    ? 'bg-cyan-50 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-black text-xs text-cyan-950 mb-1">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-cyan-600" />
                    👤 1 Person (Solo)
                  </span>
                  {state.personCount === '1_person' && <Check className="w-4 h-4 text-cyan-600" />}
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {isEn
                    ? '1 central character focus. Action revolves around (picture 1).'
                    : '1 zentraler Charakter. Alle Aktionen beziehen sich auf (picture 1).'}
                </p>
                <div className="mt-2 text-[10px] font-mono text-cyan-800 bg-cyan-100/60 px-2 py-0.5 rounded w-fit">
                  Anchor: (picture 1)
                </div>
              </button>

              <button
                type="button"
                onClick={() => setState((prev) => ({
                  ...prev,
                  personCount: '2_person',
                  referenceImages: getCategoryDefaultReferences(prev.category, '2_person'),
                }))}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  state.personCount === '2_person'
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-black text-xs text-emerald-950 mb-1">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    👥 2 Personen (Duo)
                  </span>
                  {state.personCount === '2_person' && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {isEn
                    ? '2 interacting characters. (picture 1 = lead, picture 2 = co-star).'
                    : '2 interagierende Personen. (picture 1) = Hauptrolle, (picture 2) = Co-Star.'}
                </p>
                <div className="mt-2 text-[10px] font-mono text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded w-fit">
                  Anchors: (picture 1) & (picture 2)
                </div>
              </button>

              <button
                type="button"
                onClick={() => setState((prev) => ({
                  ...prev,
                  personCount: 'multi_person',
                  referenceImages: getCategoryDefaultReferences(prev.category, 'multi_person'),
                }))}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  state.personCount === 'multi_person'
                    ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-black text-xs text-purple-950 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-purple-600" />
                    👥 3+ Personen (Ensemble)
                  </span>
                  {state.personCount === 'multi_person' && <Check className="w-4 h-4 text-purple-600" />}
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {isEn
                    ? 'Multiple characters. (picture 1 = lead, picture 2-4 = co-stars/group).'
                    : '3 oder mehr Personen agieren. (picture 1) = Hauptrolle, (picture 2-4) = Gruppe.'}
                </p>
                <div className="mt-2 text-[10px] font-mono text-purple-800 bg-purple-100/60 px-2 py-0.5 rounded w-fit">
                  Anchors: (picture 1) & (picture 2-4)
                </div>
              </button>
            </div>
          </div>

          {/* GENRE & MOVIE TITLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-extrabold text-slate-800 block mb-1">
                {isEn ? 'Style & Category:' : 'Stil & Genre-Kategorie:'}
              </label>
              <select
                value={state.category || 'custom'}
                onChange={(e) => {
                  const newCat = e.target.value as StyleCategory;
                  const matchedCommPreset = getCommercialPresetForCategoryOrTitle(newCat);
                  const commDefaults = getCategoryCommercialDefaults(newCat);

                  setState((prev) => ({
                    ...prev,
                    category: newCat,
                    referenceImages: getCategoryDefaultReferences(newCat, prev.personCount),
                    commercialPresetId: matchedCommPreset?.id || `comm-auto-${newCat}`,
                    commercialBrandName: matchedCommPreset?.defaultBrand || commDefaults.brandName,
                    commercialClaim: matchedCommPreset?.defaultClaim || commDefaults.claim,
                    commercialCallToAction: matchedCommPreset?.defaultCta || commDefaults.callToAction,
                    spatialTextOverlayEnabled: true,
                    spatialTextContent: matchedCommPreset?.defaultSpatialText || commDefaults.spatialText,
                    analogPresetId: matchedCommPreset?.analogPresetId || prev.analogPresetId,
                  }));

                  if (onShowToast) {
                    onShowToast(isEn ? `Slogans & brand defaults loaded for ${newCat}` : `Slogans & Markendaten für "${commDefaults.brandName}" geladen!`);
                  }
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              >
                <option value="cinema">🎬 Kino & Film-Trailer</option>
                <option value="gastro">🍷 Gastro & Atmosphäre (7 Ads)</option>
                <option value="grill_aussenkueche">🔥 Grill & Außenküche (10 Ads)</option>
                <option value="immobilien">🏠 Immobilien & Grundrisse (26 Ads)</option>
                <option value="food">🍽️ Food & Gourmet Chef (75 Ads)</option>
                <option value="restaurant">🍱 Restaurant & Kulinarik (12 Ads)</option>
                <option value="fashion">👗 Fashion & Luxury (18 Ads)</option>
                <option value="travel">🏖️ Travel & Tourism (16 Ads)</option>
                <option value="inneneinrichtung">🛋️ Interior & Inneneinrichtung (16 Ads)</option>
                <option value="comic">✏️ Comic Ads & Strichzeichnung (16 Ads)</option>
                <option value="lingerie">🖤 Haute Lingerie (Schwarz-Weiß Analog)</option>
                <option value="erotik">💋 Sinnlich, Erotik & Boudoir</option>
                <option value="birthday">🎂 Geburtstag, Jubiläum & Party</option>
                <option value="horror">👻 Horror & Mystery Thriller</option>
                <option value="sitcom">📺 Sitcom & Comedy</option>
                <option value="scify">🚀 Sci-Fi, Weltall & Cyberpunk</option>
                <option value="cyberpunk">🌆 Cyberpunk & Neo-Noir</option>
                <option value="bau">🏗️ Bau, Handwerk & Industrial</option>
                <option value="action">⚡ Action & Blockbuster</option>
                <option value="fantasy">🧙‍♂️ Dark Fantasy & Mythos</option>
                <option value="nature">🌲 Natur, Outdoor & Abenteuer</option>
                <option value="war">⚔️ Kriegsfilm, Militär & Tactical</option>
                <option value="politics">🏛️ Politik, Debatte & Wahlkampf</option>
                <option value="immersive">🥽 Immersive Ego-POV & Bodycam</option>
                <option value="custom">✨ Eigene Freie Vorlage</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 block mb-1">
                {isEn ? 'Movie / Project Title:' : 'Film- / Projekt-Titel:'}
              </label>
              <input
                type="text"
                value={state.movieTitle || ''}
                onChange={(e) => setState((prev) => ({ ...prev, movieTitle: e.target.value }))}
                placeholder={isEn ? 'e.g. ECHOES OF SILENCE' : 'z.B. DIE EWIGE NACHT'}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* COMMERCIAL AD VORLAGEN & SLOGAN ENGINE */}
          <div className="bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-4 space-y-3 text-white shadow-md">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <label className="text-xs font-black text-amber-400 flex items-center gap-2">
                <Clapperboard className="w-4 h-4 text-amber-500" />
                <span>{isEn ? '📺 Commercial Ad Presets & Brand Slogans (184 Ads)' : '📺 Werbefilm-Vorlagen & Slogan-Engine (184 Ads)'}</span>
              </label>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                Auto-Slogans Aktiv
              </span>
            </div>

            {/* AD PRESET SELECTOR DROPDOWN */}
            <div>
              <label className="text-[11px] font-bold text-amber-200/90 block mb-1">
                {isEn ? 'Select Commercial Ad Preset (184 Master Templates):' : 'Werbespot-Vorlage wählen (184 Master Presets):'}
              </label>
              <select
                value={state.commercialPresetId || ''}
                onChange={(e) => {
                  const presetId = e.target.value;
                  if (!presetId) {
                    setState(prev => ({
                      ...prev,
                      commercialPresetId: undefined,
                    }));
                    return;
                  }
                  const preset = COMMERCIAL_MASTER_PRESETS.find(p => p.id === presetId);
                  if (preset) {
                    setState(prev => ({
                      ...prev,
                      category: preset.category as any,
                      referenceImages: getCategoryDefaultReferences(preset.category, prev.personCount),
                      commercialPresetId: preset.id,
                      commercialBrandName: preset.defaultBrand,
                      commercialClaim: preset.defaultClaim,
                      commercialCallToAction: preset.defaultCta,
                      spatialTextOverlayEnabled: true,
                      spatialTextContent: preset.defaultSpatialText || preset.defaultClaim || preset.defaultBrand,
                      rawConcept: preset.promptSnippet,
                      cameraMotion: preset.cameraSetup || prev.cameraMotion,
                      lighting: preset.lightingStyle || prev.lighting,
                      lensStyle: preset.lensChoice || prev.lensStyle,
                      narratorVoice: preset.suggestedVoice || prev.narratorVoice,
                      analogPresetId: preset.analogPresetId || prev.analogPresetId,
                      voiceoverEnabled: true,
                    }));
                    if (onShowToast) {
                      onShowToast(isEn ? `Commercial "${preset.name}" & slogans loaded!` : `Werbespot "${preset.name}" & Slogans geladen!`);
                    }
                  }
                }}
                className="w-full bg-slate-950 border border-amber-600/50 rounded-xl px-3 py-2 text-xs font-bold text-amber-200 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="">{isEn ? '-- Choose Commercial Ad Preset --' : '-- Werbefilm-Vorlage wählen (Slogans Auto-Load) --'}</option>
                {COMMERCIAL_MASTER_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.badge} — {preset.name}
                  </option>
                ))}
              </select>
            </div>

            {/* BRAND NAME, CLAIM, CTA FIELDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div>
                <label className="text-[10px] font-bold text-slate-300 block mb-1">
                  🏷️ {isEn ? 'Brand / Client:' : 'Marke / Kunde:'}
                </label>
                <input
                  type="text"
                  value={state.commercialBrandName || ''}
                  onChange={(e) => setState(prev => ({ ...prev, commercialBrandName: e.target.value }))}
                  placeholder="z.B. VILLA AURELIA"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-200 font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-300 block mb-1">
                  💬 {isEn ? 'Official Slogan / Claim:' : 'Slogan / Claim:'}
                </label>
                <input
                  type="text"
                  value={state.commercialClaim || ''}
                  onChange={(e) => setState(prev => ({ ...prev, commercialClaim: e.target.value }))}
                  placeholder="z.B. Exklusiver Wohnluxus neu definiert."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-200 font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-300 block mb-1">
                  📣 {isEn ? 'Call to Action (CTA):' : 'Handlungsaufforderung (CTA):'}
                </label>
                <input
                  type="text"
                  value={state.commercialCallToAction || ''}
                  onChange={(e) => setState(prev => ({ ...prev, commercialCallToAction: e.target.value }))}
                  placeholder="z.B. Jetzt Exposé anfordern | website.de"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-200 font-bold focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* SPATIAL TEXT OVERLAY IN SCENE */}
            <div className="p-2.5 bg-slate-950/80 border border-amber-500/20 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.spatialTextOverlayEnabled || false}
                    onChange={(e) => setState(prev => ({ ...prev, spatialTextOverlayEnabled: e.target.checked }))}
                    className="accent-amber-500 rounded cursor-pointer"
                  />
                  <span>📐 {isEn ? 'In-Scene Spatial Text Overlay (3D Motion Graphics)' : 'In-Scene Spatial Text (3D Schrift im Raum/Architektur)'}</span>
                </label>
              </div>

              {state.spatialTextOverlayEnabled && (
                <input
                  type="text"
                  value={state.spatialTextContent || ''}
                  onChange={(e) => setState(prev => ({ ...prev, spatialTextContent: e.target.value }))}
                  placeholder="z.B. 420 m² Wohnfläche • KfW 40 Plus Solardach"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-amber-200 focus:outline-none focus:border-amber-400 font-mono"
                />
              )}
            </div>

            {/* ANALOG FILM STOCK & LENS EMULATION SELECTOR */}
            <div className="p-2.5 bg-slate-950/80 border border-cyan-500/30 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  <span>🎞️ {isEn ? 'Analog Film Stock & Lens Emulation (Analog Engine):' : 'Analog-Look & Optik (Kodak 35mm / Super 8 / Helios / Fuji):'}</span>
                </label>
                {state.analogPresetId && (
                  <button
                    type="button"
                    onClick={() => setState(prev => ({ ...prev, analogPresetId: undefined }))}
                    className="text-[10px] text-cyan-400 hover:text-cyan-200 underline cursor-pointer"
                  >
                    {isEn ? 'Clear Analog' : 'Entfernen'}
                  </button>
                )}
              </div>
              <select
                value={state.analogPresetId || ''}
                onChange={(e) => setState(prev => ({ ...prev, analogPresetId: e.target.value || undefined }))}
                className="w-full bg-slate-900 border border-cyan-700/60 rounded-lg px-2.5 py-1.5 text-xs font-bold text-cyan-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="">{isEn ? '-- Clean Digital 8K (No Analog) --' : '-- Kein Analog-Look (Standard Digital High-End) --'}</option>
                {ANALOG_MASTER_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.badge} — {preset.name} ({preset.lens})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MAIN PROMPT CONCEPT TEXTAREA */}
          <div>
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
              <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {isEn ? 'Main Scene Description / Prompt Concept:' : 'Haupt-Szenenbeschreibung & Prompt-Idee:'}
              </label>
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[10px] text-slate-500 font-bold">{isEn ? 'Quick Tags:' : 'Bilder-Tags:'}</span>
                {state.category === 'immobilien' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 1: Haus)')}
                      className="px-2 py-0.5 bg-blue-100 hover:bg-blue-200 text-blue-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                      title={isEn ? 'Inject House / Exterior Facade reference tag' : 'Haus & Fassaden-Referenz tag einfügen'}
                    >
                      +(picture 1: Haus)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 2: Grundriss)')}
                      className="px-2 py-0.5 bg-cyan-100 hover:bg-cyan-200 text-cyan-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                      title={isEn ? 'Inject Floor Plan blueprint reference tag' : 'Grundriss & Bauplan-Referenz tag einfügen'}
                    >
                      +(picture 2: Grundriss)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 3: Person/Makler)')}
                      className="px-2 py-0.5 bg-purple-100 hover:bg-purple-200 text-purple-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                      title={isEn ? 'Inject Agent / Person presenter reference tag' : 'Makler / Person-Referenz tag einfügen'}
                    >
                      +(picture 3: Person/Makler)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 4: Innenraum)')}
                      className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                      title={isEn ? 'Inject Interior luxury design reference tag' : 'Innenraum & Ausstattungs-Referenz tag einfügen'}
                    >
                      +(picture 4: Innenraum)
                    </button>
                  </>
                ) : state.category === 'birthday' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 1: Jubilar)')}
                      className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                    >
                      +(picture 1: Jubilar)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 2: Musiker)')}
                      className="px-2 py-0.5 bg-cyan-100 hover:bg-cyan-200 text-cyan-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                    >
                      +(picture 2: Musiker)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 3: Chor)')}
                      className="px-2 py-0.5 bg-purple-100 hover:bg-purple-200 text-purple-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                    >
                      +(picture 3: Chor)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 4: Torte/Deko)')}
                      className="px-2 py-0.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                    >
                      +(picture 4: Torte/Deko)
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 1)')}
                      className="px-2 py-0.5 bg-cyan-100 hover:bg-cyan-200 text-cyan-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                    >
                      +(picture 1)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 2)')}
                      className="px-2 py-0.5 bg-purple-100 hover:bg-purple-200 text-purple-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                    >
                      +(picture 2)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 3)')}
                      className="px-2 py-0.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                    >
                      +(picture 3)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInjectTag('(picture 4)')}
                      className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-mono font-bold rounded cursor-pointer"
                    >
                      +(picture 4)
                    </button>
                  </>
                )}
              </div>
            </div>
            <textarea
              rows={3}
              value={state.rawConcept}
              onChange={(e) => setState((prev) => ({ ...prev, rawConcept: e.target.value }))}
              placeholder={
                isEn
                  ? 'Describe what happens in the scene... (e.g. (picture 1) walks through rain-slicked neon street...)'
                  : 'Beschreibe die Handlung... (z.B. (picture 1) beschreitet im eleganten Kleid eine verregnete Straße...)'
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          {/* GUIDED NEXT BUTTON */}
          {builderMode === 'guided' && (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span>{isEn ? 'Next: Outfit & Reference Images' : 'Weiter: Outfit & Referenzbilder'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: OUTFIT, DARSTELLER & REFERENZBILDER */}
      {/* ========================================================= */}
      {(builderMode === 'full' || activeStep === 2) && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Shirt className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-base text-slate-900">
                {isEn ? 'Step 2: Character Persona, Outfit & Reference Pictures' : 'Schritt 2: Darsteller, Outfit & Referenzbilder'}
              </h3>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-mono font-bold px-2.5 py-0.5 rounded-md">
              Modul 2 von 5
            </span>
          </div>

          {/* REFERENCE PICTURE QUANTITY TOGGLE */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-600" />
                {isEn ? 'Active Reference Pictures (Image-to-Video Anchor):' : 'Referenzbild-Anzahl (Image-to-Video Anker):'}
              </label>
              <span className="text-[11px] font-mono text-amber-700 font-bold">
                {state.referenceImages.length} Bild{state.referenceImages.length !== 1 ? 'er' : ''} aktiv
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {[0, 1, 2, 3, 4].map((num) => {
                const isActive = state.referenceImages.length === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleSetReferenceCount(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {num === 0 ? (isEn ? '0 (Text-Only)' : '0 (Rein Text)') : `${num} Bild${num > 1 ? 'er' : ''} (picture 1${num > 1 ? `-${num}` : ''})`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* WARDROBE PRESET SELECTION GRID */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-800 flex items-center justify-between">
              <span>{isEn ? 'Select Wardrobe Style Preset:' : 'Kostüm & Outfit-Stil wählen:'}</span>
              {state.wardrobeStyle && (
                <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-mono font-bold truncate max-w-[200px]" title={state.wardrobeStyle}>
                  👗 {state.wardrobeStyle}
                </span>
              )}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {WARDROBE_OPTIONS.map((opt) => {
                const isSelected = state.wardrobeStyle === opt.value;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption('wardrobeStyle', opt.value)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-slate-900">{isEn ? opt.label : opt.labelDe}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                      {opt.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CUSTOM CLOTHING & PERSONA DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-extrabold text-slate-800 block mb-1">
                {isEn ? 'Specific Clothing & Fabrics:' : 'Spezifische Stoffe & Kleidungsdetails:'}
              </label>
              <input
                type="text"
                value={state.clothingDetails || ''}
                onChange={(e) => setState((prev) => ({ ...prev, clothingDetails: e.target.value }))}
                placeholder={isEn ? 'e.g. Charcoal silk gown, gold cufflinks' : 'z.B. Schwarzer Seidenmantel, goldene Manschetten'}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-800 block mb-1">
                {isEn ? 'Character Persona Description:' : 'Charakter-Merkmale (Haare, Augen, Alter):'}
              </label>
              <input
                type="text"
                value={state.characterPersonaDescription || ''}
                onChange={(e) => setState((prev) => ({ ...prev, characterPersonaDescription: e.target.value }))}
                placeholder={isEn ? 'e.g. 30s striking sharp jawline, dark hair' : 'z.B. 30-jährige Frau mit markanten Wangenknochen'}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* GUIDED NAV BUTTONS */}
          {builderMode === 'guided' && (
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isEn ? 'Back to Story' : 'Zurück zu Story'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span>{isEn ? 'Next: Camera & Lighting' : 'Weiter: Kamera & Licht'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 3: KAMERA, LICHT & IMMERSIVE POV */}
      {/* ========================================================= */}
      {(builderMode === 'full' || activeStep === 3) && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-base text-slate-900">
                {isEn ? 'Step 3: Camera Motion, Lighting & Lens Aesthetic' : 'Schritt 3: Kamera, Licht & Ego-POV'}
              </h3>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-mono font-bold px-2.5 py-0.5 rounded-md">
              Modul 3 von 5
            </span>
          </div>



          {/* CAMERA MOTION CARDS */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-800 flex items-center justify-between">
              <span>{isEn ? 'Camera Trajectory & Motion:' : 'Kamera-Führung & Bewegung:'}</span>
              {state.cameraMotion && (
                <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-mono font-bold truncate max-w-[200px]" title={state.cameraMotion}>
                  🎥 {state.cameraMotion}
                </span>
              )}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {CAMERA_OPTIONS.map((opt) => {
                const isSelected = state.cameraMotion === opt.value;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption('cameraMotion', opt.value)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-slate-900">{isEn ? opt.label : opt.labelDe}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                      {opt.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* LIGHTING & LENS SELECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LIGHTING */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-800 block">
                {isEn ? 'Lighting & Atmosphere:' : 'Beleuchtung & Atmosphäre:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LIGHTING_OPTIONS.slice(0, 6).map((opt) => {
                  const isSelected = state.lighting === opt.value;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption('lighting', opt.value)}
                      className={`text-left p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-slate-900 truncate">{isEn ? opt.label : opt.labelDe}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LENS AESTHETIC */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-800 block">
                {isEn ? 'Lens & Optics:' : 'Objektiv & Optik:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LENS_AESTHETIC_OPTIONS.slice(0, 6).map((opt) => {
                  const isSelected = state.lensStyle === opt.value;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption('lensStyle', opt.value)}
                      className={`text-left p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-slate-900 truncate">{isEn ? opt.label : opt.labelDe}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ANALOG FILM STOCK & EMULATION ENGINE (35mm/16mm/Soviet/Kodak/Fuji) */}
          <div className="bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/40 rounded-2xl p-4 space-y-3 text-white shadow-md">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-cyan-300 flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>{isEn ? '🎞️ Analog Film Stock & Lens Emulation (Analog Engine)' : '🎞️ Analog-Look & Filmstock-Kamera (Analog Engine)'}</span>
              </label>
              {state.analogPresetId && (
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, analogPresetId: undefined }))}
                  className="text-[11px] text-cyan-400 hover:text-cyan-200 underline font-bold cursor-pointer"
                >
                  {isEn ? 'Clear Analog' : 'Entfernen'}
                </button>
              )}
            </div>

            <div className="space-y-2">
              <select
                value={state.analogPresetId || ''}
                onChange={(e) => setState(prev => ({ ...prev, analogPresetId: e.target.value || undefined }))}
                className="w-full bg-slate-950 border border-cyan-700/60 rounded-xl px-3 py-2 text-xs font-bold text-cyan-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="">{isEn ? '-- No Analog Emulation (Clean Digital 8K) --' : '-- Kein Analog-Look (Standard Digital High-End) --'}</option>
                {ANALOG_MASTER_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.badge} — {preset.name}
                  </option>
                ))}
              </select>

              {state.analogPresetId && (
                <div className="p-3 bg-cyan-950/80 border border-cyan-700/60 rounded-xl text-xs text-cyan-200 space-y-1">
                  <div className="font-extrabold text-cyan-300 flex items-center justify-between">
                    <span>{ANALOG_MASTER_PRESETS.find(p => p.id === state.analogPresetId)?.badge}</span>
                    <span className="font-mono text-cyan-400 text-[10px]">{ANALOG_MASTER_PRESETS.find(p => p.id === state.analogPresetId)?.lens}</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed text-[11px]">
                    {ANALOG_MASTER_PRESETS.find(p => p.id === state.analogPresetId)?.opticalSignature}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* GUIDED NAV BUTTONS */}
          {builderMode === 'guided' && (
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isEn ? 'Back to Outfit' : 'Zurück zu Outfit'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span>{isEn ? 'Next: Voiceover & Dialogue' : 'Weiter: Sprecher & Dialog'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 4: VOICE, SPRECHER & DIALOGE */}
      {/* ========================================================= */}
      {(builderMode === 'full' || activeStep === 4) && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-base text-slate-900">
                {isEn ? 'Step 4: Narrator Voiceover & On-Screen Dialogue' : 'Schritt 4: Sprecherstimme & Filmdialoge'}
              </h3>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-mono font-bold px-2.5 py-0.5 rounded-md">
              Modul 4 von 5
            </span>
          </div>

          {/* MASTER VOICEOVER CONTROL TOGGLE */}
          <div className={`p-4 rounded-xl border transition-all ${
            state.voiceoverEnabled 
              ? 'bg-emerald-50/50 border-emerald-200 shadow-xs' 
              : 'bg-slate-100 border-slate-300'
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black font-mono tracking-wider ${
                    state.voiceoverEnabled 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {state.voiceoverEnabled 
                      ? (isEn ? 'VOICEOVER: ACTIVE' : 'VOICEOVER: AKTIV') 
                      : (isEn ? 'VOICEOVER: MUTED' : 'VOICEOVER: STUMM')}
                  </span>
                  <span className="text-xs font-extrabold text-slate-900">
                    {isEn ? 'Sprecher & Dialog-Kontrolle' : 'Sprecher & Dialog-Kontrolle'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 max-w-xl leading-relaxed">
                  {isEn 
                    ? 'Only enable when you explicitly want spoken narrator dialogue or brand slogans in your final ad audio.' 
                    : 'Nur aktivieren, wenn Sie explizit gesprochene Sätze, Sprechertexte oder Werbe-Slogans im fertigen Audio wünschen. Verhindert unerwünschtes Gequatsche.'}
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => setState(prev => ({ ...prev, voiceoverEnabled: !prev.voiceoverEnabled }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  state.voiceoverEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    state.voiceoverEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className={`space-y-4 transition-all duration-300 ${!state.voiceoverEnabled ? 'opacity-40 pointer-events-none select-none' : ''}`}>
            {/* VOICE FILTER CHIPS */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  {isEn ? 'Narrator Voice Library (MiniMax Sync):' : 'Sprecherstimmen-Bibliothek (MiniMax Sync):'}
                </label>
                {state.narratorVoice && (
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-mono font-bold truncate max-w-[200px]" title={state.narratorVoice}>
                    🎙️ {state.narratorVoice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: 'Alle Stimmen' },
                  { id: 'de', label: '🇩🇪 Deutsch' },
                  { id: 'female_de', label: '👩 Fraustimme (DE)' },
                  { id: 'male_de', label: '👨 Männerstimme (DE)' },
                  { id: 'sensual', label: '💋 Sinnlich & Samtig' },
                  { id: 'en', label: '🇬🇧 English Cinema' },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setVoiceFilterCategory(filter.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      voiceFilterCategory === filter.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                {filteredVoices.map((voice) => {
                  const isSelected = state.narratorVoice === voice.value;
                  return (
                    <button
                      key={voice.id}
                      type="button"
                      onClick={() => handleSelectOption('narratorVoice', voice.value)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 text-slate-950 font-extrabold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-slate-900">{isEn ? voice.label : voice.labelDe}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 font-mono">
                        {voice.value}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ON-SCREEN DIALOGUE INPUT */}
            <div>
              <label className="text-xs font-extrabold text-slate-800 block mb-1">
                {isEn ? 'Spoken Dialogue / Character Lines:' : 'Gesprochener Dialog / Darsteller-Satz:'}
              </label>
              <input
                type="text"
                value={state.dialogueLines || ''}
                onChange={(e) => setState((prev) => ({ ...prev, dialogueLines: e.target.value }))}
                placeholder={isEn ? 'e.g. She whispers softly: "Everything changes tonight."' : 'z.B. Er sagt leise: "Wir haben keine Zeit mehr."'}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* GUIDED NAV BUTTONS */}
          {builderMode === 'guided' && (
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isEn ? 'Back to Camera' : 'Zurück zu Kamera'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStep(5)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span>{isEn ? 'Next: Multi-Shot Maestro' : 'Weiter: Multi-Shot Maestro'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 5: MULTI-SHOT MAESTRO & SFX */}
      {/* ========================================================= */}
      {(builderMode === 'full' || activeStep === 5) && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-base text-slate-900">
                {isEn ? 'Step 5: Multi-Shot Maestro (Window Sequence Generator)' : 'Schritt 5: Multi-Shot Maestro (Szenen-Sequenz Generator)'}
              </h3>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 font-mono font-bold px-2.5 py-0.5 rounded-md">
              Modul 5 von 5
            </span>
          </div>

          {/* WINDOW QUANTITY SELECTOR */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                {isEn ? 'Sequence Length (Multi-Shot Windows):' : 'Sequenz-Länge (Anzahl Szenen-Fenster):'}
              </label>
              <span className="text-[11px] font-mono text-purple-700 font-bold">
                {state.windows.length} Window{state.windows.length > 1 ? 's' : ''} ({state.windows.length * 14}s Total)
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {[1, 2, 3, 4].map((num) => {
                const isActive = state.windows.length === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleSetWindowCount(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {num === 1 ? '1 Window (14s Single)' : `${num} Windows (${num * 14}s Maestro)`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* WINDOW CARDS EDITOR */}
          <div className="space-y-3">
            {state.windows.map((win) => (
              <div key={win.id} className="bg-slate-900 text-white rounded-xl p-4 space-y-3 border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-black text-xs text-amber-400 font-mono">
                    WINDOW #{win.windowNumber} ({win.timeRange})
                  </span>
                  {state.windows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveWindow(win.id)}
                      className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={win.prompt}
                    onChange={(e) => handleUpdateWindow(win.id, { prompt: e.target.value })}
                    placeholder={`Prompt für Window ${win.windowNumber}...`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* GUIDED NAV BUTTONS */}
          {builderMode === 'guided' && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isEn ? 'Back to Voice' : 'Zurück zu Sprecher'}</span>
              </button>

              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" />
                {isEn ? 'All parameters set! See live compiler prompt above.' : 'Alle Module konfiguriert! Siehe Live-Compiler oben.'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD CURRENT CONFIG AS QUICK PRESET */}
      {/* ========================================================= */}
      {showSaveQuickPresetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                {isEn ? 'Save Current Config as Quick Preset' : 'Aktuelle Konfiguration als Schnellvorlage speichern'}
              </h3>
              <button
                type="button"
                onClick={() => setShowSaveQuickPresetModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {isEn ? 'Icon (Emoji):' : 'Icon (Emoji):'}
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {['🎬', '👤', '👥', '🎂', '👻', '🥽', '💋', '🏎️', '💎', '🚀', '🔥', '🏢'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewPresetIcon(emoji)}
                      className={`w-9 h-9 text-lg rounded-xl flex items-center justify-center cursor-pointer border ${
                        newPresetIcon === emoji
                          ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-500/20'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {isEn ? 'Preset Title (English):' : 'Titel der Schnellvorlage (Englisch):'}
                </label>
                <input
                  type="text"
                  value={newPresetLabelEn}
                  onChange={(e) => setNewPresetLabelEn(e.target.value)}
                  placeholder="e.g. XYZ Luxury Commercial"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {isEn ? 'Preset Title (German):' : 'Titel der Schnellvorlage (Deutsch):'}
                </label>
                <input
                  type="text"
                  value={newPresetLabelDe}
                  onChange={(e) => setNewPresetLabelDe(e.target.value)}
                  placeholder="z.B. XYZ Luxus Imagevideo"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 font-mono text-[11px] text-slate-700">
                <div className="font-bold text-amber-700">Captured Parameters:</div>
                <div>• Person Logic: {state.personCount === 'multi_person' ? '👥 3+ Persons Ensemble' : state.personCount === '2_person' ? '👥 2 Persons Duo' : '👤 1 Person Solo'}</div>
                <div>• Category: {state.category || 'custom'}</div>
                {state.rawConcept && <div className="truncate">• Concept: {state.rawConcept}</div>}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSaveQuickPresetModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                {isEn ? 'Cancel' : 'Abbrechen'}
              </button>
              <button
                type="button"
                onClick={handleSaveCurrentAsQuickPreset}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-xs cursor-pointer"
              >
                {isEn ? 'Create Preset Button' : 'Button Erstellen'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CONFIGURE QUICK PRESETS */}
      {/* ========================================================= */}
      {showConfigQuickPresetsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-600" />
                {isEn ? 'Manage & Configure Quick Presets' : 'Schnellvorlagen Verwalten & Konfigurieren'}
              </h3>
              <button
                type="button"
                onClick={() => setShowConfigQuickPresetsModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {quickPresets.map((qp) => (
                <div
                  key={qp.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 hover:bg-slate-100/80 transition-colors"
                >
                  <div
                    className="flex items-center gap-2.5 truncate cursor-pointer"
                    onClick={() => handleOpenEditPresetModal(qp)}
                  >
                    <span className="text-xl">{qp.icon}</span>
                    <div className="truncate">
                      <div className="font-extrabold text-xs text-slate-900 truncate flex items-center gap-1.5">
                        {isEn ? qp.labelEn : qp.labelDe}
                        {qp.isCustom && (
                          <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-mono">Custom</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">
                        {qp.personCount === 'multi_person' ? '👥 3+ Persons Ensemble' : qp.personCount === '2_person' ? '👥 2 Persons Duo' : '👤 1 Person Solo'} • {qp.category} • Voice: {qp.narratorVoice || 'Default'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditPresetModal(qp)}
                      title={isEn ? 'Edit parameters' : 'Parameter anpassen & speichern'}
                      className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteQuickPreset(qp.id)}
                      title={isEn ? 'Delete preset button' : 'Schnellvorlage löschen'}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleResetQuickPresetsToDefault}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                {isEn ? 'Reset to Default Presets' : 'Auf Standard zurücksetzen'}
              </button>

              <button
                type="button"
                onClick={() => setShowConfigQuickPresetsModal(false)}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-xs cursor-pointer"
              >
                {isEn ? 'Done' : 'Fertig'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT QUICK PRESET PARAMETERS */}
      {/* ========================================================= */}
      {editingPreset && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-amber-500" />
                  {isEn ? 'Configure Quick Preset Parameters' : 'Schnellvorlagen-Parameter Anpassen'}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {isEn
                    ? 'Modify voice, category, style, and camera parameters. Saved permanently to local storage.'
                    : 'Passe Sprecher, Kategorie, Stil, Kamera & Text an. Wird dauerhaft im Speicher gesichert.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingPreset(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* SECTION 1: LABELS & ICON */}
              <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-xl space-y-3">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Tag className="w-4 h-4 text-amber-600" />
                  {isEn ? '1. Button Label & Icon:' : '1. Button-Titel & Emoji-Icon:'}
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isEn ? 'Icon Emoji:' : 'Emoji Icon:'}
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['🎬', '👤', '👥', '🏢', '🎂', '👻', '🥽', '💋', '🏎️', '💎', '🚀', '🔥', '🏗️', '🍽️', '✈️', '🌲', '⚔️', '📺'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setEditingPreset({ ...editingPreset, icon: emoji })}
                        className={`w-8 h-8 text-base rounded-lg flex items-center justify-center cursor-pointer border ${
                          editingPreset.icon === emoji
                            ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-500/20'
                            : 'bg-white border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {isEn ? 'Title (German):' : 'Titel (Deutsch):'}
                    </label>
                    <input
                      type="text"
                      value={editingPreset.labelDe}
                      onChange={(e) => setEditingPreset({ ...editingPreset, labelDe: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {isEn ? 'Title (English):' : 'Titel (Englisch):'}
                    </label>
                    <input
                      type="text"
                      value={editingPreset.labelEn}
                      onChange={(e) => setEditingPreset({ ...editingPreset, labelEn: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: CATEGORY & PERSON LOGIC */}
              <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-xl space-y-3">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Film className="w-4 h-4 text-amber-600" />
                  {isEn ? '2. Category & Person Count Lock:' : '2. Kategorie & Personen-Anzahl:'}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {isEn ? 'Style Category:' : 'Genre / Kategorie:'}
                    </label>
                    <select
                      value={editingPreset.category}
                      onChange={(e) => setEditingPreset({ ...editingPreset, category: e.target.value as any })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="cinema">🎬 Kino & Film-Trailer</option>
                      <option value="gastro">🍷 Gastro & Atmosphäre (7 Ads)</option>
                      <option value="grill_aussenkueche">🔥 Grill & Außenküche (10 Ads)</option>
                      <option value="immobilien">🏠 Immobilien & Grundrisse (26 Ads)</option>
                      <option value="food">🍽️ Food & Gourmet Chef (75 Ads)</option>
                      <option value="fashion">👗 Fashion & Luxury (18 Ads)</option>
                      <option value="travel">🏖️ Travel & Tourism (16 Ads)</option>
                      <option value="inneneinrichtung">🛋️ Interior & Inneneinrichtung (16 Ads)</option>
                      <option value="comic">✏️ Comic Ads & Strichzeichnung (16 Ads)</option>
                      <option value="lingerie">🖤 Haute Lingerie (Schwarz-Weiß Analog)</option>
                      <option value="erotik">💋 Sinnlich, Erotik & Boudoir</option>
                      <option value="birthday">🎂 Geburtstag, Jubiläum & Party</option>
                      <option value="horror">👻 Horror & Mystery Thriller</option>
                      <option value="bau">🏗️ Bau, Handwerk & Industrial</option>
                      <option value="scify">🚀 Sci-Fi, Weltall & Cyberpunk</option>
                      <option value="cyberpunk">🌆 Cyberpunk & Neo-Noir</option>
                      <option value="sitcom">📺 Sitcom & Comedy</option>
                      <option value="action">⚡ Action & Blockbuster</option>
                      <option value="fantasy">🧙‍♂️ Dark Fantasy & Mythos</option>
                      <option value="nature">🌲 Natur, Outdoor & Abenteuer</option>
                      <option value="war">⚔️ Kriegsfilm, Militär & Tactical</option>
                      <option value="politics">🏛️ Politik, Debatte & Wahlkampf</option>
                      <option value="immersive">🥽 Immersive Ego-POV & Bodycam</option>
                      <option value="custom">✨ Eigene Freie Vorlage</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {isEn ? 'Person Count Lock:' : 'Personen-Anzahl Fokus:'}
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingPreset({ ...editingPreset, personCount: '1_person' })}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-extrabold flex items-center justify-center gap-1 cursor-pointer border ${
                          editingPreset.personCount === '1_person'
                            ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>👤 Solo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingPreset({ ...editingPreset, personCount: '2_person' })}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-extrabold flex items-center justify-center gap-1 cursor-pointer border ${
                          editingPreset.personCount === '2_person'
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>👥 Duo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingPreset({ ...editingPreset, personCount: 'multi_person' })}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-extrabold flex items-center justify-center gap-1 cursor-pointer border ${
                          editingPreset.personCount === 'multi_person'
                            ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>👥 Multi</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: VOICE & DIALOGUE */}
              <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-xl space-y-3">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Mic className="w-4 h-4 text-amber-600" />
                  {isEn ? '3. Voice & Dialogue Setup:' : '3. Sprecherstimme & Gesprochener Text:'}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {isEn ? 'Narrator Voice / Voiceover:' : 'Sprecher-Stil / Off-Stimme:'}
                    </label>
                    <select
                      value={editingPreset.narratorVoice || ''}
                      onChange={(e) => setEditingPreset({ ...editingPreset, narratorVoice: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="">-- Kein/Standard Sprecher --</option>
                      {NARRATOR_VOICE_OPTIONS.map((v) => (
                        <option key={v.value} value={v.value}>
                          {isEn ? v.label : v.labelDe}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {isEn ? 'Dialogue / Spoken Lines:' : 'Gesprochener Dialog:'}
                    </label>
                    <input
                      type="text"
                      value={editingPreset.dialogueLines || ''}
                      onChange={(e) => setEditingPreset({ ...editingPreset, dialogueLines: e.target.value })}
                      placeholder={isEn ? 'e.g. Welcome to your new horizon.' : 'z.B. Willkommen in Ihrem neuen Anwesen.'}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: CAMERA & STYLING PARAMETERS */}
              <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-xl space-y-3">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Camera className="w-4 h-4 text-amber-600" />
                  {isEn ? '4. Camera, Lighting & Optics:' : '4. Kamera, Licht & Ästhetik:'}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {isEn ? 'Camera Motion:' : 'Kamerabewegung:'}
                    </label>
                    <select
                      value={editingPreset.cameraMotion || ''}
                      onChange={(e) => setEditingPreset({ ...editingPreset, cameraMotion: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="">-- Standard Kamera --</option>
                      {CAMERA_OPTIONS.map((c) => (
                        <option key={c.value} value={c.value}>
                          {isEn ? c.label : c.labelDe}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {isEn ? 'Lighting:' : 'Licht-Setup:'}
                    </label>
                    <select
                      value={editingPreset.lighting || ''}
                      onChange={(e) => setEditingPreset({ ...editingPreset, lighting: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="">-- Standard Licht --</option>
                      {LIGHTING_OPTIONS.map((l) => (
                        <option key={l.value} value={l.value}>
                          {isEn ? l.label : l.labelDe}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {isEn ? 'Lens Aesthetic:' : 'Objektiv & Optik:'}
                    </label>
                    <select
                      value={editingPreset.lensStyle || ''}
                      onChange={(e) => setEditingPreset({ ...editingPreset, lensStyle: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="">-- Standard Optik --</option>
                      {LENS_AESTHETIC_OPTIONS.map((l) => (
                        <option key={l.value} value={l.value}>
                          {isEn ? l.label : l.labelDe}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {isEn ? 'Wardrobe / Clothing Style:' : 'Garderobe & Kleidung Stil:'}
                  </label>
                  <input
                    type="text"
                    value={editingPreset.wardrobeStyle || ''}
                    onChange={(e) => setEditingPreset({ ...editingPreset, wardrobeStyle: e.target.value })}
                    placeholder={isEn ? 'e.g. Modern Italian Tailored Suit' : 'z.B. Moderner italienischer Maßanzug'}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* SECTION 5: CONCEPT PROMPT TEXTAREA */}
              <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-xl space-y-2">
                <label className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  {isEn ? '5. Main Prompt Concept / Raw Scene Description:' : '5. Haupt-Szenenbeschreibung & Prompt-Idee:'}
                </label>
                <textarea
                  rows={3}
                  value={editingPreset.rawConcept || ''}
                  onChange={(e) => setEditingPreset({ ...editingPreset, rawConcept: e.target.value })}
                  placeholder={isEn ? 'Write the core prompt scene for this quick preset...' : 'Beschreibe die Kernszene für diese Schnellvorlage...'}
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingPreset(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                {isEn ? 'Cancel' : 'Abbrechen'}
              </button>

              <button
                type="button"
                onClick={handleSaveEditingPreset}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isEn ? 'Save & Persist Preset' : 'Änderungen Dauerhaft Speichern'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
