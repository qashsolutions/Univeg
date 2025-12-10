// Kisan Mitra Type Definitions

// Product types
export interface Product {
  id: string;
  name: string;
  nameHi?: string;
  variety: string;
  cropType: CropType;
  price: number;
  packSize: string;
  stock: number;
  images: string[];
  videoUrl?: string;
  description: string;
  sowingSeason: string;
  harvestDays: number;
  rating: number;
  reviews: number;
}

export type CropType =
  | 'tomato'
  | 'chilli'
  | 'okra'
  | 'brinjal'
  | 'cucumber'
  | 'bottle-gourd'
  | 'cotton'
  | 'maize';

// Disease types
export interface Disease {
  id: string;
  name: string;
  nameHi?: string;
  crop: CropType;
  symptoms: string[];
  affectedStages: GrowthStage[];
  treatment: TreatmentProtocol;
  prevention: string[];
  images: DiseaseImage[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface DiseaseImage {
  url: string;
  stage: GrowthStage;
  description: string;
}

export type GrowthStage =
  | 'seedling'
  | 'vegetative'
  | 'flowering'
  | 'fruiting'
  | 'harvest';

export interface TreatmentProtocol {
  chemical: string[];
  organic: string[];
  cultural: string[];
}

// Video types
export interface GeoVideo {
  id: string;
  title: string;
  titleHi?: string;
  url: string;
  thumbnailUrl: string;
  duration: number;
  language: LanguageCode;
  location: GeoLocation;
  distance?: number;
  crop: CropType;
  createdAt: string;
  views: number;
  farmer?: FarmerProfile;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  village?: string;
  district?: string;
  state?: string;
  pincode?: string;
}

// User types
export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  location: GeoLocation;
  preferredLanguage: LanguageCode;
  farmSize?: number;
  crops: CropType[];
  createdAt: string;
}

// Language types
export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'kn' | 'mr' | 'gu';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
}

// Order types
export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: GeoLocation & { name: string; phone: string };
  total: number;
  createdAt: string;
  expectedDelivery: string;
  trackingId?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'upi' | 'cod';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// Alert types
export interface PredictiveAlert {
  id: string;
  type: 'disease' | 'weather' | 'pest' | 'irrigation';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  crop?: CropType;
  actionRequired: boolean;
  expiresAt: string;
  createdAt: string;
}

// Calendar types
export interface CalendarEvent {
  id: string;
  title: string;
  type: 'sowing' | 'irrigation' | 'fertilizer' | 'pest-control' | 'harvest';
  date: string;
  crop: CropType;
  completed: boolean;
  notes?: string;
}

// Crop Doctor types
export interface DiagnosisResult {
  id: string;
  imageUrl: string;
  crop: CropType;
  disease?: Disease;
  confidence: number;
  healthStatus: 'healthy' | 'infected' | 'unknown';
  recommendations: string[];
  createdAt: string;
}
