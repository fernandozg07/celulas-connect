import { NextRequest, NextResponse } from 'next/server'

const equipes = [
  {
    id: '1',
    nome: 'Louvor',
    funcoes: ['Vocal', 'Violão', 'Teclado', 'Bateria']
  },
  {
    id: '2',
    nome: 'Mídia',
    funcoes: ['Som', 'Projeção', 'Transmissão']
  },
  {
    id: '3',
    nome: 'Recepção',
    funcoes: ['Porteiro', 'Café', 'Limpeza']
  }
]

const membros = [
  { id: '1', nome: 'Ana Silva', equipes: ['1', '3'] },
  { id: '2', nome: 'Carlos Santos', equipes: ['1'] },
  { id: '3', nome: 'Maria Oliveira', equipes: ['2'] },
  { id: '4', nome: 'João Costa', equipes: ['2', '3'] },
  { id: '5', nome: 'Paula Lima', equipes: ['1', '2'] }
]

let escalas = [
  {
    id: '1',
    data: '2024-01-15',
    celulaId: '1',
    celulaNome: 'Célula Esperança',
    observacoes: 'Reunião especial de oração',
    itens: [
      {
        membroId: '1',
        membroNome: 'Ana Silva',
        equipeId: '1',
        equipeNome: 'Louvor',
        funcao: 'Vocal'
      },
      {
        membroId: '2',
        membroNome: 'Carlos Santos',
        equipeId: '1',
        equipeNome: 'Louvor',
        funcao: 'Violão'
      }
    ]
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tipo = searchParams.get('tipo')
  
  if (tipo === 'equipes') {
    return NextResponse.json(equipes)
  }
  
  if (tipo === 'membros') {
    return NextResponse.json(membros)
  }
  
  return NextResponse.json(escalas)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const novaEscala = {
    id: Date.now().toString(),
    ...data,
    celulaNome: 'Célula Esperança'
  }
  escalas.push(novaEscala)
  return NextResponse.json(novaEscala)
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  escalas = escalas.filter(e => e.id !== id)
  return NextResponse.json({ success: true })
}