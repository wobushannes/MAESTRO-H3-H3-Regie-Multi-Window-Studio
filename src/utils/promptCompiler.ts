import { PromptBuildState } from '../types';

export function formatSecondsToTimestamp(sec: number): string {
  const mins = Math.floor(sec / 60);
  const remainderSec = Math.floor(sec % 60);
  const ms = Math.floor((sec % 1) * 1000);
  const mm = String(mins).padStart(2, '0');
  const ss = String(remainderSec).padStart(2, '0');
  const mmm = String(ms).padStart(3, '0');
  return `${mm}:${ss}.${mmm}`;
}

/**
 * 🎬 Clean Visual Video Prompt (100% Meta-Label-Free)
 * Strips out ALL technical headers and colon prefixes (like "Camera:", "Lighting:", "1. Target...")
 * so that AI video generators (MiniMax, Hailuo, Kling, Runway, Sora, Luma) generate pure visuals
 * WITHOUT ever speaking prompt instructions out loud or rendering prompt text on screen!
 */
export function compileCleanVisualVideoPrompt(state: PromptBuildState): string {
  const sentences: string[] = [];
  const titleText = state.movieTitle?.trim() || 'THE LAST LIGHTHOUSE';

  // 1. Core Visual Concept
  let concept = state.rawConcept.trim();
  if (!concept) {
    concept = 'A photorealistic cinematic film sequence with dramatic atmospheric lighting and fluid camera motion.';
  }

  // Remove existing leading colons or prefixes if user pasted them
  concept = concept.replace(/^(Camera|Lighting|Lens|Wardrobe|Shot|Scene):\s*/i, '');

  if (!/[.!?]$/.test(concept)) {
    concept += '.';
  }
  sentences.push(concept);

  // 2. Multi-Window Sequence flow if active
  if (state.generatorMode === 'multi' && state.windows.length > 0) {
    const windowActions = state.windows
      .map((w) => w.prompt.trim())
      .filter(Boolean)
      .filter((p) => p !== concept && !concept.includes(p));

    if (windowActions.length > 0) {
      sentences.push(
        `The camera trajectory seamlessly progresses through the sequence: ${windowActions.join(' Next, ')}.`
      );
    }
  }

  // 3. Camera Motion (Cleaned of "Camera:" label)
  if (state.cameraMotion) {
    let cam = state.cameraMotion.trim().replace(/^Camera:\s*/i, '');
    if (!/[.!?]$/.test(cam)) cam += '.';
    sentences.push(`Dynamic camera trajectory features ${cam}`);
  }

  // 4. Lighting & Atmosphere
  if (state.lighting) {
    let light = state.lighting.trim().replace(/^Lighting:\s*/i, '');
    if (!/[.!?]$/.test(light)) light += '.';
    sentences.push(`Illuminated by ${light}`);
  }

  // 5. Lens & Aesthetic Optics
  if (state.lensStyle) {
    let lens = state.lensStyle.trim().replace(/^(Lens & Render|Lens):\s*/i, '');
    if (!/[.!?]$/.test(lens)) lens += '.';
    sentences.push(`Shot on ${lens}`);
  }

  // 6. Wardrobe, Outfit & Character Details
  const wardrobeItems: string[] = [];
  if (state.wardrobeStyle) wardrobeItems.push(state.wardrobeStyle.trim());
  if (state.clothingDetails) wardrobeItems.push(state.clothingDetails.trim());
  if (state.fashionAccessories) wardrobeItems.push(state.fashionAccessories.trim());

  if (wardrobeItems.length > 0) {
    sentences.push(`Character wardrobe and styling includes ${wardrobeItems.join(', ')}.`);
  }

  // 6b. Detailed Character/Persona Description (KI-Video Qualitäts-Booster)
  if (state.characterPersonaDescription) {
    let charDesc = state.characterPersonaDescription.trim();
    if (!/[.!?]$/.test(charDesc)) charDesc += '.';
    sentences.push(`The protagonist is characterized in high-fidelity detail: ${charDesc}`);
  }

  // 7. Motion Speed & Physics
  if (state.motionSpeed) {
    let motion = state.motionSpeed.trim().replace(/^Motion:\s*/i, '');
    if (!/[.!?]$/.test(motion)) motion += '.';
    sentences.push(`Rendered with ${motion}`);
  } else {
    sentences.push('Captured with 24fps physical motion blur, realistic surface optics, and natural physics.');
  }

  // 8. Title Card Abspann (Pure visual description)
  sentences.push(
    `Concluding with a hard cut to black canvas as a bold glowing theatrical title card reading "${titleText.toUpperCase()}" emerges.`
  );

  return sentences.join(' ');
}

