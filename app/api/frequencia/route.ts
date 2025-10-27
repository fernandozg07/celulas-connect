import { NextRequest, NextResponse } from 'next/server'

const celulasFrequencia = [
  {
    id: '1',
    nome: 'Célula Esperança',
    membros: [
      { id: '1', nome: 'Ana Silva', telefone: '11999999999' },
      { id: '2', nome: 'Carlos Santos', telefone: '11888888888' },
      { id: '3', nome: 'Maria Oliveira', telefone: '11777777777' },
      { id: '4', nome: 'João Costa', telefone: '11666666666' },
      { id: '5', nome: 'Paula Lima', telefone: '11555555555' }
    ]
  },
  {
    id: '2',
    nome: 'Célula Jovens Unidos',
    membros: [
      { id: '6', nome: 'Pedro Alves', telefone: '11444444444' },
      { id: '7', nome: 'Lucia Ferreira', telefone: '11333333333' },
      { id: '8', nome: 'Rafael Souza', telefone: '11222222222' },
      { id: '9', nome: 'Camila Rocha', telefone: '11111111111' }
    ]
  }
]

let frequenciasSalvas: any[] = []

export async function GET() {
  return NextResponse.json(celulasFrequencia)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const novaFrequencia = {
    id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString()
  }
  frequenciasSalvas.push(novaFrequencia)
  return NextResponse.json({ success: true, data: novaFrequencia })
}