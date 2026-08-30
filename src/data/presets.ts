import { PresetTemplate, PersonCountType } from '../types';
import basePresets from './presets/json/presets_base.json';

// Export the statically-loaded base handcrafted templates for instant UI rendering
export const PRESET_TEMPLATES: PresetTemplate[] = basePresets as PresetTemplate[];

// Cache for loaded variants to prevent redundant network requests and memory pressure
const loadedVariants: Record<string, PresetTemplate[]> = {};

/**
 * Dynamically loads preset templates for a given variant on demand.
 * This ensures that the main bundle size remains tiny, and thousands of templates are only loaded when selected.
 */
export async function loadVariantTemplates(
  type: 'person' | 'picture',
  value: string
): Promise<PresetTemplate[]> {
  const cacheKey = `${type}_${value}`;
  if (loadedVariants[cacheKey]) {
    return loadedVariants[cacheKey];
  }

  try {
    let data;
    if (type === 'person') {
      if (value === '1_person') {
        data = await import('./presets/json/variant_person_1_person.json');
      } else if (value === '2_person') {
        data = await import('./presets/json/variant_person_2_person.json');
      } else if (value === 'multi_person') {
        data = await import('./presets/json/variant_person_multi_person.json');
      }
    } else {
      if (value === '1') {
        data = await import('./presets/json/variant_picture_1.json');
      } else if (value === '2') {
        data = await import('./presets/json/variant_picture_2.json');
      } else if (value === 'multi') {
        data = await import('./presets/json/variant_picture_multi.json');
      }
    }

    if (data && data.default) {
      loadedVariants[cacheKey] = data.default as PresetTemplate[];
      return loadedVariants[cacheKey];
    }
  } catch (error) {
    console.error(`Failed to load dynamic preset variant for ${type} [${value}]:`, error);
  }

  return [];
}
