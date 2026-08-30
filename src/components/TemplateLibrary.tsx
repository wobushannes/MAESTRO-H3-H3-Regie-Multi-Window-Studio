import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Film,
  Flame,
  Building,
  Home,
  Utensils,
  Search,
  Check,
  Copy,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Shirt,
  Zap,
  Image as ImageIcon,
  Wand2,
  PlusCircle,
  X,
  Trash2,
  Bookmark,
  Trees,
  Tv,
  Rocket,
  BookOpen,
  Crosshair,
  Landmark,
  Mic,
  Tag,
  SlidersHorizontal,
  Layers,
  MessageSquare,
  Compass,
  RotateCcw,
  Plane,
  Eye,
  Heart,
  FileJson,
  Download,
  Upload,
  Code,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Gift,
  Database,
  Users,
  UserCheck,
} from 'lucide-react';
import { PresetTemplate, StyleCategory, PersonCountType } from '../types';
import { loadVariantTemplates } from '../data/presets';
import { getNarratorVoiceFallbackForCategory } from '../utils/promptCompiler';
import {
  parseTemplatesJSON,
  triggerJSONDownload,
  validateTemplateObject,
  loadCustomTemplatesFromStorage,
  saveCustomTemplatesToStorage,
} from '../utils/templateStorage';
import { TemplateBackupManagerModal } from './TemplateBackupManagerModal';

interface TemplateLibraryProps {
  customTemplates: PresetTemplate[];
  onCreateCustomTemplate: (template: PresetTemplate) => void;
  onDeleteCustomTemplate: (id: string) => void;
  onUpdateCustomTemplates?: (templates: PresetTemplate[]) => void;
  onSelectTemplate: (template: PresetTemplate, targetWindows: number) => void;
  onCopyText: (text: string, label: string) => void;
  nsfwMode: boolean;
  builtInTemplates: PresetTemplate[];
  language?: 'de' | 'en';
}

type QuickFilterType =
  | 'all'
  | 'de_voice'
  | 'sensual'
  | 'pov'
  | 'stickman'
  | 'floorplan'
  | 'buildup'
  | 'multi_window'
  | 'single_window'
  | 'narrator'
  | 'dialogue'
  | 'wardrobe';

