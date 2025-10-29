# ⚡ Conectar Supabase + Vercel - Passo a Passo

## 🎯 Você já tem:
- ✅ Conta Supabase
- ✅ Projeto Supabase criado

## 📝 1. Pegar URL do Supabase

No seu painel do Supabase:
1. Vá em **Settings** → **Database**
2. Copie a **Connection string**
3. Vai ser algo como:
   ```
   postgresql://postgres:SUA_SENHA@db.abc123.supabase.co:5432/postgres
   ```

## 🔧 2. Configurar Localmente

1. **Edite o arquivo `.env`:**
```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@db.abc123.supabase.co:5432/postgres"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="celulas-connect-secret-2024"
NODE_ENV="development"
```

2. **Configure o banco:**
```bash
npm run db:setup
```

3. **Teste localmente:**
```bash
npm run dev
```

## 🚀 3. Deploy no Vercel

### Opção A: GitHub (Mais fácil)
```bash
# Se ainda não tem repositório GitHub
git init
git add .
git commit -m "Projeto CélulasConnect"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/celulas-connect.git
git push -u origin main
```

Depois:
1. Vá em https://vercel.com
2. **Import Git Repository**
3. Selecione seu repositório
4. **Deploy**

### Opção B: CLI Vercel
```bash
npm i -g vercel
vercel login
vercel
```

## ⚙️ 4. Configurar Variáveis no Vercel

No painel do Vercel:
1. **Settings** → **Environment Variables**
2. Adicione:

```
DATABASE_URL = postgresql://postgres:SUA_SENHA@db.abc123.supabase.co:5432/postgres
NEXTAUTH_URL = https://seu-app.vercel.app
NEXTAUTH_SECRET = celulas-connect-secret-2024-production
NODE_ENV = production
```

## 🎉 5. Redeploy

Após adicionar as variáveis:
1. Vá em **Deployments**
2. Clique nos **3 pontinhos** do último deploy
3. **Redeploy**

## ✅ Pronto!

Seu app estará rodando em:
`https://seu-app.vercel.app`

## 🔍 Se der erro:

1. **Ver logs:** Vercel → Deployments → View Function Logs
2. **Testar banco:** `npx prisma studio` (localmente)
3. **Redeployar:** Deployments → Redeploy

---

**Resultado:** App online com banco real! 🎉