import React, { useState } from 'react';
import { 
  Sparkles, 
  Film, 
  Image as ImageIcon, 
  Layers, 
  BookOpen, 
  Bookmark, 
  SlidersHorizontal, 
  Bot, 
  Globe, 
  Flame, 
  Download, 
  Upload, 
  Check, 
  X, 
  Video, 
  FileJson,
  ShieldCheck,
  AlertTriangle,
  Camera,
  Megaphone,
  ExternalLink
} from 'lucide-react';
import { PromptBuildState } from '../types';
import { formatPrecisionTimeRange } from '../utils/promptCompiler';
import { ANALOG_MASTER_PRESETS } from '../utils/analogMasterEngine';
import { COMMERCIAL_MASTER_PRESETS } from '../utils/commercialMasterEngine';

interface SidebarProps {
  state: PromptBuildState;
  onChangeTab: (tab: PromptBuildState['activeTab']) => void;
  onChangeAppMode: (mode: PromptBuildState['appMode']) => void;
  onToggleNsfw: () => void;
  onToggleLanguage: (lang: 'de' | 'en') => void;
  onImportState: (newState: Partial<PromptBuildState>) => void;
  onShowToast: (msg: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  state,
  onChangeTab,
  onChangeAppMode,
  onToggleNsfw,
  onToggleLanguage,
  onImportState,
  onShowToast,
}) => {
  const [showAiModal, setShowAiModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [importError, setImportError] = useState('');

  const isEn = state.language === 'en';

  const translations = {
    appTitle: 'MAESTRO H3',
    appSub: isEn ? 'Director\'s Sequencer' : 'Regie & Multi-Window Studio',
    modeTitle: isEn ? 'Workspace Mode' : 'Arbeitsbereich-Modus',
    modePro: isEn ? 'Pro Mode' : 'Profimodus',
    modeWizard: isEn ? 'Wizard Mode' : 'Dialogmodus',
    navTitle: isEn ? 'Navigation' : 'Hauptnavigation',
    tabBuilder: isEn ? 'Click-Builder' : 'Klick-Builder',
    tabTemplates: isEn ? 'Template Library' : 'Vorlagen-Bibliothek',
    tabReferences: isEn ? 'Reference Images' : 'Referenz-Bilder',
    tabTimeline: isEn ? 'Maestro Timeline' : 'Maestro Timeline',
    tabGuidelines: isEn ? 'AI Rules & Formulas' : 'KI-Formeln / Regeln',
    tabSaved: isEn ? 'Saved Setups' : 'Eigene Vorlagen',
    configTitle: isEn ? 'System Controls' : 'System-Regler',
    langSelect: isEn ? 'Interface Language' : 'System-Sprache',
    nsfwMode: isEn ? 'NSFW / Gore Filters' : 'NSFW & Gore-Filter',
    nsfwOn: isEn ? 'Bypass On' : 'Bypass Aktiv',
    nsfwOff: isEn ? 'Bypass Off' : 'Bypass Aus',
    aiInterface: isEn ? 'AI Template Interface' : 'KI-Schnittstelle (Schablone)',
    aiBtn: isEn ? 'AI Export / Import' : 'KI Export / Import',
    modalTitle: isEn ? 'AI Prompt-Schablone (Export & Import)' : 'KI Prompt-Schablone (Export & Import)',
    modalSubtitle: isEn ? 'Export state blueprint for Claude/ChatGPT or paste generated JSON back to load.' : 'Exportiere die Schablone für Claude/ChatGPT oder füge generiertes JSON zum Laden ein.',
    exportBtn: isEn ? 'Copy Blueprint for AI' : 'Schablone für KI kopieren',
    exportSuccess: isEn ? 'Copied Blueprint!' : 'Schablone kopiert!',
    importLabel: isEn ? 'Paste AI Response JSON here:' : 'Füge die KI-Antwort (JSON) hier ein:',
    importBtn: isEn ? 'Import and Load Workspace' : 'Importieren & Laden',
    importPlaceholder: isEn ? 'Paste JSON output here...' : 'Füge hier den JSON-Block ein...',
    toastImportSuccess: isEn ? '🚀 AI workspace loaded successfully!' : '🚀 KI-Arbeitsbereich erfolgreich geladen!',
    toastImportFailed: isEn ? '❌ Invalid JSON format. Please verify structure.' : '❌ Ungültiges JSON-Format. Bitte Struktur prüfen.',
    closeBtn: isEn ? 'Close' : 'Schließen',
    proDesc: isEn ? 'Direct access to all sliders and timeline editing.' : 'Direkter Zugriff auf alle Regler, Klick-Grid und Multi-Window-Editor.',
    wizardDesc: isEn ? 'Step-by-step guided setup builder.' : 'Geführter Assistent für schnelles Prompting.'
  };

  const aiBlueprintTemplate = `## INSTRUCTIONS FOR AI (CLAUDE / CHATGPT / GEMINI):
Create a cinematic video composition prompt by generating a JSON block matching the schema below.
Ensure the prompt features deep atmosphere, concrete textures, high-contrast lighting, and rich costume details.

### COMPATIBLE JSON OUTPUT (FILL THIS OUT):
\`\`\`json
{
  "rawConcept": "A captivating, high-tension cinematic moment...",
  "movieTitle": "E.g. THE WHISPERING GALE",
  "narratorVoice": "E.g. Deep male narrator with a gravelly, old weathered cowboy raspy voice",
  "dialogueLines": "E.g. He whispers: 'They are coming... run.'",
  "wardrobeStyle": "E.g. Neo-Gothic Victorian Broadcloth",
  "clothingDetails": "E.g. Wet charcoal-grey woolen frock coat, silver double-breasted buttons, high velvet collar",
  "fashionAccessories": "E.g. Round silver spectacles, tarnished clockwork pocketwatch",
  "characterPersonaDescription": "E.g. A weathered 54-year-old grizzled deep sea captain, sea-salted grey beard, steel-blue eyes reflecting warm firelight",
  "cameraMotion": "E.g. High-end camera tracking shot drifting slowly closer in a low-key tilt",
  "lighting": "E.g. Warm candlelit low-key glow casting soft flickering shadows across facial features",
  "lensStyle": "E.g. 85mm professional portrait lens with ultra-creamy bokeh and sharp skin textures",
  "atmosphere": "E.g. Wet ocean fog creeping in through window panes, warm embers swirling",
  "colorGrade": "E.g. Bleach bypass cinematic tones with copper warmth and steel blue shadows",
  "audioCue": "E.g. [Audio: Loud ocean wind roaring outside, clockwork gears ticking slowly]",
  "generatorMode": "single"
}
\`\`\``;

  const handleCopyBlueprint = () => {
    navigator.clipboard.writeText(aiBlueprintTemplate);
    setCopiedTemplate(true);
    onShowToast(isEn ? '📋 AI Blueprint copied to clipboard!' : '📋 KI-Schablone in Zwischenablage kopiert!');
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleImportJson = () => {
    try {
      // Basic extraction of JSON block if user pasted extra conversational text
      let cleanedText = importText.trim();
      const jsonStart = cleanedText.indexOf('{');
      const jsonEnd = cleanedText.lastIndexOf('}');
      
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
      }

      const parsed = JSON.parse(cleanedText);
      
      // Merge keys to set state
      const newState: Partial<PromptBuildState> = {};
      
      if (parsed.rawConcept) newState.rawConcept = parsed.rawConcept;
      if (parsed.movieTitle) newState.movieTitle = parsed.movieTitle;
      if (parsed.narratorVoice) newState.narratorVoice = parsed.narratorVoice;
      if (parsed.dialogueLines) newState.dialogueLines = parsed.dialogueLines;
      if (parsed.wardrobeStyle) newState.wardrobeStyle = parsed.wardrobeStyle;
      if (parsed.clothingDetails) newState.clothingDetails = parsed.clothingDetails;
      if (parsed.fashionAccessories) newState.fashionAccessories = parsed.fashionAccessories;
      if (parsed.characterPersonaDescription) newState.characterPersonaDescription = parsed.characterPersonaDescription;
      if (parsed.cameraMotion) newState.cameraMotion = parsed.cameraMotion;
      if (parsed.lighting) newState.lighting = parsed.lighting;
      if (parsed.lensStyle) newState.lensStyle = parsed.lensStyle;
      if (parsed.atmosphere) newState.atmosphere = parsed.atmosphere;
      if (parsed.colorGrade) newState.colorGrade = parsed.colorGrade;
      if (parsed.audioCue) newState.audioCue = parsed.audioCue;
      if (parsed.generatorMode) newState.generatorMode = parsed.generatorMode;
      
      if (parsed.windows && Array.isArray(parsed.windows)) {
        newState.windows = parsed.windows.map((w: any, idx: number) => ({
          id: `imported-win-${idx}-${Date.now()}`,
          windowNumber: w.windowNumber || (idx + 1),
          timeRange: w.timeRange || formatPrecisionTimeRange(w.windowNumber || (idx + 1), 14),
          prompt: w.prompt || 'Szenen-Aktion',
          cameraTrajectory: w.cameraTrajectory || 'Seamless continuity',
          continuityNote: w.continuityNote || '',
          motionSpeed: w.motionSpeed || '24fps Normal',
          referenceImages: []
        }));
      }

      onImportState(newState);
      onShowToast(translations.toastImportSuccess);
      setShowAiModal(false);
      setImportText('');
      setImportError('');
    } catch (e) {
      setImportError(translations.toastImportFailed);
      onShowToast(translations.toastImportFailed);
    }
  };

  return (
    <>
      {/* Desktop Left Sidebar Panel */}
      <aside className="hidden lg:flex w-72 flex-col shrink-0 bg-slate-950 text-slate-100 border-r border-slate-800 h-screen sticky top-0 overflow-y-auto selection:bg-amber-500 selection:text-slate-950">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3 bg-slate-950/40">
          <div className="p-2 bg-amber-500 rounded-xl text-slate-950 shadow-md">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base tracking-tight text-white font-mono">
                {translations.appTitle}
              </h1>
              <span className="px-1.5 py-0.5 text-[8px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded uppercase tracking-wider">
                H3
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              {translations.appSub}
            </p>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 p-4 space-y-6">
          
          {/* Workspace mode Toggle */}
          <div className="space-y-1.5">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
              {translations.modeTitle}
            </h3>
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 grid grid-cols-2 gap-1">
              <button
                onClick={() => onChangeAppMode('pro')}
                className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  state.appMode === 'pro'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={translations.proDesc}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>{translations.modePro}</span>
              </button>
              <button
                onClick={() => onChangeAppMode('wizard')}
                className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  state.appMode === 'wizard'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={translations.wizardDesc}
              >
                <Bot className="w-3 h-3" />
                <span>{translations.modeWizard}</span>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          {state.appMode === 'pro' && (
            <div className="space-y-1">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
                {translations.navTitle}
              </h3>
              
              <button
                onClick={() => onChangeTab('click-builder')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  state.activeTab === 'click-builder'
                    ? 'bg-slate-800 text-amber-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{translations.tabBuilder}</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </button>

              <button
                onClick={() => onChangeTab('templates')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  state.activeTab === 'templates'
                    ? 'bg-slate-800 text-amber-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Film className="w-4 h-4 shrink-0" />
                  <span>{translations.tabTemplates}</span>
                </div>
                <span className="px-1.5 py-0.2 bg-slate-900 text-slate-400 text-[9px] rounded font-mono font-black border border-slate-800">
                  1,100+
                </span>
              </button>

              <button
                onClick={() => onChangeTab('analog-engine')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  state.activeTab === 'analog-engine'
                    ? 'bg-slate-800 text-amber-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Analog Engine</span>
                </div>
                <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[9px] rounded font-mono font-black border border-amber-500/30">
                  {ANALOG_MASTER_PRESETS.length} Presets
                </span>
              </button>

              <button
                onClick={() => onChangeTab('commercial-ads')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  state.activeTab === 'commercial-ads'
                    ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Megaphone className="w-4 h-4 shrink-0 text-indigo-400" />
                  <span>Commercials & Ads</span>
                </div>
                <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 text-[9px] rounded font-mono font-black border border-indigo-500/30">
                  {COMMERCIAL_MASTER_PRESETS.length} Ad-Presets
                </span>
              </button>

              <button
                onClick={() => onChangeTab('references')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  state.activeTab === 'references'
                    ? 'bg-slate-800 text-amber-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4 shrink-0" />
                  <span>{translations.tabReferences}</span>
                </div>
                {state.referenceImages.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {state.referenceImages.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => onChangeTab('guidelines')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  state.activeTab === 'guidelines'
                    ? 'bg-slate-800 text-amber-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>{translations.tabGuidelines}</span>
                </div>
              </button>

              <button
                onClick={() => onChangeTab('saved')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  state.activeTab === 'saved'
                    ? 'bg-slate-800 text-amber-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bookmark className="w-4 h-4 shrink-0" />
                  <span>{translations.tabSaved}</span>
                </div>
              </button>
            </div>
          )}

          {/* Quick AI Template Button */}
          <div className="pt-2">
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-center">
              <div className="flex items-center justify-center gap-2 text-amber-400">
                <FileJson className="w-4 h-4" />
                <h4 className="font-extrabold text-[11px] uppercase tracking-wider">
                  {translations.aiInterface}
                </h4>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                {isEn 
                  ? 'Generate presets using LLMs by exporting the blueprint schema.'
                  : 'Generiere Presets mit ChatGPT/Claude per strukturiertem Schema.'}
              </p>
              <button
                onClick={() => setShowAiModal(true)}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-xl transition-all border border-slate-700"
              >
                {translations.aiBtn}
              </button>
            </div>
          </div>

          {/* System Control Panel (Language & NSFW) */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
              {translations.configTitle}
            </h3>

            {/* Language Switch */}
            <div className="space-y-1 px-2">
              <label className="text-[10px] text-slate-400 font-semibold block">
                {translations.langSelect}
              </label>
              <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-800 flex items-center gap-0.5">
                <button
                  onClick={() => onToggleLanguage('de')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded text-[11px] font-black transition-all ${
                    state.language === 'de'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>🇩🇪</span>
                  <span>DE</span>
                </button>
                <button
                  onClick={() => onToggleLanguage('en')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1 rounded text-[11px] font-black transition-all ${
                    state.language === 'en'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>EN</span>
                </button>
              </div>
            </div>

            {/* NSFW Toggle */}
            <div className="space-y-1 px-2">
              <label className="text-[10px] text-slate-400 font-semibold block">
                {translations.nsfwMode}
              </label>
              <button
                onClick={onToggleNsfw}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  state.nsfwMode
                    ? 'bg-rose-950/40 text-rose-300 border-rose-800'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className={`w-3.5 h-3.5 ${state.nsfwMode ? 'text-rose-500 animate-pulse' : 'text-slate-500'}`} />
                  <span>Unfiltered Edge</span>
                </div>
                <span className="text-[10px]">
                  {state.nsfwMode ? translations.nsfwOn : translations.nsfwOff}
                </span>
              </button>
            </div>

          </div>

          {/* Sponsors & Partner Projects */}
          <div className="space-y-2 pt-3 border-t border-slate-800/80 px-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
              <span>{isEn ? 'Sponsors & Projects' : 'Sponsoren & Projekte'}</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-mono font-semibold">
                Partner
              </span>
            </div>
            
            <div className="space-y-1.5">
              <a
                href="https://ai-wizards.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-amber-500/40 transition-all text-xs"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-200 group-hover:text-amber-300 text-[11px] truncate">
                      AI-Wizards.de
                    </div>
                    <div className="text-[9px] text-slate-400 truncate">
                      {isEn ? 'AI Solutions & Prompting' : 'KI-Lösungen & Prompting'}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 ml-1 transition-colors" />
              </a>

              <a
                href="https://johannes-wobus.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-amber-500/40 transition-all text-xs"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-200 group-hover:text-amber-300 text-[11px] truncate">
                      Johannes Wobus
                    </div>
                    <div className="text-[9px] text-slate-400 truncate">
                      {isEn ? 'Portfolio & Contact' : 'Portfolio & Kontakt'}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 ml-1 transition-colors" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer branding */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950/20 text-center text-[10px] text-slate-500 font-mono">
          <span>v2.1.0 • Built for High-Fidelity</span>
        </div>
      </aside>

      {/* AI TEMPLATE MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-2.5 text-amber-400">
                <FileJson className="w-5 h-5" />
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider">
                    {translations.modalTitle}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {translations.modalSubtitle}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowAiModal(false);
                  setImportError('');
                }}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content area */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              
              {/* Export Area */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>1. Export Template Schema</span>
                  </div>
                  <button
                    onClick={handleCopyBlueprint}
                    className="flex items-center gap-1 text-[11px] bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-2.5 py-1 rounded transition-colors"
                  >
                    {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    {copiedTemplate ? translations.exportSuccess : translations.exportBtn}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  {isEn 
                    ? 'Copy this structural prompt block, then paste it into any external AI chat (like Claude or GPT-4). Ask the AI to write your prompt setup strictly as JSON. Then, copy its JSON reply.'
                    : 'Kopiere dieses strukturierte Prompt-Template und füge es bei ChatGPT oder Claude ein. Bitte die KI, dir das fertige Setup exakt als JSON auszugeben. Kopiere anschließend die JSON-Antwort der KI.'}
                </p>
              </div>

              {/* Import Area */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-slate-300 font-bold text-xs">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>2. {translations.importLabel}</span>
                </label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder={translations.importPlaceholder}
                  className="w-full h-44 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
                
                {importError && (
                  <div className="bg-rose-950/30 border border-rose-800/50 p-3 rounded-lg text-rose-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{importError}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  setShowAiModal(false);
                  setImportError('');
                }}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-lg transition-colors"
              >
                {translations.closeBtn}
              </button>
              <button
                onClick={handleImportJson}
                disabled={!importText.trim()}
                className={`px-4 py-1.5 bg-amber-500 text-slate-950 font-black text-xs rounded-lg transition-colors flex items-center gap-1 ${
                  importText.trim() ? 'hover:bg-amber-400 opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{translations.importBtn}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
