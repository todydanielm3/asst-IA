'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  Calendar, 
  TrendingUp, 
  Bell, 
  User, 
  Target, 
  Droplets,
  Moon,
  Scale,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { MaDRIALogo } from '@/components/MaDRIALogo';

// Componente de card para métricas
function MetricCard({ title, value, unit, icon: Icon, color = 'blue', trend }: {
  title: string;
  value: string | number;
  unit?: string;
  icon: any;
  color?: string;
  trend?: 'up' | 'down' | 'stable';
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className={`text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
            <TrendingUp className={`h-4 w-4 inline ${trend === 'down' ? 'rotate-180' : ''}`} />
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-gray-900">
        {value}
        {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
      </div>
    </div>
  );
}

// Componente para próximas atividades
function UpcomingActivities() {
  const activities = [
    {
      time: '07:00',
      title: 'Treino - Cardio + Força',
      type: 'workout',
      duration: '60 min'
    },
    {
      time: '08:30',
      title: 'Café da manhã',
      type: 'meal',
      calories: '420 kcal'
    },
    {
      time: '12:00',
      title: 'Almoço',
      type: 'meal',
      calories: '650 kcal'
    },
    {
      time: '15:00',
      title: 'Lembrete - Hidratação',
      type: 'hydration',
      amount: '500ml'
    }
  ];

  const typeIcons = {
    workout: Activity,
    meal: Target,
    hydration: Droplets
  };

  const typeColors = {
    workout: 'text-blue-600 bg-blue-100',
    meal: 'text-green-600 bg-green-100',
    hydration: 'text-cyan-600 bg-cyan-100'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2" />
        Próximas Atividades
      </h3>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = typeIcons[activity.type as keyof typeof typeIcons];
          const colorClass = typeColors[activity.type as keyof typeof typeColors];
          
          return (
            <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">
                  {activity.time} • {activity.duration || activity.calories || activity.amount}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Componente para progresso semanal
function WeeklyProgress() {
  const data = [
    { day: 'Seg', workout: 100, nutrition: 95 },
    { day: 'Ter', workout: 85, nutrition: 90 },
    { day: 'Qua', workout: 100, nutrition: 100 },
    { day: 'Qui', workout: 0, nutrition: 80 },
    { day: 'Sex', workout: 100, nutrition: 95 },
    { day: 'Sáb', workout: 90, nutrition: 85 },
    { day: 'Dom', workout: 0, nutrition: 70 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Progresso da Semana</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-8 text-sm font-medium text-gray-600">{item.day}</div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${item.workout}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{item.workout}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-green-600" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${item.nutrition}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{item.nutrition}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <Activity className="h-4 w-4 text-blue-600 mr-1" />
          Treino
        </div>
        <div className="flex items-center">
          <Target className="h-4 w-4 text-green-600 mr-1" />
          Nutrição
        </div>
      </div>
    </div>
  );
}

// Componente para alertas/notificações
function AlertsPanel() {
  const alerts = [
    {
      type: 'info',
      title: 'Hidratação',
      message: 'Você está 200ml abaixo da meta diária de água.',
      time: '14:30'
    },
    {
      type: 'success',
      title: 'Parabéns!',
      message: 'Meta de proteína atingida hoje!',
      time: '12:15'
    },
    {
      type: 'warning',
      title: 'Treino perdido',
      message: 'Você perdeu o treino de ontem. Que tal recuperar hoje?',
      time: '09:00'
    }
  ];

  const alertColors = {
    info: 'border-blue-300 bg-blue-50 text-blue-800',
    success: 'border-green-300 bg-green-50 text-green-800',
    warning: 'border-yellow-300 bg-yellow-50 text-yellow-800',
    error: 'border-red-300 bg-red-50 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Bell className="h-5 w-5 mr-2" />
        Notificações
      </h3>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border ${alertColors[alert.type as keyof typeof alertColors]}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm mt-1">{alert.message}</p>
              </div>
              <span className="text-xs opacity-75">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <MaDRIALogo size="sm" textSize="md" />
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentTime.toLocaleString('pt-BR')}
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <Link 
                href="/profile" 
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <User className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bom dia, Maria! 👋
          </h2>
          <p className="text-gray-600">
            Aqui está o resumo da sua jornada de saúde hoje.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Peso Atual"
            value="68.2"
            unit="kg"
            icon={Scale}
            color="blue"
            trend="down"
          />
          <MetricCard
            title="Calorias Hoje"
            value="1,245"
            unit="/ 1,800"
            icon={Zap}
            color="green"
          />
          <MetricCard
            title="Hidratação"
            value="1.8"
            unit="/ 2.5L"
            icon={Droplets}
            color="yellow"
          />
          <MetricCard
            title="Sono Ontem"
            value="7.5"
            unit="horas"
            icon={Moon}
            color="purple"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <UpcomingActivities />
            <WeeklyProgress />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <AlertsPanel />
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Link
                  href="/check-in"
                  className="block w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <div className="font-medium text-blue-900">Check-in Diário</div>
                  <div className="text-sm text-blue-600">Registrar peso, humor e energia</div>
                </Link>
                <Link
                  href="/upload"
                  className="block w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <div className="font-medium text-green-900">Upload de Exames</div>
                  <div className="text-sm text-green-600">Adicionar novos resultados</div>
                </Link>
                <Link
                  href="/plans"
                  className="block w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <div className="font-medium text-purple-900">Ver Planos</div>
                  <div className="text-sm text-purple-600">Treino e nutrição detalhados</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
