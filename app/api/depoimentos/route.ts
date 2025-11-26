import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const depoimentos = await prisma.depoimento.findMany({
      where: {
        aprovado: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(depoimentos)

  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { nome, cargo, igreja, depoimento, tipo, videoUrl, foto, avaliacao } = data

    if (!nome || !cargo || !igreja || !depoimento || !tipo) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    const novoDepoimento = await prisma.depoimento.create({
      data: {
        nome,
        cargo,
        igreja,
        depoimento,
        tipo,
        videoUrl: videoUrl || null,
        foto: foto || null,
        avaliacao: avaliacao || 5
      }
    })

    return NextResponse.json(novoDepoimento)

  } catch (error) {
    console.error('Erro ao criar depoimento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}