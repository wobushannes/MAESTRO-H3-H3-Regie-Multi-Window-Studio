import * as fs from 'fs';
import * as path from 'path';
import { PROMPT_THEMES } from '../promptThemes';
import { birthdayPresets } from './birthday';
import { horrorPresets } from './horror';
import { sitcomPresets } from './sitcom';
import { scifyPresets } from './scify';
import { bauPresets } from './bau';
import { immobilienPresets } from './immobilien';
import { restaurantPresets } from './restaurant';
import { cyberpunkPresets } from './cyberpunk';
import { fashionPresets } from './fashion';
import { erotikPresets } from './erotik';
import { actionPresets } from './action';
import { fantasyPresets } from './fantasy';
import { naturePresets } from './nature';
import { comicPresets } from './comic';
import { warPresets } from './war';
import { politicsPresets } from './politics';
import { travelPresets } from './travel';
import { immersivePresets } from './immersive';
import { PresetTemplate, StyleCategory, PersonCountType } from '../../types';

const JSON_DIR = path.join(process.cwd(), 'src', 'data', 'presets', 'json');

if (!fs.existsSync(JSON_DIR)) {
  fs.mkdirSync(JSON_DIR, { recursive: true });
}

// 1. Process and save base handcrafted templates
const ALL_BASE_PRESETS = [
  ...birthdayPresets,
  ...horrorPresets,
  ...sitcomPresets,
  ...scifyPresets,
  ...bauPresets,
  ...immobilienPresets,
  ...restaurantPresets,
  ...cyberpunkPresets,
  ...fashionPresets,
  ...erotikPresets,
  ...actionPresets,
  ...fantasyPresets,
  ...naturePresets,
  ...comicPresets,
  ...warPresets,
  ...politicsPresets,
  ...travelPresets,
  ...immersivePresets,
];

const normalizedBase = ALL_BASE_PRESETS.map((t, idx) => {
  const combinedText = `${t.title} ${t.description} ${t.prompt} ${(t.tags || []).join(' ')}`.toLowerCase();
  const isMulti =
    t.category === 'birthday' ||
    t.category === 'sitcom' ||
    /group|ensemble|duo|trio|choir|band|singers|team|role|crew|squad|pair|friends|party|2 personen|≥2|multi|co-star|partner|crowd/i.test(combinedText);

  const personCount: PersonCountType = isMulti ? 'multi_person' : '1_person';
  const windowsCount = t.windowsCount || (isMulti ? 4 : 1);

  return {
    ...t,
    id: t.id || `base-${t.category}-${idx}`,
    personCount,
    windowsCount,
    tags: Array.from(new Set([...(t.tags || []), personCount, isMulti ? 'group' : 'solo'])),
  } as PresetTemplate;
});

fs.writeFileSync(
  path.join(JSON_DIR, 'presets_base.json'),
  JSON.stringify(normalizedBase, null, 2),
  'utf8'
);

console.log(`Saved ${normalizedBase.length} base presets to presets_base.json`);

// 2. Generate procedurally 120+ templates per variant
const categories = Object.keys(PROMPT_THEMES);

function generateVariantTemplates(
  variantType: 'person' | 'picture',
  variantValue: string,
  targetCount: number = 150
): PresetTemplate[] {
  const list: PresetTemplate[] = [];
  let index = 0;

  while (list.length < targetCount) {
    const category = categories[index % categories.length];
    const data = PROMPT_THEMES[category];
    const itemIdx = Math.floor(list.length / categories.length) + index;

    const title = data.titles[itemIdx % data.titles.length];
    const description = data.descriptions[itemIdx % data.descriptions.length];
    const basePrompt = data.prompts[itemIdx % data.prompts.length];
    const camera = data.cameras[itemIdx % data.cameras.length];
    const lighting = data.lightings[itemIdx % data.lightings.length];
    const lens = data.lenses[itemIdx % data.lenses.length];
    const wardrobeStyle = data.wardrobeLabel[itemIdx % data.wardrobeLabel.length];
    const clothingDetails = data.clothes[itemIdx % data.clothes.length];
    const audioCue = data.audios[itemIdx % data.audios.length];
    const dialogueLines = data.dialogues[itemIdx % data.dialogues.length];
    const narratorVoice = data.narratorVoices[itemIdx % data.narratorVoices.length];

    // Determine person and picture properties
    let pCount: PersonCountType = '1_person';
    let winCount = 1;

    if (variantType === 'person') {
      pCount = variantValue as PersonCountType;
      // Picture counts can vary
      winCount = pCount === '1_person' ? 1 : pCount === '2_person' ? 2 : 4;
    } else {
      winCount = variantValue === '1' ? 1 : variantValue === '2' ? 2 : 4;
      // Person count can vary
      pCount = winCount === 1 ? '1_person' : winCount === 2 ? '2_person' : 'multi_person';
    }

    // Adapt Prompt reference markers based on windowsCount
    let adaptedPrompt = basePrompt;
    if (winCount === 1) {
      adaptedPrompt = adaptedPrompt
        .replace(/picture\s*[234]/gi, 'picture 1')
        .replace(/\[Picture\s*2.*?\]/gi, '')
        .replace(/\[Picture\s*3.*?\]/gi, '')
        .replace(/\[Picture\s*4.*?\]/gi, '');
    } else if (winCount === 2) {
      adaptedPrompt = adaptedPrompt
        .replace(/picture\s*[34]/gi, 'picture 2')
        .replace(/\[Picture\s*3.*?\]/gi, '')
        .replace(/\[Picture\s*4.*?\]/gi, '');
    }

    const badge = variantType === 'person'
      ? `👤 Variant ${variantValue === '1_person' ? 'Solo' : variantValue === '2_person' ? 'Duo' : 'Multi'} (#${list.length + 1})`
      : `🖼️ Variant ${variantValue === '1' ? '1-Bild' : variantValue === '2' ? '2-Bilder' : 'Multi-Bild'} (#${list.length + 1})`;

    list.push({
      id: `variant-${variantType}-${variantValue}-${list.length}`,
      title: `${title} [V: ${variantValue}] #${list.length + 1}`,
      category: category as StyleCategory,
      badge,
      description: `${description} (Automatisch optimiert für ${variantValue})`,
      prompt: adaptedPrompt,
      camera,
      lighting,
      lens,
      motionSpeed: 'Cinema timing (24fps)',
      audioCue,
      negativePrompt: 'low quality, blurry, cheap digital look, raw amateur footage',
      tags: [
        category,
        pCount,
        `win-${winCount}`,
        variantType,
        variantValue,
        'procedural',
        'high-fidelity'
      ],
      personCount: pCount,
      windowsCount: winCount,
      styleCode: `V-${variantType}-${variantValue}`.toUpperCase(),
      wardrobeStyle,
      clothingDetails,
      movieTitle: title,
      dialogueLines,
      narratorVoice,
    });

    index++;
  }

  return list;
}

// Generate the variants
const variants = [
  { type: 'person', value: '1_person' },
  { type: 'person', value: '2_person' },
  { type: 'person', value: 'multi_person' },
  { type: 'picture', value: '1' },
  { type: 'picture', value: '2' },
  { type: 'picture', value: 'multi' },
] as const;

variants.forEach((v) => {
  const list = generateVariantTemplates(v.type, v.value, 2500);
  const filename = `variant_${v.type}_${v.value}.json`;
  fs.writeFileSync(
    path.join(JSON_DIR, filename),
    JSON.stringify(list, null, 2),
    'utf8'
  );
  console.log(`Saved ${list.length} templates to ${filename}`);
});

console.log('Template generation completed successfully!');
