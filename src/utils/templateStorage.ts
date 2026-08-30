import { PresetTemplate, StyleCategory, SavedPreset } from '../types';

const STORAGE_KEY_CUSTOM_TEMPLATES = 'maestro_custom_templates_json_v1';
const STORAGE_KEY_SAVED_PROMPTS = 'maestro_saved_prompts_json_v1';
const STORAGE_KEY_QUICK_PRESETS = 'maestro_quick_presets_json_v1';

import { ConfigurableQuickPreset } from '../types';

export const DEFAULT_QUICK_PRESETS: ConfigurableQuickPreset[] = [
  {
    id: 'qp-solo-hero',
    icon: '👤',
    labelEn: 'Solo Hero Portrait',
    labelDe: 'Solo-Portrait (1 Person)',
    descriptionEn: 'Single protagonist focus with 1 person lock',
    descriptionDe: 'Hauptdarsteller-Fokus mit 1-Personen-Garantie',
    category: 'action',
    personCount: '1_person',
    rawConcept: 'High-impact solo commercial sequence featuring a charismatic protagonist in a dramatic setting',
    cameraMotion: 'Slow Forward Dolly Push-In',
    lighting: 'Cinematic studio key light with rim accent',
    lensStyle: '35mm Anamorphic Lens',
    narratorVoice: 'Deep cinematic male narrator with gravitas',
  },
  {
    id: 'qp-duo-cinema',
    icon: '👥',
    labelEn: 'Co-Star Cinema Duo',
    labelDe: 'Co-Star Kino Duo (2 Personen)',
    descriptionEn: 'Interaction of lead star & co-star with 2 person lock',
    descriptionDe: 'Interaktion von Haupt- und Nebenrolle mit 2-Personen-Garantie',
    category: 'action',
    personCount: '2_person',
    rawConcept: 'High-intensity face-to-face confrontation scene between the main protagonist and their co-star rival',
    cameraMotion: 'Dynamic Orbital rotation',
    lighting: 'Flashing strobe lights & high-contrast dramatic backlight',
    lensStyle: '50mm Prime Lens',
    narratorVoice: 'Deep cinematic male narrator with gravitas',
  },
  {
    id: 'qp-duo-ensemble',
    icon: '👥',
    labelEn: 'Duo & Ensemble',
    labelDe: 'Duo / Gruppe (≥2 Personen)',
    descriptionEn: 'Multi-person interaction & group framing',
    descriptionDe: 'Mehrpersonen-Interaktion und Gruppen-Komposition',
    category: 'immobilien',
    personCount: 'multi_person',
    rawConcept: 'Dynamic interaction between two business executives discussing architectural blueprints in a sunlit atrium',
    cameraMotion: 'Medium Tracking Shot',
    lighting: 'Bright natural daylight with soft fill',
    lensStyle: '50mm Prime Lens',
    narratorVoice: 'Professional warm German voice over',
  },
  {
    id: 'qp-brand-commercial',
    icon: '🏢',
    labelEn: 'Imagefilm & Brand Commercial',
    labelDe: 'Imagefilm & Brand Video',
    descriptionEn: 'Ultra-clean corporate & luxury video style',
    descriptionDe: 'Hochwertiger Imagefilm-Look für Marken & Unternehmen',
    category: 'immobilien',
    personCount: '1_person',
    rawConcept: 'Sleek premium brand commercial, elegant modern interior design, smooth gimbal motion, high contrast 4K cinematic grade',
    cameraMotion: 'Smooth Gimbal Sweep',
    lighting: 'Volumetric studio lighting with subtle haze',
    lensStyle: '24mm Wide Angle Lens',
    narratorVoice: 'Deep cinematic male narrator with gravitas',
  },
  {
    id: 'qp-party-event',
    icon: '🎂',
    labelEn: 'Event & Celebration',
    labelDe: 'Geburtstag & Event',
    descriptionEn: 'Warm celebratory atmosphere with group dynamics',
    descriptionDe: 'Warme Party-Stimmung mit Freunden und Kerzenlicht',
    category: 'birthday',
    personCount: 'multi_person',
    rawConcept: 'Joyful birthday party scene, friends smiling around a illuminated birthday cake with glowing candles',
    cameraMotion: 'Slow Circle Orbit (Orbital Pan)',
    lighting: 'Warm candlelight bokeh and party ambient glow',
    lensStyle: '50mm Prime Lens',
  },
  {
    id: 'qp-horror-thriller',
    icon: '👻',
    labelEn: 'Horror & Thriller',
    labelDe: 'Horror & Thriller',
    descriptionEn: 'Dark atmospheric tension and suspense',
    descriptionDe: 'Düstere Spannung, Schatten & unheimliche Atmosphäre',
    category: 'horror',
    personCount: '1_person',
    rawConcept: 'Eerie abandoned corridor, flickering lights, mist creeping along the cold floor',
    cameraMotion: 'Handheld Creep-Forward',
    lighting: 'High contrast chiaroscuro horror lighting',
    lensStyle: 'Extreme Wide Angle Lens',
  },
  {
    id: 'qp-ego-pov',
    icon: '🥽',
    labelEn: 'Ego-POV Action',
    labelDe: 'Ego-POV Action',
    descriptionEn: '100% first-person view with physical head bob',
    descriptionDe: '100% Ego-Perspektive mit Blickfeld des Zuschauers',
    category: 'immersive',
    personCount: '1_person',
    rawConcept: 'First-person immersive POV running through futuristic neon alleys with dynamic movement',
    cameraMotion: 'First-Person POV Bodycam Head-Bob',
    lighting: 'Cyberpunk neon rim lighting',
    lensStyle: 'Action Cam Fisheye Lens',
    isImmersivePov: true,
    povFootsteps: 'running_sprint',
    povBreathVapor: 'heavy_panting',
    povInteractiveHands: 'holding_equipment',
  },
  {
    id: 'qp-sensual-boudoir',
    icon: '💋',
    labelEn: 'Sensual & Boudoir',
    labelDe: 'Sinnlich & Boudoir',
    descriptionEn: 'Soft lighting, silk textures, intimate mood',
    descriptionDe: 'Weiches Licht, elegante Seidenstoffe & Intimität',
    category: 'erotik',
    personCount: '1_person',
    rawConcept: 'Sensual moody rim lighting, soft silk sheets, elegant slow motion aesthetics',
    cameraMotion: 'Ultra Slow Crane Down',
    lighting: 'Golden Hour Warm Sunlight',
    lensStyle: '85mm Portrait Lens',
  },
];

