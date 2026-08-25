export type UserRole = 'farmer' | 'admin' | 'agronomist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  farmName: string;
  farmType: 'Arable Crops' | 'Horticulture' | 'Mixed Farming' | 'Orchards' | 'Greenhouse';
  farmSize: number; // in hectares
  unit: 'metric' | 'imperial';
  location: string;
  country: string;
  avatarUrl?: string;
  subscriptionTier: 'Free Scout' | 'Pro Agronomist' | 'Enterprise Farm';
  createdAt: string;
}

export type SeverityLevel = 'None' | 'Low' | 'Moderate' | 'High' | 'Critical';
export type PathogenType = 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Nutrient Deficiency' | 'Environmental' | 'Healthy';

export interface DiagnosisResult {
  diseaseName: string;
  pathogenType: PathogenType;
  confidenceScore: number;
  severityLevel: SeverityLevel;
  affectedAreaPercentage: number;
  symptoms: string[];
  causes: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  preventativeMeasures: string[];
  sprayWindowAdvice: string;
  yieldImpactEstimate: string;
}

export interface CropScan {
  id: string;
  timestamp: string;
  cropType: string;
  fieldName: string;
  imageUrl: string;
  diagnosis: DiagnosisResult;
  status: 'active' | 'resolved' | 'monitoring';
  farmerNotes?: string;
}

export interface FieldPlot {
  id: string;
  name: string;
  cropType: string;
  variety: string;
  acreage: number; // in hectares
  plantingDate: string;
  expectedHarvestDate: string;
  healthScore: number; // 0-100
  ndviScore: number; // 0.0 - 1.0
  soilMoisture: number; // percentage
  soilTemperature: number; // Celsius
  soilNPK: {
    nitrogen: number; // ppm
    phosphorus: number; // ppm
    potassium: number; // ppm
    ph: number;
  };
  status: 'thriving' | 'attention' | 'critical';
  coordinates: string;
}

export interface AgroAlert {
  id: string;
  type: 'disease' | 'pest' | 'weather' | 'soil';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  fieldId?: string;
  fieldName?: string;
  distanceKm?: number;
  actionRequired: string;
  isRead: boolean;
}

export interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    condition: string;
    conditionIcon: string;
    uvIndex: number;
    pressure: number;
    dewPoint: number;
    et0: number; // Evapotranspiration mm/day
    spraySuitability: 'optimal' | 'moderate' | 'unfavorable';
    sprayDeltaT: number;
    frostRisk: 'None' | 'Low' | 'High';
  };
  forecast: {
    date: string;
    dayName: string;
    tempMax: number;
    tempMin: number;
    humidity: number;
    rainProb: number;
    rainMm: number;
    windSpeed: number;
    condition: string;
    sprayWindow: '06:00 - 09:30' | '17:00 - 19:30' | 'Not Recommended';
    sprayStatus: 'optimal' | 'moderate' | 'unfavorable';
  }[];
}

export interface MarketCommodity {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number; // USD per bushel or metric ton
  currency: string;
  unit: string;
  change24h: number;
  trend: 'up' | 'down';
  forecastTrend: 'Bullish' | 'Neutral' | 'Bearish';
  historical: { month: string; price: number }[];
}

export interface DiseaseKnowledgeItem {
  id: string;
  commonName: string;
  scientificName: string;
  pathogenType: PathogenType;
  primaryCrops: string[];
  visualSymptoms: string[];
  climaticTriggers: string;
  organicRemedies: string[];
  chemicalRemedies: string[];
  preventativeProtocols: string[];
  severityRating: SeverityLevel;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface AgronomistMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
