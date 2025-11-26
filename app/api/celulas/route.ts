import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dia = searchParams.get('dia')
    const faixaEtaria = searchParams.get('faixaEtaria')
    const bairro = searchParams.get('bairro')
    const cidade = searchParams.get('cidade') || 'São Paulo'

    const where: any = {
      ativa: true,
      cidade: {
        contains: cidade,
        mode: 'insensitive'
      }
    }

    if (dia) {
      where.dia = {
        contains: dia,
        mode: 'insensitive'
      }
    }

    if (faixaEtaria && faixaEtaria !== 'todas') {
      where.faixaEtaria = faixaEtaria
    }

    if (bairro) {
      where.bairro = {
        contains: bairro,
        mode: 'insensitive'
      }
    }

    const celulas = await prisma.celula.findMany({
      where,
      include: {
        igreja: {
          select: {
            nome: true
          }
        },
        _count: {
          select: {
            membros: true
          }
        }
      },
      orderBy: {
        avaliacao: 'desc'
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