/**
 * 🎙️ Clean Audio & Voiceover Prompt
 * Separates spoken narration and sound effects cleanly for ElevenLabs or Audio AI tools.
 */
export function compileCleanAudioVoiceoverPrompt(state: PromptBuildState): string {
  const titleText = state.movieTitle?.trim() || 'THE LAST LIGHTHOUSE';
  const parts: string[] = [];

  parts.push(`=== SPOKEN DIALOGUE & NARRATION ===`);
  if (state.dialogueLines?.trim()) {
    parts.push(state.dialogueLines.trim());
  } else {
    parts.push(`Narrator: "${titleText.toUpperCase()}."`);
  }

  parts.push(`\n=== ATMOSPHERIC SOUND DESIGN & SFX ===`);
  if (state.audioCue) {
    const cleanCue = state.audioCue.replace(/^\[Audio:\s*/i, '').replace(/\]$/, '');
    parts.push(`Soundscape: ${cleanCue}`);
  } else {
    parts.push(`Soundscape: Ocean wind, isolated piano note, low strings, timber creaks, lighthouse machinery, radio static.`);
  }

  parts.push(`Trailer SFX: Deep sub-bass trailer impacts, low string swells, restrained pulse.`);

  if (state.narratorVoice) {
    parts.push(`Voice Character: ${state.narratorVoice}`);
  } else {
    parts.push(`Voice Character: Deep cinematic male narrator with gravitas.`);
  }

  return parts.join('\n');
}

/**
 * 📜 Full Studio Script (Full Director Screenplay Document)
 * Contains the complete structured breakdown with timestamps and technical specs.
 */
