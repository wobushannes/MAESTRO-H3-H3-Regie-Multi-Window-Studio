import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  FileJson,
  Download,
  Upload,
  Database,
  CheckCircle2,
  AlertCircle,
  X,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Layers,
  Sparkles,
  ShieldCheck,
  Search,
  ArrowRight,
  HardDrive,
  FileCode,
  Sliders,
  CheckSquare,
  Square,
  Gift,
  Flame,
  Home,
  Tv,
  Rocket,
  Building,
  Utensils,
  Shirt,
  Heart,
  Zap,
  Trees,
  Wand2,
  Crosshair,
  Landmark,
  Plane,
  Eye,
  Bookmark,
} from 'lucide-react';
import { PresetTemplate, StyleCategory } from '../types';
import {
  createTemplateLibraryPackage,
  parseTemplatesJSON,
  mergeTemplatesList,
  triggerJSONDownload,
  getStorageMetrics,
  ImportMergeStrategy,
  ALL_STYLE_CATEGORIES,
} from '../utils/templateStorage';

interface TemplateBackupManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customTemplates: PresetTemplate[];
  builtInTemplates: PresetTemplate[];
  onUpdateCustomTemplates: (templates: PresetTemplate[]) => void;
  onShowToast: (msg: string) => void;
  language?: 'de' | 'en';
}

type TabType = 'export' | 'import' | 'manage';
type ExportScope = 'custom_only' | 'all_complete' | 'by_category';

