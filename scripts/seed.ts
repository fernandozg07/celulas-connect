import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.escalaMembro.deleteMany()
  await prisma.escala.deleteMany()
  await prisma.membroEquipe.deleteMany()
  await prisma.equipe.deleteMany()
  await prisma.frequencia.deleteMany()
  await prisma.membro.deleteMany()
  await prisma.avaliacao.deleteMany()
  await prisma.celula.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.igreja.deleteMany()

  // Criar igrejas
  const igreja1 = await prisma.igreja.create({
    data: {
      nome: 'Igreja Batista Central',
      pastor: 'Pastor João Silva',
      email: 'contato@ibcentral.com.br',
      telefone: '(11) 3333-4444',
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP'
    }
  })

  const igreja2 = await prisma.igreja.create({
    data: {
      nome: 'Igreja Metodista São Paulo',
      pastor: 'Pastora Maria Santos',
      email: 'contato@metodista.com.br',
      telefone: '(11) 5555-6666',
      endereco: 'Av. Paulista, 456',
      cidade: 'São Paulo',
      estado: 'SP'
    }
  })

  // Criar usuários (líderes)
  const senhaHash = await bcrypt.hash('123456', 10)

  const admin1 = await prisma.usuario.create({
    data: {
      nome: 'João Silva',
      email: 'joao@ibcentral.com.br',
      senha: senhaHash,
      tipo: 'admin',
      igrejaId: igreja1.id
    }
  })

  const lider1 = await prisma.usuario.create({
    data: {
      nome: 'Carlos Oliveira',
      email: 'carlos@ibcentral.com.br',
      senha: senhaHash,
      tipo: 'lider',
      igrejaId: igreja1.id
    }
  })

  const admin2 = await prisma.usuario.create({
    data: {
      nome: 'Maria Santos',
      email: 'maria@metodista.com.br',
      senha: senhaHash,
      tipo: 'admin',
      igrejaId: igreja2.id
    }
  })

  const lider2 = await prisma.usuario.create({
    data: {
      nome: 'Ana Costa',
      email: 'ana@metodista.com.br',
      senha: senhaHash,
      tipo: 'lider',
      igrejaId: igreja2.id
    }
  })

  // Criar células
  const celula1 = await prisma.celula.create({
    data: {
      nome: 'Célula Esperança',
      lider: 'Carlos Oliveira',
      whatsapp: '11999999999',
      dia: 'Terça-feira',
      horario: '19:30',
      descricao: 'Uma célula acolhedora focada no crescimento espiritual e comunhão fraternal.',
      faixaEtaria: 'adultos',
      endereco: 'Rua das Palmeiras, 789',
      bairro: 'Vila Madalena',
      cidade: 'São Paulo',
      latitude: -23.5505,
      longitude: -46.6333,
      avaliacao: 4.8,
      igrejaId: igreja1.id,
      liderUserId: lider1.id
    }
  })

  const celula2 = await prisma.celula.create({
    data: {
      nome: 'Célula Jovens Unidos',
      lider: 'Ana Costa',
      whatsapp: '11888888888',
      dia: 'Quinta-feira',
      horario: '20:00',
      descricao: 'Célula dinâmica para jovens de 18 a 30 anos com foco em crescimento e propósito.',
      faixaEtaria: 'jovens',
      endereco: 'Rua dos Pinheiros, 456',
      bairro: 'Pinheiros',
      cidade: 'São Paulo',
      latitude: -23.5629,
      longitude: -46.7006,
      avaliacao: 4.9,
      igrejaId: igreja2.id,
      liderUserId: lider2.id
    }
  })

  const celula3 = await prisma.celula.create({
    data: {
      nome: 'Célula Família Abençoada',
      lider: 'João Silva',
      whatsapp: '11777777777',
      dia: 'Sábado',
      horario: '15:00',
      descricao: 'Célula para famílias com crianças, focada no fortalecimento dos laços familiares.',
      faixaEtaria: 'todas',
      endereco: 'Av. Rebouças, 321',
      bairro: 'Jardins',
      cidade: 'São Paulo',
      latitude: -23.5618,
      longitude: -46.6729,
      avaliacao: 4.7,
      igrejaId: igreja1.id,
      liderUserId: admin1.id
    }
  })

  // Criar membros
  const membros1 = await Promise.all([
    prisma.membro.create({
      data: {
        nome: 'Pedro Santos',
        telefone: '11966666666',
        email: 'pedro@email.com',
        celulaId: celula1.id
      }
    }),
    prisma.membro.create({
      data: {
        nome: 'Mariana Silva',
        telefone: '11955555555',
        email: 'mariana@email.com',
        celulaId: celula1.id
      }
    }),
    prisma.membro.create({
      data: {
        nome: 'Roberto Lima',
        telefone: '11944444444',
        email: 'roberto@email.com',
        celulaId: celula1.id
      }
    })
  ])

  const membros2 = await Promise.all([
    prisma.membro.create({
      data: {
        nome: 'Juliana Costa',
        telefone: '11933333333',
        email: 'juliana@email.com',
        celulaId: celula2.id
      }
    }),
    prisma.membro.create({
      data: {
        nome: 'Felipe Rodrigues',
        telefone: '11922222222',
        email: 'felipe@email.com',
        celulaId: celula2.id
      }
    })
  ])

  // Criar equipes
  const equipe1 = await prisma.equipe.create({
    data: {
      nome: 'Louvor',
      descricao: 'Equipe responsável pelo louvor e adoração',
      celulaId: celula1.id
    }
  })

  const equipe2 = await prisma.equipe.create({
    data: {
      nome: 'Recepção',
      descricao: 'Equipe de recepção e acolhimento',
      celulaId: celula1.id
    }
  })

  // Criar membros das equipes
  await prisma.membroEquipe.create({
    data: {
      membroId: membros1[0].id,
      equipeId: equipe1.id,
      funcao: 'Vocalista'
    }
  })

  await prisma.membroEquipe.create({
    data: {
      membroId: membros1[1].id,
      equipeId: equipe2.id,
      funcao: 'Recepcionista'
    }
  })

  // Criar frequências (últimas 4 semanas)
  const hoje = new Date()
  for (let i = 0; i < 4; i++) {
    const dataReuniao = new Date(hoje)
    dataReuniao.setDate(hoje.getDate() - (i * 7))
    
    // Frequência da Célula 1
    for (const membro of membros1) {
      await prisma.frequencia.create({
        data: {
          membroId: membro.id,
          celulaId: celula1.id,
          data: dataReuniao,
          presente: Math.random() > 0.2 // 80% de presença
        }
      })
    }

    // Frequência da Célula 2
    for (const membro of membros2) {
      await prisma.frequencia.create({
        data: {
          membroId: membro.id,
          celulaId: celula2.id,
          data: dataReuniao,
          presente: Math.random() > 0.15 // 85% de presença
        }
      })
    }
  }

  console.log('✅ Seed concluído com sucesso!')
  console.log('\n📋 Contas de teste criadas:')
  console.log('\n🏛️ Igreja Batista Central:')
  console.log('   Admin: joao@ibcentral.com.br | Senha: 123456')
  console.log('   Líder: carlos@ibcentral.com.br | Senha: 123456')
  console.log('\n🏛️ Igreja Metodista São Paulo:')
  console.log('   Admin: maria@metodista.com.br | Senha: 123456')
  console.log('   Líder: ana@metodista.com.br | Senha: 123456')
  console.log('\n🔑 Todas as senhas são: 123456')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })