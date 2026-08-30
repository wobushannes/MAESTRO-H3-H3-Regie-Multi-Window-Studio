import { PromptBuildState, StyleCategory, PresetTemplate, MaestroWindow, ReferenceImage, PersonCountType } from '../types';
import { getCategoryPovDefaults } from './povCategoryDefaults';
import { applyAnalogEngineToPrompt } from './analogMasterEngine';
import { applyCommercialPresetToPrompt, COMMERCIAL_MASTER_PRESETS } from './commercialMasterEngine';

export function getCategoryLabel(category?: string): string {
  const cat = (category || '').toLowerCase();
  switch (cat) {
    case 'grill_aussenkueche':
    case 'grill':
    case 'outdoor_kitchen':
      return '🔥 Grill & Außenküche (Luxus & High-End)';
    case 'gastro':
      return '🍷 Gastro & Restaurant-Atmosphäre';
    case 'food':
      return '🍽️ Gourmet Food & Kulinarik';
    case 'inneneinrichtung':
      return '🛋️ Inneneinrichtung & Interior Design';
    case 'birthday':
    case 'geburtstag':
      return '🎂 Geburtstag, Jubiläum & Ständchen-Party';
    case 'immobilien':
    case 'immo':
      return '🏢 Immobilien, Architektur & Grundriss';
    case 'bau':
    case 'handwerk':
      return '🏗️ Bau, Handwerk & Industrial';
    case 'restaurant':
    case 'gourmet':
      return '🍽️ Gourmet, Restaurant & Kulinarik';
    case 'fashion':
      return '👗 Fashion, Haute Couture & Stil';
    case 'lingerie':
      return '✨ Haute Lingerie (SW Studio)';
    case 'scify':
    case 'scifi':
      return '🚀 Sci-Fi, Weltall & Futuristisch';
    case 'cyberpunk':
      return '🌆 Cyberpunk & Neo-Noir';
    case 'horror':
      return '👻 Horror & Mystery Thriller';
    case 'erotik':
      return '💋 Sinnlich, Erotik & Boudoir';
    case 'sitcom':
    case 'comedy':
      return '📺 Sitcom & Comedy';
    case 'action':
      return '⚡ Action & Blockbuster';
    case 'fantasy':
      return '🧙‍♂️ Dark Fantasy & Mythos';
    case 'nature':
      return '🌲 Natur, Outdoor & Abenteuer';
    case 'comic':
      return '✏️ Comic, Manga & Strichmännchen';
    case 'war':
      return '⚔️ Kriegsfilm, Militär & Tactical';
    case 'politics':
      return '🏛️ Politik, Debatte & Wahlkampf';
    case 'travel':
      return '✈️ Tourismus, Reise & VLOG';
    case 'immersive':
      return '🥽 Immersive Ego-POV & Bodycam';
    default:
      return category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Standard Cinema';
  }
}

export function getCategoryLabelEn(category?: string): string {
  const cat = (category || '').toLowerCase();
  switch (cat) {
    case 'grill_aussenkueche':
    case 'grill':
    case 'outdoor_kitchen':
      return 'Grill & Outdoor Kitchen (Luxury & High-End)';
    case 'gastro':
      return 'Gastro, Fine Dining & Restaurant Atmosphere';
    case 'food':
      return 'Gourmet Food & Culinary Excellence';
    case 'inneneinrichtung':
      return 'Interior Design & Architecture';
    case 'birthday':
    case 'geburtstag':
      return 'Birthday, Anniversary & Serenade Party';
    case 'immobilien':
    case 'immo':
      return 'Real Estate, Architecture & Floorplan';
    case 'bau':
    case 'handwerk':
      return 'Construction, Craftsmanship & Industrial';
    case 'restaurant':
    case 'gourmet':
      return 'Gourmet, Restaurant & Culinary';
    case 'fashion':
      return 'Fashion & High-End Style';
    case 'lingerie':
      return 'Haute Lingerie & Black/White Studio';
    case 'scify':
    case 'scifi':
      return 'Sci-Fi, Space & Futuristic';
    case 'cyberpunk':
      return 'Cyberpunk & Neo-Noir';
    case 'horror':
      return 'Horror & Mystery Thriller';
    case 'erotik':
      return 'Sensual, Erotic & Boudoir';
    case 'sitcom':
    case 'comedy':
      return 'Sitcom & Comedy';
    case 'action':
      return 'Action & Blockbuster';
    case 'fantasy':
      return 'Dark Fantasy & Mythos';
    case 'nature':
      return 'Nature, Outdoor & Adventure';
    case 'comic':
      return 'Comic, Manga & Sketchbook';
    case 'war':
      return 'War, Military & Tactical';
    case 'politics':
      return 'Politics, Debate & Election Campaign';
    case 'travel':
      return 'Tourism, Travel & VLOG';
    case 'immersive':
      return 'Immersive POV & First-Person Experience';
    default:
      return category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Standard Cinema';
  }
}

export function getCategoryDefaultTitle(category?: string): string {
  const cat = (category || '').toLowerCase();
  switch (cat) {
    case 'gastro':
      return 'FUNK ROYAL FINE DINING';
    case 'grill_aussenkueche':
    case 'grill':
    case 'outdoor_kitchen':
      return 'FLAMMKRAFT OUTDOOR LIVING';
    case 'food':
    case 'restaurant':
    case 'gourmet':
      return 'GOURMET CULINARY ART';
    case 'immobilien':
    case 'immo':
      return 'GENESIS LUXURY RESIDENCE';
    case 'bau':
    case 'handwerk':
      return 'INDUSTRIAL CRAFTSMANSHIP';
    case 'inneneinrichtung':
      return 'INTERIOR ARCHITECTURE & DESIGN';
    case 'fashion':
      return 'HAUTE COUTURE ELEGANCE';
    case 'lingerie':
    case 'erotik':
      return 'MONOCHROME SENSUALITY';
    case 'scify':
    case 'scifi':
      return 'NEON FRONTIER 2099';
    case 'cyberpunk':
      return 'CYBERPUNK NEO-NOIR';
    case 'horror':
      return 'THE SHADOW SANATORIUM';
    case 'birthday':
    case 'geburtstag':
      return 'CELEBRATION OF LIFE';
    case 'travel':
      return 'WANDERLUST HORIZONS';
    case 'action':
      return 'OPERATION VANGUARD';
    case 'war':
      return 'TACTICAL FRONTLINE';
    case 'politics':
      return 'THE CAPITOL DEBATE';
    case 'sitcom':
    case 'comedy':
      return 'LIVING ROOM CHRONICLES';
    case 'comic':
      return 'HEROIC GRAPHIC TALE';
    case 'fantasy':
      return 'REALM OF ANCIENT MYTHS';
    case 'nature':
      return 'ETERNAL MOUNTAIN WILDERNESS';
    case 'immersive':
      return 'FIRST-PERSON POV EXPERIENCE';
    default:
      return 'CINEMATIC VISION';
  }
}

