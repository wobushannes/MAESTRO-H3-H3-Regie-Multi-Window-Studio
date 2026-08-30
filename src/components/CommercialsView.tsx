import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PromptBuildState, StyleCategory } from '../types';
import { 
  COMMERCIAL_MASTER_PRESETS, 
  CommercialPreset,
  formatCommercialOutroAbspann,
  exportCommercialPresetsToJson 
} from '../utils/commercialMasterEngine';
import { ANALOG_MASTER_PRESETS } from '../utils/analogMasterEngine';
import { 
  Megaphone, 
  Building2, 
  Shirt, 
  Compass, 
  Sofa, 
  PenTool, 
  UtensilsCrossed,
  Check, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Upload, 
  Tag,
  Sparkles,
  Tv,
  Film,
  Type,
  ExternalLink,
  Zap,
  Volume2,
  Copy,
  FileJson,
  X,
  SlidersHorizontal,
  RotateCcw,
  Layers,
  Camera,
  Sun,
  Eye,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Clock,
  Columns,
  Maximize2,
  Minimize2,
  Activity,
  Gauge,
  Sliders,
  Flame,
  LayoutGrid,
  Percent,
  TrendingUp,
  Leaf,
  Crown,
  HeartHandshake,
  Sparkle,
  MonitorPlay,
  Share2,
  Award,
  Gift,
  Home,
  Rocket,
  Building,
  Wand2,
  Trees,
  Crosshair,
  Landmark,
  Heart,
  Utensils
} from 'lucide-react';

interface CommercialsViewProps {
  state: PromptBuildState;
  onUpdateState: (updater: (prev: PromptBuildState) => PromptBuildState) => void;
  onShowToast: (msg: string) => void;
}

type QuickFilterType = 'all' | 'genesis_immo' | 'floorplan_immo' | 'chef_food' | 'claim_ready';
type SortOption = 'relevance' | 'title_asc' | 'title_desc' | 'category';
type DurationTier = 'all' | 'auto_matched' | 'short' | 'medium' | 'long';
type ViewLayoutMode = 'split' | 'catalog' | 'editor';

// Tone/Mood category filter for tailored slogan suggestions
export type SloganMoodFilter = 
  | 'all'
  | 'luxury'
  | 'fresh_natural'
  | 'modern_genesis'
  | 'artisanal'
  | 'sizzling_energetic'
  | 'smoke_fire'
  | 'culinary_craft'
  | 'minimalist'
  | 'zen_wellness'
  | 'playful_pop'
  | 'tech_saas';

export interface SloganSuggestion {
  id: string;
  brand: string;
  claim: string;
  cta: string;
  category: StyleCategory | string;
  mood: SloganMoodFilter;
  moodLabelDe: string;
  moodLabelEn: string;
  durationTier: 'short' | 'medium' | 'long';
  estimatedSeconds: number;
  wordCount: number;
  charCount: number;
  pitchNoteDe: string;
  pitchNoteEn: string;
  idealOutroStyle?: string;
}

