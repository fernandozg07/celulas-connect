import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Testar conexão com o banco
    const igrejas = await prisma.igreja.count()
    const usuarios = await prisma.usuario.count()
    const celulas = await prisma.celula.count()
    const membros = await prisma.membro.count()

    return NextResponse.json({
      status: 'success',
      message: 'Conexão com banco estabelecida',
      data: {
        igrejas,
        usuarios,
        celulas,
        membros
      }
    })

  } catch (error) {
    console.error('Erro na conexão:', error)
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Erro ao conectar com o banco',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}