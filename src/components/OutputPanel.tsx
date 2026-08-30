import React, { useState, useEffect, useMemo } from 'react';
import {
  Copy,
  Check,
  Bookmark,
  ChevronDown,
  Film,
  Clapperboard,
  Mic,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Sliders,
  FolderOpen,
  Layers,
  Eye,
  Wind,
  Footprints,
  Snowflake,
  Hand,
  Search,
  User,
  Users,
  UserCheck,
  X,
  Grid,
  Star,
  Maximize2,
  Minimize2,
  Megaphone,
  Building2,
  UtensilsCrossed,
  Shirt,
  Compass,
  Sofa,
  PenTool,
  Type,
  Lightbulb,
  CheckCircle2,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  AlignLeft,
  Columns,
  Clock,
  FileText,
  Volume2,
} from 'lucide-react';
import { PromptBuildState, PresetTemplate, PersonCountType } from '../types';
import { PRESET_TEMPLATES, loadVariantTemplates } from '../data/presets';
import {
  POV_FOOTSTEPS_OPTIONS,
  POV_BREATH_VAPOR_OPTIONS,
  POV_HANDS_OPTIONS,
  POV_WEATHER_IMMERSION_OPTIONS,
} from '../data/parameters';
import {
  compileCleanVisualVideoPrompt,
  compileCleanAudioVoiceoverPrompt,
  compileStudioTheatricalScript,
  compileLocalPipelinePrompt,
  getCategoryDefaultReferences,
  generateExtrapolatedWindowsForTemplate,
} from '../utils/promptCompiler';
import { ANALOG_MASTER_PRESETS } from '../utils/analogMasterEngine';
import { COMMERCIAL_MASTER_PRESETS, CommercialPreset } from '../utils/commercialMasterEngine';
import {
  getSubcategoriesForCategory,
  filterTemplatesBySubcategory,
  getTemplateSubcategory,
} from '../data/subcategories';

interface OutputPanelProps {
  state: PromptBuildState;
  onCopyPrompt: (text: string) => void;
  onCopyMaestro: (text: string) => void;
  onSavePreset: () => void;
  onLoadTemplate?: (tpl: PresetTemplate) => void;
  onUpdateState?: React.Dispatch<React.SetStateAction<PromptBuildState>>;
  onShowToast?: (msg: string) => void;
}

const SAMPLE_COMMERCIAL_CLAIMS: Record<string, { brand: string; claim: string; cta: string }[]> = {
  immobilien: [
    { brand: 'GENESIS LUXURY HOMES', claim: 'Vom ersten Spatenstich zu Ihrem Wohntraum.', cta: 'Exklusive Neubauprojekte anfragen | www.genesis-homes.de' },
    { brand: 'ARCHITECTURAL LIVING', claim: 'Ihr Raum. Ihre Vision. Ihre Realität.', cta: 'Virtuellen 3D-Rundgang starten | www.architectural-living.com' },
    { brand: 'SKYLINE RESIDENCES', claim: 'Living Above the Ordinary.', cta: 'Schedule Your Private Penthouse Viewing | www.skyline.luxury' },
    { brand: 'COSTA REALTY LUXURY', claim: 'Your Sanctuary by the Sea.', cta: 'Explore Prime Coastal Estates | www.costa-realty.com' },
  ],
  food: [
    { brand: 'PRIME CUT STEAKHOUSE', claim: 'Leidenschaft, die man schmeckt.', cta: 'Tisch im Steakhouse reservieren | www.primecut.restaurant' },
    { brand: 'HERITAGE SOURDOUGH', claim: 'Echtes Handwerk. Pure Zeit.', cta: 'Frische handgemachte Sauerteigbrote bestellen' },
    { brand: 'SUSHI OMAKASE TOKYO', claim: 'Perfektion in jedem Reiskorn.', cta: 'Exklusives Omakase-Menü anfragen | www.sushi-omakase.jp' },
    { brand: 'PIZZERIA NAPOLETANA', claim: 'Aus Neapel mit Liebe gebacken.', cta: 'Original Holzofen-Pizzen online ordern' },
  ],
  fashion: [
    { brand: 'MAISON DE HAUTE COUTURE', claim: 'Elegance is an Attitude.', cta: 'Discover the New Autumn Runway Collection' },
    { brand: 'NEO-TOKYO STREETWEAR', claim: 'Rule the Concrete Jungle.', cta: 'Limited Drop Online Now | www.neotokyo.fashion' },
    { brand: 'CHRONOMETRE GENÈVE', claim: 'Mastery Over Every Second.', cta: 'Find an Authorized Luxury Boutique' },
  ],
  travel: [
    { brand: 'BORA BORA RESORTS', claim: 'Heaven Found in the South Pacific.', cta: 'Book Your Overwater Dream Escape' },
    { brand: 'SWISS ALPS TRAVEL', claim: 'The Slowest Express Train in the World.', cta: 'Reserve First-Class Panoramic Seats' },
    { brand: 'VISIT JAPAN', claim: 'Rediscover Your Inner Harmony.', cta: 'Plan Your Cultural Journey to Japan' },
  ],
  inneneinrichtung: [
    { brand: 'KØBENHAVN DESIGN', claim: 'Designed for Living. Crafted to Last.', cta: 'Order the New 2026 Living Catalog' },
    { brand: 'VALENTINI CUCINE', claim: 'The Heart of the Home, Reimagined.', cta: 'Book Your Bespoke Kitchen Consultation' },
    { brand: 'JAPANDI LIVING', claim: 'Harmony in Simplicity.', cta: 'Browse Handcrafted Hinoki Furniture' },
  ],
  comic: [
    { brand: 'CARTOON CRAFT ADS', claim: 'Simple. Clever. Unforgettable.', cta: 'Start Your Explainer Video Campaign' },
    { brand: 'VINTAGE POP SODA', claim: 'Good Old Fashioned Quality!', cta: 'Grab an Ice-Cold Refreshing Bottle' },
    { brand: 'FLOWSTACK SAAS', claim: 'Work Smarter. Scale Faster.', cta: 'Start Free 14-Day Pro Trial' },
  ],
};

