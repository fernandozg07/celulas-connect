# 🚀 Configurar Banco Real - Guia Rápido

## ⚡ Setup em 5 minutos

### 1. Criar Banco Gratuito
**Supabase (Recomendado):**
1. Acesse: https://supabase.com
2. Crie conta → New Project
3. Copie a "Database URL"

### 2. Configurar .env
Edite o arquivo `.env` e cole sua URL:
```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@db.SEU_PROJETO.supabase.co:5432/postgres"
```

### 3. Executar Setup Automático
```bash
npm run db:setup
```

### 4. Iniciar Aplicação
```bash
npm run dev
```

## 🎯 Resultado
- ✅ Banco PostgreSQL real
- ✅ Dados de teste populados
- ✅ Pronto para produção

## 📊 Visualizar Dados
```bash
npm run db:studio
```

## 🔄 Reset Completo
```bash
npm run db:reset
```

---

**Antes:** SQLite local (apenas testes)  
**Depois:** PostgreSQL real (produção ready) 🎉