import { CropScan, FieldPlot, AgroAlert, WeatherData, MarketCommodity, DiseaseKnowledgeItem, User } from '../types';

export const INITIAL_USER: User = {
  id: 'usr-farmer-01',
  name: 'Ethan Gallagher',
  email: 'ethan@highlandfarms.ag',
  role: 'farmer',
  farmName: 'Highland Valley Agro Estates',
  farmType: 'Mixed Farming',
  farmSize: 340,
  unit: 'metric',
  location: 'Willamette Valley, OR',
  country: 'United States',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  subscriptionTier: 'Pro Agronomist',
  createdAt: '2025-03-15',
};

export const ADMIN_USER: User = {
  id: 'usr-admin-01',
  name: 'Dr. Sarah Vance',
  email: 'sarah.vance@agrivision.ai',
  role: 'admin',
  farmName: 'Global Agronomy Operations',
  farmType: 'Arable Crops',
  farmSize: 12500,
  unit: 'metric',
  location: 'AgriTech Central Hub',
  country: 'United States',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  subscriptionTier: 'Enterprise Farm',
  createdAt: '2024-01-10',
};

export const SAMPLE_DISEASE_IMAGES = [
  {
    id: 'sample-tomato-blight',
    crop: 'Tomato',
    label: 'Early Blight (Leaf Lesions)',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23990?w=600&auto=format&fit=crop&q=80',
    expectedDisease: 'Early Blight (Alternaria solani)',
    notes: 'Brown bullseye concentric rings observed on lower leaf strata.'
  },
  {
    id: 'sample-corn-blight',
    crop: 'Corn',
    label: 'Northern Corn Leaf Blight',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
    expectedDisease: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
    notes: 'Cigar-shaped grayish-green lesions expanding between leaf veins.'
  },
  {
    id: 'sample-wheat-rust',
    crop: 'Wheat',
    label: 'Stripe Rust (Puccinia)',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    expectedDisease: 'Stripe Rust (Puccinia striiformis)',
    notes: 'Linear yellow-orange pustules aligned along leaf blades.'
  },
  {
    id: 'sample-grape-mildew',
    crop: 'Grape',
    label: 'Powdery Mildew',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
    expectedDisease: 'Grape Powdery Mildew (Erysiphe necator)',
    notes: 'White ash-like powdery fungal growth on upper foliage surface.'
  },
  {
    id: 'sample-healthy-soybean',
    crop: 'Soybean',
    label: 'Healthy Canopy (Baseline)',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&auto=format&fit=crop&q=80',
    expectedDisease: 'Healthy Crop (No Pathogens Detected)',
    notes: 'Vigorous chlorophyll saturation, clean leaf margins, optimal turgor.'
  }
];

