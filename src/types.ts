export type StyleCategory =
  | 'cinema'
  | 'birthday'
  | 'horror'
  | 'sitcom'
  | 'scify'
  | 'bau'
  | 'immobilien'
  | 'restaurant'
  | 'gastro'
  | 'grill_aussenkueche'
  | 'food'
  | 'inneneinrichtung'
  | 'cyberpunk'
  | 'fashion'
  | 'lingerie'
  | 'erotik'
  | 'action'
  | 'fantasy'
  | 'nature'
  | 'comic'
  | 'war'
  | 'politics'
  | 'travel'
  | 'immersive'
  | 'custom';

export type PersonCountType = '1_person' | '2_person' | 'multi_person';

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
  personCount?: PersonCountType;
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
  narratorVoice?: string;
  characterPersonaDescription?: string;
  isImmersivePov?: boolean;
  commercialPresetId?: string;
  commercialBrandName?: string;
  commercialClaim?: string;
  commercialCallToAction?: string;
  spatialTextContent?: string;
  analogPresetId?: string;
  povKineticProfile?: string;
  povVerticalDisplacement?: string;
  povRigType?: string;
  povFootsteps?: string;
  povBreathVapor?: string;
  povInteractiveHands?: string;
  povWeatherImmersion?: string;
  povVisceralAudio?: boolean;
}

export type PovKineticType =
  | 'birthday_serenade_sway'
  | 'horror_head_bob_stalk'
  | 'immobilien_static_glide'
  | 'action_sprint_vibration'
  | 'restaurant_seated_glide'
  | 'bau_heavy_tread_bounce'
  | 'nature_stride_sway'
  | 'fashion_velvet_glide'
  | 'erotik_sensual_breath_drift'
  | 'war_combat_bodycam_jolt'
  | 'scifi_hud_level_flight'
  | 'sitcom_eye_level_drift'
  | 'comic_paper_snap_track'
  | 'politics_dignitary_glide'
  | 'fantasy_mythical_stride'
  | 'custom_pov_kinetics';

export type PovRigType = 'gopro_chest' | 'action_helmet' | 'human_eyes' | 'police_bodycam' | 'smart_glasses' | 'fps_gaming';
export type PovFootstepsType = 'walking_bob' | 'running_sprint' | 'sneaking_stalk' | 'heavy_tread' | 'smooth_gimbal' | 'vehicle_cockpit' | 'none';
export type PovBreathVaporType = 'cold_vapor' | 'heavy_panting' | 'frost_whisper' | 'steam_haze' | 'none' | 'auto';
export type PovHandsType =
  | 'party_celebration'
  | 'dining_cutlery'
  | 'chef_culinary'
  | 'real_estate_keys'
  | 'fashion_luxury'
  | 'craft_tools'
  | 'outdoor_adventure'
  | 'sensual_touch'
  | 'scifi_hologram'
  | 'sitcom_coffee'
  | 'holding_flashlight'
  | 'holding_equipment'
  | 'reaching_forward'
  | 'driving_steering'
  | 'tactical_gripping'
  | 'casual_holding'
  | 'none';
export type PovWeatherImmersionType = 'frost_lens_droplets' | 'heat_mirage_sweat' | 'rain_splatter' | 'dust_grit' | 'none' | 'auto';

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

