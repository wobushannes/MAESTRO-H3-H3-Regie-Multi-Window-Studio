import { COMMERCIAL_100_PRESETS, CommercialPreset } from '../data/commercialPresetsData';

export type { CommercialPreset };
export const COMMERCIAL_MASTER_PRESETS: CommercialPreset[] = COMMERCIAL_100_PRESETS;

export function getCommercialPresetsByCategory(category?: string): CommercialPreset[] {
  if (!category || category === 'all') {
    return COMMERCIAL_MASTER_PRESETS;
  }
  return COMMERCIAL_MASTER_PRESETS.filter(p => p.category === category);
}

export function getCategoryCommercialDefaults(category?: string): {
  brandName: string;
  claim: string;
  callToAction: string;
  spatialText: string;
} {
  switch (category) {
    case 'gastro':
    case 'restaurant':
      return {
        brandName: "L'ÉTOILE DU SOIR",
        claim: "Excellent taste & unforgettable dining moments.",
        callToAction: "Book your table now | www.etoile-dining.com",
        spatialText: "Michelin Selection • Reservations at etoile-dining.com"
      };
    case 'grill_aussenkueche':
      return {
        brandName: "BLACK BULL OUTDOOR KITCHENS",
        claim: "900°C perfection. The ultimate outdoor grilling experience.",
        callToAction: "Visit our showroom | www.blackbull-outdoor.com",
        spatialText: "Grade-304 Stainless Steel • Dual-Infrared Burner • Custom Granite"
      };
    case 'immobilien':
      return {
        brandName: "VILLA AURELIA LUXURY ESTATES",
        claim: "Exclusive luxury living redefined.",
        callToAction: "Request exclusive exposé | www.aurelia-estates.com",
        spatialText: "420 m² living space • Solar roof • Panoramic view"
      };
    case 'food':
      return {
        brandName: "LE CHEF GOURMET SELECTION",
        claim: "Masterful culinary art on your plate.",
        callToAction: "Discover the menu | www.lechef-gourmet.com",
        spatialText: "Fresh organic ingredients • Masterful refinement"
      };
    case 'fashion':
      return {
        brandName: "MAISON DE LUXE PARIS",
        claim: "Elegance is the only beauty that never fades.",
        callToAction: "Discover collection | www.maison-luxe.fashion",
        spatialText: "Autumn/Winter Runway • Limited Edition"
      };
    case 'travel':
      return {
        brandName: "SANCTUARY RESORT & SPA BALI",
        claim: "Escape the ordinary. Find your sanctuary.",
        callToAction: "Book your dream stay | www.sanctuary-resorts.com",
        spatialText: "Private Infinity Pool • 5-Star Luxury All-Inclusive"
      };
    case 'inneneinrichtung':
      return {
        brandName: "LUMINA INTERIOR ARCHITECTURE",
        claim: "Symmetry & aesthetic harmony for your home.",
        callToAction: "Schedule your consultation | www.lumina-design.com",
        spatialText: "Bespoke handcrafted pieces • Italian solid wood"
      };
    case 'comic':
      return {
        brandName: "TOON CREATIVE ADS",
        claim: "Your message, engagingly illustrated.",
        callToAction: "Launch your campaign | www.toon-ads.com",
        spatialText: "High-Converting Hand-Drawn Storytelling"
      };
    case 'cinema':
      return {
        brandName: "GENESIS LUXURY HOMES",
        claim: "From the first excavation to your bespoke dream home.",
        callToAction: "Inquire about exclusive properties | www.genesis-homes.com",
        spatialText: "8K Cinematic Master • Genesis Luxury Collection"
      };
    case 'birthday':
      return {
        brandName: "CELEBRATION MOMENTS",
        claim: "Unforgettable moments captured forever.",
        callToAction: "Plan your event | www.celebration-moments.com",
        spatialText: "Anniversary Edition • Unforgettable Memories"
      };
    case 'horror':
      return {
        brandName: "DARK REALITY CINEMA",
        claim: "The terror begins in your mind.",
        callToAction: "Secure cinema tickets now | www.darkreality-thriller.com",
        spatialText: "In theatres this Thursday • 4K Dolby Atmos"
      };
    case 'sitcom':
      return {
        brandName: "LAUGHTER HOUSE NETWORK",
        claim: "Best entertainment for the whole family.",
        callToAction: "Stream now | www.laughterhouse.tv",
        spatialText: "Season 1 streaming now • Full HD Comedy"
      };
    case 'scify':
    case 'cyberpunk':
      return {
        brandName: "NEO-TOKYO CYBERTECH",
        claim: "Welcome to the future of tomorrow.",
        callToAction: "Discover next-gen tech | www.neo-tokyo.io",
        spatialText: "Quantum Matrix • Cybernetic Upgrade Ready"
      };
    case 'bau':
      return {
        brandName: "MASTER CRAFT INDUSTRIAL",
        claim: "Building foundations for future generations.",
        callToAction: "Request project proposal | www.mastercraft-construction.com",
        spatialText: "Reinforced steel-concrete construction • Certified Precision"
      };
    case 'action':
      return {
        brandName: "APEX STUNT PRODUCTIONS",
        claim: "Pure adrenaline.",
        callToAction: "Watch trailer | www.apex-action.com",
        spatialText: "8K High-Speed Motion • Pure Velocity"
      };
    case 'fantasy':
      return {
        brandName: "MYTHIC REALMS MEDIA",
        claim: "Where legends come to life.",
        callToAction: "Begin your journey | www.mythicrealms.fantasy",
        spatialText: "Epic Saga • Dark Fantasy Chapter I"
      };
    case 'nature':
      return {
        brandName: "WILDERNESS EXPLORER",
        claim: "Experience pure, untouched nature.",
        callToAction: "Book your expedition | www.wilderness-explorer.org",
        spatialText: "100% untouched wilderness • Eco Expedition"
      };
    case 'war':
      return {
        brandName: "TACTICAL FORCE MEDIA",
        claim: "Courage, honor, and duty.",
        callToAction: "Begin the mission | www.tacticalforce.mil",
        spatialText: "Tactical Ops • Authentic Combat Precision"
      };
    case 'politics':
      return {
        brandName: "GLOBAL DEBATE NETWORK",
        claim: "Voices that change the world.",
        callToAction: "Follow the debate | www.globaldebate.org",
        spatialText: "Live Debate • Shaping the Future"
      };
    case 'erotik':
    case 'lingerie':
      return {
        brandName: "MAISON DE SOIR LINGERIE",
        claim: "Seduction in its purest form.",
        callToAction: "View collection | www.maison-desoir.fr",
        spatialText: "Haute Lingerie • Pure Seduction"
      };
    case 'immersive':
      return {
        brandName: "POV IMMERSION LABS",
        claim: "Right in the middle of the action.",
        callToAction: "Activate VR Mode | www.pov-immersion.io",
        spatialText: "True First-Person Perspective • Real-Time Spatial"
      };
    default:
      return {
        brandName: "GENESIS LUXURY HOMES",
        claim: "From the first excavation to your bespoke dream home.",
        callToAction: "Inquire about exclusive properties | www.genesis-homes.com",
        spatialText: "8K Cinematic Master • Official Commercial Edition"
      };
  }
}