export const INITIAL_SCANS: CropScan[] = [
  {
    id: 'scan-1001',
    timestamp: '2026-08-24 14:22',
    cropType: 'Tomato',
    fieldName: 'Greenhouse Alpha (Sector 3)',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23990?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    farmerNotes: 'Lower canopy displaying brownish patches with yellow halo.',
    diagnosis: {
      diseaseName: 'Early Blight (Alternaria solani)',
      pathogenType: 'Fungal',
      confidenceScore: 96.4,
      severityLevel: 'Moderate',
      affectedAreaPercentage: 24.5,
      symptoms: [
        'Concentric dark brown rings with target-board appearance on basal leaves',
        'Chlorotic yellowing around lesion perimeters',
        'Leaf necrosis leading to defoliation'
      ],
      causes: [
        'Frequent overhead misting creating >7 hours leaf surface wetness',
        'Canopy temperatures between 24°C and 28°C'
      ],
      organicTreatment: [
        'Apply copper hydroxide or liquid copper octanoate',
        'Spray bio-fungicide Bacillus subtilis strain QST 713',
        'Prune and destroy infected lower leaves immediately'
      ],
      chemicalTreatment: [
        'Foliar spray with Chlorothalonil 720g/L @ 2.0 L/ha',
        'Alternate with Azoxystrobin (Amistar) at 7-day interval'
      ],
      preventativeMeasures: [
        'Shift to root-zone drip irrigation to eliminate leaf moisture',
        'Apply organic straw mulching to reduce soil-borne spore splash'
      ],
      sprayWindowAdvice: 'Optimal window: Tomorrow morning 06:00 - 08:30 (Wind: 4 km/h, Humidity: 68%).',
      yieldImpactEstimate: 'Estimated 6% - 11% yield loss if untreated within 7 days'
    }
  },
  {
    id: 'scan-1002',
    timestamp: '2026-08-23 09:15',
    cropType: 'Corn',
    fieldName: 'North Plateau - Plot A',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
    status: 'monitoring',
    farmerNotes: 'Spotted several elongated tan spots on mid-stalk leaves.',
    diagnosis: {
      diseaseName: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
      pathogenType: 'Fungal',
      confidenceScore: 93.1,
      severityLevel: 'Low',
      affectedAreaPercentage: 9.8,
      symptoms: [
        'Long, elliptical grayish-tan lesions (2.5 to 15 cm)',
        'Lesion margin following parallel vein structure',
        'Dark olive-colored fungal sporulation during humid dawns'
      ],
      causes: [
        'Extended morning dew periods exceeding 6 hours',
        'Moderate temperatures (18°C to 27°C) following rain showers'
      ],
      organicTreatment: [
        'Apply foliar bio-stimulants with Trichoderma harzianum',
        'Ensure balanced potassium nutrition to thicken leaf epidermis'
      ],
      chemicalTreatment: [
        'Pyraclostrobin + Fluxapyroxad (Priaxor) @ 0.3 L/ha at VT tassel stage'
      ],
      preventativeMeasures: [
        'Incorporate crop residues into soil post-harvest',
        'Select resistant hybrid cultivars with Ht genes'
      ],
      sprayWindowAdvice: 'Monitor threshold; spray only if lesions advance above ear leaf.',
      yieldImpactEstimate: 'Under 3% current yield impact; low immediate threat'
    }
  },
  {
    id: 'scan-1003',
    timestamp: '2026-08-21 16:40',
    cropType: 'Wheat',
    fieldName: 'East River Valley - Ridge 4',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    status: 'resolved',
    farmerNotes: 'Treated with triazole spray 3 days ago. Lesions dried out.',
    diagnosis: {
      diseaseName: 'Stripe Rust (Puccinia striiformis)',
      pathogenType: 'Fungal',
      confidenceScore: 97.8,
      severityLevel: 'High',
      affectedAreaPercentage: 38.0,
      symptoms: [
        'Bright yellow-orange linear stripe pustules',
        'Stunted grain fill and flag leaf desiccation'
      ],
      causes: [
        'Cool moist spring weather (10-15°C) with prolonged fog'
      ],
      organicTreatment: [
        'Sulfur dust formulations at early flag leaf stage'
      ],
      chemicalTreatment: [
        'Tebuconazole 250 EC @ 1.0 L/ha (Applied & Effective)'
      ],
      preventativeMeasures: [
        'Destroy volunteer wheat green bridges during fallow periods'
      ],
      sprayWindowAdvice: 'Treatment applied successfully; maintain 14-day scout cycle.',
      yieldImpactEstimate: 'Saved an estimated 25% yield loss by early intervention'
    }
  }
];

