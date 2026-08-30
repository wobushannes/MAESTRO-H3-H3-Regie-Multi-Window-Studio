import {
  PovFootstepsType,
  PovBreathVaporType,
  PovHandsType,
  PovWeatherImmersionType,
  PovRigType,
  PovKineticType,
  PromptBuildState,
  PresetTemplate,
} from '../types';

export interface CategoryPovConfig {
  kineticProfile: PovKineticType;
  profileNameDe: string;
  profileNameEn: string;
  cameraMotion: string;
  headBobIntensity:
    | 'high_stalk'
    | 'zero_glide'
    | 'sprint_adrenaline'
    | 'subtle_seated'
    | 'heavy_bootfall'
    | 'natural_stride'
    | 'velvet_smooth'
    | 'sensual_drift'
    | 'tactical_jolt'
    | 'hud_locked'
    | 'dynamic_snap';
  verticalDisplacement: string;
  gazeDriftBehavior: string;
  povRigType: PovRigType;
  povFootsteps: PovFootstepsType;
  povBreathVapor: PovBreathVaporType;
  povInteractiveHands: PovHandsType;
  povWeatherImmersion: PovWeatherImmersionType;
  povVisceralAudio: boolean;
  multiWindowTrajectories: [string, string, string, string];
  physicsValidationRule: string;
}

export interface PovKineticPresetOption {
  id: PovKineticType;
  categoryMatch: string;
  labelDe: string;
  labelEn: string;
  badge: string;
  displacement: string;
  intensity: string;
  descriptionDe: string;
  descriptionEn: string;
  cameraMotion: string;
}

/**
 * 🎯 Definitive validated POV Kinetics configurations for every single template category.
 * Enforces physics-accurate camera_motion parameters to eliminate the AI diffusion model POV perception problem.
 */
