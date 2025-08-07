import { PersonalInfo, HealthGoals, MedicalHistory, WorkoutPlan, NutritionPlan, CalendarEvent, DailyMessage, Alert } from '@/types/health';

// Interface para o perfil metabólico
interface MetabolicProfile {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  age: number;
  riskFactors: string[];
  recommendations: string[];
}

// Interface para entrada da IA
interface AIInput {
  personalInfo: PersonalInfo;
  goals: HealthGoals;
  medicalHistory: MedicalHistory;
  metabolicProfile: MetabolicProfile;
}

// Interface para resposta da IA
interface AIResponse {
  workout_plan: WorkoutPlan;
  nutrition_plan: NutritionPlan;
  calendar_events: CalendarEvent[];
  daily_messages: DailyMessage[];
  alerts: Alert[];
  recommendations: string[];
}

// System prompt para o assistente de saúde
const HEALTH_ASSISTANT_PROMPT = `
Você é um Assistente de Saúde Digital especializado em criar planos personalizados de saúde.

FUNÇÃO: Acompanhar diariamente usuários em seus objetivos de saúde (perda de peso, ganho de massa, controle de parâmetros).

ETAPAS OBRIGATÓRIAS:

1. **Interpretar dados**: Analise informações pessoais, histórico médico e objetivos
2. **Atualizar perfil**: Mantenha um perfil metabólico atualizado 
3. **Gerar planos**:
   - Treino: rotina semanal (tipo, duração, intensidade, progressão)
   - Nutrição: calorias, macros e opções de refeições
4. **Criar agenda**: eventos estruturados para calendário
5. **Mensagens diárias**: lembretes motivacionais e educativos

REGRAS DE SEGURANÇA:
- NUNCA faça diagnóstico clínico ou prescreva medicamentos
- Se detectar valores críticos, aconselhe procurar médico
- Mantenha confidencialidade total
- Sempre inclua disclaimers sobre supervisão médica

FORMATO DE RESPOSTA: JSON estruturado conforme interface AIResponse

LINGUAGEM: Português brasileiro, claro e motivador
OBJETIVO: Maximizar adesão e segurança, ajustando em tempo real
`;

// Função para gerar prompt personalizado
function generatePersonalizedPrompt(input: AIInput): string {
  const { personalInfo, goals, medicalHistory, metabolicProfile } = input;
  
  return `
${HEALTH_ASSISTANT_PROMPT}

DADOS DO USUÁRIO:
- Nome: ${personalInfo.name}
- Idade: ${metabolicProfile.age} anos
- Gênero: ${personalInfo.gender}
- Altura: ${personalInfo.height}cm, Peso: ${personalInfo.weight}kg
- IMC: ${metabolicProfile.bmi.toFixed(1)} (${metabolicProfile.bmiCategory})
- TDEE: ${metabolicProfile.tdee} calorias/dia

OBJETIVO: ${goals.primary}
- Peso meta: ${goals.targetWeight || 'não especificado'}kg
- Prazo: ${goals.timeframe} semanas
- Duração treino preferida: ${goals.workoutDuration} minutos
- Dias disponíveis: ${goals.availableWorkoutDays.length} dias/semana
- Restrições alimentares: ${goals.dietaryRestrictions.join(', ') || 'nenhuma'}

HISTÓRICO MÉDICO:
- Tabagismo: ${medicalHistory.smokingStatus}
- Álcool: ${medicalHistory.alcoholConsumption}
- Exercício atual: ${medicalHistory.exerciseFrequency}
- Condições crônicas: ${medicalHistory.chronicConditions.join(', ') || 'nenhuma'}
- Medicamentos: ${medicalHistory.medications.join(', ') || 'nenhum'}

FATORES DE RISCO: ${metabolicProfile.riskFactors.join(', ') || 'nenhum identificado'}

CRIE um plano completo incluindo:
1. Plano de treino semanal periodizado
2. Plano nutricional com cálculo de calorias e macros
3. Cronograma de eventos para calendário
4. Mensagens diárias motivacionais
5. Alertas de segurança se necessário
6. Recomendações gerais

Responda APENAS com JSON válido no formato especificado.
`;
}

