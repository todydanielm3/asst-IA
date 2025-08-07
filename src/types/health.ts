// Tipos fundamentais para o sistema de saúde

export interface PersonalInfo {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  phone: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface MedicalHistory {
  allergies: string[];
  medications: string[];
  chronicConditions: string[];
  surgeries: string[];
  familyHistory: string[];
  smokingStatus: 'never' | 'former' | 'current';
  alcoholConsumption: 'none' | 'light' | 'moderate' | 'heavy';
  exerciseFrequency: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

export interface LabResult {
  id: string;
  testName: string;
  value: number;
  unit: string;
  referenceMin: number;
  referenceMax: number;
  date: string;
  isAbnormal: boolean;
  category: 'lipid' | 'glucose' | 'liver' | 'kidney' | 'thyroid' | 'vitamin' | 'mineral' | 'hormone' | 'other';
}

export interface BioimpedanceData {
  id: string;
  date: string;
  bodyFatPercentage: number;
  muscleMass: number;
  visceralFat: number;
  metabolicAge: number;
  basalMetabolicRate: number;
  bodyWaterPercentage: number;
  boneMass: number;
}

export interface HealthGoals {
  primary: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'maintenance' | 'health_improvement';
  targetWeight?: number;
  timeframe: number; // weeks
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dietaryRestrictions: string[];
  preferredWorkoutTypes: string[];
  availableWorkoutDays: number[];
  workoutDuration: number; // minutes
}

export interface WorkoutPlan {
  id: string;
  name: string;
  duration: number; // weeks
  schedule: WorkoutDay[];
  progressionNotes: string;
}

export interface WorkoutDay {
  day: number; // 0-6 (Sunday-Saturday)
  exercises: Exercise[];
  totalDuration: number; // minutes
  intensity: 'low' | 'moderate' | 'high';
}

export interface Exercise {
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'balance';
  sets?: number;
  reps?: number;
  duration?: number; // minutes
  weight?: number; // kg
  restTime?: number; // seconds
  instructions: string;
}

export interface NutritionPlan {
  id: string;
  name: string;
  dailyCalories: number;
  macroDistribution: {
    protein: number; // percentage
    carbs: number; // percentage
    fat: number; // percentage
  };
  meals: Meal[];
  hydrationGoal: number; // liters
  supplements?: string[];
}

export interface Meal {
  name: string;
  time: string;
  calories: number;
  macros: {
    protein: number; // grams
    carbs: number; // grams
    fat: number; // grams
  };
  foods: Food[];
  alternatives?: Food[][];
}

export interface Food {
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: 'workout' | 'meal' | 'hydration' | 'supplement' | 'checkup';
  reminder: boolean;
}

export interface ProgressData {
  id: string;
  date: string;
  weight: number;
  bodyFatPercentage?: number;
  muscleMass?: number;
  measurements?: {
    waist: number;
    chest: number;
    arms: number;
    thighs: number;
  };
  energy: number; // 1-10 scale
  mood: number; // 1-10 scale
  sleepHours: number;
  stressLevel: number; // 1-10 scale
  adherence: {
    workout: number; // percentage
    nutrition: number; // percentage
    hydration: number; // percentage
  };
  notes: string;
}

export interface DailyMessage {
  id: string;
  type: 'reminder' | 'motivation' | 'tip' | 'check_in' | 'alert';
  message: string;
  scheduledTime: string;
  priority: 'low' | 'medium' | 'high';
  requiresResponse: boolean;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  date: string;
  requiresMedicalAttention: boolean;
  acknowledged: boolean;
}

export interface PatientSnapshot {
  id: string;
  personalInfo: PersonalInfo;
  medicalHistory: MedicalHistory;
  labResults: LabResult[];
  bioimpedance: BioimpedanceData[];
  goals: HealthGoals;
  currentPlans: {
    workout: WorkoutPlan;
    nutrition: NutritionPlan;
  };
  progress: ProgressData[];
  calendarEvents: CalendarEvent[];
  dailyMessages: DailyMessage[];
  alerts: Alert[];
  createdAt: string;
  updatedAt: string;
  lastSync: string;
}

// Tipos para resposta da IA
export interface AIResponse {
  workout_plan: WorkoutPlan;
  nutrition_plan: NutritionPlan;
  calendar_events: CalendarEvent[];
  daily_messages: DailyMessage[];
  alerts: Alert[];
  recommendations: string[];
  metabolic_profile: {
    summary: string;
    risk_factors: string[];
    improvements: string[];
  };
}

// Tipos para upload de arquivos
export interface FileUpload {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  size: number;
  url: string;
  extractedText?: string;
  labResults?: LabResult[];
  processed: boolean;
  uploadDate: string;
}

// Tipos para validação de formulários
export interface OnboardingForm {
  personalInfo: Omit<PersonalInfo, 'id'>;
  medicalHistory: MedicalHistory;
  goals: HealthGoals;
}

export interface CheckInForm {
  weight: number;
  energy: number;
  mood: number;
  sleepHours: number;
  stressLevel: number;
  workoutCompleted: boolean;
  nutritionAdherence: number;
  hydrationGlasses: number;
  notes: string;
}