export function getCommercialPresetForCategoryOrTitle(category?: string, title?: string): CommercialPreset | undefined {
  if (title) {
    const titleLower = title.toLowerCase();
    // 1. Search all 184 commercial presets for title / prompt snippet keywords (e.g., braai, grill, genesis, villa, food, etc.)
    const titleMatch = COMMERCIAL_MASTER_PRESETS.find(p => 
      p.name.toLowerCase().includes(titleLower) || 
      titleLower.includes(p.name.toLowerCase()) ||
      p.promptSnippet.toLowerCase().includes(titleLower)
    );
    if (titleMatch) return titleMatch;

    // Check individual key words
    const words = titleLower.split(/[\s,_\-\/]+/).filter(w => w.length >= 4);
    for (const word of words) {
      const wordMatch = COMMERCIAL_MASTER_PRESETS.find(p => 
        p.name.toLowerCase().includes(word) || 
        p.promptSnippet.toLowerCase().includes(word)
      );
      if (wordMatch) return wordMatch;
    }
  }

  if (category) {
    const categoryPresets = COMMERCIAL_MASTER_PRESETS.filter(p => p.category === category);
    if (categoryPresets.length > 0) return categoryPresets[0];
  }

  return undefined;
}

export function formatCommercialOutroAbspann(
  claim?: string,
  brandName?: string,
  callToAction?: string,
  outroStyle?: string,
  outroAnimation?: string,
  spatialTextEnabled?: boolean,
  spatialTextPosition?: string,
  spatialTextContent?: string
): string {
  const brand = brandName?.trim() || '';
  const slogan = claim?.trim() || '';
  const cta = callToAction?.trim() || '';
  const style = outroStyle || 'cinematic_fade_black';
  const anim = outroAnimation || 'fade_to_black';

  // Spatial Text in Scene Overlay formatting
  let spatialSnippet = '';
  if (spatialTextEnabled) {
    const textToProject = spatialTextContent?.trim() || slogan || (brand ? `${brand} • Exclusive Selection` : 'PREMIUM SELECTION');
    const pos = spatialTextPosition || 'architectural_roof_curb';

    let posDesc = '';
    switch (pos) {
      case 'architectural_roof_curb':
        posDesc = 'Seamlessly mapped onto building architecture, illuminated 3D extruded lettering along the roofline overhang and laser-etched typographic selling proposition tracking smoothly along the sidewalk curb and entrance driveway';
        break;
      case 'integrated_facade_glass':
        posDesc = 'Ultra-clean architectural typography integrated into floor-to-ceiling glass reflections and concrete facade surfaces with photorealistic ambient occlusion and perspective match';
        break;
      case 'curbside_pavement_track':
        posDesc = 'Camera-tracked perspective typography painted onto clean street asphalt, sidewalk stone, and curbside with natural texture blending';
        break;
      case 'floating_golden_3d':
        posDesc = 'Floating 3D metallic brushed gold serif typography with realistic environmental depth, glass refractions, and subtle drift';
        break;
      case 'subtle_lower_cinema':
        posDesc = 'Ultra-refined minimalist Swiss typography placed in the lower-third cinematic margin with soft drop-shadow and letter-spacing';
        break;
      case 'dynamic_surface_anchor':
      default:
        posDesc = 'Context-aware typography organically projected onto structural walls, rooftop, and landscape floor with geometric camera lock';
        break;
    }

    spatialSnippet = `[IN-SCENE SPATIAL TEXT OVERLAY: "${textToProject}" | Placement: ${posDesc} | High-end commercial motion graphics integration]`;
  }

  if (!claim && !brandName && !callToAction && !spatialSnippet) {
    return '';
  }

  let styleDesc = '';
  switch (style) {
    case 'clean_white_minimal':
      styleDesc = 'Clean minimalist Apple-style off-white canvas with sharp charcoal typography';
      break;
    case 'lower_third_overlay':
      styleDesc = 'Sleek semi-transparent lower-third glass banner overlay with animated brand mark';
      break;
    case 'comic_speech_punch':
      styleDesc = 'Bold hand-drawn 2D comic end-card with action burst speech bubble and vibrant colors';
      break;
    case 'voiceover_whisper':
      styleDesc = 'Pure voiceover closing whisper & subtle harmonic sound logo chord without visual intrusion';
      break;
    case 'motion_graphic_reveal':
      styleDesc = '3D kinetic motion typography slogan slam with golden light sweep reflection';
      break;
    case 'cinematic_fade_black':
    default:
      styleDesc = 'Hard cut / fade to deep matte black canvas with centered metallic white typography';
      break;
  }

  // Animation Tag for H3 Video Engine
  let animDesc = '';
  switch (anim) {
    case 'brand_logo_reveal':
      animDesc = 'Smooth 3D vector logo extrusion with metallic edge gleam and clean volumetric shadow drop';
      break;
    case 'sparkle_transition':
      animDesc = 'Magical diamond optical sparkle transition with golden particle dust and subtle lens flare shimmer';
      break;
    case 'light_leak_burn':
      animDesc = 'Organic 35mm film light leak burn dissolve transitioning into clean slate';
      break;
    case 'lens_flare_streak':
      animDesc = 'Anamorphic horizontal blue and gold optical lens flare streak wiping across text elements';
      break;
    case 'cinematic_zoom_dissolve':
      animDesc = 'Slow continuous vertigo dolly zoom into logo with soft optical blur dissolve';
      break;
    case 'neon_strobe_flash':
      animDesc = 'High-voltage neon tube flicker ignition with vibrant specular reflection pulses';
      break;
    case 'glitch_matrix_snap':
      animDesc = 'Subtle chromatic aberration cyber glitch snap settling instantly into tack-sharp crisp logo';
      break;
    case 'gold_shimmer_wipe':
      animDesc = 'Luxurious liquid gold specular shimmer sweep traveling left-to-right across typography';
      break;
    case 'whip_pan_blur':
      animDesc = 'Ultra-fast directional whip-pan motion blur snap settling into static brand end-card';
      break;
    case 'fade_to_black':
    default:
      animDesc = 'Velvety smooth 1.2-second cross-dissolve fade to deep pitch-black background';
      break;
  }

  const parts: string[] = [];
  parts.push(`Outro Format: ${styleDesc}`);
  if (anim && anim !== 'none') {
    parts.push(`Outro Animation: ${animDesc} [H3-Tag: ${anim}]`);
  }
  if (brand) parts.push(`Brand / Client: "${brand.toUpperCase()}"`);
  if (slogan) parts.push(`Official Claim / Slogan: "${slogan}"`);
  if (cta) parts.push(`Call-to-Action (CTA): "${cta}"`);

  const outroMain = `[COMMERCIAL OUTRO & BRAND CLAIM END CARD: ${parts.join(' | ')}]`;
  return translateToEnglish(spatialSnippet ? `${spatialSnippet} ${outroMain}` : outroMain);
}