export function getCategoryDefaultSoundscape(category?: string): string {
  const cat = (category || '').toLowerCase();
  switch (cat) {
    case 'gastro':
      return 'Elegant classical jazz - soft piano, gentle double bass. Layered restaurant ambience: distant muted chatter, wine pouring into crystal, delicate fork on plate, genuine laughter.';
    case 'grill_aussenkueche':
    case 'grill':
    case 'outdoor_kitchen':
      return 'Sizzling steak on 900°C cast-iron grate, crackling hardwood ember sparks, gentle evening terrace breeze, ice clinking in whiskey tumbler.';
    case 'food':
    case 'restaurant':
    case 'gourmet':
      return 'High-heat pan searing, sharp knife chopping rhythm on wooden block, wine glass toast clink, soft acoustic bistro piano in background.';
    case 'immobilien':
    case 'immo':
      return 'Subtle modern acoustic piano motif, gentle ambient breeze through sliding glass doors, distant water feature fountain splash, serene luxury atmosphere.';
    case 'bau':
    case 'handwerk':
      return 'Industrial rhythm, laser beam humming, heavy metallic gear locks, distant construction site ambient echo, welding spark sizzle.';
    case 'inneneinrichtung':
      return 'Warm acoustic ambient swell, subtle hardwood footstep echo, soft linen fabric rustle, calming architectural spatial tone.';
    case 'fashion':
      return 'Minimal deep electronic pulse, silk fabric rustle, camera shutter clicks, chic high-fashion studio ambient atmosphere.';
    case 'lingerie':
    case 'erotik':
      return 'Intimate breath close-mic presence, low ambient bass warmth, soft silk sheet rustle, subtle flickering candle hiss.';
    case 'scify':
    case 'scifi':
      return 'Deep analog synth hum, neon tube buzz, rain on metallic walkway, futuristic telemetry beeps, atmospheric space drone.';
    case 'cyberpunk':
      return 'Neo-noir synthwave pulse, heavy rain on asphalt, neon tube ignition hum, distant flying vehicle turbine swoosh.';
    case 'horror':
      return 'Eerie low frequency drone, distant timber creak, flickering candle hiss, cold wind howl, subtle unsettling whisper.';
    case 'birthday':
    case 'geburtstag':
      return 'Warm acoustic guitar strumming, sparkling birthday candle sparks, cheerful laughter, champagne cork pop, acoustic celebration harmony.';
    case 'travel':
      return 'Upbeat acoustic indie ukulele, ocean waves washing ashore, gentle tropical breeze, distant sea bird calls.';
    case 'action':
      return 'Low string pulse, thunderous sub-bass trailer impacts, metallic weapon handling, high-speed engine roar, explosive momentum.';
    case 'war':
      return 'Distant artillery thuds, radio static squelch, metallic rifle bolt rack, wind blowing over snowy trench, tense low strings.';
    case 'politics':
      return 'Subtle orchestral snare drum roll, camera flash shutter burst array, murmuring assembly hall reverberation.';
    case 'sitcom':
    case 'comedy':
      return 'Upbeat 90s funky bass slap line, studio audience chuckles, coffee cup clink, light energetic brass stabs.';
    case 'comic':
      return 'Dynamic orchestral brass accents, comic book swoosh impacts, energetic cartoon sound effects, heroic cymbal swell.';
    case 'fantasy':
      return 'Ancient Celtic harp melody, forest wind, crackling campfire, distant dragon roar echoing over misty mountains.';
    case 'nature':
      return 'Pine breeze through forest canopy, distant mountain river rush, subtle songbird calls, natural wilderness solitude.';
    case 'immersive':
      return 'Rhythmic close-mic breathing, tactile footstep crunches on terrain, cloth movement, 3D spatial acoustic presence.';
    default:
      return 'Atmospheric ambient swell, low isolated piano note, gentle string textures, subtle cinematic room tone.';
  }
}

export function getCategoryDefaultReferences(category?: string, personCount?: PersonCountType): ReferenceImage[] {
  const result = getCategoryDefaultReferencesRaw(category, personCount);
  const pCount = personCount || '1_person';
  if (pCount === '1_person') {
    return result.slice(0, 1);
  } else if (pCount === '2_person') {
    return result.slice(0, 2);
  }
  return result;
}