export const CATEGORY_POV_CONFIGS: Record<string, CategoryPovConfig> = {
  birthday: {
    kineticProfile: 'birthday_serenade_sway',
    profileNameDe: 'First-Person Serenade & Birthday Sway (Geburtstage & Ständchen)',
    profileNameEn: 'First-Person Serenade & Birthday Sway (Birthdays & Serenades)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (BIRTHDAY SEATED SERENADE SWAY): Filmed strictly from the direct eye-level perspective of the celebrated birthday person (Picture 1 seated in front of cake and candles), looking forward as an enthusiastic ensemble of male musicians (Pictures 2-4) leans into frame, passionately singing and performing directly to camera; subtle organic seated head-sway (±2cm vertical/lateral rhythmic musical bob), celebratory clinking of glasses in lower peripheral frame, and warm golden candle reflections.',
    headBobIntensity: 'subtle_seated',
    verticalDisplacement: '±2cm festive musical sway',
    gazeDriftBehavior: 'Affectionate eye-level gaze tracking singing musicians and glowing cake candles',
    povRigType: 'human_eyes',
    povFootsteps: 'smooth_gimbal',
    povBreathVapor: 'none',
    povInteractiveHands: 'party_celebration',
    povWeatherImmersion: 'none',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person POV of the birthday guest sitting before candlelit cake as the male singers step into frame.',
      'First-Person close gaze tilt across the musical instruments as the frontman belts out the vocal serenade.',
      'First-Person panoramic side-to-side gaze capturing synchronized band performance and smiling singer faces.',
      'First-Person celebratory slight upward tilt as singers raise their glasses for a final joyous birthday toast.',
    ],
    physicsValidationRule:
      'Verankert die Kamera zwingend in den Augen des Geburtstagskinds (Picture 1), während die singenden Männer (Pictures 2-4) direkt in die Kameralinse musizieren.',
  },

  horror: {
    kineticProfile: 'horror_head_bob_stalk',
    profileNameDe: 'First-Person Head-Bob & Stalking Dips (Horror)',
    profileNameEn: 'First-Person Head-Bob & Stalking Dips (Horror)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (HEAD-BOB STALKING): Unsteady eye-level handheld subjective perspective with tense rhythmic footstep head-bob (±4cm vertical displacement dip per step), trembling organic micro-stepping deceleration, sharp reactive 90-degree gaze tilts into shadowy corners, and flashlight beam slicing through floating dust motes in lower frame.',
    headBobIntensity: 'high_stalk',
    verticalDisplacement: '±4cm organic stalking dip',
    gazeDriftBehavior: 'Sharp reactive glance-tilts into shadows and trembling focal breathing',
    povRigType: 'human_eyes',
    povFootsteps: 'sneaking_stalk',
    povBreathVapor: 'cold_vapor',
    povInteractiveHands: 'holding_flashlight',
    povWeatherImmersion: 'dust_grit',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person tense stalking entry with rhythmic footstep head-bob (±4cm dip) and shaky flashlight illumination.',
      'First-Person close-range macro glance tilting downward, trembling hand adjusting flashlight focus on ground clues.',
      'Sudden rapid 120-degree First-Person head-snap to the left as darkness shifts in peripheral vision.',
      'Slow First-Person backward creeping retreat with breath-locked camera stability and dying flashlight beam.',
    ],
    physicsValidationRule:
      'Ersetzt statische Kameras durch physische Stalking-Schritt-Kinetik mit messbarem Head-Bob, um klaustrophobische Ich-Perspektive für Diffusionsmodelle zwingend zu verankern.',
  },

  immobilien: {
    kineticProfile: 'immobilien_static_glide',
    profileNameDe: 'First-Person Static-Glide & Stabilized Walkthrough (Immobilien)',
    profileNameEn: 'First-Person Static-Glide & Stabilized Walkthrough (Real Estate)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (STATIC-GLIDE): Ultra-smooth floating eye-level steadycam walkthrough (0cm vertical bob, locked level horizon) gliding effortlessly through room thresholds and architectural spaces with serene 90-degree panning gaze capturing ceiling heights, luxury finishes, and sunlit window lines.',
    headBobIntensity: 'zero_glide',
    verticalDisplacement: '0cm stabilized zero-bob glide',
    gazeDriftBehavior: 'Smooth architectural sweep and panoramic floor-to-ceiling gaze drift',
    povRigType: 'human_eyes',
    povFootsteps: 'smooth_gimbal',
    povBreathVapor: 'none',
    povInteractiveHands: 'real_estate_keys',
    povWeatherImmersion: 'none',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person ultra-smooth static-glide entering through the modern foyer with locked level horizon.',
      'First-Person seamless steadycam walkthrough gliding into the living area and sunlit open space.',
      'First-Person fluid 90-degree orbital gaze pan scanning panoramic floor-to-ceiling glass windows.',
      'First-Person slow elevated pull-back glide revealing open terrace vistas and luxury architecture.',
    ],
    physicsValidationRule:
      'Verhindert unruhiges Wackeln und erzwingt einen perfekten kardanischen Static-Glide, sodass Architektur, Deckenhöhen und Edel-Materialien wie in einer professionellen 4K-Begehung wirken.',
  },

  action: {
    kineticProfile: 'action_sprint_vibration',
    profileNameDe: 'First-Person Sprint-Bob & Velocity Vibration (Action)',
    profileNameEn: 'First-Person Sprint-Bob & Velocity Vibration (Action)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (HIGH-VELOCITY SPRINT): GoPro chest-mount perspective with aggressive sprinting head-bob kinetics (±8cm rapid vertical displacement), body-stride angular tilt on rapid turns, heavy footfall ground-impact vibration, and motion-blurred peripheral vision.',
    headBobIntensity: 'sprint_adrenaline',
    verticalDisplacement: '±8cm high-speed vertical bounce',
    gazeDriftBehavior: 'Velocity-locked forward horizon with rapid reactive gaze adjustments',
    povRigType: 'gopro_chest',
    povFootsteps: 'running_sprint',
    povBreathVapor: 'heavy_panting',
    povInteractiveHands: 'driving_steering',
    povWeatherImmersion: 'heat_mirage_sweat',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'High-speed First-Person sprint acceleration with violent vertical head-bob (±8cm) and ground impact vibrations.',
      'First-Person high-velocity corner slide with 35-degree body lean and motion-blurred peripheral obstacles.',
      'First-Person reactive obstacle hurdle with momentary zero-G float followed by heavy landing ground impact.',
      'Rapid First-Person sprint deceleration settling into tense chest-heaving eye-level survey.',
    ],
    physicsValidationRule:
      'Erzwingt hohe vertikale Schritt-Frequenzen und Trägheits-Neigung, um kinetische Geschwindigkeit ohne statische Außenansichten darzustellen.',
  },

  restaurant: {
    kineticProfile: 'restaurant_seated_glide',
    profileNameDe: 'First-Person Culinary Seated Glide & Macro Table Tilt (Restaurant)',
    profileNameEn: 'First-Person Culinary Seated Glide & Macro Table Tilt (Restaurant)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (CULINARY SEATED GLIDE): Intimate eye-level perspective with gentle seated torso-lean glide towards table surface (±1.5cm subtle micro-shift), steady downward 45-degree macro gaze tilt onto sizzling gourmet dishes, and polished silverware entering lower frame.',
    headBobIntensity: 'subtle_seated',
    verticalDisplacement: '±1.5cm gentle torso-lean',
    gazeDriftBehavior: 'Downward 45-degree sensory focus onto culinary textures and rising steam',
    povRigType: 'human_eyes',
    povFootsteps: 'smooth_gimbal',
    povBreathVapor: 'steam_haze',
    povInteractiveHands: 'dining_cutlery',
    povWeatherImmersion: 'none',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person gentle seated glide approaching the dining table with fine cutlery entering lower third.',
      'First-Person 45-degree downward macro gaze tilt focusing on delicate sauce plating and rising steam.',
      'First-Person micro-lean forward lifting a crystal glass with soft optical focal breathing.',
      'First-Person slow serene gaze elevation surveying the warm ambient candlelight restaurant interior.',
    ],
    physicsValidationRule:
      'Erzwingt den 45-Grad-Tischnahen Blickwinkel und subtile Vorwärtsneigung der Sitzposition statt anonymer Raumtotale.',
  },

  bau: {
    kineticProfile: 'bau_heavy_tread_bounce',
    profileNameDe: 'First-Person Heavy-Tread & Helmet-Cam Bounce (Bau / Handwerk)',
    profileNameEn: 'First-Person Heavy-Tread & Helmet-Cam Bounce (Construction)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (INDUSTRIAL RIG): Rugged helmet-cam perspective with deliberate heavy-bootstep cadence (±5cm vertical downward dip on foot impact), micro-jolt resonance on steel/concrete surfaces, upward gaze tilt checking structural alignments, and heavy-duty gloved hands operating equipment in foreground.',
    headBobIntensity: 'heavy_bootfall',
    verticalDisplacement: '±5cm heavy-boot downward jolt',
    gazeDriftBehavior: 'Precision structural checks and upward structural scans',
    povRigType: 'action_helmet',
    povFootsteps: 'heavy_tread',
    povBreathVapor: 'none',
    povInteractiveHands: 'craft_tools',
    povWeatherImmersion: 'dust_grit',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person heavy boot-step progression across raw industrial floor with ±5cm helmet-mount downward dips.',
      'First-Person precision gaze tilt downward as heavy leather-gloved hands deploy laser leveling tool.',
      'First-Person upward 75-degree gaze sweep inspecting high structural steel beams and crane movement.',
      'First-Person steady forward stride through finished corridor with industrial sparks catching lens peripheral.',
    ],
    physicsValidationRule:
      'Simuliert die träge Masse von Sicherheitsschuhen und Helm-Kameras durch ruckartige Mikrostöße beim Auftreten.',
  },

  handwerk: {
    kineticProfile: 'bau_heavy_tread_bounce',
    profileNameDe: 'First-Person Heavy-Tread & Helmet-Cam Bounce (Bau / Handwerk)',
    profileNameEn: 'First-Person Heavy-Tread & Helmet-Cam Bounce (Construction)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (INDUSTRIAL RIG): Rugged helmet-cam perspective with deliberate heavy-bootstep cadence (±5cm vertical downward dip on foot impact), micro-jolt resonance on steel/concrete surfaces, upward gaze tilt checking structural alignments, and heavy-duty gloved hands operating equipment in foreground.',
    headBobIntensity: 'heavy_bootfall',
    verticalDisplacement: '±5cm heavy-boot downward jolt',
    gazeDriftBehavior: 'Precision structural checks and upward structural scans',
    povRigType: 'action_helmet',
    povFootsteps: 'heavy_tread',
    povBreathVapor: 'none',
    povInteractiveHands: 'craft_tools',
    povWeatherImmersion: 'dust_grit',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person heavy boot-step progression across raw industrial floor with ±5cm helmet-mount downward dips.',
      'First-Person precision gaze tilt downward as heavy leather-gloved hands deploy laser leveling tool.',
      'First-Person upward 75-degree gaze sweep inspecting high structural steel beams and crane movement.',
      'First-Person steady forward stride through finished corridor with industrial sparks catching lens peripheral.',
    ],
    physicsValidationRule:
      'Simuliert die träge Masse von Sicherheitsschuhen und Helm-Kameras durch ruckartige Mikrostöße beim Auftreten.',
  },

  nature: {
    kineticProfile: 'nature_stride_sway',
    profileNameDe: 'First-Person Trail Stride & Organic Sway (Natur & Reisen)',
    profileNameEn: 'First-Person Trail Stride & Organic Sway (Nature & Travel)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (OUTDOOR TRAIL): Organic human eye-level stride with natural rhythmic walking bob (±3cm vertical gait cycle), gentle left-to-right lateral weight-shift sway on rugged trail terrain, and expansive panoramic horizon gaze sweeps.',
    headBobIntensity: 'natural_stride',
    verticalDisplacement: '±3cm natural walking stride',
    gazeDriftBehavior: 'Expansive panoramic horizon sweeps with organic depth drift',
    povRigType: 'human_eyes',
    povFootsteps: 'walking_bob',
    povBreathVapor: 'auto',
    povInteractiveHands: 'outdoor_adventure',
    povWeatherImmersion: 'auto',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person organic trail walking stride with rhythmic ±3cm head-bob and trekking poles entering frame.',
      'First-Person slow panoramic gaze pan across alpine ridgelines and sunlit forest canopies.',
      'First-Person gentle descent along winding mountain path with lateral weight-shift sway.',
      'First-Person horizon-locked resting pause looking out at the majestic sunset vista.',
    ],
    physicsValidationRule:
      'Verankert die natürliche Gewichtsverlagerung des menschlichen Gangs im unebenen Gelände.',
  },

  travel: {
    kineticProfile: 'nature_stride_sway',
    profileNameDe: 'First-Person Trail Stride & Organic Sway (Natur & Reisen)',
    profileNameEn: 'First-Person Trail Stride & Organic Sway (Nature & Travel)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (OUTDOOR TRAIL): Organic human eye-level stride with natural rhythmic walking bob (±3cm vertical gait cycle), gentle left-to-right lateral weight-shift sway on rugged trail terrain, and expansive panoramic horizon gaze sweeps.',
    headBobIntensity: 'natural_stride',
    verticalDisplacement: '±3cm natural walking stride',
    gazeDriftBehavior: 'Expansive panoramic horizon sweeps with organic depth drift',
    povRigType: 'human_eyes',
    povFootsteps: 'walking_bob',
    povBreathVapor: 'auto',
    povInteractiveHands: 'outdoor_adventure',
    povWeatherImmersion: 'auto',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person organic trail walking stride with rhythmic ±3cm head-bob and trekking poles entering frame.',
      'First-Person slow panoramic gaze pan across alpine ridgelines and sunlit forest canopies.',
      'First-Person gentle descent along winding mountain path with lateral weight-shift sway.',
      'First-Person horizon-locked resting pause looking out at the majestic sunset vista.',
    ],
    physicsValidationRule:
      'Verankert die natürliche Gewichtsverlagerung des menschlichen Gangs im unebenen Gelände.',
  },

  fashion: {
    kineticProfile: 'fashion_velvet_glide',
    profileNameDe: 'First-Person Velvet Runway Glide & Haute Couture Pan (Fashion)',
    profileNameEn: 'First-Person Velvet Runway Glide & Haute Couture Pan (Fashion)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (VELVET GLIDE): Silky-smooth floating eye-level steadycam trajectory with 0cm jitter, graceful forward tracking through high-fashion runway environments, fluid shoulder-height pivots, and luxury tactile hands inspecting fine fabric textures.',
    headBobIntensity: 'velvet_smooth',
    verticalDisplacement: '0cm frictionless floating tracking',
    gazeDriftBehavior: 'Editorial gaze sweep capturing silhouettes, fabric drape, and lighting',
    povRigType: 'human_eyes',
    povFootsteps: 'smooth_gimbal',
    povBreathVapor: 'none',
    povInteractiveHands: 'fashion_luxury',
    povWeatherImmersion: 'none',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person velvet-smooth forward glide along the glossy runway floor with zero vertical jitter.',
      'First-Person macro gaze sweep tilting across couture textures, embroidery, and shimmering satin fabric.',
      'First-Person elegant 60-degree pivot capturing dynamic strobe lighting and silhouette reflections.',
      'First-Person slow elevated pull-back settling into wide theatrical runway composition.',
    ],
    physicsValidationRule:
      'Eliminiert jegliche Erschütterung und etabliert eine schwebende Haute-Couture-Eleganz.',
  },

  erotik: {
    kineticProfile: 'erotik_sensual_breath_drift',
    profileNameDe: 'First-Person Breath-Synchronized Slow Drift (Sinnlich & Erotik)',
    profileNameEn: 'First-Person Breath-Synchronized Slow Drift (Sensual Art)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (SENSUAL DRIFT): Hyper-intimate macro eye-level drift with gentle breath-synchronized micro-sway (±1cm rhythmic breathing modulation), zero abrupt or mechanical movements, delicate downward gaze caress across satin textures, and warm candlelight reflections.',
    headBobIntensity: 'sensual_drift',
    verticalDisplacement: '±1cm breath-synced micro-sway',
    gazeDriftBehavior: 'Slow languid gaze caress along body contours and silk textures',
    povRigType: 'human_eyes',
    povFootsteps: 'smooth_gimbal',
    povBreathVapor: 'frost_whisper',
    povInteractiveHands: 'sensual_touch',
    povWeatherImmersion: 'none',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person intimate macro drift gliding slowly across smooth satin sheets with gentle breath-synced micro-sway.',
      'First-Person slow downward gaze caress tracking soft golden candlelight contours along skin textures.',
      'First-Person delicate forward lean as hands gently caress luxurious velvet fabrics in lower frame.',
      'First-Person languid pull-back drifting into serene warm twilight shadow play.',
    ],
    physicsValidationRule:
      'Koppelt die Kamerabewegung an den Atemrhythmus (±1cm Mikrobewegung) für maximale sinnliche Intimität.',
  },

  war: {
    kineticProfile: 'war_combat_bodycam_jolt',
    profileNameDe: 'First-Person Combat Bodycam Jolt & Low-Crouch Shuffle (War)',
    profileNameEn: 'First-Person Combat Bodycam Jolt & Low-Crouch Shuffle (War)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (TACTICAL BODYCAM): High-contrast tactical chest bodycam perspective with realistic ground-stride vibrations, low-crouch rapid forward shuffle (±6cm irregular impact dips), sharp peripheral perimeter checks, and weathered tactical gloves bracing equipment in lower third.',
    headBobIntensity: 'tactical_jolt',
    verticalDisplacement: '±6cm irregular tactical jolt',
    gazeDriftBehavior: 'Rapid 90-degree corner checks and perimeter scanning snaps',
    povRigType: 'police_bodycam',
    povFootsteps: 'heavy_tread',
    povBreathVapor: 'heavy_panting',
    povInteractiveHands: 'tactical_gripping',
    povWeatherImmersion: 'dust_grit',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person tactical low-crouch entry with rapid ±6cm bodycam impact jolts and dust motes.',
      'First-Person sharp 90-degree corner sweep with tactical gloved hands bracing doorway threshold.',
      'First-Person rapid sprint dash across open courtyard with intense ground-impact vibration.',
      'First-Person defensive kneel behind cover with heavy panting breath vapor rising in front of lens.',
    ],
    physicsValidationRule:
      'Simuliert die typische militärische Körperkamera mit unregelmäßigen Schock-Vibrationen bei Deckungswechseln.',
  },

  scify: {
    kineticProfile: 'scifi_hud_level_flight',
    profileNameDe: 'First-Person Cybernetic HUD Level Flight & Saccadic Glances (Sci-Fi)',
    profileNameEn: 'First-Person Cybernetic HUD Level Flight & Saccadic Glances (Sci-Fi)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (CYBERNETIC HUD): Smart glasses / ocular implant perspective with gyro-stabilized level-flight tracking, crisp saccadic micro-glances snapping between holographic telemetry data points, and cybernetic hands interacting with floating UI nodes.',
    headBobIntensity: 'hud_locked',
    verticalDisplacement: '0cm gyroscopic ocular lock',
    gazeDriftBehavior: 'Snappy mechanical saccades and biometric focus locks',
    povRigType: 'smart_glasses',
    povFootsteps: 'smooth_gimbal',
    povBreathVapor: 'steam_haze',
    povInteractiveHands: 'scifi_hologram',
    povWeatherImmersion: 'none',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person gyroscopically locked forward flight through futuristic corridor with cyan HUD telemetry overlay.',
      'First-Person snappy saccadic gaze lock onto glowing holographic terminal with cybernetic hand interacting.',
      'First-Person smooth orbital head-turn tracking hyperdrive reactor charging sequence.',
      'First-Person level-horizon gaze looking out of the massive bridge viewport into glowing deep space.',
    ],
    physicsValidationRule:
      'Simuliert kybernetische Augenimplantate mit digitaler Stabilisierung und ruckartigen Blicksprüngen.',
  },

  cyberpunk: {
    kineticProfile: 'scifi_hud_level_flight',
    profileNameDe: 'First-Person Cybernetic HUD Level Flight & Saccadic Glances (Cyberpunk)',
    profileNameEn: 'First-Person Cybernetic HUD Level Flight & Saccadic Glances (Cyberpunk)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (CYBERNETIC HUD): Smart glasses / ocular implant perspective with gyro-stabilized level-flight tracking, crisp saccadic micro-glances snapping between holographic telemetry data points, and cybernetic hands interacting with floating UI nodes.',
    headBobIntensity: 'hud_locked',
    verticalDisplacement: '0cm gyroscopic ocular lock',
    gazeDriftBehavior: 'Snappy mechanical saccades and biometric focus locks',
    povRigType: 'smart_glasses',
    povFootsteps: 'smooth_gimbal',
    povBreathVapor: 'steam_haze',
    povInteractiveHands: 'scifi_hologram',
    povWeatherImmersion: 'none',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person gyroscopically locked forward flight through neon-lit alley with cyan HUD telemetry overlay.',
      'First-Person snappy saccadic gaze lock onto glowing holographic terminal with cybernetic hand interacting.',
      'First-Person smooth orbital head-turn tracking neon rain reflections and flying spinner vehicles.',
      'First-Person level-horizon gaze looking out of high-rise apartment into cyberpunk cityscape.',
    ],
    physicsValidationRule:
      'Simuliert kybernetische Augenimplantate mit digitaler Stabilisierung und ruckartigen Blicksprüngen.',
  },

  sitcom: {
    kineticProfile: 'sitcom_eye_level_drift',
    profileNameDe: 'First-Person Conversational Eye-Level Drift (Sitcom / Comedy)',
    profileNameEn: 'First-Person Conversational Eye-Level Drift (Sitcom / Comedy)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (CONVERSATIONAL DRIFT): Natural seated and standing eye-level perspective with relaxed conversational torso swivels, smooth tracking across apartment spaces, and casual hands gesturing with a coffee mug in the lower frame.',
    headBobIntensity: 'subtle_seated',
    verticalDisplacement: '±2cm natural standing weight-shift',
    gazeDriftBehavior: 'Natural head-turn glances following comedy partner dialogue',
    povRigType: 'human_eyes',
    povFootsteps: 'smooth_gimbal',
    povBreathVapor: 'none',
    povInteractiveHands: 'sitcom_coffee',
    povWeatherImmersion: 'none',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person casual entrance through apartment door holding a steaming coffee mug in lower frame.',
      'First-Person natural conversational torso swivel turning towards couch and comedy co-star.',
      'First-Person reactive head-tilt listening to funny dialogue with subtle nodding motion.',
      'First-Person relaxed seated drift settling onto sofa with warm sitcom living room lighting.',
    ],
    physicsValidationRule:
      'Erzeugt authentische menschliche Dialog-Blickwechsel ohne künstliche Kamera-Akrobatik.',
  },

  comic: {
    kineticProfile: 'comic_paper_snap_track',
    profileNameDe: 'First-Person Vector Snap-Pan & Paper Grid Tracking (Comic / Stickman)',
    profileNameEn: 'First-Person Vector Snap-Pan & Paper Grid Tracking (Comic / Stickman)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (VECTOR TRACKING): High-speed subjective 2D/3D tracking camera panning with snappy kinematic accelerations across paper textures and whiteboard grids, cursor-aligned camera follow, and stylized cartoon hands interacting in lower third.',
    headBobIntensity: 'dynamic_snap',
    verticalDisplacement: 'Dynamic snappish 2D tracking jumps',
    gazeDriftBehavior: 'Snap-pan tracking locked to high-velocity action',
    povRigType: 'smart_glasses',
    povFootsteps: 'walking_bob',
    povBreathVapor: 'none',
    povInteractiveHands: 'holding_equipment',
    povWeatherImmersion: 'none',
    povVisceralAudio: false,
    multiWindowTrajectories: [
      'First-Person snappy 2D vector pan tracking stick figures dashing across clean paper grid.',
      'First-Person rapid macro zoom into hand-drawn battle clash with cartoon impact stars.',
      'First-Person dynamic camera whip tracking stickman parkour jump over drawn obstacles.',
      'First-Person wide paper overview pull-back with artist pencil resting at edge of frame.',
    ],
    physicsValidationRule:
      'Optimiert für 2D-Zeichnungen und Strichmännchen-Kinetik mit messerscharfen Snap-Pans.',
  },

  politics: {
    kineticProfile: 'politics_dignitary_glide',
    profileNameDe: 'First-Person Dignitary Podium & Press Corridor Glide (Politik)',
    profileNameEn: 'First-Person Dignitary Podium & Press Corridor Glide (Politics)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (DIGNITARY GLIDE): Stately, deliberate eye-level forward procession stride through marble halls and towards the speaking podium with gyro-stabilized horizon, slow dignified head-turns towards audience, and flashbulb reflections catching peripheral vision.',
    headBobIntensity: 'velvet_smooth',
    verticalDisplacement: '±1.5cm stately slow-motion stride',
    gazeDriftBehavior: 'Dignified wide-angle gaze sweep taking in press corps and podium',
    povRigType: 'human_eyes',
    povFootsteps: 'smooth_gimbal',
    povBreathVapor: 'none',
    povInteractiveHands: 'casual_holding',
    povWeatherImmersion: 'none',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person stately forward procession stride through grand marble Capitol corridor with flashbulb flares.',
      'First-Person slow dignified head-turn nodding towards seated delegates with level horizon.',
      'First-Person approach to wooden speaking podium with hands resting confidently on speech notes.',
      'First-Person wide gaze elevation overlooking cheering stadium audience under bright floodlights.',
    ],
    physicsValidationRule:
      'Simuliert die gravitätische, langsame Schrittgeschwindigkeit von Staatsgästen und Rednern.',
  },

  fantasy: {
    kineticProfile: 'fantasy_mythical_stride',
    profileNameDe: 'First-Person Mythical Explorer Stride & Temple Gaze (Fantasy)',
    profileNameEn: 'First-Person Mythical Explorer Stride & Temple Gaze (Fantasy)',
    cameraMotion:
      'TRUE FIRST-PERSON POV (MYTHICAL STRIDE): Atmospheric explorer eye-level walking cadence with organic vertical gait bob (±3cm), slow awe-inspired upward gaze tilts sweeping across colossal ancient monuments and glowing mystical particles, and tactile hands holding ancient relics in foreground.',
    headBobIntensity: 'natural_stride',
    verticalDisplacement: '±3cm organic explorer gait',
    gazeDriftBehavior: 'Awe-inspired upward tilts towards colossal mythical architecture',
    povRigType: 'human_eyes',
    povFootsteps: 'walking_bob',
    povBreathVapor: 'auto',
    povInteractiveHands: 'holding_equipment',
    povWeatherImmersion: 'auto',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person atmospheric explorer stride entering ancient ruined temple with rhythmic ±3cm walking bob.',
      'First-Person awe-inspired 60-degree upward gaze tilt taking in towering glowing stone statues.',
      'First-Person gentle forward step as glowing mystical runes reflect in crystalline lens flares.',
      'First-Person horizon-locked gaze overlooking vast mythical valley with floating celestial islands.',
    ],
    physicsValidationRule:
      'Verknüpft Schritt-Kinetik mit langsamen, ehrfurchtsvollen Aufwärts-Schwenks auf kolossale Bauten.',
  },

  immersive: {
    kineticProfile: 'action_sprint_vibration',
    profileNameDe: 'First-Person Action Sprint & Bodycam Immersion',
    profileNameEn: 'First-Person Action Sprint & Bodycam Immersion',
    cameraMotion:
      'TRUE FIRST-PERSON POV: Dynamic chest-mount GoPro rig with organic body-stride head-bob kinetics (±5cm vertical displacement), realistic ground-impact vibration, and tactile visible hands in lower frame.',
    headBobIntensity: 'sprint_adrenaline',
    verticalDisplacement: '±5cm dynamic sprint/walk bob',
    gazeDriftBehavior: 'High-immersion forward focus with peripheral motion blur',
    povRigType: 'gopro_chest',
    povFootsteps: 'walking_bob',
    povBreathVapor: 'auto',
    povInteractiveHands: 'holding_equipment',
    povWeatherImmersion: 'auto',
    povVisceralAudio: true,
    multiWindowTrajectories: [
      'First-Person immersive forward stride with rhythmic footsteps head-bob and wide field of view.',
      'First-Person macro interaction with environmental objects in foreground.',
      'First-Person dynamic perspective shift capturing rapid ambient movement.',
      'First-Person slow pull-back settling into expansive horizon view.',
    ],
    physicsValidationRule:
      'Master-Standard für unverfälschtes 100%iges First-Person-POV.',
  },
};

