# Instruções do Copilot para MaDRIA

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexto do Projeto

Este é o **MaDRIA (Medical AI Digital Assistant)** - um assistente de IA médica desenvolvido em Next.js com TypeScript. Inspirado no Monolito de "2001: Uma Odisseia no Espaço", MaDRIA representa um marco evolutivo na medicina personalizada através da inteligência artificial.

### Funcionalidades Principais
1. **Coleta de Dados**: Upload de exames (PDF/imagens), laudos de bioimpedância e questionários médicos
2. **Análise com IA**: Interpretação automática de exames laboratoriais e geração de perfis metabólicos
3. **Planos Personalizados**: Criação de planos de treino periodizados e planos nutricionais
4. **Integração de Calendário**: Inserção automática de eventos no calendário do usuário
5. **WhatsApp Bot**: Acompanhamento diário via mensagens automatizadas
6. **Ajustes Dinâmicos**: Recalibração baseada no progresso e novos dados

### Arquitetura Técnica
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: API Routes do Next.js
- **IA**: Integração com OpenAI/Claude para análise de dados médicos
- **Banco de Dados**: Supabase ou PostgreSQL
- **Autenticação**: NextAuth.js
- **WhatsApp**: WhatsApp Business API
- **Upload de Arquivos**: Cloudinary ou AWS S3
- **PDF Processing**: pdf-parse, Tesseract.js para OCR

### Diretrizes de Código
- Use TypeScript rigorosamente com tipos bem definidos
- Implemente validação com Zod para todos os formulários
- Siga padrões de acessibilidade (WCAG 2.1)
- Mantenha componentes pequenos e reutilizáveis
- Use Server Components quando possível para melhor performance
- Implemente tratamento de erro robusto
- Mantenha logs detalhados para auditoria médica

### Segurança e Compliance
- **LGPD**: Implement data privacy and consent management
- **Criptografia**: Encrypt sensitive medical data
- **Auditoria**: Log all medical data access and changes
- **Validação**: Never provide medical diagnosis - only suggestions
- **Alertas**: Flag critical values requiring immediate medical attention

### Estrutura de Dados
```typescript
interface PatientSnapshot {
  id: string;
  personalInfo: PersonalInfo;
  medicalHistory: MedicalHistory;
  labResults: LabResult[];
  bioimpedance: BioimpedanceData;
  goals: HealthGoals;
  currentPlans: {
    workout: WorkoutPlan;
    nutrition: NutritionPlan;
  };
  progress: ProgressData[];
}
```

### Padrões de Resposta da IA
Todas as respostas da IA devem seguir este formato JSON:
```json
{
  "workout_plan": [...],
  "nutrition_plan": [...],
  "calendar_events": [...],
  "daily_messages": [...],
  "alerts": [...],
  "recommendations": [...]
}
```

### Exemplo de System Prompt
"Você é MaDRIA, um Assistente de IA Médica Digital. Sua função é acompanhar diariamente usuários em seus objetivos de saúde, sempre priorizando segurança e nunca fazendo diagnósticos definitivos. Como o Monolito de 2001, você representa evolução e transformação na medicina personalizada."
