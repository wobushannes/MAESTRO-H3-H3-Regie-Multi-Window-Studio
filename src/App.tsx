import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PromptBuilder } from './components/PromptBuilder';
import { PromptWizard } from './components/PromptWizard';
import { TemplateLibrary } from './components/TemplateLibrary';
import { ReferenceManager } from './components/ReferenceManager';
import { MaestroTimeline } from './components/MaestroTimeline';
import { GuidelinesModal } from './components/GuidelinesModal';
import { SavedPromptsModal } from './components/SavedPromptsModal';
import { OutputPanel } from './components/OutputPanel';
import { PRESET_TEMPLATES } from './data/presets';
import {
  extractEpicMovieTitle,
  getDialogueFallbackForCategory,
  getNarratorVoiceFallbackForCategory,
} from './utils/promptCompiler';
import {
  PromptBuildState,
  SavedPreset,
  PresetTemplate,
  ReferenceImage,
  MaestroWindow,
} from './types';

export default function App() {
  const [state, setState] = useState<PromptBuildState>({
    appMode: 'pro', // Default to Profimodus, user can toggle to Dialogmodus ('wizard')
    generatorMode: 'single', // User explicitly chooses 'single' or 'multi'
    rawConcept: '',
    selectedPresetId: undefined,
    cameraMotion: '',
    motionSpeed: '',
    lighting: '',
    lensStyle: '',
    atmosphere: '',
    subjectAction: '',
    audioCue: '',
    colorGrade: '',
    vfxDetails: [],
    nsfwMode: false,
    selectedNsfwKeywords: [],
    language: 'de',
    characterPersonaDescription: '',
    styleCode: 'ASTROCINEMAV01K2T',
    narratorVoice: 'Deep cinematic male narrator with gravitas',
    dialogueLines: '',
    wardrobeStyle: '',
    clothingDetails: '',
    fashionAccessories: '',
    outputFormatStyle: 'direct_prompt',
    referenceImages: [
      {
        id: 'ref-demo-1',
        label: 'Subjekt-Referenz',
        tag: 'picture 1',
        role: 'subject',
        url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
        description: 'Hauptcharakter / Subjekt Anker',
      },
    ],
    windows: [
      {
        id: 'win-1',
        windowNumber: 1,
        timeRange: '0s - 3s',
        prompt: 'Ein düsterer Raum, Kamera fährt langsam vorwärts.',
        cameraTrajectory: 'Slow Forward Dolly Push-In',
        continuityNote: 'Anfangs-Sequenz (Initial Shot)',
        motionSpeed: '24fps Normal',
        referenceImages: ['picture 1'],
      },
      {
        id: 'win-2',
        windowNumber: 2,
        timeRange: '3s - 6s',
        prompt: 'Die Kamera führt den Schwung nahtlos fort und schwenkt leicht nach rechts auf die Schattengestalt.',
        cameraTrajectory: 'Forward Glide -> Slow Pan Right',
        continuityNote: 'Nahtlose Kamera-Kontinuität aus Window 1',
        motionSpeed: '24fps Normal',
        referenceImages: ['picture 1'],
      },
    ],
    aspectRatio: '16:9',
    durationSeconds: 14,
    fps: 24,
    activeTab: 'click-builder',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Custom Templates saved in localStorage
  const [customTemplates, setCustomTemplates] = useState<PresetTemplate[]>(() => {
    try {
      const stored = localStorage.getItem('maestro_h3_custom_templates');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      return [];
    }
  });

  // Sync custom templates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maestro_h3_custom_templates', JSON.stringify(customTemplates));
    } catch (err) {
      console.error('Failed to save custom templates to localStorage', err);
    }
  }, [customTemplates]);

  // Saved Prompts list from localStorage
  const [savedList, setSavedList] = useState<SavedPreset[]>(() => {
    try {
      const stored = localStorage.getItem('maestro_h3_saved_prompts');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      return [];
    }
  });

  // Save list sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maestro_h3_saved_prompts', JSON.stringify(savedList));
    } catch (err) {
      console.error('Failed to write to localStorage', err);
    }
  }, [savedList]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Create Custom Template Handler
  const handleCreateCustomTemplate = (newTpl: PresetTemplate) => {
    setCustomTemplates((prev) => [newTpl, ...prev]);
    showToast(`✨ Neue Vorlage "${newTpl.title}" gespeichert!`);
  };

  // Delete Custom Template Handler
  const handleDeleteCustomTemplate = (id: string) => {
    setCustomTemplates((prev) => prev.filter((t) => t.id !== id));
    showToast('🗑️ Eigene Vorlage gelöscht.');
  };

  // Template select handler
  const handleSelectTemplate = (tpl: PresetTemplate) => {
    setState((prev) => ({
      ...prev,
      selectedPresetId: tpl.id,
      rawConcept: tpl.prompt,
      cameraMotion: tpl.camera,
      lighting: tpl.lighting,
      lensStyle: tpl.lens,
      motionSpeed: tpl.motionSpeed,
      audioCue: tpl.audioCue || '',
      nsfwMode: tpl.isNsfw || prev.nsfwMode,
      activeTab: 'click-builder',
      appMode: 'pro',
      movieTitle: tpl.movieTitle || extractEpicMovieTitle(tpl.title),
      dialogueLines: tpl.dialogueLines || getDialogueFallbackForCategory(tpl.category, tpl.title),
      narratorVoice: tpl.narratorVoice || getNarratorVoiceFallbackForCategory(tpl.category, tpl.title),
      styleCode: tpl.styleCode || 'ASTROCINEMAV01K2T',
      wardrobeStyle: tpl.wardrobeStyle || prev.wardrobeStyle,
      clothingDetails: tpl.clothingDetails || prev.clothingDetails,
      characterPersonaDescription: tpl.characterPersonaDescription || '',
    }));
    showToast(`🎬 "${tpl.title}" geladen + Kino-Titel & Dialoge aufgebohrt!`);
  };

  // Reference management
  const handleAddReference = (ref: ReferenceImage) => {
    setState((prev) => ({
      ...prev,
      referenceImages: [...prev.referenceImages, ref],
    }));
    showToast(`Referenzbild "${ref.label}" hinzugefügt!`);
  };

  const handleRemoveReference = (id: string) => {
    setState((prev) => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((r) => r.id !== id),
    }));
  };

  const handleSetReferencesCount = (count: number) => {
    setState((prev) => {
      let current = [...prev.referenceImages];
      if (count === 0) {
        current = [];
      } else if (count < current.length) {
        current = current.slice(0, count);
      } else if (count > current.length) {
        for (let i = current.length + 1; i <= count; i++) {
          current.push({
            id: `ref-user-${Date.now()}-${i}`,
            label: i === 1 ? 'Subjekt-Referenz' : i === 2 ? 'Stil-Referenz' : `Referenzbild ${i}`,
            tag: `picture ${i}`,
            role: i === 1 ? 'subject' : 'style',
            url: i === 1
              ? 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80'
              : 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
            description: i === 1 ? 'Hauptcharakter / Subjekt Anker' : `Referenz Bild ${i}`,
          });
        }
      }
      return { ...prev, referenceImages: current };
    });
    if (count === 1) {
      showToast('🖼️ Exakt 1 Referenzbild (picture 1) gewählt!');
    } else if (count === 0) {
      showToast('🚫 Referenzbilder deaktiviert (0 Bilder)');
    } else {
      showToast(`🖼️ ${count} Referenzbilder gewählt!`);
    }
  };

  const handleInjectTagToPrompt = (tag: string) => {
    setState((prev) => ({
      ...prev,
      rawConcept: prev.rawConcept ? `${prev.rawConcept} ${tag}` : tag,
      activeTab: 'click-builder',
      appMode: 'pro',
    }));
    showToast(`Tag ${tag} in Prompt eingefügt!`);
  };

  // Maestro Window management
  const handleAddWindow = () => {
    setState((prev) => {
      const nextNum = prev.windows.length + 1;
      const startSec = (nextNum - 1) * 3;
      const endSec = nextNum * 3;
      const newWin: MaestroWindow = {
        id: `win-${Date.now()}`,
        windowNumber: nextNum,
        timeRange: `${startSec}s - ${endSec}s`,
        prompt: `Szenen-Aktion für Window ${nextNum}`,
        cameraTrajectory: 'Nahtlose Weiterführung der Kamera-Bewegung',
        continuityNote: `Fortführung der Kinetik aus Window ${nextNum - 1}`,
        motionSpeed: '24fps Normal',
        referenceImages: [],
      };
      return {
        ...prev,
        windows: [...prev.windows, newWin],
      };
    });
  };

  const handleUpdateWindow = (id: string, updated: Partial<MaestroWindow>) => {
    setState((prev) => ({
      ...prev,
      windows: prev.windows.map((w) => (w.id === id ? { ...w, ...updated } : w)),
    }));
  };

  const handleRemoveWindow = (id: string) => {
    setState((prev) => {
      const filtered = prev.windows.filter((w) => w.id !== id);
      const reindexed = filtered.map((w, idx) => ({
        ...w,
        windowNumber: idx + 1,
      }));
      return { ...prev, windows: reindexed };
    });
  };

  // Save Preset handler
  const handleSavePreset = () => {
    const finalPromptText = state.rawConcept || 'Unbenannter Prompt';

    const newPreset: SavedPreset = {
      id: `saved-${Date.now()}`,
      title: state.rawConcept.slice(0, 30) || 'Maestro H3 Setup',
      date: new Date().toLocaleDateString('de-DE'),
      state: { ...state },
      finalPrompt: finalPromptText,
      maestroScript: state.windows
        .map(
          (w) =>
            `[WINDOW_${w.windowNumber} (${w.timeRange})]\nPrompt: ${w.prompt}\nCamera: ${w.cameraTrajectory}`
        )
        .join('\n\n'),
    };

    setSavedList((prev) => [newPreset, ...prev]);
    showToast('💾 Setup in deinen Vorlagen gespeichert!');
  };

  const handleCopyText = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    showToast(`📋 "${title}" kopiert!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col lg:flex-row">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-amber-500 text-slate-950 px-4 py-2 rounded-xl shadow-lg font-bold text-xs animate-bounce border border-amber-300">
          {toastMessage}
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar
        state={state}
        onChangeTab={(tab) => setState((prev) => ({ ...prev, activeTab: tab }))}
        onChangeAppMode={(mode) => setState((prev) => ({ ...prev, appMode: mode }))}
        onToggleNsfw={() => setState((prev) => ({ ...prev, nsfwMode: !prev.nsfwMode }))}
        onToggleLanguage={(lang) => {
          setState((prev) => ({ ...prev, language: lang }));
          showToast(lang === 'de' ? '🇩🇪 Sprache auf Deutsch umgestellt!' : '🇬🇧 Language switched to English!');
        }}
        onImportState={(newState) => setState((prev) => ({ ...prev, ...newState }))}
        onShowToast={showToast}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header (Responsive top bar) */}
        <Header
          state={state}
          onChangeTab={(tab) => setState((prev) => ({ ...prev, activeTab: tab }))}
          onChangeAppMode={(mode) => setState((prev) => ({ ...prev, appMode: mode }))}
          onToggleNsfw={() =>
            setState((prev) => ({ ...prev, nsfwMode: !prev.nsfwMode }))
          }
          onToggleLanguage={(lang) => {
            setState((prev) => ({ ...prev, language: lang }));
            showToast(lang === 'de' ? '🇩🇪 Sprache auf Deutsch umgestellt!' : '🇬🇧 Language switched to English!');
          }}
        />

        {/* Main Container */}
        <main className="max-w-7xl mx-auto px-4 py-6 w-full">
          {state.appMode === 'wizard' ? (
            /* DIALOGMODUS / WIZARD */
            <PromptWizard
              state={state}
              setState={setState}
              onSwitchToProMode={() =>
                setState((prev) => ({ ...prev, appMode: 'pro', activeTab: 'click-builder' }))
              }
              onSavePreset={handleSavePreset}
              onShowToast={showToast}
            />
          ) : (
            /* PROFIMODUS (Tabs) */
            <>
              {state.activeTab === 'click-builder' && (
                <PromptBuilder
                  state={state}
                  setState={setState}
                  onShowToast={showToast}
                />
              )}

              {state.activeTab === 'templates' && (
                <TemplateLibrary
                  customTemplates={customTemplates}
                  onCreateCustomTemplate={handleCreateCustomTemplate}
                  onDeleteCustomTemplate={handleDeleteCustomTemplate}
                  onSelectTemplate={handleSelectTemplate}
                  onCopyText={handleCopyText}
                  nsfwMode={state.nsfwMode}
                  builtInTemplates={PRESET_TEMPLATES}
                  language={state.language}
                />
              )}

              {state.activeTab === 'references' && (
                <ReferenceManager
                  references={state.referenceImages}
                  onAddReference={handleAddReference}
                  onRemoveReference={handleRemoveReference}
                  onInjectTagToPrompt={handleInjectTagToPrompt}
                  onSetReferencesCount={handleSetReferencesCount}
                  language={state.language}
                />
              )}

              {state.activeTab === 'maestro-windows' && (
                <MaestroTimeline
                  windows={state.windows}
                  onAddWindow={handleAddWindow}
                  onUpdateWindow={handleUpdateWindow}
                  onRemoveWindow={handleRemoveWindow}
                  onCopyScript={(script) => handleCopyText(script, 'Maestro Script')}
                  availableReferences={state.referenceImages}
                  rawConcept={state.rawConcept}
                  language={state.language}
                />
              )}

              {state.activeTab === 'guidelines' && (
                <GuidelinesModal language={state.language} />
              )}

              {state.activeTab === 'saved' && (
                <SavedPromptsModal
                  savedList={savedList}
                  onLoadSaved={(saved) => {
                    setState(saved.state);
                    showToast(state.language === 'en' ? `Preset "${saved.title}" loaded!` : `Vorlage "${saved.title}" geladen!`);
                  }}
                  onRemoveSaved={(id) =>
                    setSavedList((prev) => prev.filter((s) => s.id !== id))
                  }
                  onImportList={(imported) => {
                    setSavedList((prev) => [...imported, ...prev]);
                    showToast(state.language === 'en' ? `${imported.length} presets imported!` : `${imported.length} Vorlagen importiert!`);
                  }}
                  onCopyText={handleCopyText}
                  language={state.language}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Sticky Bottom Output Bar */}
      <OutputPanel
        state={state}
        onCopyPrompt={(text) => handleCopyText(text, 'MiniMax H3 Prompt')}
        onCopyMaestro={(text) => handleCopyText(text, 'Maestro Script')}
        onSavePreset={handleSavePreset}
        onLoadTemplate={handleSelectTemplate}
      />
    </div>
  );
}