/**
 * 🔍 Returns the validated POV configuration for any category or title
 */
export function getCategoryPovDefaults(category?: string, subCategoryOrTitle?: string): CategoryPovConfig {
  const cat = (category || 'immersive').toLowerCase().trim();
  const title = (subCategoryOrTitle || '').toLowerCase();

  // Keyword overrides
  if (title.includes('geburtstag') || title.includes('birthday') || title.includes('ständchen') || title.includes('serenade')) {
    return CATEGORY_POV_CONFIGS.birthday;
  }
  if (title.includes('horror') || title.includes('haunted') || title.includes('stalk') || title.includes('dread')) {
    return CATEGORY_POV_CONFIGS.horror;
  }
  if (title.includes('villa') || title.includes('penthouse') || title.includes('immobil') || title.includes('floorplan') || title.includes('grundriss') || title.includes('apartment')) {
    return CATEGORY_POV_CONFIGS.immobilien;
  }
  if (title.includes('sprint') || title.includes('race') || title.includes('chase') || title.includes('verfolgung') || title.includes('stunt')) {
    return CATEGORY_POV_CONFIGS.action;
  }
  if (title.includes('food') || title.includes('pizza') || title.includes('steak') || title.includes('gourmet') || title.includes('restaurant') || title.includes('cooking')) {
    return CATEGORY_POV_CONFIGS.restaurant;
  }
  if (title.includes('construction') || title.includes('baustelle') || title.includes('welder') || title.includes('schweißen') || title.includes('handwerk')) {
    return CATEGORY_POV_CONFIGS.bau;
  }
  if (title.includes('erotik') || title.includes('boudoir') || title.includes('sensual') || title.includes('intimate') || title.includes('candlelight')) {
    return CATEGORY_POV_CONFIGS.erotik;
  }

  // Exact category lookup
  if (CATEGORY_POV_CONFIGS[cat]) {
    return CATEGORY_POV_CONFIGS[cat];
  }

  // Alias lookups
  if (cat.includes('horror')) return CATEGORY_POV_CONFIGS.horror;
  if (cat.includes('immob') || cat.includes('estate') || cat.includes('architektur')) return CATEGORY_POV_CONFIGS.immobilien;
  if (cat.includes('action') || cat.includes('car') || cat.includes('speed')) return CATEGORY_POV_CONFIGS.action;
  if (cat.includes('food') || cat.includes('restaurant') || cat.includes('koch')) return CATEGORY_POV_CONFIGS.restaurant;
  if (cat.includes('bau') || cat.includes('handwerk') || cat.includes('craft')) return CATEGORY_POV_CONFIGS.bau;
  if (cat.includes('nature') || cat.includes('natur') || cat.includes('travel') || cat.includes('reise')) return CATEGORY_POV_CONFIGS.nature;
  if (cat.includes('fashion') || cat.includes('mode') || cat.includes('luxury') || cat.includes('lingerie') || cat.includes('unterwäsche')) return CATEGORY_POV_CONFIGS.fashion;
  if (cat.includes('erot') || cat.includes('sensual') || cat.includes('sex')) return CATEGORY_POV_CONFIGS.erotik;
  if (cat.includes('war') || cat.includes('krieg') || cat.includes('soldier')) return CATEGORY_POV_CONFIGS.war;
  if (cat.includes('scify') || cat.includes('sci-fi') || cat.includes('cyber')) return CATEGORY_POV_CONFIGS.scify;
  if (cat.includes('sitcom') || cat.includes('comedy')) return CATEGORY_POV_CONFIGS.sitcom;
  if (cat.includes('comic') || cat.includes('stickman')) return CATEGORY_POV_CONFIGS.comic;
  if (cat.includes('polit')) return CATEGORY_POV_CONFIGS.politics;
  if (cat.includes('fant')) return CATEGORY_POV_CONFIGS.fantasy;

  return CATEGORY_POV_CONFIGS.immersive;
}