export function translateToEnglish(text: string): string {
  if (!text) return '';
  let res = text;
  
  const dict: [string, string][] = [
    // Phrases and sentences from presets
    ["Kamera beginnt beim Makler im Anzug, schwenkt über das unbebaute Baugebiet und fängt den 3D-Zeitraffer-Aufbau der Luxusvilla ein", "Camera starts with the realtor in a suit, pans across the undeveloped land, and captures the 3D time-lapse construction of the luxury villa"],
    ["Kameradrohne zeigt den Immobilienberater auf dem verschneiten Berggrundstück, gefolgt vom organischen Aufbau des Designerchalets", "Camera drone shows the real estate consultant on the snowy mountain plot, followed by the organic construction of the designer chalet"],
    ["Charismatischer Makler im Anzug präsentiert das noch unbebaute Baugebiet", "Charismatic realtor in a suit presents the undeveloped plot"],
    ["In einem atemberaubenden CGI-Zeitraffer-Aufbau wachsen Fundamente, Betonwände und raumhohe Glasfronten empor, bis die vollendete Luxus-Bauhaus-Villa", "In a breathtaking CGI time-lapse construction, foundations, concrete walls, and floor-to-ceiling glass fronts rise up until the completed luxury Bauhaus villa"],
    ["mit illuminiertem Pool erstrahlt. Der Makler steht stolz davor und übergibt die Schlüssel mit einem strahlenden Lächeln", "shines with an illuminated pool. The realtor stands proudly in front of it and hands over the keys with a radiant smile"],
    ["Eleganter Immobilienberater steht auf dem unberührten, verschneiten Alpen-Baugrundstück", "Elegant real estate advisor stands on the pristine, snow-covered alpine plot"],
    ["Im fließenden architektonischen Zeitraffer errichten sich massive Natursteinfundamente, Altholzbalken und ein Schieferdach zum fertigen Luxuschalet", "In a fluid architectural time-lapse, massive natural stone foundations, reclaimed wood beams, and a slate roof construct themselves into the finished luxury chalet"],
    ["Der Makler stößt auf der Sonnenterrasse mit glücklichen Käufern an", "The realtor toasts with happy buyers on the sun terrace"],
    ["Kamera beginnt beim", "Camera starts at the"],
    ["schwenkt über", "pans across"],
    ["fängt den", "captures the"],
    ["Kameradrohne zeigt", "Camera drone shows"],
    ["Warme Abendsonne, die sich in großen Glasflächen und im Poolwasser spiegelt", "Warm evening sun reflecting in large glass surfaces and pool water"],
    ["Glänzender Alpinschnee im Sonnenlicht, warmer Schein des Kaminfeuers durch Panorama-Fenster", "Shining alpine snow in sunlight, warm glow of fireplace through panoramic windows"],
    ["Elegantes Warm-Gold, tiefes Pool-Türkis und reine architektonische Weiß- und Betontöne", "Elegant warm gold, deep pool turquoise, and pure architectural white and concrete tones"],
    ["Kühles Alpinblau, edles Altholz-Braun und warmes goldenes Kaminlicht", "Cool alpine blue, noble reclaimed wood brown, and warm golden fireplace light"],
    ["Vom ersten Spatenstich zu Ihrem Wohntraum.", "From the first excavation to your dream home."],
    ["Ihr persönliches Refugium in den Alpen.", "Your personal sanctuary in the Alps."],
    ["Altholz-Tradition trifft High-End Wellness", "Reclaimed wood tradition meets high-end wellness"],
    
    // Key terms & Categories
    ["Bauträger & Exklusiv-Maklervertrieb", "Developer & Exclusive Real Estate Sales"],
    ["Alpine Exclusive Properties & Chaletbau", "Alpine Exclusive Properties & Chalet Construction"],
    ["Immobilien: Makler & Baugebiet Genesis", "Real Estate: Realtor & Construction Site Genesis"],
    ["Immobilien: Alpen-Chalet Genesis", "Real Estate: Alpine Chalet Genesis"],
    ["Spektakuläre 3-Bilder-Werbesequenz", "Spectacular 3-picture commercial sequence"],
    ["3-Bilder-Alpenchalet-Werbung", "3-picture alpine chalet ad"],
    ["Makler am Schneehang", "Realtor on snowy slope"],
    ["Chalet errichtet sich magisch", "Chalet constructs itself magically"],
    ["gemeinsame Schlüsselübergabe", "joint key handover"],
    ["Schriftzug auf Dachkante & Bordstein eingebrannt", "Text burnt onto roof edge & curb"],
    ["Edle 3D-Schrift am Schieferdach & Natursteinsockel", "Noble 3D text on slate roof & stone base"],
    
    // Core vocabulary translations
    ["Immobilien", "Real Estate"],
    ["Makler", "Realtor"],
    ["Baugebiet", "Construction site"],
    ["Traumhaus", "Dream house"],
    ["Alpen", "Alps"],
    ["Chalet", "Chalet"],
    ["Sonne", "Sun"],
    ["Abendsonne", "Evening sun"],
    ["Poolwasser", "Pool water"],
    ["Wohnfläche", "Living space"],
    ["Solardach", "Solar roof"],
    ["Südausrichtung", "South orientation"],
    ["Baugrundstück", "Building plot"],
    ["Bergblick", "Mountain view"],
    ["Massivholz", "Solid wood"],
    ["Echtholz", "Real wood"],
    ["Handwerkskunst", "Craftsmanship"],
    ["Gastro & Bar", "Gastro & Bar"],
    ["Grill Outdoor", "Grill Outdoor"],
    ["Sinnlich & Erotik", "Sensual & Erotic"],
    ["Geburtstag", "Birthday"],
    ["Horror Mystery", "Horror Mystery"],
    ["Sitcom Comedy", "Sitcom Comedy"],
    ["Sci-Fi Weltraum", "Sci-Fi Space"],
    ["Cyberpunk", "Cyberpunk"],
    ["Bau Handwerk", "Construction Craft"],
    ["Action Blockbuster", "Action Blockbuster"],
    ["Dark Fantasy", "Dark Fantasy"],
    ["Natur Outdoor", "Nature Outdoor"],
    ["Kriegsfilm", "War movie"],
    ["Politik", "Politics"],
    ["Ego-POV Ads", "First-Person POV Ads"],
    ["Werbe-Vorlagen", "Commercial Presets"],
    ["Kino & Trailer", "Cinema & Trailers"],
    ["Aktiv:", "Active:"],
    ["Alle (184+)", "All (184+)"],
  ];

  // Global case-insensitive replacement
  for (const [de, en] of dict) {
    const regex = new RegExp(de, 'g');
    res = res.replace(regex, en);
  }

  // Additional fine-tuning replacements
  res = res
    .replace(/Werbespot/g, 'commercial')
    .replace(/Werbe-Branche/g, 'Advertising Industry')
    .replace(/Kategorie/g, 'Category')
    .replace(/Sternekoch/g, 'Michelin Star Chef')
    .replace(/Küche/g, 'Cuisine')
    .replace(/Sterne-Gastronomie/g, 'Michelin Gastronomy')
    .replace(/Sterne-Restaurant/g, 'Michelin Restaurant')
    .replace(/Abspann/g, 'outro end card')
    .replace(/Jubiläum/g, 'anniversary')
    .replace(/Wahlkampf/g, 'election campaign')
    .replace(/Kriegsfilm/g, 'military war film')
    .replace(/Abendsonne/g, 'evening sun')
    .replace(/Exklusives/g, 'exclusive')
    .replace(/Exklusive/g, 'exclusive')
    .replace(/exklusive/g, 'exclusive')
    .replace(/Exklusiver/g, 'exclusive');

  return res;
}

