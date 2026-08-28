import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, Tag } from 'lucide-react';
import { ReferenceImage } from '../types';

interface ReferenceManagerProps {
  references: ReferenceImage[];
  onAddReference: (ref: ReferenceImage) => void;
  onRemoveReference: (id: string) => void;
  onInjectTagToPrompt: (tag: string) => void;
  onSetReferencesCount?: (count: number) => void;
  language?: 'de' | 'en';
}

export const ReferenceManager: React.FC<ReferenceManagerProps> = ({
  references,
  onAddReference,
  onRemoveReference,
  onInjectTagToPrompt,
  onSetReferencesCount,
  language = 'de',
}) => {
  const isEn = language === 'en';
  const [label, setLabel] = useState('');
  const [role, setRole] = useState<ReferenceImage['role']>('subject');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const roleOptions: { value: ReferenceImage['role']; label: string }[] = [
    { value: 'subject', label: isEn ? 'Main Subject / Character' : 'Haupt-Subjekt / Charakter' },
    { value: 'style', label: isEn ? 'Style / Color Reference' : 'Stil / Farb-Referenz' },
    { value: 'start_frame', label: isEn ? 'Start Frame (First Image)' : 'Start-Frame (Erstes Bild)' },
    { value: 'end_frame', label: isEn ? 'End Frame (Final Image)' : 'End-Frame (Letztes Bild)' },
    { value: 'location', label: isEn ? 'Location / Environment' : 'Location / Bauort' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    // RULE: Reference images are ALWAYS named picture 1, picture 2, picture 3, etc.
    const pictureNumber = references.length + 1;
    const tag = `picture ${pictureNumber}`;

    const newRef: ReferenceImage = {
      id: `ref-${Date.now()}`,
      label: label.trim(),
      tag,
      role,
      url: url.trim() || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
      description: description.trim() || (isEn ? `Reference image ${pictureNumber} for generation` : `Referenzbild ${pictureNumber} für Generation`),
    };

    onAddReference(newRef);
    setLabel('');
    setUrl('');
    setDescription('');
  };

  const handleCopyTag = (tag: string) => {
    onInjectTagToPrompt(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1500);
  };

  return (
    <div className="space-y-6 pb-28 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-600" />
            {isEn ? 'Reference Image Management (picture 1, picture 2...)' : 'Referenzbilder-Verwaltung (picture 1, picture 2...)'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {isEn ? (
              <>Reference images are <span className="font-bold text-amber-800">ALWAYS formatted as "picture 1", "picture 2", "picture 3"</span> and anchored in the prompt text.</>
            ) : (
              <>Referenzbilder werden <span className="font-bold text-amber-800">IMMER als "picture 1", "picture 2", "picture 3"</span> usw. nummeriert und im Prompt verankert.</>
            )}
          </p>
        </div>

        {onSetReferencesCount && (
          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            <span className="text-xs font-extrabold text-slate-800">
              {isEn ? 'Quick Select Reference Count:' : 'Schnellauswahl Anzahl Referenzen:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[0, 1, 2, 3, 4].map((num) => {
                const isSelected = references.length === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => onSetReferencesCount(num)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-amber-100 hover:border-amber-400'
                    }`}
                  >
                    {num === 0
                      ? (isEn ? '0 Images' : '0 Bilder')
                      : num === 1
                      ? (isEn ? 'Exactly 1 Image (picture 1)' : 'Exakt 1 Bild (picture 1)')
                      : (isEn ? `${num} Images (picture 1–${num})` : `${num} Bilder (picture 1–${num})`)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add Reference Form & Presets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Panel */}
        <form
          onSubmit={handleCreate}
          className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-slate-900">
              {isEn ? 'Add New Reference Image' : 'Neues Referenzbild hinzufügen'}
            </h3>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-mono font-extrabold rounded border border-amber-300">
              Auto-Tag: picture {references.length + 1}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isEn ? 'Label / Subject Name' : 'Bezeichnung / Name'}
              </label>
              <input
                type="text"
                required
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={isEn ? 'e.g. Main Character, Face Anchor...' : 'z.B. Hauptdarsteller, Gesichts-Referenz...'}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isEn ? 'Reference Role' : 'Referenz-Typ'}
              </label>
              <select
                value={role}
                onChange={(e: any) => setRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-bold"
              >
                {roleOptions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isEn ? 'Image URL or Preview' : 'Bild-URL oder Preview'}
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isEn ? 'Notes / Wardrobe / Details' : 'Notizen / Kleidung / Details zum Bild'}
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isEn ? 'e.g. Keep clothing, hairstyle and bone structure from picture 1' : 'z.B. Kleidung, Frisur, Gesichtsform aus picture 1 übernehmen'}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {isEn ? `Save as "picture ${references.length + 1}"` : `Als "picture ${references.length + 1}" speichern`}
            </button>
          </div>
        </form>

        {/* References List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">
              {isEn ? `Active References (${references.length})` : `Aktive Referenzen (${references.length})`}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {isEn ? (
                <>Click <code className="text-amber-800 bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">picture 1</code> to inject into prompt.</>
              ) : (
                <>Klicke auf <code className="text-amber-800 bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">picture 1</code>, um es im Text einzufügen.</>
              )}
            </span>
          </div>

          {references.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-2">
              <ImageIcon className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-600">
                {isEn ? 'No reference images added yet.' : 'Noch keine Referenzbilder hinterlegt.'}
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isEn
                  ? 'Add your first reference image above – it will automatically be anchored as picture 1.'
                  : 'Füge oben dein Erstes Bild hinzu – es wird automatisch als picture 1 hinterlegt.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {references.map((ref, idx) => {
                const currentTag = `picture ${idx + 1}`;
                return (
                  <div
                    key={ref.id}
                    className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-3 flex flex-col justify-between hover:border-amber-500 transition-colors shadow-xs"
                  >
                    <div className="flex gap-3">
                      <img
                        src={ref.url}
                        alt={ref.label}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-200 bg-slate-100 flex-shrink-0"
                      />
                      <div className="space-y-1 overflow-hidden">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-xs text-slate-900 truncate">
                            {ref.label}
                          </span>
                          <button
                            onClick={() => onRemoveReference(ref.id)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[10px] text-slate-500 line-clamp-2">
                          {ref.description}
                        </div>

                        <div className="inline-block mt-1">
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded font-mono uppercase">
                            {currentTag}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyTag(currentTag)}
                      className="w-full flex items-center justify-center gap-2 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-amber-900 font-mono text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      {copiedTag === currentTag ? (
                        <>
                          <Tag className="w-3 h-3 text-emerald-600" />
                          {isEn ? `"${currentTag}" injected!` : `"${currentTag}" eingefügt!`}
                        </>
                      ) : (
                        <>
                          <Tag className="w-3 h-3 text-amber-600" />
                          {isEn ? `Inject Tag "${currentTag}"` : `Tag "${currentTag}" einfügen`}
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
