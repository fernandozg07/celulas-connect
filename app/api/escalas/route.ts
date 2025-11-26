import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get('tipo')
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

    if (tipo === 'equipes') {
      const equipes = await prisma.equipe.findMany({
        where: {
          celula: {
            igrejaId: usuario.igrejaId
          }
        },
        include: {
          celula: true
        }
      })
      return NextResponse.json(equipes)
    }

    if (tipo === 'membros') {
      const membros = await prisma.membro.findMany({
        where: {
          celula: {
            igrejaId: usuario.igrejaId
          },
          ativo: true
        },
        include: {
          celula: true,
          membrosEquipes: {
            include: {
              equipe: true
            }
          }
        }
      })
      return NextResponse.json(membros)
    }

    // Buscar escalas
    const escalas = await prisma.escala.findMany({
      where: {
        celula: {
          igrejaId: usuario.igrejaId
        }
      },
      include: {
        celula: true,
        escalaMembros: {
          include: {
            membro: true,
            equipe: true
          }
        }
      },
      orderBy: {
        data: 'desc'
      }
    })

    const escalasFormatadas = escalas.map(escala => ({
      id: escala.id,
      data: escala.data.toISOString().split('T')[0],
      celulaId: escala.celulaId,
      celulaNome: escala.celula.nome,
      observacoes: escala.observacoes,
      itens: escala.escalaMembros.map(item => ({
        membroId: item.membroId,
        membroNome: item.membro.nome,
        equipeId: item.equipeId,
        equipeNome: item.equipe.nome,
        funcao: item.funcao
      }))
    }))

    return NextResponse.json(escalasFormatadas)

  } catch (error) {
    console.error('Erro ao buscar dados:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { userId, celulaId, data: dataEscala, observacoes, itens } = data

    if (!userId || !celulaId || !dataEscala) {
      return NextResponse.json(
        { error: 'Usuário, célula e data são obrigatórios' },
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

    // Criar escala
    const novaEscala = await prisma.escala.create({
      data: {
        celulaId,
        data: new Date(dataEscala),
        observacoes: observacoes || null
      }
    })

    // Criar itens da escala
    if (itens && itens.length > 0) {
      for (const item of itens) {
        await prisma.escalaMembro.create({
          data: {
            escalaId: novaEscala.id,
            membroId: item.membroId,
            equipeId: item.equipeId,
            funcao: item.funcao
          }
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Escala criada com sucesso!',
      data: novaEscala
    })

  } catch (error) {
    console.error('Erro ao criar escala:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const userId = searchParams.get('userId')

    if (!id || !userId) {
      return NextResponse.json(
        { error: 'ID da escala e usuário são obrigatórios' },
        { status: 400 }
      )
    }

    // Deletar itens da escala primeiro
    await prisma.escalaMembro.deleteMany({
      where: { escalaId: id }
    })

    // Deletar escala
    await prisma.escala.delete({
      where: { id }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Escala excluída com sucesso!' 
    })

  } catch (error) {
    console.error('Erro ao excluir escala:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}