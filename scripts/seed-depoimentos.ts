import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Criando depoimentos iniciais...')

  try {
    const depoimentos = [
      {
        nome: 'Pastor Roberto Silva',
        cargo: 'Pastor Presidente',
        igreja: 'Igreja Batista Esperança',
        depoimento: 'O CélulasConnect revolucionou nossa igreja! Em 6 meses, conseguimos organizar melhor nossas 15 células, aumentar a frequência em 40% e formar 8 novos líderes. A plataforma é intuitiva e realmente focada no crescimento espiritual.',
        tipo: 'texto',
        avaliacao: 5
      },
      {
        nome: 'Pastora Maria Santos',
        cargo: 'Pastora de Células',
        igreja: 'Igreja Metodista Central',
        depoimento: 'Como pastora responsável pelas células, posso afirmar que esta plataforma trouxe uma organização que nunca tivemos antes. O sistema de frequência e escalas criaram uma conexão real entre nossas 23 células.',
        tipo: 'video',
        videoUrl: 'https://example.com/video1',
        avaliacao: 5
      },
      {
        nome: 'Carlos Oliveira',
        cargo: 'Líder de Célula',
        igreja: 'Igreja Assembleia de Deus',
        depoimento: 'Sou líder há 3 anos e nunca tive ferramentas tão práticas! Minha célula cresceu de 8 para 18 pessoas em 4 meses. Glória a Deus!',
        tipo: 'texto',
        avaliacao: 5
      }
    ]

    for (const dep of depoimentos) {
      await prisma.depoimento.create({
        data: dep
      })
    }

    console.log('✅ Depoimentos criados com sucesso!')

  } catch (error) {
    console.error('❌ Erro ao criar depoimentos:', error)
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