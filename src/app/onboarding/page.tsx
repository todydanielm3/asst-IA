'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Upload, FileText, User, Target, History } from 'lucide-react';
import Link from 'next/link';
import { MaDRIALogo } from '@/components/MaDRIALogo';
import { onboardingSchema, type OnboardingForm } from '@/lib/schemas';

type Step = 'personal' | 'medical' | 'goals' | 'uploads' | 'review';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      personalInfo: {
        emergencyContact: {
          name: '',
          phone: '',
          relationship: '',
        },
      },
      medicalHistory: {
        allergies: [],
        medications: [],
        chronicConditions: [],
        surgeries: [],
        familyHistory: [],
        smokingStatus: 'never',
        alcoholConsumption: 'none',
        exerciseFrequency: 'sedentary',
      },
      goals: {
        primary: 'maintenance',
        timeframe: 12,
        activityLevel: 'sedentary',
        dietaryRestrictions: [],
        preferredWorkoutTypes: [],
        availableWorkoutDays: [],
        workoutDuration: 60,
      },
    },
  });

  const steps: { id: Step; title: string; icon: any }[] = [
    { id: 'personal', title: 'Informações Pessoais', icon: User },
    { id: 'medical', title: 'Histórico Médico', icon: History },
    { id: 'goals', title: 'Objetivos', icon: Target },
    { id: 'uploads', title: 'Upload de Exames', icon: Upload },
    { id: 'review', title: 'Revisão', icon: FileText },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const onSubmit = async (data: OnboardingForm) => {
    // TODO: Implementar envio dos dados para a API
    console.log('Dados do onboarding:', data);
    console.log('Arquivos:', uploadedFiles);
    
    // Redirecionar para dashboard
    window.location.href = '/dashboard';
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <Link href="/">
          <MaDRIALogo size="sm" textSize="md" />
        </Link>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">
            {steps.find(step => step.id === currentStep)?.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Step */}
          {currentStep === 'personal' && (
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo *
                  </label>
                  <input
                    {...register('personalInfo.name')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Seu nome completo"
                  />
                  {errors.personalInfo?.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    {...register('personalInfo.email')}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="seu@email.com"
                  />
                  {errors.personalInfo?.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de nascimento *
                  </label>
                  <input
                    {...register('personalInfo.dateOfBirth')}
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.personalInfo?.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.dateOfBirth.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gênero *
                  </label>
                  <select
                    {...register('personalInfo.gender')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                  </select>
                  {errors.personalInfo?.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.gender.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Altura (cm) *
                  </label>
                  <input
                    {...register('personalInfo.height', { valueAsNumber: true })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="170"
                  />
                  {errors.personalInfo?.height && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.height.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso atual (kg) *
                  </label>
                  <input
                    {...register('personalInfo.weight', { valueAsNumber: true })}
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="70.5"
                  />
                  {errors.personalInfo?.weight && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.weight.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
                  </label>
                  <input
                    {...register('personalInfo.phone')}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(11) 99999-9999"
                  />
                  {errors.personalInfo?.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.personalInfo.phone.message}</p>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Contato de Emergência</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome *
                    </label>
                    <input
                      {...register('personalInfo.emergencyContact.name')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nome do contato"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      {...register('personalInfo.emergencyContact.phone')}
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relacionamento *
                    </label>
                    <input
                      {...register('personalInfo.emergencyContact.relationship')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Cônjuge, mãe, irmão..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Medical History Step */}
          {currentStep === 'medical' && (
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status de tabagismo
                  </label>
                  <select
                    {...register('medicalHistory.smokingStatus')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="never">Nunca fumei</option>
                    <option value="former">Ex-fumante</option>
                    <option value="current">Fumante atual</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consumo de álcool
                  </label>
                  <select
                    {...register('medicalHistory.alcoholConsumption')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">Não bebo</option>
                    <option value="light">Ocasionalmente</option>
                    <option value="moderate">Moderadamente</option>
                    <option value="heavy">Frequentemente</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequência de exercício atual
                  </label>
                  <select
                    {...register('medicalHistory.exerciseFrequency')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sedentary">Sedentário</option>
                    <option value="light">Exercício leve (1-2x/semana)</option>
                    <option value="moderate">Moderado (3-4x/semana)</option>
                    <option value="active">Ativo (5-6x/semana)</option>
                    <option value="very_active">Muito ativo (diário)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alergias (separe por vírgula)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Ex: amendoim, camarão, penicilina..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medicamentos em uso (separe por vírgula)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Ex: losartana 50mg, metformina 850mg..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condições crônicas (separe por vírgula)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Ex: diabetes tipo 2, hipertensão, hipotireoidismo..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cirurgias realizadas (separe por vírgula)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Ex: apendicectomia (2015), cesariana (2020)..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Goals Step */}
          {currentStep === 'goals' && (
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objetivo principal *
                  </label>
                  <select
                    {...register('goals.primary')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="weight_loss">Perda de peso</option>
                    <option value="weight_gain">Ganho de peso</option>
                    <option value="muscle_gain">Ganho de massa muscular</option>
                    <option value="maintenance">Manutenção</option>
                    <option value="health_improvement">Melhora da saúde geral</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prazo para atingir o objetivo (semanas) *
                  </label>
                  <input
                    {...register('goals.timeframe', { valueAsNumber: true })}
                    type="number"
                    min="1"
                    max="104"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="12"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso meta (kg)
                  </label>
                  <input
                    {...register('goals.targetWeight', { valueAsNumber: true })}
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="65.0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duração ideal do treino (minutos) *
                  </label>
                  <input
                    {...register('goals.workoutDuration', { valueAsNumber: true })}
                    type="number"
                    min="15"
                    max="180"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="60"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Restrições alimentares (separe por vírgula)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Ex: vegetariano, intolerante à lactose, sem glúten..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dias disponíveis para treino
                </label>
                <div className="grid grid-cols-7 gap-2 mt-2">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                    <label key={index} className="flex items-center justify-center p-2 border rounded cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        value={index}
                        className="sr-only"
                      />
                      <span className="text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Upload Step */}
          {currentStep === 'uploads' && (
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              <div className="text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload de Exames</h3>
                <p className="text-gray-600 mb-6">
                  Faça upload dos seus exames laboratoriais, laudos de bioimpedância ou outros documentos médicos.
                  Formatos aceitos: PDF, JPG, PNG
                </p>
                
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-6 py-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Escolher arquivos
                </label>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-3">Arquivos carregados:</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({Math.round(file.size / 1024)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-sm text-gray-500">
                <p>💡 <strong>Dica:</strong> Para melhores resultados na análise:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Certifique-se de que o texto esteja legível</li>
                  <li>Inclua a data de realização do exame</li>
                  <li>Mantenha os valores de referência visíveis</li>
                </ul>
              </div>
            </div>
          )}

          {/* Review Step */}
          {currentStep === 'review' && (
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              <h3 className="text-lg font-semibold mb-4">Revisão dos Dados</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Informações Pessoais</h4>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>Nome: {watch('personalInfo.name')}</p>
                      <p>Email: {watch('personalInfo.email')}</p>
                      <p>Altura: {watch('personalInfo.height')} cm</p>
                      <p>Peso: {watch('personalInfo.weight')} kg</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">Objetivo</h4>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>Meta: {watch('goals.primary')}</p>
                      <p>Prazo: {watch('goals.timeframe')} semanas</p>
                      <p>Duração do treino: {watch('goals.workoutDuration')} min</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Histórico Médico</h4>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>Tabagismo: {watch('medicalHistory.smokingStatus')}</p>
                      <p>Álcool: {watch('medicalHistory.alcoholConsumption')}</p>
                      <p>Exercício: {watch('medicalHistory.exerciseFrequency')}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">Arquivos</h4>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>{uploadedFiles.length} arquivo(s) carregado(s)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Próximos passos:</strong> Após enviar, nossa IA analisará seus dados e criará
                  planos personalizados de treino e nutrição. Você receberá notificações via WhatsApp
                  e poderá acompanhar tudo no dashboard.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </button>
            
            {currentStep === 'review' ? (
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
              >
                Finalizar Cadastro
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Próximo
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