export function applyCommercialPresetToPrompt(
  basePrompt: string,
  commercialPresetId?: string,
  commercialClaim?: string,
  commercialBrandName?: string,
  commercialCallToAction?: string,
  commercialOutroStyle?: string,
  commercialOutroAnimation?: string,
  spatialTextEnabled?: boolean,
  spatialTextPosition?: string,
  spatialTextContent?: string
): string {
  let result = basePrompt;
  let effectiveClaim = commercialClaim;
  let effectiveBrand = commercialBrandName;
  let effectiveAnim = commercialOutroAnimation;
  let effectiveSpatialEnabled = spatialTextEnabled;
  let effectiveSpatialContent = spatialTextContent;
  let effectiveSpatialPos = spatialTextPosition;

  if (commercialPresetId && commercialPresetId !== 'none') {
    const preset = COMMERCIAL_MASTER_PRESETS.find(p => p.id === commercialPresetId);
    if (preset) {
      if (effectiveClaim === undefined) effectiveClaim = preset.defaultClaim;
      if (effectiveBrand === undefined) effectiveBrand = preset.defaultBrand;
      if (effectiveAnim === undefined) effectiveAnim = preset.defaultOutroAnimation;
      if (effectiveSpatialContent === undefined && preset.defaultSpatialText) effectiveSpatialContent = preset.defaultSpatialText;
      if (effectiveSpatialEnabled === undefined && preset.defaultSpatialText) effectiveSpatialEnabled = true;
      if (effectiveSpatialPos === undefined && preset.spatialPositionDefault) effectiveSpatialPos = preset.spatialPositionDefault;

      const refHint = preset.referenceImagesHint ? ` Reference Sequence: [${preset.referenceImagesHint}].` : '';
      const spatialHint = preset.defaultSpatialText ? ` In-Scene Selling Point: [${preset.defaultSpatialText}].` : '';
      const presetSnippet = `[COMMERCIAL MASTER AD PRODUCTION (${preset.badge}): Client: ${preset.clientType}.${refHint}${spatialHint} Camera Setup: ${preset.cameraSetup}. Lighting: ${preset.lightingStyle}. Lens Choice: ${preset.lensChoice}. Color Grading: ${preset.colorGrading}. Visual Direction: ${preset.promptSnippet}]`;
      result = `${result} ${presetSnippet}`;
    }
  }

  const outroBlock = formatCommercialOutroAbspann(
    effectiveClaim,
    effectiveBrand,
    commercialCallToAction,
    commercialOutroStyle,
    effectiveAnim,
    effectiveSpatialEnabled,
    effectiveSpatialPos,
    effectiveSpatialContent
  );

  if (outroBlock) {
    result = `${result} ${outroBlock}`;
  }

  return translateToEnglish(result);
}

export function exportCommercialPresetsToJson(): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(COMMERCIAL_MASTER_PRESETS, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `commercial_100_ad_presets_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
