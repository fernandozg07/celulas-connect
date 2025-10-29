import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const celulaId = searchParams.get('celulaId')

    if (!celulaId) {
      return NextResponse.json({ error: 'ID da célula é obrigatório' }, { status: 400 })
    }

    const avaliacoes = await prisma.avaliacao.findMany({
      where: { celulaId },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    return NextResponse.json(avaliacoes)
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { celulaId, nome, nota, comentario, foto } = await request.json()

    if (!celulaId || !nome || !nota) {
      return NextResponse.json(
        { error: 'Célula, nome e nota são obrigatórios' },
        { status: 400 }
      )
    }

    if (nota < 1 || nota > 5) {
      return NextResponse.json(
        { error: 'Nota deve ser entre 1 e 5' },
        { status: 400 }
      )
    }

    const avaliacao = await prisma.avaliacao.create({
      data: {
        celulaId,
        nome,
        nota,
        comentario: comentario || '',
        foto: foto || null
      }
    })

    // Atualizar média da célula
    const avaliacoes = await prisma.avaliacao.findMany({
      where: { celulaId }
    })
    
    const media = avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length

    await prisma.celula.update({
      where: { id: celulaId },
      data: { avaliacao: media }
    })

    return NextResponse.json(avaliacao)
  } catch (error) {
    console.error('Erro ao criar avaliação:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}