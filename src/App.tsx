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
import { AnalogEngineView } from './components/AnalogEngineView';
import { CommercialsView } from './components/CommercialsView';
import { OutputPanel } from './components/OutputPanel';
import { PRESET_TEMPLATES } from './data/presets';
import {
  extractEpicMovieTitle,
  getDialogueFallbackForCategory,
  getNarratorVoiceFallbackForCategory,
  getCategoryDefaultSoundscape,
  generateExtrapolatedWindowsForTemplate,
  formatPrecisionTimeRange,
  getCategoryDefaultReferences,
} from './utils/promptCompiler';
import {
  PromptBuildState,
  SavedPreset,
  PresetTemplate,
  ReferenceImage,
  MaestroWindow,
} from './types';
import { getCategoryPovDefaults, enforceCategoryPovKinetics } from './utils/povCategoryDefaults';
import { getCategoryCommercialDefaults, getCommercialPresetForCategoryOrTitle } from './utils/commercialMasterEngine';
import {
  loadCustomTemplatesFromStorage,
  saveCustomTemplatesToStorage,
  loadSavedPromptsFromStorage,
  saveSavedPromptsToStorage,
} from './utils/templateStorage';

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
    voiceoverEnabled: false,
    wardrobeStyle: '',
    clothingDetails: '',
    fashionAccessories: '',
    outputFormatStyle: 'direct_prompt',
    isImmersivePov: false,
    povFootsteps: 'walking_bob',
    povBreathVapor: 'cold_vapor',
    povInteractiveHands: 'holding_equipment',
    povWeatherImmersion: 'frost_lens_droplets',
    povVisceralAudio: false,
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
        timeRange: '00:00.000–00:14.000',
        prompt: 'Ein düsterer Raum, Kamera fährt langsam vorwärts.',
        cameraTrajectory: 'Slow Forward Dolly Push-In',
        continuityNote: 'Anfangs-Sequenz (Initial Shot)',
        motionSpeed: '24fps Normal',
        referenceImages: ['picture 1'],
      },
      {
        id: 'win-2',
        windowNumber: 2,
        timeRange: '00:14.000–00:28.000',
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

  // Custom Templates saved in localStorage via JSON storage utility
  const [customTemplates, setCustomTemplates] = useState<PresetTemplate[]>(() => {
    return loadCustomTemplatesFromStorage();
  });

  // Sync custom templates to localStorage
  useEffect(() => {
    saveCustomTemplatesToStorage(customTemplates);
  }, [customTemplates]);

  // Saved Prompts list from localStorage
  const [savedList, setSavedList] = useState<SavedPreset[]>(() => {
    return loadSavedPromptsFromStorage();
  });

  // Save list sync to localStorage
  useEffect(() => {
    saveSavedPromptsToStorage(savedList);
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
    const matchedCommPreset = getCommercialPresetForCategoryOrTitle(tpl.category, tpl.title);
    const commDefaults = getCategoryCommercialDefaults(tpl.category);

    const commBrand = tpl.commercialBrandName || matchedCommPreset?.defaultBrand || commDefaults.brandName;
    const commClaim = tpl.commercialClaim || matchedCommPreset?.defaultClaim || commDefaults.claim;
    const commCta = tpl.commercialCallToAction || matchedCommPreset?.defaultCta || commDefaults.callToAction;
    const commSpatial = tpl.spatialTextContent || matchedCommPreset?.defaultSpatialText || commDefaults.spatialText;

    setState((prev) => {
      // POV is always OFF by default unless user explicitly turned it ON
      const isPov = prev.isImmersivePov || false;
      const catDefaults = getCategoryPovDefaults(tpl.category, tpl.title);

      let newState: PromptBuildState = {
        ...prev,
        selectedPresetId: tpl.id,
        rawConcept: tpl.prompt,
        cameraMotion: tpl.camera,
        lighting: tpl.lighting,
        lensStyle: tpl.lens,
        motionSpeed: tpl.motionSpeed,
        audioCue: tpl.audioCue || getCategoryDefaultSoundscape(tpl.category),
        nsfwMode: tpl.isNsfw || prev.nsfwMode,
        activeTab: 'click-builder',
        generatorMode: 'single',
        windows: [],
        appMode: 'pro',
        movieTitle: tpl.movieTitle || extractEpicMovieTitle(tpl.title),
        dialogueLines: tpl.dialogueLines || getDialogueFallbackForCategory(tpl.category, tpl.title),
        narratorVoice: tpl.narratorVoice || getNarratorVoiceFallbackForCategory(tpl.category, tpl.title),
        voiceoverEnabled: true,
        styleCode: tpl.styleCode || 'ASTROCINEMAV01K2T',
        wardrobeStyle: tpl.wardrobeStyle || prev.wardrobeStyle,
        clothingDetails: tpl.clothingDetails || prev.clothingDetails,
        characterPersonaDescription: tpl.characterPersonaDescription || '',
        isImmersivePov: isPov,
        category: tpl.category,
        personCount: tpl.personCount || '1_person',
        referenceImages: getCategoryDefaultReferences(tpl.category, tpl.personCount || '1_person'),
        povKineticProfile: tpl.povKineticProfile || catDefaults.kineticProfile,
        povVerticalDisplacement: tpl.povVerticalDisplacement || catDefaults.verticalDisplacement,
        povRigType: (tpl.povRigType as any) || catDefaults.povRigType,
        povFootsteps: (tpl.povFootsteps as any) || catDefaults.povFootsteps,
        povBreathVapor: (tpl.povBreathVapor as any) || catDefaults.povBreathVapor,
        povInteractiveHands: (tpl.povInteractiveHands as any) || catDefaults.povInteractiveHands,
        povWeatherImmersion: (tpl.povWeatherImmersion as any) || catDefaults.povWeatherImmersion,
        povVisceralAudio: tpl.povVisceralAudio !== undefined ? tpl.povVisceralAudio : catDefaults.povVisceralAudio,
        // Auto-load commercial brand & claim / slogans when loading ANY template or preset
        commercialPresetId: tpl.commercialPresetId || matchedCommPreset?.id || `comm-auto-${tpl.category}`,
        commercialBrandName: commBrand,
        commercialClaim: commClaim,
        commercialCallToAction: commCta,
        spatialTextOverlayEnabled: true,
        spatialTextContent: commSpatial,
        analogPresetId: tpl.analogPresetId || matchedCommPreset?.analogPresetId || prev.analogPresetId,
      };

      if (isPov) {
        newState = enforceCategoryPovKinetics(newState, tpl.category, true);
      }

      return newState;
    });

    showToast(`🎬 "${tpl.title}" geladen + Marke "${commBrand}" & Slogan aktiviert!`);
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
      const newWin: MaestroWindow = {
        id: `win-${Date.now()}`,
        windowNumber: nextNum,
        timeRange: formatPrecisionTimeRange(nextNum, 14),
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
        <main className="max-w-7xl mx-auto px-4 py-6 pb-64 w-full">
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
                  onUpdateCustomTemplates={setCustomTemplates}
                  onSelectTemplate={handleSelectTemplate}
                  onCopyText={handleCopyText}
                  nsfwMode={state.nsfwMode}
                  builtInTemplates={PRESET_TEMPLATES}
                  language={state.language}
                />
              )}

              {state.activeTab === 'analog-engine' && (
                <AnalogEngineView
                  state={state}
                  onUpdateState={setState}
                  onShowToast={showToast}
                />
              )}

              {state.activeTab === 'commercial-ads' && (
                <CommercialsView
                  state={state}
                  onUpdateState={setState}
                  onShowToast={showToast}
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
                  onUpdateSavedItem={(updated) => {
                    setSavedList((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
                    showToast(state.language === 'en' ? 'Commercial details updated!' : 'Vorlagen-Details aktualisiert!');
                  }}
                  onPublishToCustomTemplate={(newTpl) => {
                    handleCreateCustomTemplate(newTpl);
                    showToast(state.language === 'en' ? 'Published to Template Library!' : 'In Vorlagen-Bibliothek veröffentlicht!');
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
        onUpdateState={setState}
        onShowToast={showToast}
      />
    </div>
  );
}