/**
 * Loads configurable quick presets from local storage or returns defaults
 */
export function loadQuickPresetsFromStorage(): ConfigurableQuickPreset[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUICK_PRESETS);
    if (!raw) return DEFAULT_QUICK_PRESETS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_QUICK_PRESETS;
    return parsed;
  } catch (err) {
    console.error('Failed to load quick presets from localStorage:', err);
    return DEFAULT_QUICK_PRESETS;
  }
}

/**
 * Saves quick presets to local storage
 */
export function saveQuickPresetsToStorage(presets: ConfigurableQuickPreset[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_QUICK_PRESETS, JSON.stringify(presets, null, 2));
  } catch (err) {
    console.error('Failed to save quick presets to localStorage:', err);
  }
}

export interface TemplateLibraryPackage {
  schema: 'maestro_template_library_v1';
  version: '1.0';
  app: 'MAESTRO H3';
  exportedAt: string;
  totalCount: number;
  customCount: number;
  categories: StyleCategory[];
  description?: string;
  templates: PresetTemplate[];
}

export const ALL_STYLE_CATEGORIES: StyleCategory[] = [
  'birthday',
  'horror',
  'sitcom',
  'scify',
  'bau',
  'immobilien',
  'restaurant',
  'cyberpunk',
  'fashion',
  'lingerie',
  'erotik',
  'action',
  'fantasy',
  'nature',
  'comic',
  'war',
  'politics',
  'travel',
  'immersive',
  'custom',
];

/**
 * Validates whether a given JS object conforms to a valid PresetTemplate
 */