// Comprehensive duration- and category-optimized slogans with specific mood tags (e.g. Luxury vs Fresh/Natural vs Artisanal)
const DURATION_OPTIMIZED_SLOGANS: SloganSuggestion[] = [
  // ================= IMMOBILIEN (REAL ESTATE) =================
  // Luxury / High-End Estates
  {
    id: 'immo-lux-short',
    category: 'immobilien',
    mood: 'luxury',
    moodLabelDe: 'High-End Luxus',
    moodLabelEn: 'High-End Luxury',
    durationTier: 'short',
    brand: 'SKYLINE RESIDENCES',
    claim: 'Living Above the Ordinary.',
    cta: 'www.skyline.luxury',
    estimatedSeconds: 1.8,
    wordCount: 4,
    charCount: 26,
    pitchNoteDe: 'Kompakter Luxus-Claim für Penthouse- & Hochhaus-Teaser (5–6s).',
    pitchNoteEn: 'Compact luxury claim for penthouse & high-rise teasers (5–6s).'
  },
  {
    id: 'immo-lux-med',
    category: 'immobilien',
    mood: 'luxury',
    moodLabelDe: 'High-End Luxus',
    moodLabelEn: 'High-End Luxury',
    durationTier: 'medium',
    brand: 'VILLA PALAZZO ESTATES',
    claim: 'Wo zeitlose Architektur auf unberührte Natur trifft.',
    cta: 'Private Besichtigung anfragen | www.palazzo-estates.com',
    estimatedSeconds: 3.2,
    wordCount: 7,
    charCount: 52,
    pitchNoteDe: 'Eleganter Tonus für exklusive Villen- & Schlossanwesen (10–14s).',
    pitchNoteEn: 'Refined tone for exclusive luxury villas & private estates (10–14s).'
  },
  {
    id: 'immo-lux-long',
    category: 'immobilien',
    mood: 'luxury',
    moodLabelDe: 'High-End Luxus',
    moodLabelEn: 'High-End Luxury',
    durationTier: 'long',
    brand: 'SKYLINE PENTHOUSE COLLECTION',
    claim: 'Exklusives Wohnen über den Dächern der Metropole mit 360-Grad-Panoramablick und privatem Concierge-Service.',
    cta: 'Diskrete Penthouse-Führung buchen | Hotline: 0800-SKYLINE',
    estimatedSeconds: 5.8,
    wordCount: 14,
    charCount: 104,
    pitchNoteDe: 'Epischer Abspann für 28–56s Multi-Window Kampagnen höchster Bonität.',
    pitchNoteEn: 'Epic outro for 28–56s multi-window ultra-luxury campaigns.'
  },

  // Modern Genesis / New Construction
  {
    id: 'immo-gen-short',
    category: 'immobilien',
    mood: 'modern_genesis',
    moodLabelDe: 'Genesis & Neubau',
    moodLabelEn: 'Modern Genesis & Build',
    durationTier: 'short',
    brand: 'GENESIS HOMES',
    claim: 'Ihr Raum. Ihre Vision.',
    cta: 'www.genesis-homes.de',
    estimatedSeconds: 1.6,
    wordCount: 4,
    charCount: 22,
    pitchNoteDe: 'Minimalistischer 4-Wort Claim für schnelle Bauphasen-Schnitte.',
    pitchNoteEn: 'Minimal 4-word claim designed for rapid construction cuts.'
  },
  {
    id: 'immo-gen-med',
    category: 'immobilien',
    mood: 'modern_genesis',
    moodLabelDe: 'Genesis & Neubau',
    moodLabelEn: 'Modern Genesis & Build',
    durationTier: 'medium',
    brand: 'GENESIS LUXURY HOMES',
    claim: 'Vom ersten Spatenstich zu Ihrem Wohntraum.',
    cta: 'Exklusive Neubauprojekte anfragen | www.genesis-homes.de',
    estimatedSeconds: 3.2,
    wordCount: 7,
    charCount: 44,
    pitchNoteDe: 'Der Gold-Standard für 10–14s Genesis-Bauspots mit Makler & Baustelle.',
    pitchNoteEn: 'The gold standard for 10–14s Genesis spots (Broker + Plot + House).'
  },
  {
    id: 'immo-gen-long',
    category: 'immobilien',
    mood: 'modern_genesis',
    moodLabelDe: 'Genesis & Neubau',
    moodLabelEn: 'Modern Genesis & Build',
    durationTier: 'long',
    brand: 'GENESIS ARCHITECTURE GROUP',
    claim: 'Vom ersten Spatenstich bis zur schlüsselfertigen Übergabe – Ihr verlässlicher Partner für zeitlose Lebensräume.',
    cta: 'Vereinbaren Sie Ihren persönlichen Architekten-Termin | www.genesis-group.com',
    estimatedSeconds: 6.2,
    wordCount: 14,
    charCount: 106,
    pitchNoteDe: 'Vollständiges Markenversprechen für schlüsselfertiges Premium-Bauen.',
    pitchNoteEn: 'Complete turnkey brand promise for bespoke architectural builds.'
  },

  // Coastal & Sanctuary Living
  {
    id: 'immo-coastal-short',
    category: 'immobilien',
    mood: 'fresh_natural',
    moodLabelDe: 'Natur & Küste',
    moodLabelEn: 'Coastal & Nature',
    durationTier: 'short',
    brand: 'COSTA REALTY',
    claim: 'Sanctuary by the Sea.',
    cta: 'www.costa-realty.com',
    estimatedSeconds: 1.8,
    wordCount: 4,
    charCount: 22,
    pitchNoteDe: 'Emotionaler Küsten-Hook für schnelle Social Reels.',
    pitchNoteEn: 'Emotional coastal hook for rapid social reels.'
  },
  {
    id: 'immo-coastal-med',
    category: 'immobilien',
    mood: 'fresh_natural',
    moodLabelDe: 'Natur & Küste',
    moodLabelEn: 'Coastal & Nature',
    durationTier: 'medium',
    brand: 'ALPINE CHALET ESTATES',
    claim: 'Ihr persönliches Refugium in den Alpen.',
    cta: 'Exklusive Bergdomizile besichtigen | www.alpine-estates.ch',
    estimatedSeconds: 2.9,
    wordCount: 6,
    charCount: 42,
    pitchNoteDe: 'Exklusive alpine Ästhetik mit Naturstein & Lärchenholz.',
    pitchNoteEn: 'Luxury alpine atmosphere with stone & wood focus.'
  },

  // ================= FOOD & GOURMET =================
  // Fresh / Organic / Natural
  {
    id: 'food-fresh-short',
    category: 'food',
    mood: 'fresh_natural',
    moodLabelDe: 'Frisch & Natürlich',
    moodLabelEn: 'Fresh & Natural',
    durationTier: 'short',
    brand: 'PURE ORGANIC',
    claim: '100% Natur. Null Kompromisse.',
    cta: 'www.pure-organic.farm',
    estimatedSeconds: 1.7,
    wordCount: 4,
    charCount: 29,
    pitchNoteDe: 'Ideal für frische Feld-Makroaufnahmen, Tautropfen & Bio-Ernte.',
    pitchNoteEn: 'Perfect for dewy farm closeups & 100% organic harvest.'
  },
  {
    id: 'food-fresh-med',
    category: 'food',
    mood: 'fresh_natural',
    moodLabelDe: 'Frisch & Natürlich',
    moodLabelEn: 'Fresh & Natural',
    durationTier: 'medium',
    brand: 'GREEN VALLEY FARMS',
    claim: 'Vom Feld direkt auf Ihren Teller: Täglich erntefrisch.',
    cta: 'Regionale Bio-Kiste abonnieren | www.greenvalley.eco',
    estimatedSeconds: 3.1,
    wordCount: 8,
    charCount: 55,
    pitchNoteDe: 'Farm-to-Table Transparenz für 10–14s nachhaltige Food-Spots.',
    pitchNoteEn: 'Farm-to-table freshness for 10–14s sustainable food ads.'
  },
  {
    id: 'food-fresh-long',
    category: 'food',
    mood: 'fresh_natural',
    moodLabelDe: 'Frisch & Natürlich',
    moodLabelEn: 'Fresh & Natural',
    durationTier: 'long',
    brand: 'NORDIC HARVEST LAB',
    claim: 'Handgepflückte Wildkräuter und sonnengereiftes Bio-Gemüse aus regenerativer Landwirtschaft – für unverfälschten Geschmack.',
    cta: 'Entdecken Sie unsere nachhaltige Frische-Philosophie | www.nordicharvest.com',
    estimatedSeconds: 6.0,
    wordCount: 14,
    charCount: 119,
    pitchNoteDe: 'Ausführliches Manifest für bewusste Natur- & Bio-Manufakturen.',
    pitchNoteEn: 'Detailed manifesto for conscious organic & bio brands.'
  },

  // Sizzling / Steakhouse / Foodporn
  {
    id: 'food-sizzle-short',
    category: 'food',
    mood: 'sizzling_energetic',
    moodLabelDe: 'Sizzling Foodporn',
    moodLabelEn: 'Sizzling Foodporn',
    durationTier: 'short',
    brand: 'PRIME CUT',
    claim: 'Pure Leidenschaft.',
    cta: 'www.primecut.restaurant',
    estimatedSeconds: 1.4,
    wordCount: 2,
    charCount: 17,
    pitchNoteDe: 'Extrem prägnant für 1000fps Flammen- & Butter-Sizzles.',
    pitchNoteEn: 'Ultra-concise for 1000fps flame & butter sizzles.'
  },
  {
    id: 'food-sizzle-med',
    category: 'food',
    mood: 'sizzling_energetic',
    moodLabelDe: 'Sizzling Foodporn',
    moodLabelEn: 'Sizzling Foodporn',
    durationTier: 'medium',
    brand: 'PRIME CUT STEAKHOUSE',
    claim: 'Leidenschaft, die man mit jedem Bissen schmeckt.',
    cta: 'Tisch im Steakhouse reservieren | www.primecut.restaurant',
    estimatedSeconds: 3.4,
    wordCount: 7,
    charCount: 48,
    pitchNoteDe: 'Klassischer Sterne-Gastronomie Claim für Grill & Dry-Age Spots.',
    pitchNoteEn: 'Classic steakhouse tagline for dry-age & grill ads.'
  },
  {
    id: 'food-sizzle-long',
    category: 'food',
    mood: 'sizzling_energetic',
    moodLabelDe: 'Sizzling Foodporn',
    moodLabelEn: 'Sizzling Foodporn',
    durationTier: 'long',
    brand: 'GRAND GOURMET HERITAGE',
    claim: 'Höchste Fleischkultur von handverlesenen Weiderindern, meisterhaft veredelt auf offenem Buchenholz-Feuer.',
    cta: 'Erleben Sie das exklusive 7-Gänge Signature Tasting | Reservierung online',
    estimatedSeconds: 5.9,
    wordCount: 13,
    charCount: 105,
    pitchNoteDe: 'Ausführlicher Gourmet-Abspann für cineastische Meisterkoch-Spots.',
    pitchNoteEn: 'Rich culinary statement for cinematic master chef films.'
  },

  // Artisanal / Bakery / Traditional Craft
  {
    id: 'food-craft-short',
    category: 'food',
    mood: 'artisanal',
    moodLabelDe: 'Handwerk & Manufaktur',
    moodLabelEn: 'Artisanal & Craft',
    durationTier: 'short',
    brand: 'HERITAGE BAKERY',
    claim: 'Echtes Handwerk. Pure Zeit.',
    cta: 'Frisches Sauerteigbrot vorbestellen',
    estimatedSeconds: 1.9,
    wordCount: 4,
    charCount: 28,
    pitchNoteDe: 'Kompakter Manufaktur-Claim für Mehlstaub- & Teig-Clips.',
    pitchNoteEn: 'Artisanal micro-claim for flour dusting & sourdough kneading.'
  },
  {
    id: 'food-craft-med',
    category: 'food',
    mood: 'artisanal',
    moodLabelDe: 'Handwerk & Manufaktur',
    moodLabelEn: 'Artisanal & Craft',
    durationTier: 'medium',
    brand: 'SUSHI OMAKASE TOKYO',
    claim: 'Perfektion in jedem einzelnen Reiskorn.',
    cta: 'Exklusives Omakase-Menü anfragen | www.sushi-omakase.jp',
    estimatedSeconds: 2.7,
    wordCount: 5,
    charCount: 39,
    pitchNoteDe: 'Traditionelle japanische Präzision & Meisterschaft.',
    pitchNoteEn: 'Traditional Japanese culinary mastery & precision.'
  },

  // ================= FASHION & LUXURY =================
  {
    id: 'fashion-lux-short',
    category: 'fashion',
    mood: 'luxury',
    moodLabelDe: 'Haute Couture',
    moodLabelEn: 'Haute Couture',
    durationTier: 'short',
    brand: 'MAISON DE HAUTE',
    claim: 'Elegance is an Attitude.',
    cta: 'www.maison-haute.com',
    estimatedSeconds: 1.8,
    wordCount: 4,
    charCount: 24,
    pitchNoteDe: 'Pariser Runway-Slogan für schnelle High-Fashion Schnitte.',
    pitchNoteEn: 'Parisian runway tagline for fast high-fashion cuts.'
  },
  {
    id: 'fashion-lux-med',
    category: 'fashion',
    mood: 'luxury',
    moodLabelDe: 'Haute Couture',
    moodLabelEn: 'Haute Couture',
    durationTier: 'medium',
    brand: 'CHRONOMETRE GENÈVE',
    claim: 'Mastery Over Every Second.',
    cta: 'Find an Authorized Luxury Boutique | www.chronometre.ch',
    estimatedSeconds: 2.8,
    wordCount: 4,
    charCount: 27,
    pitchNoteDe: 'Präziser Schweizer Uhren-Claim für Luxus-Kampagnen.',
    pitchNoteEn: 'Precision Swiss watchmaking claim for luxury timepieces.'
  },
  {
    id: 'fashion-street-short',
    category: 'fashion',
    mood: 'sizzling_energetic',
    moodLabelDe: 'Urban Streetwear',
    moodLabelEn: 'Urban Streetwear',
    durationTier: 'short',
    brand: 'NEO-TOKYO APPAREL',
    claim: 'Rule the Concrete Jungle.',
    cta: 'Limited Drop Online | www.neo-tokyo.io',
    estimatedSeconds: 1.9,
    wordCount: 4,
    charCount: 25,
    pitchNoteDe: 'Futuristischer Streetwear-Slogan für limitierte Drops.',
    pitchNoteEn: 'Futuristic streetwear hook for limited apparel drops.'
  },

  // ================= TRAVEL & TOURISM =================
  {
    id: 'travel-lux-short',
    category: 'travel',
    mood: 'luxury',
    moodLabelDe: '5-Sterne Resort',
    moodLabelEn: '5-Star Resort',
    durationTier: 'short',
    brand: 'BORA BORA RESORTS',
    claim: 'Heaven Found.',
    cta: 'Book Dream Escape',
    estimatedSeconds: 1.3,
    wordCount: 2,
    charCount: 12,
    pitchNoteDe: 'Trauminsel-Micro-Claim für kurze Fernweh-Reels.',
    pitchNoteEn: 'Tropical island micro-claim for wanderlust reels.'
  },
  {
    id: 'travel-zen-med',
    category: 'travel',
    mood: 'zen_wellness',
    moodLabelDe: 'Zen & Entschleunigung',
    moodLabelEn: 'Zen & Mindful Travel',
    durationTier: 'medium',
    brand: 'VISIT JAPAN',
    claim: 'Rediscover Your Inner Harmony.',
    cta: 'Plan Your Cultural Journey | www.japan.travel',
    estimatedSeconds: 2.7,
    wordCount: 4,
    charCount: 29,
    pitchNoteDe: 'Fernöstliche Achtsamkeit und authentische Tempel-Reisen.',
    pitchNoteEn: 'Eastern mindfulness & authentic temple journeys.'
  },
  {
    id: 'travel-lux-long',
    category: 'travel',
    mood: 'luxury',
    moodLabelDe: '5-Sterne Resort',
    moodLabelEn: '5-Star Resort',
    durationTier: 'long',
    brand: 'ROYAL PACIFIC HORIZONS',
    claim: 'Erleben Sie unvergleichliche Überwasser-Villen über kristallklaren Lagunen im Herzen des Südpazifiks.',
    cta: 'Buchen Sie Ihren privaten Traumurlaub inklusive Helikopter-Transfer | www.royalpacific.com',
    estimatedSeconds: 5.8,
    wordCount: 13,
    charCount: 104,
    pitchNoteDe: 'Vollmundiger Luxus-Reiseabspann für exklusive Resorts.',
    pitchNoteEn: 'Comprehensive luxury travel outro for 5-star island resorts.'
  },

  // ================= INTERIOR & FURNITURE =================
  {
    id: 'interior-mini-short',
    category: 'inneneinrichtung',
    mood: 'minimalist',
    moodLabelDe: 'Nordic Minimalismus',
    moodLabelEn: 'Nordic Minimalist',
    durationTier: 'short',
    brand: 'KØBENHAVN DESIGN',
    claim: 'Crafted to Last.',
    cta: 'www.kobenhavn.design',
    estimatedSeconds: 1.4,
    wordCount: 3,
    charCount: 16,
    pitchNoteDe: 'Skandinavischer Minimalismus auf den Punkt gebracht.',
    pitchNoteEn: 'Nordic minimalist statement in 3 words.'
  },
  {
    id: 'interior-lux-med',
    category: 'inneneinrichtung',
    mood: 'luxury',
    moodLabelDe: 'Bespoke Küchen',
    moodLabelEn: 'Bespoke Kitchens',
    durationTier: 'medium',
    brand: 'VALENTINI CUCINE',
    claim: 'The Heart of the Home, Reimagined.',
    cta: 'Book Your Bespoke Consultation | www.valentini.it',
    estimatedSeconds: 3.3,
    wordCount: 6,
    charCount: 35,
    pitchNoteDe: 'Luxuriöses Küchendesign mit italienischer Handwerkskunst.',
    pitchNoteEn: 'Bespoke luxury kitchen design with Italian flair.'
  },
  {
    id: 'interior-craft-long',
    category: 'inneneinrichtung',
    mood: 'artisanal',
    moodLabelDe: 'Massivholz-Manufaktur',
    moodLabelEn: 'Solid Wood Craft',
    durationTier: 'long',
    brand: 'KØBENHAVN LIVING STUDIOS',
    claim: 'Handgefertigte Massivholzmöbel nordischer Meister – formvollendet, nachhaltig und geschaffen für Generationen echten Wohlfühlens.',
    cta: 'Bestellen Sie das neue Wohnbuch 2026 versandkostenfrei nach Hause | www.kobenhavn.de',
    estimatedSeconds: 6.1,
    wordCount: 14,
    charCount: 122,
    pitchNoteDe: 'Cineastischer Abspann für Premium-Möbelmarken & Innenarchitektur.',
    pitchNoteEn: 'Cinematic brand outro for bespoke furniture & interior design.'
  },

  // ================= COMIC & ANIMATION =================
  {
    id: 'comic-pop-short',
    category: 'comic',
    mood: 'playful_pop',
    moodLabelDe: 'Viral Comic Punch',
    moodLabelEn: 'Viral Comic Punch',
    durationTier: 'short',
    brand: 'CARTOON CRAFT',
    claim: 'Simple. Clever. Viral.',
    cta: 'Start Video Campaign | www.cartooncraft.io',
    estimatedSeconds: 1.6,
    wordCount: 3,
    charCount: 22,
    pitchNoteDe: 'Zackiger 3-Wort Punch für Cartoon- & Explainer-Ads.',
    pitchNoteEn: 'Punchy 3-word hook for animated explainer campaigns.'
  },
  {
    id: 'comic-tech-med',
    category: 'comic',
    mood: 'tech_saas',
    moodLabelDe: 'Tech & SaaS',
    moodLabelEn: 'Tech & SaaS',
    durationTier: 'medium',
    brand: 'FLOWSTACK SAAS',
    claim: 'Work Smarter. Scale Faster.',
    cta: 'Start Free 14-Day Pro Trial | www.flowstack.io',
    estimatedSeconds: 2.8,
    wordCount: 4,
    charCount: 27,
    pitchNoteDe: 'Dynamischer Tech- & Software-Claim im Comic-Look.',
    pitchNoteEn: 'Dynamic tech & SaaS slogan in animation style.'
  },

  // ================= GRILL & AUSSENKÜCHE (OUTDOOR LIVING & BBQ) =================
  {
    id: 'grill-lux-short',
    category: 'grill_aussenkueche',
    mood: 'luxury',
    moodLabelDe: 'High-End Luxus',
    moodLabelEn: 'High-End Luxury',
    durationTier: 'short',
    brand: 'FLAMMKRAFT OUTDOOR',
    claim: 'Feuer. Stahl. Vollendeter Genuss.',
    cta: 'www.flammkraft.com',
    estimatedSeconds: 1.8,
    wordCount: 4,
    charCount: 33,
    pitchNoteDe: 'Prägnanter Luxus-Claim für 5–6s Außenküchen- & Grill-Teaser.',
    pitchNoteEn: 'Punchy luxury claim for 5–6s outdoor kitchen teasers.'
  },
  {
    id: 'grill-smoke-short',
    category: 'grill_aussenkueche',
    mood: 'smoke_fire',
    moodLabelDe: 'Rauch & Glut',
    moodLabelEn: 'Smoke & Fire',
    durationTier: 'short',
    brand: 'MONOLITH CERAMIC',
    claim: 'Reine Glut. Echter Geschmack.',
    cta: 'www.monolith-grill.de',
    estimatedSeconds: 1.6,
    wordCount: 4,
    charCount: 28,
    pitchNoteDe: 'Kompakter Keramikgrill- & BBQ-Claim für Social Media Ads.',
    pitchNoteEn: 'Compact kamado ceramic grill hook for social video.'
  },
  {
    id: 'grill-lux-med',
    category: 'grill_aussenkueche',
    mood: 'luxury',
    moodLabelDe: 'High-End Luxus',
    moodLabelEn: 'High-End Luxury',
    durationTier: 'medium',
    brand: 'TERRA & FIRE OUTDOOR KITCHENS',
    claim: 'Kochen unter freiem Himmel in architektonischer Perfektion.',
    cta: 'Showroom besuchen & Planungsgespräch vereinbaren | www.terra-fire.de',
    estimatedSeconds: 3.2,
    wordCount: 8,
    charCount: 60,
    pitchNoteDe: 'Eleganter Tonus für maßgefertigte Luxus-Außenküchen & Pool-Terrassen (10–14s).',
    pitchNoteEn: 'Refined tone for bespoke outdoor kitchens & pool terraces (10–14s).'
  },
  {
    id: 'grill-smoke-med',
    category: 'grill_aussenkueche',
    mood: 'smoke_fire',
    moodLabelDe: 'Rauch & Glut',
    moodLabelEn: 'Smoke & Fire',
    durationTier: 'medium',
    brand: 'ASADO PATAGONIA',
    claim: 'Das elementare Ritual des Feuers – handgeschmiedet für Ihren Garten.',
    cta: 'Exklusiven Katalog anfordern | www.asado-patagonia.com',
    estimatedSeconds: 3.4,
    wordCount: 9,
    charCount: 67,
    pitchNoteDe: 'Archaisch-luxuriöser Asado- & Feuerstellen-Slogan für 10–14s Spots.',
    pitchNoteEn: 'Archaic luxury open fire slogan for 10–14s cinematic spots.'
  },
  {
    id: 'grill-culinary-med',
    category: 'grill_aussenkueche',
    mood: 'culinary_craft',
    moodLabelDe: 'Kulinarische Präzision',
    moodLabelEn: 'Culinary Craft',
    durationTier: 'medium',
    brand: 'JOKODOMUS OUTDOOR LIVING',
    claim: 'Edelstahl-Präzision für unvergessliche Sommerabende.',
    cta: 'Jetzt Kollektion entdecken | www.jokodomus.com',
    estimatedSeconds: 2.9,
    wordCount: 6,
    charCount: 52,
    pitchNoteDe: 'Perfekt für Teppanyaki-Plancha & Chefkoch-Freiluft-Spots.',
    pitchNoteEn: 'Ideal for Teppanyaki plancha & open-air chef commercials.'
  },
  {
    id: 'grill-lux-long',
    category: 'grill_aussenkueche',
    mood: 'luxury',
    moodLabelDe: 'High-End Luxus',
    moodLabelEn: 'High-End Luxury',
    durationTier: 'long',
    brand: 'CUBIC LUXURY OUTDOOR LIVING',
    claim: 'Maßgefertigte wetterfeste Außenküchen aus Teakholz, Edelstahl und Keramik – geschaffen für vollendete Gastfreundschaft unter freiem Himmel.',
    cta: 'Vereinbaren Sie Ihren individuellen Planungstermin vor Ort | Hotline: 0800-OUTDOOR',
    estimatedSeconds: 5.9,
    wordCount: 16,
    charCount: 133,
    pitchNoteDe: 'Epischer Abspann für 28–56s Multi-Window Kampagnen höchster Architektur-Klasse.',
    pitchNoteEn: 'Epic outro for 28–56s multi-window luxury outdoor architectural campaigns.'
  },

  // ================= GASTRO & RESTAURANT =================
  {
    id: 'gastro-funk-short',
    category: 'gastro',
    mood: 'luxury',
    moodLabelDe: 'Fine Dining & Atmosphere',
    moodLabelEn: 'Fine Dining & Atmosphere',
    durationTier: 'short',
    brand: 'FUNK ROYAL',
    claim: 'FLOW. PRESENTATION. CONNECTION.',
    cta: '@restaurant.funk.royal',
    estimatedSeconds: 2.0,
    wordCount: 3,
    charCount: 30,
    pitchNoteDe: 'Funk Royal Gold-Typografie für 15s Time-Lapse Gastro-Spots.',
    pitchNoteEn: 'Funk Royal gold typography for 15s time-lapse restaurant ads.'
  },
  {
    id: 'gastro-funk-med',
    category: 'gastro',
    mood: 'luxury',
    moodLabelDe: 'Fine Dining & Atmosphere',
    moodLabelEn: 'Fine Dining & Atmosphere',
    durationTier: 'medium',
    brand: 'FUNK ROYAL RESTAURANT',
    claim: 'An unforgettable culinary connection.',
    cta: 'Reserve your table | www.funkroyal.com',
    estimatedSeconds: 2.8,
    wordCount: 4,
    charCount: 37,
    pitchNoteDe: 'Cineastische Kerzenschein-Atmosphäre mit Zeitraffer-Gästen.',
    pitchNoteEn: 'Cinematic candlelit dining atmosphere with background time-lapse motion.'
  },
  {
    id: 'gastro-michelin-long',
    category: 'gastro',
    mood: 'luxury',
    moodLabelDe: 'Michelin Star Experience',
    moodLabelEn: 'Michelin Star Experience',
    durationTier: 'long',
    brand: 'L\'ATELIER D\'ÉTOILE',
    claim: 'Where master culinary art meets front-row open kitchen intimacy and vintage wine pairing.',
    cta: 'Book your exclusive chef counter tasting | www.atelier-etoile.com',
    estimatedSeconds: 5.5,
    wordCount: 13,
    charCount: 96,
    pitchNoteDe: 'Ausführlicher Michelin-Sterne Claim für Haute Cuisine TV-Spots.',
    pitchNoteEn: 'Rich Michelin-star tagline for haute cuisine TV commercials.'
  }
];