export interface NarratorVoiceOption {
  id: string;
  label: string;
  labelDe: string;
  value: string;
  gender: 'female' | 'male' | 'ai' | 'child';
  lang: 'de' | 'en' | 'universal';
  tone: 'sensual' | 'luxury' | 'cinema' | 'corporate' | 'dramatic' | 'asmr';
  descriptionDe: string;
  descriptionEn: string;
  badge?: string;
  icon?: string;
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
  personCount?: PersonCountType; // 1 Person vs >=2 Personen (Solo vs Duo/Group)
  selectedPresetId?: string;
  category?: string;
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
  // Immersive First-Person POV & Sensory Simulation
  isImmersivePov?: boolean;
  povKineticProfile?: PovKineticType | string;
  povVerticalDisplacement?: string;
  povRigType?: 'gopro_chest' | 'action_helmet' | 'human_eyes' | 'police_bodycam' | 'smart_glasses' | 'fps_gaming';
  povFootsteps?: 'walking_bob' | 'running_sprint' | 'sneaking_stalk' | 'heavy_tread' | 'smooth_gimbal' | 'vehicle_cockpit' | 'none';
  povBreathVapor?: 'cold_vapor' | 'heavy_panting' | 'frost_whisper' | 'steam_haze' | 'none' | 'auto';
  povInteractiveHands?: PovHandsType | string;
  povWeatherImmersion?: 'frost_lens_droplets' | 'heat_mirage_sweat' | 'rain_splatter' | 'dust_grit' | 'none' | 'auto';
  povVisceralAudio?: boolean;
  analogPresetId?: string; // Analog Master Engine selection ID
  commercialPresetId?: string; // Commercial & Ad Master Engine selection ID
  commercialClaim?: string; // Brand Slogan / Claim for outro
  commercialBrandName?: string; // Brand or Client Name for outro
  commercialCallToAction?: string; // CTA for outro (e.g. Website, Hotline, Social Handle)
  voiceoverEnabled?: boolean; // Enable Spoken Voiceover / Narrator Dialogue
  commercialOutroStyle?: 'cinematic_fade_black' | 'clean_white_minimal' | 'lower_third_overlay' | 'comic_speech_punch' | 'voiceover_whisper' | 'motion_graphic_reveal' | 'none';
  commercialOutroAnimation?: 
    | 'fade_to_black'
    | 'brand_logo_reveal'
    | 'sparkle_transition'
    | 'light_leak_burn'
    | 'lens_flare_streak'
    | 'cinematic_zoom_dissolve'
    | 'neon_strobe_flash'
    | 'glitch_matrix_snap'
    | 'gold_shimmer_wipe'
    | 'whip_pan_blur'
    | 'none';
  // Architectural & Spatial In-Scene Typography (e.g. text projected or etched directly onto houses, roofs, curbs, asphalt, glass)
  spatialTextOverlayEnabled?: boolean;
  spatialTextPosition?: 
    | 'architectural_roof_curb' // Etched into building facade, roof edge, curbside & driveway pavement
    | 'integrated_facade_glass' // Floating architectural typography tracked onto glass windows & concrete
    | 'curbside_pavement_track' // Camera-tracked perspective typography painted onto sidewalk & street
    | 'floating_golden_3d' // Premium 3D floating kinetic typography with ambient occlusion & depth
    | 'subtle_lower_cinema' // Elegant ultra-minimal cinema letterbox margin placement
    | 'dynamic_surface_anchor'; // Auto-tracked to prominent scene surfaces
  spatialTextContent?: string; // Custom spatial headline/claim for in-scene projection
  activeTab: 'click-builder' | 'templates' | 'analog-engine' | 'commercial-ads' | 'references' | 'maestro-windows' | 'guidelines' | 'saved';
}

export interface SavedPreset {
  id: string;
  title: string;
  date: string;
  state: PromptBuildState;
  finalPrompt: string;
  maestroScript: string;
  theatricalScript?: string;
  // Enhanced Commercial / Client metadata for template storage
  clientName?: string;
  projectName?: string;
  performanceRating?: number; // 1-5 Stars
  notes?: string;
  personCount?: PersonCountType;
  category?: StyleCategory | string;
  isFavorite?: boolean;
  tags?: string[];
}

export interface ConfigurableQuickPreset {
  id: string;
  icon: string;
  labelEn: string;
  labelDe: string;
  descriptionEn?: string;
  descriptionDe?: string;
  category: StyleCategory | string;
  personCount: PersonCountType;
  rawConcept: string;
  wardrobeStyle?: string;
  clothingDetails?: string;
  cameraMotion?: string;
  lighting?: string;
  lensStyle?: string;
  narratorVoice?: string;
  dialogueLines?: string;
  isImmersivePov?: boolean;
  povFootsteps?: string;
  povBreathVapor?: string;
  povInteractiveHands?: string;
  isCustom?: boolean;
}
