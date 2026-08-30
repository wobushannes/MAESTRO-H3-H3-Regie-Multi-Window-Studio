import * as fs from 'fs';
import * as path from 'path';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY environment variable is missing.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Sleep helper to avoid hitting API rate limits
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simple parser to extract JSON blocks from markdown responses
function extractJSON(text: string): any {
  try {
    const rawMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
    const cleanText = rawMatch ? rawMatch[1] : text;
    return JSON.parse(cleanText.trim());
  } catch (error) {
    console.error('Failed to parse JSON from AI response. Raw text:', text);
    throw error;
  }
}

// Translate a chunk of standard presets
async function translatePresetChunk(presets: any[]): Promise<any[]> {
  const prompt = `You are an expert translator. Translate any German text inside the fields "title", "description", "badge", and the array "tags" of the following video prompt templates into natural, high-quality, professional English.

Instructions:
- ONLY translate "title", "description", "badge", and the strings in "tags".
- Keep all other fields exactly as they are (like "id", "category", "prompt", "camera", "lighting", "lens", "motionSpeed", "audioCue", "negativePrompt", "styleCode", "wardrobeStyle", "clothingDetails").
- Translate German tags (e.g., "Immobilien" to "Real Estate", "Sonnenuntergang" to "Sunset", "Schweißen" to "Welding").
- Return ONLY the translated JSON array of objects. Do not write any introduction, commentary or wrap in anything other than a code block.

Input JSON:
${JSON.stringify(presets, null, 2)}
`;

  let retries = 3;
  while (retries > 0) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
      });

      if (response.text) {
        const result = extractJSON(response.text);
        if (Array.isArray(result) && result.length === presets.length) {
          return result;
        }
      }
      throw new Error('AI returned an empty or invalid array structure.');
    } catch (err: any) {
      console.warn(`Attempt failed: ${err.message}. Retrying in 2 seconds...`);
      retries--;
      await sleep(2000);
    }
  }
  throw new Error('Failed to translate chunk after 3 attempts.');
}

// Translate a chunk of commercial presets
async function translateCommercialChunk(presets: any[]): Promise<any[]> {
  const prompt = `You are an expert translator. Translate any German text inside the fields "name", "clientType", "cameraSetup", "lightingStyle", "colorGrading", "promptSnippet", "badge", "description", "bestFor", "defaultClaim", "defaultBrand", "defaultCta", "defaultSpatialText", "referenceImagesHint" into natural, high-quality, professional English.

Instructions:
- Keep structural values or technical parameters like "id", "category", "lensChoice", "analogPresetId", "suggestedVoice", "defaultOutroAnimation", "spatialPositionDefault", "pictureSequenceType" exactly as they are.
- Return ONLY the translated JSON array of objects. Do not write any introduction, commentary, or wrap in anything other than a code block.

Input JSON:
${JSON.stringify(presets, null, 2)}
`;

  let retries = 3;
  while (retries > 0) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
      });

      if (response.text) {
        const result = extractJSON(response.text);
        if (Array.isArray(result) && result.length === presets.length) {
          return result;
        }
      }
      throw new Error('AI returned an empty or invalid array structure for commercial presets.');
    } catch (err: any) {
      console.warn(`Attempt failed: ${err.message}. Retrying in 2 seconds...`);
      retries--;
      await sleep(2000);
    }
  }
  throw new Error('Failed to translate commercial chunk after 3 attempts.');
}

async function run() {
  const baseFiles = [];

  console.log('--- STARTING PRESET TRANSLATION ---');

  for (const file of baseFiles) {
    const fullPath = path.join(process.cwd(), file.path);
    console.log(`\nTranslating: ${file.name} (${file.path})`);
    
    // Dynamically import the TS file data
    const module = await import(fullPath);
    const originalPresets = module[file.exportName];
    
    if (!originalPresets || !Array.isArray(originalPresets)) {
      console.error(`Could not find array ${file.exportName} in ${file.path}`);
      continue;
    }

    console.log(`Found ${originalPresets.length} presets. Translating in chunks of 15...`);
    const translated: any[] = [];
    
    for (let i = 0; i < originalPresets.length; i += 15) {
      const chunk = originalPresets.slice(i, i + 15);
      console.log(`Translating chunk ${Math.floor(i / 15) + 1}/${Math.ceil(originalPresets.length / 15)}...`);
      
      const translatedChunk = await translatePresetChunk(chunk);
      translated.push(...translatedChunk);
      
      await sleep(1000); // 1s rate-limiting safety pause
    }

    // Write back clean TS file
    const content = `import { PresetTemplate } from '../../types';\n\nexport const ${file.exportName}: PresetTemplate[] = ${JSON.stringify(translated, null, 2)};\n`;
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Successfully updated ${file.path} in English!`);
  }

  // Next, translate commercialPresetsData.ts
  console.log('\n--- TRANSLATING COMMERCIAL PRESETS ---');
  const commPath = path.join(process.cwd(), 'src/data/commercialPresetsData.ts');
  const commModule = await import(commPath);
  const originalCommPresets = commModule.COMMERCIAL_100_PRESETS;

  if (originalCommPresets && Array.isArray(originalCommPresets)) {
    console.log(`Found ${originalCommPresets.length} commercial presets. Translating in chunks of 12...`);
    const translatedComm: any[] = [];

    for (let i = 0; i < originalCommPresets.length; i += 12) {
      const chunk = originalCommPresets.slice(i, i + 12);
      console.log(`Translating commercial chunk ${Math.floor(i / 12) + 1}/${Math.ceil(originalCommPresets.length / 12)}...`);

      const translatedChunk = await translateCommercialChunk(chunk);
      translatedComm.push(...translatedChunk);

      await sleep(1200); // safety pause
    }

    // Overwrite commercial file while preserving interface definition
    const fileContent = fs.readFileSync(commPath, 'utf8');
    const interfaceMarker = 'export const COMMERCIAL_100_PRESETS';
    const markerIndex = fileContent.indexOf(interfaceMarker);

    if (markerIndex !== -1) {
      const header = fileContent.substring(0, markerIndex);
      const newContent = `${header}export const COMMERCIAL_100_PRESETS: CommercialPreset[] = ${JSON.stringify(translatedComm, null, 2)};\n`;
      fs.writeFileSync(commPath, newContent, 'utf8');
      console.log(`Successfully updated commercialPresetsData.ts in English!`);
    } else {
      console.error('Could not find COMMERCIAL_100_PRESETS marker in file.');
    }
  }

  console.log('\n--- TRANSLATIONS COMPLETED SUCCESSFULLY! ---');
}

run().catch((err) => {
  console.error('An error occurred during translation runs:', err);
  process.exit(1);
});
