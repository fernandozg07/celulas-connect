import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Executar o push do schema
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Igreja" (
        "id" TEXT NOT NULL,
        "nome" TEXT NOT NULL,
        "pastor" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "telefone" TEXT NOT NULL,
        "endereco" TEXT NOT NULL,
        "cidade" TEXT NOT NULL,
        "estado" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Igreja_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Igreja_email_key" UNIQUE ("email")
      );
    `

    return NextResponse.json({
      success: true,
      message: 'Tabelas criadas com sucesso!'
    })

  } catch (error: any) {
    console.error('Erro ao criar tabelas:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}