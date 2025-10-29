# 🚀 Deploy Final - Passo a Passo

## 1. **Preparar para Deploy**

### Aplicar mudanças no banco:
```bash
npx prisma db push
```

### Testar uma última vez:
```bash
npm run dev
# Teste: http://localhost:3000
```

## 2. **Commit e Push para GitHub**

```bash
git add .
git commit -m "🚀 Versão final - Todos bugs corrigidos"
git push origin main
```

## 3. **Deploy no Vercel**

### Opção A - Via Dashboard:
1. Acesse: https://vercel.com/dashboard
2. Clique em **"Import Git Repository"**
3. Selecione seu repositório
4. Clique **"Deploy"**

### Opção B - Via CLI:
```bash
npx vercel --prod
```

## 4. **Configurar Variáveis no Vercel**

No painel do Vercel → Settings → Environment Variables:

```
DATABASE_URL = postgresql://postgres:Celula01@db.hjijubdplufxukggakmv.supabase.co:5432/postgres
NEXTAUTH_URL = https://SEU-APP.vercel.app
NEXTAUTH_SECRET = celulas-connect-secret-2024-production
NODE_ENV = production
EMAIL_FROM = noreply@celulasconnect.com.br
```

## 5. **Redeploy Final**

Após adicionar variáveis:
1. Deployments → 3 pontinhos → **Redeploy**

## 6. **Testar Produção**

- ✅ Página inicial
- ✅ Buscar células
- ✅ Downloads (arquivo real)
- ✅ Experiências (visual corrigido)
- ✅ Login/Dashboard
- ✅ Teste banco: `/test-banco`

## 🎉 **PRONTO!**

Seu app estará em: `https://seu-app.vercel.app`