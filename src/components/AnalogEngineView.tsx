import React, { useState, useMemo, useRef } from 'react';
import { PromptBuildState } from '../types';
import { ANALOG_MASTER_PRESETS, AnalogPreset, exportPresetsToJson } from '../utils/analogMasterEngine';
import { Film, Camera, Sparkles, Check, Search, ChevronLeft, ChevronRight, Sliders, Tag, Download, Upload } from 'lucide-react';

interface AnalogEngineViewProps {
  state: PromptBuildState;
  onUpdateState: (updater: (prev: PromptBuildState) => PromptBuildState) => void;
  onShowToast: (msg: string) => void;
}

export const AnalogEngineView: React.FC<AnalogEngineViewProps> = ({
  state,
  onUpdateState,
  onShowToast,
}) => {
  const isEn = state.language === 'en';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePresetId = state.analogPresetId || 'none';

  // Dynamic category counts memo
  const counts = useMemo(() => {
    return {
      all: ANALOG_MASTER_PRESETS.length,
      soviet_eastern: ANALOG_MASTER_PRESETS.filter(p => p.category === 'soviet_eastern').length,
      super8_16mm: ANALOG_MASTER_PRESETS.filter(p => p.category === 'super8_16mm').length,
      motion_picture: ANALOG_MASTER_PRESETS.filter(p => p.category === 'motion_picture').length,
      bw_35mm: ANALOG_MASTER_PRESETS.filter(p => p.category === 'bw_35mm').length,
      color_35mm: ANALOG_MASTER_PRESETS.filter(p => p.category === 'color_35mm').length,
      polaroid: ANALOG_MASTER_PRESETS.filter(p => p.category === 'polaroid').length,
      medium_format: ANALOG_MASTER_PRESETS.filter(p => p.category === 'medium_format').length,
      large_format: ANALOG_MASTER_PRESETS.filter(p => p.category === 'large_format').length,
      special_toy: ANALOG_MASTER_PRESETS.filter(p => p.category === 'special_toy').length,
    };
  }, []);

  // Filter presets by category and search query
  const filteredPresets = useMemo(() => {
    return ANALOG_MASTER_PRESETS.filter(preset => {
      const matchesCategory = selectedCategory === 'all' || preset.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        preset.name.toLowerCase().includes(q) ||
        preset.description.toLowerCase().includes(q) ||
        preset.camera.toLowerCase().includes(q) ||
        preset.filmStock.toLowerCase().includes(q) ||
        preset.bestFor.some(tag => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPresets.length / itemsPerPage) || 1;
  const paginatedPresets = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPresets.slice(start, start + itemsPerPage);
  }, [filteredPresets, currentPage, itemsPerPage]);

  const handleSelectPreset = (id: string) => {
    onUpdateState(prev => ({
      ...prev,
      analogPresetId: id === 'none' ? undefined : id,
    }));
    const presetName = id === 'none' ? 'Digital Cinema Standard' : ANALOG_MASTER_PRESETS.find(p => p.id === id)?.name || id;
    onShowToast(`🎞️ Analog Engine Preset aktiviert: ${presetName}`);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
          onShowToast(`✅ ${json.length} Presets erfolgreich geladen! (Runtime-Update aktiv)`);
        } else {
          onShowToast(`⚠️ Ungültiges JSON-Format (Array erwartet).`);
        }
      } catch (err) {
        onShowToast(`❌ Fehler beim Parsen der JSON-Datei.`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/50 to-slate-900 border border-amber-500/30 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                Analog Master Engine ({ANALOG_MASTER_PRESETS.length} Elite-Presets)
              </span>
              <span className="px-2.5 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-full text-xs font-bold">
                JSON Export & Import aktiv
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
              {isEn ? 'Authentic Analog Film, Super 8 & Camera Emulation' : 'Authentische analoge Film-, Super 8- & Kamera-Emulation'}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl mt-1">
              {isEn
                ? 'Massive library of 40+ legendary analog filmstocks, Super 8 gate weaves, Hollywood motion picture cameras, Polaroid emulsions, and optical signatures.'
                : 'Umfangreiche Bibliothek mit über 40 legendären analogen Film-Emulsionen, Super 8-Kameras, Hollywood-Cine-Kameras, Sofortbildern und optischen Signaturen.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={() => exportPresetsToJson()}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              title="Alle Presets als JSON herunterladen"
            >
              <Download className="w-3.5 h-3.5" /> JSON Export
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Presets aus JSON-Datei laden/updaten"
            >
              <Upload className="w-3.5 h-3.5" /> JSON Import
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJson}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Search Bar & Category Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={isEn ? 'Search filmstock, camera, lens, or genre (e.g. Portrait, Horror)...' : 'Suche Filmstock, Kamera, Objektiv oder Genre (z.B. Portrait, Horror, Imagefilm, Sci-Fi)...'}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
              className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
            >
              Suche zurücksetzen
            </button>
          )}
        </div>

        {/* Category Buttons with Professional Wrapping & Scrolling */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ✨ Alle ({counts.all})
          </button>
          <button
            onClick={() => handleCategoryChange('soviet_eastern')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'soviet_eastern'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ☭ Sowjetisch & Ostblock ({counts.soviet_eastern})
          </button>
          <button
            onClick={() => handleCategoryChange('super8_16mm')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'super8_16mm'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🎥 Super 8 & 16mm ({counts.super8_16mm})
          </button>
          <button
            onClick={() => handleCategoryChange('motion_picture')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'motion_picture'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🎬 Hollywood Cine ({counts.motion_picture})
          </button>
          <button
            onClick={() => handleCategoryChange('bw_35mm')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'bw_35mm'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🎞️ 35mm S/W ({counts.bw_35mm})
          </button>
          <button
            onClick={() => handleCategoryChange('color_35mm')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'color_35mm'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🎨 35mm Color ({counts.color_35mm})
          </button>
          <button
            onClick={() => handleCategoryChange('polaroid')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'polaroid'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📸 Sofortbild ({counts.polaroid})
          </button>
          <button
            onClick={() => handleCategoryChange('medium_format')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'medium_format'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📷 Mittelformat 120 ({counts.medium_format})
          </button>
          <button
            onClick={() => handleCategoryChange('large_format')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'large_format'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🏛️ Großformat & Wet Plate ({counts.large_format})
          </button>
          <button
            onClick={() => handleCategoryChange('special_toy')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'special_toy'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🧸 Toy & Underwater ({counts.special_toy})
          </button>
        </div>
      </div>

      {/* Results Count & Pagination Info */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <div>
          Zeige <strong>{paginatedPresets.length}</strong> von <strong>{filteredPresets.length}</strong> Presets (Seite {currentPage} von {totalPages})
        </div>
        {activePresetId !== 'none' && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 font-extrabold">
              Aktives Preset: {ANALOG_MASTER_PRESETS.find(p => p.id === activePresetId)?.name}
            </span>
            <button
              onClick={() => handleSelectPreset('none')}
              className="text-xs text-rose-600 hover:underline font-bold ml-2 cursor-pointer"
            >
              [Deaktivieren]
            </button>
          </div>
        )}
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Default Digital Card (Only on Page 1 if no search or matching default) */}
        {currentPage === 1 && (!searchQuery || 'digital cinema standard'.includes(searchQuery.toLowerCase())) && (
          <div
            onClick={() => handleSelectPreset('none')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              activePresetId === 'none'
                ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-[11px] font-black uppercase">
                  Standard Sensor
                </span>
                {activePresetId === 'none' && (
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-1">
                Digital Cinema Standard
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {isEn ? 'Pure digital unfiltered optical sensor output with pristine digital sharpness and default color science.' : 'Reiner digitaler Kamerasensor ohne analogen Emulsionsfilter mit maximaler Schärfe.'}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold">Allgemein</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold">Clean Digital</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectPreset('none');
              }}
              className={`w-full py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                activePresetId === 'none'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {activePresetId === 'none' ? '✓ Aktiviert (Default)' : 'Als Default wählen'}
            </button>
          </div>
        )}

        {/* Paginated Preset Cards */}
        {paginatedPresets.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full text-[11px] font-black uppercase">
                    {preset.badge}
                  </span>
                  {isActive && (
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 mb-1">
                  {preset.name}
                </h3>
                <p className="text-xs text-slate-600 mb-3">
                  {preset.description}
                </p>

                {/* Best For Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 self-center mr-1">
                    <Tag className="w-3 h-3" /> Eignet sich für:
                  </span>
                  {preset.bestFor.map((genre, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-amber-100/70 text-amber-900 rounded-md text-[10px] font-extrabold">
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="space-y-1.5 bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-[11px] text-slate-700 mb-4 font-mono">
                  <div><strong>Kamera:</strong> {preset.camera}</div>
                  <div><strong>Objektiv:</strong> {preset.lens}</div>
                  <div><strong>Filmstock:</strong> {preset.filmStock}</div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPreset(preset.id);
                }}
                className={`w-full py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {isActive ? '✓ Aktiviert (Im Prompt aktiv)' : 'Engine anwenden'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6 pb-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentPage === 1
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Vorherige
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  currentPage === num
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
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
            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentPage === totalPages
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Nächste <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
