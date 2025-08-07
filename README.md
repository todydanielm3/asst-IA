# MaDRIA - Medical AI Digital Assistant

Um assistente de IA médica inteligente que transforma dados clínicos em ações práticas, oferecendo acompanhamento personalizado, planos inteligentes e orientação constante para alcançar objetivos de saúde.

## 🚀 Sobre o MaDRIA

MaDRIA (Medical AI Digital Assistant) é inspirado no conceito do Monolito de "2001: Uma Odisseia no Espaço" - um marco evolutivo que representa o salto tecnológico na medicina personalizada. Como o Monolito, MaDRIA simboliza a transformação e evolução através da inteligência artificial aplicada à saúde.

## ✨ Funcionalidades Principais

### 🧠 Coleta Inteligente de Dados
- Upload de exames laboratoriais (PDF, JPG, PNG)
- Processamento de laudos de bioimpedância
- Formulário completo de histórico médico e objetivos
- OCR automático para extração de valores de exames

### 🤖 Análise com IA
- Interpretação automática de resultados de exames
- Geração de perfil metabólico completo
- Identificação de valores fora da faixa de referência
- Alertas de segurança para valores críticos

### 📋 Planos Personalizados
- Criação automática de planos de treino periodizados
- Planos nutricionais com cálculo de calorias e macronutrientes
- Ajustes dinâmicos baseados no progresso
- Recomendações adaptadas às condições médicas

### 📅 Integração de Calendário
- Inserção automática de treinos e refeições
- Lembretes de hidratação e medicamentos
- Cronograma visual em PDF
- Sincronização com calendários externos

### 💬 Acompanhamento IA 24h
- Lembretes personalizados de treino
- Check-ins de progresso
- Mensagens motivacionais
- Resposta a dúvidas em tempo real

### 📊 Monitoramento e Ajustes
- Dashboard completo com métricas
- Gráficos de progresso semanal
- Recalibração baseada na adesão
- Histórico detalhado de evolução

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React para produção
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização responsiva
- **Lucide React** - Ícones modernos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### Backend
- **Next.js API Routes** - APIs serverless
- **PDF-Parse** - Processamento de PDFs
- **Tesseract.js** - OCR para imagens
- **OpenAI/Claude** - Integração com IA (planejado)

### Dados e Segurança
- **Supabase** - Banco de dados e autenticação (planejado)
- **Criptografia** - Proteção de dados médicos
- **LGPD Compliance** - Conformidade com privacidade

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd asst-IA

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

### Variáveis de Ambiente
Crie um arquivo `.env.local`:
```bash
# APIs de IA (opcional para desenvolvimento)
OPENAI_API_KEY=sua_chave_openai
CLAUDE_API_KEY=sua_chave_claude

# Banco de dados (planejado)
DATABASE_URL=sua_url_supabase
SUPABASE_ANON_KEY=sua_chave_publica

# WhatsApp Business API (planejado)
WHATSAPP_TOKEN=seu_token_whatsapp
WHATSAPP_PHONE_ID=seu_id_telefone

# MaDRIA Configuration
MADRIA_API_VERSION=v1
MADRIA_LOG_LEVEL=info
```

## 📱 Funcionalidades Implementadas

### ✅ Concluído
- [x] Interface moderna e responsiva
- [x] Formulário de onboarding completo
- [x] Upload e processamento de PDFs/imagens
- [x] OCR para extração de texto
- [x] Análise básica de exames laboratoriais
- [x] Dashboard com métricas
- [x] Validação de formulários com Zod
- [x] Cálculo de IMC e TDEE
- [x] Sistema de tipos TypeScript completo

### 🚧 Em Desenvolvimento
- [ ] Integração com OpenAI/Claude
- [ ] Banco de dados Supabase
- [ ] Autenticação de usuários
- [ ] WhatsApp Business API
- [ ] Geração de PDFs para planos
- [ ] Sincronização com calendários
- [ ] Análise avançada de bioimpedância

### 📋 Planejado
- [ ] App mobile React Native
- [ ] Integração com wearables
- [ ] Telemedicina integrada
- [ ] Relatórios médicos automatizados
- [ ] Marketplace de profissionais
- [ ] Sistema de gamificação

## 🏗️ Arquitetura

```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard principal
│   ├── onboarding/        # Fluxo de cadastro
│   ├── upload/            # Upload de exames
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
├── lib/                   # Utilitários e serviços
│   ├── ai-service.ts      # Integração com IA
│   └── schemas.ts         # Validação Zod
├── types/                 # Definições TypeScript
│   └── health.ts          # Tipos do domínio de saúde
└── utils/                 # Funções auxiliares
```

## 🔒 Segurança e Compliance

### LGPD (Lei Geral de Proteção de Dados)
- Consentimento explícito para coleta de dados
- Criptografia de dados sensíveis
- Logs de auditoria
- Direito ao esquecimento

### Segurança Médica
- Nunca fornece diagnósticos definitivos
- Alertas para valores críticos
- Recomendação de supervisão médica
- Validação de dados de entrada

### Privacidade
- Dados armazenados localmente quando possível
- Criptografia em trânsito e repouso
- Acesso baseado em permissões
- Anonimização de dados analíticos

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

- **Website**: [Em desenvolvimento]
- **Email**: [contato@madria.ai]
- **LinkedIn**: [MaDRIA AI]

## 🙏 Agradecimentos

- Stanley Kubrick pela inspiração visual do Monolito
- OpenAI e Anthropic pelas APIs de IA
- Comunidade Next.js pelo framework
- Tesseract.js pelo OCR gratuito
- Lucide pela biblioteca de ícones
- Tailwind CSS pelo sistema de design

---

**⚕️ Aviso Médico**: MaDRIA não substitui consulta médica profissional. Sempre consulte um médico para diagnósticos e tratamentos.
