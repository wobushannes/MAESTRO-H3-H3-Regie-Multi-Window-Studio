export type StyleCategory =
  | 'horror'
  | 'sitcom'
  | 'scify'
  | 'bau'
  | 'immobilien'
  | 'restaurant'
  | 'cyberpunk'
  | 'fashion'
  | 'action'
  | 'fantasy'
  | 'nature'
  | 'custom';

export interface PresetTemplate {
  id: string;
  title: string;
  category: StyleCategory;
  description: string;
  badge: string;
  prompt: string;
  camera: string;
  lighting: string;
  lens: string;
  motionSpeed: string;
  audioCue?: string;
  negativePrompt: string;
  sampleImage?: string;
  isNsfw?: boolean;
  isCustom?: boolean;
  tags: string[];
  windowsCount?: number;
  styleCode?: string;
  styleAndTone?: string;
  audioDesign?: string;
  multiShotSequence?: string;
  theatricalScript?: string;
  wardrobeStyle?: string;
  clothingDetails?: string;
  movieTitle?: string;
  dialogueLines?: string;
  characterPersonaDescription?: string;
}

export interface ParameterOption {
  id: string;
  label: string;
  labelDe: string;
  value: string;
  description?: string;
  category: string;
  icon?: string;
  nsfw?: boolean;
}

export interface ReferenceImage {
  id: string;
  label: string;
  tag: string; // e.g. "picture 1", "picture 2"
  role: 'subject' | 'style' | 'start_frame' | 'end_frame' | 'character' | 'location';
  url: string;
  description: string;
}

export interface MaestroWindow {
  id: string;
  windowNumber: number;
  timeRange: string;
  prompt: string;
  cameraTrajectory: string;
  continuityNote: string;
  motionSpeed: string;
  lightingOverride?: string;
  referenceImages: string[];
  dialogue?: string;
  sfxImpact?: string;
}

export interface PromptBuildState {
  appMode: 'pro' | 'wizard'; // Profimodus vs. Dialogmodus (Wizard)
  generatorMode: 'single' | 'multi'; // Single Clip vs Multi-Window Sequence
  outputFormatStyle: 'theatrical_script' | 'direct_prompt'; // Theatrical Studio Script vs Single Line Prompt
  rawConcept: string;
  styleCode: string; // e.g. ASTROCINEMAV01K2T
  narratorVoice: string; // e.g. Deep male narrator
  dialogueLines: string; // e.g. She whispers: "Dad?"
  movieTitle?: string; // Custom Movie / Trailer Title for Abspann (Title Card)
  wardrobeStyle: string; // e.g. "Victorian Gothic Dark Coat", "1920s Heavy Wool Trenchcoat"
  clothingDetails: string; // e.g. "Weathered oilskin coat, brass buttons, silk scarf"
  fashionAccessories: string; // e.g. "Round wire-rim spectacles, silver pocket watch"
  characterPersonaDescription: string; // e.g. "A weathered 45-year-old grizzled deep sea captain, deep scars on left cheek, steel gaze"
  selectedPresetId?: string;
  cameraMotion: string;
  motionSpeed: string;
  lighting: string;
  lensStyle: string;
  atmosphere: string;
  subjectAction: string;
  audioCue: string;
  colorGrade: string;
  vfxDetails: string[];
  nsfwMode: boolean;
  selectedNsfwKeywords: string[];
  language: 'de' | 'en';
  referenceImages: ReferenceImage[];
  windows: MaestroWindow[];
  aspectRatio: '16:9' | '9:16' | '1:1' | '2.39:1';
  durationSeconds: number;
  fps: number;
  activeTab: 'click-builder' | 'templates' | 'references' | 'maestro-windows' | 'guidelines' | 'saved';
}

export interface SavedPreset {
  id: string;
  title: string;
  date: string;
  state: PromptBuildState;
  finalPrompt: string;
  maestroScript: string;
  theatricalScript?: string;
}