export const INITIAL_FIELDS: FieldPlot[] = [
  {
    id: 'fld-01',
    name: 'North Plateau - Plot A',
    cropType: 'Corn / Maize',
    variety: 'Pioneer P1197AM',
    acreage: 85.4,
    plantingDate: '2026-05-12',
    expectedHarvestDate: '2026-10-05',
    healthScore: 91,
    ndviScore: 0.82,
    soilMoisture: 68,
    soilTemperature: 21.4,
    soilNPK: {
      nitrogen: 165,
      phosphorus: 48,
      potassium: 220,
      ph: 6.5
    },
    status: 'thriving',
    coordinates: '45.1284° N, 123.1120° W'
  },
  {
    id: 'fld-02',
    name: 'Greenhouse Alpha (Sector 3)',
    cropType: 'Tomato',
    variety: 'San Marzano Grand',
    acreage: 18.2,
    plantingDate: '2026-06-01',
    expectedHarvestDate: '2026-09-20',
    healthScore: 74,
    ndviScore: 0.69,
    soilMoisture: 78,
    soilTemperature: 24.8,
    soilNPK: {
      nitrogen: 190,
      phosphorus: 62,
      potassium: 280,
      ph: 6.2
    },
    status: 'attention',
    coordinates: '45.1310° N, 123.1085° W'
  },
  {
    id: 'fld-03',
    name: 'East River Valley - Ridge 4',
    cropType: 'Hard Red Winter Wheat',
    variety: 'WB9719',
    acreage: 120.0,
    plantingDate: '2025-10-20',
    expectedHarvestDate: '2026-08-30',
    healthScore: 88,
    ndviScore: 0.76,
    soilMoisture: 54,
    soilTemperature: 19.2,
    soilNPK: {
      nitrogen: 140,
      phosphorus: 38,
      potassium: 195,
      ph: 6.8
    },
    status: 'thriving',
    coordinates: '45.1190° N, 123.0940° W'
  },
  {
    id: 'fld-04',
    name: 'South Orchard Grove',
    cropType: 'Apples & Pears',
    variety: 'Honeycrisp / Bartlett',
    acreage: 46.5,
    plantingDate: '2021-04-10',
    expectedHarvestDate: '2026-09-15',
    healthScore: 83,
    ndviScore: 0.79,
    soilMoisture: 62,
    soilTemperature: 20.1,
    soilNPK: {
      nitrogen: 110,
      phosphorus: 45,
      potassium: 240,
      ph: 6.6
    },
    status: 'thriving',
    coordinates: '45.1050° N, 123.1200° W'
  },
  {
    id: 'fld-05',
    name: 'West Terraces - Plot C',
    cropType: 'Soybean',
    variety: 'Asgrow AG27XF0',
    acreage: 70.0,
    plantingDate: '2026-05-28',
    expectedHarvestDate: '2026-10-18',
    healthScore: 89,
    ndviScore: 0.84,
    soilMoisture: 65,
    soilTemperature: 22.0,
    soilNPK: {
      nitrogen: 130,
      phosphorus: 50,
      potassium: 210,
      ph: 6.4
    },
    status: 'thriving',
    coordinates: '45.1410° N, 123.1350° W'
  }
];

export const INITIAL_ALERTS: AgroAlert[] = [
  {
    id: 'alt-01',
    type: 'disease',
    title: 'Foliar Early Blight Detected',
    description: 'Tomato scan in Greenhouse Alpha shows moderate Early Blight lesions. Spores may spread in high humidity.',
    severity: 'high',
    timestamp: '2 hours ago',
    fieldId: 'fld-02',
    fieldName: 'Greenhouse Alpha (Sector 3)',
    actionRequired: 'Apply copper hydroxide bio-spray before 09:00 AM tomorrow and prune lower foliage.',
    isRead: false
  },
  {
    id: 'alt-02',
    type: 'pest',
    title: 'Regional Fall Armyworm Warning',
    description: 'County agricultural extension reported Spodoptera frugiperda moth sightings within 14 km radius.',
    severity: 'medium',
    timestamp: '5 hours ago',
    distanceKm: 14,
    actionRequired: 'Inspect corn whorls in North Plateau for pinhole feeding and deploy pheromone scouting traps.',
    isRead: false
  },
  {
    id: 'alt-03',
    type: 'weather',
    title: 'Optimal 4-Hour Spray Window',
    description: 'Calm morning winds (3-6 km/h) and moderate Delta T (3.2) predicted tomorrow between 06:00 and 09:30 AM.',
    severity: 'low',
    timestamp: '1 day ago',
    actionRequired: 'Execute scheduled fungicide or foliar micronutrient applications.',
    isRead: true
  },
  {
    id: 'alt-04',
    type: 'soil',
    title: 'Soil Moisture Depletion Trend',
    description: 'East River Valley Wheat ridge moisture has dropped to 54% FC following 6 days of high solar irradiance.',
    severity: 'medium',
    timestamp: '2 days ago',
    fieldId: 'fld-03',
    fieldName: 'East River Valley - Ridge 4',
    actionRequired: 'Schedule 25mm pivot irrigation cycle if rain does not materialize by Thursday.',
    isRead: true
  }
];