export function compileStudioTheatricalScript(state: PromptBuildState): string {
  const totalSeconds =
    state.generatorMode === 'multi'
      ? state.windows.length * 3
      : state.durationSeconds || 6;

  const styleCode = state.styleCode || 'ASTROCINEMAV01K2T';

  // 1. Target Header
  const header = `1. Target duration: ${totalSeconds} seconds\n2. Format: ${state.aspectRatio || '16:9'}`;

  // 2. Style and Tone
  let styleTone = `style_and_tone:\n${styleCode}. Photorealistic theatrical film trailer`;
  if (state.rawConcept) {
    styleTone += `, ${state.rawConcept.replace(/\n/g, ' ')}`;
  }
  if (state.lighting) {
    styleTone += `, ${state.lighting}`;
  }
  if (state.lensStyle) {
    styleTone += `, ${state.lensStyle}`;
  }
  if (state.cameraMotion) {
    styleTone += `, ${state.cameraMotion}`;
  }

  // Wardrobe / Mode & Kleidung
  const wardrobeParts: string[] = [];
  if (state.wardrobeStyle) wardrobeParts.push(state.wardrobeStyle);
  if (state.clothingDetails) wardrobeParts.push(state.clothingDetails);
  if (state.fashionAccessories) wardrobeParts.push(state.fashionAccessories);

  if (wardrobeParts.length > 0) {
    styleTone += `, wardrobe and fashion styling: ${wardrobeParts.join(', ')}`;
  }

  if (state.characterPersonaDescription) {
    styleTone += `, protagonist persona description: ${state.characterPersonaDescription}`;
  }

  styleTone += `, subtle film grain and premium theatrical finish.`;

  // Reference Pictures Block if available
  let refPicturesBlock = '';
  if (state.referenceImages && state.referenceImages.length > 0) {
    refPicturesBlock = `\n\nreference_pictures:\n` +
      state.referenceImages
        .map((ref, idx) => `picture ${idx + 1}: ${ref.label} (${ref.role}) - ${ref.description || 'reference anchor'}`)
        .join('\n');
  }

  // 3. Audio Design
  let audioDesign = `audio_design:\n`;
  if (state.audioCue) {
    audioDesign += `${state.audioCue.replace(/^\[Audio:\s*/i, '').replace(/\]$/, '')}. `;
  } else {
    audioDesign += `Begin with atmospheric ambient swell and low isolated piano note. `;
  }
  audioDesign += `Gradually introduce low strings, deep trailer percussion and restrained pulses. Carefully placed trailer impacts. `;
  if (state.narratorVoice) {
    audioDesign += `${state.narratorVoice}.`;
  } else {
    audioDesign += `Deep cinematic male narrator with gravitas.`;
  }

  // 4. Multi Shot Sequence
  let shotSequence = `multi_shot_sequence:\n`;
  const titleText = state.movieTitle?.trim() || 'THE LAST LIGHTHOUSE';

  if (state.generatorMode === 'multi' && state.windows.length > 0) {
    state.windows.forEach((win, idx) => {
      const startSec = idx * 3;
      const endSec = (idx + 1) * 3;
      const tStart = formatSecondsToTimestamp(startSec);
      const tEnd = formatSecondsToTimestamp(endSec);

      shotSequence += `[Shot ${win.windowNumber}] (${tStart}–${tEnd}) ${win.prompt || state.rawConcept || 'Dynamic sequence'}. Camera: ${win.cameraTrajectory || state.cameraMotion || 'Cinematic Motion'}. Continuity: ${win.continuityNote || 'Seamless flow'}.\n`;

      if (win.dialogue) {
        shotSequence += `\n${win.dialogue}\n`;
      }
      if (win.sfxImpact) {
        shotSequence += `\n${win.sfxImpact}\n`;
      }
      shotSequence += `\n`;
    });

    // Final Title Card / Abspann Shot
    const finalStart = formatSecondsToTimestamp(totalSeconds);
    const finalEnd = formatSecondsToTimestamp(totalSeconds + 2.0);
    shotSequence += `[Shot Final / Title Card Abspann] (${finalStart}–${finalEnd})\n`;
    shotSequence += `Hard cut to pitch black canvas. High-contrast bold glowing metallic theatrical title card emerges: "${titleText.toUpperCase()}".\n`;
    shotSequence += `Narrator: "${titleText.toUpperCase()}."\n`;
    shotSequence += `Final deep sub-bass trailer impact.`;
  } else {
    // Single shot mode
    const tStart = formatSecondsToTimestamp(0);
    const tEnd = formatSecondsToTimestamp(totalSeconds);

    shotSequence += `[Shot 1] (${tStart}–${tEnd}) ${state.rawConcept || 'Cinematic scene sequence'}.`;
    if (state.cameraMotion) shotSequence += ` Camera: ${state.cameraMotion}.`;
    if (state.lighting) shotSequence += ` Lighting: ${state.lighting}.`;
    if (state.lensStyle) shotSequence += ` Lens: ${state.lensStyle}.`;
    if (state.motionSpeed) shotSequence += ` Motion: ${state.motionSpeed}.`;

    if (wardrobeParts.length > 0) {
      shotSequence += ` Wardrobe: wearing ${wardrobeParts.join(', ')}.`;
    }

    if (state.characterPersonaDescription) {
      shotSequence += ` Protagonist persona: ${state.characterPersonaDescription}.`;
    }

    if (state.dialogueLines) {
      shotSequence += `\n\n${state.dialogueLines}`;
    }

    shotSequence += `\n\n[Title Card / Abspann]\n`;
    shotSequence += `Hard cut to black canvas. Bold glowing theatrical title card emerges: "${titleText.toUpperCase()}".\n`;
    shotSequence += `Narrator: "${titleText.toUpperCase()}."\n`;
    shotSequence += `Final deep trailer impact.`;
  }

  return `${header}\n\n${styleTone}${refPicturesBlock}\n\n${audioDesign}\n\n${shotSequence}`.trim();
}