/**
 * 🛡️ Enforces category-validated POV kinetics on a PromptBuildState or Template.
 * Guarantees that camera_motion is replaced with the physically correct kinetic parameters.
 */
export function enforceCategoryPovKinetics<T extends Partial<PromptBuildState | PresetTemplate>>(
  stateOrTpl: T,
  category?: string,
  forcePov?: boolean
): T {
  const cat = category || (stateOrTpl as any).category || 'immersive';
  const config = getCategoryPovDefaults(cat, (stateOrTpl as any).title || (stateOrTpl as any).rawConcept);

  const shouldEnforcePov =
    forcePov !== undefined
      ? forcePov
      : Boolean(
          stateOrTpl.isImmersivePov ||
          cat === 'immersive' ||
          /first-person|ego-perspektive|pov|head-bob|bodycam|chest-mount/i.test(
            (stateOrTpl as any).cameraMotion || (stateOrTpl as any).camera || ''
          )
        );

  if (!shouldEnforcePov) {
    return {
      ...stateOrTpl,
      isImmersivePov: false,
    };
  }

  const result: any = {
    ...stateOrTpl,
    isImmersivePov: true,
    povKineticProfile: config.kineticProfile,
    povVerticalDisplacement: config.verticalDisplacement,
    povRigType: config.povRigType,
    povFootsteps: config.povFootsteps,
    povBreathVapor: config.povBreathVapor,
    povInteractiveHands: config.povInteractiveHands,
    povWeatherImmersion: config.povWeatherImmersion,
    povVisceralAudio: config.povVisceralAudio,
  };

  // If object has cameraMotion (PromptBuildState), enforce validated cameraMotion
  if ('cameraMotion' in stateOrTpl || 'rawConcept' in stateOrTpl) {
    result.cameraMotion = config.cameraMotion;
  }

  // If object has camera (PresetTemplate), enforce validated camera
  if ('camera' in stateOrTpl) {
    result.camera = config.cameraMotion;
  }

  return result;
}