export const INITIAL_WEATHER: WeatherData = {
  current: {
    temp: 24,
    feelsLike: 25,
    humidity: 58,
    windSpeed: 6.5,
    windDirection: 'NW',
    condition: 'Partly Sunny',
    conditionIcon: 'sun',
    uvIndex: 7,
    pressure: 1016,
    dewPoint: 14.2,
    et0: 4.8,
    spraySuitability: 'optimal',
    sprayDeltaT: 3.8,
    frostRisk: 'None'
  },
  forecast: [
    {
      date: '2026-08-25',
      dayName: 'Today',
      tempMax: 27,
      tempMin: 15,
      humidity: 56,
      rainProb: 10,
      rainMm: 0,
      windSpeed: 7,
      condition: 'Partly Sunny',
      sprayWindow: '06:00 - 09:30',
      sprayStatus: 'optimal'
    },
    {
      date: '2026-08-26',
      dayName: 'Wed',
      tempMax: 29,
      tempMin: 16,
      humidity: 52,
      rainProb: 5,
      rainMm: 0,
      windSpeed: 8,
      condition: 'Clear Sky',
      sprayWindow: '06:00 - 09:30',
      sprayStatus: 'optimal'
    },
    {
      date: '2026-08-27',
      dayName: 'Thu',
      tempMax: 25,
      tempMin: 17,
      humidity: 74,
      rainProb: 65,
      rainMm: 14.2,
      windSpeed: 18,
      condition: 'Rain Showers',
      sprayWindow: 'Not Recommended',
      sprayStatus: 'unfavorable'
    },
    {
      date: '2026-08-28',
      dayName: 'Fri',
      tempMax: 23,
      tempMin: 13,
      humidity: 68,
      rainProb: 30,
      rainMm: 2.1,
      windSpeed: 12,
      condition: 'Scattered Clouds',
      sprayWindow: '17:00 - 19:30',
      sprayStatus: 'moderate'
    },
    {
      date: '2026-08-29',
      dayName: 'Sat',
      tempMax: 26,
      tempMin: 14,
      humidity: 55,
      rainProb: 10,
      rainMm: 0,
      windSpeed: 6,
      condition: 'Sunny',
      sprayWindow: '06:00 - 09:30',
      sprayStatus: 'optimal'
    }
  ]
};

export const INITIAL_MARKET: MarketCommodity[] = [
  {
    id: 'mkt-corn',
    name: 'Corn (CBOT Futures)',
    symbol: 'ZC=F',
    currentPrice: 4.82,
    currency: 'USD',
    unit: 'bushel',
    change24h: 1.65,
    trend: 'up',
    forecastTrend: 'Bullish',
    historical: [
      { month: 'Mar', price: 4.45 },
      { month: 'Apr', price: 4.52 },
      { month: 'May', price: 4.60 },
      { month: 'Jun', price: 4.55 },
      { month: 'Jul', price: 4.71 },
      { month: 'Aug', price: 4.82 }
    ]
  },
  {
    id: 'mkt-wheat',
    name: 'Wheat (CBOT Soft Red)',
    symbol: 'ZW=F',
    currentPrice: 5.94,
    currency: 'USD',
    unit: 'bushel',
    change24h: -0.84,
    trend: 'down',
    forecastTrend: 'Neutral',
    historical: [
      { month: 'Mar', price: 5.80 },
      { month: 'Apr', price: 6.10 },
      { month: 'May', price: 6.25 },
      { month: 'Jun', price: 6.05 },
      { month: 'Jul', price: 5.99 },
      { month: 'Aug', price: 5.94 }
    ]
  },
  {
    id: 'mkt-soy',
    name: 'Soybeans (CBOT Futures)',
    symbol: 'ZS=F',
    currentPrice: 11.78,
    currency: 'USD',
    unit: 'bushel',
    change24h: 2.30,
    trend: 'up',
    forecastTrend: 'Bullish',
    historical: [
      { month: 'Mar', price: 11.20 },
      { month: 'Apr', price: 11.45 },
      { month: 'May', price: 11.60 },
      { month: 'Jun', price: 11.35 },
      { month: 'Jul', price: 11.52 },
      { month: 'Aug', price: 11.78 }
    ]
  },
  {
    id: 'mkt-tomato',
    name: 'Fresh Processing Tomato',
    symbol: 'AG-TOM',
    currentPrice: 135.00,
    currency: 'USD',
    unit: 'metric ton',
    change24h: 3.85,
    trend: 'up',
    forecastTrend: 'Bullish',
    historical: [
      { month: 'Mar', price: 122 },
      { month: 'Apr', price: 125 },
      { month: 'May', price: 128 },
      { month: 'Jun', price: 130 },
      { month: 'Jul', price: 132 },
      { month: 'Aug', price: 135 }
    ]
  }
];

