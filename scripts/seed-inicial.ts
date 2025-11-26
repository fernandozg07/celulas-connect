import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  try {
    // Limpar dados existentes
    await prisma.avaliacao.deleteMany()
    await prisma.escalaMembro.deleteMany()
    await prisma.escala.deleteMany()
    await prisma.membroEquipe.deleteMany()
    await prisma.equipe.deleteMany()
    await prisma.frequencia.deleteMany()
    await prisma.membro.deleteMany()
    await prisma.celula.deleteMany()
    await prisma.usuario.deleteMany()
    await prisma.igreja.deleteMany()

    console.log('🗑️ Dados existentes removidos')

    // Criar igreja de exemplo
    const igreja = await prisma.igreja.create({
      data: {
        nome: 'Igreja Batista Central',
        pastor: 'Pastor João Silva',
        email: 'admin@igrejabatistacentral.com.br',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
        cidade: 'São Paulo',
        estado: 'SP'
      }
    })

    console.log('⛪ Igreja criada:', igreja.nome)

    // Criar usuário administrador
    const senhaHash = await bcrypt.hash('123456', 10)
    const admin = await prisma.usuario.create({
      data: {
        nome: 'Administrador Sistema',
        email: 'admin@igrejabatistacentral.com.br',
        senha: senhaHash,
        tipo: 'admin',
        cpf: '123.456.789-00',
        rg: '12.345.678-9',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
        cidade: 'São Paulo',
        estado: 'SP',
        igrejaId: igreja.id
      }
    })

    console.log('👤 Usuário admin criado:', admin.email)

    // Criar células de exemplo
    const celulas = await Promise.all([
      prisma.celula.create({
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
          avaliacao: 4.8,
          igrejaId: igreja.id,
          liderUserId: admin.id
        }
      }),
      prisma.celula.create({
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
          avaliacao: 4.9,
          igrejaId: igreja.id,
          liderUserId: admin.id
        }
      }),
      prisma.celula.create({
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
          avaliacao: 4.7,
          igrejaId: igreja.id,
          liderUserId: admin.id
        }
      })
    ])

    console.log('🏠 Células criadas:', celulas.length)

    // Criar membros de exemplo
    const membros = []
    for (const celula of celulas) {
      for (let i = 1; i <= 5; i++) {
        const membro = await prisma.membro.create({
          data: {
            nome: `Membro ${i} - ${celula.nome}`,
            telefone: `1199999${i}${celula.id.slice(-3)}`,
            email: `membro${i}.${celula.id}@email.com`,
            celulaId: celula.id
          }
        })
        membros.push(membro)
      }
    }

    console.log('👥 Membros criados:', membros.length)

    // Criar algumas avaliações
    for (const celula of celulas) {
      await prisma.avaliacao.create({
        data: {
          celulaId: celula.id,
          nome: 'Maria Santos',
          nota: 5,
          comentario: 'Excelente célula! Muito acolhedora e edificante.',
          aprovada: true
        }
      })
    }

    console.log('⭐ Avaliações criadas')

    console.log('✅ Seed concluído com sucesso!')
    console.log('📧 Email de login: admin@igrejabatistacentral.com.br')
    console.log('🔑 Senha: 123456')

  } catch (error) {
    console.error('❌ Erro durante o seed:', error)
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