/**
 * 📋 Returns all POV kinetic preset options for interactive selection in UI
 */
export function getAllPovKineticProfiles(): PovKineticPresetOption[] {
  return [
    {
      id: 'birthday_serenade_sway',
      categoryMatch: 'birthday',
      labelDe: 'Geburtstags-Ständchen Sway (±2cm)',
      labelEn: 'Birthday Serenade Sway (±2cm)',
      badge: '🎂 Geburtstage & Ständchen',
      displacement: '±2cm Seated Serenade Sway',
      intensity: 'Festive Musical Sway',
      descriptionDe: 'Ich-Perspektive des Geburtstagskinds vor Torte, singende Männer musizieren direkt in die Kamera.',
      descriptionEn: 'POV of birthday child before cake, enthusiastic male choir singing directly into camera lens.',
      cameraMotion: CATEGORY_POV_CONFIGS.birthday.cameraMotion,
    },
    {
      id: 'horror_head_bob_stalk',
      categoryMatch: 'horror',
      labelDe: 'Horror Head-Bob & Stalking (±4cm)',
      labelEn: 'Horror Head-Bob & Stalking (±4cm)',
      badge: '👻 Horror & Grusel',
      displacement: '±4cm Stalking Dip',
      intensity: 'Tense Head-Bob',
      descriptionDe: 'Physische Schritt-Kinetik, zittrige Blickführung & Taschenlampen-Tracking.',
      descriptionEn: 'Physical footstep gait cycle, trembling gaze drift & flashlight tracking.',
      cameraMotion: CATEGORY_POV_CONFIGS.horror.cameraMotion,
    },
    {
      id: 'immobilien_static_glide',
      categoryMatch: 'immobilien',
      labelDe: 'Immobilien Static-Glide (0cm)',
      labelEn: 'Real Estate Static-Glide (0cm)',
      badge: '🏡 Immobilien & Räume',
      displacement: '0cm Level Horizon',
      intensity: 'Zero-Bob Steadycam',
      descriptionDe: 'Absolut wackelfreier kardanischer Gleitflug durch Türschwellen & Räume.',
      descriptionEn: 'Vibration-free gimbal glide through doorways and architectural rooms.',
      cameraMotion: CATEGORY_POV_CONFIGS.immobilien.cameraMotion,
    },
    {
      id: 'action_sprint_vibration',
      categoryMatch: 'action',
      labelDe: 'Action Sprint-Bob (±8cm)',
      labelEn: 'Action Sprint-Bob (±8cm)',
      badge: '⚡ Action & Stunts',
      displacement: '±8cm High-Speed Bounce',
      intensity: 'High Adrenaline',
      descriptionDe: 'GoPro Chest-Mount mit heftigen Stoßvibrationen und Neigung bei Kurven.',
      descriptionEn: 'GoPro chest mount with heavy impact vibration and centrifugal body lean.',
      cameraMotion: CATEGORY_POV_CONFIGS.action.cameraMotion,
    },
    {
      id: 'restaurant_seated_glide',
      categoryMatch: 'restaurant',
      labelDe: 'Gourmet Tisch-Neigung (±1.5cm)',
      labelEn: 'Culinary Seated Glide (±1.5cm)',
      badge: '🍽️ Food & Dining',
      displacement: '±1.5cm Seated Lean',
      intensity: 'Subtle Macro Tilt',
      descriptionDe: '45-Grad Blickneigung auf Speisen mit Besteck im unteren Bilddrittel.',
      descriptionEn: '45-degree downward macro tilt onto dishes with cutlery in lower third.',
      cameraMotion: CATEGORY_POV_CONFIGS.restaurant.cameraMotion,
    },
    {
      id: 'bau_heavy_tread_bounce',
      categoryMatch: 'bau',
      labelDe: 'Bau Heavy-Tread Helm (±5cm)',
      labelEn: 'Construction Heavy-Tread (±5cm)',
      badge: '🏗️ Bau & Handwerk',
      displacement: '±5cm Heavy Bootfall',
      intensity: 'Helmet-Mount Shock',
      descriptionDe: 'Schwere Stiefel-Schritte mit Mikrostößen auf Beton und Werkzeug-Händen.',
      descriptionEn: 'Heavy bootfall with concrete impact micro-shocks and tool-wielding hands.',
      cameraMotion: CATEGORY_POV_CONFIGS.bau.cameraMotion,
    },
    {
      id: 'nature_stride_sway',
      categoryMatch: 'nature',
      labelDe: 'Wander-Schritt & Wiegen (±3cm)',
      labelEn: 'Nature Trail Stride (±3cm)',
      badge: '🌲 Natur & Reisen',
      displacement: '±3cm Natural Gait',
      intensity: 'Organic Trail Stride',
      descriptionDe: 'Natürlicher Geh-Rhythmus mit seitlicher Gewichtsverlagerung im Gelände.',
      descriptionEn: 'Natural walking rhythm with lateral weight-shift sway on outdoor terrain.',
      cameraMotion: CATEGORY_POV_CONFIGS.nature.cameraMotion,
    },
    {
      id: 'fashion_velvet_glide',
      categoryMatch: 'fashion',
      labelDe: 'Fashion Velvet Glide (0cm)',
      labelEn: 'Haute Couture Velvet Glide (0cm)',
      badge: '👗 Mode & Luxus',
      displacement: '0cm Frictionless',
      intensity: 'Haute Couture Flow',
      descriptionDe: 'Schwebende Runway-Kamera ohne Erschütterung mit seidigen Stoff-Gesten.',
      descriptionEn: 'Frictionless runway glide with zero vibration and silk-touch gestures.',
      cameraMotion: CATEGORY_POV_CONFIGS.fashion.cameraMotion,
    },
    {
      id: 'erotik_sensual_breath_drift',
      categoryMatch: 'erotik',
      labelDe: 'Sinnlicher Atem-Drift (±1cm)',
      labelEn: 'Sensual Breath Drift (±1cm)',
      badge: '💋 Sinnlich & Erotik',
      displacement: '±1cm Breath Modulation',
      intensity: 'Hypnotic Intimacy',
      descriptionDe: 'Hyper-intimer Makro-Schwebeflug synchron zum langsamen Atemrhythmus.',
      descriptionEn: 'Hyper-intimate macro glide synchronized to slow breathing rhythm.',
      cameraMotion: CATEGORY_POV_CONFIGS.erotik.cameraMotion,
    },
    {
      id: 'war_combat_bodycam_jolt',
      categoryMatch: 'war',
      labelDe: 'Combat Bodycam Jolt (±6cm)',
      labelEn: 'Combat Bodycam Jolt (±6cm)',
      badge: '🪖 Tactical & War',
      displacement: '±6cm Tactical Jolt',
      intensity: 'Combat Bodycam',
      descriptionDe: 'Taktisches Ducken, schockartige Erschütterungen und Peripherie-Scans.',
      descriptionEn: 'Tactical low-crouch shuffle with rapid shocks and perimeter sweep checks.',
      cameraMotion: CATEGORY_POV_CONFIGS.war.cameraMotion,
    },
    {
      id: 'scifi_hud_level_flight',
      categoryMatch: 'scify',
      labelDe: 'Cybernetic HUD Flight (0cm)',
      labelEn: 'Cybernetic HUD Flight (0cm)',
      badge: '🚀 Sci-Fi & Cyberpunk',
      displacement: '0cm Gyro-Stabilized',
      intensity: 'Saccadic Eye Lock',
      descriptionDe: 'Gyroskopisch stabilisierter Flug mit Blicksprüngen auf Hologramm-HUDs.',
      descriptionEn: 'Gyroscopically locked flight with saccadic focus snaps between HUD nodes.',
      cameraMotion: CATEGORY_POV_CONFIGS.scify.cameraMotion,
    },
  ];
}
