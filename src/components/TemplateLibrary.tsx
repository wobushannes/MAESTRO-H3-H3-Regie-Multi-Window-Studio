import React, { useState } from 'react';
import {
  Film,
  Flame,
  Building,
  Home,
  Utensils,
  Search,
  Check,
  Copy,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Shirt,
  Zap,
  Wand2,
  PlusCircle,
  X,
  Trash2,
  Bookmark,
  Trees,
  Tv,
  Rocket,
  BookOpen,
  Crosshair,
  Landmark,
  Mic,
} from 'lucide-react';
import { PresetTemplate, StyleCategory } from '../types';
import { getNarratorVoiceFallbackForCategory } from '../utils/promptCompiler';

interface TemplateLibraryProps {
  customTemplates: PresetTemplate[];
  onCreateCustomTemplate: (template: PresetTemplate) => void;
  onDeleteCustomTemplate: (id: string) => void;
  onSelectTemplate: (template: PresetTemplate) => void;
  onCopyText: (text: string, label: string) => void;
  nsfwMode: boolean;
  builtInTemplates: PresetTemplate[];
  language?: 'de' | 'en';
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({
  customTemplates,
  onCreateCustomTemplate,
  onDeleteCustomTemplate,
  onSelectTemplate,
  onCopyText,
  builtInTemplates,
  language = 'de',
}) => {
  const isEn = language === 'en';
  const [selectedCategory, setSelectedCategory] = useState<StyleCategory | 'all' | 'custom'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Template Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<StyleCategory>('custom');
  const [newBadge, setNewBadge] = useState(isEn ? 'Custom Template' : 'Eigene Vorlage');
  const [newDescription, setNewDescription] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [newCamera, setNewCamera] = useState('Slow tracking shot');
  const [newLighting, setNewLighting] = useState('Cinematic lighting');
  const [newLens, setNewLens] = useState('35mm Anamorphic');
  const [newMotionSpeed, setNewMotionSpeed] = useState('24fps Normal');
  const [newAudioCue, setNewAudioCue] = useState('');
  const [newIsNsfw, setNewIsNsfw] = useState(false);
  const [newTagsStr, setNewTagsStr] = useState('Custom, Preset');

  const allTemplates = [...customTemplates, ...builtInTemplates];

  const categories = [
    { id: 'all', label: isEn ? 'All Templates' : 'Alle Vorlagen', icon: Film, count: allTemplates.length },
    { id: 'custom', label: isEn ? 'My Templates' : 'Meine Vorlagen', icon: Bookmark, count: customTemplates.length },
    { id: 'horror', label: isEn ? 'Horror & Dread' : 'Horror & Grusel', icon: Flame, count: allTemplates.filter(p => p.category === 'horror').length },
    { id: 'sitcom', label: isEn ? 'Sitcom & Comedy' : 'Sitcom & Comedy', icon: Tv, count: allTemplates.filter(p => p.category === 'sitcom').length },
    { id: 'scify', label: isEn ? 'Sci-Fi & Space' : 'Sci-Fi & Universe', icon: Rocket, count: allTemplates.filter(p => p.category === 'scify').length },
    { id: 'bau', label: isEn ? 'Construction & Trade' : 'Bau & Handwerk', icon: Building, count: allTemplates.filter(p => p.category === 'bau').length },
    { id: 'immobilien', label: isEn ? 'Real Estate' : 'Immobilien', icon: Home, count: allTemplates.filter(p => p.category === 'immobilien').length },
    { id: 'restaurant', label: isEn ? 'Food & Dining' : 'Restaurant & Food', icon: Utensils, count: allTemplates.filter(p => p.category === 'restaurant').length },
    { id: 'fashion', label: isEn ? 'Fashion & Elegance' : 'Fashion & Erotik', icon: Shirt, count: allTemplates.filter(p => p.category === 'fashion').length },
    { id: 'action', label: isEn ? 'Action & Stunts' : 'Action & Auto', icon: Zap, count: allTemplates.filter(p => p.category === 'action').length },
    { id: 'cyberpunk', label: 'Cyberpunk', icon: Sparkles, count: allTemplates.filter(p => p.category === 'cyberpunk').length },
    { id: 'nature', label: isEn ? 'Nature & Landscape' : 'Natur & Landschaft', icon: Trees, count: allTemplates.filter(p => p.category === 'nature').length },
    { id: 'fantasy', label: isEn ? 'Dark Fantasy' : 'Dark Fantasy', icon: Wand2, count: allTemplates.filter(p => p.category === 'fantasy').length },
    { id: 'comic', label: isEn ? 'Comic & Graphic Novel' : 'Comic & Graphic Novel', icon: BookOpen, count: allTemplates.filter(p => p.category === 'comic').length },
    { id: 'war', label: isEn ? 'War Cinema & Battle' : 'Kriegsfilm & Gefecht', icon: Crosshair, count: allTemplates.filter(p => p.category === 'war').length },
    { id: 'politics', label: isEn ? 'Politics & Speeches' : 'Wahlkampf & Politik', icon: Landmark, count: allTemplates.filter(p => p.category === 'politics').length },
  ];

  const filteredTemplates = allTemplates.filter((tpl) => {
    if (selectedCategory === 'custom') {
      if (!tpl.isCustom) return false;
    } else if (selectedCategory !== 'all') {
      if (tpl.category !== selectedCategory) return false;
    }

    const matchSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchSearch;
  });

  const handleCopy = (tpl: PresetTemplate) => {
    onCopyText(tpl.prompt, tpl.title);
    setCopiedId(tpl.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrompt.trim()) return;

    const tagsArray = newTagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const created: PresetTemplate = {
      id: `custom-tpl-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      badge: newBadge.trim() || (isEn ? 'Custom' : 'Eigene Vorlage'),
      description: newDescription.trim() || (isEn ? 'User-defined template' : 'Benutzerdefinierte Vorlage'),
      prompt: newPrompt.trim(),
      camera: newCamera.trim(),
      lighting: newLighting.trim(),
      lens: newLens.trim(),
      motionSpeed: newMotionSpeed.trim(),
      audioCue: newAudioCue.trim() || undefined,
      negativePrompt: 'low quality, distorted, blurry, artifacts',
      isNsfw: newIsNsfw,
      isCustom: true,
      tags: tagsArray.length > 0 ? tagsArray : ['Custom'],
      windowsCount: 1,
    };

    onCreateCustomTemplate(created);
    setShowCreateModal(false);

    // Reset Form
    setNewTitle('');
    setNewDescription('');
    setNewPrompt('');
  };

  return (
    <div className="space-y-6 pb-28 animate-fadeIn">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-600" />
            {isEn ? 'Template Library (Presets & Custom)' : 'Vorlagen-Bibliothek (Presets & Custom)'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {isEn
              ? 'Choose from ready cinematic templates or create your own reusable custom setups!'
              : 'Wähle aus Fertig-Vorlagen oder erstelle deine eigenen wiederverwendbaren Vorlagen!'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Create Custom Template Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            {isEn ? 'Create Custom Template' : 'Neue Vorlage erstellen'}
          </button>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Search templates...' : 'Vorlagen durchsuchen...'}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
              <span
                className={`ml-1 px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                  isActive ? 'bg-slate-950 text-amber-300 font-bold' : 'bg-slate-100 text-slate-600 font-bold'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Modal: Create Custom Template */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative my-8 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-500" />
                {isEn ? 'Create Custom Template' : 'Eigene Vorlage erstellen'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-900 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustom} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {isEn ? 'Template Title *' : 'Titel der Vorlage *'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={isEn ? 'e.g. My Gothic Fog Sanatorium' : 'z.B. Meine Horror-Sanatorium Szene'}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {isEn ? 'Category' : 'Kategorie'}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none"
                  >
                    <option value="custom">{isEn ? 'Custom' : 'Eigene'}</option>
                    <option value="horror">Horror</option>
                    <option value="sitcom">Sitcom</option>
                    <option value="scify">Sci-Fi</option>
                    <option value="bau">{isEn ? 'Construction' : 'Bau & Handwerk'}</option>
                    <option value="immobilien">{isEn ? 'Real Estate' : 'Immobilien'}</option>
                    <option value="restaurant">{isEn ? 'Food & Dining' : 'Restaurant'}</option>
                    <option value="fashion">Fashion</option>
                    <option value="action">Action</option>
                    <option value="cyberpunk">Cyberpunk</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="nature">{isEn ? 'Nature' : 'Natur'}</option>
                    <option value="comic">Comic</option>
                    <option value="war">{isEn ? 'War Cinema' : 'Kriegsfilm'}</option>
                    <option value="politics">{isEn ? 'Politics' : 'Politik'}</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {isEn ? 'Badge / Tag' : 'Badge / Label'}
                  </label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    placeholder={isEn ? 'e.g. My Style' : 'z.B. Mein Style'}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {isEn ? 'Description' : 'Beschreibung'}
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder={isEn ? 'Short summary of the preset...' : 'Kurze Erklärung der Vorlage...'}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  {isEn ? 'Main Prompt *' : 'Haupt-Prompt *'}
                </label>
                <textarea
                  required
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="A cinematic video prompt..."
                  className="w-full h-24 bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 font-sans resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {isEn ? 'Camera' : 'Kamera'}
                  </label>
                  <input
                    type="text"
                    value={newCamera}
                    onChange={(e) => setNewCamera(e.target.value)}
                    placeholder="Slow push-in"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    {isEn ? 'Lighting' : 'Beleuchtung'}
                  </label>
                  <input
                    type="text"
                    value={newLighting}
                    onChange={(e) => setNewLighting(e.target.value)}
                    placeholder="Atmospheric lighting"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="customIsNsfw"
                  checked={newIsNsfw}
                  onChange={(e) => setNewIsNsfw(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-500 h-4 w-4 cursor-pointer"
                />
                <label htmlFor="customIsNsfw" className="font-bold text-slate-800 cursor-pointer">
                  {isEn ? 'Contains NSFW / Dark Horror Elements' : 'Enthält NSFW / Dark Horror Elemente'}
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                >
                  {isEn ? 'Cancel' : 'Abbrechen'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-xs cursor-pointer"
                >
                  {isEn ? 'Save Template' : 'Vorlage Speichern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className={`group bg-white border rounded-2xl overflow-hidden transition-all shadow-xs flex flex-col justify-between ${
              tpl.isCustom
                ? 'border-amber-400 ring-2 ring-amber-400/20'
                : 'border-slate-200 hover:border-amber-500'
            }`}
          >
            {/* Sample Image Header */}
            {tpl.sampleImage ? (
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img
                  src={tpl.sampleImage}
                  alt={tpl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-amber-900 text-[10px] font-extrabold rounded-lg border border-amber-300 font-mono shadow-xs">
                    {tpl.badge}
                  </span>
                  {tpl.isCustom && (
                    <span className="px-2 py-0.5 bg-slate-900 text-amber-300 text-[10px] font-extrabold rounded-lg border border-slate-800">
                      {isEn ? '★ Custom' : '★ Eigene Vorlage'}
                    </span>
                  )}
                  {tpl.isNsfw && (
                    <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-bold rounded-lg border border-rose-700 flex items-center gap-1 shadow-xs">
                      <ShieldAlert className="w-3 h-3 text-white" />
                      NSFW
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span className="font-extrabold text-xs text-amber-300">{tpl.badge}</span>
                </div>
                {tpl.isCustom && (
                  <button
                    onClick={() => onDeleteCustomTemplate(tpl.id)}
                    className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
                    title={isEn ? 'Delete template' : 'Vorlage löschen'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Card Body */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                    {tpl.title}
                  </h3>
                  {tpl.isCustom && tpl.sampleImage && (
                    <button
                      onClick={() => onDeleteCustomTemplate(tpl.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title={isEn ? 'Delete custom template' : 'Eigene Vorlage löschen'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-medium">
                  {tpl.description}
                </p>

                {/* Prompt Box Preview */}
                <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-800 line-clamp-3 leading-relaxed">
                  {tpl.prompt}
                </div>

                {/* Quick Attributes */}
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-slate-600 font-mono font-medium">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                    📷 {tpl.camera.split(' ')[0]}...
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                    💡 {tpl.lighting.split(' ')[0]}...
                  </span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200/60 rounded flex items-center gap-1 font-bold">
                    <Mic className="w-2.5 h-2.5 text-amber-600" />
                    {(tpl.narratorVoice || getNarratorVoiceFallbackForCategory(tpl.category, tpl.title)).split(',')[0]}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectTemplate(tpl)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  {isEn ? 'Load into Builder' : 'In Builder Laden'}
                </button>

                <button
                  onClick={() => handleCopy(tpl)}
                  title={isEn ? 'Copy prompt' : 'Prompt kopieren'}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200 cursor-pointer"
                >
                  {copiedId === tpl.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