// Função para simular resposta da IA (substituir por chamada real para OpenAI/Claude)
export async function generateHealthPlan(input: AIInput): Promise<AIResponse> {
  // TODO: Integrar com API da OpenAI ou Claude
  // Por enquanto, retorna um plano exemplo baseado nos dados de entrada
  
  const { personalInfo, goals, metabolicProfile } = input;
  
  // Calcular calorias alvo baseado no objetivo
  let targetCalories = metabolicProfile.tdee;
  if (goals.primary === 'weight_loss') {
    targetCalories = Math.round(metabolicProfile.tdee * 0.8); // Déficit de 20%
  } else if (goals.primary === 'weight_gain' || goals.primary === 'muscle_gain') {
    targetCalories = Math.round(metabolicProfile.tdee * 1.1); // Superávit de 10%
  }
  
  // Distribuição de macronutrientes
  const protein = Math.round((targetCalories * 0.25) / 4); // 25% proteína
  const carbs = Math.round((targetCalories * 0.45) / 4); // 45% carboidrato
  const fat = Math.round((targetCalories * 0.30) / 9); // 30% gordura
  
  const workoutPlan: WorkoutPlan = {
    id: `workout_${Date.now()}`,
    name: `Plano de ${goals.primary} - ${personalInfo.name}`,
    duration: goals.timeframe,
    schedule: [
      {
        day: 1, // Segunda
        exercises: [
          {
            name: 'Caminhada rápida',
            type: 'cardio',
            duration: 30,
            instructions: 'Mantenha ritmo moderado, respire pelo nariz'
          },
          {
            name: 'Agachamento',
            type: 'strength',
            sets: 3,
            reps: 12,
            restTime: 60,
            instructions: 'Mantenha costas retas, desça até 90 graus'
          }
        ],
        totalDuration: goals.workoutDuration,
        intensity: 'moderate'
      }
    ],
    progressionNotes: 'Aumentar carga/repetições semanalmente conforme adaptação'
  };
  
  const nutritionPlan: NutritionPlan = {
    id: `nutrition_${Date.now()}`,
    name: `Plano Nutricional - ${personalInfo.name}`,
    dailyCalories: targetCalories,
    macroDistribution: {
      protein: 25,
      carbs: 45,
      fat: 30
    },
    meals: [
      {
        name: 'Café da manhã',
        time: '07:00',
        calories: Math.round(targetCalories * 0.25),
        macros: {
          protein: Math.round(protein * 0.25),
          carbs: Math.round(carbs * 0.3),
          fat: Math.round(fat * 0.25)
        },
        foods: [
          {
            name: 'Aveia',
            quantity: 50,
            unit: 'g',
            calories: 180,
            macros: { protein: 6, carbs: 32, fat: 3 }
          }
        ]
      }
    ],
    hydrationGoal: 2.5, // litros
    supplements: []
  };
  
  const calendarEvents: CalendarEvent[] = [
    {
      id: `event_${Date.now()}`,
      title: 'Treino - Cardio + Força',
      description: 'Caminhada + exercícios de força',
      date: new Date().toISOString().split('T')[0],
      time: '07:00',
      duration: goals.workoutDuration,
      type: 'workout',
      reminder: true
    }
  ];
  
  const dailyMessages: DailyMessage[] = [
    {
      id: `msg_${Date.now()}`,
      type: 'motivation',
      message: `Bom dia, ${personalInfo.name}! 🌅 Hoje é um novo dia para cuidar da sua saúde. Lembre-se: pequenos passos levam a grandes conquistas!`,
      scheduledTime: '07:00',
      priority: 'medium',
      requiresResponse: false
    }
  ];
  
  const alerts: Alert[] = [];
  
  // Adicionar alertas se necessário
  if (metabolicProfile.bmi >= 30) {
    alerts.push({
      id: `alert_${Date.now()}`,
      type: 'warning',
      title: 'Acompanhamento Médico Recomendado',
      message: 'Seu IMC indica obesidade. Recomendamos consulta com endocrinologista para avaliação completa.',
      date: new Date().toISOString(),
      requiresMedicalAttention: true,
      acknowledged: false
    });
  }
  
  const recommendations = [
    'Mantenha hidratação adequada (8-10 copos de água/dia)',
    'Durma 7-9 horas por noite para melhor recuperação',
    'Realize exercícios de forma progressiva',
    'Acompanhe seu progresso semanalmente'
  ];
  
  return {
    workout_plan: workoutPlan,
    nutrition_plan: nutritionPlan,
    calendar_events: calendarEvents,
    daily_messages: dailyMessages,
    alerts,
    recommendations
  };
}

// Função para integração futura com OpenAI
export async function callOpenAI(prompt: string): Promise<string> {
  // TODO: Implementar chamada real para OpenAI
  // const response = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   messages: [
  //     { role: "system", content: HEALTH_ASSISTANT_PROMPT },
  //     { role: "user", content: prompt }
  //   ],
  //   temperature: 0.7,
  //   max_tokens: 2000
  // });
  // return response.choices[0].message.content;
  
  // Por enquanto retorna string vazia
  return '';
}

// Função para análise de exames laboratoriais
export async function analyzeLabResults(text: string): Promise<any> {
  // TODO: Implementar análise de texto de exames com IA
  // Extrair valores, unidades, referências
  // Identificar valores anormais
  // Gerar interpretação clínica
  
  return {
    extracted_values: [],
    abnormal_values: [],
    clinical_interpretation: '',
    recommendations: []
  };
}
