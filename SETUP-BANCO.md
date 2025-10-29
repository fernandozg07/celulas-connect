# 🗄️ Configuração do Banco de Dados Real

## Situação Atual
- ❌ SQLite local (`file:./dev.db`) - apenas testes
- ❌ Dados mock/fictícios

## ✅ Configuração PostgreSQL (Recomendado)

### 1. Criar Conta no Supabase (Gratuito)
1. Acesse: https://supabase.com
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Anote as credenciais do banco

### 2. Configurar Variáveis de Ambiente
Edite o arquivo `.env` com suas credenciais:

```env
# Database - PostgreSQL (Supabase)
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="celulas-connect-secret-2024"

# App Settings
NODE_ENV="development"
```

### 3. Atualizar Schema do Prisma
```bash
# Copiar schema PostgreSQL
copy prisma\schema-postgresql.prisma prisma\schema.prisma

# Gerar cliente
npx prisma generate

# Aplicar migrações
npx prisma db push

# Popular com dados iniciais
npx tsx scripts/seed.ts
```

### 4. Verificar Conexão
```bash
npx prisma studio
```

## 🚀 Alternativas de Banco Gratuito

### Supabase (Recomendado)
- ✅ 500MB gratuito
- ✅ Interface web
- ✅ Backup automático

### Railway
- ✅ $5 crédito mensal
- ✅ Deploy automático

### Neon
- ✅ 3GB gratuito
- ✅ Serverless

### PlanetScale (MySQL)
- ✅ 1 banco gratuito
- ✅ Branching

## 📋 Comandos Úteis

```bash
# Ver status do banco
npx prisma db pull

# Reset completo
npx prisma migrate reset

# Visualizar dados
npx prisma studio

# Backup
pg_dump $DATABASE_URL > backup.sql
```

## 🔧 Troubleshooting

### Erro de Conexão
- Verifique se a URL está correta
- Confirme se o IP está liberado no firewall
- Teste a conexão: `npx prisma db pull`

### Erro de SSL
Adicione `?sslmode=require` na URL:
```
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"
```

## 🎯 Próximos Passos

1. ✅ Configurar banco PostgreSQL
2. ✅ Migrar dados de teste
3. 🔄 Implementar backup automático
4. 🔄 Configurar ambiente de produção
5. 🔄 Monitoramento de performance