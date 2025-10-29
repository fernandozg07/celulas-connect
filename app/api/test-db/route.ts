import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Teste 1: Conexão básica
    await prisma.$connect()
    
    // Teste 2: Contar registros
    const igrejas = await prisma.igreja.count()
    const usuarios = await prisma.usuario.count()
    const celulas = await prisma.celula.count()
    const membros = await prisma.membro.count()
    
    // Teste 3: Buscar dados
    const primeiraIgreja = await prisma.igreja.findFirst()
    const primeiraCelula = await prisma.celula.findFirst()
    
    return NextResponse.json({
      status: 'success',
      message: 'Banco conectado com sucesso!',
      environment: process.env.NODE_ENV,
      database: process.env.DATABASE_URL?.includes('supabase') ? 'Supabase PostgreSQL' : 'Outro',
      counts: {
        igrejas,
        usuarios,
        celulas,
        membros
      },
      samples: {
        igreja: primeiraIgreja?.nome || 'Nenhuma',
        celula: primeiraCelula?.nome || 'Nenhuma'
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Erro na conexão com banco',
      error: error.message,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}