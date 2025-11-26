import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const experiencias = await prisma.experiencia.findMany({
      where: {
        aprovada: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(experiencias)

  } catch (error) {
    console.error('Erro ao buscar experiências:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { autor, celula, titulo, descricao, foto, categoria } = data

    if (!autor || !celula || !titulo || !descricao || !categoria) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    const novaExperiencia = await prisma.experiencia.create({
      data: {
        autor,
        celula,
        titulo,
        descricao,
        foto: foto || null,
        categoria
      }
    })

    return NextResponse.json(novaExperiencia)

  } catch (error) {
    console.error('Erro ao criar experiência:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, likes } = data

    if (!id) {
      return NextResponse.json(
        { error: 'ID da experiência é obrigatório' },
        { status: 400 }
      )
    }

    const experienciaAtualizada = await prisma.experiencia.update({
      where: { id },
      data: {
        likes: likes || { increment: 1 }
      }
    })

    return NextResponse.json(experienciaAtualizada)

  } catch (error) {
    console.error('Erro ao atualizar experiência:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}