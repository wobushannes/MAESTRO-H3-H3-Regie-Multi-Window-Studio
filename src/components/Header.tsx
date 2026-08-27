import React from 'react';
import {
  Video,
  Film,
  Sparkles,
  BookOpen,
  Bookmark,
  Image as ImageIcon,
  Flame,
  ShieldAlert,
  Layers,
  SlidersHorizontal,
  Bot,
} from 'lucide-react';
import { PromptBuildState } from '../types';

interface HeaderProps {
  state: PromptBuildState;
  onChangeTab: (tab: PromptBuildState['activeTab']) => void;
  onChangeAppMode: (mode: PromptBuildState['appMode']) => void;
  onToggleNsfw: () => void;
  onToggleLanguage: (lang: 'de' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onChangeTab,
  onChangeAppMode,
  onToggleNsfw,
  onToggleLanguage,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 px-4 py-3 shadow-xs lg:hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Engine Badge */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Video className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg tracking-tight text-slate-900 font-mono">
                  MAESTRO <span className="text-amber-600">H3</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded-full uppercase tracking-wider">
                  MiniMax H3 / Hailuo
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Zentrales Videoprompting & Multi-Window Studio
              </p>
            </div>
          </div>

          {/* Mode Switcher Toggle (Profi vs Wizard) */}
          <div className="p-1 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-1">
            <button
              onClick={() => onChangeAppMode('pro')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                state.appMode === 'pro'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Direkter Vollzugriff auf alle Regler, Klick-Grid und Multi-Window Editor"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Profimodus</span>
            </button>

            <button
              onClick={() => onChangeAppMode('wizard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                state.appMode === 'wizard'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Geführter Assistent führt dich Schritt für Schritt zum Prompt"
            >
              <Bot className="w-3.5 h-3.5 text-slate-900" />
              <span>Dialogmodus</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (For Profi mode) */}
        {state.appMode === 'pro' && (
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/90 w-full md:w-auto overflow-x-auto scrollbar-none">
            <button
              onClick={() => onChangeTab('click-builder')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                state.activeTab === 'click-builder'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Klick-Builder
            </button>

            <button
              onClick={() => onChangeTab('templates')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                state.activeTab === 'templates'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              Vorlagen ({PRESET_COUNT_BADGE})
            </button>

            <button
              onClick={() => onChangeTab('references')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap relative ${
                state.activeTab === 'references'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Referenzbilder
              {state.referenceImages.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {state.referenceImages.length}
                </span>
              )}
            </button>

            <button
              onClick={() => onChangeTab('maestro-windows')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                state.activeTab === 'maestro-windows'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Maestro Windows ({state.windows.length})
            </button>

            <button
              onClick={() => onChangeTab('guidelines')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                state.activeTab === 'guidelines'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Guidelines
            </button>

            <button
              onClick={() => onChangeTab('saved')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                state.activeTab === 'saved'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Gespeichert
            </button>
          </nav>
        )}

        {/* Desktop Controls (NSFW & Language Switcher) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-0.5">
            <button
              onClick={() => onToggleLanguage('de')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-black transition-all ${
                state.language === 'de'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Bedienoberfläche auf Deutsch schalten"
            >
              <span>🇩🇪</span>
              <span className="text-[10px]">DE</span>
            </button>
            <button
              onClick={() => onToggleLanguage('en')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-black transition-all ${
                state.language === 'en'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Switch interface to English"
            >
              <span>🇬🇧</span>
              <span className="text-[10px]">EN</span>
            </button>
          </div>

          <button
            onClick={onToggleNsfw}
            title="Schaltet erweiterte Horror, Gore & Uncensored Schlüsselwörter frei"
            className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-xl font-bold border transition-all ${
              state.nsfwMode
                ? 'bg-rose-50 text-rose-900 border-rose-300 shadow-sm'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${state.nsfwMode ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
            <span>NSFW & Edge</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                state.nsfwMode ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {state.nsfwMode ? 'AKTIV' : 'AUS'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

const PRESET_COUNT_BADGE = '15+';
