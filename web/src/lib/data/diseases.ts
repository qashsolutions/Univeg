// Comprehensive disease library for Indian crops

import type { Disease, CropType, GrowthStage } from '@/types';

export const diseases: Disease[] = [
  // Tomato diseases
  {
    id: 'tom-d001',
    name: 'Tomato Leaf Curl Virus (ToLCV)',
    nameHi: 'टमाटर पत्ती मोड़क विषाणु',
    crop: 'tomato',
    symptoms: [
      'Upward curling and cupping of leaves',
      'Yellowing of leaf margins',
      'Stunted plant growth',
      'Reduced fruit size and yield',
      'Thickening of leaf veins',
    ],
    affectedStages: ['seedling', 'vegetative', 'flowering'],
    treatment: {
      chemical: [
        'Imidacloprid 17.8 SL @ 0.3ml/L (whitefly control)',
        'Thiamethoxam 25 WG @ 0.3g/L',
        'Acetamiprid 20 SP @ 0.2g/L',
      ],
      organic: [
        'Yellow sticky traps (20-25/acre)',
        'Neem oil 5ml/L spray',
        'Removal and destruction of infected plants',
      ],
      cultural: [
        'Use resistant varieties (Arka Rakshak, Arka Samrat)',
        'Maintain crop-free period of 2-3 months',
        'Avoid overlapping tomato crops',
        'Control weed hosts',
      ],
    },
    prevention: [
      'Use virus-free seedlings from certified nurseries',
      'Install 40-mesh nylon net in nursery',
      'Rogue out infected plants immediately',
      'Avoid planting near cucurbit crops',
      'Maintain field sanitation',
    ],
    images: [],
    severity: 'critical',
  },
  {
    id: 'tom-d002',
    name: 'Early Blight (Alternaria)',
    nameHi: 'अगेती झुलसा',
    crop: 'tomato',
    symptoms: [
      'Dark brown spots with concentric rings (target board pattern)',
      'Yellowing around spots',
      'Lower leaves affected first',
      'Stem lesions near soil level',
      'Fruit lesions near calyx end',
    ],
    affectedStages: ['vegetative', 'flowering', 'fruiting'],
    treatment: {
      chemical: [
        'Mancozeb 75 WP @ 2.5g/L',
        'Chlorothalonil 75 WP @ 2g/L',
        'Azoxystrobin 23 SC @ 1ml/L',
      ],
      organic: [
        'Trichoderma viride @ 5g/L soil drench',
        'Pseudomonas fluorescens @ 5g/L spray',
        'Copper hydroxide 53.8 WP @ 2g/L',
      ],
      cultural: [
        'Crop rotation with non-solanaceous crops',
        'Remove and destroy infected debris',
        'Avoid overhead irrigation',
        'Proper plant spacing for air circulation',
      ],
    },
    prevention: [
      'Treat seeds with Thiram @ 3g/kg',
      'Use disease-free transplants',
      'Avoid excessive nitrogen application',
      'Maintain proper drainage',
      'Mulching to prevent soil splash',
    ],
    images: [],
    severity: 'high',
  },
  {
    id: 'tom-d003',
    name: 'Bacterial Wilt',
    nameHi: 'जीवाणु म्लानि',
    crop: 'tomato',
    symptoms: [
      'Sudden wilting without yellowing',
      'Wilting starts from lower leaves',
      'Brown discoloration of vascular tissue',
      'Bacterial ooze from cut stem in water',
      'Plant death within 2-3 days',
    ],
    affectedStages: ['vegetative', 'flowering', 'fruiting'],
    treatment: {
      chemical: [
        'Streptocycline 0.5g + Copper oxychloride 3g/L drench',
        'Kasugamycin 3% SL @ 2ml/L',
      ],
      organic: [
        'Pseudomonas fluorescens soil application @ 2.5kg/acre',
        'Bio-fumigation with mustard cake',
        'Trichoderma harzianum @ 2.5kg/acre',
      ],
      cultural: [
        'Remove and burn infected plants with root zone soil',
        'Avoid waterlogging',
        'Use raised beds in endemic areas',
        'Solarization of nursery beds',
      ],
    },
    prevention: [
      'Crop rotation for 3-4 years',
      'Use resistant rootstocks for grafting',
      'Avoid injury to roots during transplanting',
      'Maintain soil pH 6.5-7.0',
      'Improve drainage',
    ],
    images: [],
    severity: 'critical',
  },

  // Chilli diseases
  {
    id: 'chl-d001',
    name: 'Anthracnose (Fruit Rot)',
    nameHi: 'फल सड़न',
    crop: 'chilli',
    symptoms: [
      'Sunken circular spots on fruits',
      'Spots enlarge with concentric rings',
      'Orange/pink spore masses in humid conditions',
      'Fruits shrivel and dry up (mummification)',
      'Die-back of shoots',
    ],
    affectedStages: ['flowering', 'fruiting', 'harvest'],
    treatment: {
      chemical: [
        'Carbendazim 50 WP @ 1g/L',
        'Mancozeb 75 WP @ 2.5g/L',
        'Propiconazole 25 EC @ 1ml/L',
      ],
      organic: [
        'Trichoderma viride @ 5g/L spray',
        'Pseudomonas fluorescens @ 5g/L',
        'Hot water seed treatment (52°C for 30 min)',
      ],
      cultural: [
        'Remove and destroy infected fruits',
        'Avoid overhead irrigation',
        'Harvest at proper maturity',
        'Proper drying of harvested chillies',
      ],
    },
    prevention: [
      'Use certified disease-free seeds',
      'Seed treatment with Thiram @ 3g/kg',
      'Crop rotation with non-solanaceous crops',
      'Avoid injury during harvesting',
      'Pre-harvest spray 10 days before picking',
    ],
    images: [],
    severity: 'high',
  },
  {
    id: 'chl-d002',
    name: 'Chilli Leaf Curl Virus',
    nameHi: 'मिर्च पत्ती मोड़क विषाणु',
    crop: 'chilli',
    symptoms: [
      'Upward curling of leaves',
      'Puckering and crinkling of leaves',
      'Reduced leaf size',
      'Shortened internodes',
      'Flower and fruit drop',
    ],
    affectedStages: ['seedling', 'vegetative', 'flowering'],
    treatment: {
      chemical: [
        'Imidacloprid 17.8 SL @ 0.3ml/L',
        'Thiamethoxam 25 WG @ 0.3g/L',
        'Diafenthiuron 50 WP @ 1g/L',
      ],
      organic: [
        'Neem oil 5ml/L + yellow sticky traps',
        'Verticillium lecanii @ 5g/L',
        'Remove and destroy infected plants',
      ],
      cultural: [
        'Use resistant varieties',
        'Barrier crops (maize, sorghum)',
        'Avoid continuous cropping',
        'Control alternate hosts',
      ],
    },
    prevention: [
      'Raise seedlings under insect-proof net',
      'Rogue infected plants early',
      'Maintain 2-3 month crop-free period',
      'Border crop of maize/sorghum',
      'Avoid cucurbit crops nearby',
    ],
    images: [],
    severity: 'critical',
  },

  // Okra diseases
  {
    id: 'okr-d001',
    name: 'Yellow Vein Mosaic Virus (YVMV)',
    nameHi: 'पीत शिरा मोज़ेक',
    crop: 'okra',
    symptoms: [
      'Yellow network of veins on leaves',
      'Chlorotic patches between veins',
      'Stunted growth',
      'Malformed and small fruits',
      'Reduced yield up to 80%',
    ],
    affectedStages: ['seedling', 'vegetative', 'flowering', 'fruiting'],
    treatment: {
      chemical: [
        'Imidacloprid 17.8 SL @ 0.3ml/L (vector control)',
        'Thiamethoxam 25 WG @ 0.3g/L',
        'Acetamiprid 20 SP @ 0.2g/L',
      ],
      organic: [
        'Yellow sticky traps (25/acre)',
        'Neem oil 5ml/L fortnightly',
        'Remove infected plants immediately',
      ],
      cultural: [
        'Use resistant varieties (Arka Anamika, Parbhani Kranti)',
        'Remove and destroy infected plants',
        'Avoid ratoon crops',
        'Maintain crop-free period',
      ],
    },
    prevention: [
      'Use only resistant varieties',
      'Treat seeds with Imidacloprid 70 WS @ 5g/kg',
      'Border crop of maize',
      'Rogue infected plants within 30 days',
      'Maintain 3-month gap between crops',
    ],
    images: [],
    severity: 'critical',
  },
  {
    id: 'okr-d002',
    name: 'Powdery Mildew',
    nameHi: 'चूर्णिल आसिता',
    crop: 'okra',
    symptoms: [
      'White powdery coating on leaves',
      'Yellowing of older leaves',
      'Premature leaf fall',
      'Reduced photosynthesis',
      'Stunted plant growth',
    ],
    affectedStages: ['vegetative', 'flowering', 'fruiting'],
    treatment: {
      chemical: [
        'Sulphur 80 WP @ 2.5g/L',
        'Carbendazim 50 WP @ 1g/L',
        'Hexaconazole 5 EC @ 1ml/L',
      ],
      organic: [
        'Wettable sulphur 80 WP @ 3g/L',
        'Neem oil 5ml/L',
        'Milk spray (1:9 with water)',
      ],
      cultural: [
        'Proper plant spacing',
        'Avoid excessive nitrogen',
        'Remove heavily infected leaves',
        'Morning irrigation to reduce humidity',
      ],
    },
    prevention: [
      'Use tolerant varieties',
      'Avoid dense planting',
      'Balanced fertilization',
      'Good air circulation',
      'Avoid water stress',
    ],
    images: [],
    severity: 'medium',
  },

  // Brinjal diseases
  {
    id: 'brj-d001',
    name: 'Phomopsis Blight',
    nameHi: 'फोमोप्सिस झुलसा',
    crop: 'brinjal',
    symptoms: [
      'Circular to irregular leaf spots',
      'Fruit rot with concentric zonation',
      'Stem cankers',
      'Damping off in nursery',
      'Black pycnidia visible on spots',
    ],
    affectedStages: ['seedling', 'vegetative', 'flowering', 'fruiting'],
    treatment: {
      chemical: [
        'Mancozeb 75 WP @ 2.5g/L',
        'Carbendazim 50 WP @ 1g/L',
        'Copper oxychloride 50 WP @ 3g/L',
      ],
      organic: [
        'Trichoderma viride seed treatment @ 4g/kg',
        'Pseudomonas fluorescens @ 5g/L spray',
        'Hot water seed treatment (50°C, 30 min)',
      ],
      cultural: [
        'Crop rotation for 2-3 years',
        'Remove and destroy infected debris',
        'Avoid overhead irrigation',
        'Proper plant spacing',
      ],
    },
    prevention: [
      'Use certified disease-free seeds',
      'Seed treatment with Thiram + Carbendazim',
      'Avoid continuous cropping',
      'Field sanitation after harvest',
      'Balanced fertilization',
    ],
    images: [],
    severity: 'high',
  },
  {
    id: 'brj-d002',
    name: 'Little Leaf of Brinjal',
    nameHi: 'छोटी पत्ती रोग',
    crop: 'brinjal',
    symptoms: [
      'Reduction in leaf size',
      'Shortening of internodes',
      'Excessive branching (witches broom)',
      'Phyllody (green flowers)',
      'Sterile flowers, no fruiting',
    ],
    affectedStages: ['vegetative', 'flowering'],
    treatment: {
      chemical: [
        'Dimethoate 30 EC @ 2ml/L (leafhopper control)',
        'Oxytetracycline 500ppm spray',
        'Imidacloprid 17.8 SL @ 0.3ml/L',
      ],
      organic: [
        'Neem oil 5ml/L at 15-day intervals',
        'Remove and destroy infected plants',
        'Spray chilli-garlic extract',
      ],
      cultural: [
        'Use healthy seedlings',
        'Rogue infected plants immediately',
        'Control leafhopper vectors',
        'Avoid ratoon crops',
      ],
    },
    prevention: [
      'Use certified disease-free nursery',
      'Control leafhoppers from transplanting',
      'Remove perennial weed hosts',
      'Avoid planting near infected fields',
      'Maintain 3-month crop-free period',
    ],
    images: [],
    severity: 'critical',
  },

  // Cucumber diseases
  {
    id: 'cuc-d001',
    name: 'Downy Mildew',
    nameHi: 'मृदुरोमिल आसिता',
    crop: 'cucumber',
    symptoms: [
      'Angular yellow spots on upper leaf surface',
      'Purplish-gray fungal growth on lower surface',
      'Spots turn brown and necrotic',
      'Leaves curl and dry up',
      'Rapid spread in humid conditions',
    ],
    affectedStages: ['vegetative', 'flowering', 'fruiting'],
    treatment: {
      chemical: [
        'Metalaxyl + Mancozeb @ 2g/L',
        'Cymoxanil + Mancozeb @ 2g/L',
        'Azoxystrobin 23 SC @ 1ml/L',
      ],
      organic: [
        'Copper hydroxide 53.8 WP @ 2g/L',
        'Bordeaux mixture 1%',
        'Bio-agents: Trichoderma spray',
      ],
      cultural: [
        'Avoid overhead irrigation',
        'Morning watering only',
        'Remove infected leaves',
        'Adequate plant spacing',
      ],
    },
    prevention: [
      'Use resistant varieties',
      'Protected cultivation recommended',
      'Avoid continuous cucurbit cropping',
      'Maintain good air circulation',
      'Preventive spray before rainy season',
    ],
    images: [],
    severity: 'high',
  },

  // Bottle gourd diseases
  {
    id: 'btg-d001',
    name: 'Powdery Mildew of Cucurbits',
    nameHi: 'लौकी का चूर्णिल आसिता',
    crop: 'bottle-gourd',
    symptoms: [
      'White powdery patches on both leaf surfaces',
      'Patches coalesce to cover entire leaf',
      'Leaves turn yellow and dry',
      'Premature defoliation',
      'Reduced fruit quality',
    ],
    affectedStages: ['vegetative', 'flowering', 'fruiting'],
    treatment: {
      chemical: [
        'Sulphur 80 WP @ 2g/L',
        'Dinocap 48 EC @ 1ml/L',
        'Hexaconazole 5 EC @ 1ml/L',
      ],
      organic: [
        'Wettable sulphur @ 3g/L',
        'Karathane (Dinocap) @ 1ml/L',
        'Baking soda spray (5g/L)',
      ],
      cultural: [
        'Avoid dense planting',
        'Remove infected leaves',
        'Balanced fertilization',
        'Morning irrigation',
      ],
    },
    prevention: [
      'Use tolerant varieties',
      'Avoid shade and poor ventilation',
      'Don\'t apply excess nitrogen',
      'Maintain plant vigour',
      'Early sowing before disease onset',
    ],
    images: [],
    severity: 'medium',
  },
];

export function getDiseaseById(id: string): Disease | undefined {
  return diseases.find((d) => d.id === id);
}

export function getDiseasesByCrop(crop: CropType): Disease[] {
  return diseases.filter((d) => d.crop === crop);
}

export function searchDiseases(query: string): Disease[] {
  const lowerQuery = query.toLowerCase();
  return diseases.filter(
    (d) =>
      d.name.toLowerCase().includes(lowerQuery) ||
      d.nameHi?.includes(query) ||
      d.symptoms.some((s) => s.toLowerCase().includes(lowerQuery))
  );
}

export function getDiseasesByStage(crop: CropType, stage: GrowthStage): Disease[] {
  return diseases.filter(
    (d) => d.crop === crop && d.affectedStages.includes(stage)
  );
}