/** Legacy alias for backwards compatibility */
export function compileDirectMiniMaxPrompt(state: PromptBuildState): string {
  return compileCleanVisualVideoPrompt(state);
}

/**
 * 🏷️ Dynamically extracts and formats an epic theatrical movie title from a template name or title.
 */
export function extractEpicMovieTitle(rawTitle: string): string {
  // Strip parentheses and common tags
  let title = rawTitle
    .replace(/\(.*?\)/g, '') // remove parentheses text like "(Traditional Neapolitan Pizzeria)"
    .replace(/\[.*?\]/g, '') // remove brackets
    .split(':')[0]          // split by colon to get first part if any
    .trim();

  // If too long, grab the first 3-4 words, or keep it if it fits
  if (title.length > 40) {
    title = title.split(' ').slice(0, 4).join(' ');
  }

  // Remove trailing dashes/commas/spaces
  title = title.replace(/[-,\s]+$/g, '').trim();

  return title.toUpperCase() || 'THE LAST LIGHTHOUSE';
}

/**
 * 🗣️ Generates an immersive, genre-aligned dialogue template if none is provided.
 */
/**
 * 🗣️ Generates an immersive, genre-aligned dialogue template with high variance.
 * Uses a stable string hash to ensure each preset gets a unique, fitting dialogue line!
 */
