# 🚀 Deploy no Vercel com Supabase

## 📋 Pré-requisitos
- ✅ Conta Supabase criada
- ✅ Projeto Supabase configurado
- ✅ Código no GitHub

## 🔗 1. Obter Credenciais do Supabase

### No painel do Supabase:
1. Acesse seu projeto no Supabase
2. Vá em **Settings** → **Database**
3. Copie a **Connection String** (URI)
4. Formato: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

## 🌐 2. Deploy no Vercel

### Opção A: Via GitHub (Recomendado)
1. **Push para GitHub:**
```bash
git add .
git commit -m "Configuração banco Supabase"
git push origin main
```

2. **Conectar no Vercel:**
   - Acesse: https://vercel.com
   - Import Git Repository
   - Selecione seu repositório

### Opção B: Via CLI Vercel
```bash
npm i -g vercel
vercel login
vercel
```

## ⚙️ 3. Configurar Variáveis de Ambiente

### No painel do Vercel:
1. Vá em **Settings** → **Environment Variables**
2. Adicione as variáveis:

```env
DATABASE_URL=postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres
NEXTAUTH_URL=https://seu-app.vercel.app
NEXTAUTH_SECRET=celulas-connect-secret-2024-production
NODE_ENV=production
```

### Via CLI:
```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add NODE_ENV
```

## 🔧 4. Configurar Build

### Verificar vercel.json:
```json
{
  "buildCommand": "prisma generate && prisma db push && npm run db:seed && next build",
  "installCommand": "npm install"
}
```

## 🎯 5. Deploy Final
```bash
vercel --prod
```

## ✅ 6. Verificar Deploy

### Checklist pós-deploy:
- [ ] Site carrega sem erros
- [ ] Login funciona
- [ ] Dados aparecem no dashboard
- [ ] Busca de células funciona

### Comandos de verificação:
```bash
# Ver logs
vercel logs

# Ver status
vercel ls

# Redeploy
vercel --prod
```

## 🔍 7. Troubleshooting

### Erro de Build:
```bash
# Limpar cache
vercel --prod --force

# Ver logs detalhados
vercel logs --follow
```

### Erro de Banco:
- Verifique se a DATABASE_URL está correta
- Confirme se o Supabase permite conexões externas
- Teste: `npx prisma db pull` localmente

### Erro de NextAuth:
- NEXTAUTH_URL deve ser a URL do Vercel
- NEXTAUTH_SECRET deve ser diferente do desenvolvimento

## 🎉 Resultado Final

**Antes:** Apenas local com SQLite  
**Depois:** Produção com PostgreSQL no Vercel! 

### URLs importantes:
- **App:** https://seu-app.vercel.app
- **Supabase:** https://app.supabase.com
- **Vercel:** https://vercel.com/dashboard