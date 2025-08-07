import Link from "next/link";
import { ArrowRight, Heart, Brain, Activity, Calendar, MessageCircle, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-red-500" />
          <span className="text-xl font-bold text-gray-900">Saúde 24h</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            href="/onboarding"
          >
            Começar
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Seu Assistente de Saúde Digital 24h
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforme seus dados clínicos em ações práticas. Acompanhamento personalizado, 
              planos inteligentes e orientação constante para alcançar seus objetivos de saúde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="/onboarding"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Ver Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Análise Inteligente</h3>
              <p className="text-gray-600">
                Upload de exames laboratoriais e dados de bioimpedância. 
                IA interpreta resultados e gera perfil metabólico completo.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Planos Personalizados</h3>
              <p className="text-gray-600">
                Criação automática de planos de treino periodizados e 
                nutrição ajustados às suas condições e objetivos.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Integração de Agenda</h3>
              <p className="text-gray-600">
                Todos os treinos, refeições e lembretes inseridos 
                automaticamente no seu calendário.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold">WhatsApp 24h</h3>
              <p className="text-gray-600">
                Lembretes, check-ins e motivação via WhatsApp. 
                Responda dúvidas e reporte progresso a qualquer momento.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Activity className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Ajustes Dinâmicos</h3>
              <p className="text-gray-600">
                Recalibração constante baseada no seu progresso, 
                adesão e novos dados coletados.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">Segurança Total</h3>
              <p className="text-gray-600">
                Conformidade com LGPD, criptografia de dados médicos 
                e alertas para valores críticos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Transformar sua Saúde?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Comece agora e tenha um coach digital sempre disponível 
            para aconselhar, orientar e motivar você.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Iniciar Jornada de Saúde
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="font-semibold">Saúde 24h</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Assistente de Saúde 24h. Dados protegidos por criptografia.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
