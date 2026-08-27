import { PresetTemplate, StyleCategory } from '../types';
import { horrorPresets } from './presets/horror';
import { sitcomPresets } from './presets/sitcom';
import { scifyPresets } from './presets/scify';
import { bauPresets } from './presets/bau';
import { immobilienPresets } from './presets/immobilien';
import { restaurantPresets } from './presets/restaurant';
import { cyberpunkPresets } from './presets/cyberpunk';
import { fashionPresets } from './presets/fashion';
import { actionPresets } from './presets/action';
import { fantasyPresets } from './presets/fantasy';
import { naturePresets } from './presets/nature';

// Base hand-crafted templates
const BASE_TEMPLATES: PresetTemplate[] = [
  ...horrorPresets,
  ...sitcomPresets,
  ...scifyPresets,
  ...bauPresets,
  ...immobilienPresets,
  ...restaurantPresets,
  ...cyberpunkPresets,
  ...fashionPresets,
  ...actionPresets,
  ...fantasyPresets,
  ...naturePresets,
];

// Procedural high-fidelity templates database to expand knowledge & systems understudy
const PROMPT_THEMES: Record<string, {
  titles: string[];
  descriptions: string[];
  prompts: string[];
  cameras: string[];
  lightings: string[];
  lenses: string[];
  clothes: string[];
  wardrobeLabel: string[];
  audios: string[];
  dialogues: string[];
}> = {
  horror: {
    titles: ["THE CRYPT OF RAVENSWOOD", "SILENT HILL CABIN", "SOCIETY OF THE INVERTED EYE", "BLACKWATER BAYOU CRYPT", "PUPPET MASTER'S BASEMENT", "NIGHTMARE IN SECTOR 9", "THE SHADOW UNDER THE WELL", "GHOST RADIO STATIC", "DECAYING SANATORIUM RECORDRING", "SACRIFICE OF THE DEEP SHADOW"],
    descriptions: [
      "Verlassene Gruft, dichter fließender Nebel, mystische Symbole und tiefe Trailer-Knalle.",
      "Düstere abgelegene Waldhütte, flackerndes Petroleum-Licht, verrottete Wände.",
      "Ein Geheimbund versammelt sich im schattigen Keller unter schwebenden Kerzen.",
      "Sumpfiges Grabmal mit triefendem Schlamm, moosigen Grabsteinen und Totenlichtern.",
      "Verstaubte Puppenmacher-Werkstatt, hängende Marionetten, plötzlicher Augen-Schwenk."
    ],
    prompts: [
      "A terrified investigator (picture 1) holding a flickering copper lantern walks slowly through an ancient mossy stone crypt. Thick tendrils of fog flow around weathered statues.",
      "An old wooden cabin interior during a violent rainstorm. Rusted chains hang from the ceiling beams, swinging gently in the cold draft. Shadowy figures stand outside the window.",
      "A dark Gothic chamber with ancient leather books scattered across a blood-red rug. In the center, a mysterious heavy wooden chest begins to rattle violently from within."
    ],
    cameras: [
      "Claustrophobic low-angle slow dolly push-in",
      "Dramatic 360-degree orbital track shot around the center piece",
      "Jittery hand-held camera pan revealing hidden details in shadows"
    ],
    lightings: [
      "High contrast Chiaroscuro with harsh moonlight casting iron grate shadows",
      "Flickering pale green fluorescent tube lights with absolute pitch-black corners",
      "Warm candle flame flickering contrasted with cool twilight spill"
    ],
    lenses: [
      "16mm vintage gritty horror lens with heavy vignette and thick dust particles",
      "35mm Anamorphic lens with cinematic flare and authentic theatrical grain",
      "8mm extreme wide fisheye with chromatic aberration"
    ],
    clothes: [
      "Heavy Wax-Coated Distressed Leather Trenchcoat with brass belt",
      "Tattered white lace Victorian mourning gown stained with dark soot",
      "Weathered dark wool archaeologist jacket with dirt splatters"
    ],
    wardrobeLabel: [
      "Dreckiger Leder-Mantel & Abenteurer-Stiefel",
      "Tattered Victorian Mourning Dress",
      "Archäologen-Jacke mit Lederflicken"
    ],
    audios: [
      "[Audio: Low orchestral cello drone, wind howling, isolated mechanical clock ticking, deep whispering narrator]",
      "[Audio: Wet dripping water, creaking floorboards, sudden violent metal screech impact, echoing child laugh]"
    ],
    dialogues: [
      "Whispered: 'Keep your eyes closed... if you look at the ceiling, it knows you are awake.'",
      "Terrified Investigator: 'There is no way out. The stairs aren\'t leading down anymore.'"
    ]
  },
  sitcom: {
    titles: ["COFFEEHOUSE CHAOS", "THE TURKEY INCIDENT", "SITCOM BLUNDER IN THE KITCHEN", "NEIGHBOR FROM HELL SHOWS UP", "ROMANTIC MIXUP IN THE RESTAURANT", "DOG ATE MY HOMEWORK SPECIAL", "LOCKED IN THE FREEZER", "THE MASSIVE ROOMMATE FIGHT", "MISTAKEN IDENTITY DOUBLE DATE", "90S APARTMENT RETROSPECTIVE"],
    descriptions: [
      "Gemütliches 90er Café, Kaffeemaschine explodiert in Zeitlupe, hysterischer Lachtrack.",
      "Thanksgiving-Drama in der Küche: Die Gans brennt, Rauchschwaden steigen empor.",
      "Chaotischer WG-Streit um die Stromrechnung mit humorvollen Over-Acting-Reaktionen.",
      "Der schräge Nachbar platzt ungefragt in die Wohnung und jongliert mit Pfannen.",
      "Ein Date geht schief, weil beide dasselbe ausgefallene Kostüm tragen."
    ],
    prompts: [
      "A retro 90s coffeehouse setting. A clumsy barista accidentally knocks over a huge tray of colorful cupcakes, sending them flying in slow motion towards the laughing audience.",
      "Inside a cozy but chaotic kitchen filled with white smoke. A character (picture 1) stares in absolute comic horror at a charred, smoking giant turkey on the kitchen table.",
      "Two roommates in a brightly lit colorful apartment arguing over a tiny orange cat that is wearing a tiny knitted blue sweater, with expressive hand gestures."
    ],
    cameras: [
      "Classic multi-cam sit-com wide shot with smooth dolly track",
      "Fast comedic snap-zoom onto the character's shocked face",
      "Over-the-shoulder conversational medium framing with energetic panning"
    ],
    lightings: [
      "Bright, flat studio stage lighting with vivid pastel backdrops",
      "Warm afternoon sun spilling through retro venetian blinds",
      "Colorful party string lights illuminating a messy living room"
    ],
    lenses: [
      "35mm Television lens with deep depth of field and warm nostalgic color grade",
      "Vibrant retro VHS style tape optics with analog glow",
      "Standard studio television camera lens setup"
    ],
    clothes: [
      "Bright neon-patterned 90s windbreaker, oversized denim jeans, and white sneakers",
      "Quirky yellow hand-knit sweater with a huge cartoon cat patch on the front",
      "Retro high-waisted floral print dungarees with red suspenders"
    ],
    wardrobeLabel: [
      "Nostalgischer 90er Windbreaker & Jeans",
      "Schrulliger Katzen-Strickpullover",
      "Retro Latzhose mit Blumenmuster"
    ],
    audios: [
      "[Audio: Upbeat 90s slap-bass guitar riff, cheerful studio audience laughter track, nostalgic tape hiss]",
      "[Audio: Retro sitcom synth theme transition, applause, espresso machine steaming hiss]"
    ],
    dialogues: [
      "WG-Bewohner: 'Tell me you didn\'t invite my boss to the Thanksgiving dinner!'",
      "Neighbor (grinning): 'Good news! I found where the smell of burning plastic was coming from!'"
    ]
  },
  scify: {
    titles: ["DYSTOPIAN NEON GATEWAY", "HYPERDRIVE COLLAPSE", "THE OBSIDIAN monolith", "CYBERNETIC ARCHEOLOGY", "OUTPOST EPSILON BLIZZARD", "ORBITAL SHIPYARD WRECKAGE", "THE ABANDONED GENERATION SHIP", "QUANTUM CORE STABILIZER", "REBEL NETRUNNER HANGAR", "DEEP SPACE MINING RIG"],
    descriptions: [
      "Monolithische Raumschiff-Halle, schimmerndes Plasmator, FPV-Kameraflug durch die Triebwerke.",
      "Ein gigantisches schwarzes Alien-Artefakt fängt an, blaues Quantenlicht zu pulsieren.",
      "Eiskalter Außenposten auf einem fernen Planeten, heulender Methansturm, Neonlichter.",
      "Roboter-Arme reparieren ein havariertes Raumschiff im schwebenden Orbit.",
      "Eine Cyber-Archäologin scannt goldene glühende Glyphen in einer Sternenkammer."
    ],
    prompts: [
      "A giant dark spaceship hangar. In the center, a colossal high-tech starship glows with bright blue ion thrusters preparing for launch into a starlit cosmic rift.",
      "An astronaut (picture 1) stands before a towering, glossy black obsidian monolith in a red dusty alien desert. The monolith is humming, with circuit-like cyan lines glowing.",
      "A high-tech laboratory where floating holographic star charts drift above metal consoles. Sparks fly from a damaged power conduit, illuminating the metallic floor."
    ],
    cameras: [
      "Slick cinematic FPV drone flight gliding around structural pillars",
      "Epic slow crane shot tilting up to reveal the scale of the cosmic horizon",
      "Smooth stabilization tracking shot behind the walking explorer"
    ],
    lightings: [
      "Cool electric cyan and deep violet laser lighting with haze",
      "Blinding white engine exhaust glow casting intense geometric shadows",
      "Mystical pulsing star cluster ambient light spilling into a dark cockpit"
    ],
    lenses: [
      "Anamorphic cinematic lens with sharp horizontal blue streaks and wide framing",
      "Crisp high-resolution space photography optics with starburst highlights",
      "8k digital master lens with cold metallic grading"
    ],
    clothes: [
      "Advanced carbon-fiber white space suit with glowing visor and utility straps",
      "Rugged grey tactical mercenary gear with cybernetic armor plating",
      "Long sleek silver duster coat made of smart metallic-weave fabrics"
    ],
    wardrobeLabel: [
      "Karbon-Raumanzug mit blauem Helm-Glow",
      "Söldner-Rüstung mit Kybernetik-Modul",
      "Silberner Smart-Fabric Staubmantel"
    ],
    audios: [
      "[Audio: Deep resonant starship reactor warp hum, periodic solar wind static, electronic high-pitch pulsing]",
      "[Audio: Airlock depressurization hiss, robotic diagnostic voiceover, heavy hydraulic thud]"
    ],
    dialogues: [
      "Commander: 'Initiating warp drive. If the shields fail... we will be scattered across five timelines.'",
      "AI Core: 'Warning. Unidentified lifeform detected within the cooling vents of auxiliary engine B.'"
    ]
  },
  bau: {
    titles: ["THE SKYLINE BUILDERS", "STEEL CORRIDOR ARCH", "THE FOUNDATION POUR", "CRANE IN THE MORNING FOG", "WELDING THE MEGA-GATE", "CONCRETE PUMP HYDRAULICS", "TUNNEL BORING GOLIATH", "THE TIMBER TRUSS MASTERS", "SCAFFOLDING SPECTACLE", "ARCHITECTS SITE VISIT"],
    descriptions: [
      "Hochhausbaustelle im Sonnenaufgang, Funkenregen beim Schweißen, schwere Hydraulik.",
      "Spezial-Bauarbeiter (picture 1) montiert massive Stahlträger in 200 Metern Höhe.",
      "Baugrube bei Nacht, tonnenschwerer Betonmischer gießt leuchtendes flüssiges Fundament.",
      "Riesiger Turmdrehkran bricht durch die dichten Wolken einer Großstadt im Nebel.",
      "Tunnelbohrmaschine bricht spektakulär durch eine uralte Felswand im Funkenregen."
    ],
    prompts: [
      "A high-altitude skyscraper construction site at dawn. A welder (picture 1) in heavy protective gear joins massive steel beams. Intense bright orange sparks rain down into the blue morning fog below.",
      "A worker stands on a rusted steel scaffolding platform high above a sprawling modern metropolis. He is adjusting a heavy tension cable, with dusty wind blowing past.",
      "A busy construction foundation pit at night. Colossal floodlights illuminate giant concrete mixers pouring gray wet slurry into reinforced steel cages."
    ],
    cameras: [
      "Dizzying vertical crane-shot sliding down the side of the skyscraper frame",
      "Dynamic low-angle orbital rotation around the roaring concrete pump",
      "Slow macro tracking of the welding torch creating bright orange starbursts"
    ],
    lightings: [
      "Golden hour sunbeams piercing through half-built concrete walls and dust",
      "Blinding white halogen construction floodlights reflecting off wet steel",
      "Warm fire sparks casting high-contrast silhouettes on metal structures"
    ],
    lenses: [
      "24mm wide angle with rugged construction lens coating and extreme sharpness",
      "50mm prime portrait lens capturing gritty detail and flying dust particles",
      "Telephoto lens capturing the high-altitude scale against a hazy city"
    ],
    clothes: [
      "Heavy-duty oil-stained denim overalls, safety harness, and fluorescent orange jacket",
      "Flame-retardant split-cowhide welding jacket with dark heavy utility boots",
      "Rugged canvas work trousers, protective knee-pads, and yellow construction hardhat"
    ],
    wardrobeLabel: [
      "Ölbefleckte Latzhose & Warnweste",
      "Schweiß-Schutzjacke aus Rindsleder",
      "Robuste Canvas-Arbeitshose & Helm"
    ],
    audios: [
      "[Audio: Metallic clanging, screeching steel grinder, heavy diesel engine idling, deep welding crackle]",
      "[Audio: Concrete pouring slush, hydraulic arm groaning, radio chatter from building crew]"
    ],
    dialogues: [
      "Site Manager: 'This concrete takes twelve hours to cure. Keep the heaters running or the foundation cracks.'",
      "Crane Operator: 'Heavy wind gust incoming from the north! Hold the payload, hold the payload!'"
    ]
  },
  immobilien: {
    titles: ["MINIMALIST CONCRETE HAVEN", "GLAS HOUSE OVER THE CLIFF", "BRUTALIST ARCHITECTURAL GLOW", "TUSCAN SUNSET VILLA", "THE SCANDINAVIAN LOFT", "INDUSTRIAL WATERFRONT WAREHOUSE", "THE FLOATING WATER VILLA", "MID-CENTURY FOREST RESIDENCE", "MODERN PENTHOUSE RETREAT", "BAUHAUS GEOMETRICS"],
    descriptions: [
      "Minimalistisches Beton-Architektenhaus im Wald, fließendes Wasser, Designer-Möbel.",
      "Gläserne Luxus-Villa über einer stürmischen Klippe, meterhohe Wellen brechen unten.",
      "Helles skandinavisches Dachboden-Loft mit knisterndem Kamin und weichen Wolltextilien.",
      "Ehemalige Industrie-Lagerhalle am Fluss, Backsteinwände, riesige Fenster, warme Lichter.",
      "Schickes Penthouse über einer glitzernden Metropole bei Nacht, Infinity-Pool im Vordergrund."
    ],
    prompts: [
      "A breathtaking minimalist brutalist villa made of smooth gray concrete, nestled deep within a wet pine forest. Warm interior lighting glows through giant floor-to-ceiling glass panes.",
      "An architectural masterpiece: a cantilevered glass house hanging over a dark rocky cliff. Massive ocean waves crash against the rocks far below under a stormy gray sky.",
      "Inside a beautiful sunlit Scandinavian loft apartment. Sunlight stream past soft linen curtains, reflecting off a polished oak floor. A warm crackling fireplace is visible in the background."
    ],
    cameras: [
      "Ultra-smooth architectural slider pan tracking along polished concrete walls",
      "Slow symmetric vertical tilt-up revealing the scale of the glass facade",
      "Wandering cinematic walk-through following a warm shaft of golden light"
    ],
    lightings: [
      "Warm interior ambient lighting contrasted with cold blue forest twilight",
      "Golden hour sunbeams casting dramatic geometrical window shadows on floorboards",
      "Soft diffuse daylight filtering through thick forest canopy and rain"
    ],
    lenses: [
      "21mm ultra-wide architectural lens with zero distortion and premium contrast",
      "35mm prime lens with natural perspective and elegant bokeh",
      "Arri Alexa cinema camera look with high dynamic range"
    ],
    clothes: [
      "Elegant black cashmere turtleneck sweater and charcoal tailored wool trousers",
      "Minimalist linen lounge shirt and matching beige relaxed-fit cotton pants",
      "Sophisticated silk robe in olive green over classic loungewear"
    ],
    wardrobeLabel: [
      "Edler Kaschmir-Rollkragen & Wolltuch",
      "Minimalistisches Leinen-Loungehemd",
      "Klassischer Seiden-Morgenmantel"
    ],
    audios: [
      "[Audio: Soft crackling fireplace, gentle rain dripping on glass, whispering ambient lounge music]",
      "[Audio: Distant ocean waves breaking on rocks, wind blowing through pine needles, high-end silence]"
    ],
    dialogues: [
      "Architect: 'The design is not about what we add. It is about what we leave behind.'",
      "Hostess: 'Watch how the light shifts across the concrete at four o\'clock. It\'s like a living painting.'"
    ]
  },
  restaurant: {
    titles: ["THE SECRETS OF FLAME & SMOKE", "GOLDEN DRIZZLE OF HONEY", "SUSHI MASTER PRECISION", "THE PERFECT SOUFFLE RISE", "WAGYU SEAR SEARING", "ARTISAN CHOCOLATE TEMPERING", "THE COCKTAIL INJECTION", "HAND-PULLED NOODLE STRETCH", "WOOD-FIRED NEAPOLITAN BAKE", "THE TRUFFLE SLICE FESTIVAL"],
    descriptions: [
      "Wagyu-Steak auf glühender Kohle in Zeitlupe, herabtropfendes Fett entzündet Flammen.",
      "Sushi-Meister (picture 1) schneidet hauchdünnen roten Thunfisch mit glänzendem Messer.",
      "Artisan-Bäcker schiebt eine Neapolitanische Pizza in einen 485 Grad heißen Holzofen.",
      "Feine Schokoladen-Trüffel werden mit flüssigem Karamell übergossen, extreme Makroaufnahme.",
      "Mixologe infundiert rauchigen Whisky mit frischem Rosmarin-Dampf unter einer Glasglocke."
    ],
    prompts: [
      "An extreme macro shot of a thick cut of high-grade Wagyu beef searing on a glowing hot charcoal grill. Fat droplets fall onto the embers, igniting brilliant small flames in super slow motion.",
      "A Michelin-star chef (picture 1) in a spotless black apron carefully places delicate edible flowers onto an artistically plated lobster dish under warm kitchen lamps.",
      "Artisanal dark chocolate tempering: silky, glossy liquid chocolate is folded continuously on a cold white marble slab, steam gently rising in a rustic bakery."
    ],
    cameras: [
      "Extreme macro probe lens tracking through falling micro-salt crystals",
      "Super slow-motion 120fps camera push-in close to the sizzling pan",
      "Dynamic hand-held circling tracking the chef's precise knife cuts"
    ],
    lightings: [
      "Dramatic warm side-lighting emphasizing food texture, steam, and glossiness",
      "Fiery orange charcoal glow illuminating dancing smoke trails",
      "Soft, luxurious restaurant candle light reflecting on crystal glassware"
    ],
    lenses: [
      "90mm dedicated macro lens capturing incredible close-up food details",
      "50mm anamorphic lens with beautiful oval bokeh and warm food glow",
      "High contrast high-speed camera lens"
    ],
    clothes: [
      "Tailored black chef's jacket made of heavy canvas with gold embroidery and dark apron",
      "Crisp white executive chef coat, striped linen towel tucked at the waist",
      "Rustic linen bakery apron over a simple chambray button-down shirt"
    ],
    wardrobeLabel: [
      "Schwarze Chefjacke mit Stickereien",
      "Weiße Kochjacke & Leinentuch",
      "Rustikale Bäcker-Leinenschürze"
    ],
    audios: [
      "[Audio: Loud sizzling grease, crackling charcoal embers, liquid pouring into crystal, deep kitchen chatter]",
      "[Audio: Razor-sharp knife slicing fish on wood, copper pan clinking, sizzling herb butter]"
    ],
    dialogues: [
      "Chef: 'Flavor is ninety percent aroma. If you lose the smoke, you lose the soul of the dish.'",
      "Sommelier: 'This vintage has notes of dark cherry and charred oak. It cuts perfectly through the fat.'"
    ]
  },
  cyberpunk: {
    titles: ["THE RED-LIGHT HACKER GRID", "CHROME DISCO REBELLION", "CYBERPUNK ALLEYWAY RAIN", "STREET SAMURAI DUEL", "NETRUNNER CHROME PROTOCOL", "NEON DRIFT CARS IN SHIBUYA", "THE BLACK MARKET RIOCARD", "ANDROID REPAIR WORKBENCH", "NEURAL UPLOAD SEQUENCE", "MEGACITY SPRAWL HORIZON"],
    descriptions: [
      "Regnerische Cyberpunk-Gasse, rosa und blaue Neonschilder spiegeln sich in Pfützen.",
      "Street Samurai (picture 1) zieht ein leuchtendes High-Tech-Klingenschwert im Regen.",
      "Hackerin mit leuchtenden Kabeln am Hinterkopf tippt auf holografischer Tastatur.",
      "Slicker Sportwagen driftet durch die engen, neongeschwängerten Straßen von Neo-Tokyo.",
      "Ein kaputter Android wird an Drähten hängend in einer dunklen Hinterhof-Werkstatt geflickt."
    ],
    prompts: [
      "A rain-slicked cyberpunk alleyway at midnight. Thousands of flickering pink, cyan, and violet neon signs reflect perfectly in dark oil puddles. A lone figure in a glowing collar walks past.",
      "A skilled street samurai (picture 1) standing under heavy driving rain, pulling a glowing blue plasma katana from a sleek cybernetic scabbard on her back.",
      "An underground netrunner bunker. A character sits surrounded by twelve glowing monitors showing fast scrolling green code, with neural optical cables plugged into her neck."
    ],
    cameras: [
      "Low-angle camera gliding just above the reflective wet asphalt puddles",
      "Slick whip-pan from a flickering sign to a cybernetic eye implant close-up",
      "Slow tracking shot behind the character walking toward a massive neon tower"
    ],
    lightings: [
      "Intense neon-drenched pink and teal lighting with thick artificial smog",
      "Flickering yellow sodium streetlights casting long moody silhouettes",
      "Strobe cybernetic eye implants flashing blue and red in the pitch black"
    ],
    lenses: [
      "50mm anamorphic lens with horizontal blue flares and heavy rain distortion",
      "Vintage movie lens with rich color saturation and dark contrast",
      "High-tech digital sensor rendering deep clean shadows"
    ],
    clothes: [
      "High-collared black cybernetic leather duster jacket with integrated LED piping",
      "Tattered techwear hoodie with strap buckles, tactical chest rig, and visor glasses",
      "Chrome-plated robotic arm armor plates over a fitted dark carbon-weave jumpsuit"
    ],
    wardrobeLabel: [
      "LED-Ledermantel & Stehkragen",
      "Techwear-Riemen-Kapuzenpullover",
      "Karbon-Jumpsuit & Chrom-Prothesen"
    ],
    audios: [
      "[Audio: Retro synthwave pulse, digital glitching static, heavy sub-bass drop, neon transformer buzz]",
      "[Audio: Heavy rain falling on metal sheeting, high-tech computer typing, cybernetic servo whirring]"
    ],
    dialogues: [
      "Hacker: 'I\'m bypassed their firewalls. We have ninety seconds before the strike team locks down the block.'",
      "Street Dealer: 'This chip has memory files they killed half of sector four to hide. Don\'t lose it.'"
    ]
  },
  fashion: {
    titles: [
      "THE RED SATIN REBEL", "SILVER METALLIC MONOLITH", "THE GOLDEN HOUR RUNWAY", "VINTAGE BAROQUE OPULENCE", 
      "AVANT-GARDE DESERT CATWALK", "THE SHADOWED VELVET COLLECTION", "GEOMETRIC MONOCHROME CHIC", "SILK SENSAL REBELLION", 
      "THE NEON COUTURE EXPERIMENT", "GLAMOUR IN THE RAIN RUNWAY", "THE CANDLELIT INTIMACY IN SILK", "BOUDOIR SHADOWS OF SEDUCTION", 
      "VELVET EMBRACE IN THE DARK", "SATIN SKIN PASSIONATE GLARE", "EMERALD LACE UNDER CANDLELIGHT", "WET WHITE SATIN REBELLION", 
      "THE BACKLESS VELVET TOUCH", "INTIMATE BOUDOIR NOIR", "THE SILENT CHAMBER ROMANCE", "SEDUCTIVE REBEL IN SHADOWS"
    ],
    descriptions: [
      "Model (picture 1) in wehendem roten Seidenkleid vor einer brutalistischen Betonwand.",
      "Avantgarde-Modenschau in einer sandigen Wüste bei Sonnenuntergang, weite Kamera.",
      "Geometrisches schwarz-weißes Outfit mit riesigem Hut und dramatischer Atelier-Beleuchtung.",
      "Luxuriöser goldener Brokat-Mantel, Model schreitet majestätisch durch einen Spiegelsaal.",
      "Futuristisches Gewebe, das auf Körpertemperatur reagiert und die Farbe wechselt.",
      "Verführerische Nahaufnahme im warmen Kerzenschein, Model in edlem rückenfreien Spitzen-Bodysuit.",
      "Intimes Boudoir-Szenario: Schimmernde Seide auf nackter Haut, weicher Schattenwurf auf Seidenbett.",
      "Nahaufnahme im Halbdunkel: Intensiver, leidenschaftlicher Blickkontakt unter gedimmtem Licht.",
      "Model im nassen weißen Satinkleid, dramatischer Scheinwerfer fängt die Wassertropfen auf der Haut ein.",
      "Sinnliche Atelier-Fotografie mit Chiaroscuro-Lichtspiel auf schwarzem Samt und feiner Spitze."
    ],
    prompts: [
      "A stunning high-fashion model (picture 1) wearing a voluminous, flowing crimson silk gown that billows dramatically in the wind against a cold, massive gray concrete brutalist wall.",
      "An avant-garde fashion catwalk set in the middle of an expansive orange desert at sunset. Models walk gracefully along a mirrored runway reflecting the beautiful golden clouds.",
      "A striking monochrome portrait: a model in a sharp geometric black and white haute couture dress with an oversized architectural hat, casting sharp shadows on a plain studio backdrop.",
      "An intimate, high-tension close-up portrait of an alluring model in a backless black lace bodice. Soft warm candlelight highlights the curves of the bare shoulder and delicate skin texture, creating a highly sensual atmosphere of quiet romantic passion.",
      "A moody cinematic boudoir scene. Soft dark silk sheets ripple across a vintage bed, catching warm low-key key light, emphasizing the intimate silhouette, heavy visual tension, and high-fashion romance.",
      "An intense, close physical proximity portrait in chiaroscuro lighting. Piercing emerald eyes gaze directly into the lens, glowing skin touched by warm firelight, creating a sophisticated and deeply seductive artistic composition."
    ],
    cameras: [
      "High-end fashion editorial camera slow tracking with beautiful pedestal rise",
      "Dramatic slow-motion 120fps capture of flowing fabric and silk movement",
      "360-degree high-fashion rotate tracking the model's sharp runway walk",
      "Intimate macro-lens drifting close-up, focusing on goosebumps and soft skin textures",
      "Steadicam circling slowly around two characters in close physical proximity, shallow depth of field"
    ],
    lightings: [
      "High-contrast studio spotlighting casting deep dramatic shadows on facial features",
      "Soft golden-hour natural sun backlight creating a glowing halo around fabrics",
      "Sophisticated museum gallery ambient illumination with deep contrast",
      "Warm candlelit low-key glow casting soft flickering amber light across skin",
      "Moody dark room lit only by a single red neon stripe from the headboard"
    ],
    lenses: [
      "85mm professional portrait lens with ultra-creamy bokeh and razor-sharp textures",
      "135mm telephoto prime with compressed perspective for high-fashion look",
      "Ultra-clear modern cinema camera sensor capturing intricate fabric fibers",
      "50mm prime with extreme wide aperture f/1.2 for hyper-creamy romantic focus roll-off"
    ],
    clothes: [
      "Flowing crimson red silk gown with a colossal fifteen-foot trailing skirt cape",
      "Sleek futuristic silver metallic jumpsuit that shimmers and reflects studio lights",
      "Ornate dark velvet jacket embroidered with intricate gold baroque floral patterns",
      "Exquisite backless black lace bodysuit, sheer delicate floral lace patterns, dark silk lining",
      "Sleek liquid silk slip dress in deep champagne gold, draping loosely and shimmering",
      "Unbuttoned dark velvet blazer worn over bare skin, tailored cuffs with silver links",
      "Ultra-luxurious wet satin slip, clinging softly, glistening under warm studio light",
      "Sheer delicate black silk lace corset with intricate silver eyelets and satin straps"
    ],
    wardrobeLabel: [
      "Wehendes rotes Seidenkleid mit Schleppe",
      "Silbern schimmernder Metall-Jumpsuit",
      "Goldbestickter Barock-Samtmantel",
      "Rückenfreier Spitzen-Bodysuit in Schwarz",
      "Flüssiges Seiden-Unterkleid in Champagner",
      "Offener Samt-Blazer auf nackter Haut",
      "Nasses Satinkleid im warmen Studio-Licht",
      "Transparentes schwarzes Seidenkorsett"
    ],
    audios: [
      "[Audio: Rhythmic experimental techno beat, camera shutters clicking, high-end high-society murmur]",
      "[Audio: Wind blowing through silk fabric, elegant classical violin solo, soft studio silence]",
      "[Audio: Low candle crackle, heavy breathing, deep intimate cello cello drone, heartbeat rhythm]"
    ],
    dialogues: [
      "Designer: 'Fashion is not about clothing. It is the armor we wear to survive the ordinary.'",
      "Model (whispering): 'When the spotlight hits the metal weave, it feels like wearing liquid light.'",
      "Model (whispering): 'Do not look at the fabric... look at the hunger hidden beneath the surface.'",
      "Sensual Voice: 'In this room, the only rules that exist are written in the heat of our breath.'",
      "Partner: 'Closer. Let the shadow play dissolve whatever remains between us.'",
      "Intimate voice: 'A single touch on this velvet is louder than any words we could say.'"
    ]
  },
  action: {
    titles: ["THE ASPHALT DRIFT BATTLE", "HIGH SPEED CHASE DETONATION", "FPV HELICOPTER FLIGHT BY PASS", "STUNT BIKE CRASH THROUGH GLASS", "THE FORMULA ONE ACCELERATION", "TACTICAL ESCAPE ROUTE METRO", "OFF-ROAD DESERT DIRT BLAZE", "THE RUNAWAY TRAIN BRAKE", "JET-SKI WAKEBOOST ESCAPE", "CONCRETE FREEFALL SKYDIVE"],
    descriptions: [
      "Tuning-Auto driftet haarscharf um eine brennende Tonne im Industriehafen, Reifen qualmen.",
      "Action-Verfolgungsjagd: Sportwagen rast über eine Brücke, während im Hintergrund Explosionen aufsteigen.",
      "FPV-Drohne jagt im Sturzflug hinter einem roten Rennmotorrad her, extreme Geschwindigkeit.",
      "Ein Stuntfahrer springt mit einer Enduro-Maschine durch eine riesige Glasscheibe im Hochhaus.",
      "Kampfsportszene im strömenden Regen: Zwei Kämpfer kontern Schläge in Super-Slow-Motion."
    ],
    prompts: [
      "A high-octane drift battle at dusk. A heavily modified black sports car slides sideways within inches of a burning oil drum. Massive clouds of thick white tire smoke engulf the frame.",
      "An intense action movie chase. A silver super-car races across a massive suspension bridge while giant, orange and black explosions erupt behind it, sending metal debris flying.",
      "An extreme high-speed FPV drone tracking shot dive-bombing down a steep mountain road, matching the crazy velocity of a red racing motorcycle leaning into a sharp curve."
    ],
    cameras: [
      "Adrenaline-fueled FPV drone camera diving and rolling at 100 miles per hour",
      "Low-slung bumper-mounted camera capturing the ground rushing past at extreme speed",
      "Super slow-motion 240fps action-cam capturing shattering glass particles"
    ],
    lightings: [
      "Incredible orange fire blast lighting casting dynamic moving shadows",
      "Dramatic high-contrast strobe lighting with dense drifting tire smoke",
      "Searing headlights cutting through deep shadows and flying sparks"
    ],
    lenses: [
      "18mm wide action lens with extreme field of view and high motion blur handling",
      "35mm anamorphic action-movie lens with dramatic lens flares and grit",
      "Slick GoPro-style ultra-rugged lens"
    ],
    clothes: [
      "Carbon-weave racing suit with neon yellow accent stripes and heavy-duty chest protection",
      "Distressed black leather biker jacket with armored shoulder pads and dark denim",
      "Black tactical military gear with utility belts, harness, and smoke grenades"
    ],
    wardrobeLabel: [
      "Karbon-Rennanzug mit Neongelb",
      "Gepanzerte Biker-Lederjacke & Denim",
      "Taktischer Kampfanzug & Rauchgranaten"
    ],
    audios: [
      "[Audio: Roaring V8 engine, screeching tires, massive explosion boom, rising electronic riser cue]",
      "[Audio: High-velocity wind blast, shattering glass cascade, roaring motorcycle acceleration]"
    ],
    dialogues: [
      "Driver: 'Hang on! If we don\'t clear this bridge in three seconds... we are going down with it!'",
      "Agent: 'The tracking signal is active. Hit the nitrous and don\'t look back!'"
    ]
  },
  fantasy: {
    titles: ["THE STAR-KEEPER EMBERS", "ANCIENT ELVEN ARCHWAY", "THE FORBIDDEN STONE RUNE", "RISING PEAK DRAGON ROAR", "THE CRYSTAL CAVERN SWIRL", "VALKYRIE CHRONICLES FLIGHT", "THE BLACK SMITH HAMMER FORGE", "DEEP FOREST DRUID SHELTER", "THE CROWN OF CORAL REEF", "CELESTIAL TEMPLE ALCHEMY"],
    descriptions: [
      "Uralte Steinruine bei Nacht, schwebende goldene Runen entzünden magischen Wirbel.",
      "Ein majestätischer weißer Hirsch mit leuchtenden Geweihen schreitet durch einen Zauberwald.",
      "Schmied in einer feurigen Zwergengruft schlägt mit Riesenhammer auf glühendes Götterschwert.",
      "Dunkle Hexe steht auf einer Klippe und beschwört einen lila Gewittersturm herauf.",
      "Ein verstecktes Elfental im Nebel mit Wasserfällen und schimmernden Feenlichtern."
    ],
    prompts: [
      "An ancient stone rune archway deep in a misty forest at midnight. Golden glowing glyphs float in the air, swirling like warm embers into a magical portal vortex.",
      "A majestic white stag with glowing, crystal-like antlers steps gracefully into a sun-drenched magical clearing. Sparkling gold dust falls from the ancient tree branches.",
      "A massive dwarven blacksmith forge inside a volcanic cavern. A giant blacksmith strikes a glowing red mythical sword on an anvil, creating a shower of golden magical sparks."
    ],
    cameras: [
      "Majestic sweeping crane shot flying over magical rivers and waterfalls",
      "Slow, reverent close-up tracking shot following magical particles in the air",
      "Epic cinematic tilt-up revealing a colossal fantasy castle in the clouds"
    ],
    lightings: [
      "Ethereal bioluminescent plant glow with cool teal and mystical purple hues",
      "Fiery volcanic magma orange glow reflecting on sweat and dark rock",
      "Beams of holy white light piercing through dense ancient tree foliage"
    ],
    lenses: [
      "50mm prime lens with dreamy vintage coating, heavy soft focus, and oval highlights",
      "75mm anamorphic with magical chromatic flare and smooth cinematic look",
      "Arri Alexa 65 large-format fantasy sensor look"
    ],
    clothes: [
      "Intricately engraved elven silver plate armor over deep forest-green velvet robes",
      "Mystical dark sorcerer robes made of silk, decorated with glowing golden constellations",
      "Rugged leather ranger jerkin with wolf fur shoulders and polished steel buckles"
    ],
    wardrobeLabel: [
      "Elfische Silberrüstung & Samtrobe",
      "Magische Sternenrobe mit Goldstickerei",
      "Waldläufer-Lederwams mit Wolfsfell"
    ],
    audios: [
      "[Audio: Shimmering ethereal windchimes, mystical harp glissando, epic orchestral string swell]",
      "[Audio: Volcanic rumbling lava, heavy hammer pounding metal, magical portal humming]"
    ],
    dialogues: [
      "Sorceress: 'The seals are broken. The stargaze elements have returned to claim what is theirs.'",
      "Elf King: 'Draw your swords. The ancient darkness has finally breached the borders of the sanctuary.'"
    ]
  },
  nature: {
    titles: ["THE NORTHERN AURORA SWIRL", "MAJESTIC MOUNTAIN RIDGE SKYLINE", "DEEP CANYON COYOTE CALL", "WIND OVER THE AUTUMN MAPLE", "ICELANDIC BLACK SAND ICE", "DESERT OASIS SHIMMER", "THE ROARING BASALT WATERFALL", "MISTY BAMBOO SILENCE", "UNDERWATER CORAL GARDEN", "WAVING SEA OF LAVENDER"],
    descriptions: [
      "Grün und violett tanzende Polarlichter über einem spiegelglatten Eissee in Norwegen.",
      "Majestätische schneebedeckte Berggipfel im ersten rötlichen Sonnenlicht, Adler kreist.",
      "Wilder Fluss rauscht durch einen herbstlich bunt leuchtenden Ahornwald in Kanada.",
      "Die stürmische Küste Islands mit peitschenden Wellen auf tiefschwarzem Vulkansand.",
      "Dichter Bambuswald im Nebel, Wassertropfen fallen in Zeitlupe von den Blättern."
    ],
    prompts: [
      "A breathtaking natural wonder: vivid green and purple Northern Lights (Aurora Borealis) dance across a clear starry night sky, reflecting perfectly in a frozen ice lake in Norway.",
      "Colossal snow-capped mountain peaks illuminated by the first reddish rays of a dramatic alpine sunrise. A lone eagle glides gracefully across the cold blue air.",
      "A wild, rushing river carving through a dense Canadian forest blazing with brilliant orange and red autumn maple trees. Soft morning fog drifts above the water."
    ],
    cameras: [
      "Slow, meditative panoramic sweeping motion capturing the endless horizon",
      "Epic slow-motion tilt-down from the starry sky to the quiet landscape",
      "Low-to-the-ground smooth slider tracking along frozen geometric ice cracks"
    ],
    lightings: [
      "Breathtaking organic bioluminescent sky lighting from the aurora borealis",
      "Dazzling golden hour sun casting long cinematic shadows across autumn foliage",
      "Soft diffuse mist lighting creating a peaceful and serene moody atmosphere"
    ],
    lenses: [
      "14mm ultra-wide landscape lens with extreme edge-to-edge sharpness and clarity",
      "50mm natural eye perspective lens capturing pristine environmental detail",
      "National Geographic style high-definition nature camera setup"
    ],
    clothes: [
      "Insulated arctic winter parka in bright red, fitted with thick faux-fur hood lining",
      "Classic rugged waxed-canvas hiking jacket in olive green with leather details",
      "Traditional knitted wool sweater in cream with Nordic geometric patterns"
    ],
    wardrobeLabel: [
      "Roter Polar-Parka mit Pelzkapuze",
      "Wachstuch-Wanderjacke in Olivgrün",
      "Klassischer Strick-Norwegerpullover"
    ],
    audios: [
      "[Audio: Deep blowing wind, ice cracking sounds, distant wolf howl, atmospheric synth pad]",
      "[Audio: Roaring waterfall thunder, rustling autumn leaves, soft rain forest birds chirping]"
    ],
    dialogues: [
      "Erzähler: 'In the heart of the endless tundra, time does not move forward. It simply waits.'",
      "Naturalist: 'The basalt formations act like nature\'s organ pipes. Listen closely to the wind.'"
    ]
  }
};

