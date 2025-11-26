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

    return NextResponse.json({
      message: 'Banco configurado com sucesso!',
      status: 'success',
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