function getCategoryDefaultReferencesRaw(category?: string, personCount?: PersonCountType): ReferenceImage[] {
  const cat = (category || '').toLowerCase();
  const pCount = personCount || '1_person';

  // 1. BIRTHDAY
  if (cat.includes('birthday') || cat.includes('geburtstag')) {
    if (pCount === '1_person') {
      return [
        { id: 'ref-bday-solo-1', tag: 'picture 1', label: 'Jubilar (picture 1)', role: 'subject', url: 'https://images.unsplash.com/photo-1464347601390-25e2842aae8f?auto=format&fit=crop&w=600&q=80', description: 'Beaming birthday celebrant blowing out sparkling candles on a cake' },
        { id: 'ref-bday-solo-2', tag: 'picture 2', label: 'Geburtstagstorte (picture 2)', role: 'style', url: 'https://images.unsplash.com/photo-1533227268222-758293d95ebc?auto=format&fit=crop&w=600&q=80', description: 'Up-close shot of a multi-tiered birthday cake with glowing sparklers' },
        { id: 'ref-bday-solo-3', tag: 'picture 3', label: 'Chalet / Raum (picture 3)', role: 'location', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80', description: 'Cozy alpine timber chalet interior filled with warm evening candle glow' },
        { id: 'ref-bday-solo-4', tag: 'picture 4', label: 'Optische Lichtstimmung (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?auto=format&fit=crop&w=600&q=80', description: 'Warm golden ambient light with organic lens flare reflections' },
      ];
    } else if (pCount === '2_person') {
      return [
        { id: 'ref-bday-duo-1', tag: 'picture 1', label: 'Geburtstagskind (picture 1)', role: 'subject', url: 'https://images.unsplash.com/photo-1464347601390-25e2842aae8f?auto=format&fit=crop&w=600&q=80', description: 'Beaming birthday celebrant blowing out sparkling candles on a cake' },
        { id: 'ref-bday-duo-2', tag: 'picture 2', label: 'Bester Freund / Partner (picture 2)', role: 'character', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', description: 'Smiling best friend wearing a festive cone party hat cheering' },
        { id: 'ref-bday-duo-3', tag: 'picture 3', label: 'Geschenk-Übergabe (picture 3)', role: 'style', url: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=600&q=80', description: 'Over-the-shoulder view of a beautifully wrapped glossy gold gift box' },
        { id: 'ref-bday-duo-4', tag: 'picture 4', label: 'Festlicher Hintergrund (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1533227268222-758293d95ebc?auto=format&fit=crop&w=600&q=80', description: 'Warm golden party lighting, floating balloons, and sparkling tinsel' },
      ];
    } else {
      return [
        { id: 'ref-bday-1', tag: 'picture 1', label: 'Geburtstagskind (picture 1)', role: 'subject', url: 'https://images.unsplash.com/photo-1464347601390-25e2842aae8f?auto=format&fit=crop&w=600&q=80', description: 'Birthday star facial anchor seated at candlelit cake table' },
        { id: 'ref-bday-2', tag: 'picture 2', label: 'Musiker & Sänger (Lead) (picture 2)', role: 'character', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', description: 'Lead singing performer/musician leaning into camera lens' },
        { id: 'ref-bday-3', tag: 'picture 3', label: 'Chor & Begleit-Ensemble (picture 3)', role: 'character', url: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=600&q=80', description: 'Backing band/ensemble serenading in polyphonic harmony' },
        { id: 'ref-bday-4', tag: 'picture 4', label: 'Party-Torte & Kulisse (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1533227268222-758293d95ebc?auto=format&fit=crop&w=600&q=80', description: 'Sparkler candles, festive decor, and celebration table setting' },
      ];
    }
  }

  // 2. IMMOBILIEN
  if (cat.includes('grill') || cat.includes('aussenkueche') || cat.includes('outdoor_kitchen')) {
    if (pCount === '1_person') {
      return [
        { id: 'ref-grill-solo-1', tag: 'picture 1', label: 'Grill-Chef / Pitmaster (picture 1)', role: 'subject', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', description: 'Focused outdoor chef or pitmaster with leather apron at luxury grill' },
        { id: 'ref-grill-solo-2', tag: 'picture 2', label: 'Edelstahl-Außenküche (picture 2)', role: 'location', url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80', description: 'Luxury stainless steel outdoor kitchen patio with ambient LED lighting' },
        { id: 'ref-grill-solo-3', tag: 'picture 3', label: 'Glut & Zischendes Steak (picture 3)', role: 'style', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', description: 'Extreme slow-motion sizzle on 900°C cast-iron grate with rising herb smoke' },
        { id: 'ref-grill-solo-4', tag: 'picture 4', label: 'Licht & Abendstimmung (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?auto=format&fit=crop&w=600&q=80', description: 'Golden hour sunset rim lighting with warm fire sparks and torch light' },
      ];
    } else {
      return [
        { id: 'ref-grill-1', tag: 'picture 1', label: 'Grill-Chef & Gastgeber (picture 1)', role: 'subject', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', description: 'Host and master grill chef basting meat at the outdoor island' },
        { id: 'ref-grill-2', tag: 'picture 2', label: 'Außenküchen-Architektur (picture 2)', role: 'location', url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80', description: 'Custom HPL & stainless steel outdoor kitchen on stone terrace with pool' },
        { id: 'ref-grill-3', tag: 'picture 3', label: 'Gäste & Lounge-Bar (picture 3)', role: 'character', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', description: 'Guests toasting at the integrated beer tap and teakwood bar counter' },
        { id: 'ref-grill-4', tag: 'picture 4', label: 'Foodporn Tranchieren (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', description: 'Juicy carved Dry-Aged Porterhouse slices with Maldon sea salt on wood block' },
      ];
    }
  }

  // 2. IMMOBILIEN
  if (cat.includes('immobilien') || cat.includes('immo')) {
    if (pCount === '1_person') {
      return [
        { id: 'ref-immo-solo-1', tag: 'picture 1', label: 'Villa & Fassade (picture 1)', role: 'location', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', description: 'Stunning modern luxury villa with glass facade during golden hour' },
        { id: 'ref-immo-solo-2', tag: 'picture 2', label: 'Wohnbereich Innen (picture 2)', role: 'style', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80', description: 'Sleek luxury living room interior with oak and marble design' },
        { id: 'ref-immo-solo-3', tag: 'picture 3', label: 'Architektur-Detail (picture 3)', role: 'style', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80', description: 'Minimalist geometric staircase and concrete textures' },
        { id: 'ref-immo-solo-4', tag: 'picture 4', label: 'Beleuchtung / Dämmerung (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80', description: 'Warm sunset ambient lighting highlighting pristine structures' },
      ];
    } else {
      return [
        { id: 'ref-immo-1', tag: 'picture 1', label: 'Haus & Fassade (picture 1)', role: 'location', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', description: 'Exterior architectural facade / villa property anchor' },
        { id: 'ref-immo-2', tag: 'picture 2', label: 'Grundriss & Bauplan (picture 2)', role: 'style', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80', description: 'Architectural 2D/3D floor plan layout blueprint' },
        { id: 'ref-immo-3', tag: 'picture 3', label: 'Makler / Presenter (picture 3)', role: 'character', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80', description: 'Real estate agent / presenter walking through space' },
        { id: 'ref-immo-4', tag: 'picture 4', label: 'Innenraum & Luxus-Stil (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80', description: 'Interior luxury materials, lighting, and furniture design' },
      ];
    }
  }

  // 3. BAU & HANDWERK
  if (cat.includes('bau') || cat.includes('handwerk')) {
    if (pCount === '1_person') {
      return [
        { id: 'ref-bau-solo-1', tag: 'picture 1', label: 'Handwerker / Meister (picture 1)', role: 'subject', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', description: 'Master craftsman in protective helmet and orange high-vis gear' },
        { id: 'ref-bau-solo-2', tag: 'picture 2', label: 'Struktur / Stahl (picture 2)', role: 'style', url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80', description: 'Welding sparks and reinforced steel beams close-up' },
        { id: 'ref-bau-solo-3', tag: 'picture 3', label: 'Baustelle (picture 3)', role: 'location', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80', description: 'Towering cranes and unfinished raw concrete structure' },
        { id: 'ref-bau-solo-4', tag: 'picture 4', label: 'Laser-Vermessung (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', description: 'Rays of red laser leveling beams on raw concrete textures' },
      ];
    } else {
      return [
        { id: 'ref-bau-1', tag: 'picture 1', label: 'Bauobjekt & Fassade (picture 1)', role: 'location', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80', description: 'Exterior construction site / building structure anchor' },
        { id: 'ref-bau-2', tag: 'picture 2', label: 'Bauplan & CAD (picture 2)', role: 'style', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', description: 'Architectural blueprint / 3D laser measurement scheme' },
        { id: 'ref-bau-3', tag: 'picture 3', label: 'Handwerker / Meister (picture 3)', role: 'character', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', description: 'Master craftsman in helmet and safety gear' },
        { id: 'ref-bau-4', tag: 'picture 4', label: 'Material & Finish (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80', description: 'Concrete, steel, and high-end surface finish' },
      ];
    }
  }

  // 4. HORROR
  if (cat.includes('horror')) {
    if (pCount === '1_person') {
      return [
        { id: 'ref-horror-solo-1', tag: 'picture 1', label: 'Einsamer Ermittler (picture 1)', role: 'subject', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80', description: 'Grizzled investigator exploring in weathered wool trenchcoat with lantern' },
        { id: 'ref-horror-solo-2', tag: 'picture 2', label: 'Leuchtturm / Wald (picture 2)', role: 'location', url: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80', description: 'Abandoned coastal lighthouse surrounded by dense dark mist' },
        { id: 'ref-horror-solo-3', tag: 'picture 3', label: 'Chiaroscuro-Schatten (picture 3)', role: 'style', url: 'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?auto=format&fit=crop&w=600&q=80', description: 'Deep cinematic shadow silhouettes with high-contrast candlelight highlights' },
        { id: 'ref-horror-solo-4', tag: 'picture 4', label: 'Uraltes Notizbuch (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80', description: 'Close-up of old leather-bound journal filled with strange runic sketches' },
      ];
    } else if (pCount === '2_person') {
      return [
        { id: 'ref-horror-duo-1', tag: 'picture 1', label: 'Befallenes Opfer (picture 1)', role: 'subject', url: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80', description: 'Possessed young woman with glossy white eyes and pale skin' },
        { id: 'ref-horror-duo-2', tag: 'picture 2', label: 'Mutige Schwester (picture 2)', role: 'character', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', description: 'Terrified older sister holding a flickering silver oil lamp' },
        { id: 'ref-horror-duo-3', tag: 'picture 3', label: 'Eindringliche Szenerie (picture 3)', role: 'location', url: 'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?auto=format&fit=crop&w=600&q=80', description: 'Dark, claustrophobic asylum ward corridor filled with dense grey mist' },
        { id: 'ref-horror-duo-4', tag: 'picture 4', label: 'Atmosphärisches Licht (picture 4)', role: 'style', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80', description: 'High-contrast theatrical Chiaroscuro with flashing lightning highlights' },
      ];
    } else {
      return [
        { id: 'ref-horror-1', tag: 'picture 1', label: 'Besessenes Opfer (picture 1)', role: 'subject', url: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=600&q=80', description: 'Levitating possessed protagonist with pitch-black dilated eyes' },
        { id: 'ref-horror-2', tag: 'picture 2', label: 'Exorzist / Priester (picture 2)', role: 'character', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', description: 'Elderly priest holding a heavy iron cross and ancient scripture book' },
        { id: 'ref-horror-3', tag: 'picture 3', label: 'Geisterhafte Gestalt (picture 3)', role: 'character', url: 'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?auto=format&fit=crop&w=600&q=80', description: 'Veiled phantom hovering behind flickering candle wall sconces' },
        { id: 'ref-horror-4', tag: 'picture 4', label: 'Sanatorium-Zelle 304 (picture 4)', role: 'location', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80', description: 'Decayed mental hospital room with barred windows and rusted iron bed' },
      ];
    }
  }

  // Fallback for any other category
  if (pCount === '1_person') {
    return [
      { id: `ref-${cat}-solo-1`, tag: 'picture 1', label: `Protagonist (picture 1)`, role: 'subject', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80', description: `Single solo main character reference for the ${cat.toUpperCase()} sequence` },
      { id: `ref-${cat}-solo-2`, tag: 'picture 2', label: `Kostüm & Naheinstellung (picture 2)`, role: 'style', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', description: `Close-up on outfit details, materials or facial expressions` },
      { id: `ref-${cat}-solo-3`, tag: 'picture 3', label: `Kulisse & Hintergrund (picture 3)`, role: 'location', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80', description: `Atmospheric background environment and camera angle reference` },
      { id: `ref-${cat}-solo-4`, tag: 'picture 4', label: `Licht & Farb-Key (picture 4)`, role: 'style', url: 'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?auto=format&fit=crop&w=600&q=80', description: `Visual styling, contrast, color grading, and shadow tone reference` },
    ];
  } else if (pCount === '2_person') {
    return [
      { id: `ref-${cat}-duo-1`, tag: 'picture 1', label: `Hauptfigur / Lead (picture 1)`, role: 'subject', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80', description: `Lead protagonist actor for the ${cat.toUpperCase()} sequence` },
      { id: `ref-${cat}-duo-2`, tag: 'picture 2', label: `Partner / Co-Star (picture 2)`, role: 'character', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', description: `Co-star/partner reacting or interacting directly` },
      { id: `ref-${cat}-duo-3`, tag: 'picture 3', label: `Interaktions-Fokus (picture 3)`, role: 'style', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', description: `Medium close-up shot focused on character interplay and dynamics` },
      { id: `ref-${cat}-duo-4`, tag: 'picture 4', label: `Stil & Kulisse (picture 4)`, role: 'style', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80', description: `Cinematic backdrop environment and mood lighting` },
    ];
  } else {
    return [
      { id: `ref-${cat}-1`, tag: 'picture 1', label: `Hauptrolle / Lead Actor (picture 1)`, role: 'subject', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80', description: `Main protagonist / Lead actor anchor for the ${cat.toUpperCase()} sequence` },
      { id: `ref-${cat}-2`, tag: 'picture 2', label: `Zweitperson / Co-Star (picture 2)`, role: 'character', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', description: `Secondary supporting character or interacting partner` },
      { id: `ref-${cat}-3`, tag: 'picture 3', label: `Gruppe / Ensemble (picture 3)`, role: 'character', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', description: `Supporting group or background ensemble characters` },
      { id: `ref-${cat}-4`, tag: 'picture 4', label: `Stil & Umgebung (picture 4)`, role: 'style', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80', description: `Key visual aesthetic reference and backdrop styling` },
    ];
  }
}

export function formatSecondsToTimestamp(sec: number): string {
  const mins = Math.floor(sec / 60);
  const remainderSec = Math.floor(sec % 60);
  const ms = Math.floor((sec % 1) * 1000);
  const mm = String(mins).padStart(2, '0');
  const ss = String(remainderSec).padStart(2, '0');
  const mmm = String(ms).padStart(3, '0');
  return `${mm}:${ss}.${mmm}`;
}

export function formatPrecisionTimeRange(windowNumber: number, step: number = 14): string {
  const startSec = (windowNumber - 1) * step;
  const endSec = windowNumber * step;
  return `${formatSecondsToTimestamp(startSec)}–${formatSecondsToTimestamp(endSec)}`;
}

export function ensurePrecisionTimeRange(rawRange: string, windowIdx: number): string {
  const clean = (rawRange || '').trim();
  if (/\d{2}:\d{2}\.\d{3}/.test(clean)) {
    return clean.replace(/\s*-\s*/g, '–');
  }
  const matches = clean.match(/(\d+(?:\.\d+)?)\s*(?:s|sec)?\s*[-–]\s*(\d+(?:\.\d+)?)\s*(?:s|sec)?/i);
  if (matches && matches.length >= 3) {
    const start = parseFloat(matches[1]);
    const end = parseFloat(matches[2]);
    return `${formatSecondsToTimestamp(start)}–${formatSecondsToTimestamp(end)}`;
  }
  return formatPrecisionTimeRange(windowIdx + 1, 14);
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

  // 0a. Category & Person Count Directives
  if (state.category) {
    sentences.push(`Category & Genre: ${getCategoryLabelEn(state.category)}.`);
  }
  let personFilterText = '1 Single Person Solo Focus (picture 1 main anchor, single protagonist focus, no secondary background characters)';
  if (state.personCount === '2_person') {
    personFilterText = '2-Person Duo Focus (picture 1 = lead protagonist, picture 2 = co-star/interacting partner, picture 3-4 = style and scenery)';
  } else if (state.personCount === 'multi_person') {
    personFilterText = 'Multi-Person Focus (picture 1 = lead protagonist, picture 2-4 = co-stars/ensemble/group)';
  }
  sentences.push(`Person Filter Setup: ${personFilterText}.`);



  // 0b. Synchronized Reference Image Filtering & Visual Anchors
  let activeRefs = state.referenceImages;
  if (!activeRefs || activeRefs.length === 0) {
    const defaultRefs = getCategoryDefaultReferences(state.category, state.personCount);
    if (defaultRefs.length > 0) {
      activeRefs = defaultRefs;
    }
  }

  if (activeRefs && activeRefs.length > 0) {
    const refAnchors = activeRefs.map((ref, idx) => {
      const tag = ref.tag || `picture ${idx + 1}`;
      return `${tag}: ${ref.label || ref.description} [${ref.role || 'anchor'}]`;
    });
    sentences.push(`Visual Reference Anchors: ${refAnchors.join(' | ')}.`);
  }

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

  const rawResult = sentences.join(' ');
  const refCount = activeRefs ? activeRefs.length : 0;
  const adjusted = adjustPictureReferencesInText(rawResult, refCount);
  const analogPrompt = applyAnalogEngineToPrompt(adjusted, state.analogPresetId);
  return applyCommercialPresetToPrompt(
    analogPrompt,
    state.commercialPresetId,
    state.commercialClaim,
    state.commercialBrandName,
    state.commercialCallToAction,
    state.commercialOutroStyle,
    state.commercialOutroAnimation,
    state.spatialTextOverlayEnabled,
    state.spatialTextPosition,
    state.spatialTextContent
  );
}

/**
 * 💻 Local Model / Pipeline Export Format
 * Formats prompt into the exact 3-block structure for local video/audio generation pipelines (e.g., Wan 2.1, LTX-Video, HunyuanVideo, ComfyUI):
 * - integrated_multimodal_description
 * - overall_soundscape
 * - non_diegetic_music
 */
export function compileLocalPipelinePrompt(state: PromptBuildState): string {
  const cleanVideo = compileCleanVisualVideoPrompt(state);
  
  const isPovActive =
    Boolean(state.isImmersivePov) ||
    Boolean(state.cameraMotion && /first-person|ego-perspektive|pov|head-bob/i.test(state.cameraMotion));

  let soundscapeText = '';
  if (state.audioCue) {
    soundscapeText = state.audioCue.replace(/^\[Audio:\s*/i, '').replace(/\]$/, '');
  } else if (isPovActive) {
    soundscapeText = 'Rhythmic audible breathing and frosty exhalations, crisp footstep crunches on surface, tactile cloth rustles, ambient room tone, and subtle wind swells.';
  } else {
    soundscapeText = 'Subtle ambient room tone, atmospheric wind whispers, physical object interactions, and low background room resonance.';
  }

  let musicText = '';
  if (state.generatorMode === 'multi') {
    musicText = 'Cinematic suspenseful orchestral swell with low string pulses and dramatic trailer percussion beats.';
  } else {
    musicText = 'Minimalist atmospheric ambient swell and low isolated piano note, gradual buildup with deep cinematic trailer impacts.';
  }

  return `integrated_multimodal_description: [Shot 1] (${formatSecondsToTimestamp(0)}–${formatSecondsToTimestamp(14)}) ${cleanVideo}\n\noverall_soundscape: ${soundscapeText}\n\nnon_diegetic_music: ${musicText}`;
}

/**
 * 🎙️ Clean Audio & Voiceover Prompt
 * Separates spoken narration and sound effects cleanly for ElevenLabs or Audio AI tools.
 */
export function compileCleanAudioVoiceoverPrompt(state: PromptBuildState): string {
  const parts: string[] = [];
  const catLabel = getCategoryLabelEn(state.category);

  // Active commercial preset lookup
  const activeCommPreset = state.commercialPresetId ? COMMERCIAL_MASTER_PRESETS.find(p => p.id === state.commercialPresetId) : null;
  const activeBrand = state.commercialBrandName || activeCommPreset?.defaultBrand || '';
  const activeClaim = state.commercialClaim || activeCommPreset?.defaultClaim || '';

  parts.push(`=== CATEGORY & PERSON FILTER ===`);
  parts.push(`Category: ${catLabel}`);
  parts.push(`Person Setup: ${state.personCount === 'multi_person' ? '👥 Multi-Person (Ensemble / group vocals & dialogue)' : state.personCount === '2_person' ? '👥 2-Person Duo (Co-star duet & dialogue)' : '👤 1 Person Solo (Single protagonist / solo narrator voice)'}`);

  parts.push(`\n=== SPOKEN DIALOGUE & NARRATION ===`);
  if (!state.voiceoverEnabled) {
    parts.push(`No spoken voiceover or narrator dialogue. [SPOKEN DIALOGUE & NARRATION: Disabled / None]`);
  } else if (state.dialogueLines?.trim()) {
    parts.push(state.dialogueLines.trim());
  } else if (activeClaim || activeBrand) {
    const brandStr = activeBrand ? activeBrand.toUpperCase() : 'BRAND';
    const claimStr = activeClaim ? ` - "${activeClaim}"` : '';
    const ctaStr = state.commercialCallToAction ? ` | CTA: "${state.commercialCallToAction}"` : '';
    parts.push(`Commercial Outro Narration / On-Screen Text: ${brandStr}${claimStr}${ctaStr}`);
  } else if (state.movieTitle?.trim()) {
    parts.push(`Narrator: "${state.movieTitle.trim().toUpperCase()}."`);
  } else {
    const categoryTitle = getCategoryDefaultTitle(state.category);
    parts.push(`Narrator: "${categoryTitle.toUpperCase()}."`);
  }

  parts.push(`\n=== ATMOSPHERIC SOUND DESIGN & SFX ===`);

  const isPovActive =
    Boolean(state.isImmersivePov) ||
    Boolean(state.cameraMotion && /first-person|ego-perspektive|pov|head-bob/i.test(state.cameraMotion));

  // Extract explicit audio design from commercial preset promptSnippet if available
  let commercialAudioDesign = '';
  if (activeCommPreset?.promptSnippet) {
    const match = activeCommPreset.promptSnippet.match(/audio_design:\s*([^\n]+(?:\n[^\n]+)?)/i);
    if (match && match[1]) {
      commercialAudioDesign = match[1].trim();
    }
  }

  if (state.audioCue) {
    let cleanCue = state.audioCue.replace(/^\[Audio:\s*/i, '').replace(/\]$/, '');
    if (isPovActive) {
      cleanCue += ', rhythmic close-mic breathing and cold breath exhalations, tactile footstep impacts on ground surface, visceral first-person perspective acoustic presence';
    }
    parts.push(`Soundscape: ${cleanCue}`);
  } else if (commercialAudioDesign) {
    parts.push(`Soundscape: ${commercialAudioDesign}`);
  } else if (isPovActive) {
    parts.push(`Soundscape: Rhythmic audible breathing and frosty exhalations into the cold air, crisp footstep crunches on surface, tactile cloth rustle with each step, visceral close-up spatial soundscape, ambient echo.`);
  } else {
    parts.push(`Soundscape: ${getCategoryDefaultSoundscape(state.category)}`);
  }

  if (activeCommPreset || state.commercialBrandName || state.category === 'gastro' || state.category === 'grill_aussenkueche' || state.category === 'food' || state.category === 'immobilien') {
    parts.push(`Audio Accents: Layered room ambience, crystal glass refractions, high-frequency sparkle transitions, subtle bass swell ending with brand audio logo signature.`);
  } else {
    parts.push(`Trailer SFX: Deep sub-bass trailer impacts, low string swells, restrained pulse.`);
  }

  if (!state.voiceoverEnabled) {
    parts.push(`Voice Character: None (No spoken voice or narrator voice. Purely instrumental soundscape.)`);
  } else if (state.narratorVoice) {
    parts.push(`Voice Character: ${state.narratorVoice}`);
  } else if (activeCommPreset) {
    parts.push(`Voice Character: Warm, sophisticated commercial narrator voice with clear brand resonance.`);
  } else {
    parts.push(`Voice Character: ${getNarratorVoiceFallbackForCategory(state.category || 'cinema', state.movieTitle)}`);
  }

  const rawAudioResult = parts.join('\n');
  const refCount = state.referenceImages ? state.referenceImages.length : 0;
  return adjustPictureReferencesInText(rawAudioResult, refCount);
}

/**
 * 📜 Full Studio Script (Full Director Screenplay Document)
 * Contains the complete structured breakdown with timestamps and technical specs.
 */
export function compileStudioTheatricalScript(state: PromptBuildState): string {
  const totalSeconds =
    state.generatorMode === 'multi'
      ? state.windows.length * 14
      : state.durationSeconds || 6;

  const styleCode = state.styleCode || 'ASTROCINEMAV01K2T';
  const catLabel = getCategoryLabelEn(state.category);
  const personLabel =
    state.personCount === 'multi_person'
      ? '👥 Multi-Person Ensemble / Duo (picture 1 = lead, picture 2-4 = co-stars/group)'
      : state.personCount === '2_person'
      ? '👥 2-Person Duo (picture 1 = lead protagonist, picture 2 = co-star)'
      : '👤 1 Person Solo Focus (picture 1 = single protagonist anchor)';
  const titleText = state.movieTitle?.trim() || 'THE LAST LIGHTHOUSE';

  let activeScriptRefs = state.referenceImages;
  if (!activeScriptRefs || activeScriptRefs.length === 0) {
    activeScriptRefs = getCategoryDefaultReferences(state.category, state.personCount);
  }

  // Multi-window Maestro Mode: STRICTLY ONLY the window lines (window1 to window4), with everything embedded inside! No external headers.
  if (state.generatorMode === 'multi' && state.windows.length > 0) {
    const windowLines: string[] = [];
    state.windows.forEach((win, idx) => {
      const precisionRange = ensurePrecisionTimeRange(win.timeRange, idx);
      const promptText = (win.prompt || state.rawConcept || 'Dynamic cinematic scene sequence').trim();

      let winLine = `window${win.windowNumber}: (${precisionRange}) [${styleCode}] [Category: ${catLabel}] [Person: ${personLabel}] Action: ${promptText}`;

      const cameraText = (win.cameraTrajectory || state.cameraMotion || '').trim();
      if (cameraText) {
        winLine += ` Camera: ${cameraText.endsWith('.') ? cameraText : cameraText + '.'}`;
      }

      const continuityText = (win.continuityNote || '').trim();
      if (continuityText) {
        winLine += ` Continuity: ${continuityText.endsWith('.') ? continuityText : continuityText + '.'}`;
      }

      const dialogueText = state.voiceoverEnabled ? (win.dialogue || '').trim() : '';
      if (dialogueText) {
        winLine += ` Dialogue: ${dialogueText.endsWith('.') ? dialogueText : dialogueText + '.'}`;
      }

      const sfxText = (win.sfxImpact || '').trim();
      if (sfxText) {
        winLine += ` SFX: ${sfxText.endsWith('.') ? sfxText : sfxText + '.'}`;
      }

      if (state.audioCue) {
        const cleanCue = state.audioCue.replace(/^\[Audio:\s*/i, '').replace(/\]$/, '');
        winLine += ` Audio Design: ${cleanCue}.`;
      }

      if (state.narratorVoice) {
        winLine += ` Narrator Voice: ${state.narratorVoice}.`;
      }

      let winRefs = win.referenceImages || [];
      if (winRefs.length === 0 && activeScriptRefs.length > 0) {
        winRefs = activeScriptRefs.map((r) => r.tag);
      }
      if (winRefs.length > 0) {
        winLine += ` Active_References: ${winRefs.join(', ')}.`;
      }

      if (idx === state.windows.length - 1 && titleText) {
        winLine += ` Title Card: "${titleText.toUpperCase()}".`;
      }

      windowLines.push(winLine.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim());
    });

    const rawResult = windowLines.join('\n');
    const refCount = state.referenceImages ? state.referenceImages.length : 0;
    return adjustPictureReferencesInText(rawResult, refCount);
  }

  // 1. Target Header (Single shot mode only)
  const header = `1. Target duration: ${totalSeconds} seconds\n2. Format: ${state.aspectRatio || '16:9'}\n3. Category & Genre: ${catLabel}\n4. Person Filter: ${personLabel}`;

  // 2. Style and Tone
  const isPovActive =
    Boolean(state.isImmersivePov) ||
    Boolean(state.cameraMotion && /first-person|ego-perspektive|pov|head-bob/i.test(state.cameraMotion));

  let styleTone = `style_and_tone:\n${styleCode}. Photorealistic theatrical film trailer [Category: ${catLabel}] [Person Filter: ${personLabel}]`;
  if (isPovActive) {
    styleTone += `, True First-Person POV (Ego-Perspektive) with physical footsteps head-bob kinetics and breath simulation`;
  }
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

  let refPicturesBlock = '';
  if (activeScriptRefs && activeScriptRefs.length > 0) {
    refPicturesBlock = `\n\nreference_pictures:\n` +
      activeScriptRefs
        .map((ref, idx) => {
          const tag = ref.tag || `picture ${idx + 1}`;
          return `${tag}: ${ref.label} (${ref.role}) - ${ref.description || 'reference anchor'}`;
        })
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
  if (!state.voiceoverEnabled) {
    audioDesign += `No spoken narrator or dialogue voiceover. Purely instrumental soundscape.`;
  } else if (state.narratorVoice) {
    audioDesign += `${state.narratorVoice}.`;
  } else {
    audioDesign += `Deep cinematic male narrator with gravitas.`;
  }

  // 4. Single Shot Sequence
  let shotSequence = `[Shot 1] (${formatSecondsToTimestamp(0)}–${formatSecondsToTimestamp(totalSeconds)}) ${state.rawConcept || 'Cinematic scene sequence'}.`;
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

  if (state.voiceoverEnabled && state.dialogueLines) {
    shotSequence += `\n\n${state.dialogueLines}`;
  }

  if (state.spatialTextOverlayEnabled) {
    const textToProject = state.spatialTextContent?.trim() || state.commercialClaim?.trim() || (state.commercialBrandName ? `${state.commercialBrandName} – Exclusive Living` : 'ARCHITECTURAL RESIDENCE');
    shotSequence += `\n\n[In-Scene Spatial Typography Overlay: "${textToProject}"] (Location Tracking: ${state.spatialTextPosition ? state.spatialTextPosition.replace(/_/g, ' ') : 'Architectural facade, roofline & curb'})\n`;
  }

  const activeCommPreset = state.commercialPresetId ? COMMERCIAL_MASTER_PRESETS.find(p => p.id === state.commercialPresetId) : null;
  const activeBrand = state.commercialBrandName || activeCommPreset?.defaultBrand || '';
  const activeClaim = state.commercialClaim || activeCommPreset?.defaultClaim || '';
  const activeCta = state.commercialCallToAction || '';
  const activeAnimation = state.commercialOutroAnimation || activeCommPreset?.defaultOutroAnimation || 'brand_logo_reveal';

  if (activeClaim || activeBrand) {
    shotSequence += `\n\n[Commercial Outro / Abspann & Brand Claim]\n`;
    if (activeBrand) {
      shotSequence += `Brand / Client: "${activeBrand.toUpperCase()}"\n`;
    }
    if (activeClaim) {
      shotSequence += `Slogan / Claim: "${activeClaim}"\n`;
      if (state.voiceoverEnabled) {
        shotSequence += `Voiceover (Outro): "${activeClaim}"\n`;
      } else {
        shotSequence += `Voiceover (Outro): None (No spoken outro narration, purely instrumental audio logo & closing chord, visual on-screen text display only)\n`;
      }
    }
    if (activeCta) {
      shotSequence += `Call-to-Action: "${activeCta}"\n`;
    }
    shotSequence += `Visual Style: ${state.commercialOutroStyle ? state.commercialOutroStyle.replace(/_/g, ' ') : 'Cinematic fade to black with centered clean typography'}.\n`;
    shotSequence += `Outro Animation: ${activeAnimation.replace(/_/g, ' ')} [H3-Tag: ${activeAnimation}].\n`;
    shotSequence += `Final Brand Chord & Closing Logo Reveal.`;
  } else {
    shotSequence += `\n\n[Title Card / Abspann]\n`;
    shotSequence += `Hard cut to black canvas. Bold glowing theatrical title card emerges: "${titleText.toUpperCase()}".\n`;
    if (state.voiceoverEnabled) {
      shotSequence += `Narrator: "${titleText.toUpperCase()}."\n`;
    } else {
      shotSequence += `Narrator: None (Visual text element only, no voice narration)\n`;
    }
    shotSequence += `Final deep trailer impact.`;
  }

  const rawScriptResult = `${header}\n\n${styleTone}${refPicturesBlock}\n\n${audioDesign}\n\n${shotSequence}`.trim();
  const refCount = state.referenceImages ? state.referenceImages.length : 0;
  return adjustPictureReferencesInText(rawScriptResult, refCount);
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

  return title.toUpperCase() || 'CINEMATIC VISION';
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
    birthday: [
      'Ensemble sings in 4-part harmony: "Happy Birthday to you, three cheers for the birthday star!"',
      'Singer smiles warmly: "Blow out the sparkler candles and make your greatest wish tonight!"',
      'Musicians chorus: "A song of joy, health, and laughter dedicated to your special day!"',
      'Accordionist laughs: "To another year of legendary moments, high spirits, and endless cheer!"',
      'Crowd cheers: "Hip, hip, hooray! May all your wildest dreams come true today!"'
    ],
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
    lingerie: [
      'Model whispers in black and white: "Elegance is refusal. The purest silk speaks without sound."',
      'Photographer: "Hold the shadow on the collarbone. Yes... absolute timeless luxury."',
      'Sensual whisper: "Black, white, and silhouette. Nothing more is needed."',
      'Intimate voice: "In monochrome grain, every curve is a brushstroke of light."',
      'Haute couture muse: "True seduction is whispering in the dark while wearing liquid silver."'
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
      'Narrator: "Here, in the endless ice, silence is the only language left."',
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
    ],
    travel: [
      'Vacationer (panting): "06:00 AM sharp! Front row pool loungers are secured with four towels for the whole week!"',
      'Luxury Traveler: "Floating breakfast and champagne on the water... this is what true paradise feels like."',
      'Safari Ranger (whispering): "Keep completely still. The lioness has spotted the herd across the dry creek."',
      'Bistro Guest: "Paris in the twilight... un café et un croissant, s\'il vous plaît."',
      'City Explorer: "Lost in the neon jungle of Tokyo Shibuya. The rhythm of this city is unmatched."',
      'Roadtripper: "Eight hundred miles of open desert highway and a full tank of gas in the Mustang."',
      'Ski Fanatic: "The powder is fresh, the sun is shining, and the Hüttengaudi has officially begun!"'
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
    case 'birthday':
      return 'Joyous festive celebrant voice with warm acoustic harmony, cheerful invitation tone, and enthusiastic birthday serenade cadence';
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
    case 'lingerie':
      return 'Intimate haute couture black-and-white analog narrator, breathy Parisian French whisper, velvet texture, and ultra-sophisticated cadence';
    case 'erotik':
      return 'Intimate sensual velvet whispering voice, extremely close to the microphone, breathy and seductive with warm physical resonance';
    case 'travel':
      return 'Warm charismatic travel documentary host voice, enthusiastic rhythm, inspiring global resonance and vivid sensory pacing';
    case 'immersive':
      return 'Intimate first-person close-mic narrator voice, visceral breathing texture, immersive spatial resonance, and tense documentary cadence';
    default:
      return 'Deep cinematic male narrator with gravelly resonance, slow cinematic cadence, and massive theatrical gravitas';
  }
}

export function generateExtrapolatedWindowsForTemplate(
  tpl: PresetTemplate,
  count: number,
  isEn: boolean = false,
  actualReferenceCount?: number
): MaestroWindow[] {
  const windows: MaestroWindow[] = [];
  const category = (tpl.category || '').toLowerCase();
  const isPov = Boolean(tpl.isImmersivePov || category === 'immersive' || /first-person|ego-perspektive|pov|head-bob|bodycam/i.test(tpl.camera || ''));
  const catPovConfig = getCategoryPovDefaults(category, tpl.title);

  for (let idx = 1; idx <= count; idx++) {
    const timeRange = formatPrecisionTimeRange(idx, 14);

    let prompt = '';
    let cameraTrajectory = '';
    let continuityNote = '';
    let dialogue = '';
    let sfxImpact = '';

    if (idx === 1) {
      if (tpl.id.includes('4pic')) {
        prompt = `A stylish presenter (picture 4: Makler / Person) dressed in elegant clothing (${tpl.clothingDetails || 'smart casual attire'}) is walking confidently down the quiet tree-lined road of the exclusive new development area (picture 1: Baugebiet & Nachbarschaft). He turns towards the camera with a welcoming smile, gesturing towards the beautiful landscape.`;
      } else {
        prompt = tpl.prompt;
      }
      cameraTrajectory = isPov ? catPovConfig.multiWindowTrajectories[0] || tpl.camera : tpl.camera;
      continuityNote = isPov ? 'First-Person establishing trajectory (Horizon & kinetics locked).' : 'Establishing shot (Initial sequence).';
      dialogue = tpl.dialogueLines || (category === 'immobilien' || category === 'bau'
        ? `Narrator: "Willkommen in Ihrer neuen exklusiven Residenz: ${tpl.title}."`
        : getDialogueFallbackForCategory(category, tpl.title));
      sfxImpact = 'Soft cinematic ambient hum, initial deep sub-bass pulse.';
    } else if (idx === 2) {
      cameraTrajectory = isPov
        ? catPovConfig.multiWindowTrajectories[1] || 'First-Person close-range macro gaze tilt'
        : 'Slow medium-macro dolly tracking zoom';
      continuityNote = isPov
        ? 'Preserve subjective eye-level height, visible hands/tool anchors, and kinetic stride continuity.'
        : 'Seamless wardrobe and environmental lighting continuity from the establishing shot.';
      dialogue = '';
      sfxImpact = 'Slight audio swell, atmospheric tension increase.';

      switch (category) {
        case 'immobilien':
          if (tpl.id.includes('4pic')) {
            prompt = `Spectacular time-lapse of the Scandinavian brutalist luxury villa (picture 2: Haus & Fassade) dynamically building up from the ground. Concrete walls self-assemble, massive floor-to-ceiling glass panels slide down from above, and the roof locks into place with glowing laser guidelines.`;
          } else if (tpl.id.includes('floorplan') || tpl.id.includes('buildup')) {
            prompt = `Fluid architectural board-assembly transitioning from the schematic lines into real-world textures: walls rise, flooring rolls out smoothly, and glass panes align with laser-precision under soft cinematic lighting.`;
          } else {
            prompt = `Ultra-smooth static-glide walkthrough transitioning from the exterior facade (picture 1: Haus & Fassade) into the sunlit interior foyer, displaying spatial room layout and pristine materials of ${tpl.title}.`;
          }
          break;
        case 'birthday':
          prompt = `Joyous medium close-up shot capturing the birthday protagonist (picture 1: Jubilar) laughing with delight as sparkling birthday candles flicker on the cake, while the singing ensemble (picture 2-4) leans closer with warm smiles and instruments.`;
          break;
        case 'bau':
          prompt = `Rugged heavy-tread helmet-cam glide across the structural concrete framework, moving from the outer architectural shell (picture 1: Bauobjekt) to inspect the 3D laser blueprint measurements (picture 2: Bauplan).`;
          break;
        case 'restaurant':
          prompt = `Sensual 45-degree macro camera tilt gliding over the sizzling gourmet entree, highlighting steam wisps, fresh herb plating, and warm candlelight ambient reflections.`;
          break;
        case 'erotik':
          prompt = `Intimate close-up macro tracking shot focusing on the delicate tactile textures of the skin and gentle, rhythmic breathing. The warm lighting casts long, velvety shadows along the contours of the body as it slowly moves, highlighting the smooth satin sheet background.`;
          break;
        case 'fashion':
          prompt = `Detailed medium-close tracking view highlighting the intricate textures of the garment, fine fabric stitching, and floating micro-particles in the air. Strobe lights flicker in the background, accentuating the model's sharp facial angles and editorial confidence.`;
          break;
        case 'scify':
        case 'cyberpunk':
          prompt = `Close-up camera glide showing glowing cybernetic wiring and HUD visor projections flashing with green telemetry data. Microscopic cooling steam wisps drift in front of the lens as mechanical server relays thrum softly.`;
          break;
        case 'horror':
          prompt = `A tense handheld tracking shot focusing on the character's wide, terror-stricken eyes. The shaky beam of the flashlight cuts through thick, drifting dust motes as a faint, scratching sound echoes from the shadows.`;
          break;
        case 'nature':
          prompt = `A macro gliding camera path detailing frost crystal formations on ancient pine needles and swirling golden pollen dust caught in the low morning sun rays piercing the forest canopy.`;
          break;
        case 'travel':
          prompt = `Immersive travel documentary tracking shot following the enthusiastic traveler (picture 2: Reisender) exploring vibrant local culture, sunlit pathways, and scenic architectural wonders of ${tpl.title} (picture 1: Reiseziel).`;
          break;
        default:
          prompt = `Detailed medium close-up following the smooth physical motion and subtle facial expressions of the protagonist. Rich cinematic lighting brings out the organic surface textures and atmospheric depth of the environment.`;
          break;
      }
    } else if (idx === 3) {
      cameraTrajectory = isPov
        ? catPovConfig.multiWindowTrajectories[2] || 'First-Person rapid peripheral gaze shift and body swivel'
        : 'Fluid gimbal orbit with perspective shift';
      continuityNote = isPov
        ? 'Preserve subjective head-turn inertia, lighting direction, and active foreground hands.'
        : 'Preserve camera momentum and steadycam organic fluidity across the transition.';
      dialogue = '';
      sfxImpact = 'Deep musical chord transition, low string swell.';

      switch (category) {
        case 'immobilien':
          if (tpl.id.includes('4pic')) {
            prompt = `Progressive walkthrough of the internal room layouts based on the architectural 3D CAD floor plan (picture 3: Grundriss & Bauplan). The camera glides past glowing geometric schematics which morph into real-world concrete, oak wood and polished marble walls.`;
          } else if (tpl.id.includes('floorplan') || tpl.id.includes('buildup')) {
            prompt = `The prospective owner or architect dressed in elegant clothing (${tpl.clothingDetails || 'casual chic'}) walks gracefully across the room, interacting with the smart touchscreen wall showing the CAD layout.`;
          } else {
            prompt = `Fluid low-angle tracking shot following the real estate presenter / agent (picture 3: Makler / Person) dressed in a tailored outfit (${tpl.clothingDetails || 'business attire'}) walking gracefully across the open lounge, gesturing toward floor-to-ceiling glass windows.`;
          }
          break;
        case 'birthday':
          prompt = `Dynamic celebratory camera pan across the enthusiastic band and choir members singing with high-energy expressions, raising their glasses and brass instruments in a synchronized festive tribute.`;
          break;
        case 'bau':
          prompt = `Industrial low-angle pan tracking a master craftsman in safety helmet (picture 3: Handwerker) deploying precision laser leveling tools across high steel support beams.`;
          break;
        case 'restaurant':
          prompt = `Dynamic seated gaze shift as the chef smoothly presents a crystal champagne glass, surrounded by ambient Michelin-star dining room acoustics and golden bokeh lights.`;
          break;
        case 'erotik':
          prompt = `Dynamic low-angle camera orbit as the model performs a slow, elegant body-turn. The rich candlelight shifts across the scene, creating a hypnotic interplay of golden highlights and deep, warm shadows on the skin.`;
          break;
        case 'fashion':
          prompt = `High-energy camera pan following the model performing a dramatic slow-motion runway pivot. The flowing luxury fabrics drape and billow in the wind as lens flares flash across the anamorphic glass.`;
          break;
        case 'scify':
        case 'cyberpunk':
          prompt = `Fluid tracking shot across complex holographic diagnostic arrays as they pulsate with cyan energy. The pilot's hands grip tactile flight controllers, manipulating interactive dials with sparks whispering from the backup relays.`;
          break;
        case 'horror':
          prompt = `A rapid, jarring dolly zoom following the character turning around sharply. Heavy shadows on the walls morph into distorted, towering figures as the flashlight battery begins to flicker erratically.`;
          break;
        case 'nature':
          prompt = `Atmospheric camera sweep tracking a sudden flock of wild forest birds taking flight into the misty sky, as a heavy thermal steam haze rises from the damp moss-covered forest ground.`;
          break;
        case 'travel':
          prompt = `Dynamic cinematic pan and tracking shot across breathtaking viewpoints and exotic local market activities (picture 3: Kultur & Aktivität), capturing authentic traveler excitement and stunning natural beauty.`;
          break;
        default:
          prompt = `Fluid steadycam tracking shot capturing a dramatic shift in the protagonist's stance or interaction with the surroundings, enhanced by organic motion blur and rich color grading.`;
          break;
      }
    } else if (idx === 4) {
      cameraTrajectory = isPov
        ? catPovConfig.multiWindowTrajectories[3] || 'First-Person slow elevated pull-back settling into expansive horizon view'
        : 'Slow tracking pull-back to wide establishing view';
      continuityNote = isPov
        ? 'Smoothly slow down first-person stride momentum to settle into a horizon-locked subjective frame.'
        : 'Smoothly slow down camera momentum to settle into a static cinematic frame.';
      dialogue = `Narrator: "${tpl.title.toUpperCase()}"`;
      sfxImpact = 'Final heavy sub-bass trailer impact, long decaying reverb tail.';

      switch (category) {
        case 'immobilien':
          if (tpl.id.includes('4pic')) {
            prompt = `The charismatic real estate presenter (picture 4: Makler / Person) dressed in refined attire (${tpl.clothingDetails || 'business attire'}) walks gracefully across the finished luxury interior, gesturing warmly towards the panoramic sunset views through the floor-to-ceiling windows.`;
          } else {
            prompt = `Grand elevated steadycam pull-back showcasing the complete luxury interior finish (picture 4: Innenraum & Luxus-Stil) of ${tpl.title} seamlessly connected to the sunset infinity terrace and landscape facade.`;
          }
          break;
        case 'birthday':
          prompt = `Grand festive camera pull-back revealing the full birthday celebration table filled with confetti, glowing sparklers, and cheering guests raising a joyous toast under warm ambient party lights.`;
          break;
        case 'bau':
          prompt = `Stately industrial pull-back revealing the finished architectural edifice illuminated by dramatic exterior uplighting against the twilight sky.`;
          break;
        case 'restaurant':
          prompt = `Serene cinematic pull-back sweeping across the entire sunlit dining terrace overlooking coastal waters, settling into wide architectural elegance.`;
          break;
        case 'erotik':
          prompt = `Languid, sweeping pull-back revealing the beautiful sunset-drenched studio apartment. Sheer curtains blow gently in the evening wind, as the remaining light slowly dissolves into a serene, peaceful twilight atmosphere.`;
          break;
        case 'fashion':
          prompt = `Stately cinematic pull-back displaying the complete grand runway stage, as smoke machines fill the floor. The silhouettes of the models stand poised in a line under a single overhead industrial spotlight.`;
          break;
        case 'scify':
        case 'cyberpunk':
          prompt = `Slow dramatic pull-back looking out of the massive glass cockpit window. The futuristic starship cockpit settles into autopilot as the ship cruises past a colossal glowing cyber-nebula in deep space.`;
          break;
        case 'horror':
          prompt = `A slow, shivering pull-back from a high corner angle, looking down at the empty, quiet corridor. The flashlight lies abandoned on the cold floor, its dying beam illuminating only a puddle of thick liquid and shadows.`;
          break;
        case 'nature':
          prompt = `Grand cinematic camera pull-back rising high above the pristine landscape. The golden sunset glow reflects perfectly on the mirror-like surface of the alpine lake, surrounded by silent, snow-covered mountain peaks.`;
          break;
        case 'travel':
          prompt = `Grand cinematic drone and steadycam pull-back rising high above the golden sunset coastline or mountain resort (picture 4: Abendstimmung & Resort), revealing the majestic global panorama of ${tpl.title}.`;
          break;
        default:
          prompt = `Grand theatrical camera pull-back showing the entire atmospheric scene. The environmental details, smoke, and lighting merge into a beautiful wide composition that fades slowly into deep shadow.`;
          break;
      }
    }

    let windowRefImages: string[] = [];
    if (category === 'birthday') {
      const bdayRefs = [
        'picture 1 (Jubilar / Geburtstagskind)',
        'picture 2 (Musiker & Sänger)',
        'picture 3 (Chor & Begleit-Ensemble)',
        'picture 4 (Torte & Party-Deko)'
      ];
      if (bdayRefs[idx - 1]) windowRefImages = [bdayRefs[idx - 1]];
    } else if (category === 'immobilien') {
      if (tpl.id.includes('4pic')) {
        const immo4picRefs = [
          ['picture 1 (Baugebiet & Nachbarschaft)', 'picture 4 (Makler / Person)'],
          ['picture 2 (Haus & Fassade)'],
          ['picture 3 (Grundriss & Bauplan)'],
          ['picture 4 (Makler / Person)']
        ];
        windowRefImages = immo4picRefs[idx - 1] || [];
      } else {
        const immoRefs = [
          'picture 1 (Haus & Fassade)',
          'picture 2 (Grundriss & Bauplan)',
          'picture 3 (Makler / Person)',
          'picture 4 (Innenraum & Luxus-Stil)'
        ];
        if (immoRefs[idx - 1]) windowRefImages = [immoRefs[idx - 1]];
      }
    } else if (category === 'bau' || category === 'handwerk') {
      const bauRefs = [
        'picture 1 (Bauobjekt & Fassade)',
        'picture 2 (Bauplan & CAD)',
        'picture 3 (Handwerker / Meister)',
        'picture 4 (Material & Finish)'
      ];
      if (bauRefs[idx - 1]) windowRefImages = [bauRefs[idx - 1]];
    } else if (category === 'travel') {
      const travelRefs = [
        'picture 1 (Reiseziel & Landschaft)',
        'picture 2 (Reisender / Vlogger)',
        'picture 3 (Kultur & Aktivität)',
        'picture 4 (Abendstimmung & Resort)'
      ];
      if (travelRefs[idx - 1]) windowRefImages = [travelRefs[idx - 1]];
    } else {
      const matches = prompt.match(/picture\s*\d(?:-\d)?/gi);
      if (matches) {
        windowRefImages = Array.from(new Set(matches.map((m) => m.toLowerCase())));
      }
    }

    if (actualReferenceCount !== undefined) {
      prompt = adjustPictureReferencesInText(prompt, actualReferenceCount);
    }

    windows.push({
      id: `win-extrapolated-${tpl.id}-${idx}-${Date.now()}`,
      windowNumber: idx,
      timeRange,
      prompt,
      cameraTrajectory,
      continuityNote,
      motionSpeed: tpl.motionSpeed || '24fps Normal',
      referenceImages: windowRefImages,
      dialogue,
      sfxImpact,
    });
  }

  return windows;
}

export function adjustPictureReferencesInText(text: string, actualCount: number): string {
  if (actualCount <= 0) {
    // Remove pattern (picture X: ...) or picture X
    return text.replace(/\(?picture\s*\d+\s*(?::\s*[^)]+)?\)?/gi, '').replace(/\s+/g, ' ').trim();
  }
  return text.replace(/picture\s*(\d+)/gi, (match, p1) => {
    const num = parseInt(p1, 10);
    if (num > actualCount) {
      // Clamp/cycle to actual count
      const normalized = ((num - 1) % actualCount) + 1;
      return `picture ${normalized}`;
    }
    return match;
  });
}

