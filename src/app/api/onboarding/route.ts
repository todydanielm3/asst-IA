import { NextRequest, NextResponse } from 'next/server';
import { onboardingSchema } from '@/lib/schemas';
import { generateHealthPlan } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validar dados recebidos
    const validatedData = onboardingSchema.parse(data);
    
    // Calcular IMC e outras métricas básicas
    const { height, weight } = validatedData.personalInfo;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Determinar classificação do IMC
    let bmiCategory = 'normal';
    if (bmi < 18.5) bmiCategory = 'underweight';
    else if (bmi >= 25 && bmi < 30) bmiCategory = 'overweight';
    else if (bmi >= 30) bmiCategory = 'obese';
    
    // Calcular TDEE (Taxa de Metabolismo Basal + Atividade)
    const { dateOfBirth, gender } = validatedData.personalInfo;
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    
    let bmr: number;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Fatores de atividade
    const activityFactors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    const tdee = bmr * activityFactors[validatedData.medicalHistory.exerciseFrequency];
    
    // Gerar perfil metabólico básico
    const metabolicProfile = {
      bmi,
      bmiCategory,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      age,
      riskFactors: [] as string[],
      recommendations: [] as string[]
    };
    
    // Identificar fatores de risco
    if (bmi >= 25) metabolicProfile.riskFactors.push('Sobrepeso/Obesidade');
    if (validatedData.medicalHistory.smokingStatus === 'current') {
      metabolicProfile.riskFactors.push('Tabagismo');
    }
    if (validatedData.medicalHistory.alcoholConsumption === 'heavy') {
      metabolicProfile.riskFactors.push('Consumo excessivo de álcool');
    }
    if (validatedData.medicalHistory.exerciseFrequency === 'sedentary') {
      metabolicProfile.riskFactors.push('Sedentarismo');
    }
    
    // Gerar recomendações básicas
    if (validatedData.goals.primary === 'weight_loss') {
      metabolicProfile.recommendations.push('Déficit calórico controlado');
      metabolicProfile.recommendations.push('Exercícios aeróbicos e resistência');
    }
    if (validatedData.goals.primary === 'muscle_gain') {
      metabolicProfile.recommendations.push('Superávit calórico moderado');
      metabolicProfile.recommendations.push('Foco em exercícios de resistência');
    }
    
    // Gerar planos com IA (simulado por enquanto)
    const aiPlans = await generateHealthPlan({
      personalInfo: validatedData.personalInfo,
      goals: validatedData.goals,
      medicalHistory: validatedData.medicalHistory,
      metabolicProfile
    });
    
    // Salvar no banco de dados (implementar posteriormente)
    const patientId = `patient_${Date.now()}`;
    
    return NextResponse.json({
      success: true,
      patientId,
      metabolicProfile,
      plans: aiPlans,
      message: 'Onboarding concluído com sucesso!'
    });
    
  } catch (error) {
    console.error('Erro no onboarding:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
