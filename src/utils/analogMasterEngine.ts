export interface AnalogPreset {
  id: string;
  category: 'super8_16mm' | 'motion_picture' | 'bw_35mm' | 'color_35mm' | 'polaroid' | 'medium_format' | 'large_format' | 'special_toy' | 'soviet_eastern';
  name: string;
  camera: string;
  lens: string;
  filmStock: string;
  opticalSignature: string;
  badge: string;
  description: string;
  bestFor: string[];
}

export const ANALOG_MASTER_PRESETS: AnalogPreset[] = [
  // --- 1. SOVIET & EASTERN EUROPEAN LEGENDS (16 Presets - Absolute Masterpieces) ---
  {
    id: 'sov-zenit-helios-44m',
    category: 'soviet_eastern',
    name: 'Zenit-E with Helios 44-2 58mm f/2 (Swirling Bokeh)',
    camera: 'Zenit-E Soviet Mechanical SLR Camera',
    lens: 'Helios 44-2 58mm f/2 Anamorphic-Like Petzval Glass',
    filmStock: 'Svema Foto 65 Soviet Monochrome Emulsion',
    opticalSignature: 'Legendary dreamy swirling background bokeh, sharp central focus disc, characteristic Soviet optical imperfections, and rich vintage contrast.',
    badge: '☭ Soviet: Zenit & Helios 44-2',
    description: 'The cult Soviet SLR pairing famous for its hypnotic swirling background bokeh and tactile mechanical build.',
    bestFor: ['Portrait', 'Artistic', 'Fashion', 'Moody Drama', 'Music Videos']
  },
  {
    id: 'sov-lomo-lc-a',
    category: 'soviet_eastern',
    name: 'LOMO LC-A Compact (St. Petersburg Lo-Fi)',
    camera: 'LOMO LC-A Compact Automatic 35mm Camera',
    lens: 'Minitar-1 32mm f/2.8 Glass Lens',
    filmStock: 'Orwo Color NC-19 Soviet Negative',
    opticalSignature: 'Heavy saturated dark vignetting, high-contrast psychedelic color saturation, unexpected light leaks, and raw street snapshot energy.',
    badge: '☭ Soviet: LOMO LC-A',
    description: 'The legendary St. Petersburg pocket camera that birthed the worldwide Lomography movement.',
    bestFor: ['Street Photography', 'Nightlife', 'Experimental', 'Travel Journal']
  },
  {
    id: 'sov-kiev-88',
    category: 'soviet_eastern',
    name: 'Kiev 88 (The "Hasselbladski" 6x6 Medium Format)',
    camera: 'Kiev 88 Modular Medium Format SLR',
    lens: 'Volna-3 80mm f/2.8 MC Lens',
    filmStock: 'Svema Color CN-125 Soviet Emulsion',
    opticalSignature: 'Stunning 6x6 square format depth, Soviet multi-coated lens flare flares, unique mechanical shutter jitter, and vintage warmth.',
    badge: '☭ Soviet: Kiev 88 6x6',
    description: 'The infamous Soviet modular medium format camera offering distinct 6x6 square aesthetics.',
    bestFor: ['Fashion', 'Studio Portrait', 'Fine Art', 'Architecture']
  },
  {
    id: 'sov-horizont-panoramic',
    category: 'soviet_eastern',
    name: 'Horizont Swing-Lens Panoramic 35mm',
    camera: 'Horizont Rotating-Lens Panoramic Camera (Krasnogorsk)',
    lens: 'OFD-28 28mm f/2.8 Rotating Swing Lens',
    filmStock: 'Tasma Super-20 35mm High-Resolution Film',
    opticalSignature: 'Ultra-wide 120-degree curved horizon distortion, unique panoramic perspective stretching, and crisp optical sharpness.',
    badge: '☭ Soviet: Horizont Panoramic',
    description: 'Soviet mechanical swing-lens panoramic camera rendering dramatic curved horizon vistas.',
    bestFor: ['Landschaft', 'Architektur', 'Immobilien', 'Epic Panorama']
  },
  {
    id: 'sov-zorki-4',
    category: 'soviet_eastern',
    name: 'Zorki-4 Rangefinder (Leica Copy)',
    camera: 'Zorki-4 Soviet Rangefinder Camera',
    lens: 'Jupiter-8 50mm f/2 LTM Prime Glass',
    filmStock: 'Svema BN-3 Fine Grain Monochrom',
    opticalSignature: 'Classic Leica-inspired rangefinder perspective, creamy vintage focus falloff, subtle silver grain, and nostalgic warmth.',
    badge: '☭ Soviet: Zorki-4 Rangefinder',
    description: 'Soviet precision rangefinder camera pairing timeless Leica ergonomics with unique Jupiter optics.',
    bestFor: ['Street', 'Documentary', 'Portrait', 'Historical Drama']
  },
  {
    id: 'sov-smena-8m',
    category: 'soviet_eastern',
    name: 'Smena 8M (The World-Selling Bakelite Plastic)',
    camera: 'Smena 8M Soviet Bakelite Zone-Focus Camera',
    lens: 'T-43 40mm f/4 Triplet Glass',
    filmStock: 'Orwo NP-27 High-Speed Monochrom',
    opticalSignature: 'Soft optical corner falloff, nostalgic plastic-body charm, raw lo-fi contrast, and authentic 1970s Eastern Bloc feel.',
    badge: '☭ Soviet: Smena 8M Lo-Fi',
    description: 'The ubiquitous Soviet Bakelite camera that delivered sharp triplet rendering and analog grit.',
    bestFor: ['Lo-Fi Indie', 'Travel', 'Street Art', 'Experimental']
  },
  {
    id: 'sov-kinor-16mm',
    category: 'soviet_eastern',
    name: 'Kinor 16SX-2 (Soviet Professional 16mm Cine)',
    camera: 'Kinor 16SX-2 Reflex 16mm Motion Picture Camera',
    lens: 'ROK-1 50mm f/1.2 High-Speed Cine Prime',
    filmStock: 'Tasma Type-2 16mm Cinematic Negative',
    opticalSignature: 'Gritty Eastern European cinematic grain, cold industrial blue-green shadows, razor-sharp mechanical focus registration.',
    badge: '☭ Soviet: Kinor 16mm Cine',
    description: 'Professional Soviet 16mm reflex motion picture camera used for gritty Eastern Bloc cinema.',
    bestFor: ['Documentary', 'Industrial', 'Thriller', 'Imagefilm']
  },
  {
    id: 'sov-konvas-35mm',
    category: 'soviet_eastern',
    name: 'Konvas-Automatic 35KCP (Soviet 35mm Cine)',
    camera: 'Konvas-Automatic 35mm Spring/Motor Cine Camera',
    lens: 'PO3-3M 50mm f/2 Cine Lens',
    filmStock: 'Svema A-2sh 35mm Motion Picture Film',
    opticalSignature: 'Aggressive 35mm motion picture grain, heavy mechanical shutter rumble aesthetic, high-contrast dramatic lighting.',
    badge: '☭ Soviet: Konvas 35mm Cine',
    description: 'Legendary rugged Soviet 35mm motion picture camera built for harsh weather and gritty war dramas.',
    bestFor: ['War & Military', 'Action', 'Thriller', 'Historical']
  },
  {
    id: 'sov-saljut-s',
    category: 'soviet_eastern',
    name: 'Saljut-S (Early Soviet Medium Format SLR)',
    camera: 'Saljut-S 6x6 SLR Camera (Arsenal Factory)',
    lens: 'Industar-29 80mm f/2.8 Lens',
    filmStock: 'Svema Foto 132 Medium Format',
    opticalSignature: 'Vintage 1960s uncoated lens flare rings, soft pastel color rendition, beautiful 6x6 square bokeh.',
    badge: '☭ Soviet: Saljut-S 6x6',
    description: 'Pioneering Soviet 6x6 medium format SLR with distinct vintage lens characteristics.',
    bestFor: ['Portrait', 'Fashion', 'Artistic', 'Vintage Look']
  },
  {
    id: 'sov-fed-2',
    category: 'soviet_eastern',
    name: 'FED-2 Rangefinder (Kharkov Precision)',
    camera: 'FED-2 Soviet Rangefinder Camera',
    lens: 'Industar-26M 50mm f/2.8 Collapsible Lens',
    filmStock: 'Orwo NP-20 Monochrom',
    opticalSignature: 'Collapsible lens softness, charming industrial brass wear aesthetic, classic reporter contrast.',
    badge: '☭ Soviet: FED-2 Rangefinder',
    description: 'Hand-crafted Soviet rangefinder camera from the Kharkov labor commune.',
    bestFor: ['Street', 'Journalism', 'Documentary', 'Noir']
  },
  {
    id: 'sov-moskva-5',
    category: 'soviet_eastern',
    name: 'Moskva-5 (Soviet 6x9 Folding Press Camera)',
    camera: 'Moskva-5 6x9 / 6x6 Folding Rollfilm Camera',
    lens: 'Industar-24 105mm f/3.5 Tessar Glass',
    filmStock: 'Svema 65 ISO Rollfilm',
    opticalSignature: 'Massive 6x9 negative detail, classic Tessar center sharpness with soft glowing corners, painterly depth.',
    badge: '☭ Soviet: Moskva-5 6x9',
    description: 'Massive Soviet folding press camera yielding enormous 6x9 film negatives and majestic depth.',
    bestFor: ['Landscape', 'Architecture', 'Fine Art Portrait', 'Documentary']
  },
  {
    id: 'sov-lubitel-2',
    category: 'soviet_eastern',
    name: 'Lubitel 2 (Soviet TLR Twin-Lens Reflex)',
    camera: 'Lubitel 2 Bakelite TLR 6x6 Camera',
    lens: 'T-22 75mm f/4.5 Triplet Glass',
    filmStock: 'Orwo UT-18 Color Slide Emulsion',
    opticalSignature: 'Waist-level low angle perspective, dreamlike triplet softness, charming light leaks, vintage slide saturation.',
    badge: '☭ Soviet: Lubitel 2 TLR',
    description: 'Iconic Soviet waist-level twin-lens reflex camera for creative low-angle compositions.',
    bestFor: ['Street Art', 'Documentary', 'Lifestyle', 'Experimental']
  },
  {
    id: 'cze-meopta-flexaret',
    category: 'soviet_eastern',
    name: 'Meopta Flexaret VII (Czechoslovakian TLR Precision)',
    camera: 'Flexaret VII Automatic TLR 6x6 (Czechoslovakia)',
    lens: 'Meopta Belar 80mm f/3.5 Tessar Design',
    filmStock: 'Foma Fomapan 100 Classic 120 Film',
    opticalSignature: 'Exquisite Czech optical engineering, silky smooth mechanical shutter release, velvety monochrome tones.',
    badge: '🇨🇿 Czech: Flexaret VII TLR',
    description: 'Premium Czechoslovakian twin-lens reflex camera renowned for optical excellence and build quality.',
    bestFor: ['Portrait', 'Fine Art', 'Architecture', 'Documentary']
  },
  {
    id: 'ddr-pentacon-six',
    category: 'soviet_eastern',
    name: 'Pentacon Six TL (DDR 6x6 Heavyweight Beast)',
    camera: 'Pentacon Six TL Medium Format SLR (East Germany)',
    lens: 'Carl Zeiss Jena Biometar 80mm f/2.8',
    filmStock: 'Orwo NP-55 East German Cinematic Film',
    opticalSignature: 'East German Carl Zeiss Jena optical magic, gorgeous 6x7/6x6 spatial depth, rich shadow detail.',
    badge: '🇩🇩 DDR: Pentacon Six TL',
    description: 'East German engineering masterpiece pairing heavyweight SLR handling with legendary Carl Zeiss Jena glass.',
    bestFor: ['Fashion', 'Portrait', 'Studio', 'Imagefilm']
  },
  {
    id: 'ddr-praktica-bc1',
    category: 'soviet_eastern',
    name: 'Praktica BC1 (DDR Electronic SLR)',
    camera: 'Praktica BC1 Electronic SLR Camera (DDR)',
    lens: 'Pentacon Electric 50mm f/1.8 Multi-Coating',
    filmStock: 'Orwo Color NC-19 Emulsion',
    opticalSignature: 'Sharp East German multi-coating contrast, nostalgic 1980s European color saturation, reliable exposure.',
    badge: '🇩🇩 DDR: Praktica BC1',
    description: 'Robust East German electronic SLR camera delivering reliable vintage European photo aesthetics.',
    bestFor: ['Street', 'Travel', 'Lifestyle', 'Documentary']
  },
  {
    id: 'hun-mom-alten',
    category: 'soviet_eastern',
    name: 'MOM Pax 35 (Hungarian Precision Rangefinder)',
    camera: 'MOM Pax 35 Hungarian Rangefinder',
    lens: 'Certo 50mm f/2.8 Anastigmat',
    filmStock: 'Fortepan 200 Hungarian Monochrom',
    opticalSignature: 'Rare Eastern European vintage glass signature, gentle contrast, moody silver halide grain structure.',
    badge: '🇭🇺 Hungary: MOM Pax 35',
    description: 'Rare Hungarian precision rangefinder camera offering distinctive Eastern European tones.',
    bestFor: ['Fine Art', 'Historical', 'Documentary', 'Street']
  },

  // --- 2. SUPER 8 & 16MM MOTION PICTURE (8 Presets) ---
  {
    id: 's8-beaulieu-50d',
    category: 'super8_16mm',
    name: 'Beaulieu 4008 ZM II (Super 8)',
    camera: 'Beaulieu 4008 ZM II Super 8 Camera',
    lens: 'Angénieux 6-66mm f/1.8 Zoom Glass',
    filmStock: 'Kodak Vision3 50D Color Reversal / Negative Super 8',
    opticalSignature: 'Retro Super 8 gate weave, vintage 8mm grain structure, warm sunlit daylight color rendition, soft corner vignette, and nostalgic home-movie aesthetic.',
    badge: '🎥 Super 8: Beaulieu 50D',
    description: 'Classic nostalgic Super 8 home-video and indie-music-video look with organic gate movement.',
    bestFor: ['Music Videos', 'Nostalgia', 'Documentary', 'Indie Film', 'Summer Memories', 'Imagefilm']
  },
  {
    id: 's8-chinon-200t',
    category: 'super8_16mm',
    name: 'Chinon 200/12XL Sound (Super 8 Tungsten)',
    camera: 'Chinon Sound 200/12XL Super 8 Camera',
    lens: 'Chinon f/1.2 Ultra-Fast Macro Zoom',
    filmStock: 'Kodak Vision3 200T Tungsten Super 8 Motion Picture Film',
    opticalSignature: 'Cinematic night-time halation, tungsten blue-cyan shadows with warm artificial highlights, pronounced Super 8 grain, and moody analog flicker.',
    badge: '🎥 Super 8: 200T Tungsten',
    description: 'Moody low-light Super 8 night footage with tungsten warmth and organic grain.',
    bestFor: ['Night Scenes', 'Cyberpunk', 'Moody Drama', 'Music Videos', 'Horror', 'Restaurant']
  },
  {
    id: 's8-baxter-bw',
    category: 'super8_16mm',
    name: 'Bolex H8 Reflex (Super 8 Monochrom)',
    camera: 'Bolex H8 Reflex 8mm Cine Camera',
    lens: 'Kern-Macro-Switar 13mm f/0.9 Prime',
    filmStock: 'Orwo BQ 100 S/W Super 8 Reversal Film',
    opticalSignature: 'High-contrast 1960s newsreel monochrome, flickering mechanical frame registration, deep charcoal blacks, and bright silver highlights.',
    badge: '🎥 Super 8: B/W Newsreel',
    description: 'Vintage 1960s black and white experimental and newsreel aesthetic.',
    bestFor: ['Historical Drama', 'Experimental', 'Documentary', 'Noir', 'Handwerk']
  },
  {
    id: 's8-nizo-professional',
    category: 'super8_16mm',
    name: 'Nizo Professional Super 8 (Time-Lapse)',
    camera: 'Nizo Professional Super 8 Cine Camera',
    lens: 'Schneider-Kreuznach Macro-Variogon 7-80mm f/1.8',
    filmStock: 'Kodak Tri-X Reversal Super 8 Film',
    opticalSignature: 'German precision optics, stunning sharpness for Super 8, rich silver grain, and vintage contrast.',
    badge: '🎥 Super 8: Nizo Pro',
    description: 'Elite German Super 8 camera yielding unmatched mechanical precision and sharpness.',
    bestFor: ['Travel', 'Documentary', 'Art House', 'Imagefilm', 'Architektur']
  },
  {
    id: 'm16-arri-16sr',
    category: 'super8_16mm',
    name: 'Arriflex 16SR III (16mm Professional)',
    camera: 'Arriflex 16SR III Super 16mm Cine Camera',
    lens: 'Zeiss Super Speed T1.3 Prime Lenses',
    filmStock: 'Kodak Vision3 250D 16mm Color Negative',
    opticalSignature: 'Exquisite 16mm cinematic grain structure, razor-sharp optical clarity, beautiful anamorphic-like oval bokeh, and rich professional color grading.',
    badge: '🎬 16mm: Arri 16SR III',
    description: 'The definitive indie-film and documentary 16mm standard used by master cinematographers.',
    bestFor: ['Indie Films', 'Documentaries', 'Imagefilms', 'Art House', 'Fashion', 'Handwerk']
  },
  {
    id: 'm16-krasnogorsk-2',
    category: 'super8_16mm',
    name: 'Krasnogorsk-2 (16mm Spring-Wound)',
    camera: 'Krasnogorsk K-2 16mm Mechanical Camera',
    lens: 'Zenitar Meteor-5-1 17-69mm f/1.9',
    filmStock: 'Soviet Tasma Type-4 16mm Orthochromatic Film',
    opticalSignature: 'Prism-induced flare artifacts, raw mechanical spring-wound frame jitter, gritty industrial contrast, and cold Eastern European tones.',
    badge: '🎬 16mm: Krasnogorsk K-2',
    description: 'Gritty Soviet-era 16mm spring-driven camera with unique optical imperfections.',
    bestFor: ['Action', 'Thriller', 'Industrial', 'War & Military', 'Horror']
  },
  {
    id: 'm16-bolex-h16',
    category: 'super8_16mm',
    name: 'Bolex H16 Rex-4 (16mm Masterpiece)',
    camera: 'Bolex H16 Rex-4 Swiss Precision Cine Camera',
    lens: 'Kern Switar 25mm f/1.4 AR',
    filmStock: 'Kodak Ektachrome 7294 16mm Color Reversal',
    opticalSignature: 'Saturated vintage slide colors, high contrast punchy midtones, rich emulsion depth, and pristine Swiss optical sharpness.',
    badge: '🎬 16mm: Bolex H16 Rex',
    description: 'Legendary Swiss spring-wound 16mm camera rendering vivid reversal colors.',
    bestFor: ['Nature', 'Travel', 'Documentary', 'Fashion', 'Imagefilm']
  },
  {
    id: 'm16-cp-16',
    category: 'super8_16mm',
    name: 'Cinema Products CP-16 (16mm Broadcast)',
    camera: 'Cinema Products CP-16 News Camera',
    lens: 'Angénieux 12-120mm f/2.2 Cine Zoom',
    filmStock: 'Eastman 7222 Double-X 16mm Negative',
    opticalSignature: 'Gritty 1970s broadcast news aesthetic, handheld shoulder-rig kinetic micro-shake, robust silver grain.',
    badge: '🎬 16mm: CP-16 Broadcast',
    description: 'Iconic 1970s broadcast news camera with authentic shoulder-mount realism.',
    bestFor: ['Journalism', 'Historical Drama', 'Crime', 'Documentary', 'Immobilien']
  },

  // --- 3. HOLLYWOOD MOTION PICTURE (6 Presets) ---
  {
    id: 'mp-panavision-panaflex',
    category: 'motion_picture',
    name: 'Panavision Panaflex Millennium (35mm)',
    camera: 'Panavision Millennium XL2 35mm Cine Camera',
    lens: 'Panavision Primo Anamorphic Prime Lenses',
    filmStock: 'Kodak Vision3 500T 35mm Motion Picture Negative',
    opticalSignature: 'Horizontal blue anamorphic lens flares, gorgeous oval bokeh, creamy cinematic depth of field, and blockbuster Hollywood color science.',
    badge: '🎬 35mm: Panavision Anamorphic',
    description: 'The ultimate Hollywood blockbuster 35mm anamorphic widescreen look.',
    bestFor: ['Sci-Fi', 'Blockbuster', 'Action', 'Cinematic Drama', 'Imagefilm', 'Erotik']
  },
  {
    id: 'mp-arri-35-iii',
    category: 'motion_picture',
    name: 'Arriflex 35 III (35mm Spherical Cine)',
    camera: 'Arriflex 35 III High-Speed 35mm Camera',
    lens: 'Cooke Speed Panchro Vintage 35mm Glass',
    filmStock: 'Kodak Vision3 250D 35mm Film',
    opticalSignature: 'Organic 1980s/90s cinematic spherical bokeh, warm vintage skin tones, classic film gate roll-off, and subtle halation.',
    badge: '🎬 35mm: Arri 35 III Spherical',
    description: 'Classic 80s/90s Hollywood and thriller 35mm spherical motion picture aesthetic.',
    bestFor: ['Thriller', 'Crime', 'Drama', 'Retro 90s', 'Fashion', 'Music Videos']
  },
  {
    id: 'mp-mitchell-bnc',
    category: 'motion_picture',
    name: 'Mitchell BNC 35mm (Golden Age Hollywood)',
    camera: 'Mitchell BNC Studio Camera (1940s Classic)',
    lens: 'Bausch & Lomb Baltar Vintage Cine Lenses',
    filmStock: 'Eastman Plus-X 5231 35mm Monochrome Cine Film',
    opticalSignature: 'Golden Age Hollywood noir contrast, soft romantic facial glow, deep velvet shadows, and pristine studio lighting emulation.',
    badge: '🎬 35mm: 1940s Noir Studio',
    description: 'Timeless 1940s Casablanca-era studio camera and lighting signature.',
    bestFor: ['Film Noir', 'Historical', 'Romance', 'Classic Hollywood', 'Erotik']
  },
  {
    id: 'mp-technicolor-3strip',
    category: 'motion_picture',
    name: 'Technicolor 3-Strip Process (1950s Technicolor)',
    camera: 'Technicolor Three-Strip Camera Rig (1953)',
    lens: 'Bausch & Lomb Super Baltar Vintage Glass',
    filmStock: 'Technicolor Dye-Transfer 3-Strip Emulsion',
    opticalSignature: 'Exaggerated hyper-saturated primary reds, deep emerald greens, rich royal blues, and painterly saturated Technicolor vibrancy.',
    badge: '🎬 35mm: 1950s Technicolor',
    description: 'Iconic vibrant 1950s Technicolor dye-transfer color saturation and richness.',
    bestFor: ['Musical', 'Vintage Period', 'Fantasy', 'Vibrant Comedy', 'Restaurant']
  },
  {
    id: 'mp-panavision-ultra-cam',
    category: 'motion_picture',
    name: 'Panavision PSR 70mm IMAX Epic',
    camera: 'Panavision 70mm IMAX Large Format Cine Camera',
    lens: 'Panavision System 65mm Prime Lenses',
    filmStock: 'Eastman 65mm Color Negative 5219',
    opticalSignature: 'Breathtaking IMAX 70mm immersive scale, razor-sharp edge-to-edge optical resolution, immense tonal latitude, and majestic depth.',
    badge: '🎬 70mm: IMAX Epic Scale',
    description: 'Ultra-wide format IMAX 70mm cinematography with staggering visual presence.',
    bestFor: ['Epic Landscape', 'Space Sci-Fi', 'Documentary', 'Masterpiece', 'Architektur', 'Natur']
  },
  {
    id: 'mp-arri-bl-4',
    category: 'motion_picture',
    name: 'Arriflex 35 BL-4 (Studio Drama)',
    camera: 'Arriflex 35 BL-4 Silent Sound Camera',
    lens: 'Zeiss Jena Master Prime 35mm Glass',
    filmStock: 'Kodak Vision3 200T 35mm Motion Picture Negative',
    opticalSignature: 'Subtle natural grain, flawless cinematic skin tone rendition, silent studio operation warmth, and deep atmospheric shadow tones.',
    badge: '🎬 35mm: Arri BL-4 Drama',
    description: 'The industry-standard silent studio camera for prestige cinematic dramas.',
    bestFor: ['Drama', 'Conversational Scenes', 'Imagefilm', 'Masterclass', 'Erotik']
  },

  // --- 4. 35MM S/W KLEINBILD (6 Presets) ---
  {
    id: 'bw-trix-400',
    category: 'bw_35mm',
    name: 'Kodak Tri-X 400 (Leica M6)',
    camera: 'Leica M6 Rangefinder Camera',
    lens: '50mm f/0.95 Noctilux-M Prime',
    filmStock: 'Kodak Tri-X 400 Silver Halide Monochrom Film',
    opticalSignature: 'Iconic organic silver grain, deep velvety blacks, dreamy razor-thin depth of field, and creamy optical bokeh.',
    badge: '🎞️ 35mm S/W: Tri-X 400',
    description: 'Legendary photojournalism monochrome stock with rich grain and stark chiaroscuro contrast.',
    bestFor: ['Street Photography', 'Portrait', 'Journalism', 'Documentary', 'Handwerk']
  },
  {
    id: 'bw-ilford-hp5',
    category: 'bw_35mm',
    name: 'Ilford HP5+ (Canon P)',
    camera: 'Canon P 35mm Rangefinder',
    lens: '35mm f/1.5 LTM Vintage Glass',
    filmStock: 'Ilford HP5 Plus 400 Monochrom Film',
    opticalSignature: 'Classic cinematic monochrome tonality, silky highlight rolloff, and subtle atmospheric halation.',
    badge: '🎞️ 35mm S/W: Ilford HP5',
    description: 'Timeless British monochrome stock prized for natural shadow detail and wide tonal latitude.',
    bestFor: ['Portrait', 'Fine Art', 'Moody Landscape', 'Street', 'Architektur']
  },
  {
    id: 'bw-agfa-apx25',
    category: 'bw_35mm',
    name: 'Agfa APX 25 (Rollei 35)',
    camera: 'Rollei 35 Compact Vintage Camera',
    lens: '40mm f/3.5 Tessar Lens',
    filmStock: 'Agfa APX 25 Ultra-Fine Grain Monochrom Film',
    opticalSignature: 'Razor-sharp low-speed archival grain, pearlescent whites, and surgical skin micro-detail.',
    badge: '🎞️ 35mm S/W: Agfa APX 25',
    description: 'Ultra-sharp vintage low-speed film rendering immaculate clarity and glass-like skin tones.',
    bestFor: ['Architecture', 'Product', 'Fine Art Portrait', 'Studio', 'Handwerk']
  },
  {
    id: 'bw-tmax-p3200',
    category: 'bw_35mm',
    name: 'Kodak T-Max P3200 (Nikon F3)',
    camera: 'Nikon F3HP Professional SLR',
    lens: '50mm f/1.2 AI-S Nikkor',
    filmStock: 'Kodak T-Max P3200 Ultra High-Speed Monochrom',
    opticalSignature: 'Aggressive gritty high-ISO silver grain, high-contrast punk rock aesthetic, raw night street atmosphere.',
    badge: '🎞️ 35mm S/W: T-Max 3200',
    description: 'Gritty, high-speed night-photography black and white film with raw character.',
    bestFor: ['Nightlife', 'Concert', 'Underground', 'Gritty Crime', 'Horror']
  },
  {
    id: 'bw-ilford-panf-50',
    category: 'bw_35mm',
    name: 'Ilford Pan F Plus 50 (Leica M3)',
    camera: 'Leica M3 Double Stroke Rangefinder',
    lens: 'Leitz Summicron 50mm f/2 Rigid Glass',
    filmStock: 'Ilford Pan F Plus 50 ISO Monochrom Film',
    opticalSignature: 'Virtually grainless high-resolution silver emulsion, exquisite mid-tone graduation, gallery-quality archival contrast.',
    badge: '🎞️ 35mm S/W: Ilford Pan F',
    description: 'Ultra-fine grain slow monochrome film for ultimate sharpness and tonal purity.',
    bestFor: ['Fine Art', 'Studio Portrait', 'Still Life', 'Nude Art', 'Erotik']
  },
  {
    id: 'bw-adox-cms-20',
    category: 'bw_35mm',
    name: 'Adox CMS 20 II (Microfilm Ultra-Sharp)',
    camera: 'Olympus OM-4 Ti Mechanical SLR',
    lens: 'Zuiko 50mm f/1.2 Macro Lens',
    filmStock: 'Adox CMS 20 II Professional Microfilm',
    opticalSignature: 'Microscopic resolution exceeding human eye perception, absolute absence of grain, surgical micro-contrast.',
    badge: '🎞️ 35mm S/W: Adox CMS 20',
    description: 'The sharpest black and white film in existence with microscope-level clarity.',
    bestFor: ['Architecture', 'Technical', 'High Detail Landscape', 'Astronomy', 'Immobilien']
  },

  // --- 5. 35MM FARB-KLEINBILD (6 Presets) ---
  {
    id: 'color-portra-400',
    category: 'color_35mm',
    name: 'Kodak Portra 400 (Contax T2)',
    camera: 'Contax T2 Luxury Titanium Point-and-Shoot',
    lens: '38mm f/2.8 Carl Zeiss Sonnar T*',
    filmStock: 'Kodak Portra 400 Color Negative Film',
    opticalSignature: 'Warm natural pastel skin tones, gorgeous organic halation, and buttery smooth color gradient separation.',
    badge: '🎨 35mm Color: Portra 400',
    description: 'The golden standard of editorial and fashion color negative film stock.',
    bestFor: ['Fashion', 'Portrait', 'Wedding', 'Editorial', 'Lifestyle', 'Erotik', 'Imagefilm']
  },
  {
    id: 'color-velvia-50',
    category: 'color_35mm',
    name: 'Fujifilm Velvia 50 (Nikon F6)',
    camera: 'Nikon F6 Professional 35mm SLR',
    lens: '85mm f/1.4D AF Nikkor',
    filmStock: 'Fujifilm Fujichrome Velvia 50 Slide Film',
    opticalSignature: 'Hyper-vibrant saturation, deep punchy emerald greens, intense crimson reds, and ultra-fine grain structure.',
    badge: '🎨 35mm Color: Velvia 50',
    description: 'Legendary transparency slide film known for breathtaking contrast and saturated pigments.',
    bestFor: ['Nature', 'Landscape', 'Travel', 'Advertising', 'Architektur']
  },
  {
    id: 'color-cinestill-800t',
    category: 'color_35mm',
    name: 'CineStill 800T (Leica M4)',
    camera: 'Leica M4 Mechanical Rangefinder',
    lens: '35mm f/1.4 Summilux-M ASPH',
    filmStock: 'CineStill 800T Tungsten Motion Picture Film',
    opticalSignature: 'Characteristic warm red halation around highlights, cool cyan nighttime shadows, and cinematic ISO 800 grain.',
    badge: '🎬 35mm Color: CineStill 800T',
    description: 'Motion picture stock adapted for still photography with gorgeous neon halation glows.',
    bestFor: ['Cyberpunk', 'Neon Nightlife', 'Urban', 'Music Video', 'Horror', 'Restaurant']
  },
  {
    id: 'color-ektar-100',
    category: 'color_35mm',
    name: 'Kodak Ektar 100 (Canon EOS 1V)',
    camera: 'Canon EOS 1V Professional 35mm SLR',
    lens: 'EF 50mm f/1.2L USM',
    filmStock: 'Kodak Ektar 100 Ultra-Vivid Color Negative',
    opticalSignature: 'Exceptional fine grain, ultra-vivid punchy colors, clean saturated blues and reds, crisp professional commercial finish.',
    badge: '🎨 35mm Color: Ektar 100',
    description: 'Ultra-vivid fine-grain color negative film for stunning commercial and landscape work.',
    bestFor: ['Commercial', 'Product', 'Travel', 'Architecture', 'Immobilien']
  },
  {
    id: 'color-agfa-vista-200',
    category: 'color_35mm',
    name: 'Agfa Vista Plus 200 (Olympus Mju II)',
    camera: 'Olympus Mju II Weatherproof Compact',
    lens: '35mm f/2.8 Zuiko Prime',
    filmStock: 'Agfa Vista Plus 200 Color Negative Emulsion',
    opticalSignature: 'Warm sunny golden hour bias, nostalgic 90s snapshot contrast, vibrant cheerful reds and yellows.',
    badge: '🎨 35mm Color: Agfa Vista 200',
    description: 'Beloved 90s budget film stock with gorgeous warm golden hour color rendition.',
    bestFor: ['Summer Snapshots', 'Lifestyle', 'Travel', 'Casual Portrait', 'Imagefilm']
  },
  {
    id: 'color-fuji-pro-400h',
    category: 'color_35mm',
    name: 'Fujifilm Pro 400H (Contax G2)',
    camera: 'Contax G2 Titanium Rangefinder',
    lens: 'Carl Zeiss Planar T* 45mm f/2',
    filmStock: 'Fujifilm Pro 400H Professional Color Negative',
    opticalSignature: 'Legendary Fuji green separation, soft pastel teal skin tones, ethereal cool-neutral color palette, clean highlights.',
    badge: '🎨 35mm Color: Fuji Pro 400H',
    description: 'Discontinued professional film prized for exquisite airy green and teal pastel tones.',
    bestFor: ['Fine Art Wedding', 'Fashion', 'Airy Portrait', 'Editorial', 'Erotik']
  },

  // --- 6. POLAROID & SOFORTBILD (6 Presets) ---
  {
    id: 'polaroid-fp100c',
    category: 'polaroid',
    name: 'Fujifilm FP-100C Professional Peel-Apart',
    camera: 'Polaroid 600SE Press Camera with FP-100C Back',
    lens: '127mm f/4.7 Tominon Glass Lens',
    filmStock: 'Fujifilm FP-100C Integral Instant Peel-Apart Film',
    opticalSignature: 'Ultra-rare instant film emulsion, rich saturated colors, fine grain, cool-neutral white balance, legendary Fuji skin tones, characteristic FP-100C contrast, and glossy white border.',
    badge: '📸 Polaroid: FP-100C Peel-Apart',
    description: 'Legendary discontinued peel-apart instant film with peerless skin tones and deep tonal richness.',
    bestFor: ['Portrait', 'Fashion', 'Artistic', 'Editorial', 'Erotik']
  },
  {
    id: 'polaroid-sx70',
    category: 'polaroid',
    name: 'Polaroid SX-70 Original',
    camera: 'Polaroid SX-70 Folding Land Camera',
    lens: '116mm f/8 Four-Element Glass Lens',
    filmStock: 'Vintage Polaroid SX-70 Instant Emulsion',
    opticalSignature: 'Warm nostalgic faded pastel tones, soft focus vignette edges, and organic chemical emulsion texture swirls.',
    badge: '📸 Polaroid: SX-70 Vintage',
    description: 'Iconic collapsible instant camera look with dreamy vintage warmth and chemical borders.',
    bestFor: ['Nostalgia', 'Romantic Portrait', 'Lifestyle', 'Memory', 'Fashion']
  },
  {
    id: 'polaroid-instax-wide',
    category: 'polaroid',
    name: 'Fujifilm Instax Wide',
    camera: 'Lomo’Instant Wide Camera',
    lens: '90mm f/8 Multi-Coated Glass Lens',
    filmStock: 'Fujifilm Instax Wide Instant Film',
    opticalSignature: 'Crisp instant realism, vibrant punchy colors, and clean wide rectangular instant format.',
    badge: '📸 Polaroid: Instax Wide',
    description: 'Modern wide-format instant photography combining sharpness with retro charm.',
    bestFor: ['Events', 'Parties', 'Group Photos', 'Casual Lifestyle', 'Restaurant']
  },
  {
    id: 'polaroid-expired-600',
    category: 'polaroid',
    name: 'Expired Polaroid 600 (Color Shift)',
    camera: 'Polaroid Sun 600 LMS Box Camera',
    lens: '116mm Single-Element Plastic Lens',
    filmStock: 'Expired 2008 Polaroid Color 600 Emulsion',
    opticalSignature: 'Unpredictable magenta/cyan chemical color shifts, soft ethereal light leaks, dreamy chemical bleeding borders.',
    badge: '📸 Polaroid: Expired Shift',
    description: 'Artistic expired instant film with surreal color shifts and chemical anomalies.',
    bestFor: ['Artistic', 'Dreamy', 'Experimental', 'Surreal', 'Horror']
  },
  {
    id: 'polaroid-spectra',
    category: 'polaroid',
    name: 'Polaroid Spectra System (Wide Format)',
    camera: 'Polaroid Spectra AF Wide Instant Camera',
    lens: '125mm f/10 Quintic Glass Lens',
    filmStock: 'Polaroid Spectra Integral Film Emulsion',
    opticalSignature: 'Wide panoramic instant frame, rich contrast, warm sepia undertones, classic glossy Polaroid chemical frame.',
    badge: '📸 Polaroid: Spectra Wide',
    description: 'Wide-format instant aesthetic with distinctive 16:9 panoramic instant proportion.',
    bestFor: ['Landscape Instant', 'Group Portrait', 'Architecture', 'Art']
  },
  {
    id: 'polaroid-packfilm-bw',
    category: 'polaroid',
    name: 'Polaroid Type 52 B/W Peel-Apart',
    camera: 'Graflex 4x5 Press Camera with Polaroid Back',
    lens: '135mm f/4.7 Optar Lens',
    filmStock: 'Polaroid 4x5 Instant Black & White Emulsion',
    opticalSignature: 'Stunning instant monochrome tonality, crisp silver highlights, velvety charcoal blacks, and instant chemical texture.',
    badge: '📸 Polaroid: 4x5 B/W Peel-Apart',
    description: 'Large format instant black and white peel-apart film with immense professional gravitas.',
    bestFor: ['Fine Art Portrait', 'Documentary', 'Studio', 'Editorial', 'Handwerk']
  },

  // --- 7. MITTELFORMAT 120 (5 Presets) ---
  {
    id: 'mf-hasselblad-80mm',
    category: 'medium_format',
    name: 'Hasselblad 500C/M (6x6 Square)',
    camera: 'Hasselblad 500C/M Mechanical Medium Format',
    lens: 'Carl Zeiss Planar 80mm f/2.8 T*',
    filmStock: 'Ilford Delta 400 Professional 120 Film',
    opticalSignature: 'Iconic 6x6 square format depth, rich micro-contrast, three-dimensional subject pop, and creamy optical falloff.',
    badge: '📷 Medium Format: Hasselblad 6x6',
    description: 'The legendary modular studio camera used by master photographers worldwide.',
    bestFor: ['High Fashion', 'Studio Portrait', 'Fine Art', 'Architecture', 'Erotik']
  },
  {
    id: 'mf-pentax-67',
    category: 'medium_format',
    name: 'Pentax 67 II (6x7 Rectangular)',
    camera: 'Pentax 67 II Heavyweight SLR Camera',
    lens: 'SMC Pentax 67 105mm f/2.4',
    filmStock: 'Kodak Portra 400 Professional 120 Film',
    opticalSignature: 'Breathtaking shallow depth of field in 6x7 format, legendary "Pentax 67 bokeh", and tactile organic sharpness.',
    badge: '📷 Medium Format: Pentax 67',
    description: 'The heavyweight king of portraiture and landscape medium format film.',
    bestFor: ['Portrait', 'Fashion', 'Landscape', 'Editorial', 'Imagefilm']
  },
  {
    id: 'mf-mamiya-rz67',
    category: 'medium_format',
    name: 'Mamiya RZ67 Pro II (6x7 Studio)',
    camera: 'Mamiya RZ67 Professional Medium Format',
    lens: 'Sekor Z 110mm f/2.8 W',
    filmStock: 'Fujifilm Provia 100F 120 Slide Film',
    opticalSignature: 'Studio precision sharpness, majestic 6x7 slide transparency colors, incredible tonal separation, and buttery bokeh.',
    badge: '📷 Medium Format: Mamiya RZ67',
    description: 'The premier studio and portrait medium format beast with unmatched clarity.',
    bestFor: ['Studio', 'Beauty', 'Commercial', 'High-End Portrait', 'Immobilien']
  },
  {
    id: 'mf-mamiya-645',
    category: 'medium_format',
    name: 'Mamiya 645 Pro TL (6x4.5 Portra)',
    camera: 'Mamiya 645 Medium Format SLR',
    lens: 'Sekor C 80mm f/1.9 Fast Prime',
    filmStock: 'Kodak Portra 800 Professional 120 Film',
    opticalSignature: 'Incredible f/1.9 medium format shallow depth of field, gorgeous evening warm tones, fine 120 grain.',
    badge: '📷 Medium Format: Mamiya 645',
    description: 'Fastest medium format lens pairing with gorgeous 6x4.5 aspect ratio and low-light prowess.',
    bestFor: ['Low Light Portrait', 'Wedding', 'Street Fashion', 'Nightlife', 'Restaurant']
  },
  {
    id: 'mf-bronica-sqa',
    category: 'medium_format',
    name: 'Zenza Bronica SQ-A (6x6 Square)',
    camera: 'Bronica SQ-A Modular Square Format Camera',
    lens: 'Zenzanon PS 80mm f/2.8 Lens',
    filmStock: 'Kodak Ektachrome E100 120 Slide Film',
    opticalSignature: 'Japanese precision square format optics, brilliant slide transparency fidelity, punchy contrast.',
    badge: '📷 Medium Format: Bronica SQ-6x6',
    description: 'Professional Japanese modular 6x6 square camera with stunning slide color fidelity.',
    bestFor: ['Fine Art', 'Architecture', 'Nature', 'Conceptual']
  },

  // --- 8. GROSSFORMAT & SPEZIAL (4 Presets) ---
  {
    id: 'lf-linhof-4x5',
    category: 'large_format',
    name: 'Linhof Technika 4x5 View Camera',
    camera: 'Linhof Super Technika V 4x5 Field Camera',
    lens: 'Schneider Symmar-S 150mm f/5.6 Lens',
    filmStock: 'Kodak T-Max 100 4x5 Sheet Film',
    opticalSignature: 'Unmatched large format tonal gradation, razor micro-detail, Scheimpflug perspective plane tilt, and sculptural depth.',
    badge: '🏛️ Large Format: Linhof 4x5',
    description: 'Precision German field view camera delivering breathtaking architectural and portrait fidelity.',
    bestFor: ['Architecture', 'Fine Art Landscape', 'Museum Archive', 'Portrait', 'Immobilien']
  },
  {
    id: 'lf-wetplate-8x10',
    category: 'large_format',
    name: '19th Century Wet Plate Collodion 8x10',
    camera: 'Custom Antique Mahogany 8x10 Glass Plate Camera',
    lens: 'Hermagis Eidoscope Antique Brass Petzval Lens',
    filmStock: 'Hand-Poured Wet Plate Collodion Tintype Emulsion',
    opticalSignature: 'Swirling Petzval optical bokeh, heavy dark vignetted corners, chemical silver streaks, and haunting ethereal depth.',
    badge: '🏛️ Large Format: Wet Plate 8x10',
    description: 'Victorian-era antique photographic process with organic chemical flaws and magical presence.',
    bestFor: ['Historical', 'Gothic', 'Artistic Portrait', 'Steampunk', 'Horror']
  },
  {
    id: 'toy-holga-120n',
    category: 'special_toy',
    name: 'Holga 120N Plastic Toy Camera',
    camera: 'Holga 120N Lo-Fi Plastic Camera',
    lens: '60mm f/8 Plastic Meniscus Lens',
    filmStock: 'Cross-Processed Fujifilm Ektachrome 120 Film',
    opticalSignature: 'Heavy dark vignetted corners, dreamy plastic lens blur around edges, unpredictable light leaks, and surreal psychedelic cross-process colors.',
    badge: '🧸 Toy Camera: Holga Lo-Fi',
    description: 'Cult-classic plastic toy camera delivering dreamy vignette and experimental lo-fi magic.',
    bestFor: ['Artistic', 'Experimental', 'Surreal', 'Dreamy Indie', 'Music Videos']
  },
  {
    id: 'sub-nikonos-v',
    category: 'special_toy',
    name: 'Nikonos V Underwater Amphibious 35mm',
    camera: 'Nikonos V All-Weather Amphibious Camera',
    lens: 'UW-Nikkor 20mm f/2.8 Water-Corrected Lens',
    filmStock: 'Kodak Ektachrome 100 Underwater Slide Film',
    opticalSignature: 'Caustic water ripple sun-rays refraction, aquatic cyan/blue color spectrum, high-contrast underwater clarity, and unique aquatic atmosphere.',
    badge: '🌊 Underwater: Nikonos V',
    description: 'Professional underwater amphibious camera designed for marine and aquatic expeditions.',
    bestFor: ['Underwater', 'Marine', 'Action Sports', 'Aquatic Drama', 'Natur']
  }
];

export function applyAnalogEngineToPrompt(basePrompt: string, analogPresetId?: string): string {
  if (!analogPresetId || analogPresetId === 'none') {
    return basePrompt;
  }
  const preset = ANALOG_MASTER_PRESETS.find(p => p.id === analogPresetId);
  if (!preset) return basePrompt;

  return `${basePrompt} [ANALOG MASTER TRANSFER: Captured authentically on ${preset.camera} paired with ${preset.lens}, loaded with ${preset.filmStock}. Optical signature: ${preset.opticalSignature}]`;
}

export function exportPresetsToJson(): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ANALOG_MASTER_PRESETS, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `analog_master_presets_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