type SortOption = 'relevance' | 'title_asc' | 'title_desc' | 'windows_desc' | 'prompt_length';

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({
  customTemplates,
  onCreateCustomTemplate,
  onDeleteCustomTemplate,
  onUpdateCustomTemplates,
  onSelectTemplate,
  onCopyText,
  builtInTemplates,
  language = 'de',
}) => {
  const isEn = language === 'en';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<StyleCategory | 'all' | 'custom'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);
  const [quickFilter, setQuickFilter] = useState<QuickFilterType>('all');
  const [personFilter, setPersonFilter] = useState<PersonCountType>('1_person');
  const [pictureCountFilter, setPictureCountFilter] = useState<'all' | '1' | '2' | 'multi'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createModeTab, setCreateModeTab] = useState<'form' | 'json'>('form');
  const [showJsonManagerModal, setShowJsonManagerModal] = useState(false);
  const [showBackupHubModal, setShowBackupHubModal] = useState(false);
  const [viewingJsonTemplate, setViewingJsonTemplate] = useState<PresetTemplate | null>(null);

  // JSON Import & Editor states
  const [rawJsonInput, setRawJsonInput] = useState('');
  const [jsonValidationResult, setJsonValidationResult] = useState<{
    tested: boolean;
    valid: boolean;
    count: number;
    error?: string;
  }>({ tested: false, valid: false, count: 0 });

  // Pagination state & config
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 18;

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, activeTagFilter, quickFilter, personFilter, pictureCountFilter, sortBy]);

  // New Template Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<StyleCategory>('custom');
  const [newBadge, setNewBadge] = useState(isEn ? 'Custom Template' : 'Eigene Vorlage');
  const [newDescription, setNewDescription] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [newCamera, setNewCamera] = useState('Slow tracking shot');
  const [newLighting, setNewLighting] = useState('Cinematic lighting');
  const [newLens, setNewLens] = useState('35mm Anamorphic');
  const [newMotionSpeed, setNewMotionSpeed] = useState('24fps Normal');
  const [newNarratorVoice, setNewNarratorVoice] = useState('');
  const [newDialogueLines, setNewDialogueLines] = useState('');
  const [newIsNsfw, setNewIsNsfw] = useState(false);
  const [newIsPov, setNewIsPov] = useState(false);
  const [newTagsStr, setNewTagsStr] = useState('Custom, Preset');
  const [newJsonTemplateCode, setNewJsonTemplateCode] = useState('');

  const [lazyVariantTemplates, setLazyVariantTemplates] = useState<PresetTemplate[]>([]);

  // Load variant templates dynamically on demand when filters are applied
  useEffect(() => {
    let active = true;
    const fetchVariants = async () => {
      const promises: Promise<PresetTemplate[]>[] = [];
      
      promises.push(loadVariantTemplates('person', personFilter));
      
      if (pictureCountFilter !== 'all') {
        const val = pictureCountFilter === '1' ? '1' : pictureCountFilter === '2' ? '2' : 'multi';
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
          setLazyVariantTemplates(unique);
        }
      } else {
        if (active) {
          setLazyVariantTemplates([]);
        }
      }
    };
    fetchVariants();
    return () => { active = false; };
  }, [personFilter, pictureCountFilter]);

  const allTemplates = useMemo(() => {
    const combined = [...customTemplates, ...builtInTemplates, ...lazyVariantTemplates];
    const seen = new Set<string>();
    return combined.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [customTemplates, builtInTemplates, lazyVariantTemplates]);

  const categories = useMemo(() => [
    { id: 'all', label: isEn ? 'All Templates' : 'Alle Vorlagen', icon: Film, count: allTemplates.length },
    { id: 'cinema', label: isEn ? 'Cinema & Trailers' : '🎬 Kino & Film-Trailer', icon: Film, count: allTemplates.filter(p => p.category === 'cinema').length },
    { id: 'gastro', label: isEn ? 'Gastro & Atmosphere' : '🍷 Gastro & Atmosphäre', icon: Utensils, count: allTemplates.filter(p => p.category === 'gastro').length },
    { id: 'grill_aussenkueche', label: isEn ? 'Grill & Outdoor Kitchen' : '🔥 Grill & Außenküche', icon: Flame, count: allTemplates.filter(p => p.category === 'grill_aussenkueche').length },
    { id: 'immobilien', label: isEn ? 'Real Estate & Floor Plans' : '🏠 Immobilien & Grundrisse', icon: Home, count: allTemplates.filter(p => p.category === 'immobilien').length },
    { id: 'food', label: isEn ? 'Food & Gourmet Chef' : '🍽️ Food & Gourmet Chef', icon: Utensils, count: allTemplates.filter(p => p.category === 'food').length },
    { id: 'restaurant', label: isEn ? 'Restaurant & Dining' : '🍱 Restaurant & Kulinarik', icon: Utensils, count: allTemplates.filter(p => p.category === 'restaurant').length },
    { id: 'fashion', label: isEn ? 'Fashion & Luxury' : '👗 Fashion & Luxury', icon: Shirt, count: allTemplates.filter(p => p.category === 'fashion').length },
    { id: 'travel', label: isEn ? 'Travel & Tourism' : '🏖️ Travel & Tourism', icon: Plane, count: allTemplates.filter(p => p.category === 'travel').length },
    { id: 'inneneinrichtung', label: isEn ? 'Interior & Design' : '🛋️ Interior & Inneneinrichtung', icon: Home, count: allTemplates.filter(p => p.category === 'inneneinrichtung').length },
    { id: 'comic', label: isEn ? 'Comic & Drawing' : '✏️ Comic Ads & Strichzeichnung', icon: BookOpen, count: allTemplates.filter(p => p.category === 'comic').length },
    { id: 'lingerie', label: isEn ? 'Haute Lingerie (B&W)' : '🖤 Haute Lingerie (SW)', icon: Sparkles, count: allTemplates.filter(p => p.category === 'lingerie').length },
    { id: 'erotik', label: isEn ? 'Sensual & Boudoir' : '💋 Sinnlich, Erotik & Boudoir', icon: Heart, count: allTemplates.filter(p => p.category === 'erotik').length },
    { id: 'birthday', label: isEn ? 'Birthdays & Party' : '🎂 Geburtstag, Jubiläum & Party', icon: Gift, count: allTemplates.filter(p => p.category === 'birthday').length },
    { id: 'horror', label: isEn ? 'Horror & Mystery' : '👻 Horror & Mystery Thriller', icon: Flame, count: allTemplates.filter(p => p.category === 'horror').length },
    { id: 'sitcom', label: isEn ? 'Sitcom & Comedy' : '📺 Sitcom & Comedy', icon: Tv, count: allTemplates.filter(p => p.category === 'sitcom').length },
    { id: 'scify', label: isEn ? 'Sci-Fi & Universe' : '🚀 Sci-Fi, Weltall & Cyberpunk', icon: Rocket, count: allTemplates.filter(p => p.category === 'scify').length },
    { id: 'cyberpunk', label: isEn ? 'Cyberpunk & Neo-Noir' : '🌆 Cyberpunk & Neo-Noir', icon: Sparkles, count: allTemplates.filter(p => p.category === 'cyberpunk').length },
    { id: 'bau', label: isEn ? 'Construction & Craft' : '🏗️ Bau, Handwerk & Industrial', icon: Building, count: allTemplates.filter(p => p.category === 'bau').length },
    { id: 'action', label: isEn ? 'Action & Blockbuster' : '⚡ Action & Blockbuster', icon: Zap, count: allTemplates.filter(p => p.category === 'action').length },
    { id: 'fantasy', label: isEn ? 'Dark Fantasy' : '🧙‍♂️ Dark Fantasy & Mythos', icon: Wand2, count: allTemplates.filter(p => p.category === 'fantasy').length },
    { id: 'nature', label: isEn ? 'Nature & Outdoor' : '🌲 Natur, Outdoor & Abenteuer', icon: Trees, count: allTemplates.filter(p => p.category === 'nature').length },
    { id: 'war', label: isEn ? 'War & Tactical' : '⚔️ Kriegsfilm, Militär & Tactical', icon: Crosshair, count: allTemplates.filter(p => p.category === 'war').length },
    { id: 'politics', label: isEn ? 'Politics & Debate' : '🏛️ Politik, Debatte & Wahlkampf', icon: Landmark, count: allTemplates.filter(p => p.category === 'politics').length },
    { id: 'immersive', label: isEn ? 'Immersive Ego-POV' : '🥽 Immersive Ego-POV & Bodycam', icon: Eye, count: allTemplates.filter(p => p.category === 'immersive').length },
    { id: 'custom', label: isEn ? 'My JSON Templates' : '✨ Eigene Freie Vorlage', icon: Bookmark, count: customTemplates.length },
  ], [allTemplates, customTemplates.length, isEn]);

  // Search & Filter Logic
  const filteredTemplates = useMemo(() => {
    const queryTokens = searchQuery
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return allTemplates
      .filter((tpl) => {
        // Category Filter
        if (selectedCategory === 'custom') {
          if (!tpl.isCustom) return false;
        } else if (selectedCategory !== 'all') {
          if (tpl.category !== selectedCategory) return false;
        }

        // Active Tag Filter
        if (activeTagFilter) {
          const hasTag = tpl.tags?.some(
            (t) => t.toLowerCase() === activeTagFilter.toLowerCase()
          );
          if (!hasTag) return false;
        }

        // Person Count Filter (1 Person vs >=2 Personen)
        const isMultiPerson =
          tpl.personCount === 'multi_person' ||
          tpl.personCount === '2_person' ||
          tpl.tags?.includes('multi_person') ||
          tpl.tags?.includes('group') ||
          tpl.tags?.includes('2_personen') ||
          tpl.category === 'birthday' ||
          /group|ensemble|duo|trio|choir|band|singers|team|crew|squad|party|2 personen|≥2|multi|co-star/i.test(`${tpl.title} ${tpl.description} ${(tpl.tags || []).join(' ')}`);

        const actualCount = tpl.personCount || (
          /duo|co-star|partner|2 personen/i.test(`${tpl.title} ${tpl.description} ${(tpl.tags || []).join(' ')}`)
            ? '2_person'
            : /group|ensemble|trio|choir|band|singers|team|crew|squad|party/i.test(`${tpl.title} ${tpl.description} ${(tpl.tags || []).join(' ')}`) || tpl.category === 'birthday'
            ? 'multi_person'
            : '1_person'
        );
        if (actualCount !== personFilter) return false;

        // Picture Count Filter
        if (pictureCountFilter !== 'all') {
          let tplPicCount: '1' | '2' | 'multi' = '1';
          if (tpl.windowsCount && tpl.windowsCount >= 4) {
            tplPicCount = 'multi';
          } else if (tpl.windowsCount === 2) {
            tplPicCount = '2';
          } else {
            const promptLower = (tpl.prompt || '').toLowerCase();
            if (promptLower.includes('picture 4') || promptLower.includes('picture 3')) {
              tplPicCount = 'multi';
            } else if (promptLower.includes('picture 2')) {
              tplPicCount = '2';
            }
          }
          if (tplPicCount !== pictureCountFilter) return false;
        }

        // Quick Feature Filters
        if (quickFilter === 'de_voice') {
          const voiceStr = (tpl.narratorVoice || '').toLowerCase();
          const hasDeVoice = voiceStr.includes('german') || voiceStr.includes('deutsch') || voiceStr.includes('samtige') || voiceStr.includes('synchron');
          if (!hasDeVoice) return false;
        } else if (quickFilter === 'sensual') {
          const isSensual =
            tpl.category === 'erotik' ||
            tpl.category === 'fashion' ||
            /sensual|alluring|velvet|seductive|erotik|sex|boudoir|sinnlich|parfum|glamour/i.test(
              tpl.title + ' ' + tpl.description + ' ' + (tpl.narratorVoice || '') + ' ' + (tpl.tags || []).join(' ')
            );
          if (!isSensual) return false;
        } else if (quickFilter === 'pov') {
          const isPov = tpl.isImmersivePov || tpl.category === 'immersive' || /pov|first-person|ego-perspektive|gopro|bodycam/i.test(tpl.title + ' ' + tpl.description + ' ' + tpl.prompt);
          if (!isPov) return false;
        } else if (quickFilter === 'stickman') {
          const isStickman =
            tpl.tags?.some((t) => /strichmännchen|strichweibchen|stickman|stickwoman|alan becker|xkcd|pivot|cyanide/i.test(t)) ||
            /stickman|stick figure|strichmännchen|strichweibchen|stickwoman/i.test(tpl.title + ' ' + tpl.description + ' ' + tpl.prompt);
          if (!isStickman) return false;
        } else if (quickFilter === 'floorplan') {
          const isFloorplan =
            tpl.tags?.some((t) => /grundriss|floorplan|blueprint|innenraumflug|walkthrough|puppenhaus|dollhouse/i.test(t)) ||
            /grundriss|floor plan|blueprint|innenraumflug|walkthrough/i.test(tpl.title + ' ' + tpl.description + ' ' + tpl.prompt);
          if (!isFloorplan) return false;
        } else if (quickFilter === 'buildup') {
          const isBuildup =
            tpl.tags?.some((t) =>
              /sich aufbauend|self-assembly|aufbau|extrusion|blueprint-morph|transformation/i.test(t)
            ) ||
            /sich aufbauend|self-assembly|self-assembling|baut sich auf|wände wachsen|rohbau-zu-design|assembly time-lapse/i.test(
              tpl.title + ' ' + tpl.description + ' ' + tpl.prompt
            );
          if (!isBuildup) return false;
        } else if (quickFilter === 'multi_window') {
          if (!tpl.windowsCount || tpl.windowsCount <= 1) return false;
        } else if (quickFilter === 'single_window') {
          if (tpl.windowsCount && tpl.windowsCount > 1) return false;
        } else if (quickFilter === 'narrator') {
          if (!tpl.narratorVoice) return false;
        } else if (quickFilter === 'dialogue') {
          if (!tpl.dialogueLines) return false;
        } else if (quickFilter === 'wardrobe') {
          if (!tpl.wardrobeStyle && !tpl.clothingDetails) return false;
        }

        // Multi-Token Search
        if (queryTokens.length === 0) return true;

        const personKeywords = isMultiPerson
          ? 'multi_person group duo ensemble 2_personen ≥2 personen mehraktig gruppe darsteller'
          : '1_person solo single einzelperson 1 person hauptperson portrait';

        const searchableText = [
          tpl.title,
          tpl.description,
          tpl.prompt,
          tpl.badge,
          (tpl.tags || []).join(' '),
          tpl.personCount || '',
          personKeywords,
          tpl.camera,
          tpl.lighting,
          tpl.lens,
          tpl.movieTitle || '',
          tpl.narratorVoice || '',
          tpl.wardrobeStyle || '',
          tpl.clothingDetails || '',
          tpl.dialogueLines || '',
          tpl.styleCode || '',
        ]
          .join(' ')
          .toLowerCase();

        return queryTokens.every((token) => searchableText.includes(token));
      })
      .sort((a, b) => {
        if (sortBy === 'title_asc') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'title_desc') {
          return b.title.localeCompare(a.title);
        }
        if (sortBy === 'windows_desc') {
          return (b.windowsCount || 1) - (a.windowsCount || 1);
        }
        if (sortBy === 'prompt_length') {
          return a.prompt.length - b.prompt.length;
        }
        if (a.isCustom && !b.isCustom) return -1;
        if (!a.isCustom && b.isCustom) return 1;
        return 0;
      });
  }, [allTemplates, selectedCategory, activeTagFilter, quickFilter, searchQuery, sortBy]);

  // Pagination slicing
  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE) || 1;
  const paginatedTemplates = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTemplates.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTemplates, currentPage]);

  const handleCopy = (tpl: PresetTemplate) => {
    onCopyText(tpl.prompt, tpl.title);
    setCopiedId(tpl.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setActiveTagFilter(null);
    setQuickFilter('all');
    setSortBy('relevance');
  };

  // JSON Export Handlers
  const handleExportAllCustomJson = () => {
    const listToExport = customTemplates.length > 0 ? customTemplates : allTemplates;
    const filename = customTemplates.length > 0 ? `maestro-h3-custom-templates-${Date.now()}.json` : `maestro-h3-all-templates-${Date.now()}.json`;
    triggerJSONDownload(filename, listToExport);
    onCopyText(JSON.stringify(listToExport, null, 2), isEn ? 'JSON Export Downloaded' : 'JSON Vorlagen-Export heruntergeladen');
  };

  const handleExportFilteredJson = () => {
    const filename = `maestro-h3-filtered-templates-${Date.now()}.json`;
    triggerJSONDownload(filename, filteredTemplates);
  };

  // JSON Import File Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawJsonInput(content);
        validateAndImportJson(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Validate JSON string
  const handleValidateRawJson = () => {
    if (!rawJsonInput.trim()) {
      setJsonValidationResult({ tested: true, valid: false, count: 0, error: isEn ? 'Please paste JSON code first.' : 'Bitte füge zuerst JSON-Code ein.' });
      return;
    }
    const res = parseTemplatesJSON(rawJsonInput);
    if (res.success) {
      setJsonValidationResult({
        tested: true,
        valid: true,
        count: res.importedCount,
      });
    } else {
      setJsonValidationResult({
        tested: true,
        valid: false,
        count: 0,
        error: res.error,
      });
    }
  };

  const validateAndImportJson = (jsonString: string) => {
    const res = parseTemplatesJSON(jsonString);
    if (res.success && res.templates.length > 0) {
      for (const tpl of res.templates) {
        onCreateCustomTemplate(tpl);
      }
      setJsonValidationResult({ tested: true, valid: true, count: res.importedCount });
      setShowJsonManagerModal(false);
      setRawJsonInput('');
      setSelectedCategory('custom');
    } else {
      setJsonValidationResult({
        tested: true,
        valid: false,
        count: 0,
        error: res.error || (isEn ? 'Failed to parse template JSON.' : 'Ungültiges JSON-Vorlagen-Format.'),
      });
    }
  };

  // Save new custom template from Form or JSON
  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();

    if (createModeTab === 'json') {
      if (!newJsonTemplateCode.trim()) return;
      const res = parseTemplatesJSON(newJsonTemplateCode);
      if (res.success && res.templates.length > 0) {
        for (const tpl of res.templates) {
          onCreateCustomTemplate(tpl);
        }
        setShowCreateModal(false);
        setNewJsonTemplateCode('');
        setSelectedCategory('custom');
      } else {
        alert(res.error || 'Ungültiges JSON');
      }
      return;
    }

    const tags = newTagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const template: PresetTemplate = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      badge: newBadge.trim() || (isEn ? 'Custom' : 'Eigene'),
      description: newDescription.trim() || (isEn ? 'Custom template' : 'Eigene Vorlage'),
      prompt: newPrompt.trim(),
      camera: newCamera.trim(),
      lighting: newLighting.trim(),
      lens: newLens.trim(),
      motionSpeed: newMotionSpeed.trim(),
      narratorVoice: newNarratorVoice.trim() || undefined,
      dialogueLines: newDialogueLines.trim() || undefined,
      isImmersivePov: newIsPov,
      negativePrompt: 'cheap CGI, blurry, bad lighting, watermark, low quality, artifacts',
      isNsfw: newIsNsfw,
      isCustom: true,
      tags: tags.length > 0 ? tags : [newCategory, 'custom-json'],
    };

    onCreateCustomTemplate(template);
    setShowCreateModal(false);
    setSelectedCategory('custom');

    // Reset Form
    setNewTitle('');
    setNewDescription('');
    setNewPrompt('');
    setNewNarratorVoice('');
    setNewDialogueLines('');
    setNewIsNsfw(false);
    setNewIsPov(false);
  };

  // Prepopulate JSON template code editor for creating new template
  const handleOpenCreateModal = () => {
    const templateStub: Partial<PresetTemplate> = {
      title: 'Neuer High-End Imagefilm Spot',
      category: 'fashion',
      badge: '4K Commercial',
      description: 'Sinnlicher Luxus-Werbespot mit deutscher samtiger Sprecherin und cineastischer Kamera',
      prompt: 'A stunning model in a golden silk gown walks through a marble ballroom, cinematic rim lighting, 35mm anamorphic lens, elegant fluid tracking shot',
      camera: 'Slow fluid tracking shot with subtle push-in',
      lighting: 'Warm golden hour rim lighting with soft ambient fill',
      lens: '35mm Anamorphic prime lens, shallow depth of field',
      motionSpeed: '24fps Cinematic Standard',
      narratorVoice: 'Warm, deeply sensual and velvety German female voice with close-mic proximity, breathy alluring cadence',
      dialogueLines: 'Sie flüstert sanft: "Ewige Eleganz."',
      isImmersivePov: false,
      isNsfw: false,
      tags: ['fashion', 'luxus', 'deutsch', 'sinnlich', 'imagefilm'],
    };
    setNewJsonTemplateCode(JSON.stringify(templateStub, null, 2));
    setShowCreateModal(true);
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

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Hidden file input for JSON import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json,application/json"
        className="hidden"
      />

      {/* TOP HEADER & JSON MANAGEMENT BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 font-mono font-black text-[10px] rounded-md uppercase tracking-wider">
                JSON Storage Engine
              </span>
              <span className="text-xs text-amber-400 font-bold font-mono">
                {allTemplates.length} Vorlagen geladen
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-amber-400" />
              {isEn ? 'Master Preset & JSON Template Library' : 'Master Vorlagen & JSON Vorlagen-Manager'}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {isEn
                ? 'All templates are managed and exported purely as standard JSON schemas. Easily import, edit, and back up custom prompts with flawless fidelity.'
                : 'Alle Vorlagen werden ausschließlich über saubere JSON-Strukturen verwaltet und gespeichert. 100% verlässlicher Import & Export ohne Informationsverlust.'}
            </p>
          </div>

          {/* Top Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setShowBackupHubModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer"
              title={isEn ? 'Open Central JSON Backup & Restore Hub' : 'Zentrales Vorlagen JSON-Backup Modul öffnen'}
            >
              <Database className="w-4 h-4" />
              <span>{isEn ? 'JSON Backup Hub' : 'JSON Backup & Restore'}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              title={isEn ? 'Upload .json template file' : '.json Vorlagendatei hochladen'}
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEn ? 'Upload JSON' : 'JSON Hochladen'}</span>
            </button>

            <button
              onClick={() => setShowJsonManagerModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              title={isEn ? 'Paste or validate raw JSON code' : 'JSON-Code einfügen & verwalten'}
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isEn ? 'JSON Editor' : 'JSON Manager'}</span>
            </button>

            <button
              onClick={handleExportAllCustomJson}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              title={isEn ? 'Download templates as .json' : 'Alle Vorlagen als .json herunterladen'}
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEn ? 'Export JSON' : 'JSON Export'}</span>
            </button>

            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'New Template' : 'Neue Vorlage'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH, QUICK FILTERS & CONTROLS CONTAINER */}
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
                  ? 'Search by keyword, voice, prompt, style, camera, actor...'
                  : 'Suche nach Stichwort, Sprecherin (z.B. samtig, de), Kamera, POV, Outfit, Thema...'
              }
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
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
                <option value="relevance">{isEn ? 'Featured / Relevance' : 'Empfohlen & Relevanz'}</option>
                <option value="title_asc">{isEn ? 'Title (A → Z)' : 'Titel (A → Z)'}</option>
                <option value="title_desc">{isEn ? 'Title (Z → A)' : 'Titel (Z → A)'}</option>
                <option value="windows_desc">{isEn ? 'Multi-Window Count' : 'Fenster-Anzahl (Multi-Shot)'}</option>
                <option value="prompt_length">{isEn ? 'Shortest Prompts' : 'Kürzeste Prompts'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* QUICK FILTER FEATURE CHIPS */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {isEn ? 'Filters:' : 'Filter:'}
          </span>

          <button
            onClick={() => setQuickFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              quickFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isEn ? 'All' : 'Alle'}
          </button>

          <button
            onClick={() => setQuickFilter('de_voice')}
            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              quickFilter === 'de_voice'
                ? 'bg-amber-500 text-slate-950 shadow-xs border border-amber-600'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <span>🇩🇪</span>
            {isEn ? 'German Voice' : 'Deutsche Stimme'}
          </button>

          <button
            onClick={() => setQuickFilter('sensual')}
            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              quickFilter === 'sensual'
                ? 'bg-rose-600 text-white shadow-xs border border-rose-700'
                : 'bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <span>💋</span>
            {isEn ? 'Sensual / Sex Sells' : 'Sinnlich & Sex Sells'}
          </button>

          <button
            onClick={() => setQuickFilter('pov')}
            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              quickFilter === 'pov'
                ? 'bg-cyan-600 text-white shadow-xs border border-cyan-700'
                : 'bg-cyan-50 text-cyan-900 border border-cyan-200 hover:bg-cyan-100'
            }`}
          >
            <Eye className="w-3 h-3" />
            {isEn ? 'First-Person POV' : 'Ego-POV & Bodycam'}
          </button>

          <button
            onClick={() => setQuickFilter('floorplan')}
            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              quickFilter === 'floorplan'
                ? 'bg-blue-600 text-white shadow-xs border border-blue-700'
                : 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            <span>📐</span>
            {isEn ? 'Floor Plan / 3D' : 'Grundriss & 3D-Flug'}
          </button>

          <button
            onClick={() => setQuickFilter('buildup')}
            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              quickFilter === 'buildup'
                ? 'bg-emerald-600 text-white shadow-xs border border-emerald-700'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <span>🏗️</span>
            {isEn ? 'Self-Assembling' : 'Aufbau-Morph'}
          </button>

          <button
            onClick={() => setQuickFilter('stickman')}
            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              quickFilter === 'stickman'
                ? 'bg-amber-600 text-white shadow-xs border border-amber-700'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <span>✏️</span>
            {isEn ? 'Stick Figures' : 'Strichmännchen'}
          </button>

          <button
            onClick={() => setQuickFilter('multi_window')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              quickFilter === 'multi_window'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            <Layers className="w-3 h-3" />
            {isEn ? 'Multi-Shot (Maestro)' : 'Multi-Shot (Maestro)'}
          </button>

          <button
            onClick={() => setQuickFilter('wardrobe')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              quickFilter === 'wardrobe'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Shirt className="w-3 h-3" />
            {isEn ? 'Wardrobe' : 'Kostüm & Outfit'}
          </button>
        </div>

        {/* PERSONEN-LOGIK FILTER BAR (1 PERSON VS >=2 PERSONEN) */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-gradient-to-r from-cyan-950/5 via-amber-950/5 to-purple-950/5 border border-slate-200/80 rounded-xl">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="text-xs font-black text-slate-900 block leading-none">
                {isEn ? 'Person Count & Reference Logic:' : 'Personen-Logik & Referenz-Struktur:'}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {isEn
                  ? 'Filter by 1 Person (picture 1 solo focus) vs. ≥2 Persons (picture 1–4 duo & ensemble)'
                  : 'Gezielt filtern nach 1 Person (Solo-Hauptrolle) vs. ≥2 Personen (Duo / Gruppe / Ensemble)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">


            <button
              onClick={() => setPersonFilter('1_person')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border flex items-center gap-1.5 ${
                personFilter === '1_person'
                  ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm ring-2 ring-cyan-500/20'
                  : 'bg-cyan-50/80 text-cyan-950 border-cyan-200 hover:bg-cyan-100'
              }`}
            >
              <span>👤</span>
              {isEn ? '1 Person (Solo)' : '👤 1 Person (Solo)'}
              <span className="text-[10px] opacity-80 font-mono">(picture 1)</span>
            </button>

            <button
              onClick={() => setPersonFilter('2_person')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border flex items-center gap-1.5 ${
                personFilter === '2_person'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm ring-2 ring-emerald-500/20'
                  : 'bg-emerald-50/80 text-emerald-950 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <span>👥</span>
              {isEn ? '2 Persons (Duo)' : '👥 2 Personen (Duo)'}
              <span className="text-[10px] opacity-80 font-mono">(picture 1–2)</span>
            </button>

            <button
              onClick={() => setPersonFilter('multi_person')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border flex items-center gap-1.5 ${
                personFilter === 'multi_person'
                  ? 'bg-purple-600 text-white border-purple-700 shadow-sm ring-2 ring-purple-500/20'
                  : 'bg-purple-50/80 text-purple-950 border-purple-200 hover:bg-purple-100'
              }`}
            >
              <span>👥</span>
              {isEn ? '3+ Persons (Ensemble)' : '👥 3+ Personen (Ensemble)'}
              <span className="text-[10px] opacity-80 font-mono">(picture 1–4)</span>
            </button>
          </div>
        </div>

        {/* REFERENZBILDER-LOGIK FILTER BAR */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-gradient-to-r from-amber-950/5 via-cyan-950/5 to-emerald-950/5 border border-slate-200/80 rounded-xl mt-2">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-cyan-600 shrink-0" />
            <div>
              <span className="text-xs font-black text-slate-900 block leading-none">
                {isEn ? 'Reference Image Count Filter:' : 'Referenzbilder-Anzahl filtern:'}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {isEn
                  ? 'Filter templates based on active reference picture anchors used in prompt'
                  : 'Vorlagen nach Anzahl der im Prompt genutzten Referenzbild-Anker (picture 1-4) filtern'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setPictureCountFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer border ${
                pictureCountFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              🌐 {isEn ? 'All Image Counts' : 'Alle Bilderanzahlen'}
            </button>

            <button
              onClick={() => setPictureCountFilter('1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border flex items-center gap-1.5 ${
                pictureCountFilter === '1'
                  ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm ring-2 ring-cyan-500/20'
                  : 'bg-cyan-50/80 text-cyan-950 border-cyan-200 hover:bg-cyan-100'
              }`}
            >
              <span>🖼️</span>
              {isEn ? 'Exactly 1 Image' : 'Exakt 1 Bild'}
              <span className="text-[10px] opacity-80 font-mono">(picture 1)</span>
            </button>

            <button
              onClick={() => setPictureCountFilter('2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border flex items-center gap-1.5 ${
                pictureCountFilter === '2'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm ring-2 ring-emerald-500/20'
                  : 'bg-emerald-50/80 text-emerald-950 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <span>🖼️🖼️</span>
              {isEn ? 'Exactly 2 Images' : 'Exakt 2 Bilder'}
              <span className="text-[10px] opacity-80 font-mono">(picture 1–2)</span>
            </button>

            <button
              onClick={() => setPictureCountFilter('multi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border flex items-center gap-1.5 ${
                pictureCountFilter === 'multi'
                  ? 'bg-purple-600 text-white border-purple-700 shadow-sm ring-2 ring-purple-500/20'
                  : 'bg-purple-50/80 text-purple-950 border-purple-200 hover:bg-purple-100'
              }`}
            >
              <span>🖼️👥</span>
              {isEn ? '3-4 Images (Multi)' : '3–4 Bilder (Multi)'}
              <span className="text-[10px] opacity-80 font-mono">(picture 1–4)</span>
            </button>
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(activeTagFilter || searchQuery || selectedCategory !== 'all' || quickFilter !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">
              {isEn ? 'Active Filters:' : 'Aktive Filter:'}
            </span>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-900 text-amber-300 font-bold rounded-lg">
                <span>{isEn ? 'Category:' : 'Kategorie:'} {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('all')} className="hover:text-white cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeTagFilter && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-500 text-slate-950 font-extrabold rounded-lg shadow-xs">
                <Tag className="w-3 h-3" />
                <span>#{activeTagFilter}</span>
                <button onClick={() => setActiveTagFilter(null)} className="hover:text-slate-800 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {quickFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-600 text-white font-bold rounded-lg">
                <span>Filter: {quickFilter}</span>
                <button onClick={() => setQuickFilter('all')} className="hover:text-slate-200 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-200 text-slate-800 font-bold rounded-lg">
                <span>"{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-slate-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg font-bold transition-colors cursor-pointer ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              {isEn ? 'Reset All Filters' : 'Alle Filter zurücksetzen'}
            </button>
          </div>
        )}
      </div>

      {/* CATEGORY PILL TABS */}
      <div className="flex flex-wrap gap-2">
        {categories.filter(cat => cat.id === 'all' || cat.count > 0).map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
              <span
                className={`ml-1 px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                  isActive ? 'bg-slate-950 text-amber-300 font-bold' : 'bg-slate-100 text-slate-600 font-bold'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* RESULTS STATUS & EXPORT BUTTON */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-extrabold text-slate-700">
          {isEn ? (
            <>
              Showing <span className="text-amber-600 font-mono">{filteredTemplates.length}</span> of {allTemplates.length} templates
            </>
          ) : (
            <>
              Gefunden: <span className="text-amber-600 font-mono">{filteredTemplates.length}</span> von {allTemplates.length} Vorlagen
            </>
          )}
        </p>

        {filteredTemplates.length > 0 && (
          <button
            onClick={handleExportFilteredJson}
            className="text-xs text-slate-600 hover:text-amber-600 font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            {isEn ? 'Export Current Filter as JSON' : 'Aktive Auswahl als .json exportieren'}
          </button>
        )}
      </div>

      {/* ZERO STATE */}
      {filteredTemplates.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {isEn ? 'No matching templates found' : 'Keine passenden Vorlagen gefunden'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {isEn
                ? 'Try different keywords or click on one of our popular quick suggestions below:'
                : 'Versuche andere Suchbegriffe oder klicke auf einen der beliebten Vorschläge:'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {['Sinnlich', 'Parfum', 'Deutsch', 'Grundriss', 'Strichmännchen', 'Drohne', 'Cyberpunk', 'Horror', 'Penthouse'].map((keyword) => (
              <button
                key={keyword}
                onClick={() => {
                  setSearchQuery(keyword);
                  setSelectedCategory('all');
                  setQuickFilter('all');
                  setActiveTagFilter(null);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                🔍 "{keyword}"
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition-colors cursor-pointer"
            >
              {isEn ? 'Reset All Filters' : 'Alle Filter zurücksetzen'}
            </button>
          </div>
        </div>
      )}

      {/* PRESET CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedTemplates.map((tpl) => {
          const isStickman = tpl.tags?.some(t => /strichmännchen|strichweibchen|stickman|stickwoman/i.test(t));
          const isBuildup = tpl.tags?.some(t => /sich aufbauend|self-assembly/i.test(t)) || /sich aufbauend|self-assembling|rohbau-zu-design/i.test(tpl.title);
          const isFloorplan = !isBuildup && tpl.tags?.some(t => /grundriss|floorplan|blueprint|innenraumflug/i.test(t));
          const isSensual = tpl.category === 'erotik' || /sensual|alluring|velvet|seductive|parfum|haute couture|boudoir/i.test(tpl.title + ' ' + tpl.description);

          return (
            <div
              key={tpl.id}
              className={`group bg-white border rounded-2xl overflow-hidden transition-all shadow-xs flex flex-col justify-between hover:shadow-md ${
                tpl.isCustom
                  ? 'border-amber-400 ring-2 ring-amber-400/20'
                  : isSensual
                  ? 'border-rose-200 hover:border-rose-400'
                  : isBuildup
                  ? 'border-emerald-300 hover:border-emerald-500 ring-1 ring-emerald-500/10'
                  : isFloorplan
                  ? 'border-blue-200 hover:border-blue-500'
                  : isStickman
                  ? 'border-amber-200 hover:border-amber-500'
                  : 'border-slate-200 hover:border-amber-500'
              }`}
            >
              {/* Card Header & Badge Bar */}
              <div
                className={`p-3.5 text-white flex items-center justify-between border-b ${
                  isSensual
                    ? 'bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border-rose-900/60'
                    : isBuildup
                    ? 'bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-emerald-900/60'
                    : isFloorplan
                    ? 'bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-blue-900/60'
                    : isStickman
                    ? 'bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border-amber-900/60'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-xs text-amber-300 flex items-center gap-1.5">
                    {isSensual ? '💋' : isBuildup ? '🏗️' : isFloorplan ? '📐' : isStickman ? '✏️' : <Bookmark className="w-3.5 h-3.5 text-amber-400" />}
                    {tpl.badge}
                  </span>

                  {/* Windows Count Pill */}
                  {tpl.windowsCount && tpl.windowsCount > 1 ? (
                    <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-400/40 text-purple-300 text-[10px] font-extrabold rounded-lg font-mono flex items-center gap-1">
                      <Layers className="w-2.5 h-2.5" />
                      {tpl.windowsCount} Shots
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg font-mono">
                      1 Shot
                    </span>
                  )}

                  {/* Person Count Pill Badge */}
                  {tpl.personCount === 'multi_person' ? (
                    <span className="px-1.5 py-0.5 bg-purple-500/30 border border-purple-400/50 text-purple-200 text-[10px] font-extrabold rounded-md flex items-center gap-1" title="3+ Personen (Ensemble)">
                      👥 3+ Pers.
                    </span>
                  ) : tpl.personCount === '2_person' || tpl.tags?.includes('duo') || tpl.tags?.includes('2_personen') ? (
                    <span className="px-1.5 py-0.5 bg-emerald-500/30 border border-emerald-400/50 text-emerald-200 text-[10px] font-extrabold rounded-md flex items-center gap-1" title="2 Personen (Duo)">
                      👥 Duo
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-[10px] font-extrabold rounded-md flex items-center gap-1" title="1 Person (Solo)">
                      👤 Solo
                    </span>
                  )}

                  {/* POV Pill */}
                  {tpl.isImmersivePov && (
                    <span className="px-1.5 py-0.5 bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-[10px] font-bold rounded-md flex items-center gap-1">
                      <Eye className="w-2.5 h-2.5" />
                      POV
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {tpl.isNsfw && (
                    <span className="px-1.5 py-0.5 bg-rose-600 text-white text-[10px] font-bold rounded-md flex items-center gap-0.5">
                      <ShieldAlert className="w-2.5 h-2.5" />
                      NSFW
                    </span>
                  )}

                  {/* Single Template JSON Button */}
                  <button
                    onClick={() => setViewingJsonTemplate(tpl)}
                    className="text-slate-400 hover:text-amber-300 p-1 cursor-pointer transition-colors"
                    title={isEn ? 'View Raw JSON' : 'JSON Schema ansehen'}
                  >
                    <FileJson className="w-3.5 h-3.5" />
                  </button>

                  {tpl.isCustom && (
                    <button
                      onClick={() => onDeleteCustomTemplate(tpl.id)}
                      className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                      title={isEn ? 'Delete template' : 'Vorlage löschen'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-600 transition-colors leading-tight">
                      {highlightText(tpl.title)}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 font-medium leading-relaxed">
                    {highlightText(tpl.description)}
                  </p>

                  {/* Prompt Box Preview */}
                  <div className="mt-3 p-2.5 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-800 line-clamp-3 leading-relaxed transition-colors">
                    {highlightText(tpl.prompt)}
                  </div>

                  {/* Tags */}
                  {tpl.tags && tpl.tags.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {tpl.tags.slice(0, 5).map((tag, idx) => {
                        const isCurrentActive = activeTagFilter?.toLowerCase() === tag.toLowerCase();
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveTagFilter(isCurrentActive ? null : tag)}
                            className={`px-2 py-0.5 text-[10px] rounded-md font-semibold transition-colors cursor-pointer ${
                              isCurrentActive
                                ? 'bg-amber-500 text-slate-950 font-extrabold'
                                : 'bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-600'
                            }`}
                            title={isEn ? `Filter by #${tag}` : `Nach #${tag} filtern`}
                          >
                            #{tag}
                          </button>
                        );
                      })}
                      {tpl.tags.length > 5 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
                          +{tpl.tags.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Quick Attributes */}
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-slate-600 font-mono font-medium">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700" title={tpl.camera}>
                      📷 {tpl.camera.split(' ').slice(0, 3).join(' ')}...
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700" title={tpl.lighting}>
                      💡 {tpl.lighting.split(' ').slice(0, 3).join(' ')}...
                    </span>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200/60 rounded flex items-center gap-1 font-bold">
                      <Mic className="w-2.5 h-2.5 text-amber-600" />
                      {(tpl.narratorVoice || getNarratorVoiceFallbackForCategory(tpl.category, tpl.title)).split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectTemplate(tpl, 1)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    {isEn ? 'Load into Builder' : 'In Builder Laden'}
                  </button>

                  <button
                    onClick={() => setViewingJsonTemplate(tpl)}
                    title={isEn ? 'View & copy JSON' : 'JSON Schema ansehen & kopieren'}
                    className="p-2 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-xl transition-colors border border-slate-200 cursor-pointer"
                  >
                    <Code className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopy(tpl)}
                    title={isEn ? 'Copy prompt' : 'Prompt kopieren'}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200 cursor-pointer"
                  >
                    {copiedId === tpl.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/60 mt-8">
          <p className="text-xs font-semibold text-slate-500">
            {isEn ? (
              <>
                Showing page <span className="text-slate-800 font-extrabold">{currentPage}</span> of <span className="text-slate-800 font-extrabold">{totalPages}</span> ({filteredTemplates.length} templates total)
              </>
            ) : (
              <>
                Zeige Seite <span className="text-slate-800 font-extrabold">{currentPage}</span> von <span className="text-slate-800 font-extrabold">{totalPages}</span> (insgesamt {filteredTemplates.length} Vorlagen)
              </>
            )}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                currentPage === 1
                  ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-50'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-slate-300'
              }`}
            >
              &laquo;
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                currentPage === 1
                  ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-50'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-slate-300'
              }`}
            >
              {isEn ? 'Previous' : 'Zurück'}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .map((page, index, array) => {
                const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                return (
                  <React.Fragment key={page}>
                    {showEllipsisBefore && (
                      <span className="px-2 text-xs text-slate-400 font-bold">...</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        currentPage === page
                          ? 'bg-amber-500 border-amber-500 text-slate-950 font-extrabold shadow-sm'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                currentPage === totalPages
                  ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-50'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-slate-300'
              }`}
            >
              {isEn ? 'Next' : 'Weiter'}
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                currentPage === totalPages
                  ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-50'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-slate-300'
              }`}
            >
              &raquo;
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL: JSON MANAGER & RAW PASTE ================= */}
      {showJsonManagerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {isEn ? 'JSON Template Manager (Import / Export / Raw Edit)' : 'JSON Vorlagen-Manager (Import / Export / Roh-Code)'}
                </h3>
              </div>
              <button
                onClick={() => setShowJsonManagerModal(false)}
                className="p-1 text-slate-400 hover:text-slate-900 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              {isEn
                ? 'Paste any valid single template JSON or an array of templates [ {...}, {...} ]. The engine strictly validates schema integrity.'
                : 'Füge hier ein einzelnes Vorlagen-JSON oder ein Array von Vorlagen ein [ {...}, {...} ]. Alle Felder werden exakt validiert.'}
            </p>

            <textarea
              value={rawJsonInput}
              onChange={(e) => {
                setRawJsonInput(e.target.value);
                setJsonValidationResult({ tested: false, valid: false, count: 0 });
              }}
              placeholder={`{\n  "title": "Mein Luxus-Imagefilm",\n  "category": "fashion",\n  "prompt": "Cinematic 4k shot of an elegant woman...",\n  "narratorVoice": "Warm, deeply sensual German female voice",\n  "camera": "Slow tracking shot"\n}`}
              className="w-full h-56 bg-slate-900 text-amber-300 font-mono text-xs p-3.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
            />

            {/* Validation Feedback */}
            {jsonValidationResult.tested && (
              <div
                className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  jsonValidationResult.valid
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-50 text-rose-900 border border-rose-300'
                }`}
              >
                {jsonValidationResult.valid ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      {isEn
                        ? `Valid JSON: ${jsonValidationResult.count} template(s) ready to import!`
                        : `Gültiges JSON: ${jsonValidationResult.count} Vorlage(n) erfolgreich erkannt!`}
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>{jsonValidationResult.error || 'Fehler beim Parsen des JSON.'}</span>
                  </>
                )}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleValidateRawJson}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
              >
                {isEn ? 'Validate JSON Syntax' : 'JSON Prüfen'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowJsonManagerModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold text-xs cursor-pointer"
                >
                  {isEn ? 'Cancel' : 'Abbrechen'}
                </button>
                <button
                  type="button"
                  onClick={() => validateAndImportJson(rawJsonInput)}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-xs cursor-pointer"
                >
                  {isEn ? 'Import & Save to Library' : 'Importieren & Speichern'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: SINGLE TEMPLATE RAW JSON VIEWER ================= */}
      {viewingJsonTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCodeIcon className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-extrabold text-slate-900">
                  JSON Schema: {viewingJsonTemplate.title}
                </h3>
              </div>
              <button
                onClick={() => setViewingJsonTemplate(null)}
                className="p-1 text-slate-400 hover:text-slate-900 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <pre className="bg-slate-900 text-emerald-300 font-mono text-[11px] p-4 rounded-xl border border-slate-800 max-h-80 overflow-y-auto leading-relaxed selection:bg-amber-500 selection:text-slate-950">
                {JSON.stringify(viewingJsonTemplate, null, 2)}
              </pre>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  triggerJSONDownload(`${viewingJsonTemplate.id || 'template'}.json`, viewingJsonTemplate);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isEn ? 'Download .json file' : 'Als .json Datei herunterladen'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(viewingJsonTemplate, null, 2));
                    onCopyText(JSON.stringify(viewingJsonTemplate, null, 2), viewingJsonTemplate.title + ' (JSON)');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEn ? 'Copy JSON' : 'JSON Kopieren'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectTemplate(viewingJsonTemplate, 1);
                    setViewingJsonTemplate(null);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-xs cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Load into Builder' : 'In Builder Laden'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CREATE CUSTOM TEMPLATE ================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative my-8 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-500" />
                {isEn ? 'Create New JSON Template' : 'Neue Vorlage erstellen (Formular / JSON)'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-900 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher: Form vs Pure JSON */}
            <div className="flex items-center gap-2 pt-3">
              <button
                type="button"
                onClick={() => setCreateModeTab('form')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  createModeTab === 'form'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isEn ? 'Visual Form' : 'Formular-Eingabe'}
              </button>
              <button
                type="button"
                onClick={() => setCreateModeTab('json')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  createModeTab === 'json'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isEn ? 'Direct JSON Code Editor' : 'Direkter JSON Code-Editor'}
              </button>
            </div>

            <form onSubmit={handleSaveCustom} className="space-y-4 pt-4 text-xs">
              {createModeTab === 'json' ? (
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {isEn ? 'Raw JSON Definition *' : 'JSON Vorlagen-Definition *'}
                  </label>
                  <textarea
                    required
                    value={newJsonTemplateCode}
                    onChange={(e) => setNewJsonTemplateCode(e.target.value)}
                    className="w-full h-64 bg-slate-900 text-amber-300 font-mono text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      {isEn ? 'Template Title *' : 'Titel der Vorlage *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder={isEn ? 'e.g. Sensual Luxury Perfume Spot' : 'z.B. Sinnlicher Luxus Parfüm Werbespot'}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">
                        {isEn ? 'Category' : 'Kategorie'}
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e: any) => setNewCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none"
                      >
                        <option value="custom">{isEn ? 'Custom' : 'Eigene'}</option>
                        <option value="fashion">Fashion & Luxus</option>
                        <option value="erotik">Erotik & Sinnlich</option>
                        <option value="immobilien">Immobilien & Grundrisse</option>
                        <option value="restaurant">Restaurant & Food</option>
                        <option value="comic">Comic & Strichmännchen</option>
                        <option value="horror">Horror</option>
                        <option value="sitcom">Sitcom</option>
                        <option value="scify">Sci-Fi</option>
                        <option value="bau">Bau & Handwerk</option>
                        <option value="action">Action</option>
                        <option value="cyberpunk">Cyberpunk</option>
                        <option value="nature">Natur</option>
                        <option value="war">Kriegsfilm</option>
                        <option value="politics">Politik</option>
                        <option value="travel">Tourismus & Reisen</option>
                        <option value="immersive">Immersive (POV)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">
                        {isEn ? 'Badge / Tag' : 'Badge / Label'}
                      </label>
                      <input
                        type="text"
                        value={newBadge}
                        onChange={(e) => setNewBadge(e.target.value)}
                        placeholder={isEn ? 'e.g. 4K Commercial' : 'z.B. 4K Spot'}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      {isEn ? 'Description' : 'Beschreibung'}
                    </label>
                    <input
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder={isEn ? 'Short summary...' : 'Kurze Erklärung der Vorlage...'}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      {isEn ? 'Main Prompt *' : 'Haupt-Prompt *'}
                    </label>
                    <textarea
                      required
                      value={newPrompt}
                      onChange={(e) => setNewPrompt(e.target.value)}
                      placeholder="A cinematic video prompt..."
                      className="w-full h-20 bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 font-sans resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">
                        {isEn ? 'Narrator / Voice' : 'Sprecher / Narrator'}
                      </label>
                      <input
                        type="text"
                        value={newNarratorVoice}
                        onChange={(e) => setNewNarratorVoice(e.target.value)}
                        placeholder="z.B. Warm, sensual German female voice"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">
                        {isEn ? 'Camera Movement' : 'Kamera-Führung'}
                      </label>
                      <input
                        type="text"
                        value={newCamera}
                        onChange={(e) => setNewCamera(e.target.value)}
                        placeholder="Slow tracking shot"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newIsPov}
                        onChange={(e) => setNewIsPov(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-amber-500 h-4 w-4"
                      />
                      {isEn ? 'Immersive Ego-POV Mode' : 'Immersiver Ego-POV Modus'}
                    </label>

                    <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newIsNsfw}
                        onChange={(e) => setNewIsNsfw(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-amber-500 h-4 w-4"
                      />
                      {isEn ? 'NSFW / Sensual' : 'NSFW / Sinnlich'}
                    </label>
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                >
                  {isEn ? 'Cancel' : 'Abbrechen'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-xs cursor-pointer"
                >
                  {isEn ? 'Save JSON Template' : 'Vorlage Speichern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Central JSON Backup & Restore Modal */}
      <TemplateBackupManagerModal
        isOpen={showBackupHubModal}
        onClose={() => setShowBackupHubModal(false)}
        customTemplates={customTemplates}
        builtInTemplates={builtInTemplates}
        onUpdateCustomTemplates={(newTemplates) => {
          if (onUpdateCustomTemplates) {
            onUpdateCustomTemplates(newTemplates);
          }
        }}
        onShowToast={(msg) => onCopyText('', msg)}
        language={language}
      />
    </div>
  );
};

function FileCodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 12.5 8 15l2 2.5" />
      <path d="m14 12.5 2 2.5-2 2.5" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
    </svg>
  );
}
