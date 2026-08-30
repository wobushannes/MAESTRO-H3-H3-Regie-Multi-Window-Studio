export interface ThemeDefinition {
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
  narratorVoices: string[];
}

export const PROMPT_THEMES: Record<string, ThemeDefinition> = {
  birthday: {
    titles: [
      "THE BIRTHDAY JUBILEE", "ALPENLÄNDISCHES GEBURTSTAGS-STÄNDCHEN", "80s ARENA ROCK BIRTHDAY SERENADE",
      "ROADHOUSE BIKER BIRTHDAY RIFF", "NORDIC DEATH METAL BIRTHDAY GROWL", "90s BOYBAND RAIN SERENADE",
      "GATSBY BARBERSHOP BIRTHDAY SWING", "SKÁL: THE VIKING MEAD-HALL BIRTHDAY", "NEON PROTOCOL: BIRTHDAY 2099",
      "CAMPFIRE INDIE-FOLK BIRTHDAY CHORD", "GOSPEL SOUL BIRTHDAY JUBILEE", "DAS GROSSE BIERZELT-STÄNDCHEN",
      "THE PIRATE CAPTAIN'S RUM JUBILEE", "ACOUSTIC SUNSET BIRTHDAY HARMONY", "VELVET JAZZ CLUB BIRTHDAY SERENADE"
    ],
    descriptions: [
      "Picture 1: The radiant birthday person in festive attire before a glowing candlelit cake. Picture 2-4: Charismatic male musicians passionately serenading them with rich genre-specific musical instruments and harmonies.",
      "Heartwarming birthday serenade with the birthday child smiling at the center table and enthusiastic singers delivering an unforgettable musical tribute.",
      "High-energy celebratory musical spectacle dedicated to the birthday VIP with rich vocal harmonies, instruments, and festive party atmosphere."
    ],
    prompts: [
      "CINEMATIC 4-SHOT BIRTHDAY SERENADE: [Picture 1: The radiant Birthday Person (Geburtstagskind) smiling joyfully before a glowing sparkler birthday cake]. [Picture 2, 3, 4: Passionate men and musicians singing an energetic four-part birthday song directly to them with heartfelt grins, instruments, and celebratory energy].",
      "CINEMATIC 4-SHOT FESTIVE BIRTHDAY TRIBUTE: [Picture 1: The guest of honor seated in the spotlight enjoying their special day beside a magnificent dessert]. [Picture 2, 3, 4: An enthusiastic vocal band leaning in with instruments and microphones, serenading them in perfect polyphonic harmony].",
      "CINEMATIC 4-SHOT EPIC BIRTHDAY BALLAD: [Picture 1: The beaming birthday protagonist raising a toast under festive lights]. [Picture 2, 3, 4: Four passionate musicians performing a legendary birthday anthem with guitars, brass, and soaring vocal melodies]."
    ],
    cameras: [
      "Intimate smooth dolly glide tracking from the radiant birthday guest to the passionate singing ensemble",
      "Dynamic 360-degree orbital sweep connecting the smiling protagonist with the energetic singing band",
      "Lively handheld eye-level pan capturing spontaneous musical laughter, singing gestures, and festive toasts",
      "Low-angle heroic wide push-in framing the multi-part vocal choir serenading the birthday star"
    ],
    lightings: [
      "Warm golden candlelight and sparkler reflections mixed with festive ambient party fairy lights",
      "Vibrant celebratory stage lighting with warm amber spotlights, soft backlight, and sparkling bokeh",
      "Atmospheric cozy tavern amber glow with flickering cake candles illuminating joyful singing faces",
      "Cinematic golden hour sunlight streaming through festive ribbons with sparkling confetti reflections"
    ],
    lenses: [
      "35mm Anamorphic Prime lens (T1.5), warm shallow depth of field, creamy candle bokeh",
      "50mm Portrait Cine Prime with rich organic color fidelity and delicate halation on candle flames",
      "28mm Wide Cine lens capturing dynamic multi-shot group choreography and festive room energy",
      "85mm Ultra-Fast Portrait glass (T1.2) creating creamy background separation and emotional intimacy"
    ],
    clothes: [
      "Picture 1: Elegant celebratory evening attire with festive birthday badge. Pictures 2-4: Authentic musical performance stage outfits and coordinated band attire.",
      "Picture 1: Radiant birthday party outfit with sparkling jewelry. Pictures 2-4: Traditional festive instruments, vests, and crisp performance shirts.",
      "Picture 1: Stylish party wardrobe and celebratory toast glass. Pictures 2-4: Leather jackets, stage vests, and vintage musical instruments."
    ],
    wardrobeLabel: [
      "Festive Birthday Regalia & Musical Band Attire",
      "Bespoke Celebratory Outfits & Musician Stage Wear",
      "Traditional Festive Party Wardrobe & Choir Garb"
    ],
    audios: [
      "Rousing acoustic and vocal birthday harmonies, cheering crowd applause, clinking celebration glasses, and laughter.",
      "Epic four-part vocal serenade, brass and guitar flourishes, joyful shout-outs: 'Happy Birthday to you!', and party claps.",
      "Warm heartfelt acoustic chords, swelling musical choir, festive room cheer, and resonant birthday toasts."
    ],
    dialogues: [
      "Singers (in rich 4-part harmony): 'Happy Birthday to you, three cheers for the birthday star!'",
      "Frontman: 'This song is dedicated to the finest legend in the room — Happy Birthday!'",
      "Ensemble: 'Hoch sollst du leben! A toast to your glorious year ahead!'"
    ],
    narratorVoices: [
      "Warm, hearty, celebratory male narrator voice with affectionate charisma and festive joy",
      "Energetic, charismatic party host voice with musical enthusiasm and warmth",
      "Smooth, soulful broadcaster with deep resonant delivery and celebratory gravitas"
    ]
  },
  horror: {
    titles: [
      "THE CRYPT OF RAVENSWOOD", "SILENT HILL CABIN", "SOCIETY OF THE INVERTED EYE", "BLACKWATER BAYOU CRYPT",
      "PUPPET MASTER'S BASEMENT", "NIGHTMARE IN SECTOR 9", "THE SHADOW UNDER THE WELL", "GHOST RADIO STATIC",
      "DECAYING SANATORIUM RECORDING", "SACRIFICE OF THE DEEP SHADOW", "WHISPERING ASYLUM CORRIDOR", "MIDNIGHT AT CROW MANOR",
      "THE CRAWLING BASEMENT CEILING", "OBSIDIAN ALTAR AWAKENING", "THE FOGBOUND CEMETERY GATE", "PHANTOM LIGHTHOUSE BEACON",
      "THE CURSE OF BLACKWOOD CHAPEL", "RUSTED SEWER LABYRINTH", "BURIED BENEATH THE CATHEDRAL", "VOICES FROM THE CHIMNEY"
    ],
    descriptions: [
      "Abandoned crypt, dense flowing fog, mystic runes, and deep cinematic trailer impacts.",
      "Gloomy remote forest cabin, flickering kerosene lantern, rotting floorboards and sinister whispers.",
      "Secret occult coven gathered in a shadowy basement under levitating ritual candles.",
      "Swampy burial mound with dripping mud, mossy weathered gravestones, and eerie will-o'-the-wisps.",
      "Dusty puppet maker's workshop, suspended marionettes, sudden unsettling eye movement.",
      "Derelict psychiatric ward with peeling paint, flickering fluorescent tubes, and distant metallic scraping.",
      "Subterranean catacombs with ancient bone walls and an unearthly hum emanating from deep fissures."
    ],
    prompts: [
      "A terrified investigator (picture 1) holding a flickering copper lantern walks slowly through an ancient mossy stone crypt. Thick tendrils of fog flow across weathered statues while dust particles dance in the cold beam.",
      "Inside a dark Gothic chamber with ancient grimoires scattered across a blood-red rug. In the center, a heavy iron-bound wooden chest begins to rattle violently from within.",
      "An old wooden cabin interior during a violent rainstorm. Rusted chains hang from the ceiling beams, swinging gently in the draft, while shadowy silhouettes lurk outside the misted window.",
      "A claustrophobic basement hallway lined with rusted iron pipes dripping dark liquid. A lone explorer (picture 1) shines a beam into an open doorway where floorboards groan rhythmically.",
      "An eerie candlelit altar surrounded by levitating wax candles. Black smoke spirals upward forming humanoid silhouettes that whisper unintelligible incantations."
    ],
    cameras: [
      "Claustrophobic low-angle slow dolly push-in with organic handheld breathing",
      "Dramatic 360-degree orbital track shot around the ritual center piece",
      "Jittery hand-held camera pan revealing hidden details in deep shadows",
      "Slow agonizing Dutch-angle creeping forward glide matching heavy footsteps",
      "Unsettling low floor-level tracking shot sliding beneath rusted bed frames"
    ],
    lightings: [
      "High contrast Chiaroscuro with harsh moonlight casting iron grate shadows",
      "Flickering pale green fluorescent tube lights with absolute pitch-black corners",
      "Warm candle flame flickering contrasted with cold blue twilight spill",
      "Single directional copper lantern spotlight beam piercing swirling volumetric smoke",
      "Subtle crimson rim lighting outlining menacing silhouettes in darkness"
    ],
    lenses: [
      "16mm vintage gritty horror lens with heavy vignette and thick dust particles",
      "35mm Anamorphic lens with cinematic horizontal flare and authentic theatrical grain",
      "8mm extreme wide fisheye with chromatic aberration and edge distortion",
      "50mm vintage prime lens with creamy halation around flickering candle flames"
    ],
    clothes: [
      "Heavy wax-coated distressed leather duster coat with brass buckle belt and trail dirt",
      "Tattered white lace Victorian mourning gown stained with dark soot and mud",
      "Weathered dark wool archaeologist jacket with leather elbow patches and utility straps",
      "Dark velvet occult ritual robes with embroidered silver astrological sigils",
      "Damp canvas trenchcoat with turned-up collar and fingerless wool gloves"
    ],
    wardrobeLabel: [
      "Distressed Leather Duster & Adventure Boots",
      "Tattered Victorian Mourning Dress",
      "Archaeologist Jacket with Leather Patches",
      "Occult Velvet Robes & Silver Sigils",
      "Damp Canvas Trenchcoat & Wool Scarf"
    ],
    audios: [
      "[Audio: Low orchestral cello drone, howling cold wind, isolated mechanical clock ticking, deep whispering narrator]",
      "[Audio: Wet dripping water, creaking wooden floorboards, sudden violent metal screech impact, echoing child laugh]",
      "[Audio: Unsettling sub-bass rumble, flickering flame hiss, distant muffled heartbeat, ragged gasping breath]"
    ],
    dialogues: [
      "Investigator: 'Keep your eyes closed... if you look at the ceiling, it knows you are awake.'",
      "Scholar: 'There is no way out. The stairs aren\'t leading down anymore.'",
      "Whisper in the dark: 'We have been waiting for someone with your eyes.'",
      "Protagonist: 'The radio static is spelling out names... and yours is next.'"
    ],
    narratorVoices: [
      "Deep cinematic male narrator with gravelly resonance, slow sinister cadence, and unsettling theatrical gravitas",
      "Soft whispering female voice, intimate close-up microphone, breathy and haunting ASMR delivery"
    ]
  },

  sitcom: {
    titles: [
      "COFFEEHOUSE CHAOS", "THE TURKEY INCIDENT", "SITCOM BLUNDER IN THE KITCHEN", "NEIGHBOR FROM HELL SHOWS UP",
      "ROMANTIC MIXUP IN THE RESTAURANT", "DOG ATE MY HOMEWORK SPECIAL", "LOCKED IN THE FREEZER", "THE MASSIVE ROOMMATE FIGHT",
      "MISTAKEN IDENTITY DOUBLE DATE", "90S APARTMENT RETROSPECTIVE", "THE ACCIDENTAL PROPOSAL", "GARAGE SALE DISASTER",
      "THE FAKE RESUME INTERVIEW", "COUCH STUCK ON THE STAIRCASE", "THE BURNT CASSEROLE CRISIS", "SURPRISE BIRTHDAY FIASCO"
    ],
    descriptions: [
      "Cozy 90s coffeehouse, espresso machine bursts in slow motion, hilarious audience laugh track.",
      "Thanksgiving kitchen drama: The roast turkey is smoking, panic ensues with comedic over-acting.",
      "Chaotic roommate argument over electric bills and missing peanut butter with expressive gestures.",
      "Quirky neighbor bursts into the apartment unannounced juggling frying pans.",
      "A romantic dinner goes awry as both dates show up wearing the exact same costume."
    ],
    prompts: [
      "A retro 90s coffeehouse setting. A clumsy barista accidentally knocks over a huge tray of colorful cupcakes, sending them flying in slow motion towards the laughing audience.",
      "Inside a cozy but chaotic kitchen filled with white smoke. A character (picture 1) stares in absolute comic horror at a charred, smoking giant turkey on the kitchen table.",
      "Two roommates in a brightly lit colorful apartment arguing over a tiny orange cat that is wearing a tiny knitted blue sweater, with expressive hand gestures.",
      "An upscale French restaurant dining table where an overly enthusiastic waiter accidentally flambés a dessert with a giant three-foot fireball, singeing the menu.",
      "A crowded living room couch moving disaster where three friends get a massive velvet sofa permanently wedged diagonally in a narrow staircase hallway."
    ],
    cameras: [
      "Classic multi-cam sit-com wide shot with smooth dolly track",
      "Fast comedic snap-zoom onto the character's shocked face",
      "Over-the-shoulder conversational medium framing with energetic panning",
      "Static theatrical proscenium angle with warm live studio audience framing"
    ],
    lightings: [
      "Bright, flat studio stage lighting with vivid pastel backdrops",
      "Warm afternoon sun spilling through retro venetian blinds",
      "Colorful party string lights illuminating a messy living room",
      "Cozy amber tungsten table lamp glow with bright multi-angle studio fills"
    ],
    lenses: [
      "35mm Television lens with deep depth of field and warm nostalgic color grade",
      "Vibrant retro VHS style tape optics with analog glow and rich contrast",
      "Standard studio television camera lens setup with crisp character isolation"
    ],
    clothes: [
      "Bright neon-patterned 90s windbreaker, oversized denim jeans, and white sneakers",
      "Quirky yellow hand-knit sweater with a huge cartoon cat patch on the front",
      "Retro high-waisted floral print dungarees with red suspenders and striped tee",
      "Oversized flannel button-down over graphic tee with backwards baseball cap"
    ],
    wardrobeLabel: [
      "Nostalgic 90s Windbreaker & Baggy Denim",
      "Quirky Cat-Knit Wool Sweater",
      "Retro Floral Dungarees & Red Suspenders",
      "Oversized Flannel Shirt & Baseball Cap"
    ],
    audios: [
      "[Audio: Upbeat 90s slap-bass guitar riff, cheerful studio audience laughter track, nostalgic tape hiss]",
      "[Audio: Retro sitcom synth theme transition, applause, espresso machine steaming hiss]",
      "[Audio: Comedic slide whistle, brass horn stinger, energetic crowd cheer and claps]"
    ],
    dialogues: [
      "Roommate: 'Tell me you didn\'t invite my boss to the Thanksgiving dinner!'",
      "Neighbor: 'Good news! I found where the smell of burning plastic was coming from!'",
      "Main Character: 'If we don\'t return this llama before noon, the landlord will keep the security deposit!'",
      "Friend: 'You used superglue to fix the wedding cake?!'"
    ],
    narratorVoices: [
      "Enthusiastic 90s television studio announcer with upbeat punchy rhythm, warm analog tone, and comedic flair"
    ]
  },

  scify: {
    titles: [
      "DYSTOPIAN NEON GATEWAY", "HYPERDRIVE COLLAPSE", "THE OBSIDIAN MONOLITH", "CYBERNETIC ARCHEOLOGY",
      "OUTPOST EPSILON BLIZZARD", "ORBITAL SHIPYARD WRECKAGE", "THE ABANDONED GENERATION SHIP", "QUANTUM CORE STABILIZER",
      "REBEL NETRUNNER HANGAR", "DEEP SPACE MINING RIG", "NEBULA DRIFT DRIFTER", "TERRAFORMING SPIRE ALPHA",
      "CHRONO-DISPLACEMENT CHAMBER", "TITAN ATMOSPHERIC HARVESTER", "VOID ANOMALY HORIZON", "SYNTHETIC GENESIS CRADLE"
    ],
    descriptions: [
      "Monolithic spaceship hangar, shimmering plasma gate, FPV camera flight through glowing ion thrusters.",
      "Colossal black alien artifact begins pulsing with radiant blue quantum luminescence.",
      "Sub-zero outpost on a distant methane moon, howling frozen gale, neon hazard beacons.",
      "Robotic arms repairing a battle-damaged star cruiser in zero-gravity orbit.",
      "Cyber-archaeologist scanning glowing golden glyphs inside a crystalline star chamber."
    ],
    prompts: [
      "A giant dark spaceship hangar. In the center, a colossal high-tech starship glows with bright blue ion thrusters preparing for launch into a starlit cosmic rift.",
      "An astronaut (picture 1) stands before a towering, glossy black obsidian monolith in a red dusty alien desert. The monolith is humming, with circuit-like cyan lines glowing.",
      "A high-tech laboratory where floating holographic star charts drift above metal consoles. Sparks fly from a damaged power conduit, illuminating the metallic floor.",
      "Zero-gravity orbital construction yard. Giant robotic gantries weld the hull of an interstellar dreadnought as molten gold sparks drift into the pitch black cosmic void.",
      "A sub-zero research station on Titan. A scientist in a heated heavy space-suit inspects glowing bioluminescent crystal formations embedded in methane ice."
    ],
    cameras: [
      "Slick cinematic FPV drone flight gliding around structural pillars",
      "Epic slow crane shot tilting up to reveal the scale of the cosmic horizon",
      "Smooth stabilization tracking shot behind the walking explorer",
      "Zero-gravity floating drift camera with gentle rotational inertia"
    ],
    lightings: [
      "Cool electric cyan and deep violet laser lighting with haze",
      "Blinding white engine exhaust glow casting intense geometric shadows",
      "Mystical pulsing star cluster ambient light spilling into a dark cockpit",
      "Bioluminescent alien flora glow with sharp specular reflections on visor glass"
    ],
    lenses: [
      "Anamorphic cinematic lens with sharp horizontal blue streaks and wide framing",
      "Crisp high-resolution space photography optics with starburst highlights",
      "8k digital master lens with cold metallic grading and pristine edge acuity"
    ],
    clothes: [
      "Advanced carbon-fiber white space suit with glowing visor and utility straps",
      "Rugged grey tactical mercenary gear with cybernetic armor plating",
      "Long sleek silver duster coat made of smart metallic-weave fabrics",
      "Heavy titanium exoskeleton harness with glowing power conduits"
    ],
    wardrobeLabel: [
      "Carbon Spacesuit & Cyan Helmet Glow",
      "Tactical Mercenary Cybernetic Armor",
      "Silver Smart-Fabric Duster Coat",
      "Titanium Heavy Exoskeleton Rig"
    ],
    audios: [
      "[Audio: Deep resonant starship reactor warp hum, periodic solar wind static, electronic high-pitch pulsing]",
      "[Audio: Airlock depressurization hiss, robotic diagnostic voiceover, heavy hydraulic thud]",
      "[Audio: Cosmic microwave background hum, distant solar flare crackle, computerized countdown]"
    ],
    dialogues: [
      "Commander: 'Initiating warp drive. If the shields fail... we will be scattered across five timelines.'",
      "AI Core: 'Warning. Unidentified lifeform detected within the cooling vents of auxiliary engine B.'",
      "Navigator: 'The coordinates aren\'t leading to a star system. They lead outside the known universe.'",
      "Engineer: 'Reactor containment is at ninety-eight percent. Pull the safety rods now!'"
    ],
    narratorVoices: [
      "Cold monotone cybernetic AI voice with subtle ring-modulation, deep sub-harmonic resonance, and cosmic detachment"
    ]
  },

  bau: {
    titles: [
      "THE SKYLINE BUILDERS", "STEEL CORRIDOR ARCH", "THE FOUNDATION POUR", "CRANE IN THE MORNING FOG",
      "WELDING THE MEGA-GATE", "CONCRETE PUMP HYDRAULICS", "TUNNEL BORING GOLIATH", "THE TIMBER TRUSS MASTERS",
      "SCAFFOLDING SPECTACLE", "ARCHITECTS SITE VISIT", "THE SUSPENSION BRIDGE CABLE", "DEEP CAISSON DRILLING RIG",
      "STRUCTURAL STEEL ASSEMBLY", "HIGH-PRESSURE SLURRY WALL", "EARTHMOVER QUARRY POWER", "SKYSCRAPER SPIDER CRANE"
    ],
    descriptions: [
      "High-rise construction site at sunrise, shower of welding sparks, heavy industrial hydraulics.",
      "Specialist builder assembling massive structural steel girders 200 meters above the city.",
      "Night foundation pour: Colossal concrete pump pours glowing wet slurry into reinforced steel cages.",
      "Giant tower crane piercing through dense morning fog over a sprawling metropolis.",
      "Tunnel boring machine breaking through solid bedrock in a shower of friction sparks."
    ],
    prompts: [
      "A high-altitude skyscraper construction site at dawn. A welder (picture 1) in heavy protective gear joins massive steel beams. Intense bright orange sparks rain down into the blue morning fog below.",
      "A worker stands on a rusted steel scaffolding platform high above a sprawling modern metropolis. He is adjusting a heavy tension cable, with dusty wind blowing past.",
      "A busy construction foundation pit at night. Colossal floodlights illuminate giant concrete mixers pouring gray wet slurry into reinforced steel cages.",
      "Heavy civil engineering mega-project. A massive crawler crane lifts a 100-ton precast bridge section into place over a rushing river as engineers signal from below.",
      "High-rise glazing installation at 80 stories. Suction-cup robotic arms lift giant tempered glass panels against a blazing sunset skyline."
    ],
    cameras: [
      "Dizzying vertical crane-shot sliding down the side of the skyscraper frame",
      "Dynamic low-angle orbital rotation around the roaring concrete pump",
      "Slow macro tracking of the welding torch creating bright orange starbursts",
      "Epic sweeping drone shot orbiting the highest tower crane boom"
    ],
    lightings: [
      "Golden hour sunbeams piercing through half-built concrete walls and dust",
      "Blinding white halogen construction floodlights reflecting off wet steel",
      "Warm fire sparks casting high-contrast silhouettes on metal structures",
      "Diffused overcast industrial daylight with heavy airborne particle haze"
    ],
    lenses: [
      "24mm wide angle with rugged construction lens coating and extreme sharpness",
      "50mm prime portrait lens capturing gritty detail and flying dust particles",
      "Telephoto lens capturing the high-altitude scale against a hazy city"
    ],
    clothes: [
      "Heavy-duty oil-stained denim overalls, safety harness, and fluorescent orange jacket",
      "Flame-retardant split-cowhide welding jacket with dark heavy utility boots",
      "Rugged canvas work trousers, protective knee-pads, and yellow construction hardhat",
      "Hi-vis reflective lime jacket with heavy climbing carabiners and tool belt"
    ],
    wardrobeLabel: [
      "Oil-Stained Overalls & Hi-Vis Safety Vest",
      "Flame-Resistant Cowhide Welding Jacket",
      "Heavy Canvas Work Trousers & Yellow Hardhat",
      "High-Altitude Rigging Harness & Gloves"
    ],
    audios: [
      "[Audio: Metallic clanging, screeching steel grinder, heavy diesel engine idling, deep welding crackle]",
      "[Audio: Concrete pouring slush, hydraulic arm groaning, radio chatter from building crew]",
      "[Audio: Wind whistling across steel beams, air-impact wrench ratcheting, loud crane whistle]"
    ],
    dialogues: [
      "Site Manager: 'This concrete takes twelve hours to cure. Keep the heaters running or the foundation cracks.'",
      "Crane Operator: 'Heavy wind gust incoming from the north! Hold the payload, hold the payload!'",
      "Ironworker: 'Line up the bolt holes! Lower it two inches... lock it down!'",
      "Chief Engineer: 'Fifty stories of glass and steel depend on these four corner pillars.'"
    ],
    narratorVoices: [
      "Gruff, grounded master craftsman voice with authentic resonance, dry wit, and hearty confidence"
    ]
  },

  immobilien: {
    titles: [
      "MINIMALIST CONCRETE HAVEN", "GLASS HOUSE OVER THE CLIFF", "BRUTALIST ARCHITECTURAL GLOW", "TUSCAN SUNSET VILLA",
      "THE SCANDINAVIAN LOFT", "INDUSTRIAL WATERFRONT WAREHOUSE", "THE FLOATING WATER VILLA", "MID-CENTURY FOREST RESIDENCE",
      "MODERN PENTHOUSE RETREAT", "BAUHAUS GEOMETRICS", "KYOTO ZEN COURTYARD RETREAT", "ALPINE TIMBER CHALET",
      "CANTILEVERED HORIZON ESTATE", "MARBLE COURTYARD OASIS", "DESERT MIRAGE MODERNISM", "BIOPHILIC CANOPY PENTHOUSE"
    ],
    descriptions: [
      "Minimalist architectural concrete house in the forest, running water feature, designer furniture.",
      "Cantilevered glass luxury villa over a stormy ocean cliff with breaking waves below.",
      "Sunlit Scandinavian loft with crackling fireplace, soft linen textiles, and polished oak floors.",
      "Industrial waterfront loft warehouse conversion with exposed brick, giant arched windows, and warm ambient lighting.",
      "Glamorous skyscraper penthouse overlooking a glittering night skyline with infinity pool."
    ],
    prompts: [
      "A breathtaking minimalist brutalist villa made of smooth gray concrete, nestled deep within a wet pine forest. Warm interior lighting glows through giant floor-to-ceiling glass panes.",
      "An architectural masterpiece: a cantilevered glass house hanging over a dark rocky cliff. Massive ocean waves crash against the rocks far below under a stormy gray sky.",
      "Inside a beautiful sunlit Scandinavian loft apartment. Sunlight streams past soft linen curtains, reflecting off a polished oak floor. A warm crackling fireplace is visible in the background.",
      "A luxury beachfront modern residence at dusk. A vanishing-edge reflection pool mirrors the lavender sunset sky while warm recessed architectural lights trace the limestone walls.",
      "A mid-century modern pavilion nestled inside a bamboo grove. Natural cedarwood siding, terrazzo floors, and floor-to-ceiling glass walls integrate seamlessly with nature."
    ],
    cameras: [
      "Ultra-smooth architectural slider pan tracking along polished concrete walls",
      "Slow symmetric vertical tilt-up revealing the scale of the glass facade",
      "Wandering cinematic walk-through following a warm shaft of golden light",
      "Precise one-point perspective architectural dolly glide"
    ],
    lightings: [
      "Warm interior ambient lighting contrasted with cold blue forest twilight",
      "Golden hour sunbeams casting dramatic geometrical window shadows on floorboards",
      "Soft diffuse daylight filtering through thick forest canopy and rain",
      "Refined low-voltage architectural LED accent strips highlighting limestone textures"
    ],
    lenses: [
      "21mm ultra-wide architectural lens with zero distortion and premium contrast",
      "35mm prime lens with natural perspective and elegant bokeh",
      "Arri Alexa cinema camera look with ultra-high dynamic range and smooth highlights"
    ],
    clothes: [
      "Elegant black cashmere turtleneck sweater and charcoal tailored wool trousers",
      "Minimalist linen lounge shirt and matching beige relaxed-fit cotton pants",
      "Sophisticated silk robe in olive green over classic loungewear",
      "Architectural tailored monochrome blazer with silk scarf and leather loafers"
    ],
    wardrobeLabel: [
      "Cashmere Turtleneck & Tailored Wool Trousers",
      "Minimalist Linen Lounge Shirt & Pants",
      "Classic Silk Robe & Loungewear",
      "Architectural Monochrome Blazer & Slacks"
    ],
    audios: [
      "[Audio: Soft crackling fireplace, gentle rain dripping on glass, whispering ambient lounge music]",
      "[Audio: Distant ocean waves breaking on rocks, wind blowing through pine needles, high-end silence]",
      "[Audio: Gentle water flowing in stone basin, acoustic nylon-string guitar chords, peaceful birdsong]"
    ],
    dialogues: [
      "Architect: 'The design is not about what we add. It is about what we leave behind.'",
      "Hostess: 'Watch how the light shifts across the concrete at four o\'clock. It\'s like a living painting.'",
      "Designer: 'When glass and raw stone meet with this precision, nature becomes the only artwork you need.'",
      "Realtor: 'This view doesn\'t change with the market. It belongs to eternity.'"
    ],
    narratorVoices: [
      "Sophisticated luxury architectural narrator with velvety smooth articulation, warm confidence, and serene elegance"
    ]
  },

  restaurant: {
    titles: [
      "THE SECRETS OF FLAME & SMOKE", "GOLDEN DRIZZLE OF HONEY", "SUSHI MASTER PRECISION", "THE PERFECT SOUFFLE RISE",
      "WAGYU SEAR SEARING", "ARTISAN CHOCOLATE TEMPERING", "THE COCKTAIL INJECTION", "HAND-PULLED NOODLE STRETCH",
      "WOOD-FIRED NEAPOLITAN BAKE", "THE TRUFFLE SLICE FESTIVAL", "FRENCH COPPER PAN SAUCE", "COPPER DISTILLERY RUM INFUSION",
      "ROASTED COFFEE BEAN ROAST", "PASTRY CARAMEL SCULPTURE", "DRY-AGED RIBEYE CHAR", "MATCHA WHISK CEREMONY"
    ],
    descriptions: [
      "A5 Wagyu beef searing on white-hot binchotan charcoal in slow motion with rising flames.",
      "Master sushi chef slicing translucent red tuna with a razor-sharp Yanagiba knife.",
      "Artisan baker sliding a leopard-crusted Neapolitan pizza into a 900-degree wood-fired oven.",
      "Glossy liquid chocolate folded continuously on white marble slab with rising steam.",
      "Mixologist infusing smoky single malt whisky with charred rosemary vapor under a glass cloche."
    ],
    prompts: [
      "An extreme macro shot of a thick cut of high-grade Wagyu beef searing on a glowing hot charcoal grill. Fat droplets fall onto the embers, igniting brilliant small flames in super slow motion.",
      "A Michelin-star chef (picture 1) in a spotless black apron carefully places delicate edible flowers onto an artistically plated lobster dish under warm kitchen lamps.",
      "Artisanal dark chocolate tempering: silky, glossy liquid chocolate is folded continuously on a cold white marble slab, steam gently rising in a rustic bakery.",
      "A master mixologist pours a crimson velvet cocktail over a hand-carved crystal-clear ice diamond, releasing a fragrant cloud of aromatic citrus mist.",
      "A wood-fired pizza oven at 485 degrees Celsius: a crisp sourdough pizza crust bubbles and browns in seconds as fresh buffalo mozzarella melts into vibrant tomato sauce."
    ],
    cameras: [
      "Extreme macro probe lens tracking through falling micro-salt crystals",
      "Super slow-motion 120fps camera push-in close to the sizzling pan",
      "Dynamic hand-held circling tracking the chef's precise knife cuts",
      "Fluid high-speed phantom camera capturing splashing liquid droplets in mid-air"
    ],
    lightings: [
      "Dramatic warm side-lighting emphasizing food texture, steam, and glossiness",
      "Fiery orange charcoal glow illuminating dancing smoke trails",
      "Soft, luxurious restaurant candle light reflecting on crystal glassware",
      "Crisp chef-line spotlight highlighting glistening glaze and micro-herbs"
    ],
    lenses: [
      "90mm dedicated macro lens capturing incredible close-up food details",
      "50mm anamorphic lens with beautiful oval bokeh and warm food glow",
      "High contrast high-speed cinema lens rendering deep rich appetizing tones"
    ],
    clothes: [
      "Tailored black chef's jacket made of heavy canvas with gold embroidery and dark apron",
      "Crisp white executive chef coat, striped linen towel tucked at the waist",
      "Rustic linen bakery apron over a simple chambray button-down shirt",
      "Artisan sommelier tailored vest with gold pocket watch chain and dark tie"
    ],
    wardrobeLabel: [
      "Black Chef Jacket with Gold Embroidery & Apron",
      "Crisp White Executive Chef Coat & Linen Towel",
      "Rustic Linen Bakery Apron & Chambray Shirt",
      "Artisan Sommelier Tailored Vest & Tie"
    ],
    audios: [
      "[Audio: Loud sizzling grease, crackling charcoal embers, liquid pouring into crystal, deep kitchen chatter]",
      "[Audio: Razor-sharp knife slicing fish on wood, copper pan clinking, sizzling herb butter]",
      "[Audio: Bread crust crackling as it cools, champagne cork pop, clinking crystal flutes]"
    ],
    dialogues: [
      "Chef: 'Flavor is ninety percent aroma. If you lose the smoke, you lose the soul of the dish.'",
      "Sommelier: 'This vintage has notes of dark cherry and charred oak. It cuts perfectly through the fat.'",
      "Pastry Master: 'Sugar has no mercy. Ten seconds too long and caramel turns to ash.'",
      "Sous Chef: 'The reduction is ready. Plate immediately before the emulsion breaks!'"
    ],
    narratorVoices: [
      "Passionate Michelin-star culinary presenter with warm sensory descriptions, velvety cadence, and French-gourmet nuance"
    ]
  },

  cyberpunk: {
    titles: [
      "THE RED-LIGHT HACKER GRID", "CHROME DISCO REBELLION", "CYBERPUNK ALLEYWAY RAIN", "STREET SAMURAI DUEL",
      "NETRUNNER CHROME PROTOCOL", "NEON DRIFT CARS IN SHIBUYA", "THE BLACK MARKET RIOCARD", "ANDROID REPAIR WORKBENCH",
      "NEURAL UPLOAD SEQUENCE", "MEGACITY SPRAWL HORIZON", "NEO-SEOUL ALLEYWAY ASSASSIN", "SYNTHETIC DRUG CARTEL VAULT",
      "AUGMENTED BODY SHOP", "ORBITAL ELEVATOR HIJACK", "HOLOGRAPHIC GEISHA SPRAWL", "UNDERGROUND CYBER ARENA"
    ],
    descriptions: [
      "Rain-slicked cyberpunk alleyway, magenta and cyan neon signs reflecting in oil puddles.",
      "Street Samurai drawing a glowing blue high-frequency katana blade under heavy downpour.",
      "Netrunner with glowing neural ports typing furiously on a floating holographic interface.",
      "Slick matte-black sports car drifting through neon-drenched streets of Neo-Tokyo.",
      "A damaged android suspended by wires being repaired in a dark basement workshop."
    ],
    prompts: [
      "A rain-slicked cyberpunk alleyway at midnight. Thousands of flickering pink, cyan, and violet neon signs reflect perfectly in dark oil puddles. A lone figure in a glowing collar walks past.",
      "A skilled street samurai (picture 1) standing under heavy driving rain, pulling a glowing blue plasma katana from a sleek cybernetic scabbard on her back.",
      "An underground netrunner bunker. A character sits surrounded by twelve glowing monitors showing fast scrolling green code, with neural optical cables plugged into her neck.",
      "High-speed cybernetic chase across rain-soaked multi-level highway overpasses. Armored motorcycle riders with glowing visor helmets weave between flying transport drones.",
      "A clandestine cyber-clinic in an industrial basement. A surgeon with multi-jointed mechanical fingers installs glowing fiber-optic ocular implants into a patient."
    ],
    cameras: [
      "Low-angle camera gliding just above the reflective wet asphalt puddles",
      "Slick whip-pan from a flickering sign to a cybernetic eye implant close-up",
      "Slow tracking shot behind the character walking toward a massive neon tower",
      "High-speed FPV drone dive through multi-level skybridges and holographic ads"
    ],
    lightings: [
      "Intense neon-drenched pink and teal lighting with thick artificial smog",
      "Flickering yellow sodium streetlights casting long moody silhouettes",
      "Strobe cybernetic eye implants flashing blue and red in the pitch black",
      "Holographic billboard spill casting rainbow chromatic aberrations across rain puddles"
    ],
    lenses: [
      "50mm anamorphic lens with horizontal blue flares and heavy rain distortion",
      "Vintage movie lens with rich color saturation and deep dark contrast",
      "High-tech digital sensor rendering deep clean shadows and vibrant neon glows"
    ],
    clothes: [
      "High-collared black cybernetic leather duster jacket with integrated LED piping",
      "Tattered techwear hoodie with strap buckles, tactical chest rig, and visor glasses",
      "Chrome-plated robotic arm armor plates over a fitted dark carbon-weave jumpsuit",
      "Neo-Tokyo street ronin coat with holographic Kanji embroidery and armored collar"
    ],
    wardrobeLabel: [
      "LED-Lined Cyber Leather Duster & High Collar",
      "Techwear Strapped Hoodie & Tactical Rig",
      "Carbon Jumpsuit & Chrome Cybernetics",
      "Neo-Tokyo Street Ronin Robes & Kanji"
    ],
    audios: [
      "[Audio: Retro synthwave pulse, digital glitching static, heavy sub-bass drop, neon transformer buzz]",
      "[Audio: Heavy rain falling on metal sheeting, high-tech computer typing, cybernetic servo whirring]",
      "[Audio: Plasma blade hum, screeching magnetic brakes, digitized police drone siren]"
    ],
    dialogues: [
      "Hacker: 'I\'ve bypassed their firewalls. We have ninety seconds before the strike team locks down the block.'",
      "Street Dealer: 'This chip has memory files they killed half of sector four to hide. Don\'t lose it.'",
      "Samurai: 'Chrome doesn\'t bleed, but it sure sparks when you cut the power lines.'",
      "Netrunner: 'They think they own the grid. Tonight, we turn off the entire upper district.'"
    ],
    narratorVoices: [
      "Moody neo-noir synth detective with cynical gravelly delivery, rain-slicked cadence, and melancholic depth"
    ]
  },

  fashion: {
    titles: [
      "THE RED SATIN REBEL", "SILVER METALLIC MONOLITH", "THE GOLDEN HOUR RUNWAY", "VINTAGE BAROQUE OPULENCE",
      "AVANT-GARDE DESERT CATWALK", "THE SHADOWED VELVET COLLECTION", "GEOMETRIC MONOCHROME CHIC", "SILK SENSUAL REBELLION",
      "THE NEON COUTURE EXPERIMENT", "GLAMOUR IN THE RAIN RUNWAY", "THE CANDLELIT INTIMACY IN SILK", "BOUDOIR SHADOWS OF SEDUCTION",
      "VELVET EMBRACE IN THE DARK", "SATIN SKIN PASSIONATE GLARE", "EMERALD LACE UNDER CANDLELIGHT", "WET WHITE SATIN REBELLION",
      "THE BACKLESS VELVET TOUCH", "INTIMATE BOUDOIR NOIR", "THE SILENT CHAMBER ROMANCE", "SEDUCTIVE REBEL IN SHADOWS"
    ],
    descriptions: [
      "Model in flowing crimson silk gown billowing against a massive brutalist concrete facade.",
      "Avant-garde fashion catwalk set across vast desert dunes at sunset with mirrored runway.",
      "Sharp geometric monochrome haute couture outfit with oversized architectural headwear.",
      "Luxurious gold brocade coat worn gracefully through an opulent hall of mirrors.",
      "Intimate boudoir portrait in warm candlelight with delicate lace and sensual physical tension."
    ],
    prompts: [
      "A stunning high-fashion model (picture 1) wearing a voluminous, flowing crimson silk gown that billows dramatically in the wind against a cold, massive gray concrete brutalist wall.",
      "An avant-garde fashion catwalk set in the middle of an expansive orange desert at sunset. Models walk gracefully along a mirrored runway reflecting the beautiful golden clouds.",
      "A striking monochrome portrait: a model in a sharp geometric black and white haute couture dress with an oversized architectural hat, casting sharp shadows on a plain studio backdrop.",
      "An intimate, high-tension close-up portrait of an alluring model in a backless black lace bodice. Soft warm candlelight highlights the curves of the bare shoulder and delicate skin texture.",
      "A moody cinematic boudoir scene. Soft dark silk sheets ripple across a vintage bed, catching warm low-key key light, emphasizing the intimate silhouette and high-fashion romance."
    ],
    cameras: [
      "High-end fashion editorial camera slow tracking with beautiful pedestal rise",
      "Dramatic slow-motion 120fps capture of flowing fabric and silk movement",
      "360-degree high-fashion rotate tracking the model's sharp runway walk",
      "Intimate macro-lens drifting close-up, focusing on delicate skin and lace textures"
    ],
    lightings: [
      "High-contrast studio spotlighting casting deep dramatic shadows on facial features",
      "Soft golden-hour natural sun backlight creating a glowing halo around fabrics",
      "Sophisticated museum gallery ambient illumination with deep contrast",
      "Warm candlelit low-key glow casting soft flickering amber light across skin"
    ],
    lenses: [
      "85mm professional portrait lens with ultra-creamy bokeh and razor-sharp textures",
      "135mm telephoto prime with compressed perspective for high-fashion look",
      "50mm prime with extreme wide aperture f/1.2 for hyper-creamy focus roll-off"
    ],
    clothes: [
      "Flowing crimson red silk gown with a colossal fifteen-foot trailing skirt cape",
      "Sleek futuristic silver metallic jumpsuit that shimmers and reflects studio lights",
      "Ornate dark velvet jacket embroidered with intricate gold baroque floral patterns",
      "Exquisite backless black lace bodysuit with sheer delicate floral lace patterns",
      "Liquid silk slip dress in deep champagne gold draping loosely with high slit"
    ],
    wardrobeLabel: [
      "Flowing Crimson Silk Gown with Cathedral Train",
      "Shimmering Silver Metallic Jumpsuit",
      "Gold-Embroidered Baroque Velvet Coat",
      "Backless Black Lace Bodysuit",
      "Liquid Silk Slip Dress in Champagne Gold"
    ],
    audios: [
      "[Audio: Rhythmic experimental techno beat, camera shutters clicking, high-end high-society murmur]",
      "[Audio: Wind blowing through silk fabric, elegant classical violin solo, soft studio silence]",
      "[Audio: Low candle crackle, heavy breathing, deep intimate cello drone, heartbeat rhythm]"
    ],
    dialogues: [
      "Designer: 'Fashion is not about clothing. It is the armor we wear to survive the ordinary.'",
      "Model: 'When the spotlight hits the metal weave, it feels like wearing liquid light.'",
      "Stylist: 'Simplicity is not a choice. It is the ultimate expression of rebellion.'",
      "Narrator: 'In the shadow play of haute couture, every fold of fabric tells a story.'"
    ],
    narratorVoices: [
      "Avant-garde haute couture narrator with French-accented whisper, breathy pacing, and seductive elegance"
    ]
  },

  erotik: {
    titles: [
      "CHIAROSCURO FINE ART NUDE", "SILKY BOUDOIR SENSUALISM", "WET SKIN GLISTEN STUDIO", "EROTIC NOIR SHADOWPLAY",
      "VELVET WHISPERS IN CANDLELIGHT", "SENSUAL TACTILITY OF SILK", "NEO-NOIR BOUDOIR ROMANCE", "CHALK AND SLATE FIGURE",
      "GOLDEN HOUR AMBER EMBRACE", "SHADOW-CARVED SILHOUETTE", "MOONLIT LINEN SANCTUARY", "TRANSLUCENT CHIFFON MORNING",
      "PASSIONATE PHYSICAL TENSION", "OBSIDIAN MIRROR SENSUALITY", "CANDLELIT CONTOURS IN RED", "WARM BARE SHOULDERS DAWN"
    ],
    descriptions: [
      "Dramatic Chiaroscuro high-contrast lighting sculpting the human form and delicate skin textures against pitch black.",
      "Intimate boudoir setting: model in sheer delicate black lace on white satin sheets with warm morning backlighting.",
      "Fine art wet nude photography: fine water beads glistening on skin under sharp cool rim spotlights.",
      "Film noir erotic shadowplay with venetian blind striped shadows and curling cigarette smoke.",
      "Warm golden hour boudoir: sheer cream chiffon sheets floating gently in the breeze over bare skin."
    ],
    prompts: [
      "Exquisite fine art nude cinematography featuring dramatic chiaroscuro lighting. A stunning model (picture 1) is captured in a graceful pose, with absolute pitch-black shadows and a single crisp side light carving out delicate curves and ultra-realistic skin textures.",
      "Elegant high-end sensual boudoir cinematography. A beautiful model (picture 1) relaxes on pristine white rumpled satin sheets, wearing sheer delicate black lace lingerie under streaming morning sunlight.",
      "Stunning fine art wet nude photography in a dark professional studio. A fit model (picture 1) is captured with a glossy sheen of fine water droplets glistening across bare shoulders under powerful cool rim spotlights.",
      "Seductive film noir erotic shadowplay. A bare model (picture 1) stands near an office window where sharp venetian blinds cast graphic black-and-white linear stripes across her torso.",
      "Sensual warm golden hour boudoir cinematography. An elegant model (picture 1) sits by a balcony window with transparent cream chiffon sheets floating in the warm breeze."
    ],
    cameras: [
      "Slow intimate circular orbit camera highlighting sculpted muscle contours and shadow boundaries",
      "Smooth intimate macro panning shot drifting across satin, lace, and warm bare skin",
      "Smooth tracking dolly shot focusing tightly on water-streaked skin texture and droplet kinetics",
      "Cinematic slow push-in sliding along shadow lines with shallow depth of field"
    ],
    lightings: [
      "High-contrast Chiaroscuro side lighting with razor-sharp light edges and zero ambient fill",
      "Soft golden hour backlighting with high-end diffuser panels and organic lens flares",
      "Crisp, cool-toned rim lighting with deep dramatic core shadows",
      "Single powerful tungsten light source casting razor-sharp venetian blind shadows",
      "Warm flickering candlelit amber illumination with soft romantic falloff"
    ],
    lenses: [
      "85mm F/1.2 Portrait Prime Lens with razor-sharp focus on skin pore details and soft dark falloff",
      "50mm Art Lens with extremely shallow depth of field and creamy warm bokeh",
      "100mm Macro Lens with supreme detail resolution highlighting skin pores and micro water droplets",
      "35mm Anamorphic Lens with authentic horizontal flares and warm cinematic grain"
    ],
    clothes: [
      "Bare skin with artistic chiaroscuro shadow placement carving muscle definition",
      "Sheer delicate black lace lingerie bodysuit accentuating body contours",
      "Bare wet skin glistening with water droplets and cool rim highlights",
      "Venetian blinds shadow stripes draped naturally over bare silhouette",
      "Semi-transparent cream chiffon fabrics floating in the warm sunset breeze"
    ],
    wardrobeLabel: [
      "Bare Skin with Chiaroscuro Shadow Carving",
      "Sheer Delicate Black Lace Lingerie",
      "Wet Skin Glistening with Water Droplets",
      "Venetian Blinds Shadowplay on Bare Skin",
      "Semi-Transparent Cream Chiffon Drapes"
    ],
    audios: [
      "[Audio: Soft acoustic cello drone, deep slow rhythmic breathing, absolute silent background]",
      "[Audio: Wind rustling sheer curtains, gentle warm piano keys, soft bedsheet friction]",
      "[Audio: Echoing water droplets splashing, deep slow breathing, low synthesizer hum]",
      "[Audio: Slow moody saxophone solo, vinyl record crackle, distant heavy rain on glass]"
    ],
    dialogues: [
      "Narrator: 'In the absence of color, the body speaks in lines of light.'",
      "Whispered voice: 'Some moments are written in the quiet spaces between heartbeats.'",
      "Intimate voice: 'Like water on stone, light sculpts the human form into something timeless.'",
      "Sensual voice: 'Let the sun touch what the dark tries to hide.'"
    ],
    narratorVoices: [
      "Intimate sensual velvet whispering voice, extremely close to the microphone, breathy and seductive with warm physical resonance"
    ]
  },

  action: {
    titles: [
      "THE ASPHALT DRIFT BATTLE", "HIGH SPEED CHASE DETONATION", "FPV HELICOPTER FLIGHT BYPASS", "STUNT BIKE CRASH THROUGH GLASS",
      "THE FORMULA ONE ACCELERATION", "TACTICAL ESCAPE ROUTE METRO", "OFF-ROAD DESERT DIRT BLAZE", "THE RUNAWAY TRAIN BRAKE",
      "JET-SKI WAKEBOOST ESCAPE", "CONCRETE FREEFALL SKYDIVE", "ARMORED CONVOY AMBUSH", "ROOFTOP PARKOUR PURSUIT",
      "MOTORCYCLE HIGHWAY SLALOM", "SPEEDBOAT CANAL INTERCEPTION", "EXPLODING REFINERY RUN", "SNIPER COUNTER-FIRE DASH"
    ],
    descriptions: [
      "Tuned sports car drifts inches away from a burning barrel in an industrial dockyard, tires smoking.",
      "High-speed movie car chase across a suspension bridge as massive orange fireball explosions erupt behind.",
      "FPV drone dive-bombs down a steep mountain pass chasing a racing motorcycle at breakneck speed.",
      "Stunt rider on a dirt bike leaps through a massive glass office window in slow motion.",
      "Martial arts battle in pouring rain with lightning illuminating hyper-fast counter strikes."
    ],
    prompts: [
      "A high-octane drift battle at dusk. A heavily modified black sports car slides sideways within inches of a burning oil drum. Massive clouds of thick white tire smoke engulf the frame.",
      "An intense action movie chase. A silver super-car races across a massive suspension bridge while giant, orange and black explosions erupt behind it, sending metal debris flying.",
      "An extreme high-speed FPV drone tracking shot dive-bombing down a steep mountain road, matching the crazy velocity of a red racing motorcycle leaning into a sharp curve.",
      "A high-stakes rooftop foot pursuit across rain-drenched neon skyscrapers. An operative (picture 1) leaps across a 20-foot alley gap, rolling across wet gravel as gunshots spark against brickwork.",
      "An armored off-road trophy truck tearing through massive sand dunes at 100 mph, launching 30 feet into the air over a crest as golden sand explodes outwards."
    ],
    cameras: [
      "Adrenaline-fueled FPV drone camera diving and rolling at 100 miles per hour",
      "Low-slung bumper-mounted camera capturing the ground rushing past at extreme speed",
      "Super slow-motion 240fps action-cam capturing shattering glass particles",
      "Dynamic running Steadicam chasing footsteps across obstacles and debris"
    ],
    lightings: [
      "Incredible orange fire blast lighting casting dynamic moving shadows",
      "Dramatic high-contrast strobe lighting with dense drifting tire smoke",
      "Searing headlights cutting through deep shadows and flying sparks",
      "Flashing police red-and-blue strobes reflecting off wet high-speed asphalt"
    ],
    lenses: [
      "18mm wide action lens with extreme field of view and high motion blur handling",
      "35mm anamorphic action-movie lens with dramatic lens flares and grit",
      "Slick GoPro-style ultra-rugged lens with wide dynamic range"
    ],
    clothes: [
      "Carbon-weave racing suit with neon yellow accent stripes and heavy-duty chest protection",
      "Distressed black leather biker jacket with armored shoulder pads and dark denim",
      "Black tactical military gear with utility belts, harness, and smoke grenades",
      "Full ballistic tactical body armor with Kevlar helmet and comms headset"
    ],
    wardrobeLabel: [
      "Carbon-Weave Racing Suit & Neon Accents",
      "Armored Biker Leather Jacket & Heavy Denim",
      "Tactical Combat Rig & Smoke Grenades",
      "Full Ballistic Body Armor & Helmet"
    ],
    audios: [
      "[Audio: Roaring V8 engine, screeching tires, massive explosion boom, rising electronic riser cue]",
      "[Audio: High-velocity wind blast, shattering glass cascade, roaring motorcycle acceleration]",
      "[Audio: Screeching brakes, heavy machine gun bursts, roaring turbine spooling up]"
    ],
    dialogues: [
      "Driver: 'Hang on! If we don\'t clear this bridge in three seconds... we are going down with it!'",
      "Agent: 'The tracking signal is active. Hit the nitrous and don\'t look back!'",
      "Operative: 'They blew the primary exit! Take the roofline, now!'",
      "Pilot: 'Turbines are redlining! We have one shot at this landing!'"
    ],
    narratorVoices: [
      "High-octane energetic blockbuster trailer narrator with punchy cadence, gritty baritone, and explosive intensity"
    ]
  },

  fantasy: {
    titles: [
      "THE STAR-KEEPER EMBERS", "ANCIENT ELVEN ARCHWAY", "THE FORBIDDEN STONE RUNE", "RISING PEAK DRAGON ROAR",
      "THE CRYSTAL CAVERN SWIRL", "VALKYRIE CHRONICLES FLIGHT", "THE BLACKSMITH HAMMER FORGE", "DEEP FOREST DRUID SHELTER",
      "THE CROWN OF CORAL REEF", "CELESTIAL TEMPLE ALCHEMY", "THE GRIFFIN RIDER PATROL", "BLOOD MOON NECROMANCER",
      "FROST GIANT CITADEL", "THE SUNKEN ELVEN FLEET", "PHOENIX FLAME REBIRTH", "MYTHICAL EXCALIBUR EMBERS"
    ],
    descriptions: [
      "Ancient stone rune archway at midnight, floating golden glyphs igniting a swirling magical vortex.",
      "Majestic white stag with glowing crystalline antlers stepping gracefully through an enchanted forest.",
      "Dwarven blacksmith in a volcanic cavern striking a mythical glowing sword on an anvil in a shower of sparks.",
      "Dark sorceress standing on a stormy cliff summoning a violet lightning tempest over the sea.",
      "Hidden elven valley shrouded in morning mist with cascading waterfalls and glowing fairy motes."
    ],
    prompts: [
      "An ancient stone rune archway deep in a misty forest at midnight. Golden glowing glyphs float in the air, swirling like warm embers into a magical portal vortex.",
      "A majestic white stag with glowing, crystal-like antlers steps gracefully into a sun-drenched magical clearing. Sparkling gold dust falls from the ancient tree branches.",
      "A massive dwarven blacksmith forge inside a volcanic cavern. A giant blacksmith strikes a glowing red mythical sword on an anvil, creating a shower of golden magical sparks.",
      "A winged griffin knight (picture 1) in polished golden plate armor soaring above jagged snowy mountain peaks as clouds part to reveal a floating sky castle.",
      "An ancient druidic stone circle at twilight. Bioluminescent moss pulses rhythmically on monoliths as an elder priestess raises an antler staff summoning emerald fire."
    ],
    cameras: [
      "Majestic sweeping crane shot flying over magical rivers and waterfalls",
      "Slow, reverent close-up tracking shot following magical particles in the air",
      "Epic cinematic tilt-up revealing a colossal fantasy castle in the clouds",
      "Low-angle gliding camera floating across enchanted forest moss and roots"
    ],
    lightings: [
      "Ethereal bioluminescent plant glow with cool teal and mystical purple hues",
      "Fiery volcanic magma orange glow reflecting on sweat and dark rock",
      "Beams of holy white light piercing through dense ancient tree foliage",
      "Radiant golden magical aura illuminating floating rune particles"
    ],
    lenses: [
      "50mm prime lens with dreamy vintage coating, heavy soft focus, and oval highlights",
      "75mm anamorphic with magical chromatic flare and smooth cinematic look",
      "Arri Alexa 65 large-format fantasy sensor look with rich organic color tones"
    ],
    clothes: [
      "Intricately engraved elven silver plate armor over deep forest-green velvet robes",
      "Mystical dark sorcerer robes made of silk, decorated with glowing golden constellations",
      "Rugged leather ranger jerkin with wolf fur shoulders and polished steel buckles",
      "Gilded dragon-scale plate armor with crimson flowing cape and runic broadsword"
    ],
    wardrobeLabel: [
      "Elven Silver Armor & Forest-Green Velvet",
      "Mystical Constellation Robes with Gold Thread",
      "Ranger Leather Jerkin with Wolf Fur",
      "Gilded Dragon-Scale Plate & Crimson Cape"
    ],
    audios: [
      "[Audio: Shimmering ethereal windchimes, mystical harp glissando, epic orchestral string swell]",
      "[Audio: Volcanic rumbling lava, heavy hammer pounding metal, magical portal humming]",
      "[Audio: Thunderous dragon wing flaps, deep choral chanting, ringing steel sword draw]"
    ],
    dialogues: [
      "Sorceress: 'The seals are broken. The stargaze elements have returned to claim what is theirs.'",
      "Elf King: 'Draw your swords. The ancient darkness has finally breached the borders of the sanctuary.'",
      "Dragonlord: 'The fire inside our blood will outlive the stone of their highest towers.'",
      "Druid: 'Listen to the roots. The earth remembers what the sky has forgotten.'"
    ],
    narratorVoices: [
      "Epic mythical lorekeeper with ancient Celtic gravitas, rich baritone, and slow poetic cadence"
    ]
  },

  nature: {
    titles: [
      "THE NORTHERN AURORA SWIRL", "MAJESTIC MOUNTAIN RIDGE SKYLINE", "DEEP CANYON COYOTE CALL", "WIND OVER THE AUTUMN MAPLE",
      "ICELANDIC BLACK SAND ICE", "DESERT OASIS SHIMMER", "THE ROARING BASALT WATERFALL", "MISTY BAMBOO SILENCE",
      "UNDERWATER CORAL GARDEN", "WAVING SEA OF LAVENDER", "PATAGONIAN GLACIER CALVING", "AMAZON CANOPY DAWN CHORUS",
      "SERENGETI WILDEBEEST RIVER CROSSING", "REDWOOD GIANT SUNBEAMS", "ALPINE MEADOW WILDFLOWERS", "ARCTIC PACK ICE SUNSET"
    ],
    descriptions: [
      "Emerald green and violet Northern Lights dancing across a mirror-smooth Norwegian fjord ice lake.",
      "Majestic snow-capped mountain peaks bathed in the first reddish rays of an alpine sunrise.",
      "Wild rushing river carving through a Canadian forest blazing with brilliant orange autumn maples.",
      "Violent waves crashing onto pitch-black volcanic basalt sand on the stormy coast of Iceland.",
      "Dense bamboo forest in morning mist, water droplets falling in ultra-slow motion from leaves."
    ],
    prompts: [
      "A breathtaking natural wonder: vivid green and purple Northern Lights (Aurora Borealis) dance across a clear starry night sky, reflecting perfectly in a frozen ice lake in Norway.",
      "Colossal snow-capped mountain peaks illuminated by the first reddish rays of a dramatic alpine sunrise. A lone eagle glides gracefully across the cold blue air.",
      "A wild, rushing river carving through a dense Canadian forest blazing with brilliant orange and red autumn maple trees. Soft morning fog drifts above the water.",
      "A colossal Patagonian glacier wall calving into turquoise glacial water, sending giant waves and ice chunks crashing in thunderous slow motion.",
      "Sunlight piercing through giant 300-foot Californian redwood trees, creating celestial volumetric god rays across lush green ferns and morning mist."
    ],
    cameras: [
      "Slow, meditative panoramic sweeping motion capturing the endless horizon",
      "Epic slow-motion tilt-down from the starry sky to the quiet landscape",
      "Low-to-the-ground smooth slider tracking along frozen geometric ice cracks",
      "Majestic high-altitude drone tracking shot over mountain ridges and canyons"
    ],
    lightings: [
      "Breathtaking organic bioluminescent sky lighting from the aurora borealis",
      "Dazzling golden hour sun casting long cinematic shadows across autumn foliage",
      "Soft diffuse mist lighting creating a peaceful and serene moody atmosphere",
      "Alpenglow crimson sunrise light illuminating jagged snow peaks"
    ],
    lenses: [
      "14mm ultra-wide landscape lens with extreme edge-to-edge sharpness and clarity",
      "50mm natural eye perspective lens capturing pristine environmental detail",
      "National Geographic style high-definition nature camera setup"
    ],
    clothes: [
      "Insulated arctic winter parka in bright red, fitted with thick faux-fur hood lining",
      "Classic rugged waxed-canvas hiking jacket in olive green with leather details",
      "Traditional knitted wool sweater in cream with Nordic geometric patterns",
      "Lightweight breathable eco-trail outdoor shell with moisture-wicking layers"
    ],
    wardrobeLabel: [
      "Red Polar Parka with Faux-Fur Hood",
      "Waxed Canvas Mountain Jacket in Olive",
      "Classic Nordic Knit Wool Sweater",
      "Eco-Trail Technical Shell & Mountain Pants"
    ],
    audios: [
      "[Audio: Deep blowing wind, ice cracking sounds, distant wolf howl, atmospheric synth pad]",
      "[Audio: Roaring waterfall thunder, rustling autumn leaves, soft rain forest birds chirping]",
      "[Audio: Calving glacier thunder crack, gentle ocean swell, whispering mountain breeze]"
    ],
    dialogues: [
      "Narrator: 'In the heart of the endless tundra, time does not move forward. It simply waits.'",
      "Naturalist: 'The basalt formations act like nature\'s organ pipes. Listen closely to the wind.'",
      "Explorer: 'At twelve thousand feet, the world below dissolves into clouds and silence.'",
      "Guide: 'The forest is breathing. Every fallen leaf feeds the next hundred years of growth.'"
    ],
    narratorVoices: [
      "Calm Nordic nature documentary narrator with melodic pacing, breathy warmth, and reverent atmospheric tone"
    ]
  },

  comic: {
    titles: [
      "NOIR INK VIGILANTE", "MOEBIUS PASTEL WASTELAND", "GOTHIC RUNIC KNIGHT", "90S DYNAMIC MUTANT CLASH",
      "ALEX ROSS PAINTED LEGENDS", "AKIRA CYBER-HIGHWAY DRIFT", "BERSERK ECLIPSE SLAYER", "POP ART LICHTENSTEIN MELODRAMA",
      "SOLO LEVELING SHADOW MONARCH", "SPIDER-VERSE HALFTONE FREEFALL", "SPAWN UNHOLY CHAINS", "EC HORROR CRYPT TALES",
      "ARKHAM MIXED MEDIA ASYLUM", "LIGNE CLAIRE JUNGLE TEMPLE", "JUNJI ITO SPIRAL TERROR", "SERGIO TOPPI CELESTIAL NAVIGATOR"
    ],
    descriptions: [
      "Stark graphic novel aesthetic in dramatic black and white ink with a lone crimson accent in rain.",
      "Exquisite European Bande Dessinée art style inspired by Moebius across pastel turquoise dunes.",
      "Gothic Mignola style with massive geometric black shadow masses and glowing amber candlelight.",
      "Explosive dynamic 90s comic book illustration style with extreme crosshatching and energy arcs.",
      "Traditional gouache and watercolor painted comic book style inspired by Alex Ross."
    ],
    prompts: [
      "Stark graphic novel aesthetic in dramatic black and white ink with a lone crimson color accent. A brooding masked protector (picture 1) perches above rain-soaked asphalt.",
      "Exquisite European Bande Dessinée art style inspired by Moebius. A lone nomad (picture 1) rides a biomechanical steed across pastel turquoise desert dunes.",
      "Masterpiece gothic comic style with dense geometric black shadow masses. An occult hero (picture 1) investigates an ancient stone crypt glowing with amber candlelight.",
      "Explosive dynamic 90s comic book illustration style. A powerful hero (picture 1) leaps from a crumbling skyscraper ledge as blue energy arcs across his armored suit.",
      "Traditional gouache and watercolor painted comic book style inspired by Alex Ross. An iconic champion (picture 1) stands tall in golden hour cinematic rim light."
    ],
    cameras: [
      "Extreme low-angle Dutch tilt push-in focusing on sharp ink shadow contours",
      "Sweeping high-altitude panoramic pan revealing vast hand-inked comic landscapes",
      "Dynamic comic panel tracking shot whipping through speed lines and motion blur",
      "Slow creeping dramatic push-in with comic book halftone dot resolution"
    ],
    lightings: [
      "High-contrast black and white Chiaroscuro with pure black shadows and hard rim light",
      "Soft alien pastel double-sunlight with clean luminous flat fill and gentle gradients",
      "Vibrant neon magenta and cyan dual-tone lighting with CMYK halftone dots",
      "Golden hour painted sunlight with deep indigo gouache shadow planes"
    ],
    lenses: [
      "35mm Graphic Novel Prime Lens with crisp black ink line rendering",
      "24mm Ligne Claire Ultra-Sharp Lens with zero distortion and pristine contours",
      "18mm Dynamic Action Comic Lens with intentional perspective exaggeration",
      "85mm Pop Art Halftone Lens with authentic vintage screenprint texture"
    ],
    clothes: [
      "Heavy black oilskin trenchcoat with popped collar and deep fedora hat",
      "Flowing saffron-yellow desert nomad robes with geometric embroidery",
      "Tactical Kevlar bodysuit with metallic armor plates and tattered cape",
      "Polished mirror-chrome cybernetic armor with neon glowing conduits",
      "Vintage 70s striped shirt with blue denim overalls and red sneakers"
    ],
    wardrobeLabel: [
      "Noir Trenchcoat & Slouched Fedora",
      "Moebius Desert Nomad Robes",
      "Armored Superhero Bodysuit & Cape",
      "Polished Chrome Cyber Armor",
      "Retro Comic Hero Outfit & Sneakers"
    ],
    audios: [
      "[Audio: Heavy rain pouring on asphalt, moody saxophone riff, gravelly narrator voice]",
      "[Audio: Whispering desert wind, strange crystalline bird chirps, analog synth pads]",
      "[Audio: Thunderclap, electrical energy sizzle, flapping cape, heroic brass fanfare]",
      "[Audio: Sucking shadow magic drone, metallic blade unsheathing whistle, booming 808 drop]"
    ],
    dialogues: [
      "Detective: 'This city doesn\'t sleep. It just bleeds in black and white.'",
      "Hero: 'The storm didn\'t bring me here. I brought the storm.'",
      "Nomad: 'The sands remember the kings that the stars have long forgotten.'",
      "Hunter: 'Arise... and take your place among the shadows.'"
    ],
    narratorVoices: [
      "Theatrical classic comic book serial narrator, punchy, dramatic and bold 1960s superhero cadence"
    ]
  },

  war: {
    titles: [
      "MUDDY TRENCH BARRAGE", "CASUALTY TOURNIQUET RESCUE", "ARMORED MEDEVAC STRETCHER DASH", "FPV DRONE BUNKER RECON",
      "WINTER FROSTBITE LINE", "CONCRETE DUST CQB SWEEP", "NIGHT PHOSPHOR NVG RAID", "UNDERGROUND SURGEON TRIAGE",
      "BELL TOWER SNIPER OVERWATCH", "TURRET BREECH SHELL RELOAD", "HEAVY HOWITZER SHOCKWAVE", "FARMLAND BUDDY DRAG",
      "NIGHT FLARE RIVER CROSSING", "SMOKE SCREEN WITHDRAWAL", "AMPHIBIOUS BEACH LANDING", "DESTROYED BRIDGE DEFENSE"
    ],
    descriptions: [
      "Muddy frontline trench under heavy artillery bombardment with grime, smoke, and falling dirt.",
      "Combat medic applying a tactical tourniquet to a wounded squadmate under heavy suppressive fire.",
      "High-speed sprint carrying a folding stretcher toward an armored personnel carrier through smoke.",
      "FPV reconnaissance drone operator guiding flights from the safety of a shattered cellar bunker.",
      "Exhausted infantryman in a freezing snow trench with breath vapor crystallizing on eyelashes."
    ],
    prompts: [
      "Visceral, gritty modern warfare sequence inside a mud-soaked frontline trench. A combat medic (picture 1) with grime-streaked face applies a tactical CAT tourniquet tightly to a wounded soldier as dirt falls from nearby artillery concussions.",
      "High-stakes battlefield evacuation through swirling white smoke grenades. Four exhaust-strained infantrymen (picture 1) carry a folding stretcher with a wounded comrade toward an armored M113 personnel carrier.",
      "Claustrophobic drone operator scene inside a shattered basement bunker. A focused pilot (picture 1) wearing digital FPV goggles guides an aerial reconnaissance drone across snowy frontline tree belts.",
      "Intense tactical urban room clearance through billowing concrete dust. A four-man special forces team (picture 1 leading) sweeps a ruined corridor with weapon lights cutting through the haze.",
      "Deep emotional war drama in a freezing winter trench. A shivering soldier (picture 1) with frost on his eyelashes stares into the cratered no-man's-land while clutching a warm metal canteen."
    ],
    cameras: [
      "Intense handheld close-up tracking the combat medic's hands tightening the windlass rod",
      "Dynamic low-angle sprinting Steadicam moving through swirling smoke and mud ruts",
      "Slow claustrophobic orbit around the illuminated drone operator's FPV goggles",
      "Over-the-shoulder point-of-view sweep pivoting swiftly around broken concrete doorways",
      "Slow agonizing push-in capturing shivering breath vapor and the thousand-yard stare"
    ],
    lightings: [
      "Gloomy overcast gray daylight mixed with flickering amber chem-light flare",
      "Diffused winter sunlight scattering through thick white phosphorus smoke",
      "Dark subterranean shadows with cool green phosphor glow from tactical monitors",
      "Volumetric dust light beams piercing blasted concrete highrise walls",
      "Monochrome Gen-3 NVG night vision luminescence with blooming IR laser lines"
    ],
    lenses: [
      "35mm Gritty Master Cinema Lens with shallow depth and micro-shake",
      "28mm Tactical Combat Wide Lens with optical smoke flare streaks",
      "50mm Precision Cine Prime with high-contrast screen reflections",
      "24mm Ultra-Sharp Tactical CQB Lens with realistic dust scattering",
      "85mm Emotional Cinema Portrait Lens with falling snowflake bokeh"
    ],
    clothes: [
      "Multicam combat uniform drenched in mud with FAST helmet and torn IFAK pouch",
      "Full tactical plate carrier rig with ammo pouches and rescue drag handle",
      "Thermal winter snow-camo smock over bulletproof vest with frosted balaclava",
      "Maritime drysuit with minimalist flotation vest and night vision nods",
      "Dusty CQB assault uniform with knee pads and high-cut ballistic helmet"
    ],
    wardrobeLabel: [
      "Mud-Stained Multicam Combat Uniform & FAST Helmet",
      "Heavy Plate Carrier Rig with Rescue Handle",
      "Winter Snow-Camo Smock with Frost Stains",
      "Night Operations CQB Uniform & NVG Rig",
      "Tactical Field Medic Rig with Tourniquet Pouches"
    ],
    audios: [
      "[Audio: Heavy artillery concussions shaking earth, ragged gasping breaths, Velcro tearing sound of tourniquet, urgent radio calls]",
      "[Audio: Roaring diesel engine of armored vehicle, deafening machine gun suppressive bursts, mud splashing boots]",
      "[Audio: High-pitched electric drone motor hum, distant artillery rumble, whispered GPS grid coordinates]",
      "[Audio: Tactical weapon clicks, broken masonry crunching under boots, short suppressed rifle bursts]",
      "[Audio: Whistling winter wind through leafless trees, shivering breath, high-frequency tinnitus ringing]"
    ],
    dialogues: [
      "Medic: 'Stay with me, keep your eyes on mine! Tourniquet is locked, you\'re going home!'",
      "Squad Leader: 'Suppress that tree line! Move the litter now, get him in the hatch!'",
      "Drone Pilot: 'Target acquired at grid point four-niner. Bird is locked on trajectory.'",
      "Pointman: 'Clear left. Stacking on door two, breach on three!'",
      "Soldier: 'The ringing never stops... even when the snow covers the artillery.'"
    ],
    narratorVoices: [
      "Deep battle-hardened military veteran voice, gritty baritone with urgent tactical cadence and heavy theatrical gravitas"
    ]
  },

  politics: {
    titles: [
      "STADIUM CAMPAIGN RALLY", "LIVE TV PRESIDENTIAL DEBATE", "SMOKE-FILLED CABINET DEAL", "ELECTION NIGHT WAR ROOM",
      "RAIN-DRENCHED PRESS GAGGLE", "CAPITOL MOTORCADE ESCORT", "SITUATION ROOM MIDNIGHT CRISIS", "LEAKED DOSSIER PRESS EMBARGO",
      "BALLOT RECOUNT TENSION", "VICTORY CONFETTI MIDNIGHT", "SENATE COMMITTEE SUBPOENA", "SUMMIT TREATY SIGNING",
      "GALA FUNDRAISER CORRIDORS", "PRESS SECRETARY PODIUM", "MIDNIGHT FLIGHT AIR FORCE ONE", "INAUGURATION OATH DAWN"
    ],
    descriptions: [
      "Monumental stadium campaign rally before 20,000 cheering supporters in exploding confetti shower.",
      "Tense live television presidential debate under razor-sharp studio keylights with countdown clock.",
      "High-stakes political deal negotiated behind closed doors in a neoclassical office with classified dossiers.",
      "Election night campaign war room watching live state projection maps as Champagne is popped.",
      "Rain-soaked press conference on federal courthouse steps with 50 microphones and blinding flashbulbs."
    ],
    prompts: [
      "Electrifying political arena campaign rally in a packed stadium. A charismatic candidate (picture 1) with rolled-up sleeves speaks into a chrome microphone at an acrylic podium as golden confetti explodes in the air.",
      "Tense live broadcast television political debate studio. The leading political contender (picture 1) delivers a razor-sharp rebuttal across the stage while a red digital countdown clock ticks down.",
      "Moody political thriller scene inside a private government suite. A political strategist (picture 1) in a three-piece suit leans over a mahogany table covered in classified polling charts and whiskey tumblers.",
      "Late-night campaign war room at 11:59 PM on election night. The campaign manager (picture 1) watches a wall of screens as swing-states flip, erupting into ecstatic cheers and popping Champagne.",
      "High-intensity media ambush on federal courthouse steps in pouring rain. A grim political figure (picture 1) under a black umbrella navigates a scrum of shouted questions and blinding camera flashes."
    ],
    cameras: [
      "Sweeping wide jib crane rising over cheering stadium crowds up to a tight telephoto profile",
      "Intense slow push-in matching speech cadence, cutting between profile and wide multi-cam views",
      "Creeping low-angle Dutch tilt sliding past mahogany bookcases toward the strategist's grin",
      "Dynamic handheld tracking weaving through cheering campaign staffers to the candidate",
      "Frenetic low-angle push-through matching bodyguard escort clearing a path in the rain"
    ],
    lightings: [
      "Blinding stadium spotlights with flashing cell phone lights and glowing blue LED stage wash",
      "Ultra-crisp 5600K broadcast studio lighting with subtle cool blue rim backlighting",
      "Low-key amber chiaroscuro with green banker's lamp glow and cigar smoke ribbons",
      "Cool blue and red ambient glow from massive wall-mounted electoral projection maps",
      "Harsh strobe camera flashbulbs bursting in rapid succession against wet rainy asphalt"
    ],
    lenses: [
      "85mm Master Political Portrait Prime with creamy audience bokeh and confetti flares",
      "50mm Studio Broadcast Prime Lens with ultra-sharp facial micro-expression clarity",
      "35mm Film Noir Political Prime with rich mahogany textures and deep shadow falloff",
      "24mm Wide Documentary Cinema Lens capturing raw human emotion and scale",
      "28mm Raw Documentary Lens with authentic lens rain droplets and strobe exposure spikes"
    ],
    clothes: [
      "Tailored navy trousers with crisp white dress shirt, rolled sleeves and loosened power tie",
      "Bespoke charcoal two-button suit with spread-collar shirt and scarlet power tie",
      "Savile Row three-piece wool pinstripe vest and jacket with onyx cufflinks and pocket watch",
      "White dress shirt with undone collar, laminated campaign VIP lanyard and sweat sheen",
      "Charcoal cashmere overcoat with wet shoulders, dark silk tie and leather gloves"
    ],
    wardrobeLabel: [
      "Campaign Dress Shirt with Rolled Sleeves",
      "Presidential Broadcast Two-Button Suit",
      "Classic Three-Piece Pinstripe Suit",
      "Election Night War Room Casual Business",
      "Charcoal Cashmere Overcoat with Black Umbrella"
    ],
    audios: [
      "[Audio: Roar of twenty thousand cheering supporters, echoing stadium PA speech, confetti cannon blast]",
      "[Audio: Crisp broadcast lapel mic voice, ticking digital timer chime, press gallery gasps]",
      "[Audio: Ice cubes clinking in crystal glass, rustling classified paper dossiers, grandfather clock ticking]",
      "[Audio: Cable news anchor breaking announcement, sudden eruption of cheers, Champagne cork popping]",
      "[Audio: Rapid-fire camera shutter clicks, dozens of reporters shouting questions, heavy rain lashing]"
    ],
    dialogues: [
      "Candidate: 'Tonight, we don\'t just turn the page. We write an entirely new chapter for this nation!'",
      "Debater: 'My opponent wants to talk about yesterday\'s polls. I am here to talk about tomorrow\'s families.'",
      "Strategist: 'In this town, laws are what we write after we\'ve already decided who survives.'",
      "Campaign Manager: 'They just called Ohio! We did it... WE WON THE PRESIDENCY!'",
      "Reporter: 'Governor, did you sign the off-shore transfer? The public deserves the truth!'"
    ],
    narratorVoices: [
      "Authoritative presidential broadcast narrator, crisp transatlantic diction, commanding gravitas and theatrical presence"
    ]
  },

  travel: {
    titles: [
      "MALLORCA TOWEL DAWN SPRINT", "MALDIVES FLOATING BREAKFAST", "SERENGETI LION SAFARI TRACK", "PARIS EIFFEL CROISSANT WALTZ",
      "TOKYO SHIBUYA NEON RAIN", "BANGKOK TUK TUK NIGHT RUSH", "CARIBBEAN MEGALINER BUFFET", "ST ANTON APRES SKI GLOW",
      "TIMES SQUARE YELLOW CAB HAIL", "VENICE GONDOLA BRIDGE OF SIGHS", "ROUTE 66 MUSTANG CRUISE", "GIZA PYRAMID SUNRISE CARAVAN",
      "AIRPORT GATE RUN CAROUSEL", "BLUE LAGOON AURORA STEAM", "BALI MONKEY TEMPLE SWING", "OKTOBERFEST DIRNDL STEIN CHEERS",
      "SANTORINI CALDERA BLUE DOMES", "ULURU RED OUTBACK KANGAROO", "GUIDED TOUR PINK UMBRELLA HERD", "MONTEVERDE CLOUD FOREST SLOTH"
    ],
    descriptions: [
      "06:00 AM towel sprint at the resort pool with slide sandals and tennis socks.",
      "Maldives luxury overwater villa with floating champagne breakfast tray in infinity pool.",
      "African safari expedition in an open Land Rover with a resting lion pride in sunset dust.",
      "Parisian bistro with black beret, flaky croissant, and sparkling Eiffel Tower at twilight.",
      "Tokyo Shibuya scramble crossing in light drizzle with transparent vinyl umbrella and neon screens.",
      "Brisk Tuk-Tuk ride through neon-lit Bangkok street-food night markets.",
      "18-deck mega cruise ship pooldeck party and four-tier chocolate fountain feast.",
      "Alpine après-ski hut party in vintage 80s neon ski suits with mulled wine."
    ],
    prompts: [
      "A hilarious energetic comedy scene at an all-inclusive Mediterranean beach resort at dawn. A determined vacationer (picture 1) in socks and slide sandals sprints across wet pool tiles clutching four towels.",
      "Ultra-luxurious tropical island resort cinematography. An elegant traveler (picture 1) in a flowing kaftan relaxes by an overwater infinity pool with a heart-shaped floating breakfast tray and champagne.",
      "Iconic African safari expedition across golden savanna plains. An open-top Land Cruiser stops near a resting lion pride as an adventurer (picture 1) watches through binoculars in sunset dust.",
      "Romantic Parisian travel scene at a classic Saint-Germain sidewalk bistro. A stylish traveler (picture 1) in a beret sips café au lait while the Eiffel Tower glitters in the evening twilight.",
      "Kinetic urban travel cinematography in Tokyo. A traveler (picture 1) walks through the bustling Shibuya crossing in the rain with a transparent umbrella under giant neon billboard screens.",
      "Authentic American desert roadtrip down Historic Route 66. An adventurer (picture 1) drives a red vintage Mustang convertible past red rock mesas and retro roadside diners under a vast sky."
    ],
    cameras: [
      "Dynamic low-angle tracking steadicam following sprinting feet and resort tiles",
      "Smooth cinematic drone flyby sweeping over turquoise lagoons and infinity pools",
      "Telephoto wildlife follow-cam tracking through golden savanna dust haze",
      "Floating romantic orbit shot framing bistro architecture against city landmarks",
      "Low-angle wide steadicam gliding through dense neon-lit pedestrian crossings",
      "Highway car-mount tracking rig capturing rolling desert landscape and car chrome"
    ],
    lightings: [
      "Warm golden sunrise glow reflecting off turquoise resort pool water and wet terracotta",
      "Dazzling tropical high-noon sun creating turquoise water caustics and amber deck highlights",
      "Dramatic golden-hour sunset dust light casting long shadows across wild savanna",
      "Charming blue hour twilight mixed with glowing street lanterns and sparkling landmarks",
      "Vibrant high-contrast neon palette with glowing signs bouncing off wet asphalt",
      "Blazing desert afternoon sun casting razor-sharp shadows and chrome lens flares"
    ],
    lenses: [
      "24mm Wide-Angle Cine Lens for exaggerated kinetic motion and wide holiday scope",
      "35mm Anamorphic Prime with creamy bokeh and cinematic horizontal sun flares",
      "200mm f/2.8 Telephoto Wildlife Lens isolating travelers and wildlife in sunset haze",
      "50mm f/1.2 Dreamy Bokeh Lens creating warm golden light orbs",
      "28mm Anamorphic with electric neon streaks and sharp water droplet reflections",
      "40mm Vintage Anamorphic Lens with rich warm desert saturation"
    ],
    clothes: [
      "White tennis socks in pool slides with tropical Hawaiian swim trunks and straw hat",
      "Flowing pastel turquoise silk resort kaftan with designer gold sunglasses",
      "Multi-pocket khaki canvas safari vest with linen shirt and felt safari hat",
      "Classic beige trench coat with black tilted beret and red wool scarf",
      "Matte black waterproof techwear rain jacket with transparent vinyl umbrella",
      "Distressed brown leather bomber jacket with aviator shades and denim jeans"
    ],
    wardrobeLabel: [
      "Resort Tourist Socks & Pool Slides",
      "Luxury Silk Kaftan & Gold Sunglasses",
      "Khaki Safari Expedition Multi-Pocket Vest",
      "Parisian Trench Coat & Wool Beret",
      "Tokyo Techwear Raincoat & Umbrella",
      "Vintage Leather Bomber & Aviator Shades"
    ],
    audios: [
      "[Audio: Dramatic comedic brass crescendo, squeaking pool sandals, loud towel snap, Mediterranean seagulls]",
      "[Audio: Gentle lapping of warm lagoon waves, clinking champagne glasses, tropical chillout lounge track]",
      "[Audio: Low lion growl rumble, savanna wind through dry grass, idling Land Cruiser diesel engine]",
      "[Audio: Parisian accordion waltz melody, clatter of porcelain espresso cups, distant French street chatter]",
      "[Audio: Tokyo pedestrian crossing chimes, train bells, sizzling street food yakitori, rain droplets]",
      "[Audio: Throaty V8 Mustang rumble accelerating, roaring desert wind, classic rock guitar riff]"
    ],
    dialogues: [
      "Vacationer: '06:00 AM sharp! Front row loungers are secured for the whole week!'",
      "Traveler: 'Another day in absolute paradise. Truly living the dream.'",
      "Safari Guide: 'Quiet now... look at that magnificent lion in the golden light.'",
      "Explorer: 'Paris is always a good idea. Un café et un croissant, s’il vous plaît.'",
      "Vlogger: 'Lost in the neon labyrinth of Tokyo. The energy here is electrifying!'",
      "Roadtripper: 'Nothing but open desert highway, three hundred horses, and pure freedom.'"
    ],
    narratorVoices: [
      "Warm, charming romantic travel presenter with an engaging international flair and infectious wanderlust"
    ]
  },

  immersive: {
    titles: [
      "TRUE FIRST-PERSON DESERT STALK", "BODYCAM SPECIAL OPS ENTRY", "CYCLIST HIGH-SPEED FPV DIVE", "HEMET POV ICE CLIMB",
      "SUBWAY SURFER FIRST PERSON", "NIGHTCLUB POV VIP GLIDE", "COVERT SURVEILLANCE EARPIECE POV", "DIVING REEF SHARK ENCOUNTER",
      "TRENCH SHIELD RUN POV", "ROOFTOP CRANE BALANCE POV", "HAUNTED ASYLUM FLASHLIGHT POV", "HIGHWAY MOTORCYCLE SPLIT LANE",
      "UNDERWATER SHIPWRECK POV", "AEROBATIC COCKPIT G-FORCE POV", "NIGHT FOREST SURVIVAL POV", "FIRE FIGHTER SMOKE RESCUE POV"
    ],
    descriptions: [
      "True First-Person POV through the eyes of the protagonist with visible tactical gloves and rhythmic breathing kinetics.",
      "Police bodycam footage with authentic timestamp overlay, camera shake, and weapon flashlight beam.",
      "High-speed cyclist downhill mountain biking POV through dense pine forest trails in 4K 60fps.",
      "Ice climber POV ascending a vertical frozen waterfall with ice axes striking into blue ice.",
      "Underwater scuba diver POV navigating through a sunlit coral cavern with rising air bubbles."
    ],
    prompts: [
      "True first-person POV (Ego-Perspektive) cinematography through the eyes of an explorer (picture 1). Visible tactical gloves hold a heavy metal compass while rhythmic footsteps bob naturally across sun-scorched desert dunes. Ambient breath vapor and dust motes drift across the lower visual field.",
      "Authentic bodycam POV of a tactical specialist clearing a dimly lit industrial facility. The chest-mounted wide-angle lens captures the operator's hands adjusting a weapon light as shadows dance across peeling metal walls.",
      "Extreme first-person POV downhill freeride mountain biking. The handlebars shake violently over tree roots and rocky drops as pine branches whip past in 60fps high-velocity motion.",
      "Subaquatic diving helmet first-person POV. Hands reach forward through crystal turquoise water touching ancient encrusted shipwreck timbers as bubbles float upward to the surface.",
      "First-person POV urban parkour sprint across high-rise construction girders. Footsteps land with precision on narrow steel beams 500 feet above the bustling city streets."
    ],
    cameras: [
      "True First-Person POV (Ego-Perspektive) with physical footsteps head-bob kinetics and breath simulation",
      "Wide-angle tactical chest-mounted bodycam with organic running vibration and timestamp HUD",
      "Helmet-mounted 4K 60fps extreme sports camera with wide dynamic range and vibration dampening",
      "Immersive eye-level Steadicam simulating human ocular movement and natural gaze saccades"
    ],
    lightings: [
      "Harsh desert sun casting long moving shadow of the protagonist on sand dunes",
      "Single weapon-mounted LED tactical flashlight beam cutting through pitch-black dust haze",
      "Dappled forest canopy sunlight strobing rapidly past the helmet visor",
      "Underwater shimmering sunbeam caustics dancing across gloves and coral surfaces"
    ],
    lenses: [
      "18mm Ultra-Wide POV Prime with realistic peripheral human field of view",
      "14mm Fisheye Bodycam Lens with slight barrel distortion and high corner sharpness",
      "24mm Cinematic POV Lens with natural depth rendering and subtle motion blur"
    ],
    clothes: [
      "First-person tactical gloves with carbon knuckle guards and weathered combat sleeves",
      "Heavy-duty climbing gloves with ice ax wrist lanyards and Gore-Tex jacket cuffs",
      "Wetsuit thermal gloves with depth gauge dive computer on wrist",
      "Nomex flight gloves and pressurized flight suit sleeves in cockpit"
    ],
    wardrobeLabel: [
      "First-Person Tactical Gloves & POV Rig",
      "High-Altitude Mountaineering Gloves & Gore-Tex",
      "Scuba Diving Thermal Gloves & Dive Computer",
      "Nomex Flight Gloves & Pressure Flight Suit"
    ],
    audios: [
      "[Audio: Heavy rhythmic breathing inside respirator, crunching footsteps on dry gravel, desert wind howl]",
      "[Audio: Velcro tactical gear rustle, quickening heartbeat, radio earpiece squelch chime]",
      "[Audio: Tires chewing gravel, whooshing high-speed wind in helmet, rattling chain drive]",
      "[Audio: Deep resonant scuba regulator inhale, bubbling water exhale, echoing deep ocean whale call]"
    ],
    dialogues: [
      "Protagonist (breathing heavily): 'Footprints are fresh. Target is less than fifty meters ahead.'",
      "Operator (whispering into radio): 'Breaching point Alpha in three... two... one... moving.'",
      "Climber (panting): 'Solid ice anchor locked. Three hundred feet to the summit ridge.'",
      "Diver: 'Oxygen pressure nominal. Descending into the lower cargo hold now.'"
    ],
    narratorVoices: [
      "Deep, immersive first-person protagonist internal monologue with intimate proximity, subtle breath pauses, and intense cinematic focus"
    ]
  }
};
