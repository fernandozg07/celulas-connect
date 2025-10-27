# 🧪 Guia de Testes - CélulasConnect

## 🚀 Como Executar o Projeto

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Banco de Dados
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 3. Executar o Projeto
```bash
npm run dev
```

### 4. Acessar
- **URL**: http://localhost:3000

## 👥 Contas de Teste Criadas

### 🏛️ Igreja Batista Central
- **Admin**: `joao@ibcentral.com.br` | Senha: `123456`
- **Líder**: `carlos@ibcentral.com.br` | Senha: `123456`

### 🏛️ Igreja Metodista São Paulo
- **Admin**: `maria@metodista.com.br` | Senha: `123456`
- **Líder**: `ana@metodista.com.br` | Senha: `123456`

## 🔍 Funcionalidades para Testar

### 📱 Módulo Público (Sem Login)
1. **Landing Page**: Acesse `/` para ver a página inicial
2. **Busca de Células**: Acesse `/buscar` para:
   - Ver células disponíveis
   - Filtrar por dia da semana
   - Filtrar por faixa etária
   - Filtrar por localização/bairro
   - Clicar no botão WhatsApp para contato

### 🔐 Módulo Administrativo (Com Login)
1. **Login/Cadastro**: Acesse `/login` para:
   - Fazer login com contas existentes
   - Cadastrar nova igreja (teste o formulário completo)

2. **Dashboard**: Após login, você verá:
   - Estatísticas das células
   - Ações rápidas
   - Próximas reuniões
   - Menu principal

3. **Gestão de Células**: Acesse `/dashboard/celulas`
4. **Controle de Frequência**: Acesse `/dashboard/frequencia`
5. **Gestão de Escalas**: Acesse `/dashboard/escalas`

## 📊 Dados de Teste Incluídos

### Células Criadas:
1. **Célula Esperança** (Igreja Batista Central)
   - Líder: Carlos Oliveira
   - Dia: Terça-feira às 19:30
   - Bairro: Vila Madalena
   - Faixa: Adultos

2. **Célula Jovens Unidos** (Igreja Metodista)
   - Líder: Ana Costa
   - Dia: Quinta-feira às 20:00
   - Bairro: Pinheiros
   - Faixa: Jovens

3. **Célula Família Abençoada** (Igreja Batista Central)
   - Líder: João Silva
   - Dia: Sábado às 15:00
   - Bairro: Jardins
   - Faixa: Todas as idades

### Membros e Frequências:
- Cada célula tem membros cadastrados
- Histórico de frequência das últimas 4 semanas
- Equipes organizadas (Louvor, Recepção)

## 🔧 Melhorias Implementadas

### ✅ Sistema de Autenticação Real
- Login com hash de senha (bcrypt)
- Validação de credenciais no banco
- Feedback visual com toasts

### ✅ Banco de Dados Funcional
- Schema Prisma completo
- Dados relacionais (Igreja → Usuário → Célula → Membros)
- APIs REST funcionais

### ✅ Interface Melhorada
- Sistema de notificações (Toast)
- Estados de loading
- Validações de formulário
- Feedback visual consistente

### ✅ APIs Implementadas
- `POST /api/auth/login` - Autenticação
- `POST /api/auth/register` - Cadastro de igreja
- `GET /api/celulas` - Busca de células com filtros

## 🧪 Cenários de Teste Sugeridos

### 1. Teste de Busca Pública
- Acesse `/buscar` sem login
- Teste todos os filtros
- Verifique se o botão WhatsApp funciona

### 2. Teste de Cadastro
- Acesse `/login`
- Clique em "Cadastrar Igreja"
- Preencha todos os campos
- Verifique se o cadastro funciona

### 3. Teste de Login
- Use as credenciais fornecidas
- Verifique se redireciona para dashboard
- Teste logout

### 4. Teste de Dashboard
- Explore todas as seções
- Verifique se os dados aparecem corretamente
- Teste navegação entre páginas

## 🐛 Comandos Úteis para Debug

```bash
# Resetar banco e recriar dados
npm run db:reset

# Ver logs do servidor
npm run dev

# Verificar banco de dados
npx prisma studio
```

## 📝 Próximos Passos Sugeridos

1. **Implementar CRUD completo de células**
2. **Sistema de upload de imagens**
3. **Geolocalização real com mapas**
4. **Notificações push**
5. **Relatórios e analytics**
6. **Sistema de avaliações**

---

**Dica**: Use as contas de teste para explorar diferentes perspectivas (admin vs líder) e testar todas as funcionalidades implementadas!