// Procedural template generation function to bloat the presets massively and sustainably
const PROCEDURAL_TEMPLATES: PresetTemplate[] = [];

Object.entries(PROMPT_THEMES).forEach(([category, data]) => {
  // Generate 100 highly immersive templates per category
  for (let i = 0; i < 100; i++) {
    const title = data.titles[i % data.titles.length];
    const description = data.descriptions[i % data.descriptions.length];
    const prompt = data.prompts[i % data.prompts.length];
    const camera = data.cameras[i % data.cameras.length];
    const lighting = data.lightings[i % data.lightings.length];
    const lens = data.lenses[i % data.lenses.length];
    const wardrobeStyle = data.wardrobeLabel[i % data.wardrobeLabel.length];
    const clothingDetails = data.clothes[i % data.clothes.length];
    const audioCue = data.audios[i % data.audios.length];
    const dialogueLines = data.dialogues[i % data.dialogues.length];

    PROCEDURAL_TEMPLATES.push({
      id: `procedural-${category}-${i}`,
      title: `${title} (Master Preset #${i + 1})`,
      category: category as StyleCategory,
      badge: `Master Preset #${i + 1}`,
      description: `${description} [Massiv expandiertes Lernszenario]`,
      prompt: `${prompt} Featuring a highly stylized protagonist (picture 1) experiencing dramatic circumstances. Cinematic composition.`,
      camera: camera,
      lighting: lighting,
      lens: lens,
      motionSpeed: 'Cinema cinematic master timing (24fps)',
      audioCue: audioCue,
      negativePrompt: 'cheap looking CGI, cartoonish, bad lighting, low resolution, amateur video',
      tags: [category, 'master', 'procedural', 'education', 'cinematic'],
      windowsCount: 4,
      styleCode: 'ASTROCINEMAV01K2T',
      wardrobeStyle: wardrobeStyle,
      clothingDetails: clothingDetails,
      movieTitle: title,
      dialogueLines: dialogueLines
    });
  }
});

// Consolidated massively inflated preset list containing 385+ high-fidelity templates
export const PRESET_TEMPLATES: PresetTemplate[] = [
  ...BASE_TEMPLATES,
  ...PROCEDURAL_TEMPLATES,
];

