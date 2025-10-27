# CélulasConnect - MVP

Plataforma unificada de gestão e conexão para células de igrejas, desenvolvida em Next.js.

## 🎯 Visão Geral

O CélulasConnect é uma plataforma web responsiva (Mobile-First) que unifica dois produtos em um único ecossistema:

1. **Módulo de Conexão** (Gratuito): Permite que membros encontrem e se conectem à célula ideal
2. **Módulo de Gestão** (Base para Premium): Organização básica de células e equipes para líderes

## 🚀 Funcionalidades Implementadas

### Módulo I: Conexão e Alcance (Público/Gratuito)

- ✅ **Landing Page**: Apresentação da proposta de valor
- ✅ **Busca por Geolocalização**: Sistema de busca de células próximas
- ✅ **Filtros Essenciais**: Por dia da semana e faixa etária
- ✅ **Perfil da Célula**: Informações do líder, horário, descrição
- ✅ **Conexão Direta**: Botão WhatsApp para contato com líder
- ✅ **Sistema de Avaliação**: Exibição de notas das células

### Módulo II: Gestão Essencial (Líderes/Igrejas)

- ✅ **Sistema de Login/Cadastro**: Autenticação para líderes e administradores
- ✅ **Gestão de Células (CRUD)**: Cadastro, edição e visualização completa
- ✅ **Controle de Frequência**: Registro de presença/falta dos membros
- ✅ **Uni Center Básico**: Designação manual de escalas e funções
- ✅ **Dashboard**: Painel com resumos e métricas básicas

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Banco de Dados**: Prisma + SQLite (desenvolvimento)
- **Autenticação**: NextAuth.js
- **Ícones**: Lucide React

## 📦 Instalação e Execução

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd projeto-celulas
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure o banco de dados**:
```bash
npx prisma generate
npx prisma db push
```

4. **Execute o projeto**:
```bash
npm run dev
```

5. **Acesse**: http://localhost:3000

## 📱 Estrutura do Projeto

```
projeto-celulas/
├── app/                    # App Router do Next.js
│   ├── page.tsx           # Landing page
│   ├── buscar/            # Módulo de busca de células
│   ├── login/             # Autenticação
│   └── dashboard/         # Painel administrativo
│       ├── celulas/       # Gestão de células
│       ├── frequencia/    # Controle de frequência
│       └── escalas/       # Gestão de escalas
├── components/            # Componentes reutilizáveis
├── lib/                   # Utilitários e configurações
├── prisma/               # Schema do banco de dados
└── types/                # Definições TypeScript
```

## 🎨 Design System

### Cores Principais
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #f59e0b (Amber)

### Componentes Base
- **Botões**: `.btn-primary`, `.btn-secondary`
- **Cards**: `.card`
- **Layout**: Mobile-first responsivo

## 🔮 Roadmap Futuro (Plano PRO)

### Funcionalidades Premium Planejadas:
- 🔄 **Automação Inteligente de Escalas**
- 📊 **Relatórios Avançados**
- 📱 **App Mobile Nativo**
- 💬 **Comunicação em Massa**
- 🎯 **Analytics Avançados**

## 💰 Modelo de Monetização

- **Gratuito**: Busca de células e gestão básica
- **Premium**: Automação de escalas e recursos avançados (assinatura mensal)

## 🤝 Contribuição

Este é um MVP focado na validação do mercado. Contribuições são bem-vindas!

## 📄 Licença

Projeto proprietário - Todos os direitos reservados.

---

**CélulasConnect** - Conectando comunidades, fortalecendo vínculos 🙏