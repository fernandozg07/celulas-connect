const fs = require('fs');
const path = require('path');

console.log('🚀 Preparando deploy para Vercel...\n');

// Verificar se .env existe
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env não encontrado!');
  process.exit(1);
}

// Ler .env e extrair variáveis
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  if (line.includes('=') && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    envVars[key.trim()] = value.trim().replace(/"/g, '');
  }
});

console.log('📋 Variáveis encontradas no .env:');
Object.keys(envVars).forEach(key => {
  const maskedValue = key.includes('SECRET') || key.includes('PASSWORD') 
    ? '***' 
    : envVars[key];
  console.log(`   ${key}=${maskedValue}`);
});

console.log('\n🔧 Configuração para Vercel:');
console.log('\n1️⃣ No painel do Vercel, adicione estas variáveis:');
console.log('   Settings → Environment Variables\n');

// Gerar comandos para variáveis de ambiente
Object.keys(envVars).forEach(key => {
  let value = envVars[key];
  
  // Ajustar valores para produção
  if (key === 'NEXTAUTH_URL') {
    value = 'https://SEU-APP.vercel.app';
  }
  if (key === 'NEXTAUTH_SECRET') {
    value = 'celulas-connect-secret-2024-production';
  }
  if (key === 'NODE_ENV') {
    value = 'production';
  }
  
  console.log(`   ${key}=${value}`);
});

console.log('\n2️⃣ Comandos para deploy via CLI:');
console.log('   npm i -g vercel');
console.log('   vercel login');
console.log('   vercel --prod');

console.log('\n3️⃣ Ou conecte via GitHub:');
console.log('   git add .');
console.log('   git commit -m "Deploy setup"');
console.log('   git push origin main');
console.log('   → Importe no Vercel: https://vercel.com');

console.log('\n✅ Tudo pronto para deploy!');
console.log('📖 Consulte DEPLOY-VERCEL.md para detalhes');