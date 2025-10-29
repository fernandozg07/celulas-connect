# 🧪 Como Testar o Banco no Vercel

## 🎯 Métodos de Teste

### 1. **Teste Visual (Mais Fácil)**
Após deploy no Vercel:
- Acesse: `https://seu-app.vercel.app/test-banco`
- Clique em "Testar Conexão do Banco"
- Veja o resultado na tela

### 2. **Teste via API Direta**
- Acesse: `https://seu-app.vercel.app/api/test-db`
- Verá JSON com status da conexão

### 3. **Teste Local Primeiro**
Antes do deploy, teste localmente:
```bash
# Terminal 1
npm run dev

# Terminal 2 ou navegador
curl http://localhost:3000/api/test-db
# ou acesse: http://localhost:3000/test-banco
```

## ✅ Resultado Esperado (Sucesso)
```json
{
  "status": "success",
  "message": "Banco conectado com sucesso!",
  "environment": "production",
  "database": "Supabase PostgreSQL",
  "counts": {
    "igrejas": 2,
    "usuarios": 4,
    "celulas": 3,
    "membros": 5
  },
  "samples": {
    "igreja": "Igreja Batista Central",
    "celula": "Célula Esperança"
  }
}
```

## ❌ Resultado de Erro
```json
{
  "status": "error",
  "message": "Erro na conexão com banco",
  "error": "connect ECONNREFUSED...",
  "environment": "production"
}
```

## 🔧 Troubleshooting

### Se der erro no Vercel:
1. **Verificar variáveis de ambiente:**
   - Vercel → Settings → Environment Variables
   - Confirmar se DATABASE_URL está correta

2. **Ver logs detalhados:**
   - Vercel → Functions → View Logs
   - Procurar por erros de conexão

3. **Testar conexão Supabase:**
   - Painel Supabase → Settings → Database
   - Verificar se projeto está ativo

### Erros Comuns:
- `ECONNREFUSED`: URL do banco incorreta
- `authentication failed`: Senha errada
- `timeout`: Firewall bloqueando conexão

## 📋 Checklist de Deploy

Antes de testar no Vercel:
- [ ] Banco local funcionando
- [ ] Teste local: `http://localhost:3000/test-banco`
- [ ] Variáveis configuradas no Vercel
- [ ] Deploy realizado
- [ ] Teste produção: `https://seu-app.vercel.app/test-banco`

## 🎉 Próximos Passos

Se o teste passar:
- ✅ Banco funcionando no Vercel
- ✅ Pronto para usar em produção
- ✅ Pode remover página de teste depois