export function getDialogueFallbackForCategory(category: string, title: string): string {
  const cat = (category || '').toLowerCase();
  
  // Stable string hash to pick a deterministic line based on the template title
  let hash = 0;
  const hashKey = title || 'fallback';
  for (let i = 0; i < hashKey.length; i++) {
    hash = (hash << 5) - hash + hashKey.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash);

  const dialogMap: Record<string, string[]> = {
    horror: [
      'She whispers in fear: "Don\'t close your eyes... it wants us to look."',
      'A child\'s voice echoes: "If you don\'t answer, it will crawl under the floorboards."',
      'He gasps for air: "The door is wide open, but the hallway... it doesn\'t end anymore."',
      'An ancient, cracked voice mutters: "We are not alone in this skin. Something else is looking out."',
      'She whimpers from the dark: "I can hear it breathing. It\'s coming from inside the fireplace."',
      'He whispers: "If you make a sound, it remembers. It always remembers."'
    ],
    sitcom: [
      'Main Character yells: "Wait, you told them we were hosting Thanksgiving?!"',
      'Sidekick sighs: "If we don\'t return the tiger before his shift ends, we are history!"',
      'Neighbour laughs: "Well, that\'s the last time I try to fix a washing machine with peanut butter!"',
      'Father shrugs: "Of course I paid the electricity bill... I just did it in Monopoly money."',
      'Mother rolls her eyes: "I told you three times, the dog didn\'t eat your keys, he\'s wearing them!"',
      'Wacky Uncle grunts: "Who wants deep-fried pizza? The smoke detector is just a timer anyway!"'
    ],
    scify: [
      'Commander whispers: "The signal isn\'t coming from the galaxy. It\'s coming from underneath our ship."',
      'AI terminal hums: "Oxygen levels are nominal, but Captain... who is that standing behind you?"',
      'Pilot screams: "The jumpgate is collapsing! Engage the hyperdrive thrusters, now!"',
      'Scientist whispers: "We touched the edge of the dark universe. And something touched us back."',
      'Android clicks: "My emotional chip is malfunctioning. I feel... absolute dread."',
      'Officer mutters: "Three lightyears from home, and the stars just went black."'
    ],
    bau: [
      'Chief builder: "Measure twice, cut once. This steel has to hold the weight of fifty stories."',
      'Welder grunts: "The sparks are flying, but this column is solid. Built to survive a century."',
      'Supervisor barks: "We are twelve hours behind and the storm is moving in! Keep those cranes rolling!"',
      'Crane Operator: "The wind is picking up, boss. This load is starting to dance up here."',
      'Architect warns: "If that foundation shifts even two millimeters, the entire glass facade will shatter."'
    ],
    immobilien: [
      'Architect whispers: "The concrete captures the shadow, but the glass captures the soul."',
      'Broker grunts: "This isn\'t just a house. It\'s a modern fortress of absolute isolation and design."',
      'Designer: "When the evening light enters at a twenty-degree angle, the marble speaks."',
      'Lobby Concierge whispers: "Every penthouse here has a secret. Some secrets have balconies."',
      'Investor smiles: "Location is a lie. We don\'t sell ground, we sell the sky."'
    ],
    restaurant: [
      'Chef whispers: "Cooking is not an art. It is a memory. Salt, smoke, and ninety seconds."',
      'Patissier whispers: "The caramel must be dark as obsidian, hot as magma, sweet as sin."',
      'Sommelier notes: "This vintage was bottled during the great frost of 1994. Taste the struggle."',
      'Sous Chef screams: "The soufflé is falling! Clear the pass, right now!"',
      'Gourmet critic whispers: "A single drop of this truffle glaze is enough to ruin a career or start an empire."'
    ],
    cyberpunk: [
      'Netrunner whispers: "Booting cerebral mainframe... They sold our lives, but they forgot to wipe the backups."',
      'Fixer grunts: "In this city, the only thing cheaper than bytes is organic blood."',
      'Mercenary growls: "Chrome don\'t bleed, kid. Keep your finger on the trigger."',
      'Street Doc whispers: "This cybernetic eye isn\'t custom. It still streams to the corporate servers."',
      'Decker laughs: "The police grid is down for sixty seconds. Make every nanosecond count."'
    ],
    fashion: [
      'Designer: "Simplicity is not a choice. It is the ultimate expression of rebellion."',
      'Model whispers: "Do not look at the silk. Look at the raw intent behind my gaze."',
      'Sensual voice whispers: "Our skin remembers what the mind is desperately trying to forget."',
      'Intimate whisper: "Closer... let the candle warmth dissolve the remaining distance."',
      'Passionate growl: "In this shadow play, the clothing is merely an elegant obstacle."',
      'Stylist gasps: "The lace is pure liquid silver under these strobe lights."'
    ],
    action: [
      'Protagonist whispers: "There is no backup. It\'s just you, me, and three seconds to jump."',
      'Officer screams: "Brace for impact! The brakes are gone!"',
      'Anti-Hero laughs: "You wanted a war. I just brought the matches."',
      'Special Agent: "If they cross that bridge, the asset is lost forever. Take the shot."',
      'Driver grunts: "In this race, coming second means you don\'t get to wake up tomorrow."'
    ],
    fantasy: [
      'High Sorcerer: "The ancient seals of the starkeepers are cracking. The fire returns."',
      'Elven archer whispers: "The forest is silent. That means the shadow-walkers have crossed the river."',
      'Dragonlord bellows: "The throne was forged in dragonfire, and to fire it shall return!"',
      'Witch whispers: "The blood-moon demands a price. Give me your shadow, and I will give you vengeance."',
      'Knight grunts: "Our swords are steel, but the beasts we face are made of nightmares."'
    ],
    nature: [
      'Erzähler: "Here, in the endless ice, silence is the only language left."',
      'Forest ranger whispers: "When the fog rolls in like this, the mountains reclaim their secrets."',
      'Deep voice: "Born from dust, shaped by oceans, standing eternal."',
      'Biologist whispers: "The canopy is alive. It listens to our footsteps and warns the roots."',
      'Climber gasps: "At this altitude, you don\'t conquer the summit. You only pray it tolerates you."'
    ]
  };

  // Find a category array
  let lines = dialogMap.nature; // default
  for (const key of Object.keys(dialogMap)) {
    if (cat.includes(key)) {
      lines = dialogMap[key];
      break;
    }
  }

  // Deterministically select line based on index
  const selectedLine = lines[idx % lines.length];
  return selectedLine;
}

