import React, { useState } from 'react';
import { Layers, Plus, Trash2, Copy, Check, ArrowRight, ArrowDown, Video, Sliders, Play } from 'lucide-react';
import { MaestroWindow, ReferenceImage } from '../types';

interface MaestroTimelineProps {
  windows: MaestroWindow[];
  onAddWindow: () => void;
  onUpdateWindow: (id: string, updated: Partial<MaestroWindow>) => void;
  onRemoveWindow: (id: string) => void;
  onCopyScript: (script: string) => void;
  availableReferences: ReferenceImage[];
  rawConcept: string;
}

export const MaestroTimeline: React.FC<MaestroTimelineProps> = ({
  windows,
  onAddWindow,
  onUpdateWindow,
  onRemoveWindow,
  onCopyScript,
  availableReferences,
  rawConcept,
}) => {
  const [copiedScript, setCopiedScript] = useState(false);

  // Generate complete Maestro timeline script
  const generateScript = () => {
    let script = `// ==========================================\n`;
    script += `// MAESTRO MULTI-WINDOW STITCHING SCRIPT\n`;
    script += `// Engine: MiniMax H3 / Hailuo Video 2.1\n`;
    script += `// Windows Count: ${windows.length}\n`;
    script += `// ==========================================\n\n`;

    windows.forEach((win) => {
      script += `[WINDOW_${win.windowNumber} (${win.timeRange})]\n`;
      script += `Prompt: ${win.prompt || rawConcept || 'Cinematic shot'}\n`;
      script += `Camera_Trajectory: ${win.cameraTrajectory || 'Smooth Tracking'}\n`;
      script += `Continuity: ${win.continuityNote || 'Standard Cut'}\n`;
      if (win.referenceImages.length > 0) {
        script += `Active_References: ${win.referenceImages.join(', ')}\n`;
      }
      script += `\n`;
    });

    return script;
  };

  const handleCopyScript = () => {
    const text = generateScript();
    onCopyScript(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Banner */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-extrabold text-slate-900">
              Maestro Multi-Window Timeline Stitcher
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl font-medium">
            Verbinde mehrere Zeitfenster (Windows) zu einem durchgehenden MiniMax H3 Video-Clip. Maestro sorgt für flüssigen Kamera-Schwung und Konsistenz über Fenster-Grenzen hinweg.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={onAddWindow}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-all"
          >
            <Plus className="w-4 h-4 text-amber-600" />
            Window Hinzufügen
          </button>

          <button
            onClick={handleCopyScript}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold transition-all shadow-xs"
          >
            {copiedScript ? (
              <>
                <Check className="w-4 h-4 text-emerald-950" />
                Script Kopiert!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Maestro Script Kopieren
              </>
            )}
          </button>
        </div>
      </div>

      {/* Timeline Windows Chain */}
      <div className="space-y-4">
        {windows.map((win, idx) => (
          <React.Fragment key={win.id}>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 hover:border-amber-500 transition-colors relative">
              {/* Window Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-extrabold font-mono text-sm">
                    W{win.windowNumber}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      Window {win.windowNumber}
                      <span className="text-xs text-amber-800 font-mono font-bold">
                        ({win.timeRange})
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {idx === 0
                        ? 'Anfangs-Sequenz (Initial Shot)'
                        : `Schnitt / Nahtloser Übergang aus Window ${idx}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={win.timeRange}
                    onChange={(e) =>
                      onUpdateWindow(win.id, { timeRange: e.target.value })
                    }
                    placeholder="z.B. 0s - 3s"
                    className="w-24 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs text-amber-900 font-mono font-bold text-center focus:outline-none focus:border-amber-500"
                  />

                  {windows.length > 1 && (
                    <button
                      onClick={() => onRemoveWindow(win.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Window Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Prompt Description */}
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Window Prompt (Szenen-Aktion für diesen Zeitabschnitt)
                  </label>
                  <textarea
                    value={win.prompt}
                    onChange={(e) =>
                      onUpdateWindow(win.id, { prompt: e.target.value })
                    }
                    placeholder={`Aktion für Window ${win.windowNumber}...`}
                    className="w-full h-20 bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white resize-none font-mono"
                  />
                </div>

                {/* Camera Trajectory */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kamera-Trajektorie / Bewegung
                  </label>
                  <input
                    type="text"
                    value={win.cameraTrajectory}
                    onChange={(e) =>
                      onUpdateWindow(win.id, { cameraTrajectory: e.target.value })
                    }
                    placeholder="z.B. Slow forward tracking shot"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                {/* Continuity Note */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Übergangs-Logik (Continuity Directive)
                  </label>
                  <input
                    type="text"
                    value={win.continuityNote}
                    onChange={(e) =>
                      onUpdateWindow(win.id, { continuityNote: e.target.value })
                    }
                    placeholder="z.B. Nahtloser Kamera-Schwung fortführen aus W1"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Connection Arrow between windows */}
            {idx < windows.length - 1 && (
              <div className="flex items-center justify-center py-1">
                <div className="flex items-center gap-2 text-xs text-amber-900 bg-amber-100 border border-amber-300 px-3.5 py-1 rounded-full font-mono font-bold shadow-xs">
                  <ArrowDown className="w-3.5 h-3.5 text-amber-700 animate-bounce" />
                  <span>
                    Kamera & Momentum-Weiterführung zu Window {idx + 2}
                  </span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Maestro Script Preview Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-slate-100 shadow-md">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>GENERATED MAESTRO TIMELINE CODE</span>
          <span>FORMAT: MINI-MAX H3 SEQUENCE</span>
        </div>
        <pre className="text-[11px] font-mono text-amber-300 p-3.5 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {generateScript()}
        </pre>
      </div>
    </div>
  );
};
