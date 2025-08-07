import { z } from 'zod';

// Schema para informações pessoais
export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  dateOfBirth: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18 && age <= 120;
  }, 'Idade deve estar entre 18 e 120 anos'),
  gender: z.enum(['male', 'female', 'other']),
  height: z.number().min(100, 'Altura mínima: 100cm').max(250, 'Altura máxima: 250cm'),
  weight: z.number().min(30, 'Peso mínimo: 30kg').max(300, 'Peso máximo: 300kg'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  emergencyContact: z.object({
    name: z.string().min(2, 'Nome do contato de emergência é obrigatório'),
    phone: z.string().min(10, 'Telefone do contato de emergência é obrigatório'),
    relationship: z.string().min(2, 'Relacionamento deve ser especificado'),
  }),
});

// Schema para histórico médico
export const medicalHistorySchema = z.object({
  allergies: z.array(z.string()),
  medications: z.array(z.string()),
  chronicConditions: z.array(z.string()),
  surgeries: z.array(z.string()),
  familyHistory: z.array(z.string()),
  smokingStatus: z.enum(['never', 'former', 'current']),
  alcoholConsumption: z.enum(['none', 'light', 'moderate', 'heavy']),
  exerciseFrequency: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
});

// Schema para objetivos de saúde
export const healthGoalsSchema = z.object({
  primary: z.enum(['weight_loss', 'weight_gain', 'muscle_gain', 'maintenance', 'health_improvement']),
  targetWeight: z.number().optional(),
  timeframe: z.number().min(1, 'Prazo mínimo: 1 semana').max(104, 'Prazo máximo: 2 anos'),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
  dietaryRestrictions: z.array(z.string()),
  preferredWorkoutTypes: z.array(z.string()),
  availableWorkoutDays: z.array(z.number().min(0).max(6)),
  workoutDuration: z.number().min(15, 'Duração mínima: 15 minutos').max(180, 'Duração máxima: 3 horas'),
});

// Schema para resultado de exame
export const labResultSchema = z.object({
  testName: z.string().min(1, 'Nome do exame é obrigatório'),
  value: z.number(),
  unit: z.string().min(1, 'Unidade é obrigatória'),
  referenceMin: z.number(),
  referenceMax: z.number(),
  date: z.string(),
  category: z.enum(['lipid', 'glucose', 'liver', 'kidney', 'thyroid', 'vitamin', 'mineral', 'hormone', 'other']),
});

// Schema para dados de bioimpedância
export const bioimpedanceSchema = z.object({
  date: z.string(),
  bodyFatPercentage: z.number().min(0).max(100),
  muscleMass: z.number().min(0),
  visceralFat: z.number().min(0),
  metabolicAge: z.number().min(18).max(120),
  basalMetabolicRate: z.number().min(800).max(5000),
  bodyWaterPercentage: z.number().min(0).max(100),
  boneMass: z.number().min(0),
});

// Schema para exercício
export const exerciseSchema = z.object({
  name: z.string().min(1, 'Nome do exercício é obrigatório'),
  type: z.enum(['cardio', 'strength', 'flexibility', 'balance']),
  sets: z.number().optional(),
  reps: z.number().optional(),
  duration: z.number().optional(),
  weight: z.number().optional(),
  restTime: z.number().optional(),
  instructions: z.string(),
});

// Schema para refeição
export const mealSchema = z.object({
  name: z.string().min(1, 'Nome da refeição é obrigatório'),
  time: z.string(),
  calories: z.number().min(0),
  macros: z.object({
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
  }),
  foods: z.array(z.object({
    name: z.string().min(1),
    quantity: z.number().min(0),
    unit: z.string(),
    calories: z.number().min(0),
    macros: z.object({
      protein: z.number().min(0),
      carbs: z.number().min(0),
      fat: z.number().min(0),
    }),
  })),
});

// Schema para dados de progresso
export const progressDataSchema = z.object({
  date: z.string(),
  weight: z.number().min(30).max(300),
  bodyFatPercentage: z.number().min(0).max(100).optional(),
  muscleMass: z.number().min(0).optional(),
  measurements: z.object({
    waist: z.number().min(0),
    chest: z.number().min(0),
    arms: z.number().min(0),
    thighs: z.number().min(0),
  }).optional(),
  energy: z.number().min(1).max(10),
  mood: z.number().min(1).max(10),
  sleepHours: z.number().min(0).max(24),
  stressLevel: z.number().min(1).max(10),
  adherence: z.object({
    workout: z.number().min(0).max(100),
    nutrition: z.number().min(0).max(100),
    hydration: z.number().min(0).max(100),
  }),
  notes: z.string(),
});

// Schema para check-in diário
export const checkInSchema = z.object({
  weight: z.number().min(30).max(300),
  energy: z.number().min(1).max(10),
  mood: z.number().min(1).max(10),
  sleepHours: z.number().min(0).max(24),
  stressLevel: z.number().min(1).max(10),
  workoutCompleted: z.boolean(),
  nutritionAdherence: z.number().min(0).max(100),
  hydrationGlasses: z.number().min(0).max(20),
  notes: z.string().max(500, 'Notas não podem exceder 500 caracteres'),
});

// Schema para onboarding completo
export const onboardingSchema = z.object({
  personalInfo: personalInfoSchema,
  medicalHistory: medicalHistorySchema,
  goals: healthGoalsSchema,
});

// Schema para upload de arquivo
export const fileUploadSchema = z.object({
  name: z.string(),
  type: z.enum(['pdf', 'image']),
  size: z.number().max(10 * 1024 * 1024, 'Arquivo não pode exceder 10MB'),
});

// Tipos inferidos dos schemas
export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
export type MedicalHistoryForm = z.infer<typeof medicalHistorySchema>;
export type HealthGoalsForm = z.infer<typeof healthGoalsSchema>;
export type LabResultForm = z.infer<typeof labResultSchema>;
export type BioimpedanceForm = z.infer<typeof bioimpedanceSchema>;
export type ExerciseForm = z.infer<typeof exerciseSchema>;
export type MealForm = z.infer<typeof mealSchema>;
export type ProgressDataForm = z.infer<typeof progressDataSchema>;
export type CheckInForm = z.infer<typeof checkInSchema>;
export type OnboardingForm = z.infer<typeof onboardingSchema>;
export type FileUploadForm = z.infer<typeof fileUploadSchema>;
