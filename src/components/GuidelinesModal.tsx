import React, { useState } from 'react';
import { BookOpen, ShieldAlert, Sparkles, Layers, Flame, Check, Copy } from 'lucide-react';
import { PROMPTING_GUIDELINES } from '../data/guidelines';

interface GuidelinesProps {
  language?: 'de' | 'en';
}

export const GuidelinesModal: React.FC<GuidelinesProps> = ({ language = 'de' }) => {
  const [activeSection, setActiveSection] = useState<'minimax' | 'windows' | 'nsfw'>('minimax');
  const [copiedCode, setCopiedCode] = useState(false);

  const isEn = language === 'en';

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Localized data
  const translations = {
    title: isEn ? 'Complete MiniMax H3 & Maestro Guidelines' : 'Komplettes MiniMax H3 & Maestro Regelwerk',
    subtitle: isEn 
      ? 'Comprehensive rules for video prompting, Maestro multi-window stitching, and safe NSFW edge phrasing.'
      : 'Umfangreiches Regelwerk für Videoprompting, Maestro Multi-Window Stitching & NSFW/Gore-Filter-Strategien.',
    tabMinimax: isEn ? 'MiniMax H3 Formula' : 'MiniMax H3 Formel',
    tabMaestro: isEn ? 'Maestro Window Logic' : 'Maestro Window-Logik',
    tabNsfw: isEn ? 'NSFW & Edge Phrasing' : 'NSFW & Edge Phrasing',
    exampleLabel: isEn ? 'EXAMPLE MAESTRO MULTI-WINDOW SCRIPT' : 'BEISPIEL MAESTRO MULTI-WINDOW SCRIPT',
    copyLabel: isEn ? 'Copy Script' : 'Code Kopieren',
    copiedLabel: isEn ? 'Copied' : 'Kopiert',
    bypassTableLabel: isEn ? 'Keyword Transformation Table (Filter Bypass)' : 'Schlüsselwort-Transformationstabelle (Filter-Bypass)',
    bypassTipsLabel: isEn ? 'Pro tips for unfiltered MiniMax H3 outputs:' : 'Pro-Tipps für ungefilterten MiniMax H3 Output:',
  };

  // MiniMax Section Translated Data
  const minimaxRules = isEn ? [
    {
      title: 'Concrete Physics & Verbs over Buzzwords',
      description: 'Avoid vague phrases like "hyperrealistic, 8k, photorealistic". Instead, describe real optical qualities: "Anamorphic lens flare, sharp focus on iris, visible pores, natural 24fps motion blur, volumetric dust motes".',
    },
    {
      title: 'Explicitly Control Camera Trajectories',
      description: 'MiniMax H3 responds extremely precisely to directional camera instructions. Use expert terms: "Slow dolly push-in", "Gimbal walkthrough", "360-degree orbit", "Low-angle crane sweep", "Macro 90mm focus".',
    },
    {
      title: 'Name Light Sources & Material Reactions',
      description: 'Always declare where your lighting comes from: "Warm sunset rays piercing window blinds", "Chiaroscuro shadows", "Spark reflections on wet polished concrete".',
    },
    {
      title: 'Reference Image Tags ([IMAGE_1], [START_FRAME])',
      description: 'When using reference images, place tags right where they apply, e.g., "[IMAGE_1: Subject] walks into the room defined in [IMAGE_2: Style]".',
    }
  ] : PROMPTING_GUIDELINES.minimaxOverview.rules;

  // Maestro Section Translated Data
  const maestroPrinciples = isEn ? [
    {
      title: 'Seamless Camera Trajectory Continuity',
      description: 'If Window 1 ends with a rightward camera rotation, Window 2 should declare: "Seamless camera continuation from Window 1, maintaining rightward arc momentum".',
    },
    {
      title: 'Character & Environment Persistence',
      description: 'Keep clothing, lighting keys, and facial features identical across all Windows to prevent Maestro from rendering morphing artifacts.',
    },
    {
      title: 'Maestro Cut & Stitch Techniques',
      description: 'Incorporate terms like "Match Cut", "Whip Pan Transition", or "Dolly Zoom Transition" at window borders for organic shifts.',
    }
  ] : PROMPTING_GUIDELINES.maestroWindows.principles;

  // NSFW Section Translated Data
  const nsfwStrategies = isEn ? [
    {
      concept: 'Horror & Gore / Body Horror',
      directWord: 'Blood, guts, dismember limbs',
      cinematicBypass: 'visceral dark crimson patina, wet glistening anatomical textures, gothic blood-tinted reflections, dramatic body-horror mutation, macabre aesthetic',
    },
    {
      concept: 'Sensuality & Romance',
      directWord: 'Nudity, explicit scenes',
      cinematicBypass: 'seductive silhouetted contours, intimate skin sheen highlights, sensual dark romance aesthetic, elegant shadow play across shoulders',
    },
    {
      concept: 'Dystopian Combat & Grittiness',
      directWord: 'Extreme violence, massacre',
      cinematicBypass: 'unfiltered visceral combat patina, chaotic battle dust, raw gritty apocalyptic energy, intense dark-fantasy confrontation',
    }
  ] : PROMPTING_GUIDELINES.nsfwGuidelines.strategies;

  const nsfwTips = isEn ? [
    'Always ground the prompt in contexts of fine art, dark gothic styles, or cinema ("gothic dark fantasy art", "cinematic chiaroscuro").',
    'Avoid isolated visceral words; prioritize lighting and materials ("glistening damp surface", "iridescent dark fluid").',
    'If MiniMax returns a filter block, swap your main physical action verb for an artistic textural description.',
  ] : PROMPTING_GUIDELINES.nsfwGuidelines.tips;

  return (
    <div className="space-y-6 pb-28">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            {translations.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {translations.subtitle}
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full md:w-auto">
          <button
            onClick={() => setActiveSection('minimax')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSection === 'minimax'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {translations.tabMinimax}
          </button>
          <button
            onClick={() => setActiveSection('windows')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSection === 'windows'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            {translations.tabMaestro}
          </button>
          <button
            onClick={() => setActiveSection('nsfw')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeSection === 'nsfw'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-700 hover:text-rose-900'
            }`}
          >
            {translations.tabNsfw}
          </button>
        </div>
      </div>

      {/* SECTION 1: MINIMAX H3 PROMPTING FORMULA */}
      {activeSection === 'minimax' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                {isEn ? 'MiniMax H3 Prompt Formula Overview' : PROMPTING_GUIDELINES.minimaxOverview.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {isEn ? 'The key to generating stable, physically believable high-fidelity sequences:' : PROMPTING_GUIDELINES.minimaxOverview.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {minimaxRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1.5"
                >
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    {rule.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: MAESTRO WINDOW LOGIC */}
      {activeSection === 'windows' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                {isEn ? 'Maestro Timeline Stitching System' : PROMPTING_GUIDELINES.maestroWindows.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {isEn ? 'How to configure sequential time ranges into a unified output:' : PROMPTING_GUIDELINES.maestroWindows.subtitle}
              </p>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-medium">
              {isEn 
                ? 'Maestro sequences group multiple time blocks (Windows) into one continuous camera path. Each Window configures its specific action prompt (e.g. Window 1: 0-3s, Window 2: 3-6s, Window 3: 6-9s).'
                : PROMPTING_GUIDELINES.maestroWindows.explanation}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {maestroPrinciples.map((p, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
                  <h4 className="font-bold text-xs text-slate-900">{p.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{p.description}</p>
                </div>
              ))}
            </div>

            {/* Script Example */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>{translations.exampleLabel}</span>
                <button
                  onClick={() => handleCopy(PROMPTING_GUIDELINES.maestroWindows.exampleScript)}
                  className="flex items-center gap-1 text-amber-700 hover:text-amber-800 font-bold"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCode ? translations.copiedLabel : translations.copyLabel}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-800 bg-slate-900 text-amber-300 p-4 rounded-xl border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {PROMPTING_GUIDELINES.maestroWindows.exampleScript}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: NSFW & EDGE PHRASING STRATEGY */}
      {activeSection === 'nsfw' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="border-b border-rose-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-rose-950 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-600 animate-pulse" />
                  {isEn ? 'Filter Bypass Edge Phrasing Strategy' : PROMPTING_GUIDELINES.nsfwGuidelines.title}
                </h3>
                <p className="text-xs text-rose-800 mt-0.5 font-medium">
                  {isEn ? 'How to express complex horror or intimate scenes reliably:' : PROMPTING_GUIDELINES.nsfwGuidelines.subtitle}
                </p>
              </div>
              <span className="px-2.5 py-1 bg-rose-600 text-white text-xs font-mono font-bold rounded-lg shadow-xs">
                EDGE PHRASING
              </span>
            </div>

            <p className="text-xs text-slate-800 leading-relaxed bg-white p-3.5 rounded-xl border border-rose-200 font-medium">
              {isEn 
                ? 'MiniMax H3 incorporates guardrail filters. By describing actions via texture focus, lighting contrast, and architectural materials, you can fully represent intense thematic states safely.'
                : PROMPTING_GUIDELINES.nsfwGuidelines.intro}
            </p>

            {/* Comparison Table */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-xs text-rose-950">
                {translations.bypassTableLabel}
              </h4>
              <div className="space-y-2">
                {nsfwStrategies.map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-rose-200 rounded-xl p-3.5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs"
                  >
                    <div className="font-bold text-slate-900">{s.concept}</div>
                    <div className="text-rose-600 font-mono line-through font-bold">
                      ⛔ {s.directWord}
                    </div>
                    <div className="text-emerald-700 font-mono font-bold">
                      ✅ {s.cinematicBypass}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips List */}
            <div className="bg-white p-4 rounded-xl border border-rose-200 space-y-2">
              <h4 className="font-extrabold text-xs text-rose-950">
                {translations.bypassTipsLabel}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                {nsfwTips.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
