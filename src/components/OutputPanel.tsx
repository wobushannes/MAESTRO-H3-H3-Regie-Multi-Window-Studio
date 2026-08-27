import React, { useState } from 'react';
import {
  Copy,
  Check,
  Bookmark,
  ChevronUp,
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
} from 'lucide-react';
import { PromptBuildState, PresetTemplate } from '../types';
import { PRESET_TEMPLATES } from '../data/presets';
import {
  compileCleanVisualVideoPrompt,
  compileCleanAudioVoiceoverPrompt,
  compileStudioTheatricalScript,
} from '../utils/promptCompiler';

interface OutputPanelProps {
  state: PromptBuildState;
  onCopyPrompt: (text: string) => void;
  onCopyMaestro: (text: string) => void;
  onSavePreset: () => void;
  onLoadTemplate?: (tpl: PresetTemplate) => void;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  state,
  onCopyPrompt,
  onCopyMaestro,
  onSavePreset,
  onLoadTemplate,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [formatMode, setFormatMode] = useState<'clean_video' | 'clean_audio' | 'studio_script'>('clean_video');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Localization Dictionary
  const langKey = state.language === 'en' ? 'en' : 'de';
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
      cleanVideoBanner: 'Clean-Video Filter aktiv: Alle Meta-Labels (wie "Camera:", "Lighting:") wurden als fließender Text formatiert. KI-Generatoren (Hailuo, MiniMax, Kling, Sora, Runway, Luma) lesen keine Prompt-Texte vor!',
      audioVoBanner: 'Audio & Voiceover Modus: Bietet sauberen Sprechertext und Sound-Effekt Anweisungen für ElevenLabs, Suno oder Audio-KI.',
      theatricalBanner: 'Regie-Drehbuch Modus: Strukturierter multi-shot Prompt inklusive Timestamps für professionelle Filmplanung.',
      category: 'Kategorie:',
      prev: 'Vorherige',
      next: 'Nächste',
      copied: 'Text Kopiert!',
      copyCleanVideo: 'Sauberen Video-Prompt Kopieren',
      copyAudio: 'Audio & Voiceover Kopieren',
      copyScript: 'Vollständiges Drehbuch Kopieren',
      saved: 'Gespeichert!',
      saveAsTemplate: 'Als Vorlage speichern',
      tip: 'Tipp: Kopiere den Sauberen Video-Prompt in Hailuo / MiniMax H3 / Kling / Sora / Luma, um perfekte Videos ohne vorgelesene Labels zu erhalten!'
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
      cleanVideoBanner: 'Clean Video Filter active: All meta labels (like "Camera:", "Lighting:") have been formatted as seamless flowing description text. AI Generators (Hailuo, MiniMax, Kling, Sora, Runway, Luma) will not read aloud prompt labels!',
      audioVoBanner: 'Audio & Voiceover Mode: Provides clean speaker lines and sound effects directions for ElevenLabs, Suno, or other audio generators.',
      theatricalBanner: 'Theatrical Screenplay Mode: Structured multi-shot script structure with exact time blocks for professional cinematographic planning.',
      category: 'Category:',
      prev: 'Previous',
      next: 'Next',
      copied: 'Text Copied!',
      copyCleanVideo: 'Copy Clean Video Prompt',
      copyAudio: 'Copy Audio & Voiceover',
      copyScript: 'Copy Complete Screenplay',
      saved: 'Saved!',
      saveAsTemplate: 'Save as Template',
      tip: 'Tip: Copy the Clean Video Prompt into Hailuo / MiniMax H3 / Kling / Sora / Luma to generate perfect cinematics without unneeded speech rendering!'
    }
  }[langKey];

  // Template Cycling Logic
  const currentTemplate = PRESET_TEMPLATES.find((t) => t.id === state.selectedPresetId);
  const activeCategory = currentTemplate?.category || 'horror';
  
  // Categories lookup
  const CATEGORIES = [
    { value: 'horror', label: 'Horror' },
    { value: 'sitcom', label: 'Sitcom' },
    { value: 'scify', label: 'Sci-Fi Space' },
    { value: 'bau', label: 'Bau & Handwerk' },
    { value: 'immobilien', label: 'Immobilien' },
    { value: 'restaurant', label: 'Gourmet Food' },
    { value: 'cyberpunk', label: 'Cyberpunk' },
    { value: 'fashion', label: 'Fashion / Style' },
    { value: 'action', label: 'Action & Speed' },
    { value: 'fantasy', label: 'Dark Fantasy' },
    { value: 'nature', label: 'Nature Landscapes' },
  ];

  const categoryTemplates = PRESET_TEMPLATES.filter((t) => t.category === activeCategory);
  const currentIndex = categoryTemplates.findIndex((t) => t.id === state.selectedPresetId);

  const handlePrevTemplate = () => {
    if (!onLoadTemplate || categoryTemplates.length === 0) return;
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = categoryTemplates.length - 1;
    }
    onLoadTemplate(categoryTemplates[newIndex]);
  };

  const handleNextTemplate = () => {
    if (!onLoadTemplate || categoryTemplates.length === 0) return;
    let newIndex = currentIndex + 1;
    if (newIndex >= categoryTemplates.length) {
      newIndex = 0;
    }
    onLoadTemplate(categoryTemplates[newIndex]);
  };

  const handleCategoryChange = (cat: string) => {
    if (!onLoadTemplate) return;
    const targetTemplates = PRESET_TEMPLATES.filter((t) => t.category === cat);
    if (targetTemplates.length > 0) {
      onLoadTemplate(targetTemplates[0]);
    }
  };

  const cleanVideoPrompt = compileCleanVisualVideoPrompt(state);
  const cleanAudioScript = compileCleanAudioVoiceoverPrompt(state);
  const studioScript = compileStudioTheatricalScript(state);

  const activeOutputText =
    formatMode === 'clean_video'
      ? cleanVideoPrompt
      : formatMode === 'clean_audio'
      ? cleanAudioScript
      : studioScript;

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

  return (
    <div className="fixed bottom-0 left-0 lg:left-72 right-0 z-50 p-3 sm:p-4 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl text-white transition-all">
      <div className="max-w-7xl mx-auto space-y-2.5">
        {/* Panel Header Toggle Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <Clapperboard className="w-4 h-4 text-amber-400" />
              {translations.title}
            </span>
            <span className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[9px] text-slate-300 shrink-0 font-bold uppercase">
              {state.language === 'en' ? '🇬🇧 English Active' : '🇩🇪 Deutsch Aktiv'}
            </span>

            {/* Format Toggle Pills */}
            <div className="inline-flex p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-[11px] flex-wrap gap-0.5">
              <button
                onClick={() => setFormatMode('clean_video')}
                className={`px-3 py-1 rounded-md font-extrabold transition-all flex items-center gap-1.5 ${
                  formatMode === 'clean_video'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                {translations.cleanVideo}
                <span className="hidden lg:inline-block px-1.5 py-0.2 bg-emerald-950 text-emerald-300 text-[9px] font-black rounded border border-emerald-500/40">
                  {translations.noReading}
                </span>
              </button>

              <button
                onClick={() => setFormatMode('clean_audio')}
                className={`px-3 py-1 rounded-md font-extrabold transition-all flex items-center gap-1.5 ${
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
                className={`px-3 py-1 rounded-md font-extrabold transition-all flex items-center gap-1.5 ${
                  formatMode === 'studio_script'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clapperboard className="w-3.5 h-3.5" />
                {translations.theatrical}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-bold">
            <span className="hidden sm:inline text-[11px]">
              {translations.format}: {state.aspectRatio} | {translations.duration}:{' '}
              {state.generatorMode === 'multi'
                ? `${state.windows.length * 3}s (${state.windows.length} Windows)`
                : `${state.durationSeconds}s`}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-300 hover:text-white font-extrabold flex items-center gap-1 transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="w-4 h-4" /> {translations.minimize}
                </>
              ) : (
                <>
                  <ChevronUp className="w-4 h-4" /> {translations.maximize}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Expanded Output Code Window */}
        {isExpanded && (
          <div className="space-y-3 pt-1 animate-fadeIn">
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

            {/* 🎞️ INTERACTIVE CATEGORY TEMPLATE CYCLER CONSOLE */}
            {onLoadTemplate && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/40 px-2 py-1 rounded border border-amber-900/40">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>{translations.category}</span>
                  </div>
                  <select
                    value={activeCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-slate-100 font-bold focus:outline-none focus:border-amber-500 text-xs cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>

                  <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded font-mono font-black text-[11px] shrink-0">
                    {currentIndex >= 0 ? `${currentIndex + 1} / ${categoryTemplates.length}` : `Special / ${categoryTemplates.length}`}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 w-full md:w-auto justify-between md:justify-end">
                  {currentTemplate && (
                    <div className="text-[11px] text-amber-100 font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-[240px] px-2" title={currentTemplate.title}>
                      🎬 {currentTemplate.title}
                    </div>
                  )}

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrevTemplate}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg text-slate-200 transition-colors flex items-center gap-1 border border-slate-700"
                      title={state.language === 'en' ? 'Load previous template' : 'Vorherige Vorlage dieser Kategorie laden'}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">{translations.prev}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextTemplate}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg text-slate-200 transition-colors flex items-center gap-1 border border-slate-700"
                      title={state.language === 'en' ? 'Load next template' : 'Nächste Vorlage dieser Kategorie laden'}
                    >
                      <span className="hidden sm:inline">{translations.next}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 font-mono text-xs text-amber-300 leading-relaxed max-h-44 overflow-y-auto scrollbar-thin select-all shadow-inner animate-fadeIn">
              <pre className="whitespace-pre-wrap font-mono text-amber-200">
                {activeOutputText}
              </pre>
            </div>

            {/* Actions Button Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopy}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md"
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
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl transition-colors font-bold text-xs flex items-center gap-1.5"
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
              </div>

              <div className="text-[11px] text-slate-400 font-sans hidden md:block">
                💡 {translations.tip}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
