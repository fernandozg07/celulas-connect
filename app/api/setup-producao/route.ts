import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    // Verificar se já existe dados
    const igrejaExistente = await prisma.igreja.findFirst()
    if (igrejaExistente) {
      return NextResponse.json({
        message: 'Banco já possui dados',
        status: 'already_setup'
      })
    }

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

    // Criar células de exemplo
    const celulas = await Promise.all([
      prisma.celula.create({
        data: {
          nome: 'Célula Esperança',
          lider: 'Carlos Oliveira',
          whatsapp: '11999999999',
          dia: 'Terça-feira',
          horario: '19:30',
          descricao: 'Uma célula acolhedora focada no crescimento espiritual.',
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
          descricao: 'Célula dinâmica para jovens de 18 a 30 anos.',
          faixaEtaria: 'jovens',
          endereco: 'Rua dos Pinheiros, 456',
          bairro: 'Pinheiros',
          cidade: 'São Paulo',
          avaliacao: 4.9,
          igrejaId: igreja.id,
          liderUserId: admin.id
        }
      })
    ])

    // Criar membros
    for (const celula of celulas) {
      for (let i = 1; i <= 5; i++) {
        await prisma.membro.create({
          data: {
            nome: `Membro ${i} - ${celula.nome}`,
            telefone: `1199999${i}${celula.id.slice(-3)}`,
            email: `membro${i}.${celula.id}@email.com`,
            celulaId: celula.id
          }
        })
      }
    }

    // Criar experiências de exemplo
    const experiencias = [
      {
        autor: 'Maria Santos',
        celula: 'Célula Esperança',
        titulo: 'Batismo na Praia - Momento Inesquecível!',
        descricao: 'Que alegria imensa ver 3 irmãos sendo batizados hoje! Foi um momento de muita emoção e presença de Deus.',
        categoria: 'batismo',
        likes: 47
      },
      {
        autor: 'João Silva',
        celula: 'Célula Jovens Unidos',
        titulo: 'Ação Social no Bairro - Amor em Prática',
        descricao: 'Nossa célula se mobilizou para distribuir cestas básicas e roupas para famílias carentes do bairro.',
        categoria: 'acao-social',
        likes: 63
      }
    ]

    for (const exp of experiencias) {
      await prisma.experiencia.create({
        data: exp
      })
    }

    // Criar depoimentos de exemplo
    const depoimentos = [
      {
        nome: 'Pastor Roberto Silva',
        cargo: 'Pastor Presidente',
        igreja: 'Igreja Batista Esperança',
        depoimento: 'O CélulasConnect revolucionou nossa igreja! Em 6 meses, conseguimos organizar melhor nossas 15 células.',
        tipo: 'texto',
        avaliacao: 5
      },
      {
        nome: 'Carlos Oliveira',
        cargo: 'Líder de Célula',
        igreja: 'Igreja Assembleia de Deus',
        depoimento: 'Minha célula cresceu de 8 para 18 pessoas em 4 meses. Glória a Deus!',
        tipo: 'texto',
        avaliacao: 5
      }
    ]

    for (const dep of depoimentos) {
      await prisma.depoimento.create({
        data: dep
      })
    }

    return NextResponse.json({
      message: 'Banco configurado com sucesso!',
      status: 'success',
      data: {
        igrejas: 1,
        usuarios: 1,
        celulas: celulas.length,
        membros: celulas.length * 5,
        experiencias: experiencias.length,
        depoimentos: depoimentos.length
      },
      credentials: {
        email: 'admin@igrejabatistacentral.com.br',
        senha: '123456'
      }
    })

  } catch (error) {
    console.error('Erro ao configurar banco:', error)
    return NextResponse.json(
      { error: 'Erro ao configurar banco' },
      { status: 500 }
    )
  }
}