export const TemplateBackupManagerModal: React.FC<TemplateBackupManagerModalProps> = ({
  isOpen,
  onClose,
  customTemplates,
  builtInTemplates,
  onUpdateCustomTemplates,
  onShowToast,
  language = 'de',
}) => {
  const isEn = language === 'en';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<TabType>('export');
  const [copiedCode, setCopiedCode] = useState(false);

  // ==================== EXPORT STATE ====================
  const [exportScope, setExportScope] = useState<ExportScope>('custom_only');
  const [selectedExportCategories, setSelectedExportCategories] = useState<StyleCategory[]>([
    'birthday',
    'immobilien',
    'erotik',
    'horror',
  ]);
  const [wrapInPackage, setWrapInPackage] = useState(true);
  const [customFilename, setCustomFilename] = useState('');

  // ==================== IMPORT STATE ====================
  const [rawImportJson, setRawImportJson] = useState('');
  const [importStrategy, setImportStrategy] = useState<ImportMergeStrategy>('merge_keep_existing');
  const [isDragOver, setIsDragOver] = useState(false);
  const [analyzedImport, setAnalyzedImport] = useState<{
    tested: boolean;
    valid: boolean;
    templates: PresetTemplate[];
    error?: string;
    categories: StyleCategory[];
    invalidCount: number;
  }>({
    tested: false,
    valid: false,
    templates: [],
    categories: [],
    invalidCount: 0,
  });

  // ==================== MANAGE STATE ====================
  const [manageSearch, setManageSearch] = useState('');
  const [viewingTemplateJson, setViewingTemplateJson] = useState<PresetTemplate | null>(null);
  const [storageMetrics, setStorageMetrics] = useState(getStorageMetrics());

  // Refresh metrics when customTemplates changes
  useEffect(() => {
    setStorageMetrics(getStorageMetrics());
  }, [customTemplates, isOpen]);

  const allCombinedTemplates = useMemo(() => {
    return [...customTemplates, ...builtInTemplates];
  }, [customTemplates, builtInTemplates]);

  // Determine export list
  const templatesToExport = useMemo(() => {
    if (exportScope === 'custom_only') {
      return customTemplates;
    }
    if (exportScope === 'all_complete') {
      return allCombinedTemplates;
    }
    if (exportScope === 'by_category') {
      return allCombinedTemplates.filter((t) => selectedExportCategories.includes(t.category));
    }
    return customTemplates;
  }, [exportScope, customTemplates, allCombinedTemplates, selectedExportCategories]);

  // Formatted JSON string for export
  const exportJsonString = useMemo(() => {
    if (wrapInPackage) {
      const pkg = createTemplateLibraryPackage(
        templatesToExport,
        isEn
          ? `MAESTRO H3 Template Library Export (${templatesToExport.length} items)`
          : `MAESTRO H3 Vorlagen-Bibliothek Export (${templatesToExport.length} Vorlagen)`
      );
      return JSON.stringify(pkg, null, 2);
    }
    return JSON.stringify(templatesToExport, null, 2);
  }, [templatesToExport, wrapInPackage, isEn]);

  if (!isOpen) return null;

  // Category Icon Mapper
  const getCategoryIcon = (cat: StyleCategory) => {
    switch (cat) {
      case 'birthday':
        return Gift;
      case 'horror':
        return Flame;
      case 'immobilien':
        return Home;
      case 'sitcom':
        return Tv;
      case 'scify':
        return Rocket;
      case 'bau':
        return Building;
      case 'restaurant':
        return Utensils;
      case 'fashion':
        return Shirt;
      case 'erotik':
        return Heart;
      case 'action':
        return Zap;
      case 'nature':
        return Trees;
      case 'fantasy':
        return Wand2;
      case 'war':
        return Crosshair;
      case 'politics':
        return Landmark;
      case 'travel':
        return Plane;
      case 'immersive':
        return Eye;
      default:
        return Bookmark;
    }
  };

  // Trigger download handler
  const handleDownloadExport = () => {
    if (templatesToExport.length === 0) {
      onShowToast(isEn ? '⚠️ No templates to export.' : '⚠️ Keine Vorlagen zum Exportieren ausgewählt.');
      return;
    }

    const defaultName =
      exportScope === 'custom_only'
        ? `maestro_custom_templates_${new Date().toISOString().slice(0, 10)}.json`
        : exportScope === 'all_complete'
        ? `maestro_complete_library_${new Date().toISOString().slice(0, 10)}.json`
        : `maestro_${selectedExportCategories.join('_')}_templates_${new Date().toISOString().slice(0, 10)}.json`;

    const finalName = customFilename.trim() ? customFilename.trim() : defaultName;
    triggerJSONDownload(finalName, exportJsonString);
    onShowToast(
      isEn
        ? `📦 Successfully exported ${templatesToExport.length} template(s)!`
        : `📦 ${templatesToExport.length} Vorlage(n) erfolgreich exportiert!`
    );
  };

  // Copy JSON handler
  const handleCopyExportJson = () => {
    navigator.clipboard.writeText(exportJsonString);
    setCopiedCode(true);
    onShowToast(isEn ? '📋 Template JSON copied to clipboard!' : '📋 Vorlagen-JSON in die Zwischenablage kopiert!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Analyze pasted/uploaded JSON
  const handleAnalyzeJson = (text: string) => {
    setRawImportJson(text);
    if (!text.trim()) {
      setAnalyzedImport({
        tested: false,
        valid: false,
        templates: [],
        categories: [],
        invalidCount: 0,
      });
      return;
    }

    const parsed = parseTemplatesJSON(text);
    if (parsed.success) {
      const cats = Array.from(new Set(parsed.templates.map((t) => t.category))) as StyleCategory[];
      setAnalyzedImport({
        tested: true,
        valid: true,
        templates: parsed.templates,
        categories: cats,
        invalidCount: parsed.invalidCount,
      });
    } else {
      setAnalyzedImport({
        tested: true,
        valid: false,
        templates: [],
        error: parsed.error,
        categories: [],
        invalidCount: parsed.invalidCount,
      });
    }
  };

  // File upload reader
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleAnalyzeJson(content);
    };
    reader.readAsText(file);
  };

  // Commit Import
  const handleCommitImport = () => {
    if (!analyzedImport.valid || analyzedImport.templates.length === 0) {
      onShowToast(isEn ? '❌ Please provide valid JSON first.' : '❌ Bitte zuerst ein gültiges JSON bereitstellen.');
      return;
    }

    const { result, addedCount, updatedCount } = mergeTemplatesList(
      customTemplates,
      analyzedImport.templates,
      importStrategy
    );

    onUpdateCustomTemplates(result);

    const message = isEn
      ? `✅ Import complete: ${addedCount} added, ${updatedCount} updated. Total custom templates: ${result.length}`
      : `✅ Import abgeschlossen: ${addedCount} hinzugefügt, ${updatedCount} aktualisiert. Eigene Vorlagen: ${result.length}`;

    onShowToast(message);
    setRawImportJson('');
    setAnalyzedImport({
      tested: false,
      valid: false,
      templates: [],
      categories: [],
      invalidCount: 0,
    });
    setActiveTab('manage');
  };

  // Toggle category in export filter
  const toggleExportCategory = (cat: StyleCategory) => {
    setSelectedExportCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const selectAllCategories = () => {
    setSelectedExportCategories(ALL_STYLE_CATEGORIES);
  };

  const clearAllCategories = () => {
    setSelectedExportCategories([]);
  };

  // Filter custom templates in Manage tab
  const filteredCustomTemplates = useMemo(() => {
    if (!manageSearch.trim()) return customTemplates;
    const q = manageSearch.toLowerCase().trim();
    return customTemplates.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.prompt.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [customTemplates, manageSearch]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative my-auto overflow-hidden">
        {/* ================= MODAL HEADER ================= */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Database className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {isEn ? 'Template Library JSON Hub' : 'Zentrales Vorlagen-JSON Modul'}
                </h2>
                <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-wider">
                  Backup & Restore
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {isEn
                  ? 'Independent local storage manager: export complete libraries or custom presets as pure JSON, import backups with zero state conflict, and inspect schemas.'
                  : 'Unabhängige JSON-Sicherungszentrale: Sichere deine Vorlagen lokal ab, stelle Backups verlustfrei wieder her und verwalte die JSON-Bibliothek unabhängig vom aktuellen Arbeitsbereich.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title={isEn ? 'Close modal' : 'Schließen'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= METRICS BAR & NAVIGATION TABS ================= */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'export'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-300/60'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isEn ? 'Export & Backup' : 'Bibliothek sichern (Export)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('import')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'import'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-300/60'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isEn ? 'Import & Restore' : 'Bibliothek laden (Import)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('manage')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTab === 'manage'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-300/60'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>{isEn ? 'Library Storage' : 'Speicher & Verwaltung'}</span>
              <span className="ml-0.5 px-1.5 py-0.2 bg-slate-900 text-amber-300 text-[10px] rounded-full font-mono font-bold">
                {customTemplates.length}
              </span>
            </button>
          </div>

          {/* Quick Storage Stats */}
          <div className="flex items-center gap-3 text-[11px] text-slate-600 font-mono font-semibold">
            <span className="flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5 text-amber-600" />
              <span>{customTemplates.length} {isEn ? 'Custom JSONs' : 'Eigene'}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>{allCombinedTemplates.length} {isEn ? 'Total' : 'Gesamt'}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="px-2 py-0.5 bg-white border border-slate-300 rounded-md text-slate-700 font-bold">
              💾 {storageMetrics.totalKb} KB
            </span>
          </div>
        </div>

        {/* ================= TAB CONTENT BODY ================= */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* ============================================================== */}
          {/* TAB 1: EXPORT / BACKUP */}
          {/* ============================================================== */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              {/* Scope Selection Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  {isEn ? '1. Select Export Scope' : '1. Export-Umfang auswählen'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Option 1: Custom only */}
                  <label
                    className={`flex flex-col justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      exportScope === 'custom_only'
                        ? 'bg-amber-50/70 border-amber-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="radio"
                        name="exportScope"
                        checked={exportScope === 'custom_only'}
                        onChange={() => setExportScope('custom_only')}
                        className="mt-0.5 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <div className="font-bold text-xs text-slate-900">
                          {isEn ? 'My Custom Templates' : 'Nur eigene Vorlagen'}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {isEn
                            ? 'Exports your user-created JSON templates.'
                            : 'Sichert alle selbst erstellten und importierten Vorlagen.'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-600">
                      <span>{isEn ? 'Count:' : 'Anzahl:'}</span>
                      <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        {customTemplates.length} Vorlagen
                      </span>
                    </div>
                  </label>

                  {/* Option 2: Full library */}
                  <label
                    className={`flex flex-col justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      exportScope === 'all_complete'
                        ? 'bg-amber-50/70 border-amber-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="radio"
                        name="exportScope"
                        checked={exportScope === 'all_complete'}
                        onChange={() => setExportScope('all_complete')}
                        className="mt-0.5 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <div className="font-bold text-xs text-slate-900">
                          {isEn ? 'Complete Library' : 'Vollständige Bibliothek'}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {isEn
                            ? 'All built-in presets + all custom templates.'
                            : 'Alle Master-Presets + alle eigenen Vorlagen im Paket.'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-600">
                      <span>{isEn ? 'Count:' : 'Anzahl:'}</span>
                      <span className="font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        {allCombinedTemplates.length} Vorlagen
                      </span>
                    </div>
                  </label>

                  {/* Option 3: By category */}
                  <label
                    className={`flex flex-col justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      exportScope === 'by_category'
                        ? 'bg-amber-50/70 border-amber-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="radio"
                        name="exportScope"
                        checked={exportScope === 'by_category'}
                        onChange={() => setExportScope('by_category')}
                        className="mt-0.5 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <div className="font-bold text-xs text-slate-900">
                          {isEn ? 'Filter by Categories' : 'Nach Kategorien filtern'}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {isEn
                            ? 'Choose specific genres to export.'
                            : 'Exportiere gezielt einzelne Genres (z.B. Geburtstage, Immobilien).'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-600">
                      <span>{isEn ? 'Selected:' : 'Gewählt:'}</span>
                      <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {templatesToExport.length} Vorlagen
                      </span>
                    </div>
                  </label>
                </div>

                {/* Category Checkboxes (Shown when 'by_category' is selected) */}
                {exportScope === 'by_category' && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-2.5 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        {isEn ? 'Select categories to include:' : 'Einzuschließende Kategorien:'}
                      </span>
                      <div className="flex items-center gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={selectAllCategories}
                          className="text-amber-600 hover:text-amber-700 font-bold cursor-pointer"
                        >
                          {isEn ? 'Select All' : 'Alle auswählen'}
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={clearAllCategories}
                          className="text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                        >
                          {isEn ? 'Clear' : 'Zurücksetzen'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {ALL_STYLE_CATEGORIES.map((cat) => {
                        const count = allCombinedTemplates.filter((t) => t.category === cat).length;
                        const isChecked = selectedExportCategories.includes(cat);
                        const Icon = getCategoryIcon(cat);

                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => toggleExportCategory(cat)}
                            className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-amber-100/70 border-amber-400 text-slate-900 font-bold'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <Icon className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                              <span className="capitalize truncate">{cat}</span>
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 rounded text-slate-600 shrink-0">
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Export Format & Options */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-amber-600" />
                  {isEn ? '2. Packaging & Format' : '2. Paketierung & Formatierung'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      {isEn ? 'Custom Filename (optional)' : 'Dateiname für Download (optional)'}
                    </label>
                    <input
                      type="text"
                      value={customFilename}
                      onChange={(e) => setCustomFilename(e.target.value)}
                      placeholder="z.B. mein_vorlagen_backup.json"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={wrapInPackage}
                        onChange={(e) => setWrapInPackage(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-amber-500 h-4 w-4"
                      />
                      <span>
                        {isEn
                          ? 'Include JSON metadata header (schema: maestro_template_library_v1)'
                          : 'Metadaten-Header einbetten (Schema maestro_template_library_v1)'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Realtime JSON Preview & Action Controls */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs text-slate-700 flex items-center gap-1.5">
                    <FileJson className="w-4 h-4 text-amber-500" />
                    {isEn ? 'Live JSON Preview:' : 'Live-Vorschau des Export-JSONs:'}
                    <span className="font-mono text-slate-400 font-normal">
                      ({templatesToExport.length} Vorlagen / {Math.round((new Blob([exportJsonString]).size / 1024) * 10) / 10} KB)
                    </span>
                  </h3>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyExportJson}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      {copiedCode ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                      )}
                      <span>{copiedCode ? (isEn ? 'Copied!' : 'Kopiert!') : isEn ? 'Copy JSON' : 'JSON Kopieren'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadExport}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-xs transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isEn ? 'Download .json File' : 'Als .json Datei herunterladen'}</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <pre className="bg-slate-950 text-emerald-300 font-mono text-[11px] p-4 rounded-2xl border border-slate-800 max-h-64 overflow-y-auto leading-relaxed selection:bg-amber-500 selection:text-slate-950">
                    {exportJsonString}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: IMPORT / RESTORE */}
          {/* ============================================================== */}
          {activeTab === 'import' && (
            <div className="space-y-6">
              {/* File Dropzone & Paste Section */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all ${
                  isDragOver
                    ? 'border-amber-500 bg-amber-50/70 scale-[1.01]'
                    : 'border-slate-300 hover:border-amber-400 bg-slate-50/50'
                }`}
              >
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  {isEn ? 'Drop your .json template file here' : 'Ziehe deine .json Vorlagendatei hierher'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {isEn
                    ? 'Supports MAESTRO library packages, template arrays, or single template JSON objects.'
                    : 'Unterstützt MAESTRO-Pakete, reine Vorlagen-Arrays oder einzelne Vorlagen-Objekte.'}
                </p>

                <div className="mt-4 flex items-center justify-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json,application/json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    📂 {isEn ? 'Browse .json File' : '.json Datei auswählen'}
                  </button>
                </div>
              </div>

              {/* Direct Paste / Editor Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-amber-600" />
                    {isEn ? 'Or paste raw JSON code directly:' : 'Oder JSON-Code direkt hier einfügen:'}
                  </label>
                  {rawImportJson && (
                    <button
                      type="button"
                      onClick={() => handleAnalyzeJson('')}
                      className="text-[11px] text-slate-500 hover:text-rose-600 font-bold cursor-pointer"
                    >
                      {isEn ? 'Clear Input' : 'Eingabe leeren'}
                    </button>
                  )}
                </div>

                <textarea
                  value={rawImportJson}
                  onChange={(e) => handleAnalyzeJson(e.target.value)}
                  placeholder={
                    isEn
                      ? 'Paste JSON array or package here, e.g. [{"title": "My Template", "prompt": "..."}]'
                      : 'Füge JSON-Code hier ein, z.B. [{"title": "Mein Ständchen", "prompt": "..."}]'
                  }
                  className="w-full h-40 bg-slate-900 text-amber-300 font-mono text-xs p-3.5 rounded-2xl border border-slate-700 focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>

              {/* Analysis Result Box */}
              {analyzedImport.tested && (
                <div
                  className={`p-4 rounded-2xl border transition-all animate-fadeIn space-y-3 ${
                    analyzedImport.valid
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/90 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {analyzedImport.valid ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-extrabold text-xs">
                        {analyzedImport.valid
                          ? isEn
                            ? `JSON Validated: ${analyzedImport.templates.length} template(s) ready to import`
                            : `JSON Erfolgreich validiert: ${analyzedImport.templates.length} Vorlage(n) erkannt`
                          : isEn
                          ? 'Validation Failed'
                          : 'Validierungsfehler'}
                      </h4>
                      <p className="text-[11px] mt-0.5 opacity-90">
                        {analyzedImport.valid
                          ? isEn
                            ? `Categories detected: ${analyzedImport.categories.join(', ')}`
                            : `Erkannte Kategorien: ${analyzedImport.categories.join(', ')}`
                          : analyzedImport.error}
                      </p>
                    </div>
                  </div>

                  {/* Template Titles Preview */}
                  {analyzedImport.valid && (
                    <div className="pt-2 border-t border-emerald-200/80 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                      {analyzedImport.templates.map((tpl, i) => (
                        <span
                          key={tpl.id || i}
                          className="px-2 py-0.5 bg-emerald-100/90 border border-emerald-300/80 text-emerald-900 text-[10px] font-bold rounded-md truncate max-w-[200px]"
                          title={tpl.title}
                        >
                          {tpl.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Conflict / Merge Strategy Selection */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3.5">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  {isEn ? '3. Import & Merge Strategy' : '3. Import-Strategie & Konfliktbehandlung'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {/* Strategy 1 */}
                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                      importStrategy === 'merge_keep_existing'
                        ? 'bg-amber-50 border-amber-500 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="importStrategy"
                      checked={importStrategy === 'merge_keep_existing'}
                      onChange={() => setImportStrategy('merge_keep_existing')}
                      className="mt-0.5 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <div className="text-xs text-slate-900 font-extrabold">
                        {isEn ? 'Merge & Keep All (Safe)' : 'Zusammenführen & Duplikate als Kopie'}
                      </div>
                      <p className="text-[10px] text-slate-500 font-normal mt-0.5">
                        {isEn
                          ? 'Appends new items, duplicates are saved as copies.'
                          : 'Bestehende Vorlagen bleiben unangetastet. Kein Datenverlust.'}
                      </p>
                    </div>
                  </label>

                  {/* Strategy 2 */}
                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                      importStrategy === 'merge_overwrite'
                        ? 'bg-amber-50 border-amber-500 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="importStrategy"
                      checked={importStrategy === 'merge_overwrite'}
                      onChange={() => setImportStrategy('merge_overwrite')}
                      className="mt-0.5 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <div className="text-xs text-slate-900 font-extrabold">
                        {isEn ? 'Update Matching (Overwrite)' : 'Gleiche Vorlagen überschreiben'}
                      </div>
                      <p className="text-[10px] text-slate-500 font-normal mt-0.5">
                        {isEn
                          ? 'Updates existing presets by ID/Title and adds new ones.'
                          : 'Aktualisiert existierende Vorlagen mit gleichem Titel/ID.'}
                      </p>
                    </div>
                  </label>

                  {/* Strategy 3 */}
                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                      importStrategy === 'replace_all'
                        ? 'bg-rose-50 border-rose-500 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="importStrategy"
                      checked={importStrategy === 'replace_all'}
                      onChange={() => setImportStrategy('replace_all')}
                      className="mt-0.5 text-rose-600 focus:ring-rose-500"
                    />
                    <div>
                      <div className="text-xs text-rose-900 font-extrabold">
                        {isEn ? 'Replace Entire Library (Clean)' : 'Eigene Bibliothek ersetzen'}
                      </div>
                      <p className="text-[10px] text-slate-500 font-normal mt-0.5">
                        {isEn
                          ? 'Clears existing custom presets and applies backup.'
                          : 'Ersetzt die komplette eigene Vorlagen-Sammlung durch das Backup.'}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Commit Import Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold text-xs cursor-pointer"
                >
                  {isEn ? 'Cancel' : 'Abbrechen'}
                </button>

                <button
                  type="button"
                  disabled={!analyzedImport.valid || analyzedImport.templates.length === 0}
                  onClick={handleCommitImport}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer ${
                    analyzedImport.valid && analyzedImport.templates.length > 0
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {analyzedImport.valid
                      ? isEn
                        ? `Import ${analyzedImport.templates.length} Template(s) to Library`
                        : `${analyzedImport.templates.length} Vorlage(n) in Bibliothek importieren`
                      : isEn
                      ? 'Import to Library'
                      : 'In Bibliothek importieren'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: LIBRARY STORAGE & MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'manage' && (
            <div className="space-y-6">
              {/* Storage Diagnostic Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {isEn ? 'Custom Templates' : 'Eigene JSON-Vorlagen'}
                  </span>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    {customTemplates.length}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {storageMetrics.customTemplatesKb} KB in localStorage
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {isEn ? 'Saved Maestro Setups' : 'Gespeicherte Setups'}
                  </span>
                  <div className="text-2xl font-black text-purple-700 font-mono">
                    {storageMetrics.savedPromptsCount}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {storageMetrics.savedPromptsKb} KB in localStorage
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {isEn ? 'Total App Storage' : 'Gesamter Speicherbedarf'}
                  </span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">
                    {storageMetrics.totalKb} KB
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {isEn ? 'Fast, persistent offline storage' : 'Dauerhaft im Browser gesichert'}
                  </p>
                </div>
              </div>

              {/* Custom Templates Search & Management List */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={manageSearch}
                      onChange={(e) => setManageSearch(e.target.value)}
                      placeholder={isEn ? 'Search custom templates...' : 'Eigene Vorlagen durchsuchen...'}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  {customTemplates.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            isEn
                              ? 'Are you sure you want to clear all custom templates? (Make sure to export a backup first!)'
                              : 'Möchtest du wirklich alle eigenen Vorlagen löschen? (Exportiere vorher zur Sicherheit ein Backup!)'
                          )
                        ) {
                          onUpdateCustomTemplates([]);
                          onShowToast(isEn ? '🗑️ Custom library cleared.' : '🗑️ Eigene Vorlagen gelöscht.');
                        }
                      }}
                      className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Clear Custom Library' : 'Eigene Bibliothek leeren'}</span>
                    </button>
                  )}
                </div>

                {/* Templates List */}
                {customTemplates.length === 0 ? (
                  <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3">
                    <Bookmark className="w-8 h-8 text-slate-400 mx-auto" />
                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        {isEn ? 'No custom JSON templates saved yet.' : 'Noch keine eigenen JSON-Vorlagen gespeichert.'}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                        {isEn
                          ? 'Import templates from a backup file or create your own templates in the Template Library.'
                          : 'Importiere Vorlagen aus einem Backup oder erstelle neue Vorlagen in der Vorlagen-Bibliothek.'}
                      </p>
                    </div>
                  </div>
                ) : filteredCustomTemplates.length === 0 ? (
                  <div className="text-center p-6 text-xs text-slate-500">
                    {isEn ? 'No templates match your search.' : 'Keine Vorlagen entsprechen der Suche.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto p-1">
                    {filteredCustomTemplates.map((tpl) => (
                      <div
                        key={tpl.id}
                        className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-amber-400 transition-all shadow-2xs space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-xs text-slate-900 truncate">{tpl.title}</h4>
                            <span className="text-[10px] font-mono text-amber-700 capitalize">
                              #{tpl.category}
                            </span>
                          </div>
                          <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] font-mono rounded">
                            {tpl.windowsCount || 1} Shot
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {tpl.prompt}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
                          <button
                            type="button"
                            onClick={() => setViewingTemplateJson(tpl)}
                            className="text-slate-600 hover:text-amber-600 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <FileCode className="w-3 h-3" />
                            <span>JSON</span>
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                triggerJSONDownload(`${tpl.id}.json`, tpl);
                              }}
                              className="text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
                              title={isEn ? 'Download single JSON' : 'Einzeln herunterladen'}
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const next = customTemplates.filter((t) => t.id !== tpl.id);
                                onUpdateCustomTemplates(next);
                                onShowToast(
                                  isEn
                                    ? `🗑️ Deleted "${tpl.title}"`
                                    : `🗑️ Vorlage "${tpl.title}" gelöscht.`
                                );
                              }}
                              className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                              title={isEn ? 'Delete template' : 'Vorlage löschen'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================= MODAL FOOTER ================= */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3.5 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>
              {isEn
                ? 'All templates are 100% standard JSON (compatible with any LLM / video platform).'
                : '100% standardkonformes JSON (kompatibel mit MiniMax H3, Claude, GPT & Video-Tools).'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs transition-colors cursor-pointer"
          >
            {isEn ? 'Done' : 'Fertig'}
          </button>
        </div>
      </div>

      {/* Single Template JSON Sub-Modal */}
      {viewingTemplateJson && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-extrabold text-sm text-slate-900 truncate">
                JSON: {viewingTemplateJson.title}
              </h4>
              <button
                onClick={() => setViewingTemplateJson(null)}
                className="text-slate-400 hover:text-slate-900 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre className="bg-slate-900 text-emerald-300 font-mono text-[11px] p-3 rounded-xl max-h-64 overflow-y-auto leading-relaxed">
              {JSON.stringify(viewingTemplateJson, null, 2)}
            </pre>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(viewingTemplateJson, null, 2));
                  onShowToast(isEn ? '📋 Copied JSON!' : '📋 JSON kopiert!');
                  setViewingTemplateJson(null);
                }}
                className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                {isEn ? 'Copy & Close' : 'Kopieren & Schließen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
