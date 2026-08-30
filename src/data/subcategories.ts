import { PresetTemplate, StyleCategory } from '../types';

export interface SubCategoryDef {
  id: string;
  category: StyleCategory | string;
  labelDe: string;
  labelEn: string;
  icon: string;
  badgeDe: string;
  badgeEn: string;
  descriptionDe: string;
  descriptionEn: string;
  matcher: (t: PresetTemplate) => boolean;
}

export const SUBCATEGORIES_CONFIG: SubCategoryDef[] = [
  // =================== GEBURTSTAGE & STÄNDCHEN (BIRTHDAYS & SERENADES) ===================
  {
    id: 'birthday_rock_hardrock',
    category: 'birthday',
    labelDe: '🎸 80s Stadion-Rock & Biker-Hardrock',
    labelEn: '🎸 80s Arena Rock & Biker Hardrock',
    icon: '🎸',
    badgeDe: 'Rock & Hardrock',
    badgeEn: 'Rock & Hardrock',
    descriptionDe: 'Glam-Metal Power-Balladen, Flying-V Gitarren-Soli, Marshall-Türme & rauchige Biker-Ständchen.',
    descriptionEn: '80s glam metal power ballads, Flying-V guitar riffs, roaring Marshall stacks & gravelly biker serenades.',
    matcher: (t) =>
      t.tags.some((tag) => /rock|hardrock|80s|glam|metal|biker|gibson|marshall/i.test(tag)) ||
      /rock|hardrock|80s|glam|biker|power-ballad|marshall|flying-v/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'birthday_deathmetal',
    category: 'birthday',
    labelDe: '💀 Nordic Death Metal & Black Metal Growl',
    labelEn: '💀 Nordic Death Metal & Guttural Growl',
    icon: '💀',
    badgeDe: 'Death Metal Growl',
    badgeEn: 'Death Metal Growl',
    descriptionDe: 'Corpse Paint, brutale Guttural-Growls, Blastbeats, Thron der Finsternis & schwarze Feuertorte.',
    descriptionEn: 'Corpse paint, brutal guttural growls, blast-beats, dark throne & obsidian hellfire cake.',
    matcher: (t) =>
      t.tags.some((tag) => /death-metal|black-metal|corpse-paint|growl|nordic|headbanging/i.test(tag)) ||
      /death metal|black metal|corpse paint|growl|blastbeat|hellfire/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'birthday_folk',
    category: 'birthday',
    labelDe: '🎻 Alpenländisch Folk & Cozy Indie-Akustik',
    labelEn: '🎻 Alpine Folk & Cozy Indie-Acoustic',
    icon: '🎻',
    badgeDe: 'Folk & Akustik',
    badgeEn: 'Folk & Acoustic',
    descriptionDe: 'Bayerische Stubenmusi & Jodel-Quartett, Lagerfeuer-Indie mit Banjo & Cello.',
    descriptionEn: 'Authentic Bavarian alpine folk jodel choir, campfire indie-folk with banjo and cello.',
    matcher: (t) =>
      t.tags.some((tag) => /folk|alpenland|bavarian|tracht|jodler|indie-folk|acoustic|campfire|banjo|cello/i.test(tag)) ||
      /folk|alpenländisch|bavarian|jodel|lederhosen|campfire|indie folk|banjo|cello/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'birthday_pop_boyband',
    category: 'birthday',
    labelDe: '🎤 90s Boyband & Cyberpunk Synthwave',
    labelEn: '🎤 90s Boyband & Cyberpunk Synthwave',
    icon: '🎤',
    badgeDe: 'Boyband & Synthwave',
    badgeEn: 'Boyband & Synthwave',
    descriptionDe: 'Nasse weiße Seidenhemden im warmen Regen, Rosen, R&B-Harmonien & Cyber-Keytar Hologramme.',
    descriptionEn: 'Wet silk shirts in rain, velvet roses, 90s pop harmonies & cyberpunk keytar laser serenades.',
    matcher: (t) =>
      t.tags.some((tag) => /boyband|90s|pop|r-and-b|cyberpunk|synthwave|keytar|vocoder/i.test(tag)) ||
      /boyband|90s|pop|rain-serenade|synthwave|keytar|vocoder/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'birthday_vintage_viking_epic',
    category: 'birthday',
    labelDe: '👑 Wikinger Skalden, Barbershop & Piraten',
    labelEn: '👑 Viking Chants, Barbershop & Sea Shanties',
    icon: '👑',
    badgeDe: 'Skalden, Swing & Piraten',
    badgeEn: 'Chants, Swing & Shanties',
    descriptionDe: 'Mächtige Wikinger-Met-Gesänge, 1920er Barbershop-Swing mit Strohhüten & Piraten Rum-Shanties.',
    descriptionEn: 'Mighty Viking skaldic chants, 1920s Gatsby barbershop quartet & boisterous pirate sea shanties.',
    matcher: (t) =>
      t.tags.some((tag) => /viking|skald|barbershop|vintage|speakeasy|pirate|sea-shanty/i.test(tag)) ||
      /viking|skalden|barbershop|speakeasy|pirate|sea-shanty|shanty/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'birthday_party_carnival',
    category: 'birthday',
    labelDe: '🎺 Bierzelt, Kölner Karneval & Gospel Soul',
    labelEn: '🎺 Beer Tent, Carnival & Gospel Soul',
    icon: '🎺',
    badgeDe: 'Blasmusik & Gospel',
    badgeEn: 'Brass & Gospel',
    descriptionDe: 'Feuchtfröhliche Blasmusik mit Tuba & Konfetti, mitreißender Gospel & Motown Soul-Jubel.',
    descriptionEn: 'High-energy brass band with tuba & confetti, uplifting Motown and gospel soul jubilee.',
    matcher: (t) =>
      t.tags.some((tag) => /karneval|schlager|bierzelt|blasmusik|tuba|gospel|motown|soul|jubel/i.test(tag)) ||
      /karneval|bierzelt|blasmusik|tuba|gospel|motown|soul/i.test(t.title + ' ' + t.description),
  },

  // =================== IMMOBILIEN (REAL ESTATE) ===================
  {
    id: 'buildup',
    category: 'immobilien',
    labelDe: '🏗️ Sich aufbauende Räume (Self-Assembly)',
    labelEn: '🏗️ Self-Assembling Rooms',
    icon: '🏗️',
    badgeDe: 'Sich aufbauend',
    badgeEn: 'Self-Assembly',
    descriptionDe: 'Grundriss → Rohbau → Parkett, Leitungen & Designer-Möbel bauen sich magisch auf.',
    descriptionEn: 'Blueprint → Framing → Flooring, utilities & bespoke furniture assemble dynamically.',
    matcher: (t) =>
      t.id.includes('buildup') ||
      t.tags.some((tag) => /sich aufbauend|self-assembly|aufbau|extrusion|blueprint-morph|bau-morph/i.test(tag)) ||
      /sich aufbauend|self-assembly|self-assembling|baut sich auf|wände wachsen|rohbau-zu-design|assembly time-lapse/i.test(
        t.title + ' ' + t.description + ' ' + t.prompt
      ),
  },
  {
    id: 'floorplan',
    category: 'immobilien',
    labelDe: '📐 Grundrisse & 3D-Flüge (Blueprints)',
    labelEn: '📐 Blueprint & 3D Flythroughs',
    icon: '📐',
    badgeDe: 'Grundriss 3D Flug',
    badgeEn: 'Blueprint 3D',
    descriptionDe: '2D-CAD-Grundriss wird zu fotorealistischer Innenraumbegehung, Puppenhaus-Tour & Vorher-Nachher.',
    descriptionEn: '2D CAD floor plan morphs into photorealistic interior flythrough, dollhouse & staging.',
    matcher: (t) =>
      (t.id.includes('floorplan') ||
        t.tags.some((tag) => /grundriss|floorplan|blueprint|innenraumflug|walkthrough|puppenhaus|dollhouse/i.test(tag)) ||
        /grundriss|floor plan|blueprint|innenraumflug|walkthrough|schnittmodell/i.test(
          t.title + ' ' + t.description + ' ' + t.prompt
        )) &&
      !t.id.includes('buildup'),
  },
  {
    id: 'luxury',
    category: 'immobilien',
    labelDe: '🏰 Luxus-Villen, Penthouses & Lofts',
    labelEn: '🏰 Luxury Mansions, Penthouses & Lofts',
    icon: '🏰',
    badgeDe: 'Luxus & Anwesen',
    badgeEn: 'Luxury Estate',
    descriptionDe: 'Exklusive Penthouses, Fincas, Chalets, Architekten-Betonvillen und Seeufer-Anwesen.',
    descriptionEn: 'Exclusive penthouses, fincas, chalets, architect brutalist villas and lakefront estates.',
    matcher: (t) => !t.id.includes('floorplan') && !t.id.includes('buildup'),
  },

  // =================== TOURISMUS & REISEN (TRAVEL & VACATION) ===================
  {
    id: 'cliche_humor',
    category: 'travel',
    labelDe: '🏖️ Urlaubs-Klischees, Party & Chaos',
    labelEn: '🏖️ Vacation Tropes, Party & Chaos',
    icon: '🏖️',
    badgeDe: 'Urlaubs-Klischee',
    badgeEn: 'Vacation Tropes',
    descriptionDe: '06:00 Handtuch-Rennen am Pool, All-Inclusive Buffet-Schlacht, Après-Ski, Oktoberfest & Koffer-Drama.',
    descriptionEn: '6 AM pool towel sprint, all-inclusive buffet frenzy, après-ski madness, Oktoberfest & airport luggage drama.',
    matcher: (t) =>
      t.tags.some((tag) => /klischee|handtuch|flughafen|buffet|party|après-ski|oktoberfest|reisegruppe|koffer|comedy/i.test(tag)) ||
      /towel|sprint|all-inclusive|buffet|après-ski|oktoberfest|umbrella|airport|suitcase|chaos/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'luxury_resort',
    category: 'travel',
    labelDe: '🌴 Luxus-Resorts, Malediven & Wellness',
    labelEn: '🌴 Luxury Resorts, Maldives & Wellness',
    icon: '🌴',
    badgeDe: 'Luxus & Spa',
    badgeEn: 'Luxury & Spa',
    descriptionDe: 'Overwater-Bungalow, schwimmendes Champagner-Frühstück, Island Blaue Lagune & Kreuzfahrt-Megaliner.',
    descriptionEn: 'Maldives overwater villa, floating champagne breakfast, Iceland Blue Lagoon & mega cruiseship.',
    matcher: (t) =>
      t.tags.some((tag) => /malediven|luxus|floating breakfast|infinity pool|island|nordlichter|thermalbad|wellness|kreuzfahrt|schiff/i.test(tag)) ||
      /malediven|maldives|floating breakfast|infinity pool|blue lagoon|aurora|cruiseship|spa|lagoon/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'adventure_safari',
    category: 'travel',
    labelDe: '🦁 Safari, Wüste, Roadtrips & Wildnis',
    labelEn: '🦁 Safari, Desert, Roadtrips & Wild',
    icon: '🦁',
    badgeDe: 'Safari & Roadtrip',
    badgeEn: 'Safari & Roadtrip',
    descriptionDe: 'Serengeti Big Five im Land Rover, Route 66 Mustang, Gizeh Pyramiden-Kamelritt & Uluru Outback.',
    descriptionEn: 'Serengeti big five in Land Rover, Route 66 Mustang, Giza camel caravan & Australian Outback.',
    matcher: (t) =>
      t.tags.some((tag) => /safari|afrika|löwen|route 66|roadtrip|ägypten|pyramiden|kamel|outback|australien|uluru|costa rica|regenwald|abenteuer/i.test(tag)) ||
      /safari|lion|serengeti|route 66|mustang|pyramid|giza|camel|outback|uluru|kangaroo|rainforest/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'city_romance',
    category: 'travel',
    labelDe: '🗼 Weltmetropolen, Romantik & Kultur',
    labelEn: '🗼 World Metropolises & Romance',
    icon: '🗼',
    badgeDe: 'Metropolen & Romantik',
    badgeEn: 'Cities & Romance',
    descriptionDe: 'Paris Eiffelturm & Bistro, Tokyo Shibuya Neon-Nacht, New York Times Square & Venedig Gondeln.',
    descriptionEn: 'Paris Eiffel bistro, Tokyo Shibuya neon night, NYC Times Square yellow cab & Venice gondola.',
    matcher: (t) =>
      t.tags.some((tag) => /paris|eiffelturm|tokyo|japan|shibuya|new york|times square|venedig|gondel|santorini|griechenland|städte|romantik/i.test(tag)) ||
      /paris|eiffel|tokyo|shibuya|new york|times square|venice|gondola|santorini/i.test(t.title + ' ' + t.description),
  },

  // =================== COMIC & NOVEL ===================
  {
    id: 'stickman',
    category: 'comic',
    labelDe: '✏️ Strichmännchen & Minimal-Figuren',
    labelEn: '✏️ Stick Figures & Minimalist Lines',
    icon: '✏️',
    badgeDe: 'Strichmännchen',
    badgeEn: 'Stick Figure',
    descriptionDe: 'Strichmännchen- & Strichweibchen-Animationen, Bürokampf, Hacker, Matrix & Stick-Anime.',
    descriptionEn: 'Stickman & stickwoman animations, office brawl, hacker, matrix & stick-anime.',
    matcher: (t) =>
      t.id.includes('stickman') ||
      t.tags.some((tag) => /strichmännchen|strichweibchen|stickman|stickwoman|alan becker|xkcd|pivot|cyanide/i.test(tag)) ||
      /stickman|stick figure|strichmännchen|strichweibchen|stickwoman/i.test(t.title + ' ' + t.description + ' ' + t.prompt),
  },
  {
    id: 'noir_graphic',
    category: 'comic',
    labelDe: '📖 Noir & Graphic Novel',
    labelEn: '📖 Noir & Graphic Novel',
    icon: '📖',
    badgeDe: 'Noir Graphic',
    badgeEn: 'Noir Graphic',
    descriptionDe: 'Sin City Schwarz-Weiß-Tusche mit Farbtupfer, Mignola Gothic Hellboy & kantige Schatten.',
    descriptionEn: 'Sin City stark black & white ink, Mignola Gothic occult shadows & dark detective.',
    matcher: (t) =>
      t.tags.some((tag) => /noir|sin city|mignola|hellboy|tusche|schwarz-weiß/i.test(tag)) ||
      /sin city|noir|mignola|hellboy|black and white ink/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'superhero_action',
    category: 'comic',
    labelDe: '💥 90s Superhero & Spider-Verse',
    labelEn: '💥 90s Superhero & Spider-Verse',
    icon: '💥',
    badgeDe: 'Superhelden Action',
    badgeEn: 'Superhero Action',
    descriptionDe: 'Jim Lee 90er Schraffuren, Spider-Verse Halftone Dots, Neon-Action & wehende Umhänge.',
    descriptionEn: 'Jim Lee 90s crosshatching, Spider-Verse halftone dots, kinetic comic action & capes.',
    matcher: (t) =>
      t.tags.some((tag) => /superhero|jim lee|spider-verse|halftone|90s comic/i.test(tag)) ||
      /jim lee|spider-verse|superhero|halftone/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'manga_scifi',
    category: 'comic',
    labelDe: '⚡ Manga, Anime & Moebius',
    labelEn: '⚡ Manga, Anime & Moebius',
    icon: '⚡',
    badgeDe: 'Manga & Moebius',
    badgeEn: 'Manga & Moebius',
    descriptionDe: 'Akira Cyberpunk Manga mit Speedlines, Moebius Sci-Fi Ligne Claire & surreale Welten.',
    descriptionEn: 'Akira cyberpunk manga with speedlines, Moebius Sci-Fi ligne claire & surreal worlds.',
    matcher: (t) =>
      t.tags.some((tag) => /manga|anime|akira|moebius|ligne claire/i.test(tag)) ||
      /manga|anime|akira|moebius|ligne claire/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'painted_classic',
    category: 'comic',
    labelDe: '🎨 Alex Ross & Klassiker',
    labelEn: '🎨 Alex Ross & Classic Painted',
    icon: '🎨',
    badgeDe: 'Painted Comic',
    badgeEn: 'Painted Comic',
    descriptionDe: 'Alex Ross Gouache-Malerei, Vintage 50s Pop-Art & klassischer franko-belgischer Comic.',
    descriptionEn: 'Alex Ross painted gouache masterwork, vintage 50s pop-art & Franco-Belgian classics.',
    matcher: (t) =>
      t.tags.some((tag) => /alex ross|vintage|pop-art|franco-belge|gouache/i.test(tag)) ||
      /alex ross|vintage 50s|pop-art|painted/i.test(t.title + ' ' + t.description),
  },

  // =================== BAU & HANDWERK (CONSTRUCTION) ===================
  {
    id: 'rohbau',
    category: 'bau',
    labelDe: '🏗️ Rohbau, Beton & Hochbau',
    labelEn: '🏗️ Structural, Concrete & High-Rise',
    icon: '🏗️',
    badgeDe: 'Rohbau & Beton',
    badgeEn: 'Concrete & Structure',
    descriptionDe: 'Fundamentgießen, Stahlbeton-Vibrieren, Schalungen und Kran-Montage.',
    descriptionEn: 'Foundation pouring, reinforced concrete vibrating, formwork & crane lifts.',
    matcher: (t) =>
      t.tags.some((tag) => /beton|rohbau|fundament|stahl|kran|hochbau/i.test(tag)) ||
      /beton|rohbau|fundament|hochbau|concrete|crane/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'holzbau',
    category: 'bau',
    labelDe: '🪵 Holzbau & Dachstuhl',
    labelEn: '🪵 Timber Framing & Roofing',
    icon: '🪵',
    badgeDe: 'Holz & Dach',
    badgeEn: 'Timber & Roof',
    descriptionDe: 'Zimmerer Richtfest, Massivholz-Blockhaus & Dachdecker-Handwerk.',
    descriptionEn: 'Carpentry beam assembly, log cabin crafting & roof tiling.',
    matcher: (t) =>
      t.tags.some((tag) => /holz|dach|zimmerer|balken|blockhaus/i.test(tag)) ||
      /holz|dach|timber|carpentry|roof/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'ausbau',
    category: 'bau',
    labelDe: '⚡ Ausbau, Sanitär & Handwerk',
    labelEn: '⚡ Interior Craft, Plumbing & Electrical',
    icon: '⚡',
    badgeDe: 'Handwerk & Ausbau',
    badgeEn: 'Interior Trades',
    descriptionDe: 'Elektro-Schaltkasten, Kupferschweißen, Fliesenleger-Präzision & Maler.',
    descriptionEn: 'Electrical switchgear, copper pipe soldering, tiling precision & painting.',
    matcher: (t) =>
      t.tags.some((tag) => /schweißen|elektro|sanitär|fliesen|maler|ausbau/i.test(tag)) ||
      /schweißen|elektro|sanitär|handwerk|electrician|plumber|tiler/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'maschinen',
    category: 'bau',
    labelDe: '🚜 Bagger & Erdarbeiten',
    labelEn: '🚜 Excavation & Heavy Equipment',
    icon: '🚜',
    badgeDe: 'Baumaschinen',
    badgeEn: 'Heavy Equipment',
    descriptionDe: 'Kettenbagger im Steinbruch, Tunnelbohrmaschine & schwere Radlader.',
    descriptionEn: 'Hydraulic excavators in quarries, tunnel boring machines & heavy wheel loaders.',
    matcher: (t) =>
      t.tags.some((tag) => /bagger|steinbruch|tunnel|erdarbeit|lkw/i.test(tag)) ||
      /bagger|steinbruch|tunnel|excavator|quarry/i.test(t.title + ' ' + t.description),
  },

  // =================== HORROR ===================
  {
    id: 'gothic',
    category: 'horror',
    labelDe: '🏚️ Spukhaus & Gothic Horror',
    labelEn: '🏚️ Haunted House & Gothic',
    icon: '🏚️',
    badgeDe: 'Gothic Horror',
    badgeEn: 'Gothic Horror',
    descriptionDe: 'Verlassene Gruft, knarrende viktorianische Villa, Nebel & Kerzenschein.',
    descriptionEn: 'Abandoned crypt, creaking Victorian mansion, fog & candlelight.',
    matcher: (t) =>
      t.tags.some((tag) => /gruft|villa|gothic|spuk|wald|kerze/i.test(tag)) ||
      /gruft|villa|gothic|crypt|mansion|cabin/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'vhs',
    category: 'horror',
    labelDe: '📼 Found Footage & Body Horror',
    labelEn: '📼 Found Footage & Body Horror',
    icon: '📼',
    badgeDe: 'Found Footage',
    badgeEn: 'Found Footage',
    descriptionDe: 'Körnige VHS-Aufnahmen, Nachtsicht-Kamera & verstörende Phänomene.',
    descriptionEn: 'Gritty VHS camcorder tapes, green night-vision & analog horror glitches.',
    matcher: (t) =>
      t.tags.some((tag) => /vhs|found footage|nachtsicht|glitch|sanatorium/i.test(tag)) ||
      /vhs|found footage|night vision|camcorder/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'creature',
    category: 'horror',
    labelDe: '👽 Cosmic & Creature Horror',
    labelEn: '👽 Cosmic & Creature Horror',
    icon: '👽',
    badgeDe: 'Creature Horror',
    badgeEn: 'Creature Horror',
    descriptionDe: 'Lovecraftianische Tiefsee-Monstrositäten, Seuchen & Schattenwesen.',
    descriptionEn: 'Lovecraftian abyssal leviathans, infection quarantine & shadow fiends.',
    matcher: (t) =>
      t.tags.some((tag) => /tiefsee|creature|alien|monster|lovecraft|seuche/i.test(tag)) ||
      /monster|creature|alien|lovecraft|abyss/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'lovecraft_cosmic',
    category: 'horror',
    labelDe: '🐙 Lovecraftian & Cosmic Horror (Küsten & R\'lyeh)',
    labelEn: '🐙 Lovecraftian & Cosmic Horror (Coasts & R\'lyeh)',
    icon: '🐙',
    badgeDe: 'Lovecraft & Kosmisch',
    badgeEn: 'Lovecraftian',
    descriptionDe: 'Uralter Küstennebel, Innsmouth-Klippen, non-euklidische Basalt-Architektur & titanische Tentakel.',
    descriptionEn: 'Ancient coastal fog, Innsmouth cliffs, non-euclidean basalt architecture & titanic tentacles.',
    matcher: (t) =>
      t.tags.some((tag) => /lovecraft|r\'lyeh|cthulhu|küste|nebel|tentakel|basalt|innsmouth|kosmisch/i.test(tag)) ||
      /lovecraft|r\'lyeh|cthulhu|küste|nebel|tentakel|basalt|innsmouth|mist|cosmic|non-euclidean/i.test(t.title + ' ' + t.description + ' ' + t.prompt),
  },
  {
    id: 'zombie_apocalypse',
    category: 'horror',
    labelDe: '🧟 Zombie Apocalypse (The Walking Dead Style)',
    labelEn: '🧟 Zombie Apocalypse (The Walking Dead Style)',
    icon: '🧟',
    badgeDe: 'Zombie Apocalypse',
    badgeEn: 'Zombie Survival',
    descriptionDe: 'Verlassene Autobahnen, riesige Walker-Horden, Überlebenslager & postapokalyptischer Grusel.',
    descriptionEn: 'Abandoned highways, massive walker hordes, survival camps & post-apocalyptic dread.',
    matcher: (t) =>
      t.tags.some((tag) => /zombie|walking dead|horde|apokalypse|survival|walker|highway/i.test(tag)) ||
      /zombie|walker|walking dead|horde|apocalypse|wasteland/i.test(t.title + ' ' + t.description + ' ' + t.prompt),
  },
  {
    id: 'evil_dead_splatter',
    category: 'horror',
    labelDe: '🩸 Evil Dead & Splatter (Over-the-Top Gore)',
    labelEn: '🩸 Evil Dead & Splatter (Over-the-Top Gore)',
    icon: '🩸',
    badgeDe: 'Evil Dead Splatter',
    badgeEn: 'Over-The-Top Gore',
    descriptionDe: 'Kettensägen-Action, besessene Deadites, Blutgeysire, Necronomicon & Waldhützen-Terror.',
    descriptionEn: 'Chainsaw action, possessed deadites, blood geysers, Necronomicon & cabin terror.',
    matcher: (t) =>
      t.tags.some((tag) => /evil dead|deadite|kettensäge|splatter|gore|necronomicon|blut|keller/i.test(tag)) ||
      /evil dead|deadite|chainsaw|splatter|gore|blood|necronomicon/i.test(t.title + ' ' + t.description + ' ' + t.prompt),
  },

  // =================== SCI-FI ===================
  {
    id: 'space',
    category: 'scify',
    labelDe: '🚀 Deep Space & Raumschiffe',
    labelEn: '🚀 Deep Space & Starships',
    icon: '🚀',
    badgeDe: 'Deep Space',
    badgeEn: 'Deep Space',
    descriptionDe: 'Gigantische Dreadnoughts am Hyperraum-Sprungpunkt & Raumstationen.',
    descriptionEn: 'Colossal dreadnoughts exiting warp drive & orbital megastations.',
    matcher: (t) =>
      t.tags.some((tag) => /raumschiff|warp|weltall|station|orbit/i.test(tag)) ||
      /raumschiff|warp|starship|dreadnought|station/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'planets',
    category: 'scify',
    labelDe: '🪐 Fremde Welten & Kolonien',
    labelEn: '🪐 Alien Worlds & Colonies',
    icon: '🪐',
    badgeDe: 'Alien Welten',
    badgeEn: 'Alien Worlds',
    descriptionDe: 'Mars-Kuppelbasen, biolumineszente Dschungelplaneten & Eismonde.',
    descriptionEn: 'Mars biodome colonies, glowing alien jungles & cryo ice moons.',
    matcher: (t) =>
      t.tags.some((tag) => /kolonie|mars|planet|dschungel|mond/i.test(tag)) ||
      /kolonie|mars|planet|alien world|dome/i.test(t.title + ' ' + t.description),
  },
  {
    id: 'cyber_ai',
    category: 'scify',
    labelDe: '🤖 Kybernetik & Synth-Androiden',
    labelEn: '🤖 Cybernetics & Android AI',
    icon: '🤖',
    badgeDe: 'Androiden & KI',
    badgeEn: 'Android AI',
    descriptionDe: 'Synthetische Menschen, Hologramm-Kerne & neuronale Interfaces.',
    descriptionEn: 'Synthetic android assembly, holographic AI cores & neural interfaces.',
    matcher: (t) =>
      t.tags.some((tag) => /android|ki|roboter|cyber|labor|hologramm/i.test(tag)) ||
      /android|robot|ai core|synthetic|hologram/i.test(t.title + ' ' + t.description),
  },

  // =================== EROTIK ===================
  {
    id: 'boudoir',
    category: 'erotik',
    labelDe: '💋 Boudoir & Intimität',
    labelEn: '💋 Boudoir & Intimacy',
    icon: '💋',
    badgeDe: 'Boudoir',
    badgeEn: 'Boudoir',
    descriptionDe: 'Edle Seidenwäsche, Satinlaken, intime Schlafzimmerszenen und sinnliches Gegenlicht.',
    descriptionEn: 'Premium lace lingerie, satin sheets, intimate bedroom scenes and warm sensual backlight.',
    matcher: (t) =>
      t.id.includes('boudoir') ||
      t.tags.some((tag) => /boudoir|satin|spitze|lace|intimacy|intim/i.test(tag)) ||
      /boudoir|satin|lace|lingerie|intimacy|intim/i.test(t.title + ' ' + t.description + ' ' + t.prompt),
  },
  {
    id: 'akt',
    category: 'erotik',
    labelDe: '🎨 Fine Art Akt (Artistic Nude)',
    labelEn: '🎨 Fine Art Nude',
    icon: '🎨',
    badgeDe: 'Künstlerischer Akt',
    badgeEn: 'Fine Art Nude',
    descriptionDe: 'Skulpturale Lichtsetzung, Chiaroscuro, nackter Torso, Projektions-Akt und klassische Ästhetik.',
    descriptionEn: 'Sculptural lighting, chiaroscuro contrast, bare torso, abstract projections and classical aesthetics.',
    matcher: (t) =>
      t.tags.some((tag) => /akt|nude|chiaroscuro|skulptur|projection|sculpture/i.test(tag)) ||
      /akt|nude|chiaroscuro|sculpture|sculpted|projection|torso|naked/i.test(t.title + ' ' + t.description + ' ' + t.prompt),
  },
];

export interface SubCategoryOption {
  id: string;
  label: string;
  badge: string;
  icon: string;
  count: number;
  description: string;
}

/**
 * Returns available subcategories for a given category with template counts
 */
export function getSubcategoriesForCategory(
  category: StyleCategory | string,
  templates: PresetTemplate[],
  language: 'de' | 'en' = 'de'
): SubCategoryOption[] {
  const isEn = language === 'en';
  const categoryTemplates = templates.filter((t) => t.category === category);

  // Default "All" option
  const allOption: SubCategoryOption = {
    id: 'all',
    label: isEn ? `✨ All ${getCategoryLabelEn(category)} (${categoryTemplates.length})` : `✨ Alle ${getCategoryLabelDe(category)} (${categoryTemplates.length})`,
    badge: isEn ? 'All' : 'Alle',
    icon: '✨',
    count: categoryTemplates.length,
    description: isEn ? 'Show all templates in this category' : 'Alle Vorlagen dieser Kategorie anzeigen',
  };

  const matchingConfigs = SUBCATEGORIES_CONFIG.filter((c) => c.category === category);

  if (matchingConfigs.length === 0) {
    return [allOption];
  }

  const subOptions: SubCategoryOption[] = matchingConfigs.map((cfg) => {
    const count = categoryTemplates.filter((t) => cfg.matcher(t)).length;
    return {
      id: cfg.id,
      label: `${cfg.labelDe} (${count})`,
      badge: isEn ? cfg.badgeEn : cfg.badgeDe,
      icon: cfg.icon,
      count,
      description: isEn ? cfg.descriptionEn : cfg.descriptionDe,
    };
  });

  return [allOption, ...subOptions];
}

/**
 * Filter templates by selected subcategory ID
 */
export function filterTemplatesBySubcategory(
  templates: PresetTemplate[],
  category: StyleCategory | string,
  subcategoryId: string
): PresetTemplate[] {
  const catTemplates = templates.filter((t) => t.category === category);
  if (!subcategoryId || subcategoryId === 'all') {
    return catTemplates;
  }

  const config = SUBCATEGORIES_CONFIG.find(
    (c) => c.category === category && c.id === subcategoryId
  );

  if (!config) {
    return catTemplates;
  }

  return catTemplates.filter((t) => config.matcher(t));
}

/**
 * Identify the subcategory for a given template
 */
export function getTemplateSubcategory(
  template: PresetTemplate,
  language: 'de' | 'en' = 'de'
): { id: string; label: string; badge: string; icon: string } | null {
  const isEn = language === 'en';
  const matchingConfigs = SUBCATEGORIES_CONFIG.filter((c) => c.category === template.category);

  for (const cfg of matchingConfigs) {
    if (cfg.matcher(template)) {
      return {
        id: cfg.id,
        label: isEn ? cfg.labelEn : cfg.labelDe,
        badge: isEn ? cfg.badgeEn : cfg.badgeDe,
        icon: cfg.icon,
      };
    }
  }

  return null;
}

function getCategoryLabelDe(cat: string): string {
  const map: Record<string, string> = {
    travel: 'Tourismus & Reisen',
    immobilien: 'Immobilien',
    comic: 'Comics',
    bau: 'Bau & Handwerk',
    horror: 'Horror',
    scify: 'Sci-Fi',
    action: 'Action',
    fantasy: 'Fantasy',
    cyberpunk: 'Cyberpunk',
    sitcom: 'Sitcoms',
    nature: 'Natur',
    restaurant: 'Gastronomie',
    fashion: 'Fashion',
    erotik: 'Erotik & Akt-Modus',
    war: 'Kriegsfilm',
    politics: 'Politik',
    immersive: 'Immersive Visuals',
  };
  return map[cat] || cat;
}

function getCategoryLabelEn(cat: string): string {
  const map: Record<string, string> = {
    travel: 'Tourism & Travel',
    immobilien: 'Real Estate',
    comic: 'Comic',
    bau: 'Construction',
    horror: 'Horror',
    scify: 'Sci-Fi',
    action: 'Action',
    fantasy: 'Fantasy',
    cyberpunk: 'Cyberpunk',
    sitcom: 'Sitcom',
    nature: 'Nature',
    restaurant: 'Dining',
    fashion: 'Fashion',
    erotik: 'Sensual Art & Boudoir',
    war: 'War Film',
    politics: 'Politics',
    immersive: 'Immersive Visuals',
  };
  return map[cat] || cat;
}
