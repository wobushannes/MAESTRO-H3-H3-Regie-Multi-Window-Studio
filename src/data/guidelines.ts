export const PROMPTING_GUIDELINES = {
  minimaxOverview: {
    title: 'MiniMax H3 (Hailuo) Prompting-Regeln',
    subtitle: 'Die Goldene Formel für physikalisch konsistente KI-Videos',
    rules: [
      {
        title: 'Konkrete Physik & Verben statt Buzzwords',
        description: 'Vermeide vage Phrasen wie "hyperrealistic, 8k, photorealistic". Beschreibe stattdessen echte optische Eigenschaften: "Anamorphic lens flare, sharp focus on iris, visible pores, natural 24fps motion blur, volumetric dust motes".',
      },
      {
        title: 'Kamera-Trajektorien explizit steuern',
        description: 'MiniMax H3 reagiert extrem präzise auf Richtungsanweisungen. Verwende Fachbegriffe: "Slow dolly push-in", "Gimbal walkthrough", "360-degree orbit", "Low-angle crane sweep", "Macro 90mm focus".',
      },
      {
        title: 'Lichtquellen & Material-Reaktionen nennen',
        description: 'Benenne immer woher das Licht kommt: "Warm sunset rays piercing window blinds", "Chiaroscuro shadows", "Spark reflections on wet polished concrete".',
      },
      {
        title: 'Referenzbild-Tags ([IMAGE_1], [START_FRAME])',
        description: 'Wenn du Referenzbilder nutzt, platziere die Tags im Prompt dort, worauf sie sich beziehen, z.B. "[IMAGE_1: Subject] walks into the room defined in [IMAGE_2: Style]".',
      },
    ],
  },

  maestroWindows: {
    title: 'Maestro Window-Logik (Multi-Window Clip Stitching)',
    subtitle: 'Wie mehrere Zeitfenster zu einem durchgehenden Clip verbunden werden',
    explanation: 'In Maestro wird ein langer Clip oder ein komplexer Kamera-Cut aus mehreren Zeitfenstern (Windows) zusammengesetzt. Jedes Window definiert einen Zeitabschnitt (z.B. Window 1: 0-3s, Window 2: 3-6s, Window 3: 6-10s).',
    principles: [
      {
        title: 'Nahtlose Kamera-Kontinuität (Seamless Trajectory)',
        description: 'Wenn Window 1 mit einer Rechts-Kameradrehung endet, sollte Window 2 vermerken: "Seamless camera continuation from Window 1, maintaining rightward arc momentum".',
      },
      {
        title: 'Charakter- & Umgebungs-Persistenz',
        description: 'Halte Kleidung, Lichtstimmung und Gesichtsmerkmale über alle Windows identisch, damit Maestro keine Morphing-Artefakte erzeugt.',
      },
      {
        title: 'Schnitt-Techniken in Maestro',
        description: 'Nutze "Match Cut", "Whip Pan Transition" oder "Dolly Zoom Transition" an den Fenstergrenzen für flüssige Cuts.',
      },
    ],
    exampleScript: `// Maestro Timeline Script (3 Windows / 9 Sekunden)
[SEQUENCE_START]
Target_Engine: MiniMax_H3 / Hailuo_2.1
Aspect_Ratio: 16:9
Frame_Rate: 24fps

[WINDOW_1 (0s - 3s)]
Prompt: A modern luxury penthouse living room at sunset. Smooth floating gimbal shot moving forward past a plush white sofa toward floor-to-ceiling panoramic glass windows.
Camera: Forward Gimbal Glide (Velocity: 1.2m/s)
Lighting: Golden Hour Sunbeams
Reference: [IMAGE_1: Interior]

[WINDOW_2 (3s - 6s) - SEAMLESS CONTINUATION]
Prompt: Continuing the forward gimbal motion seamlessly from Window 1, camera crosses the threshold onto the outdoor teak balcony overlooking the glowing city skyline.
Camera: Forward Glide -> Slow Pan Right
Lighting: Twilight Horizon Glow

[WINDOW_3 (6s - 9s) - RESOLUTION]
Prompt: The camera locks onto an infinity pool reflecting the glowing sunset sky while champagne bubbles rise in a crystal glass on the outdoor table in close-up.
Camera: Slow Tilt Down to Macro Table Details
Lighting: Warm LED Pool Spotlights
[SEQUENCE_END]`,
  },

  nsfwGuidelines: {
    title: 'NSFW & Mature Content Phrasing-Strategie',
    subtitle: 'Wie du düstere Horror-, Gore- & Erwachsenen-Themen filter-sicher ausdrückst',
    intro: 'MiniMax H3 besitzt Sicherheitsfilter für stumpfe Gewalt oder explizite Inhalte. Durch die Verwendung von ästhetischen, anatomischen und kinoreifen Fachbegriffen kannst du jedoch maximale Intensität erzielen, ohne False-Positive-Blocks auszulösen.',
    strategies: [
      {
        concept: 'Horror & Blut / Body Horror',
        directWord: 'Blut, Gedärme, Gliedmaßen abhacken',
        cinematicBypass: 'visceral dark crimson patina, wet glistening anatomical textures, gothic blood-tinted reflections, dramatic body-horror mutation, macabre aesthetic',
      },
      {
        concept: 'Sinnlichkeit & Romanze',
        directWord: 'Nacktheit, Explizit',
        cinematicBypass: 'seductive silhouetted contours, intimate skin sheen highlights, sensual dark romance aesthetic, elegant shadow play across shoulders',
      },
      {
        concept: 'Dystopische Brutalität & Kampf',
        directWord: 'Gewalt, Massaker',
        cinematicBypass: 'unfiltered visceral combat patina, chaotic battle dust, raw gritty apocalyptic energy, intense dark-fantasy confrontation',
      },
    ],
    tips: [
      'Nutze immer den Kontext von Kunst, Gothic-Ästhetik oder Kinofilmen ("gothic dark fantasy art", "cinematic chiaroscuro").',
      'Vermeide isolierte Schockwörter; betone Materialien und Licht ("glistening damp surface", "iridescent dark fluid").',
      'Wenn MiniMax dennoch einen Block meldet, ersetze das Hauptverb durch eine visuelle Texturbeschreibung.',
    ],
  },
};
