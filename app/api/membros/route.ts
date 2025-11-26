import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const celulaId = searchParams.get('celulaId')
    const userId = searchParams.get('userId')

    if (!celulaId || !userId) {
      return NextResponse.json(
        { error: 'ID da célula e do usuário são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se o usuário tem acesso à célula
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId }
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const celula = await prisma.celula.findFirst({
      where: {
        id: celulaId,
        igrejaId: usuario.igrejaId
      }
    })

    if (!celula) {
      return NextResponse.json(
        { error: 'Célula não encontrada' },
        { status: 404 }
      )
    }

    const membros = await prisma.membro.findMany({
      where: {
        celulaId
      },
      orderBy: {
        nome: 'asc'
      }
    })

    return NextResponse.json(membros)

  } catch (error) {
    console.error('Erro ao buscar membros:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { celulaId, userId, nome, telefone, email } = data

    if (!celulaId || !userId || !nome) {
      return NextResponse.json(
        { error: 'Célula, usuário e nome são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se o usuário tem acesso à célula
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId }
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const celula = await prisma.celula.findFirst({
      where: {
        id: celulaId,
        igrejaId: usuario.igrejaId
      }
    })

    if (!celula) {
      return NextResponse.json(
        { error: 'Célula não encontrada' },
        { status: 404 }
      )
    }

    const novoMembro = await prisma.membro.create({
      data: {
        nome,
        telefone,
        email,
        celulaId
      }
    })

    return NextResponse.json(novoMembro)

  } catch (error) {
    console.error('Erro ao criar membro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}