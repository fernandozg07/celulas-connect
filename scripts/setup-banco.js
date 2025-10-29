const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🗄️ Configurando banco de dados real...\n');

// Verificar se .env existe
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env não encontrado!');
  console.log('📝 Crie o arquivo .env com suas credenciais do banco.');
  process.exit(1);
}

// Ler .env
const envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('postgresql://')) {
  console.log('⚠️  Configure a DATABASE_URL no arquivo .env');
  console.log('📖 Consulte o arquivo SETUP-BANCO.md para instruções');
  process.exit(1);
}

try {
  console.log('1️⃣ Copiando schema PostgreSQL...');
  const schemaPostgres = path.join(process.cwd(), 'prisma', 'schema-postgresql.prisma');
  const schemaMain = path.join(process.cwd(), 'prisma', 'schema.prisma');
  
  if (fs.existsSync(schemaPostgres)) {
    fs.copyFileSync(schemaPostgres, schemaMain);
    console.log('✅ Schema PostgreSQL configurado');
  }

  console.log('\n2️⃣ Gerando cliente Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('\n3️⃣ Aplicando schema no banco...');
  execSync('npx prisma db push', { stdio: 'inherit' });

  console.log('\n4️⃣ Populando com dados iniciais...');
  execSync('npx tsx scripts/seed.ts', { stdio: 'inherit' });

  console.log('\n🎉 Banco configurado com sucesso!');
  console.log('\n📋 Próximos passos:');
  console.log('   • Execute: npm run dev');
  console.log('   • Acesse: http://localhost:3000');
  console.log('   • Visualize dados: npx prisma studio');

} catch (error) {
  console.error('\n❌ Erro na configuração:', error.message);
  console.log('\n🔧 Soluções:');
  console.log('   • Verifique a DATABASE_URL no .env');
  console.log('   • Confirme se o banco está acessível');
  console.log('   • Consulte SETUP-BANCO.md');
}