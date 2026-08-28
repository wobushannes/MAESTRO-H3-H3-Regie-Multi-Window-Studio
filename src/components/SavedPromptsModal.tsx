import React, { useState } from 'react';
import { Bookmark, Trash2, Copy, Check, Download, Upload, Search } from 'lucide-react';
import { SavedPreset } from '../types';

interface SavedPromptsModalProps {
  savedList: SavedPreset[];
  onLoadSaved: (preset: SavedPreset) => void;
  onRemoveSaved: (id: string) => void;
  onImportList: (imported: SavedPreset[]) => void;
  onCopyText: (text: string, title: string) => void;
  language?: 'de' | 'en';
}

export const SavedPromptsModal: React.FC<SavedPromptsModalProps> = ({
  savedList,
  onLoadSaved,
  onRemoveSaved,
  onImportList,
  onCopyText,
  language = 'de',
}) => {
  const isEn = language === 'en';
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = savedList.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.finalPrompt.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (s: SavedPreset) => {
    onCopyText(s.finalPrompt, s.title);
    setCopiedId(s.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `maestro_h3_prompts_${Date.now()}.json`);
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
        alert(isEn ? 'Invalid JSON file' : 'Ungültige JSON Datei');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-28 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600" />
            {isEn ? 'Saved Prompts & Multi-Window Setups' : 'Gespeicherte Prompts & Multi-Window Setups'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {isEn
              ? 'Your locally saved prompts, reference setups, and Maestro sequences.'
              : 'Deine lokal gespeicherten Prompts, Referenz-Konfigurationen und Maestro Sequenzen.'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {savedList.length > 0 && (
            <button
              onClick={handleExportJSON}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-600" />
              {isEn ? 'Export as JSON' : 'Als JSON Exportieren'}
            </button>
          )}

          <label className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer">
            <Upload className="w-4 h-4 text-amber-600" />
            {isEn ? 'Import JSON' : 'JSON Importieren'}
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Search Input */}
      {savedList.length > 0 && (
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isEn ? 'Search saved prompts...' : 'Gespeicherte Prompts durchsuchen...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center space-y-2">
          <Bookmark className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-600">
            {isEn ? 'No saved prompts found.' : 'Noch keine gespeicherten Prompts vorhanden.'}
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {isEn
              ? 'Build a prompt in the Prompt Builder and click "Save as Preset" in the bottom action bar.'
              : 'Erstelle im Klick-Builder einen Prompt und klicke in der Ausgabeleiste auf "Als Vorlage speichern".'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 flex flex-col justify-between hover:border-amber-500 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-sm text-slate-900 truncate max-w-[220px]">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono font-medium">
                    {item.date}
                  </span>
                </div>

                <div className="mt-2.5 p-2.5 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-800 line-clamp-4 border border-slate-200">
                  {item.finalPrompt}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onLoadSaved(item)}
                  className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
                >
                  {isEn ? 'Load into Builder' : 'In Builder Laden'}
                </button>

                <button
                  onClick={() => handleCopy(item)}
                  title={isEn ? 'Copy Prompt' : 'Prompt kopieren'}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200 cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
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
          ))}
        </div>
      )}
    </div>
  );
};