export const CommercialsView: React.FC<CommercialsViewProps> = ({
  state,
  onUpdateState,
  onShowToast,
}) => {
  const isEn = state.language === 'en';
  
  // Layout mode: 'split' (side-by-side) vs 'catalog' (full preset grid) vs 'editor' (full editor focus)
  const [layoutMode, setLayoutMode] = useState<ViewLayoutMode>('split');

  // Filter & Search states for preset catalog
  const selectedCategory = state.category || 'all';
  const [selectedMood, setSelectedMood] = useState<SloganMoodFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);
  const [quickFilter, setQuickFilter] = useState<QuickFilterType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // Claim Editor duration tier filter
  const [claimTierFilter, setClaimTierFilter] = useState<DurationTier>('all');

  // Modal state for single JSON inspection
  const [viewingJsonPreset, setViewingJsonPreset] = useState<CommercialPreset | null>(null);

  // Pagination state for catalog
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = layoutMode === 'split' ? 6 : 12;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePresetId = state.commercialPresetId || 'none';

  // -------------------------------------------------------------
  // 1. AUTOMATIC VIDEO DURATION & OUTRO EXPOSURE PARSER
  // -------------------------------------------------------------
  const totalVideoSeconds = useMemo(() => {
    if (state.generatorMode === 'multi') {
      const winCount = state.windows && state.windows.length > 0 ? state.windows.length : 4;
      return winCount * 14;
    }
    return state.durationSeconds || 14;
  }, [state.generatorMode, state.windows, state.durationSeconds]);

  // Outro Exposure Slate window in seconds
  const outroExposureSeconds = useMemo(() => {
    if (totalVideoSeconds <= 6) return 1.6;
    if (totalVideoSeconds <= 10) return 2.2;
    if (totalVideoSeconds <= 14) return 3.0;
    if (totalVideoSeconds <= 28) return 4.0;
    return 5.2;
  }, [totalVideoSeconds]);

  const recommendedOutroBudgetSec = useMemo(() => {
    if (totalVideoSeconds <= 6) return { min: 1.2, max: 2.2, tier: 'short' as const };
    if (totalVideoSeconds <= 18) return { min: 2.2, max: 4.5, tier: 'medium' as const };
    return { min: 4.0, max: 7.5, tier: 'long' as const };
  }, [totalVideoSeconds]);

  // -------------------------------------------------------------
  // 2. MATHEMATICAL OPTIMAL CHARACTER LENGTH & COGNITIVE OUTRO LOAD
  // -------------------------------------------------------------
  // Standard on-screen reading speed for commercial video slates is ~18 to 22 characters/second.
  const optimalCharLimits = useMemo(() => {
    const minChars = Math.round(outroExposureSeconds * 14);
    const idealChars = Math.round(outroExposureSeconds * 19);
    const maxChars = Math.round(outroExposureSeconds * 26);

    const brandLimit = Math.min(28, Math.max(12, Math.round(outroExposureSeconds * 6)));
    const claimLimit = Math.min(110, Math.max(25, Math.round(outroExposureSeconds * 16)));
    const ctaLimit = Math.min(45, Math.max(15, Math.round(outroExposureSeconds * 8)));

    return {
      minChars,
      idealChars,
      maxChars,
      brandLimit,
      claimLimit,
      ctaLimit,
    };
  }, [outroExposureSeconds]);

  // -------------------------------------------------------------
  // 3. LIVE SPEECH DURATION, CHAR DENSITY & PACING METRICS
  // -------------------------------------------------------------
  const claimMetrics = useMemo(() => {
    const brandText = (state.commercialBrandName || '').trim();
    const claimText = (state.commercialClaim || '').trim();
    const ctaText = (state.commercialCallToAction || '').trim();

    const brandChars = brandText.length;
    const claimChars = claimText.length;
    const ctaChars = ctaText.length;
    const totalChars = brandChars + claimChars + ctaChars;

    const combinedWords = [brandText, claimText, ctaText]
      .filter(Boolean)
      .join(' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const wordCount = combinedWords.length;
    // Standard professional commercial voiceover cadence is ~2.2 words per second (130-140 WPM)
    const estimatedSpeechSec = wordCount === 0 ? 0 : Math.max(1, +(wordCount / 2.2).toFixed(1));
    const outroPercentage = totalVideoSeconds > 0 ? Math.round((estimatedSpeechSec / totalVideoSeconds) * 100) : 0;

    // Character Density Evaluation
    let charStatus: 'empty' | 'ultra_light' | 'optimal' | 'dense' | 'overflow' = 'optimal';
    let feedbackDe = '';
    let feedbackEn = '';

    if (totalChars === 0) {
      charStatus = 'empty';
      feedbackDe = 'Noch kein Claim hinterlegt. Wähle unten einen 1-Klick Vorschlag.';
      feedbackEn = 'No claim entered yet. Select a duration-optimized proposal below.';
    } else if (totalChars <= optimalCharLimits.minChars) {
      charStatus = 'ultra_light';
      feedbackDe = `⚡ Schneller Hook (${totalChars} Zeichen): Blitzschnell lesbar in ${outroExposureSeconds}s Abspann-Fenster.`;
      feedbackEn = `⚡ Fast Hook (${totalChars} chars): Ultra-fast legibility in ${outroExposureSeconds}s outro window.`;
    } else if (totalChars <= optimalCharLimits.idealChars) {
      charStatus = 'optimal';
      feedbackDe = `✓ Perfekte Outro-Dichte (${totalChars}/${optimalCharLimits.idealChars} Z.): Ideal für müheloses Erfassen bei ${totalVideoSeconds}s Laufzeit.`;
      feedbackEn = `✓ Optimal Outro Density (${totalChars}/${optimalCharLimits.idealChars} chars): Ideal visual legibility for ${totalVideoSeconds}s video.`;
    } else if (totalChars <= optimalCharLimits.maxChars) {
      charStatus = 'dense';
      feedbackDe = `⏱️ Leicht erhöhte Textdichte (${totalChars} Z.): Gut lesbar, benötigt aber volle ${outroExposureSeconds}s Bildschirm-Präsenz.`;
      feedbackEn = `⏱️ Dense Text (${totalChars} chars): Legible, but requires full ${outroExposureSeconds}s screen time.`;
    } else {
      charStatus = 'overflow';
      feedbackDe = `⚠️ Zu lang für ${outroExposureSeconds}s Outro-Card (${totalChars} Z., Limit ~${optimalCharLimits.maxChars}): Zuschauer schaffen das Lesen evtl. nicht rechtzeitig.`;
      feedbackEn = `⚠️ Too long for ${outroExposureSeconds}s outro (${totalChars} chars, limit ~${optimalCharLimits.maxChars}): Viewer may not finish reading in time.`;
    }

    return {
      brandChars,
      claimChars,
      ctaChars,
      totalChars,
      wordCount,
      estimatedSpeechSec,
      outroPercentage,
      charStatus,
      feedbackDe,
      feedbackEn,
    };
  }, [state.commercialBrandName, state.commercialClaim, state.commercialCallToAction, totalVideoSeconds, outroExposureSeconds, optimalCharLimits]);

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedMood, searchQuery, activeTagFilter, quickFilter, sortBy, layoutMode]);

  // Dynamic category counts
  const counts = useMemo(() => {
    return {
      all: COMMERCIAL_MASTER_PRESETS.length,
      cinema: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'cinema').length,
      gastro: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'gastro').length,
      grill_aussenkueche: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'grill_aussenkueche').length,
      immobilien: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'immobilien').length,
      food: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'food').length,
      restaurant: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'restaurant').length,
      fashion: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'fashion').length,
      travel: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'travel').length,
      inneneinrichtung: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'inneneinrichtung').length,
      comic: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'comic').length,
      lingerie: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'lingerie').length,
      erotik: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'erotik').length,
      birthday: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'birthday').length,
      horror: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'horror').length,
      sitcom: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'sitcom').length,
      scify: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'scify').length,
      cyberpunk: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'cyberpunk').length,
      bau: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'bau').length,
      action: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'action').length,
      fantasy: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'fantasy').length,
      nature: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'nature').length,
      war: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'war').length,
      politics: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'politics').length,
      immersive: COMMERCIAL_MASTER_PRESETS.filter(p => p.category === 'immersive').length,
    };
  }, []);

  // Filter & Sort presets
  const filteredPresets = useMemo(() => {
    return COMMERCIAL_MASTER_PRESETS.filter(preset => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || preset.category === selectedCategory;

      // Quick filter
      let matchesQuick = true;
      if (quickFilter === 'genesis_immo') {
        matchesQuick = preset.pictureSequenceType === '3_pic_construction' || /genesis|baugebiet|traumhaus|spatenstich/i.test(preset.id + preset.name + preset.promptSnippet);
      } else if (quickFilter === 'floorplan_immo') {
        matchesQuick = preset.pictureSequenceType === '3_pic_floorplan' || /grundriss|floorplan|altbau|loft|japandi/i.test(preset.id + preset.name + preset.promptSnippet);
      } else if (quickFilter === 'chef_food') {
        matchesQuick = preset.pictureSequenceType === '2_pic_chef_food' || preset.category === 'food';
      } else if (quickFilter === 'claim_ready') {
        matchesQuick = Boolean(preset.defaultClaim && preset.defaultBrand);
      }

      // Tag filter
      const matchesTag = !activeTagFilter || preset.bestFor.some(t => t.toLowerCase() === activeTagFilter.toLowerCase());

      // Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        preset.name.toLowerCase().includes(q) ||
        preset.description.toLowerCase().includes(q) ||
        preset.clientType.toLowerCase().includes(q) ||
        preset.cameraSetup.toLowerCase().includes(q) ||
        preset.lightingStyle.toLowerCase().includes(q) ||
        preset.promptSnippet.toLowerCase().includes(q) ||
        (preset.referenceImagesHint && preset.referenceImagesHint.toLowerCase().includes(q)) ||
        (preset.defaultClaim && preset.defaultClaim.toLowerCase().includes(q)) ||
        (preset.defaultBrand && preset.defaultBrand.toLowerCase().includes(q)) ||
        preset.bestFor.some(tag => tag.toLowerCase().includes(q));

      return matchesCategory && matchesQuick && matchesTag && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'title_asc') return a.name.localeCompare(b.name);
      if (sortBy === 'title_desc') return b.name.localeCompare(a.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0; // relevance (default order)
    });
  }, [selectedCategory, quickFilter, activeTagFilter, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredPresets.length / itemsPerPage) || 1;
  const paginatedPresets = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPresets.slice(start, start + itemsPerPage);
  }, [filteredPresets, currentPage, itemsPerPage]);

  const activePreset = useMemo(() => {
    if (!state.commercialPresetId) return null;
    return COMMERCIAL_MASTER_PRESETS.find(p => p.id === state.commercialPresetId) || null;
  }, [state.commercialPresetId]);

  // -------------------------------------------------------------
  // 4. CATEGORY & MOOD-MATCHED SLOGAN SUGGESTIONS ENGINE
  // -------------------------------------------------------------
  const availableMoodFilters = useMemo(() => {
    if (selectedCategory === 'gastro') {
      return [
        { id: 'all', label: isEn ? 'All Tones' : 'Alle Tonalitäten', icon: Sparkles },
        { id: 'luxury', label: isEn ? '🍷 Fine Dining & Atmosphere' : '🍷 Fine Dining & Kerzenschein', icon: Crown },
        { id: 'fresh_natural', label: isEn ? '🌿 Bistro & Organic' : '🌿 Bistro & Frische', icon: Leaf },
      ];
    }
    if (selectedCategory === 'immobilien') {
      return [
        { id: 'all', label: isEn ? 'All Tones' : 'Alle Tonalitäten', icon: Sparkles },
        { id: 'luxury', label: isEn ? '💎 Luxury & Estates' : '💎 High-End Luxus', icon: Crown },
        { id: 'modern_genesis', label: isEn ? '🏗️ Genesis & New Build' : '🏗️ Genesis Neubau', icon: Building2 },
        { id: 'fresh_natural', label: isEn ? '🌿 Coastal & Nature' : '🌿 Küste & Natur', icon: Leaf },
      ];
    }
    if (selectedCategory === 'food') {
      return [
        { id: 'all', label: isEn ? 'All Tones' : 'Alle Tonalitäten', icon: Sparkles },
        { id: 'fresh_natural', label: isEn ? '🌱 Fresh & Organic' : '🌱 Frisch & Natürlich', icon: Leaf },
        { id: 'sizzling_energetic', label: isEn ? '🔥 Sizzling Foodporn' : '🔥 Sizzling & Steak', icon: Flame },
        { id: 'artisanal', label: isEn ? '🌾 Artisanal Bakery' : '🌾 Handwerk & Backstube', icon: Award },
      ];
    }
    if (selectedCategory === 'fashion') {
      return [
        { id: 'all', label: isEn ? 'All Tones' : 'Alle Tonalitäten', icon: Sparkles },
        { id: 'luxury', label: isEn ? '✨ Haute Couture' : '✨ Haute Couture', icon: Crown },
        { id: 'sizzling_energetic', label: isEn ? '⚡ Streetwear Drop' : '⚡ Streetwear Drop', icon: Zap },
      ];
    }
    if (selectedCategory === 'travel') {
      return [
        { id: 'all', label: isEn ? 'All Tones' : 'Alle Tonalitäten', icon: Sparkles },
        { id: 'luxury', label: isEn ? '🏝️ Luxury Resort' : '🏝️ 5-Sterne Resort', icon: Crown },
        { id: 'zen_wellness', label: isEn ? '🧘 Zen & Wellness' : '🧘 Zen & Kultur', icon: Sparkle },
      ];
    }
    if (selectedCategory === 'inneneinrichtung') {
      return [
        { id: 'all', label: isEn ? 'All Tones' : 'Alle Tonalitäten', icon: Sparkles },
        { id: 'minimalist', label: isEn ? '📐 Nordic Scandi' : '📐 Nordic Scandi', icon: Sofa },
        { id: 'luxury', label: isEn ? '👑 Bespoke Kitchen' : '👑 Bespoke Küchen', icon: Crown },
        { id: 'artisanal', label: isEn ? '🪵 Solid Wood Craft' : '🪵 Massivholz Handwerk', icon: Building2 },
      ];
    }
    if (selectedCategory === 'comic') {
      return [
        { id: 'all', label: isEn ? 'All Tones' : 'Alle Tonalitäten', icon: Sparkles },
        { id: 'playful_pop', label: isEn ? '💬 Viral Cartoon' : '💬 Viral Cartoon', icon: Sparkles },
        { id: 'tech_saas', label: isEn ? '🚀 Tech & SaaS' : '🚀 Tech & SaaS', icon: Zap },
      ];
    }
    return [
      { id: 'all', label: isEn ? 'All Tones' : 'Alle Tonalitäten', icon: Sparkles },
      { id: 'luxury', label: isEn ? '💎 Luxury' : '💎 Luxus', icon: Crown },
      { id: 'fresh_natural', label: isEn ? '🌱 Fresh & Natural' : '🌱 Frisch & Natürlich', icon: Leaf },
      { id: 'modern_genesis', label: isEn ? '🏗️ Genesis / Build' : '🏗️ Genesis & Bau', icon: Building2 },
      { id: 'artisanal', label: isEn ? '🌾 Craft & Bakery' : '🌾 Handwerk', icon: Award },
    ];
  }, [selectedCategory, isEn]);

  const suggestedSlogans = useMemo(() => {
    let list = [...DURATION_OPTIMIZED_SLOGANS];

    // Filter by active category if not 'all'
    if (selectedCategory !== 'all') {
      list = list.filter(s => s.category === selectedCategory);
    }

    // Filter by mood / tone
    if (selectedMood !== 'all') {
      list = list.filter(s => s.mood === selectedMood);
    }

    // Filter by duration tier
    if (claimTierFilter === 'auto_matched') {
      list = list.filter(s => s.durationTier === recommendedOutroBudgetSec.tier);
    } else if (claimTierFilter !== 'all') {
      list = list.filter(s => s.durationTier === claimTierFilter);
    }

    return list;
  }, [selectedCategory, selectedMood, claimTierFilter, recommendedOutroBudgetSec.tier]);

  const handleSelectPreset = (preset: CommercialPreset | 'none') => {
    if (preset === 'none') {
      onUpdateState(prev => ({
        ...prev,
        commercialPresetId: undefined,
      }));
      onShowToast(isEn ? 'Commercial Preset deactivated' : 'Commercial Preset deaktiviert');
      return;
    }

    // Determine category-tailored default CTA
    const categoryCta = 
      preset.category === 'gastro'
        ? '@restaurant.funk.royal'
        : preset.category === 'grill_aussenkueche'
        ? 'Showroom besuchen & Planungsgespräch vereinbaren | www.flammkraft.com'
        : preset.category === 'food'
        ? 'Tisch reservieren & Menü entdecken'
        : preset.category === 'fashion'
        ? 'Online Store entdecken | www.exclusive-collection.com'
        : preset.category === 'travel'
        ? 'Traumurlaub buchen | www.luxury-resort.com'
        : preset.category === 'inneneinrichtung'
        ? 'Showroom besuchen | www.interior-studio.de'
        : preset.category === 'comic'
        ? 'Jetzt Kapitel 1 lesen | www.comic-universe.com'
        : 'Exklusive Neubauprojekte anfragen | www.genesis-homes.de';

    // Direct clean update - always load the preset's matching brand, claim, animation & spatial text
    onUpdateState(prev => ({
      ...prev,
      commercialPresetId: preset.id,
      commercialBrandName: preset.defaultBrand || (preset.category === 'grill_aussenkueche' ? 'FLAMMKRAFT OUTDOOR' : preset.category === 'food' ? 'GOURMET KITCHEN' : 'BRAND'),
      commercialClaim: preset.defaultClaim || '',
      commercialOutroAnimation: preset.defaultOutroAnimation || 'brand_logo_reveal',
      commercialCallToAction: categoryCta,
      spatialTextOverlayEnabled: Boolean(preset.defaultSpatialText),
      spatialTextPosition: preset.spatialPositionDefault || (preset.category === 'grill_aussenkueche' ? 'integrated_facade_glass' : preset.category === 'food' ? 'floating_golden_3d' : 'architectural_roof_curb'),
      spatialTextContent: preset.defaultSpatialText || '',
      cameraMotion: preset.cameraSetup,
      lighting: preset.lightingStyle,
      lensStyle: preset.lensChoice,
      voiceoverEnabled: true,
      narratorVoice: preset.suggestedVoice || prev.narratorVoice,
    }));
    onShowToast(isEn ? `🚀 Commercial Preset applied: ${preset.name}` : `🚀 Vorlage geladen: ${preset.name} (Claim & Marke aktualisiert)`);
  };

  const handleApplySloganSuggestion = (suggestion: SloganSuggestion) => {
    onUpdateState(prev => ({
      ...prev,
      commercialBrandName: suggestion.brand,
      commercialClaim: suggestion.claim,
      commercialCallToAction: suggestion.cta,
    }));
    onShowToast(
      isEn
        ? `✨ Slogan "${suggestion.claim}" applied (${suggestion.charCount} chars | ~${suggestion.estimatedSeconds}s outro)`
        : `✨ Slogan "${suggestion.claim}" übernommen (${suggestion.charCount} Z. | ~${suggestion.estimatedSeconds}s Abspann)`
    );
  };

  const handleClearClaim = () => {
    onUpdateState(prev => ({
      ...prev,
      commercialBrandName: '',
      commercialClaim: '',
      commercialCallToAction: '',
    }));
    onShowToast(isEn ? 'Brand claim reset' : 'Claim & Slogan zurückgesetzt');
  };

  const handleCopyPrompt = (preset: CommercialPreset) => {
    navigator.clipboard.writeText(preset.promptSnippet);
    setCopiedId(preset.id);
    onShowToast(isEn ? 'Commercial prompt snippet copied!' : 'Commercial Prompt-Snippet kopiert!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyOutroSnippet = () => {
    const outroText = formatCommercialOutroAbspann(
      state.commercialClaim,
      state.commercialBrandName,
      state.commercialCallToAction,
      state.commercialOutroStyle,
      state.commercialOutroAnimation,
      state.spatialTextOverlayEnabled,
      state.spatialTextPosition,
      state.spatialTextContent
    ) || '[COMMERCIAL OUTRO & BRAND CLAIM ABSPANN: Inactive]';

    navigator.clipboard.writeText(outroText);
    setCopiedScript(true);
    onShowToast(isEn ? 'Outro prompt block copied!' : 'Abspann-Prompt-Block kopiert!');
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleResetFilters = () => {
    onUpdateState(prev => ({ ...prev, category: 'all' as any }));
    setSelectedMood('all');
    setQuickFilter('all');
    setActiveTagFilter(null);
    setSearchQuery('');
    setSortBy('relevance');
    setCurrentPage(1);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          onShowToast(isEn ? `✅ Successfully loaded ${json.length} commercial presets!` : `✅ ${json.length} Commercial Presets erfolgreich geladen!`);
        } else {
          onShowToast(isEn ? '⚠️ Invalid JSON format.' : '⚠️ Ungültiges JSON-Format.');
        }
      } catch {
        onShowToast(isEn ? '❌ Error parsing JSON file.' : '❌ Fehler beim Parsen der JSON-Datei.');
      }
    };
    reader.readAsText(file);
  };

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const tokens = searchQuery.trim().split(/\s+/).filter(Boolean);
    const regex = new RegExp(`(${tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-300 text-slate-950 font-bold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const categories = [
    { id: 'all', label: isEn ? 'All Presets' : 'Alle (184+ Ads)', icon: Sparkles, count: counts.all },
    { id: 'cinema', label: isEn ? 'Cinema & Trailers' : '🎬 Kino & Trailer', icon: Film, count: counts.cinema },
    { id: 'gastro', label: isEn ? 'Gastro & Atmosphere' : '🍷 Gastro & Bar', icon: UtensilsCrossed, count: counts.gastro },
    { id: 'grill_aussenkueche', label: isEn ? 'Grill & Outdoor' : '🔥 Grill & Außenküche', icon: Flame, count: counts.grill_aussenkueche },
    { id: 'immobilien', label: isEn ? 'Real Estate & Genesis' : '🏠 Immobilien & Bau', icon: Building2, count: counts.immobilien },
    { id: 'food', label: isEn ? 'Food & Gourmet' : '🍽️ Food & Chef', icon: Utensils, count: counts.food },
    { id: 'restaurant', label: isEn ? 'Restaurant & Dining' : '🍱 Restaurant & Kulinarik', icon: UtensilsCrossed, count: counts.restaurant },
    { id: 'fashion', label: isEn ? 'Fashion & Luxury' : '👗 Fashion & Haute Couture', icon: Shirt, count: counts.fashion },
    { id: 'travel', label: isEn ? 'Travel & Tourism' : '🏖️ Travel & Resort', icon: Compass, count: counts.travel },
    { id: 'inneneinrichtung', label: isEn ? 'Interior & Living' : '🛋️ Interior & Möbel', icon: Sofa, count: counts.inneneinrichtung },
    { id: 'comic', label: isEn ? 'Comic & Line Art' : '✏️ Comic Ads', icon: PenTool, count: counts.comic },
    { id: 'lingerie', label: isEn ? 'Haute Lingerie (B&W)' : '🖤 Haute Lingerie', icon: Sparkle, count: counts.lingerie },
    { id: 'erotik', label: isEn ? 'Sensual & Boudoir' : '💋 Sinnlich & Erotik', icon: Heart, count: counts.erotik },
    { id: 'birthday', label: isEn ? 'Birthdays & Parties' : '🎂 Geburtstag & Party', icon: Gift, count: counts.birthday },
    { id: 'horror', label: isEn ? 'Horror & Mystery' : '👻 Horror & Mystery', icon: Flame, count: counts.horror },
    { id: 'sitcom', label: isEn ? 'Sitcom & Comedy' : '📺 Sitcom & Comedy', icon: Tv, count: counts.sitcom },
    { id: 'scify', label: isEn ? 'Sci-Fi & Universe' : '🚀 Sci-Fi & Weltraum', icon: Rocket, count: counts.scify },
    { id: 'cyberpunk', label: isEn ? 'Cyberpunk & Neo-Noir' : '🌆 Cyberpunk', icon: Sparkles, count: counts.cyberpunk },
    { id: 'bau', label: isEn ? 'Construction & Craft' : '🏗️ Bau & Handwerk', icon: Building, count: counts.bau },
    { id: 'action', label: isEn ? 'Action & Blockbuster' : '⚡ Action & Stunts', icon: Zap, count: counts.action },
    { id: 'fantasy', label: isEn ? 'Dark Fantasy' : '🧙‍♂️ Dark Fantasy', icon: Wand2, count: counts.fantasy },
    { id: 'nature', label: isEn ? 'Nature & Outdoor' : '🌲 Natur & Abenteuer', icon: Trees, count: counts.nature },
    { id: 'war', label: isEn ? 'War & Tactical' : '⚔️ Kriegsfilm & Tactical', icon: Crosshair, count: counts.war },
    { id: 'politics', label: isEn ? 'Politics & Debates' : '🏛️ Politik & Wahlkampf', icon: Landmark, count: counts.politics },
    { id: 'immersive', label: isEn ? 'Immersive (POV)' : '🥽 Immersive Ego-POV', icon: Eye, count: counts.immersive },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-24 max-w-7xl mx-auto px-2 sm:px-4">
      {/* Hidden file input for JSON import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportJson}
        accept=".json,application/json"
        className="hidden"
      />

      {/* TOP HEADER & VIEW MODE TOGGLE BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-indigo-500 text-white font-mono font-black text-[10px] rounded-md uppercase tracking-wider">
                Commercial Ad Engine
              </span>
              <span className="text-xs text-amber-400 font-bold font-mono">
                {COMMERCIAL_MASTER_PRESETS.length} {isEn ? 'Elite Presets' : 'Elite-Vorlagen'}
              </span>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px] font-extrabold flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-amber-400" />
                {totalVideoSeconds}s Video Length (~{outroExposureSeconds}s Outro Card)
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-indigo-400" />
              {isEn ? 'Commercial Advertising Studio & Side-by-Side Claim Editor' : 'Werbefilm-Studio & Side-by-Side Claim-Editor'}
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              {isEn
                ? 'Select high-impact commercial video presets while simultaneously crafting duration-optimized brand claims, slogans, and outro Call-to-Actions in real-time.'
                : 'Wähle hochkarätige Werbefilm-Vorlagen (Genesis-Neubau, 3D-Grundrisse, Foodporn 1000fps) und konfiguriere simultan im Side-by-Side Editor laufzeit- und zeichenoptimierte Marken-Slogans (z.B. Luxus für Immobilien vs. Frisch & Natürlich für Food).'}
            </p>
          </div>

          {/* Top Actions & Layout Toggle */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* View Layout Mode Pills */}
            <div className="inline-flex p-1 bg-slate-950/80 border border-indigo-700/60 rounded-xl text-xs gap-1 shadow-inner">
              <button
                onClick={() => setLayoutMode('split')}
                className={`px-3 py-1.5 rounded-lg font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  layoutMode === 'split'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={isEn ? 'Side-by-Side Split View (Presets + Claim Editor)' : 'Side-by-Side Ansicht (Vorlagen + Claim-Editor)'}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>{isEn ? 'Side-by-Side' : 'Split Ansicht'}</span>
              </button>

              <button
                onClick={() => setLayoutMode('catalog')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  layoutMode === 'catalog'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={isEn ? 'Show Full Preset Catalog' : 'Nur Vorlagenkatalog'}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isEn ? 'Catalog' : 'Katalog'}</span>
              </button>

              <button
                onClick={() => setLayoutMode('editor')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  layoutMode === 'editor'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={isEn ? 'Focus on Claim Editor' : 'Nur Claim-Editor'}
              >
                <Type className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isEn ? 'Editor' : 'Editor'}</span>
              </button>
            </div>

            {/* Export / Import Buttons */}
            <button
              onClick={() => exportCommercialPresetsToJson()}
              className="flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              title={isEn ? 'Download all commercial presets as .json' : 'Alle Commercial Presets als .json herunterladen'}
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isEn ? 'JSON' : 'Export'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK ANALOG FILM STOCK & OPTIK BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-500/40 rounded-2xl p-3 sm:p-4 text-white shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl shrink-0">
            <Camera className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-cyan-300 uppercase tracking-wider font-mono">
                🎞️ Analog Film Stock & Optik (Analog Engine)
              </span>
              {state.analogPresetId && (
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold rounded border border-cyan-500/30">
                  Aktiv: {ANALOG_MASTER_PRESETS.find(p => p.id === state.analogPresetId)?.badge}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              {isEn
                ? 'Emulate 35mm Kodak, Super 8, Helios 44-2 bokeh, Soviet Anamorphic flares, and vintage film grain for commercial ads.'
                : 'Kodak 35mm, Super 8, Helios 44-2 Anamorphic Bokeh, Soviet Vintage Lens & Fuji Eterna Emulation direkt für Werbespots.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={state.analogPresetId || ''}
            onChange={(e) => onUpdateState(prev => ({ ...prev, analogPresetId: e.target.value || undefined }))}
            className="bg-slate-950 border border-cyan-600/70 text-cyan-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-400 cursor-pointer shadow-inner"
          >
            <option value="">{isEn ? '-- Clean Digital 8K (No Analog) --' : '-- Clean Digital 8K (Kein Analog-Look) --'}</option>
            {ANALOG_MASTER_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.badge} — {preset.name}
              </option>
            ))}
          </select>
          {state.analogPresetId && (
            <button
              onClick={() => onUpdateState(prev => ({ ...prev, analogPresetId: undefined }))}
              className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-xl border border-slate-700 cursor-pointer"
              title={isEn ? 'Clear Analog Emulation' : 'Analog-Look entfernen'}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN SIDE-BY-SIDE GRID LAYOUT (PRESET CATALOG + CLAIM EDITOR)
         ========================================================================= */}
      <div className={`grid gap-6 ${
        layoutMode === 'split'
          ? 'grid-cols-1 lg:grid-cols-12'
          : layoutMode === 'catalog'
          ? 'grid-cols-1'
          : 'grid-cols-1'
      }`}>
        
        {/* =======================================================================
            LEFT COLUMN: COMMERCIAL PRESETS CATALOG (Visible in split & catalog mode)
           ======================================================================= */}
        {(layoutMode === 'split' || layoutMode === 'catalog') && (
          <div className={`space-y-4 ${layoutMode === 'split' ? 'lg:col-span-7 xl:col-span-7' : 'w-full'}`}>
            {/* SEARCH & QUICK FILTERS CARD */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-xs">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Main Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isEn
                        ? 'Search presets (e.g. Makler, Wagyu, Penthouse, Grundriss, Comic, Sushi)...'
                        : 'Suche nach Stichwort (z.B. Makler, Baugebiet, Grundriss, Wagyu, Foodporn)...'
                    }
                    className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[11px] font-bold text-slate-600">{isEn ? 'Sort:' : 'Sortierung:'}</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="bg-transparent text-xs font-extrabold text-slate-900 focus:outline-none cursor-pointer"
                    >
                      <option value="relevance">{isEn ? 'Featured' : 'Empfohlen'}</option>
                      <option value="title_asc">{isEn ? 'Title (A → Z)' : 'Titel (A → Z)'}</option>
                      <option value="title_desc">{isEn ? 'Title (Z → A)' : 'Titel (Z → A)'}</option>
                      <option value="category">{isEn ? 'Category' : 'Kategorie'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* QUICK FILTER CHIPS */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-extrabold text-slate-500 mr-1 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-slate-400" />
                  {isEn ? 'Format:' : 'Format:'}
                </span>

                <button
                  onClick={() => setQuickFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    quickFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isEn ? 'All Formats' : 'Alle'}
                </button>

                <button
                  onClick={() => setQuickFilter('genesis_immo')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    quickFilter === 'genesis_immo'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <span>🏗️</span>
                  <span>3-Pic Genesis</span>
                </button>

                <button
                  onClick={() => setQuickFilter('floorplan_immo')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    quickFilter === 'floorplan_immo'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <span>📐</span>
                  <span>3-Pic Grundriss</span>
                </button>

                <button
                  onClick={() => setQuickFilter('chef_food')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    quickFilter === 'chef_food'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <span>🥩</span>
                  <span>2-Pic Koch/Food</span>
                </button>

                <button
                  onClick={() => setQuickFilter('claim_ready')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    quickFilter === 'claim_ready'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  <span>📢</span>
                  <span>Claim Bereit</span>
                </button>
              </div>
            </div>

            {/* CATEGORY PILL TABS */}
            <div className="flex flex-wrap gap-1.5">
              {categories.filter(cat => cat.id === 'all' || cat.count > 0).map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onUpdateState(prev => ({ ...prev, category: cat.id as any }));
                      setSelectedMood('all'); // reset mood filter to all on category change
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                    <span
                      className={`ml-0.5 px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                        isActive ? 'bg-slate-950 text-amber-300 font-bold' : 'bg-slate-100 text-slate-600 font-bold'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* RESULTS STATUS */}
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-600 px-1">
              <span>
                {filteredPresets.length} {isEn ? 'Commercial Presets' : 'Werbe-Vorlagen'} (Seite {currentPage}/{totalPages})
              </span>
              {activePresetId !== 'none' && (
                <span className="text-indigo-600 font-black flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  {isEn ? 'Active:' : 'Aktiv:'} {COMMERCIAL_MASTER_PRESETS.find(p => p.id === activePresetId)?.name}
                </span>
              )}
            </div>

            {/* PRESET CARDS LIST / GRID */}
            <div className={`grid gap-4 ${
              layoutMode === 'split' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {paginatedPresets.map((preset) => {
                const isActive = activePresetId === preset.id;
                const isConstruction = preset.pictureSequenceType === '3_pic_construction';
                const isFloorplan = preset.pictureSequenceType === '3_pic_floorplan';
                const isFoodporn = preset.pictureSequenceType === '2_pic_chef_food' || preset.category === 'food';
                const isComic = preset.category === 'comic';
                const isCopied = copiedId === preset.id;

                return (
                  <div
                    key={preset.id}
                    className={`group bg-white border rounded-2xl overflow-hidden transition-all shadow-xs flex flex-col justify-between hover:shadow-md ${
                      isActive
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                        : isConstruction
                        ? 'border-emerald-300 hover:border-emerald-500'
                        : isFloorplan
                        ? 'border-blue-300 hover:border-blue-500'
                        : isFoodporn
                        ? 'border-amber-300 hover:border-amber-500'
                        : isComic
                        ? 'border-purple-300 hover:border-purple-500'
                        : 'border-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    {/* Card Header Bar */}
                    <div
                      className={`p-3 text-white flex items-center justify-between border-b ${
                        isConstruction
                          ? 'bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-emerald-900/60'
                          : isFloorplan
                          ? 'bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-blue-900/60'
                          : isFoodporn
                          ? 'bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border-amber-900/60'
                          : isComic
                          ? 'bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border-purple-900/60'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-xs text-amber-300 flex items-center gap-1">
                          {isConstruction ? '🏗️' : isFloorplan ? '📐' : isFoodporn ? '🥩' : isComic ? '✏️' : <Bookmark className="w-3.5 h-3.5 text-amber-400" />}
                          {preset.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setViewingJsonPreset(preset)}
                          className="text-slate-400 hover:text-amber-300 p-1 cursor-pointer transition-colors"
                          title="JSON Schema"
                        >
                          <FileJson className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopyPrompt(preset)}
                          className="text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
                          title="Copy Prompt"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                          {highlightText(preset.name)}
                        </h3>

                        <div className="text-[10px] font-bold text-indigo-600 mt-0.5">
                          {preset.clientType}
                        </div>

                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                          {highlightText(preset.description)}
                        </p>

                        {/* Reference Sequence Hint */}
                        {preset.referenceImagesHint && (
                          <div className="mt-2 p-1.5 bg-indigo-50/80 border border-indigo-200/80 rounded-lg text-[10px] text-indigo-950 font-bold flex items-center gap-1.5">
                            <span className="text-indigo-600 shrink-0">🎯 {isEn ? 'Seq:' : 'Seq:'}</span>
                            <span className="font-mono text-[9px] text-indigo-900 truncate">{preset.referenceImagesHint}</span>
                          </div>
                        )}

                        {/* Default Slogan Box & Spatial In-Scene Overlay Tags */}
                        {preset.defaultClaim && (
                          <div className="mt-2 p-2 bg-amber-50/90 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-center justify-between gap-1.5">
                            <div className="truncate">
                              <span className="text-[8px] font-black uppercase text-amber-800 block flex items-center gap-1">
                                <span>{isEn ? 'Recommended Claim:' : 'Empfohlener Slogan:'}</span>
                                {preset.defaultOutroAnimation && (
                                  <span className="text-[7px] px-1 py-0.2 bg-amber-200/80 text-amber-900 rounded font-mono font-bold">
                                    {preset.defaultOutroAnimation.replace(/_/g, ' ')}
                                  </span>
                                )}
                              </span>
                              <span className="font-extrabold text-[10px] text-amber-950 truncate block">
                                "{preset.defaultClaim}"
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                onUpdateState(prev => ({
                                  ...prev,
                                  commercialBrandName: preset.defaultBrand || (preset.category === 'food' ? 'GOURMET KITCHEN' : 'BRAND'),
                                  commercialClaim: preset.defaultClaim || '',
                                  commercialOutroAnimation: preset.defaultOutroAnimation || 'brand_logo_reveal',
                                  spatialTextOverlayEnabled: Boolean(preset.defaultSpatialText),
                                  spatialTextPosition: preset.spatialPositionDefault || (preset.category === 'food' ? 'floating_golden_3d' : 'architectural_roof_curb'),
                                  spatialTextContent: preset.defaultSpatialText || '',
                                  voiceoverEnabled: true,
                                  narratorVoice: preset.suggestedVoice || prev.narratorVoice,
                                }));
                                onShowToast(isEn ? `Claim & Animation applied: "${preset.defaultClaim}"` : `Claim & Animation übernommen: "${preset.defaultClaim}"`);
                              }}
                              className="px-2 py-0.5 bg-amber-300 hover:bg-amber-400 text-amber-950 font-black rounded text-[9px] shrink-0 cursor-pointer shadow-xs"
                            >
                              {isEn ? 'Load' : 'Laden'}
                            </button>
                          </div>
                        )}

                        {/* Spatial In-Scene Selling Point Pill */}
                        {preset.defaultSpatialText && (
                          <div className="mt-1.5 p-1.5 bg-slate-900 border border-indigo-500/30 rounded-lg text-[9px] text-slate-300 flex items-start gap-1">
                            <span className="text-amber-400 font-bold shrink-0">🏛️ 3D In-Scene:</span>
                            <span className="text-slate-200 truncate font-medium">{preset.defaultSpatialText}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Action Button */}
                      <button
                        onClick={() => handleSelectPreset(preset)}
                        className={`w-full py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isActive
                            ? 'bg-indigo-600 text-white ring-2 ring-indigo-600/30'
                            : 'bg-slate-900 hover:bg-indigo-600 text-white'
                        }`}
                      >
                        {isActive ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{isEn ? 'Active in Prompt' : '✓ Im Prompt Aktiviert'}</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isEn ? 'Apply Preset' : 'Preset Übernehmen'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CATALOG PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-2 pb-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`w-7 h-7 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        currentPage === num
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === totalPages
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* =======================================================================
            RIGHT COLUMN: SIDE-BY-SIDE DURATION- & CHARACTER-AWARE CLAIM & OUTRO EDITOR
           ======================================================================= */}
        {(layoutMode === 'split' || layoutMode === 'editor') && (
          <div className={`space-y-4 ${
            layoutMode === 'split' ? 'lg:col-span-5 xl:col-span-5' : 'max-w-4xl mx-auto w-full'
          }`}>
            <div className="bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/40 rounded-2xl p-4 sm:p-5 text-white shadow-lg space-y-4 sticky top-4">
              {/* Claim Editor Header & Duration Badge */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg">
                      <Tv className="w-4 h-4" />
                    </span>
                    <h3 className="text-sm font-black text-white">
                      {isEn ? 'Side-by-Side Claim & Outro Studio' : 'Side-by-Side Claim & Abspann-Editor'}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {isEn
                      ? 'Calculates optimal character limits & suggests tailored category slogans.'
                      : 'Berechnet optimale Zeichenanzahl für Outro-Cards und schlägt kategoriefokussierte Slogans vor.'}
                  </p>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-xs font-black font-mono shadow-xs block">
                    ⏱️ {totalVideoSeconds}s Spot
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono mt-0.5 block font-bold">
                    Outro: ~{outroExposureSeconds}s Card
                  </span>
                </div>
              </div>

              {/* LIVE OUTRO CARD CHARACTER LIMIT & READABILITY GAUGE */}
              <div className="bg-slate-950/90 border border-indigo-900/60 rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-amber-400" />
                    {isEn ? 'Outro Card Character Density & Legibility:' : 'Outro-Card Zeichendichte & Lesbarkeit:'}
                  </span>
                  <span className={`font-mono text-[11px] font-extrabold ${
                    claimMetrics.charStatus === 'overflow' ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {claimMetrics.totalChars} / {optimalCharLimits.idealChars} Z. ({claimMetrics.estimatedSpeechSec}s Audio)
                  </span>
                </div>

                {/* Visual Character Meter Progress Bar */}
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800 flex relative">
                  <div
                    className={`h-full transition-all duration-300 ${
                      claimMetrics.charStatus === 'overflow'
                        ? 'bg-rose-500'
                        : claimMetrics.charStatus === 'dense'
                        ? 'bg-amber-400'
                        : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400'
                    }`}
                    style={{ 
                      width: `${Math.min(100, Math.max(8, (claimMetrics.totalChars / (optimalCharLimits.maxChars || 1)) * 100))}%` 
                    }}
                  />
                </div>

                {/* Sub-limits badge pill breakdown */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                  <span className={claimMetrics.brandChars > optimalCharLimits.brandLimit ? 'text-amber-400 font-bold' : ''}>
                    Marke: {claimMetrics.brandChars}/{optimalCharLimits.brandLimit}
                  </span>
                  <span className={claimMetrics.claimChars > optimalCharLimits.claimLimit ? 'text-amber-400 font-bold' : ''}>
                    Claim: {claimMetrics.claimChars}/{optimalCharLimits.claimLimit}
                  </span>
                  <span className={claimMetrics.ctaChars > optimalCharLimits.ctaLimit ? 'text-amber-400 font-bold' : ''}>
                    CTA: {claimMetrics.ctaChars}/{optimalCharLimits.ctaLimit}
                  </span>
                </div>

                {/* Live Feedback Message */}
                <div className={`text-[10px] font-medium leading-relaxed rounded-lg p-1.5 ${
                  claimMetrics.charStatus === 'overflow'
                    ? 'bg-rose-950/60 border border-rose-900 text-rose-200'
                    : claimMetrics.charStatus === 'dense'
                    ? 'bg-amber-950/40 border border-amber-900/50 text-amber-200'
                    : 'bg-slate-900/80 text-slate-300'
                }`}>
                  {isEn ? claimMetrics.feedbackEn : claimMetrics.feedbackDe}
                </div>
              </div>

              {/* LIVE OUTRO CARD VISUAL PREVIEW BOX */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                  <span className="flex items-center gap-1 text-indigo-300">
                    <MonitorPlay className="w-3 h-3 text-indigo-400" />
                    {isEn ? 'Live 16:9 Outro Card Simulation' : 'Live Outro-Card Vorschau'}
                  </span>
                  <span className="font-mono text-slate-400">
                    {(state.commercialOutroStyle || 'cinematic_fade_black').replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>

                {/* Aspect Box Simulation */}
                <div className={`w-full aspect-video rounded-lg p-3 flex flex-col items-center justify-center text-center transition-all border ${
                  state.commercialOutroStyle === 'clean_white_minimal'
                    ? 'bg-slate-100 text-slate-900 border-slate-300'
                    : state.commercialOutroStyle === 'comic_speech_punch'
                    ? 'bg-amber-400 text-slate-950 border-amber-500 font-sans'
                    : 'bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white border-slate-800'
                }`}>
                  {/* Brand Typography */}
                  <div className="font-black text-xs uppercase tracking-widest text-amber-300 truncate max-w-full">
                    {state.commercialBrandName?.trim() || (isEn ? 'YOUR BRAND' : (selectedCategory === 'food' ? 'GOURMET KITCHEN' : 'DEINE MARKE'))}
                  </div>

                  {/* Slogan Claim Typography */}
                  <div className={`font-black text-xs sm:text-sm mt-1 max-w-[90%] leading-tight ${
                    state.commercialOutroStyle === 'clean_white_minimal' ? 'text-slate-900' : 'text-white'
                  }`}>
                    {state.commercialClaim?.trim() 
                      ? `"${state.commercialClaim.trim()}"` 
                      : (selectedCategory === 'food' 
                          ? '„Leidenschaft, die man schmeckt.“' 
                          : selectedCategory === 'fashion' 
                          ? '„Elegance in Every Thread.“' 
                          : selectedCategory === 'travel' 
                          ? '„Where Dreams Take Flight.“' 
                          : selectedCategory === 'comic' 
                          ? '„Das nächste Level beginnt jetzt.“' 
                          : (isEn ? '“Living Above the Ordinary.”' : '„Ihr Raum. Ihre Vision.“'))}
                  </div>

                  {/* CTA Subline */}
                  {state.commercialCallToAction?.trim() && (
                    <div className="text-[9px] font-bold text-emerald-400 mt-1.5 opacity-90 truncate max-w-[85%]">
                      {state.commercialCallToAction.trim()}
                    </div>
                  )}
                </div>
              </div>

              {/* ACTIVE PRESET QUICK-SYNC & ACTION CONTROLS */}
              {activePreset && (
                <div className="p-2.5 bg-indigo-950/80 border border-indigo-500/40 rounded-xl flex items-center justify-between gap-2 text-xs">
                  <div className="truncate">
                    <span className="text-[9px] text-indigo-300 font-bold block uppercase flex items-center gap-1">
                      <span>✓ {isEn ? 'Active Preset:' : 'Aktive Vorlage:'}</span>
                      <span className="text-amber-300 truncate">{activePreset.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-300 truncate block">
                      {activePreset.defaultBrand}: "{activePreset.defaultClaim}"
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleSelectPreset(activePreset)}
                      className="px-2 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg text-[10px] cursor-pointer shadow-xs"
                      title={isEn ? 'Reset Claim & Brand to Preset Defaults' : 'Claim & Marke der Vorlage neu laden'}
                    >
                      {isEn ? 'Sync Defaults' : 'Vorlage-Defaults laden'}
                    </button>
                    <button
                      onClick={handleClearClaim}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-lg text-[10px] cursor-pointer"
                      title={isEn ? 'Clear Claim Fields' : 'Felder leeren'}
                    >
                      {isEn ? 'Clear' : 'Leeren'}
                    </button>
                  </div>
                </div>
              )}

              {/* CLAIM INPUT FORM FIELDS */}
              <div className="space-y-3">
                {/* MASTER VOICEOVER CONTROL TOGGLE */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  state.voiceoverEnabled 
                    ? 'bg-emerald-950/40 border-emerald-800/80 shadow-xs' 
                    : 'bg-slate-900/60 border-slate-800/80'
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-black font-mono tracking-wider ${
                          state.voiceoverEnabled 
                            ? 'bg-emerald-900/60 text-emerald-300' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {state.voiceoverEnabled 
                            ? (isEn ? 'VOICEOVER: ACTIVE' : 'VOICEOVER: AKTIV') 
                            : (isEn ? 'VOICEOVER: MUTED' : 'VOICEOVER: STUMM')}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {isEn ? 'Sprecher & Dialog-Kontrolle' : 'Sprecher & Dialog-Kontrolle'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 max-w-xl leading-relaxed">
                        {isEn 
                          ? 'Mutes any unwanted audio narration or spoken words. The ad will remain purely visual.' 
                          : 'Unterdrückt unerwünschtes Gequatsche oder Sprechertexte komplett. Die Werbung bleibt rein visuell.'}
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => onUpdateState(prev => ({ ...prev, voiceoverEnabled: !prev.voiceoverEnabled }))}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        state.voiceoverEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          state.voiceoverEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 1. Brand / Client Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-indigo-200 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                      {isEn ? 'Brand / Client Name' : 'Markenname / Brand'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {claimMetrics.brandChars}/{optimalCharLimits.brandLimit} Chars
                    </span>
                  </label>
                  <input
                    type="text"
                    value={state.commercialBrandName || ''}
                    onChange={(e) => onUpdateState(prev => ({ ...prev, commercialBrandName: e.target.value }))}
                    placeholder={
                      selectedCategory === 'food'
                        ? 'z.B. FUOCO & MIELE PIZZA, SEOUL BBQ HOUSE, TOKYO YAKITORI...'
                        : selectedCategory === 'fashion'
                        ? 'z.B. MAISON DE HAUTE COUTURE, URBAN MINIMALIST...'
                        : isEn 
                        ? 'e.g. SKYLINE RESIDENCES, GENESIS HOMES, PURE ORGANIC...' 
                        : 'z.B. GENESIS HOMES, SKYLINE RESIDENCES, PRIME CUT...'
                    }
                    className="w-full bg-slate-950 border border-indigo-800/70 rounded-xl px-3 py-2 text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                {/* 2. Slogan / Claim */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-amber-400" />
                      {isEn ? 'Brand Slogan / Claim (Outro Text)' : 'Slogan / Claim (Der Abspann-Satz)'}
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono font-bold">
                      {claimMetrics.claimChars}/{optimalCharLimits.claimLimit} Chars ({claimMetrics.wordCount} {isEn ? 'words' : 'Wörter'})
                    </span>
                  </label>
                  <textarea
                    rows={2}
                    value={state.commercialClaim || ''}
                    onChange={(e) => onUpdateState(prev => ({ ...prev, commercialClaim: e.target.value }))}
                    placeholder={
                      selectedCategory === 'food'
                        ? 'z.B. Süß trifft scharf. Pure Leidenschaft. / Rauch, Glut und jahrzehntealte Sauce.'
                        : isEn 
                        ? 'e.g. Living Above the Ordinary. / 100% Organic. Zero Compromise.' 
                        : 'z.B. Vom ersten Spatenstich zu Ihrem Wohntraum. / 100% Natur. Null Kompromisse.'
                    }
                    className="w-full bg-slate-950 border border-amber-500/60 rounded-xl px-3 py-2 text-xs font-bold text-amber-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed resize-none"
                  />
                </div>

                {/* 3. Call-to-Action (CTA) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                      {isEn ? 'Call-to-Action (CTA / Web / Hotline)' : 'Call-to-Action (CTA / Web / Tel)'}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {claimMetrics.ctaChars}/{optimalCharLimits.ctaLimit} Chars
                    </span>
                  </label>
                  <input
                    type="text"
                    value={state.commercialCallToAction || ''}
                    onChange={(e) => onUpdateState(prev => ({ ...prev, commercialCallToAction: e.target.value }))}
                    placeholder={isEn ? 'e.g. Book Private Viewing | www.skyline.luxury' : 'z.B. Exklusive Neubauten anfragen | www.genesis.de'}
                    className="w-full bg-slate-950 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs font-bold text-emerald-200 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                {/* 4. Outro Visual Style & Animation Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-indigo-200 flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-indigo-400" />
                      {isEn ? 'Outro Visual Format' : 'Abspann Visual-Stil'}
                    </label>
                    <select
                      value={state.commercialOutroStyle || 'cinematic_fade_black'}
                      onChange={(e) => onUpdateState(prev => ({ ...prev, commercialOutroStyle: e.target.value as any }))}
                      className="w-full bg-slate-950 border border-indigo-800/70 rounded-xl px-2.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-indigo-400 cursor-pointer truncate"
                    >
                      <option value="cinematic_fade_black">🎬 Cinematic Fade to Black</option>
                      <option value="clean_white_minimal">⚪ Clean Studio White (Apple-Style)</option>
                      <option value="lower_third_overlay">🏷️ Lower-Third Glass Banner</option>
                      <option value="comic_speech_punch">💬 2D Comic Speech Punch</option>
                      <option value="motion_graphic_reveal">✨ 3D Kinetic Typography</option>
                      <option value="voiceover_whisper">🎧 Voiceover & Audio Logo Only</option>
                      <option value="none">{isEn ? 'No Visual Outro' : 'Kein visueller Abspann'}</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        {isEn ? 'Outro Animation (H3 Tags)' : 'Outro-Animation (H3 Tag)'}
                      </span>
                      <span className="text-[9px] font-mono text-amber-400 font-bold uppercase">
                        H3 Video
                      </span>
                    </label>
                    <select
                      value={state.commercialOutroAnimation || 'fade_to_black'}
                      onChange={(e) => onUpdateState(prev => ({ ...prev, commercialOutroAnimation: e.target.value as any }))}
                      className="w-full bg-slate-950 border border-amber-500/70 rounded-xl px-2.5 py-2 text-xs font-bold text-amber-200 focus:outline-none focus:border-amber-400 cursor-pointer truncate"
                    >
                      <option value="fade_to_black">🌑 Fade to Black (Smooth 1.2s Dissolve)</option>
                      <option value="brand_logo_reveal">👑 Brand Logo Reveal (3D Extrusion & Light Glint)</option>
                      <option value="sparkle_transition">✨ Sparkle Transition (Diamond Optical Shimmer)</option>
                      <option value="gold_shimmer_wipe">🏆 Gold Shimmer Wipe (Liquid Specular Sweep)</option>
                      <option value="lens_flare_streak">💫 Anamorphic Lens Flare Streak (Blue/Gold Wipe)</option>
                      <option value="light_leak_burn">🔥 35mm Light Leak Burn (Warm Film Dissolve)</option>
                      <option value="cinematic_zoom_dissolve">🔍 Cinematic Zoom Dissolve (Dolly In Logo)</option>
                      <option value="whip_pan_blur">⚡ Whip-Pan Motion Blur (Dynamic Fast Snap)</option>
                      <option value="neon_strobe_flash">⚡ Neon Strobe Flash (Vibrant High-Voltage)</option>
                      <option value="glitch_matrix_snap">👾 Cyber Glitch Snap (Crisp Aberration Lock)</option>
                      <option value="none">{isEn ? 'None (Hard Cut)' : 'Keine (Harter Schnitt)'}</option>
                    </select>
                  </div>
                </div>

                {/* 5. HIGH-END IN-SCENE SPATIAL TEXT OVERLAYS (ARCHITECTURAL / ROOF / CURB / FACADE) */}
                <div className="bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/40 rounded-xl p-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-indigo-300 flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(state.spatialTextOverlayEnabled)}
                        onChange={(e) => onUpdateState(prev => ({ ...prev, spatialTextOverlayEnabled: e.target.checked }))}
                        className="w-4 h-4 text-indigo-500 rounded border-slate-700 bg-slate-900 focus:ring-0 cursor-pointer"
                      />
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{isEn ? 'In-Scene Spatial Claim Overlay' : 'In-Scene 3D-Schrifteinblendung (Häuser/Dach/Bordstein)'}</span>
                    </label>
                    <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 font-mono text-[9px] rounded font-bold border border-indigo-500/30">
                      {isEn ? 'Architectural VFX' : 'High-End Visuals'}
                    </span>
                  </div>

                  {state.spatialTextOverlayEnabled && (
                    <div className="space-y-2 pt-1 border-t border-indigo-900/50">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-300 font-bold">
                          <span>{isEn ? 'Spatial Surface Placement:' : 'Platzierung am Objekt (z.B. Dachkante, Bordstein):'}</span>
                        </div>
                        <select
                          value={state.spatialTextPosition || 'architectural_roof_curb'}
                          onChange={(e) => onUpdateState(prev => ({ ...prev, spatialTextPosition: e.target.value as any }))}
                          className="w-full bg-slate-950 border border-indigo-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-indigo-200 focus:outline-none focus:border-indigo-400 cursor-pointer"
                        >
                          <option value="architectural_roof_curb">🏢 Dachkante & Bordstein (Roof Overhang & Curbside Pavement Track)</option>
                          <option value="integrated_facade_glass">🪟 Glasfassade & Sichtbeton (Integrated Concrete & Glass Reflections)</option>
                          <option value="curbside_pavement_track">🛣️ Gehweg, Asphalt & Vorfahrt (Camera-Tracked Pavement Projection)</option>
                          <option value="floating_golden_3d">✨ Schwebende 3D-Goldlettern (Floating 3D Kinetic Typography)</option>
                          <option value="subtle_lower_cinema">🎬 Dezente Kino-Letterbox Typografie (Subtle Cinema Swiss Type)</option>
                          <option value="dynamic_surface_anchor">📐 Dynamische Struktur-Anker (Multi-Surface Architectural Anchor)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-300">
                          {isEn ? 'In-Scene Headline / USP Text:' : 'Verkaufsfördernde Aussage / Objektdetails (In-Scene Claim):'}
                        </label>
                        <input
                          type="text"
                          value={state.spatialTextContent || ''}
                          onChange={(e) => onUpdateState(prev => ({ ...prev, spatialTextContent: e.target.value }))}
                          placeholder={
                            isEn 
                              ? 'e.g. 420 m² Living Space • KfW 40 Plus Solardach • Direct South View'
                              : 'z.B. 420 m² Wohnfläche • KfW 40 Plus Solardach • Unverbaubarer Südblick'
                          }
                          className="w-full bg-slate-950 border border-indigo-700/80 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 6. ANALOG FILM STOCK & EMULATION ENGINE (35mm/16mm/Soviet/Kodak/Fuji) */}
              <div className="bg-gradient-to-br from-cyan-950/70 via-slate-900 to-slate-950 border border-cyan-500/40 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isEn ? '🎞️ Analog Film Stock & Lens Emulation' : '🎞️ Analog-Look & Filmstock-Kamera (Analog Engine)'}</span>
                  </label>
                  {state.analogPresetId && (
                    <button
                      onClick={() => onUpdateState(prev => ({ ...prev, analogPresetId: undefined }))}
                      className="text-[10px] text-cyan-400 hover:text-cyan-200 underline font-bold cursor-pointer"
                    >
                      {isEn ? 'Clear Analog' : 'Entfernen'}
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  <select
                    value={state.analogPresetId || ''}
                    onChange={(e) => onUpdateState(prev => ({ ...prev, analogPresetId: e.target.value || undefined }))}
                    className="w-full bg-slate-950 border border-cyan-700/60 rounded-xl px-2.5 py-2 text-xs font-bold text-cyan-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="">{isEn ? '-- No Analog Emulation (Clean Digital 8K) --' : '-- Kein Analog-Look (Standard Digital High-End) --'}</option>
                    {ANALOG_MASTER_PRESETS.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.badge} — {preset.name}
                      </option>
                    ))}
                  </select>

                  {state.analogPresetId && (
                    <div className="p-2 bg-cyan-950/80 border border-cyan-700/60 rounded-lg text-[10px] text-cyan-200 space-y-1">
                      <div className="font-extrabold text-cyan-300 flex items-center justify-between">
                        <span>{ANALOG_MASTER_PRESETS.find(p => p.id === state.analogPresetId)?.badge}</span>
                        <span className="font-mono text-cyan-400 text-[9px]">{ANALOG_MASTER_PRESETS.find(p => p.id === state.analogPresetId)?.lens}</span>
                      </div>
                      <div className="text-slate-300 leading-relaxed">
                        {ANALOG_MASTER_PRESETS.find(p => p.id === state.analogPresetId)?.opticalSignature}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CATEGORY- & TONE-OPTIMIZED SLOGAN SUGGESTIONS ENGINE */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {isEn ? 'Category- & Tone-Optimized Slogans:' : 'Passende Slogans nach Kategorie & Tonalität:'}
                  </span>

                  {/* Tier Filter Pills */}
                  <div className="inline-flex p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-[10px]">
                    <button
                      onClick={() => setClaimTierFilter('all')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        claimTierFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isEn ? 'All' : 'Alle'}
                    </button>
                    <button
                      onClick={() => setClaimTierFilter('short')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        claimTierFilter === 'short' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ⚡ 1-3s
                    </button>
                    <button
                      onClick={() => setClaimTierFilter('medium')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        claimTierFilter === 'medium' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ⏱️ 3-5s
                    </button>
                    <button
                      onClick={() => setClaimTierFilter('long')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        claimTierFilter === 'long' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🎬 5-8s
                    </button>
                  </div>
                </div>

                {/* Mood / Tone Filter Sub-Bar */}
                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  <span className="text-[10px] text-slate-400 font-bold mr-1">
                    {isEn ? 'Tone:' : 'Tonalität:'}
                  </span>
                  {availableMoodFilters.map((mood) => {
                    const isMoodActive = selectedMood === mood.id;
                    return (
                      <button
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id as SloganMoodFilter)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                          isMoodActive
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {mood.label}
                      </button>
                    );
                  })}
                </div>

                {/* Slogan Cards Grid (Scrollable) */}
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {suggestedSlogans.map((sug) => {
                    const isSelected = state.commercialClaim === sug.claim;

                    return (
                      <div
                        key={sug.id}
                        onClick={() => handleApplySloganSuggestion(sug)}
                        className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer space-y-1 ${
                          isSelected
                            ? 'bg-indigo-950/80 border-indigo-400 ring-1 ring-indigo-400/50'
                            : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 hover:border-indigo-600/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">
                              {sug.brand}
                            </span>
                            <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 font-mono text-[9px] rounded font-bold border border-amber-500/30">
                              {isEn ? sug.moodLabelEn : sug.moodLabelDe}
                            </span>
                          </div>
                          <span className="px-1.5 py-0.2 bg-slate-900 text-amber-300 font-mono text-[9px] rounded font-bold border border-slate-700">
                            {sug.charCount} Z. (~{sug.estimatedSeconds}s)
                          </span>
                        </div>

                        <div className="font-extrabold text-slate-100 text-[11px] leading-tight">
                          "{sug.claim}"
                        </div>

                        <div className="text-[10px] text-slate-400 truncate">
                          ↳ {sug.cta}
                        </div>

                        <div className="text-[9px] text-slate-500 italic pt-0.5">
                          {isEn ? sug.pitchNoteEn : sug.pitchNoteDe}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* LIVE COMPILED OUTRO SCRIPT SNIPPET & COPY */}
              <div className="bg-slate-950 rounded-xl p-3 border border-indigo-900/60 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isEn ? 'Compiled Outro Block in Prompt:' : 'Generierter Abspann-Block:'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleClearClaim}
                      className="text-slate-400 hover:text-rose-400 text-[10px] font-bold cursor-pointer"
                    >
                      {isEn ? 'Clear' : 'Leeren'}
                    </button>
                    <button
                      onClick={handleCopyOutroSnippet}
                      className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedScript ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                      {copiedScript ? (isEn ? 'Copied' : 'Kopiert') : (isEn ? 'Copy' : 'Kopieren')}
                    </button>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-indigo-200 bg-slate-900/90 p-2 rounded border border-slate-800 break-all leading-relaxed select-all">
                  {formatCommercialOutroAbspann(
                    state.commercialClaim,
                    state.commercialBrandName,
                    state.commercialCallToAction,
                    state.commercialOutroStyle,
                    state.commercialOutroAnimation,
                    state.spatialTextOverlayEnabled,
                    state.spatialTextPosition,
                    state.spatialTextContent
                  ) || '[COMMERCIAL OUTRO & BRAND CLAIM ABSPANN: Inactive]'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          MODAL: SINGLE PRESET JSON SCHEMA VIEWER
         ========================================================================= */}
      {viewingJsonPreset && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-fadeIn">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-indigo-400" />
                <h3 className="font-black text-white text-sm">
                  {viewingJsonPreset.name} (JSON Schema)
                </h3>
              </div>
              <button
                onClick={() => setViewingJsonPreset(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-amber-300 bg-slate-950 rounded-xl m-4 border border-slate-800 select-all whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(viewingJsonPreset, null, 2)}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400 font-mono">ID: {viewingJsonPreset.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(viewingJsonPreset, null, 2));
                    onShowToast(isEn ? 'Preset JSON copied to clipboard!' : 'Preset-JSON in die Zwischenablage kopiert!');
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {isEn ? 'Copy JSON' : 'JSON Kopieren'}
                </button>
                <button
                  onClick={() => setViewingJsonPreset(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  {isEn ? 'Close' : 'Schließen'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
