import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const stats = {
    totalCelulas: 3,
    totalMembros: 45,
    proximasEscalas: 2,
    frequenciaMedia: 85,
    proximasReunioes: [
      {
        id: '1',
        nome: 'Célula Esperança',
        dia: 'Terça-feira',
        horario: '19:30',
        status: 'Hoje'
      },
      {
        id: '2',
        nome: 'Célula Jovens Unidos',
        dia: 'Quinta-feira',
        horario: '20:00',
        status: 'Em 2 dias'
      }
    ]
  }

  return NextResponse.json(stats)
}