export function validateTemplateObject(obj: any): { valid: boolean; error?: string; template?: PresetTemplate } {
  if (!obj || typeof obj !== 'object') {
    return { valid: false, error: 'JSON payload is not a valid object.' };
  }

  if (!obj.title || typeof obj.title !== 'string' || obj.title.trim().length === 0) {
    return { valid: false, error: 'Missing required field: "title" (string)' };
  }

  if (!obj.prompt || typeof obj.prompt !== 'string' || obj.prompt.trim().length === 0) {
    return { valid: false, error: 'Missing required field: "prompt" (string)' };
  }

  const category: StyleCategory = ALL_STYLE_CATEGORIES.includes(obj.category) ? obj.category : 'custom';

  const template: PresetTemplate = {
    id: obj.id && typeof obj.id === 'string' ? obj.id : `template-json-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    title: String(obj.title).trim(),
    category,
    description: typeof obj.description === 'string' ? obj.description : 'Custom JSON template',
    badge: typeof obj.badge === 'string' ? obj.badge : 'JSON Preset',
    prompt: String(obj.prompt).trim(),
    camera: typeof obj.camera === 'string' ? obj.camera : 'Slow tracking shot',
    lighting: typeof obj.lighting === 'string' ? obj.lighting : 'Cinematic studio lighting',
    lens: typeof obj.lens === 'string' ? obj.lens : '35mm Anamorphic lens',
    motionSpeed: typeof obj.motionSpeed === 'string' ? obj.motionSpeed : '24fps Normal',
    audioCue: typeof obj.audioCue === 'string' ? obj.audioCue : undefined,
    negativePrompt: typeof obj.negativePrompt === 'string' ? obj.negativePrompt : 'cheap CGI, blurry, bad lighting, watermark',
    sampleImage: typeof obj.sampleImage === 'string' ? obj.sampleImage : undefined,
    isNsfw: Boolean(obj.isNsfw),
    isCustom: obj.isCustom !== undefined ? Boolean(obj.isCustom) : true,
    tags: Array.isArray(obj.tags) ? obj.tags.map(String) : [category, 'json-import'],
    windowsCount: typeof obj.windowsCount === 'number' ? obj.windowsCount : 4,
    styleCode: typeof obj.styleCode === 'string' ? obj.styleCode : 'ASTROCINEMAV01K2T',
    styleAndTone: typeof obj.styleAndTone === 'string' ? obj.styleAndTone : undefined,
    audioDesign: typeof obj.audioDesign === 'string' ? obj.audioDesign : undefined,
    multiShotSequence: typeof obj.multiShotSequence === 'string' ? obj.multiShotSequence : undefined,
    theatricalScript: typeof obj.theatricalScript === 'string' ? obj.theatricalScript : undefined,
    wardrobeStyle: typeof obj.wardrobeStyle === 'string' ? obj.wardrobeStyle : undefined,
    clothingDetails: typeof obj.clothingDetails === 'string' ? obj.clothingDetails : undefined,
    movieTitle: typeof obj.movieTitle === 'string' ? obj.movieTitle : undefined,
    dialogueLines: typeof obj.dialogueLines === 'string' ? obj.dialogueLines : undefined,
    narratorVoice: typeof obj.narratorVoice === 'string' ? obj.narratorVoice : undefined,
    characterPersonaDescription: typeof obj.characterPersonaDescription === 'string' ? obj.characterPersonaDescription : undefined,
    isImmersivePov: typeof obj.isImmersivePov === 'boolean' ? obj.isImmersivePov : undefined,
    povKineticProfile: typeof obj.povKineticProfile === 'string' ? obj.povKineticProfile : undefined,
    povVerticalDisplacement: typeof obj.povVerticalDisplacement === 'string' ? obj.povVerticalDisplacement : undefined,
    povRigType: typeof obj.povRigType === 'string' ? obj.povRigType : undefined,
    povFootsteps: typeof obj.povFootsteps === 'string' ? obj.povFootsteps : undefined,
    povBreathVapor: typeof obj.povBreathVapor === 'string' ? obj.povBreathVapor : undefined,
    povInteractiveHands: typeof obj.povInteractiveHands === 'string' ? obj.povInteractiveHands : undefined,
    povWeatherImmersion: typeof obj.povWeatherImmersion === 'string' ? obj.povWeatherImmersion : undefined,
    povVisceralAudio: typeof obj.povVisceralAudio === 'boolean' ? obj.povVisceralAudio : undefined,
  };

  return { valid: true, template };
}

/**
 * Creates a structured JSON backup package including metadata and schema validation.
 */
export function createTemplateLibraryPackage(
  templates: PresetTemplate[],
  description?: string
): TemplateLibraryPackage {
  const categories = Array.from(new Set(templates.map((t) => t.category))) as StyleCategory[];
  const customCount = templates.filter((t) => t.isCustom).length;

  return {
    schema: 'maestro_template_library_v1',
    version: '1.0',
    app: 'MAESTRO H3',
    exportedAt: new Date().toISOString(),
    totalCount: templates.length,
    customCount,
    categories,
    description: description || `MAESTRO H3 Template Library Export (${templates.length} templates)`,
    templates,
  };
}

/**
 * Loads custom templates from local JSON storage
 */
export function loadCustomTemplatesFromStorage(): PresetTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_TEMPLATES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const list: PresetTemplate[] = [];
    for (const item of parsed) {
      const res = validateTemplateObject(item);
      if (res.valid && res.template) {
        list.push(res.template);
      }
    }
    return list;
  } catch (err) {
    console.error('Failed to parse custom templates JSON from localStorage:', err);
    return [];
  }
}

/**
 * Saves entire custom templates list as pure JSON in localStorage
 */
export function saveCustomTemplatesToStorage(templates: PresetTemplate[]): void {
  try {
    const jsonStr = JSON.stringify(templates, null, 2);
    localStorage.setItem(STORAGE_KEY_CUSTOM_TEMPLATES, jsonStr);
  } catch (err) {
    console.error('Failed to write templates JSON to localStorage:', err);
  }
}

/**
 * Parses and imports JSON text (supports library packages, template arrays, or single template objects)
 */
export function parseTemplatesJSON(rawJsonText: string): {
  success: boolean;
  templates: PresetTemplate[];
  metadata?: Partial<TemplateLibraryPackage>;
  error?: string;
  importedCount: number;
  invalidCount: number;
} {
  try {
    let cleaned = rawJsonText.trim();
    // Support markdown code fence stripping
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleaned);
    const resultTemplates: PresetTemplate[] = [];
    let invalidCount = 0;
    let metadata: Partial<TemplateLibraryPackage> | undefined = undefined;

    // Check if it's a wrapped package
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && Array.isArray(parsed.templates)) {
      metadata = {
        schema: parsed.schema,
        version: parsed.version,
        app: parsed.app,
        exportedAt: parsed.exportedAt,
        totalCount: parsed.totalCount,
        customCount: parsed.customCount,
        categories: parsed.categories,
        description: parsed.description,
      };

      for (const item of parsed.templates) {
        const check = validateTemplateObject(item);
        if (check.valid && check.template) {
          resultTemplates.push(check.template);
        } else {
          invalidCount++;
        }
      }
    } else if (Array.isArray(parsed)) {
      for (const item of parsed) {
        const check = validateTemplateObject(item);
        if (check.valid && check.template) {
          resultTemplates.push(check.template);
        } else {
          invalidCount++;
        }
      }
    } else if (parsed && typeof parsed === 'object') {
      const check = validateTemplateObject(parsed);
      if (check.valid && check.template) {
        resultTemplates.push(check.template);
      } else {
        return {
          success: false,
          templates: [],
          error: check.error || 'Ungültiges einzelnes Vorlagen-JSON-Objekt.',
          importedCount: 0,
          invalidCount: 1,
        };
      }
    }

    if (resultTemplates.length === 0) {
      return {
        success: false,
        templates: [],
        error: 'Die JSON-Eingabe enthält keine gültigen Vorlagen-Definitionen (Titel & Prompt sind Pflichtfelder).',
        importedCount: 0,
        invalidCount,
      };
    }

    return {
      success: true,
      templates: resultTemplates,
      metadata,
      importedCount: resultTemplates.length,
      invalidCount,
    };
  } catch (err: any) {
    return {
      success: false,
      templates: [],
      error: `JSON-Syntaxfehler: ${err?.message || 'Fehler beim Parsen der Datei.'}`,
      importedCount: 0,
      invalidCount: 0,
    };
  }
}

export type ImportMergeStrategy = 'merge_keep_existing' | 'merge_overwrite' | 'replace_all';

/**
 * Merges incoming imported templates into an existing template collection according to strategy.
 */
export function mergeTemplatesList(
  existing: PresetTemplate[],
  incoming: PresetTemplate[],
  strategy: ImportMergeStrategy
): { result: PresetTemplate[]; addedCount: number; updatedCount: number; skippedCount: number } {
  if (strategy === 'replace_all') {
    const formatted = incoming.map((t) => ({ ...t, isCustom: true }));
    return {
      result: formatted,
      addedCount: formatted.length,
      updatedCount: 0,
      skippedCount: 0,
    };
  }

  const existingMap = new Map<string, PresetTemplate>();
  const titleMap = new Map<string, PresetTemplate>();
  existing.forEach((t) => {
    existingMap.set(t.id, t);
    titleMap.set(t.title.toLowerCase().trim(), t);
  });

  const merged = [...existing];
  let addedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const item of incoming) {
    const customItem = { ...item, isCustom: true };
    const matchingById = existingMap.get(customItem.id);
    const matchingByTitle = titleMap.get(customItem.title.toLowerCase().trim());
    const matched = matchingById || matchingByTitle;

    if (matched) {
      if (strategy === 'merge_overwrite') {
        const index = merged.findIndex((m) => m.id === matched.id);
        if (index !== -1) {
          merged[index] = { ...customItem, id: matched.id };
          updatedCount++;
        }
      } else {
        // 'merge_keep_existing' -> create new unique ID and append
        const newUniqueItem = {
          ...customItem,
          id: `custom-tpl-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          title: matchingByTitle ? `${customItem.title} (Kopie)` : customItem.title,
        };
        merged.push(newUniqueItem);
        addedCount++;
      }
    } else {
      merged.push(customItem);
      existingMap.set(customItem.id, customItem);
      titleMap.set(customItem.title.toLowerCase().trim(), customItem);
      addedCount++;
    }
  }

  return {
    result: merged,
    addedCount,
    updatedCount,
    skippedCount,
  };
}

