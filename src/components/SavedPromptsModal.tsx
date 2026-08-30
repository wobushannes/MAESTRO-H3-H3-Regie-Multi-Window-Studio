import React, { useState } from 'react';
import {
  Bookmark,
  Trash2,
  Copy,
  Check,
  Download,
  Upload,
  Search,
  Star,
  Building2,
  Tag,
  User,
  Users,
  UserCheck,
  Edit3,
  Sparkles,
  Share2,
  FileText,
  Filter,
} from 'lucide-react';
import { SavedPreset, PresetTemplate, StyleCategory, PersonCountType } from '../types';

interface SavedPromptsModalProps {
  savedList: SavedPreset[];
  onLoadSaved: (preset: SavedPreset) => void;
  onRemoveSaved: (id: string) => void;
  onImportList: (imported: SavedPreset[]) => void;
  onCopyText: (text: string, title: string) => void;
  onUpdateSavedItem?: (updated: SavedPreset) => void;
  onPublishToCustomTemplate?: (tpl: PresetTemplate) => void;
  language?: 'de' | 'en';
}

export const SavedPromptsModal: React.FC<SavedPromptsModalProps> = ({
  savedList,
  onLoadSaved,
  onRemoveSaved,
  onImportList,
  onCopyText,
  onUpdateSavedItem,
  onPublishToCustomTemplate,
  language = 'de',
}) => {
  const isEn = language === 'en';
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>('all');
  const [minRatingFilter, setMinRatingFilter] = useState<number>(0);
  const [personCountFilter, setPersonCountFilter] = useState<'all' | PersonCountType>('all');

  // Edit Modal State
  const [editingPreset, setEditingPreset] = useState<SavedPreset | null>(null);

  // Extract unique client names
  const clientNames = Array.from(
    new Set(
      savedList
        .map((s) => s.clientName?.trim())
        .filter((c): c is string => Boolean(c && c.length > 0))
    )
  );

  const filteredList = savedList.filter((item) => {
    // Search
    const q = search.toLowerCase().trim();
    if (q) {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchClient = item.clientName?.toLowerCase().includes(q);
      const matchProject = item.projectName?.toLowerCase().includes(q);
      const matchPrompt = item.finalPrompt.toLowerCase().includes(q);
      const matchNotes = item.notes?.toLowerCase().includes(q);
      if (!matchTitle && !matchClient && !matchProject && !matchPrompt && !matchNotes) {
        return false;
      }
    }

    // Client Filter
    if (selectedClientFilter !== 'all') {
      if (item.clientName?.trim() !== selectedClientFilter) return false;
    }

    // Rating Filter
    if (minRatingFilter > 0) {
      if (!item.performanceRating || item.performanceRating < minRatingFilter) return false;
    }

    // Person Count Filter
    if (personCountFilter !== 'all') {
      const pCount = item.personCount || item.state?.personCount || '1_person';
      if (pCount !== personCountFilter) return false;
    }

    return true;
  });

  const handleCopy = (s: SavedPreset) => {
    onCopyText(s.finalPrompt, s.title);
    setCopiedId(s.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `maestro_commercial_templates_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target?.result as string);
        if (Array.isArray(json)) {
          onImportList(json);
        }
      } catch (err) {
        alert(isEn ? 'Invalid JSON file format' : 'Ungültiges JSON-Dateiformat');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveEditedPreset = () => {
    if (!editingPreset || !onUpdateSavedItem) return;
    onUpdateSavedItem(editingPreset);
    setEditingPreset(null);
  };

  const handlePublishToLibrary = (item: SavedPreset) => {
    if (!onPublishToCustomTemplate) return;
    const cat = (item.category || item.state?.category || 'custom') as StyleCategory;
    const newTpl: PresetTemplate = {
      id: `custom-tpl-pub-${Date.now()}`,
      title: item.title,
      category: cat,
      description: item.notes || item.projectName || `Saved Commercial Preset for ${item.clientName || 'XYZ'}`,
      badge: item.clientName ? `Client: ${item.clientName}` : 'Commercial Preset',
      prompt: item.finalPrompt,
      camera: item.state?.cameraMotion || 'Slow tracking shot',
      lighting: item.state?.lighting || 'Cinematic lighting',
      lens: item.state?.lensStyle || '35mm Lens',
      motionSpeed: item.state?.motionSpeed || '24fps Normal',
      negativePrompt: '',
      isCustom: true,
      tags: item.clientName ? [item.clientName.toLowerCase(), 'commercial', cat] : ['commercial', cat],
      wardrobeStyle: item.state?.wardrobeStyle,
      clothingDetails: item.state?.clothingDetails,
      narratorVoice: item.state?.narratorVoice,
      dialogueLines: item.state?.dialogueLines,
      isImmersivePov: item.state?.isImmersivePov,
    };

    onPublishToCustomTemplate(newTpl);
  };

  return (
    <div className="space-y-6 pb-28 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono font-black text-[10px] rounded uppercase">
              Commercial Hub & Archive
            </span>
            <span className="text-xs text-slate-500 font-bold font-mono">
              {savedList.length} {isEn ? 'Templates Saved' : 'Vorlagen gespeichert'}
            </span>
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 mt-1">
            <Bookmark className="w-5 h-5 text-amber-600" />
            {isEn ? 'Saved Image Video Templates & Commercials' : 'Gespeicherte Imagevideo- & Commercial-Vorlagen'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium max-w-2xl">
            {isEn
              ? 'Organize high-performing video prompts for client campaigns (XYZ Corp, Brands, Real Estate). Rate performance, add notes, and reload into the builder.'
              : 'Verwalte gut laufende Imagefilm-Prompts für deine Kunden-Projekte (XYZ, Brands, Immobilien). Bewerte Performance, vergebe Kunden-Tags und lade Setups mit 1 Klick.'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {savedList.length > 0 && (
            <button
              onClick={handleExportJSON}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-600" />
              {isEn ? 'Export Package (JSON)' : 'Als Paket Exportieren'}
            </button>
          )}

          <label className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer">
            <Upload className="w-4 h-4 text-amber-600" />
            {isEn ? 'Import Package' : 'Paket Importieren'}
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      {savedList.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  isEn
                    ? 'Search by client (e.g. XYZ), title, notes, or prompt...'
                    : 'Suche nach Kunden (z.B. XYZ), Titel, Notizen oder Prompt...'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            {/* Client Filter Dropdown */}
            {clientNames.length > 0 && (
              <select
                value={selectedClientFilter}
                onChange={(e) => setSelectedClientFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="all">{isEn ? '🏢 All Clients' : '🏢 Alle Kunden'}</option>
                {clientNames.map((c) => (
                  <option key={c} value={c}>
                    🏢 {c}
                  </option>
                ))}
              </select>
            )}

            {/* Min Rating Filter */}
            <select
              value={minRatingFilter}
              onChange={(e) => setMinRatingFilter(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value={0}>{isEn ? '⭐ All Performance Ratings' : '⭐ Alle Bewertungen'}</option>
              <option value={5}>{isEn ? '🔥🔥 Top Performers (5 Stars)' : '🔥🔥 Top Performer (5 Sterne)'}</option>
              <option value={4}>{isEn ? '⭐ 4+ Stars' : '⭐ 4+ Sterne'}</option>
              <option value={3}>{isEn ? '⭐ 3+ Stars' : '⭐ 3+ Sterne'}</option>
            </select>

            {/* Person Count Filter */}
            <select
              value={personCountFilter}
              onChange={(e) => setPersonCountFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
            >
              <option value="all">{isEn ? '👥 All Person Counts' : '👥 Alle Personen-Logiken'}</option>
              <option value="1_person">{isEn ? '👤 1 Person (Solo)' : '👤 1 Person (Solo)'}</option>
              <option value="2_person">{isEn ? '👥 2 Persons (Duo)' : '👥 2 Personen (Duo)'}</option>
              <option value="multi_person">{isEn ? '👥 3+ Persons (Ensemble)' : '👥 3+ Personen (Ensemble)'}</option>
            </select>
          </div>
        </div>
      )}

      {/* LIST OF SAVED COMMERCIAL TEMPLATES */}
      {filteredList.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center space-y-3">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-extrabold text-slate-700">
            {isEn ? 'No commercial templates found.' : 'Keine passenden Vorlagen gefunden.'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {isEn
              ? 'Build an image video prompt in the Builder and click "Save as Preset" in the bottom output bar. You can add client tags, performance ratings, and client notes!'
              : 'Erstelle im Klick-Builder dein Imagevideo und klicke unten auf "Als Vorlage speichern". Du kannst Kunden-Namen, Erfolgs-Sterne und Notizen hinzufügen!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item) => {
            const pCount = item.personCount || item.state?.personCount || '1_person';
            const rating = item.performanceRating || 0;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 flex flex-col justify-between hover:border-amber-500 transition-colors shadow-xs group"
              >
                <div className="space-y-2.5">
                  {/* HEADER BADGES & TITLE */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.clientName && (
                          <span className="px-2 py-0.5 bg-cyan-100 text-cyan-900 font-extrabold text-[10px] rounded-md flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-cyan-700" />
                            {item.clientName}
                          </span>
                        )}

                        {item.projectName && (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-900 font-extrabold text-[10px] rounded-md">
                            {item.projectName}
                          </span>
                        )}

                        {pCount === '1_person' ? (
                          <span className="px-2 py-0.5 bg-cyan-100 text-cyan-950 font-bold text-[10px] rounded-md flex items-center gap-0.5">
                            <User className="w-3 h-3" />
                            1 Person (Solo)
                          </span>
                        ) : pCount === '2_person' ? (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-950 font-bold text-[10px] rounded-md flex items-center gap-0.5">
                            <UserCheck className="w-3 h-3" />
                            2 Personen (Duo)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-950 font-bold text-[10px] rounded-md flex items-center gap-0.5">
                            <Users className="w-3 h-3" />
                            3+ Personen
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-sm text-slate-900 truncate max-w-[280px]">
                        {item.title}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-slate-400 font-mono">{item.date}</div>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-0.5 mt-1 justify-end">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= rating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-slate-200 fill-slate-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* PROMPT PREVIEW */}
                  <div className="p-2.5 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-800 line-clamp-3 border border-slate-200">
                    {item.finalPrompt}
                  </div>

                  {/* NOTES PREVIEW IF PRESENT */}
                  {item.notes && (
                    <div className="p-2 bg-amber-50/80 border border-amber-200/80 rounded-lg text-[11px] text-amber-900 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="line-clamp-2 italic font-medium">{item.notes}</div>
                    </div>
                  )}
                </div>

                {/* BOTTOM ACTIONS */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
                  <button
                    onClick={() => onLoadSaved(item)}
                    className="flex-1 py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>{isEn ? 'Load into Builder' : 'In Builder Laden'}</span>
                  </button>

                  {onPublishToCustomTemplate && (
                    <button
                      onClick={() => handlePublishToLibrary(item)}
                      title={
                        isEn
                          ? 'Publish to Custom Library Templates tab'
                          : 'In der Vorlagen-Bibliothek als eigene Vorlage speichern'
                      }
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors border border-slate-200 cursor-pointer flex items-center gap-1"
                    >
                      <Share2 className="w-3.5 h-3.5 text-purple-600" />
                      <span className="hidden sm:inline">{isEn ? 'To Library' : 'Zu Bibliothek'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setEditingPreset(item)}
                    title={isEn ? 'Edit Client, Rating & Notes' : 'Kunde, Bewertung & Notizen bearbeiten'}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                  </button>

                  <button
                    onClick={() => handleCopy(item)}
                    title={isEn ? 'Copy Prompt' : 'Prompt kopieren'}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200 cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </button>

                  <button
                    onClick={() => onRemoveSaved(item.id)}
                    title={isEn ? 'Delete saved preset' : 'Gespeicherten Prompt löschen'}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT COMMERCIAL PRESET MODAL */}
      {editingPreset && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-600" />
                {isEn ? 'Edit Commercial Preset Details' : 'Vorlagen- & Kunden-Details bearbeiten'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPreset(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {isEn ? 'Template / Commercial Title:' : 'Titel der Vorlage:'}
                </label>
                <input
                  type="text"
                  value={editingPreset.title}
                  onChange={(e) => setEditingPreset({ ...editingPreset, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {isEn ? 'Client Name (e.g. XYZ Corp):' : 'Kunden-Name (z.B. XYZ Corp):'}
                  </label>
                  <input
                    type="text"
                    value={editingPreset.clientName || ''}
                    onChange={(e) => setEditingPreset({ ...editingPreset, clientName: e.target.value })}
                    placeholder="XYZ Imagevideos"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {isEn ? 'Project / Campaign Name:' : 'Projekt / Kampagnen-Name:'}
                  </label>
                  <input
                    type="text"
                    value={editingPreset.projectName || ''}
                    onChange={(e) => setEditingPreset({ ...editingPreset, projectName: e.target.value })}
                    placeholder="Sommer Kampagne 2026"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* STAR RATING */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {isEn ? 'Performance Rating (Success Rate):' : 'Performance-Bewertung (Erfolgsrate):'}
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingPreset({ ...editingPreset, performanceRating: star })}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= (editingPreset.performanceRating || 0)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-[11px] font-mono text-slate-500 ml-2">
                    {editingPreset.performanceRating ? `${editingPreset.performanceRating}/5 Sterne` : 'Keine Bewertung'}
                  </span>
                </div>
              </div>

              {/* NOTES / FEEDBACK */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {isEn ? 'Notes & Client Feedback:' : 'Kunden-Notizen & Feedback:'}
                </label>
                <textarea
                  rows={3}
                  value={editingPreset.notes || ''}
                  onChange={(e) => setEditingPreset({ ...editingPreset, notes: e.target.value })}
                  placeholder={
                    isEn
                      ? 'e.g. Absoluter Top-Performer auf TikTok Ads. Kunde begeistert von Farbgebung.'
                      : 'z.B. Sehr hohe Conversion bei Instagram Reels. Perfektes Licht für Luxusprodukte.'
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingPreset(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                {isEn ? 'Cancel' : 'Abbrechen'}
              </button>
              <button
                type="button"
                onClick={handleSaveEditedPreset}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-xs cursor-pointer"
              >
                {isEn ? 'Save Changes' : 'Änderungen speichern'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