// Helper parser to turn raw script into structured visual sections for comfortable reading
function parseStructuredSections(text: string) {
  const lines = text.split('\n');
  const sections: { title: string; type: string; content: string[] }[] = [];
  let currentTitle = 'Prompt';
  let currentType = 'general';
  let currentLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed.startsWith('WINDOW') ||
      trimmed.startsWith('SCENE') ||
      trimmed.startsWith('SHOT') ||
      trimmed.startsWith('---') ||
      trimmed.startsWith('###') ||
      trimmed.startsWith('[SCENE')
    ) {
      if (currentLines.length > 0) {
        sections.push({ title: currentTitle, type: currentType, content: currentLines });
        currentLines = [];
      }
      currentTitle = trimmed.replace(/^[#-]+\s*/, '');
      currentType = 'scene';
    } else if (trimmed.startsWith('VOICEOVER') || trimmed.startsWith('AUDIO') || trimmed.startsWith('SPEAKER') || trimmed.startsWith('DIALOGUE')) {
      if (currentLines.length > 0) {
        sections.push({ title: currentTitle, type: currentType, content: currentLines });
        currentLines = [];
      }
      currentTitle = trimmed;
      currentType = 'audio';
    } else if (trimmed.startsWith('CLAIM') || trimmed.startsWith('OUTRO') || trimmed.startsWith('BRAND') || trimmed.startsWith('CTA')) {
      if (currentLines.length > 0) {
        sections.push({ title: currentTitle, type: currentType, content: currentLines });
        currentLines = [];
      }
      currentTitle = trimmed;
      currentType = 'commercial';
    } else {
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0) {
    sections.push({ title: currentTitle, type: currentType, content: currentLines });
  }

  return sections;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  state,
  onCopyPrompt,
  onCopyMaestro,
  onSavePreset,
  onLoadTemplate,
  onUpdateState,
  onShowToast,
}) => {
  // Panel Modes: normal, minimized, maximized
  const [panelMode, setPanelMode] = useState<'normal' | 'minimized' | 'maximized'>('normal');



  // Format Modes: clean_video, clean_audio, studio_script, local_pipeline
  const [formatMode, setFormatMode] = useState<'clean_video' | 'clean_audio' | 'studio_script' | 'local_pipeline'>('studio_script');

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // 📖 READABILITY & UX CONTROLS
  // Font Size: 'sm' (13px), 'md' (15px), 'lg' (17px), 'xl' (20px)
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  // Typography Style: 'sans' (Modern Editorial - High Legibility) vs 'mono' (Studio Monospace)
  const [readerFontFamily, setReaderFontFamily] = useState<'sans' | 'mono'>('sans');
  // Line Height: 'normal' (1.5) vs 'relaxed' (1.8)
  const [readerLineHeight, setReaderLineHeight] = useState<'normal' | 'relaxed'>('relaxed');
  // Reading Theme: 'dark' (Default Studio Dark), 'oled' (High Contrast OLED Black), 'paper' (High Contrast Light Paper)
  const [readerTheme, setReaderTheme] = useState<'dark' | 'oled' | 'paper'>('dark');
  // View Mode: 'formatted' (Structured Visual Sections) vs 'raw' (Plain Text Box)
  const [readerViewMode, setReaderViewMode] = useState<'formatted' | 'raw'>('raw');
  // Height presets: 'compact' (160px), 'comfortable' (260px), 'expanded' (400px)
  const [readerHeight, setReaderHeight] = useState<'compact' | 'comfortable' | 'expanded'>('comfortable');

  // Tab (1) Standard Filters & Controls
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [showPovSettings, setShowPovSettings] = useState(false);
  const [compilerSearchQuery, setCompilerSearchQuery] = useState<string>('');
  const [compilerPersonFilter, setCompilerPersonFilter] = useState<'all' | PersonCountType>('all');
  const [compilerPictureFilter, setCompilerPictureFilter] = useState<'all' | '1' | '2' | 'multi'>('all');
  const [showGridDrawer, setShowGridDrawer] = useState<boolean>(false);

  // Tab (2) Commercial Ads Filters & Controls
  const [commercialCategoryFilter, setCommercialCategoryFilter] = useState<'all' | 'immobilien' | 'food' | 'fashion' | 'travel' | 'inneneinrichtung' | 'comic'>('all');
  const [commercialQuickFilter, setCommercialQuickFilter] = useState<'all' | 'genesis_immo' | 'floorplan_immo' | 'chef_food' | 'claim_ready'>('all');
  const [commercialSearchQuery, setCommercialSearchQuery] = useState<string>('');
  const [showCommercialGridDrawer, setShowCommercialGridDrawer] = useState<boolean>(false);
  const [showClaimStudio, setShowClaimStudio] = useState<boolean>(true);

  const [lazyCompilerTemplates, setLazyCompilerTemplates] = useState<PresetTemplate[]>([]);

  // Load variant templates dynamically on demand when sidebar compiler filters are applied
  useEffect(() => {
    let active = true;
    const fetchVariants = async () => {
      const promises: Promise<PresetTemplate[]>[] = [];

      if (compilerPersonFilter !== 'all') {
        promises.push(loadVariantTemplates('person', compilerPersonFilter));
      }

      if (compilerPictureFilter !== 'all') {
        const val = compilerPictureFilter === '1' ? '1' : compilerPictureFilter === '2' ? '2' : 'multi';
        promises.push(loadVariantTemplates('picture', val));
      }

      if (promises.length > 0) {
        const results = await Promise.all(promises);
        if (active) {
          const combined = results.flat();
          const seen = new Set<string>();
          const unique: PresetTemplate[] = [];
          for (const item of combined) {
            if (!seen.has(item.id)) {
              seen.add(item.id);
              unique.push(item);
            }
          }
          setLazyCompilerTemplates(unique);
        }
      } else {
        if (active) {
          setLazyCompilerTemplates([]);
        }
      }
    };
    fetchVariants();
    return () => {
      active = false;
    };
  }, [compilerPersonFilter, compilerPictureFilter]);

  const allCompilerTemplates = useMemo(() => {
    const combined = [...PRESET_TEMPLATES, ...lazyCompilerTemplates];
    const seen = new Set<string>();
    return combined.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [lazyCompilerTemplates]);

  // User Rating Persistence State
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem('maestro_script_ratings');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const currentRating = ratings[state.selectedPresetId || state.commercialPresetId || 'custom'] || 0;

  const handleRate = (stars: number) => {
    const key = state.selectedPresetId || state.commercialPresetId || 'custom';
    const updated = { ...ratings, [key]: stars };
    setRatings(updated);
    localStorage.setItem('maestro_script_ratings', JSON.stringify(updated));
    if (onShowToast) {
      onShowToast(
        state.language === 'en'
          ? `⭐ Rated ${stars}/5 Stars! Thank you for your review.`
          : `⭐ Mit ${stars}/5 Sternen bewertet! Danke für dein Feedback.`
      );
    }
  };

  // Localization Dictionary
  const langKey = state.language === 'en' ? 'en' : 'de';
  const isEn = langKey === 'en';
  const translations = {
    de: {
      title: 'STUDIO PROMPT COMPILER',
      cleanVideo: 'Sauberen Video-Prompt',
      noReading: 'Kein Vorlesen!',
      audioVo: 'Audio & Voiceover',
      theatrical: 'Regie-Drehbuch',
      format: 'Format',
      duration: 'Dauer',
      minimize: 'Minimieren',
      maximize: 'Anzeigen',
      cleanVideoBanner:
        'Clean-Video Filter aktiv: Alle Meta-Labels (wie "Camera:", "Lighting:") wurden als fließender Text formatiert. KI-Generatoren (Hailuo, MiniMax, Kling, Sora, Runway, Luma) lesen keine Prompt-Texte vor!',
      audioVoBanner:
        'Audio & Voiceover Modus: Bietet sauberen Sprechertext und Sound-Effekt Anweisungen für ElevenLabs, Suno oder Audio-KI.',
      theatricalBanner:
        'Regie-Drehbuch Modus: Strukturierter multi-shot Prompt inklusive Timestamps für professionelle Filmplanung.',
      povActiveBanner:
        '🥽 Immersive Ego-Perspektive aktiv: Physikalische Schritt-Kinetik (Head-Bob), sichtbare Hände & realistischer Atemluft-Dampf bei Kälte werden direkt in die Video- & Audio-Prompts einkompiliert!',
      category: 'Kategorie:',
      subcategory: 'Subkategorie:',
      selectTemplate: 'Direkt wählen...',
      prev: 'Vorherige',
      next: 'Nächste',
      copied: 'Text Kopiert!',
      copyCleanVideo: 'Sauberen Video-Prompt Kopieren',
      copyAudio: 'Audio & Voiceover Kopieren',
      copyScript: 'Vollständiges Drehbuch Kopieren',
      saved: 'Gespeichert!',
      saveAsTemplate: 'Als Vorlage speichern',
      tip: 'Tipp: Kopiere den Sauberen Video-Prompt in Hailuo / MiniMax H3 / Kling / Sora / Luma, um perfekte Videos ohne vorgelesene Labels zu erhalten!',
      povToggle: 'Ego-Perspektive (POV)',
      povFootsteps: 'Schritt-Kinetik:',
      povBreath: 'Atemluft-Dampf:',
      povHands: 'Sichtbare Hände:',
      povWeather: 'Wetter / Linse:',
      povCustomize: 'Anpassen',
      textSize: 'Textgröße',
      fontStyle: 'Schriftstil',
      theme: 'Lesemodus',
    },
    en: {
      title: 'STUDIO PROMPT COMPILER',
      cleanVideo: 'Clean Video Prompt',
      noReading: 'No Speech Aloud!',
      audioVo: 'Audio & Voiceover',
      theatrical: 'Theatrical Screenplay',
      format: 'Aspect Ratio',
      duration: 'Duration',
      minimize: 'Minimize',
      maximize: 'Expand',
      cleanVideoBanner:
        'Clean Video Filter active: All meta labels (like "Camera:", "Lighting:") have been formatted as seamless flowing description text. AI Generators (Hailuo, MiniMax, Kling, Sora, Runway, Luma) will not read aloud prompt labels!',
      audioVoBanner:
        'Audio & Voiceover Mode: Provides clean speaker lines and sound effects directions for ElevenLabs, Suno, or other audio generators.',
      theatricalBanner:
        'Theatrical Screenplay Mode: Structured multi-shot script structure with exact time blocks for professional cinematographic planning.',
      povActiveBanner:
        '🥽 Immersive First-Person POV active: Realistic walking footsteps head-bob kinetics, visible interaction hands & cold breath condensation steam are seamlessly compiled into video and audio prompts!',
      category: 'Category:',
      subcategory: 'Subcategory:',
      selectTemplate: 'Direct Select...',
      prev: 'Previous',
      next: 'Next',
      copied: 'Text Copied!',
      copyCleanVideo: 'Copy Clean Video Prompt',
      copyAudio: 'Copy Audio & Voiceover',
      copyScript: 'Copy Complete Screenplay',
      saved: 'Saved!',
      saveAsTemplate: 'Save as Template',
      tip: 'Tip: Copy the Clean Video Prompt into Hailuo / MiniMax H3 / Kling / Sora / Luma to generate perfect cinematics without unneeded speech rendering!',
      povToggle: 'Immersive POV',
      povFootsteps: 'Footsteps Kinetics:',
      povBreath: 'Breath Vapor:',
      povHands: 'Visible Hands:',
      povWeather: 'Weather / Lens:',
      povCustomize: 'Customize',
      textSize: 'Text Size',
      fontStyle: 'Font Style',
      theme: 'Reading Mode',
    },
  }[langKey];

  // POV is ALWAYS OFF by default. User must explicitly click to activate.
  const handleTogglePov = () => {
    if (!onUpdateState) return;
    onUpdateState((prev) => {
      const nextActive = !prev.isImmersivePov;
      return {
        ...prev,
        isImmersivePov: nextActive,
        povFootsteps: prev.povFootsteps || 'walking_bob',
        povBreathVapor: prev.povBreathVapor || 'auto',
        povInteractiveHands: prev.povInteractiveHands || 'holding_equipment',
        povWeatherImmersion: prev.povWeatherImmersion || 'auto',
        povVisceralAudio: nextActive ? (prev.povVisceralAudio ?? true) : false,
      };
    });
    if (onShowToast) {
      onShowToast(!state.isImmersivePov ? (isEn ? '🥽 POV Mode Enabled' : '🥽 Ego-Perspektive aktiviert') : (isEn ? '🚫 POV Mode Disabled' : '🚫 Ego-Perspektive deaktiviert'));
    }
  };

  // Template & Category resolution for Tab 1
  const currentTemplate = allCompilerTemplates.find((t) => t.id === state.selectedPresetId);
  const activeCategory = (currentTemplate?.category || state.category || 'birthday') as string;
  const currentSubcatInfo = currentTemplate ? getTemplateSubcategory(currentTemplate, langKey) : null;

  // Categories lookup for Tab 1
  const CATEGORIES = [
    { value: 'birthday', label: '🎂 Geburtstag, Jubiläum & Party', count: allCompilerTemplates.filter((t) => t.category === 'birthday').length },
    { value: 'immobilien', label: '🏠 Immobilien & Grundrisse', count: allCompilerTemplates.filter((t) => t.category === 'immobilien').length },
    { value: 'bau', label: '🏗️ Bau & Handwerk', count: allCompilerTemplates.filter((t) => t.category === 'bau').length },
    { value: 'travel', label: '🏖️ Tourismus & Reisen', count: allCompilerTemplates.filter((t) => t.category === 'travel').length },
    { value: 'comic', label: '📖 Comic & Strichmännchen', count: allCompilerTemplates.filter((t) => t.category === 'comic').length },
    { value: 'horror', label: '🔥 Horror & Grusel', count: allCompilerTemplates.filter((t) => t.category === 'horror').length },
    { value: 'scify', label: '🚀 Sci-Fi & Weltall', count: allCompilerTemplates.filter((t) => t.category === 'scify').length },
    { value: 'action', label: '⚡ Action & Chase', count: allCompilerTemplates.filter((t) => t.category === 'action').length },
    { value: 'war', label: '🎖️ Kriegsfilm & Front', count: allCompilerTemplates.filter((t) => t.category === 'war').length },
    { value: 'politics', label: '🏛️ Wahlkampf & Politik', count: allCompilerTemplates.filter((t) => t.category === 'politics').length },
    { value: 'fantasy', label: '🧙 Dark Fantasy', count: allCompilerTemplates.filter((t) => t.category === 'fantasy').length },
    { value: 'cyberpunk', label: '✨ Cyberpunk', count: allCompilerTemplates.filter((t) => t.category === 'cyberpunk').length },
    { value: 'sitcom', label: '📺 Sitcom & Comedy', count: allCompilerTemplates.filter((t) => t.category === 'sitcom').length },
    { value: 'nature', label: '🌿 Natur & Landschaft', count: allCompilerTemplates.filter((t) => t.category === 'nature').length },
    { value: 'restaurant', label: '🍽️ Food & Dining', count: allCompilerTemplates.filter((t) => t.category === 'restaurant').length },
    { value: 'fashion', label: '👗 Fashion & Style', count: allCompilerTemplates.filter((t) => t.category === 'fashion').length },
    { value: 'lingerie', label: '🖤 Haute Lingerie (SW)', count: allCompilerTemplates.filter((t) => t.category === 'lingerie').length },
    { value: 'erotik', label: '❤️ Erotik & Akt-Modus', count: allCompilerTemplates.filter((t) => t.category === 'erotik').length },
    { value: 'custom', label: '✨ Eigene Vorlage', count: allCompilerTemplates.filter((t) => t.category === 'custom').length },
  ];

  // Available Subcategories for the active category
  const availableSubcategories = useMemo(() => {
    return getSubcategoriesForCategory(activeCategory, allCompilerTemplates, langKey);
  }, [activeCategory, langKey, allCompilerTemplates]);

  // When active category changes, if current subcategory is not available, reset to 'all'
  useEffect(() => {
    if (selectedSubcategory !== 'all') {
      const exists = availableSubcategories.some((s) => s.id === selectedSubcategory);
      if (!exists) {
        setSelectedSubcategory('all');
      }
    }
  }, [activeCategory, availableSubcategories, selectedSubcategory]);

  // Active filtered templates for Tab 1
  const activeCycleTemplates = useMemo(() => {
    let list = filterTemplatesBySubcategory(allCompilerTemplates, activeCategory, selectedSubcategory);

    if (compilerPersonFilter !== 'all') {
      list = list.filter((t) => t.personCount === compilerPersonFilter);
    }

    if (compilerPictureFilter !== 'all') {
      list = list.filter((t) => {
        let tplPicCount: '1' | '2' | 'multi' = '1';
        if (t.windowsCount && t.windowsCount >= 4) {
          tplPicCount = 'multi';
        } else if (t.windowsCount === 2) {
          tplPicCount = '2';
        } else {
          const promptLower = (t.prompt || '').toLowerCase();
          if (promptLower.includes('picture 4') || promptLower.includes('picture 3')) {
            tplPicCount = 'multi';
          } else if (promptLower.includes('picture 2')) {
            tplPicCount = '2';
          }
        }
        return tplPicCount === compilerPictureFilter;
      });
    }

    if (compilerSearchQuery.trim()) {
      const q = compilerSearchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.prompt.toLowerCase().includes(q) ||
          (t.badge && t.badge.toLowerCase().includes(q)) ||
          (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q)))
      );
    }

    return list;
  }, [
    activeCategory,
    selectedSubcategory,
    compilerPersonFilter,
    compilerPictureFilter,
    compilerSearchQuery,
    allCompilerTemplates,
  ]);

  const currentIndex = activeCycleTemplates.findIndex((t) => t.id === state.selectedPresetId);

  const handlePrevTemplate = () => {
    if (!onLoadTemplate || activeCycleTemplates.length === 0) return;
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = activeCycleTemplates.length - 1;
    }
    onLoadTemplate(activeCycleTemplates[newIndex]);
  };

  const handleNextTemplate = () => {
    if (!onLoadTemplate || activeCycleTemplates.length === 0) return;
    let newIndex = currentIndex + 1;
    if (newIndex >= activeCycleTemplates.length) {
      newIndex = 0;
    }
    onLoadTemplate(activeCycleTemplates[newIndex]);
  };

  const handleCategoryChange = (cat: string) => {
    if (onUpdateState) {
      onUpdateState((prev) => ({ ...prev, category: cat as any }));
    }
    if (!onLoadTemplate) return;
    setSelectedSubcategory('all');
    const targetTemplates = allCompilerTemplates.filter((t) => t.category === cat);
    if (targetTemplates.length > 0) {
      onLoadTemplate(targetTemplates[0]);
    }
  };

  const handleSubcategoryChange = (subId: string) => {
    setSelectedSubcategory(subId);
    if (!onLoadTemplate) return;
    const filtered = filterTemplatesBySubcategory(allCompilerTemplates, activeCategory, subId);
    if (filtered.length > 0) {
      const stillInList = filtered.some((t) => t.id === state.selectedPresetId);
      if (!stillInList) {
        onLoadTemplate(filtered[0]);
      }
    }
  };

  const handleDirectTemplateSelect = (templateId: string) => {
    if (!onLoadTemplate) return;
    const target = allCompilerTemplates.find((t) => t.id === templateId);
    if (target) {
      onLoadTemplate(target);
    }
  };

  // ==========================================
  // TAB (2) COMMERCIAL ADS LOGIC & FILTERING
  // ==========================================
  const currentCommercialPreset = useMemo(() => {
    return COMMERCIAL_MASTER_PRESETS.find((p) => p.id === state.commercialPresetId) || null;
  }, [state.commercialPresetId]);

  const filteredCommercialPresets = useMemo(() => {
    let list = [...COMMERCIAL_MASTER_PRESETS];

    if (commercialCategoryFilter !== 'all') {
      list = list.filter((p) => p.category === commercialCategoryFilter);
    }

    if (commercialQuickFilter === 'genesis_immo') {
      list = list.filter((p) => (p.bestFor || []).some((t) => t.toLowerCase().includes('genesis') || t.toLowerCase().includes('makler') || t.toLowerCase().includes('bau')));
    } else if (commercialQuickFilter === 'floorplan_immo') {
      list = list.filter((p) => (p.bestFor || []).some((t) => t.toLowerCase().includes('grundriss') || t.toLowerCase().includes('floorplan') || t.toLowerCase().includes('3d')));
    } else if (commercialQuickFilter === 'chef_food') {
      list = list.filter((p) => (p.bestFor || []).some((t) => t.toLowerCase().includes('chef') || t.toLowerCase().includes('sternekoch') || t.toLowerCase().includes('foodporn') || t.toLowerCase().includes('koch')));
    } else if (commercialQuickFilter === 'claim_ready') {
      list = list.filter((p) => Boolean(p.defaultClaim));
    }

    if (commercialSearchQuery.trim()) {
      const q = commercialSearchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.defaultBrand && p.defaultBrand.toLowerCase().includes(q)) ||
          (p.defaultClaim && p.defaultClaim.toLowerCase().includes(q)) ||
          (p.bestFor && p.bestFor.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return list;
  }, [commercialCategoryFilter, commercialQuickFilter, commercialSearchQuery]);

  const handleSelectCommercialPreset = (presetId: string) => {
    const preset = COMMERCIAL_MASTER_PRESETS.find((p) => p.id === presetId);
    if (!preset || !onUpdateState) return;

    onUpdateState((prev) => ({
      ...prev,
      commercialPresetId: preset.id,
      rawConcept: preset.promptSnippet,
      cameraMotion: preset.cameraSetup,
      lighting: preset.lightingStyle,
      lensStyle: preset.lensChoice,
      commercialBrandName: prev.commercialBrandName || preset.defaultBrand || '',
      commercialClaim: prev.commercialClaim || preset.defaultClaim || '',
      commercialCallToAction: prev.commercialCallToAction || '',
      commercialOutroStyle: prev.commercialOutroStyle || 'cinematic_fade_black',
    }));

    if (onShowToast) {
      onShowToast(
        isEn
          ? `📢 Commercial Preset "${preset.name}" activated!`
          : `📢 Werbe-Preset "${preset.name}" aktiviert!`
      );
    }
  };

  const handleApplySampleClaim = (sample: { brand: string; claim: string; cta: string }) => {
    if (!onUpdateState) return;
    onUpdateState((prev) => ({
      ...prev,
      commercialBrandName: sample.brand,
      commercialClaim: sample.claim,
      commercialCallToAction: sample.cta,
    }));
    if (onShowToast) {
      onShowToast(isEn ? `✨ Brand Claim "${sample.brand}" applied!` : `✨ Slogan "${sample.brand}" übernommen!`);
    }
  };

  // Compile output prompts based on active format mode
  const cleanVideoPrompt = compileCleanVisualVideoPrompt(state);
  const cleanAudioScript = compileCleanAudioVoiceoverPrompt(state);
  const studioScript = compileStudioTheatricalScript(state);
  const localPipelinePrompt = compileLocalPipelinePrompt(state);

  const activeOutputText =
    formatMode === 'clean_video'
      ? cleanVideoPrompt
      : formatMode === 'clean_audio'
      ? cleanAudioScript
      : formatMode === 'local_pipeline'
      ? localPipelinePrompt
      : studioScript;

  // Text metrics calculation
  const textStats = useMemo(() => {
    const words = activeOutputText.trim() ? activeOutputText.trim().split(/\s+/).length : 0;
    const chars = activeOutputText.length;
    // Average speech rate is ~130 words per minute (~2.16 words/sec)
    const spokenSeconds = Math.round(words / 2.16);
    return { words, chars, spokenSeconds };
  }, [activeOutputText]);

  const handleCopy = () => {
    onCopyPrompt(activeOutputText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleSave = () => {
    onSavePreset();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Structured Sections for visual formatted view
  const structuredSections = useMemo(() => {
    return parseStructuredSections(activeOutputText);
  }, [activeOutputText]);

  // CSS Styling maps for Reader Mode
  const fontSizeClass =
    readerFontSize === 'sm'
      ? 'text-xs leading-relaxed'
      : readerFontSize === 'md'
      ? 'text-sm leading-relaxed sm:text-[15px]'
      : readerFontSize === 'lg'
      ? 'text-base leading-loose sm:text-[17px]'
      : 'text-lg leading-loose sm:text-[19px]';

  const fontFamilyClass = readerFontFamily === 'mono' ? 'font-mono' : 'font-sans';
  const lineHeightClass = readerLineHeight === 'relaxed' ? 'leading-loose' : 'leading-relaxed';

  const themeClasses =
    readerTheme === 'paper'
      ? 'bg-amber-50 text-slate-900 border-amber-200 selection:bg-amber-200 selection:text-slate-950'
      : readerTheme === 'oled'
      ? 'bg-black text-slate-100 border-slate-700 selection:bg-emerald-800 selection:text-white'
      : 'bg-slate-900/95 text-slate-200 border-slate-800 selection:bg-amber-500/30 selection:text-amber-200';

  const heightClass =
    panelMode === 'maximized'
      ? 'max-h-[75vh]'
      : readerHeight === 'compact'
      ? 'max-h-36'
      : readerHeight === 'comfortable'
      ? 'max-h-64'
      : 'max-h-96';

  const containerClasses =
    panelMode === 'maximized'
      ? 'fixed inset-0 top-0 left-0 lg:left-72 z-50 bg-slate-950/99 p-6 sm:p-8 overflow-y-auto text-white shadow-2xl flex flex-col justify-start'
      : panelMode === 'minimized'
      ? 'fixed bottom-0 left-0 lg:left-72 right-0 z-50 h-12 px-4 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl text-white flex items-center justify-between'
      : 'fixed bottom-0 left-0 lg:left-72 right-0 z-50 p-2.5 sm:p-3.5 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl text-white transition-all';

  return (
    <div className={containerClasses} id="studio-prompt-compiler-panel">
      <div className={panelMode === 'maximized' ? 'max-w-6xl w-full mx-auto space-y-4' : 'max-w-7xl mx-auto space-y-2.5'}>
        {/* Panel Header & Tab Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0 mr-1">
              <Clapperboard className="w-4 h-4 text-amber-400" />
              {translations.title}
            </span>

            {/* Format Toggle Pills (hidden when minimized) */}
            {panelMode !== 'minimized' && (
              <div className="inline-flex p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-[11px] flex-wrap gap-0.5 ml-1">
                <button
                  onClick={() => setFormatMode('clean_video')}
                  className={`px-2.5 py-1 rounded-md font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    formatMode === 'clean_video'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  {translations.cleanVideo}
                  <span className="hidden xl:inline-block px-1.5 py-0.2 bg-emerald-950 text-emerald-300 text-[9px] font-black rounded border border-emerald-500/40">
                    {translations.noReading}
                  </span>
                </button>

                <button
                  onClick={() => setFormatMode('clean_audio')}
                  className={`px-2.5 py-1 rounded-md font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    formatMode === 'clean_audio'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  {translations.audioVo}
                </button>

                <button
                  onClick={() => setFormatMode('studio_script')}
                  className={`px-2.5 py-1 rounded-md font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    formatMode === 'studio_script'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Clapperboard className="w-3.5 h-3.5" />
                  {translations.theatrical}
                </button>

                <button
                  onClick={() => setFormatMode('local_pipeline')}
                  className={`px-2.5 py-1 rounded-md font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    formatMode === 'local_pipeline'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Local Model
                  <span className="hidden xl:inline-block px-1 py-0.2 bg-purple-950 text-purple-300 text-[8px] font-black rounded border border-purple-500/40">
                    Wan/Comfy
                  </span>
                </button>
              </div>
            )}

            {/* 🥽 POV TOGGLE BUTTON (ALWAYS OFF BY DEFAULT - CLICK TO ACTIVATE) */}
            {panelMode !== 'minimized' && onUpdateState && (
              <button
                id="output-pov-toggle-btn"
                type="button"
                onClick={handleTogglePov}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all flex items-center gap-1.5 border shadow-xs cursor-pointer ${
                  state.isImmersivePov
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 border-cyan-300 shadow-cyan-500/20 font-black'
                    : 'bg-slate-900/90 text-cyan-300/80 hover:text-cyan-200 border-cyan-900/60 hover:border-cyan-500/60'
                }`}
                title={isEn ? 'Toggle First-Person POV (Off by default)' : 'Ego-Perspektive an/aus (Standardmäßig AUS)'}
              >
                <Eye className={`w-3.5 h-3.5 ${state.isImmersivePov ? 'text-slate-950 animate-pulse' : 'text-cyan-400'}`} />
                <span className="hidden sm:inline">{translations.povToggle}</span>
                <span
                  className={`px-1 py-0.2 text-[8px] font-black rounded ${
                    state.isImmersivePov
                      ? 'bg-slate-950 text-cyan-300 border border-cyan-400/50'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {state.isImmersivePov ? 'ON' : 'OFF'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Expanded Output Code Window (Hidden when minimized) */}
        {panelMode !== 'minimized' && (
          <div className="space-y-2.5 pt-1 animate-fadeIn">
            {/* Safe Prompt Protection Banner */}
            <div className="bg-emerald-950/80 border border-emerald-600/40 rounded-xl px-3.5 py-1.5 text-[11px] text-emerald-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">
                  {formatMode === 'clean_video' ? (
                    translations.cleanVideoBanner
                  ) : formatMode === 'clean_audio' ? (
                    translations.audioVoBanner
                  ) : (
                    translations.theatricalBanner
                  )}
                </span>
              </div>
            </div>

            {/* 🥽 IMMERSIVE POV SENSORY SIMULATION BAR (ONLY VISIBLE WHEN USER TURNED POV ON!) */}
            {state.isImmersivePov && (
              <div className="bg-gradient-to-r from-cyan-950/90 via-slate-900 to-teal-950/90 border border-cyan-500/50 rounded-xl p-2.5 space-y-2 text-xs shadow-lg shadow-cyan-950/40">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-extrabold">
                    <span className="p-1 bg-cyan-500/20 rounded-lg border border-cyan-400/40 text-cyan-300">
                      <Eye className="w-4 h-4 animate-pulse" />
                    </span>
                    <span>{translations.povActiveBanner}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPovSettings(!showPovSettings)}
                    className="px-2.5 py-1 bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 rounded-lg text-[11px] font-bold border border-cyan-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    {showPovSettings ? (isEn ? 'Hide Controls' : 'Einklappen') : (isEn ? 'Tune Sensory Effects' : 'Sinneseffekte anpassen')}
                  </button>
                </div>

                {/* Sensory Dropdowns & Controls */}
                {showPovSettings && onUpdateState && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 border-t border-cyan-900/60 animate-fadeIn">
                    {/* 1. Footsteps */}
                    <div className="space-y-1 bg-slate-950/80 p-2 rounded-lg border border-cyan-900/40">
                      <label className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
                        <Footprints className="w-3 h-3 text-cyan-400" />
                        {translations.povFootsteps}
                      </label>
                      <select
                        id="output-pov-footsteps"
                        value={state.povFootsteps || 'walking_bob'}
                        onChange={(e) =>
                          onUpdateState((prev) => ({ ...prev, povFootsteps: e.target.value as any }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 text-xs font-semibold focus:outline-none focus:border-cyan-400"
                      >
                        {POV_FOOTSTEPS_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {isEn ? opt.labelEn : opt.labelDe}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 2. Breath Vapor */}
                    <div className="space-y-1 bg-slate-950/80 p-2 rounded-lg border border-cyan-900/40">
                      <label className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
                        <Wind className="w-3 h-3 text-cyan-400" />
                        {translations.povBreath}
                      </label>
                      <select
                        id="output-pov-breath"
                        value={state.povBreathVapor || 'auto'}
                        onChange={(e) =>
                          onUpdateState((prev) => ({ ...prev, povBreathVapor: e.target.value as any }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 text-xs font-semibold focus:outline-none focus:border-cyan-400"
                      >
                        {POV_BREATH_VAPOR_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {isEn ? opt.labelEn : opt.labelDe}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 3. Interactive Hands */}
                    <div className="space-y-1 bg-slate-950/80 p-2 rounded-lg border border-cyan-900/40">
                      <label className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
                        <Hand className="w-3 h-3 text-cyan-400" />
                        {translations.povHands}
                      </label>
                      <select
                        id="output-pov-hands"
                        value={state.povInteractiveHands || 'holding_equipment'}
                        onChange={(e) =>
                          onUpdateState((prev) => ({ ...prev, povInteractiveHands: e.target.value as any }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 text-xs font-semibold focus:outline-none focus:border-cyan-400"
                      >
                        {POV_HANDS_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {isEn ? opt.labelEn : opt.labelDe}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 4. Weather & Lens Droplets */}
                    <div className="space-y-1 bg-slate-950/80 p-2 rounded-lg border border-cyan-900/40">
                      <label className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
                        <Snowflake className="w-3 h-3 text-cyan-400" />
                        {translations.povWeather}
                      </label>
                      <select
                        id="output-pov-weather"
                        value={state.povWeatherImmersion || 'auto'}
                        onChange={(e) =>
                          onUpdateState((prev) => ({ ...prev, povWeatherImmersion: e.target.value as any }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 text-xs font-semibold focus:outline-none focus:border-cyan-400"
                      >
                        {POV_WEATHER_IMMERSION_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {isEn ? opt.labelEn : opt.labelDe}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* VIEW A: TAB (1) STANDARD & CINEMA CONSOLE (DAS NORMALE ZEUG) */}
            {/* ========================================================================= */}
            <div className="space-y-2 animate-fadeIn">
                {/* Auxiliary Controls: Analog Engine + Single/Multi Window Generator Mode */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Analog Master Engine */}
                    {onUpdateState && (
                      <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px]">
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          🎞️ Analog:
                        </span>
                        <select
                          value={state.analogPresetId || 'none'}
                          onChange={(e) => {
                            const val = e.target.value;
                            onUpdateState((prev) => ({
                              ...prev,
                              analogPresetId: val === 'none' ? undefined : val,
                            }));
                          }}
                          className="bg-slate-900 text-slate-200 border border-slate-700 rounded px-2 py-0.5 text-[11px] focus:outline-none focus:border-amber-400 font-mono cursor-pointer max-w-[200px] truncate"
                        >
                          <option value="none">Digital Cinema Standard (Kein Filter)</option>
                          <optgroup label="🎞️ 35mm S/W Kleinbild">
                            {ANALOG_MASTER_PRESETS.filter((p) => p.category === 'bw_35mm').map((p) => (
                              <option key={p.id} value={p.id}>{p.name} ({p.lens})</option>
                            ))}
                          </optgroup>
                          <optgroup label="🎨 35mm Farb-Kleinbild">
                            {ANALOG_MASTER_PRESETS.filter((p) => p.category === 'color_35mm').map((p) => (
                              <option key={p.id} value={p.id}>{p.name} ({p.lens})</option>
                            ))}
                          </optgroup>
                          <optgroup label="📸 Polaroid & Sofortbild">
                            {ANALOG_MASTER_PRESETS.filter((p) => p.category === 'polaroid').map((p) => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                          </optgroup>
                          <optgroup label="📷 Mittelformat (120)">
                            {ANALOG_MASTER_PRESETS.filter((p) => p.category === 'medium_format').map((p) => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                          </optgroup>
                          <optgroup label="🏛️ Großformat & Plattenkamera">
                            {ANALOG_MASTER_PRESETS.filter((p) => p.category === 'large_format').map((p) => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                          </optgroup>
                        </select>
                      </div>
                    )}

                    {/* Single vs 4-Window Toggle */}
                    {(activeCategory === 'immobilien' || activeCategory === 'horror' || activeCategory === 'bau') && onUpdateState && (
                      <div className="inline-flex p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] flex-wrap gap-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            onUpdateState((prev) => ({
                              ...prev,
                              generatorMode: 'single',
                            }));
                          }}
                          className={`px-2.5 py-0.5 rounded-md font-extrabold transition-all flex items-center gap-1 cursor-pointer ${
                            state.generatorMode === 'single'
                              ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Film className="w-3 h-3" />
                          <span>{isEn ? 'Single Clip' : 'Einzelclip'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const tpl =
                              allCompilerTemplates.find((t) => t.id === state.selectedPresetId) ||
                              allCompilerTemplates.find((t) => t.category === activeCategory);
                            const expandedWindows = tpl
                              ? generateExtrapolatedWindowsForTemplate(tpl, 4, state.language === 'en', state.referenceImages.length)
                              : [];
                            onUpdateState((prev) => ({
                              ...prev,
                              generatorMode: 'multi',
                              windows: expandedWindows,
                            }));
                            setFormatMode('studio_script');
                          }}
                          className={`px-2.5 py-0.5 rounded-md font-extrabold transition-all flex items-center gap-1 cursor-pointer ${
                            state.generatorMode === 'multi'
                              ? 'bg-purple-600 text-white border-purple-500 shadow-xs font-black'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Layers className="w-3 h-3" />
                          <span>{isEn ? '4-Window Sequence' : '4-Phasen Sequenz'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Filter Summary Badge */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <span>{activeCycleTemplates.length} Vorlagen verfügbar</span>
                  </div>
                </div>

                {/* Template Selector Bar for Tab 1 */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                  {/* Category Dropdown */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-400 font-bold text-[11px] flex items-center gap-1">
                      <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                      {translations.category}
                    </span>
                    <select
                      id="output-category-select"
                      value={activeCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="bg-slate-950 text-amber-300 font-extrabold border border-slate-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-400 cursor-pointer max-w-[200px]"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label} ({cat.count})
                        </option>
                      ))}
                    </select>

                    {/* Subcategories */}
                    {availableSubcategories.length > 1 && (
                      <div className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 text-[10px] font-mono">{translations.subcategory}</span>
                        <select
                          id="output-subcategory-select"
                          value={selectedSubcategory}
                          onChange={(e) => handleSubcategoryChange(e.target.value)}
                          className="bg-transparent text-emerald-400 font-bold text-xs focus:outline-none cursor-pointer max-w-[160px]"
                        >
                          <option value="all" className="bg-slate-950 text-slate-200">
                            {isEn ? 'All Styles' : 'Alle Subkategorien'} ({allCompilerTemplates.filter((t) => t.category === activeCategory).length})
                          </option>
                          {availableSubcategories.map((sub) => (
                            <option key={sub.id} value={sub.id} className="bg-slate-950 text-emerald-300">
                              {sub.name} ({sub.count})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Template Navigation */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      id="output-prev-template-btn"
                      onClick={handlePrevTemplate}
                      disabled={activeCycleTemplates.length <= 1}
                      className="p-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
                      title={translations.prev}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <select
                      id="output-direct-template-select"
                      value={state.selectedPresetId || (activeCycleTemplates[0]?.id ?? '')}
                      onChange={(e) => handleDirectTemplateSelect(e.target.value)}
                      className="bg-slate-950 text-slate-200 font-bold border border-slate-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-400 cursor-pointer max-w-[220px] sm:max-w-xs truncate"
                    >
                      {activeCycleTemplates.map((tpl, i) => (
                        <option key={tpl.id} value={tpl.id}>
                          {i + 1}. {tpl.title}
                        </option>
                      ))}
                    </select>

                    <button
                      id="output-next-template-btn"
                      onClick={handleNextTemplate}
                      disabled={activeCycleTemplates.length <= 1}
                      className="p-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
                      title={translations.next}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )

            {/* ========================================================================= */}
            {/* 📖 PROMPT READER & OUTPUT DISPLAY WITH FULL UX CUSTOMIZATION */}
            {/* ========================================================================= */}
            <div className="space-y-1.5">
              {/* Top Readability Bar & View Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                {/* Left: Text stats & View Mode */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-0.5 text-[11px] font-mono text-slate-300">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>{textStats.words} Wörter</span>
                    <span className="text-slate-600">|</span>
                    <span>{textStats.chars} Zeichen</span>
                    <span className="text-slate-600">|</span>
                    <Clock className="w-3 h-3 text-emerald-400 ml-0.5" />
                    <span className="text-emerald-300">~{textStats.spokenSeconds}s Sprechdauer</span>
                  </div>

                  {/* Formatted Sections vs Raw Output Mode */}
                  <div className="inline-flex p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px]">
                    <button
                      type="button"
                      onClick={() => setReaderViewMode('raw')}
                      className={`px-2.5 py-0.5 rounded font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        readerViewMode === 'raw'
                          ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <AlignLeft className="w-3 h-3" />
                      <span>Kopiertext</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderViewMode('formatted')}
                      className={`px-2.5 py-0.5 rounded font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        readerViewMode === 'formatted'
                          ? 'bg-indigo-600 text-white shadow-xs font-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Columns className="w-3 h-3" />
                      <span>Strukturierte Regie-Ansicht</span>
                    </button>
                  </div>
                </div>

                {/* Right: Typography & Theme Controls */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Font Size Selector */}
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-1.5 py-0.5 text-[11px] gap-1">
                    <span className="text-slate-400 text-[10px] font-bold">Größe:</span>
                    <button
                      type="button"
                      onClick={() => setReaderFontSize('sm')}
                      className={`px-1.5 py-0.2 rounded font-mono font-bold cursor-pointer ${readerFontSize === 'sm' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                      title="Klein (13px)"
                    >
                      A
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderFontSize('md')}
                      className={`px-1.5 py-0.2 rounded font-mono font-bold text-xs cursor-pointer ${readerFontSize === 'md' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                      title="Standard (15px)"
                    >
                      A
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderFontSize('lg')}
                      className={`px-1.5 py-0.2 rounded font-mono font-bold text-sm cursor-pointer ${readerFontSize === 'lg' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                      title="Groß (17px)"
                    >
                      A
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderFontSize('xl')}
                      className={`px-1.5 py-0.2 rounded font-mono font-bold text-base cursor-pointer ${readerFontSize === 'xl' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                      title="Sehr Groß (19px)"
                    >
                      A+
                    </button>
                  </div>

                  {/* Font Style Toggle (Editorial Sans vs Code Mono) */}
                  <div className="inline-flex p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px]">
                    <button
                      type="button"
                      onClick={() => setReaderFontFamily('sans')}
                      className={`px-2 py-0.5 rounded font-sans font-bold cursor-pointer ${
                        readerFontFamily === 'sans'
                          ? 'bg-slate-700 text-white font-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Klare Leseschrift (Sans-Serif)"
                    >
                      Leseschrift
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderFontFamily('mono')}
                      className={`px-2 py-0.5 rounded font-mono font-bold cursor-pointer ${
                        readerFontFamily === 'mono'
                          ? 'bg-slate-700 text-white font-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Monospace Code-Schrift"
                    >
                      Code
                    </button>
                  </div>

                  {/* Reading Theme Modes */}
                  <div className="inline-flex p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] gap-0.5">
                    <button
                      type="button"
                      onClick={() => setReaderTheme('dark')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        readerTheme === 'dark'
                          ? 'bg-slate-800 text-amber-300 font-black'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Studio Dark Mode"
                    >
                      🌙 Dark
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderTheme('oled')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        readerTheme === 'oled'
                          ? 'bg-black text-emerald-400 font-black border border-emerald-500/50'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="OLED True Black (Max Kontrast)"
                    >
                      🖤 OLED
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderTheme('paper')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        readerTheme === 'paper'
                          ? 'bg-amber-100 text-slate-950 font-black border border-amber-300'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Warm Paper (Helles Leselayout mit hohem Kontrast)"
                    >
                      📜 Paper
                    </button>
                  </div>

                  {/* Height Toggle (when not maximized) */}
                  {panelMode !== 'maximized' && (
                    <div className="inline-flex p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-[10px]">
                      <button
                        type="button"
                        onClick={() => setReaderHeight(readerHeight === 'compact' ? 'comfortable' : readerHeight === 'comfortable' ? 'expanded' : 'compact')}
                        className="px-2 py-0.5 text-slate-300 hover:text-white font-bold cursor-pointer"
                        title="Höhe anpassen"
                      >
                        {readerHeight === 'compact' ? 'Höhe: Klein' : readerHeight === 'comfortable' ? 'Höhe: Mittel' : 'Höhe: Groß'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Main Text Content Box */}
              {readerViewMode === 'raw' ? (
                <div
                  className={`border rounded-xl p-4 overflow-y-auto scrollbar-thin select-all shadow-inner transition-all ${heightClass} ${themeClasses}`}
                >
                  <pre
                    className={`whitespace-pre-wrap ${fontFamilyClass} ${fontSizeClass} ${lineHeightClass}`}
                  >
                    {activeOutputText}
                  </pre>
                </div>
              ) : (
                /* Structured Formatted Section View */
                <div
                  className={`border rounded-xl p-3.5 overflow-y-auto scrollbar-thin space-y-3 shadow-inner transition-all ${heightClass} ${themeClasses}`}
                >
                  {structuredSections.map((sec, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border transition-all ${
                        sec.type === 'scene'
                          ? readerTheme === 'paper' ? 'bg-amber-100/70 border-amber-300' : 'bg-slate-950/80 border-amber-500/30'
                          : sec.type === 'audio'
                          ? readerTheme === 'paper' ? 'bg-emerald-100/70 border-emerald-300' : 'bg-emerald-950/40 border-emerald-500/30'
                          : sec.type === 'commercial'
                          ? readerTheme === 'paper' ? 'bg-purple-100/70 border-purple-300' : 'bg-purple-950/40 border-purple-500/30'
                          : readerTheme === 'paper' ? 'bg-white border-slate-300' : 'bg-slate-950/50 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b pb-1.5 mb-2 border-slate-700/40">
                        <span
                          className={`font-black text-xs uppercase tracking-wider flex items-center gap-1.5 ${
                            sec.type === 'scene'
                              ? 'text-amber-500'
                              : sec.type === 'audio'
                              ? 'text-emerald-400'
                              : sec.type === 'commercial'
                              ? 'text-purple-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {sec.type === 'scene' && <Film className="w-3.5 h-3.5" />}
                          {sec.type === 'audio' && <Volume2 className="w-3.5 h-3.5" />}
                          {sec.type === 'commercial' && <Megaphone className="w-3.5 h-3.5" />}
                          {sec.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onCopyPrompt(sec.content.join('\n'));
                            if (onShowToast) onShowToast(isEn ? 'Section copied!' : 'Abschnitt kopiert!');
                          }}
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          Kopieren
                        </button>
                      </div>
                      <div className={`${fontFamilyClass} ${fontSizeClass} ${lineHeightClass} whitespace-pre-wrap`}>
                        {sec.content.join('\n')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions Button Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopy}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-sm transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-4 h-4" /> {translations.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />{' '}
                      {formatMode === 'clean_video'
                        ? translations.copyCleanVideo
                        : formatMode === 'clean_audio'
                        ? translations.copyAudio
                        : translations.copyScript}
                    </>
                  )}
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl transition-colors font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" /> {translations.saved}
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-slate-400" /> {translations.saveAsTemplate}
                    </>
                  )}
                </button>

                {/* Rating Widget */}
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 shrink-0" id="script-rating-widget">
                  <span className="text-[11px] font-bold text-slate-400">
                    {isEn ? 'Rate Script:' : 'Regie-Prompt bewerten:'}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((stars) => {
                      const isFilled = stars <= currentRating;
                      return (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => handleRate(stars)}
                          className="p-0.5 hover:scale-110 transition-transform cursor-pointer group"
                          title={isEn ? `Rate ${stars} Stars` : `${stars} Sterne bewerten`}
                        >
                          <Star
                            className={`w-4 h-4 transition-colors ${
                              isFilled
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-600 hover:text-amber-300'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  {currentRating > 0 && (
                    <span className="text-[10px] font-black text-amber-400 font-mono bg-amber-950 px-1.5 py-0.2 rounded border border-amber-500/30">
                      {currentRating}/5
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-sans hidden md:block">
                <span>💡 {translations.tip}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
