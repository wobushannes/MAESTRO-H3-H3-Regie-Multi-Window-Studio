import { PromptBuildState, StyleCategory } from '../types';

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
    ],
    comic: [
      'Detective: "This city doesn\'t sleep. It just bleeds in black and white."',
      'Masked Vigilante: "The storm didn\'t bring me here. I brought the storm."',
      'Desert Nomad: "The sands remember the kings that the stars have long forgotten."',
      'Shadow Monarch: "Arise... and claim your rightful place in the dark domain."',
      'Antihero: "Heaven wants me dead, Hell wants my soul. They\'re both going to be disappointed."',
      'Pilot: "All thrusters green. Launching straight into the front line!"',
      'Adventurer: "Great snakes! The secret inscription leads behind the waterfall!"'
    ],
    war: [
      'Combat Medic: "Stay with me, look at my eyes! Tourniquet is locked, you\'re going home!"',
      'Squad Leader: "Suppress that tree line! Move the litter now, get him in the hatch!"',
      'Drone Pilot whispers: "Target acquired at grid point four-niner. Bird is locked on trajectory."',
      'Pointman: "Clear left. Stacking on door two, breach on three!"',
      'Exhausted Soldier (whispering): "The ringing never stops... even when the snow covers the artillery."',
      'Surgeon: "Clamp that bleeder! Start the third bag of plasma, we are not losing him today!"',
      'Spotter: "Wind left to right, four meters per second. Hold two mils high... take him on your exhale."',
      'Gun Captain: "Battery, five rounds rapid fire! Pull lanyard, FIRE!"'
    ],
    politics: [
      'Candidate: "Tonight, we don\'t just turn the page. We write an entirely new chapter for this nation!"',
      'Debater: "My opponent wants to talk about yesterday\'s polls. I am here to talk about tomorrow\'s families."',
      'Chief Strategist: "In this town, laws are what we write after we\'ve already decided who survives."',
      'Campaign Manager: "They just called Ohio! We did it... WE WON THE PRESIDENCY!"',
      'Reporter (shouting): "Governor, did you sign the off-shore transfer? The public deserves the truth!"',
      'Secret Service Agent: "Eagle is rolling. Sector four clear, speed twenty-five to the South Gate."',
      'Senator (low voice): "You have sixty seconds to accept this compromise, or we leak the transcripts at sunrise."'
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

/**
 * 🎙️ Dynamically determines the perfect cinematic narrator voice for any category or title theme.
 */
export function getNarratorVoiceFallbackForCategory(category: StyleCategory | string, title?: string): string {
  const cat = (category || '').toLowerCase();
  const t = (title || '').toLowerCase();

  // Fine-grained thematic overrides based on title/keywords
  if (t.includes('mist') || t.includes('whisper') || t.includes('child') || t.includes('doll') || t.includes('nurse') || t.includes('silent hill')) {
    return 'Soft whispering female voice, intimate close-up microphone, breathy and haunting ASMR delivery with slight echoing resonance';
  }
  if (t.includes('innsmouth') || t.includes('lovecraft') || t.includes('dagon') || t.includes('cthulhu') || t.includes('1920') || t.includes('radio')) {
    return 'Vintage 1940s radio broadcast announcer, crackling low-fidelity filters, retro tube microphone distortion, and transatlantic accent';
  }
  if (t.includes('western') || t.includes('cowboy') || t.includes('desert') || t.includes('saloon')) {
    return 'Grit-heavy, weather-beaten old cowboy voice, dry, gravelly, slow and highly deliberate storytelling cadence';
  }
  if (t.includes('cyborg') || t.includes('android') || t.includes('ai ') || t.includes('robot') || t.includes('synth') || t.includes('drone')) {
    return 'Cold monotone robotic synthesized artificial intelligence voice with subtle ring-modulation and glitchy digital artifacts';
  }
  if (t.includes('countess') || t.includes('gala') || t.includes('mansion') || t.includes('vampire') || t.includes('opera')) {
    return 'Elegant high-society mature female voice, refined British Received Pronunciation (RP) accent, theatrical, sharp, and highly sophisticated';
  }

  // Category based matching
  switch (cat) {
    case 'war':
      return 'Deep battle-hardened military veteran voice, gritty baritone with urgent tactical cadence and heavy theatrical gravitas';
    case 'politics':
      return 'Authoritative presidential broadcast narrator, crisp transatlantic diction, commanding gravitas and theatrical presence';
    case 'horror':
      return 'Deep cinematic male narrator with gravelly resonance, slow sinister cadence, and unsettling theatrical gravitas';
    case 'scify':
      return 'Cold monotone cybernetic AI voice with subtle ring-modulation, deep sub-harmonic resonance, and cosmic detachment';
    case 'action':
      return 'High-octane energetic blockbuster trailer narrator with punchy cadence, gritty baritone, and explosive intensity';
    case 'fantasy':
      return 'Epic mythical lorekeeper with ancient Celtic gravitas, rich baritone, and slow poetic cadence';
    case 'cyberpunk':
      return 'Moody neo-noir synth detective with cynical gravelly delivery, rain-slicked cadence, and melancholic depth';
    case 'sitcom':
      return 'Enthusiastic 90s television studio announcer with upbeat punchy rhythm, warm analog tone, and comedic flair';
    case 'nature':
      return 'Calm Nordic nature documentary narrator with melodic pacing, breathy warmth, and reverent atmospheric tone';
    case 'comic':
      return 'Theatrical classic comic book serial narrator, punchy, dramatic and bold 1960s superhero cadence';
    case 'bau':
      return 'Gruff, grounded master craftsman voice with authentic resonance, dry wit, and hearty confidence';
    case 'immobilien':
      return 'Sophisticated luxury architectural narrator with velvety smooth articulation, warm confidence, and serene elegance';
    case 'restaurant':
      return 'Passionate Michelin-star culinary presenter with warm sensory descriptions, velvety cadence, and French-gourmet nuance';
    case 'fashion':
      return 'Avant-garde haute couture narrator with French-accented whisper, breathy pacing, and seductive elegance';
    default:
      return 'Deep cinematic male narrator with gravelly resonance, slow cinematic cadence, and massive theatrical gravitas';
  }
}