/**
 * Triggers a native browser file download for any JSON data
 */
export function triggerJSONDownload(filename: string, data: any): void {
  const jsonString = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.json') ? filename : `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/**
 * Calculates current local storage footprint for templates and presets
 */
export function getStorageMetrics(): {
  customTemplatesCount: number;
  customTemplatesBytes: number;
  customTemplatesKb: number;
  savedPromptsCount: number;
  savedPromptsBytes: number;
  savedPromptsKb: number;
  totalKb: number;
} {
  try {
    const rawTemplates = localStorage.getItem(STORAGE_KEY_CUSTOM_TEMPLATES) || '[]';
    const rawPrompts = localStorage.getItem(STORAGE_KEY_SAVED_PROMPTS) || '[]';

    const parsedTemplates = JSON.parse(rawTemplates);
    const parsedPrompts = JSON.parse(rawPrompts);

    const customTemplatesBytes = new Blob([rawTemplates]).size;
    const savedPromptsBytes = new Blob([rawPrompts]).size;

    const customTemplatesCount = Array.isArray(parsedTemplates) ? parsedTemplates.length : 0;
    const savedPromptsCount = Array.isArray(parsedPrompts) ? parsedPrompts.length : 0;

    const customTemplatesKb = Math.round((customTemplatesBytes / 1024) * 10) / 10;
    const savedPromptsKb = Math.round((savedPromptsBytes / 1024) * 10) / 10;
    const totalKb = Math.round(((customTemplatesBytes + savedPromptsBytes) / 1024) * 10) / 10;

    return {
      customTemplatesCount,
      customTemplatesBytes,
      customTemplatesKb,
      savedPromptsCount,
      savedPromptsBytes,
      savedPromptsKb,
      totalKb,
    };
  } catch (err) {
    return {
      customTemplatesCount: 0,
      customTemplatesBytes: 0,
      customTemplatesKb: 0,
      savedPromptsCount: 0,
      savedPromptsBytes: 0,
      savedPromptsKb: 0,
      totalKb: 0,
    };
  }
}

/**
 * Loads saved presets and multi-window setups from local JSON storage
 */
export function loadSavedPromptsFromStorage(): SavedPreset[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_PROMPTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load saved prompts from localStorage:', err);
    return [];
  }
}

/**
 * Saves presets list to local JSON storage
 */
export function saveSavedPromptsToStorage(savedList: SavedPreset[]): void {
  try {
    const jsonStr = JSON.stringify(savedList, null, 2);
    localStorage.setItem(STORAGE_KEY_SAVED_PROMPTS, jsonStr);
  } catch (err) {
    console.error('Failed to save prompts to localStorage:', err);
  }
}


