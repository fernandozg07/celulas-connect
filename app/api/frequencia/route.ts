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
      where: { id: userId }
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
        membros: {
          where: {
            ativo: true
          },
          orderBy: {
            nome: 'asc'
          }
        }
      }
    })

    return NextResponse.json(celulas)

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
    const { userId, celulaId, data: dataReuniao, membros } = data

    if (!userId || !celulaId || !dataReuniao || !membros) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
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

    // Verificar se célula pertence à igreja do usuário
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

    // Salvar frequências
    const frequencias = []
    for (const membro of membros) {
      const frequencia = await prisma.frequencia.create({
        data: {
          membroId: membro.id,
          celulaId,
          data: new Date(dataReuniao),
          presente: membro.presente
        }
      })
      frequencias.push(frequencia)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Frequência salva com sucesso!',
      data: frequencias 
    })

  } catch (error) {
    console.error('Erro ao salvar frequência:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}