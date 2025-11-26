import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      )
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      include: { igreja: true }
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const celulas = await prisma.celula.findMany({
      where: {
        igrejaId: usuario.igrejaId
      },
      include: {
        _count: {
          select: {
            membros: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const celulasFormatadas = celulas.map(celula => ({
      ...celula,
      membros: celula._count.membros
    }))

    return NextResponse.json(celulasFormatadas)

  } catch (error) {
    console.error('Erro ao buscar células:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { userId, ...celulaData } = data

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      )
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: userId }
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const novaCelula = await prisma.celula.create({
      data: {
        ...celulaData,
        cidade: celulaData.cidade || 'São Paulo',
        igrejaId: usuario.igrejaId,
        liderUserId: userId
      },
      include: {
        _count: {
          select: {
            membros: true
          }
        }
      }
    })

    return NextResponse.json({
      ...novaCelula,
      membros: novaCelula._count.membros
    })

  } catch (error) {
    console.error('Erro ao criar célula:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, userId, ...celulaData } = data

    if (!id || !userId) {
      return NextResponse.json(
        { error: 'ID da célula e do usuário são obrigatórios' },
        { status: 400 }
      )
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: userId }
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const celulaAtualizada = await prisma.celula.update({
      where: {
        id,
        igrejaId: usuario.igrejaId
      },
      data: celulaData,
      include: {
        _count: {
          select: {
            membros: true
          }
        }
      }
    })

    return NextResponse.json({
      ...celulaAtualizada,
      membros: celulaAtualizada._count.membros
    })

  } catch (error) {
    console.error('Erro ao atualizar célula:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}