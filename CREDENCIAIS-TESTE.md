# 🔑 CREDENCIAIS DE TESTE - CélulasConnect

## 📋 Contas Criadas para Teste

### 🏛️ Igreja Batista Central

#### 👨‍💼 Administrador
- **Email**: `joao@ibcentral.com.br`
- **Senha**: `123456`
- **Nome**: João Silva
- **Tipo**: Admin

#### 👤 Líder de Célula
- **Email**: `carlos@ibcentral.com.br`
- **Senha**: `123456`
- **Nome**: Carlos Oliveira
- **Tipo**: Líder

---

### ⛪ Igreja Metodista São Paulo

#### 👩‍💼 Administradora
- **Email**: `maria@metodista.com.br`
- **Senha**: `123456`
- **Nome**: Maria Santos
- **Tipo**: Admin

#### 👤 Líder de Célula
- **Email**: `ana@metodista.com.br`
- **Senha**: `123456`
- **Nome**: Ana Costa
- **Tipo**: Líder

---

## 🚀 Como Testar

### 1. Acesse o Login
```
http://localhost:3000/login
```

### 2. Use qualquer uma das credenciais acima
- Todas as senhas são: **123456**
- Teste tanto o perfil Admin quanto Líder

### 3. Explore as Funcionalidades
- **Dashboard**: Visão geral das células
- **Gestão de Células**: CRUD completo
- **Frequência**: Controle de presença
- **Escalas**: Organização de equipes

### 4. Teste a Busca Pública
```
http://localhost:3000/buscar
```
- Não precisa de login
- Teste os filtros disponíveis

---

## 📊 Dados de Teste Incluídos

### Células Cadastradas:
1. **Célula Esperança** (Igreja Batista Central)
2. **Célula Jovens Unidos** (Igreja Metodista)
3. **Célula Família Abençoada** (Igreja Batista Central)

### Membros e Frequências:
- Cada célula tem membros cadastrados
- Histórico de frequência das últimas 4 semanas
- Equipes organizadas (Louvor, Recepção)

---

## 🎨 Melhorias Implementadas

✅ **Design Moderno**
- Gradientes e efeitos visuais
- Cards com hover effects
- Layout responsivo melhorado

✅ **Sistema de Notificações**
- Toast messages para feedback
- Estados de loading
- Validações visuais

✅ **Autenticação Real**
- Hash de senhas com bcrypt
- Validação no banco de dados
- Sessões seguras

✅ **APIs Funcionais**
- Login/Registro
- Busca de células com filtros
- Dados dinâmicos do banco

---

## 🔧 Comandos Úteis

```bash
# Iniciar o projeto
npm run dev

# Resetar dados de teste
npm run db:reset

# Ver banco de dados
npx prisma studio
```

---

**💡 Dica**: Comece testando com a conta de admin `joao@ibcentral.com.br` para ter acesso completo a todas as funcionalidades!