export const INITIAL_DISEASE_CATALOG: DiseaseKnowledgeItem[] = [
  {
    id: 'dis-01',
    commonName: 'Early Blight',
    scientificName: 'Alternaria solani',
    pathogenType: 'Fungal',
    primaryCrops: ['Tomato', 'Potato', 'Eggplant'],
    visualSymptoms: [
      'Dark brown to black necrotic spots with concentric ring patterns',
      'Yellow chlorotic halos surrounding lesions',
      'Stem collar rot on young transplants',
      'Defoliation starting from basal foliage moving upward'
    ],
    climaticTriggers: 'High relative humidity (>85%), temperatures 24°C - 29°C, overhead irrigation.',
    organicRemedies: [
      'Liquid copper octanoate / Bordeaux mixture',
      'Bacillus subtilis (Serenade ASO)',
      'Neem oil foliar sprays',
      'Sanitary pruning of lower 30cm of canopy'
    ],
    chemicalRemedies: [
      'Chlorothalonil (Bravo 720) @ 2.0 L/ha',
      'Azoxystrobin (Amistar) @ 0.8 L/ha',
      'Difenoconazole (Score 250 EC) @ 0.5 L/ha'
    ],
    preventativeProtocols: [
      'Use certified pathogen-free seeds and disease-resistant rootstocks',
      'Implement drip fertigation rather than overhead sprinklers',
      'Maintain 3-year solanaceous crop rotation'
    ],
    severityRating: 'Moderate'
  },
  {
    id: 'dis-02',
    commonName: 'Northern Corn Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    pathogenType: 'Fungal',
    primaryCrops: ['Corn / Maize', 'Sorghum'],
    visualSymptoms: [
      'Long, elliptical grayish-green to tan lesions (2.5 to 15 cm long)',
      'Cigar-shaped spots running parallel to leaf veins',
      'Premature ear leaf desiccation and lodging'
    ],
    climaticTriggers: 'Moderate temperatures (18°C - 27°C) accompanied by heavy dew or frequent rains.',
    organicRemedies: [
      'Trichoderma viride foliar treatments',
      'Bio-stimulant sea kelp extracts with soluble potassium silicate'
    ],
    chemicalRemedies: [
      'Pyraclostrobin + Fluxapyroxad (Priaxor)',
      'Propiconazole + Azoxystrobin (Quilt Xcel)'
    ],
    preventativeProtocols: [
      'Deep autumn tillage to bury infected stalk debris',
      'Plant hybrids with resistant Ht1, Ht2, or HtN gene traits'
    ],
    severityRating: 'Moderate'
  },
  {
    id: 'dis-03',
    commonName: 'Stripe Rust / Yellow Rust',
    scientificName: 'Puccinia striiformis',
    pathogenType: 'Fungal',
    primaryCrops: ['Wheat', 'Barley', 'Rye', 'Triticale'],
    visualSymptoms: [
      'Linear rows of bright yellow-orange uredinial pustules',
      'Leaves appear striped with yellow dust',
      'Chlorotic streaking and rapid chlorophyll loss'
    ],
    climaticTriggers: 'Cool, humid weather (10°C - 16°C) with morning mist or persistent cloud cover.',
    organicRemedies: [
      'Elemental wettable sulfur at early flag leaf stage',
      'Potassium bicarbonate foliar spray'
    ],
    chemicalRemedies: [
      'Tebuconazole 250 EC @ 1.0 L/ha',
      'Epoxiconazole + Pyraclostrobin'
    ],
    preventativeProtocols: [
      'Eradicate green bridge volunteer grasses before planting',
      'Sow multi-gene rust-resistant winter varieties'
    ],
    severityRating: 'High'
  },
  {
    id: 'dis-04',
    commonName: 'Powdery Mildew',
    scientificName: 'Erysiphe necator / Podosphaera',
    pathogenType: 'Fungal',
    primaryCrops: ['Grapevine', 'Apple', 'Squash', 'Cucumber', 'Strawberry'],
    visualSymptoms: [
      'Powdery white or grayish fungal patches on leaves, shoots, and fruit clusters',
      'Curled, stunted leaves with brittle margins',
      'Berry cracking and russeting on fruit'
    ],
    climaticTriggers: 'Warm, dry ambient days (20°C - 28°C) combined with humid, shaded canopy conditions.',
    organicRemedies: [
      'Wettable sulfur formulations (apply before 28°C ambient)',
      'Potassium silicate or diluted whey milk sprays (1:9 ratio)',
      'Ampelomyces quisqualis hyperparasitic bio-fungicide'
    ],
    chemicalRemedies: [
      'Metrafenone (Vivando) @ 0.3 L/ha',
      'Trifloxystrobin (Flint 50 WG) @ 150 g/ha'
    ],
    preventativeProtocols: [
      'Canopy leaf pulling around fruit zones to maximize sunlight penetration',
      'Maintain adequate vine row spacing aligned with prevailing wind'
    ],
    severityRating: 'Moderate'
  },
  {
    id: 'dis-05',
    commonName: 'Bacterial Spot',
    scientificName: 'Xanthomonas campestris',
    pathogenType: 'Bacterial',
    primaryCrops: ['Pepper', 'Tomato'],
    visualSymptoms: [
      'Small, water-soaked circular spots turning dark brown with greasy texture',
      'Severe defoliation under warm, wet storm conditions',
      'Rough, raised scab-like lesions on fruit'
    ],
    climaticTriggers: 'Warm temperatures (25°C - 30°C) with driving rain or overhead irrigation.',
    organicRemedies: [
      'Fixed copper combined with mancozeb or Bacillus amyloliquefaciens',
      'Hydrogen dioxide / peroxyacetic acid foliar sanitizer'
    ],
    chemicalRemedies: [
      'Copper sulfate pentahydrate + Acibenzolar-S-methyl (Actigard)'
    ],
    preventativeProtocols: [
      'Hot water treatment of seeds (50°C for 25 mins)',
      'Strict equipment disinfection between greenhouse zones'
    ],
    severityRating: 'High'
  }
];

export const MOCK_FARMS_LIST = [
  {
    id: 'farm-01',
    name: 'Highland Valley Agro Estates',
    owner: 'Ethan Gallagher',
    location: 'Willamette Valley, OR',
    size: 340,
    crops: ['Corn', 'Tomato', 'Grapevine'],
    healthIndex: 91,
  },
  {
    id: 'farm-02',
    name: 'Silver Creek Commercial Orchards',
    owner: 'Marcus Sterling',
    location: 'Salinas Valley, CA',
    size: 580,
    crops: ['Apples', 'Wine Grapes', 'Walnuts'],
    healthIndex: 88,
  },
  {
    id: 'farm-03',
    name: 'Prairie Sun Grain Cooperative',
    owner: 'Elena Rostova',
    location: 'Red River Valley, ND',
    size: 2450,
    crops: ['Hard Red Wheat', 'Soybean', 'Canola'],
    healthIndex: 94,
  },
  {
    id: 'farm-04',
    name: 'Bavaria Hops & Barley Estates',
    owner: 'Klaus Wagner',
    location: 'Hallertau Region, DE',
    size: 180,
    crops: ['Hops', 'Malting Barley'],
    healthIndex: 86,
  }
];
