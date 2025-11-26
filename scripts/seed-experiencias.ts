import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Criando experiências iniciais...')

  try {
    // Criar experiências de exemplo
    const experiencias = [
      {
        autor: 'Maria Santos',
        celula: 'Célula Esperança',
        titulo: 'Batismo na Praia - Momento Inesquecível!',
        descricao: 'Que alegria imensa ver 3 irmãos sendo batizados hoje! Foi um momento de muita emoção e presença de Deus. Nossa célula cresceu não só em número, mas em fé e união. Glória a Deus!',
        categoria: 'batismo',
        likes: 47
      },
      {
        autor: 'João Silva',
        celula: 'Célula Jovens Unidos',
        titulo: 'Ação Social no Bairro - Amor em Prática',
        descricao: 'Nossa célula se mobilizou para distribuir cestas básicas e roupas para famílias carentes do bairro. Ver o sorriso das crianças e a gratidão das mães foi o maior presente que poderíamos receber. Jesus nos ensina a amar através de ações!',
        categoria: 'acao-social',
        likes: 63
      },
      {
        autor: 'Ana Costa',
        celula: 'Célula Família Abençoada',
        titulo: 'Cura Milagrosa na Oração',
        descricao: 'Durante nossa reunião de oração, nossa irmã Carla foi completamente curada de uma dor nas costas que a incomodava há meses. Deus ainda faz milagres! Que testemunho poderoso para toda nossa célula. Aleluia!',
        categoria: 'milagre',
        likes: 89
      }
    ]

    for (const exp of experiencias) {
      await prisma.experiencia.create({
        data: exp
      })
    }

    console.log('✅ Experiências criadas com sucesso!')

  } catch (error) {
    console.error('❌ Erro ao criar experiências:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })