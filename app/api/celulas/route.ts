import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dia = searchParams.get('dia')
    const faixaEtaria = searchParams.get('faixaEtaria')
    const bairro = searchParams.get('bairro')

    const where: any = {
      ativa: true
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
        }
      },
      orderBy: {
        avaliacao: 'desc'
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