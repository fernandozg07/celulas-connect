import { NextRequest, NextResponse } from 'next/server'

let celulasGerenciar = [
  {
    id: '1',
    nome: 'Célula Esperança',
    lider: 'Carlos Oliveira',
    whatsapp: '11999999999',
    dia: 'Terça-feira',
    horario: '19:30',
    descricao: 'Uma célula acolhedora focada no crescimento espiritual',
    faixaEtaria: 'adultos',
    endereco: 'Rua das Flores, 123',
    bairro: 'Vila Madalena',
    membros: 15
  },
  {
    id: '2',
    nome: 'Célula Jovens Unidos',
    lider: 'Ana Costa',
    whatsapp: '11888888888',
    dia: 'Quinta-feira',
    horario: '20:00',
    descricao: 'Célula dinâmica para jovens de 18 a 30 anos',
    faixaEtaria: 'jovens',
    endereco: 'Av. Paulista, 456',
    bairro: 'Pinheiros',
    membros: 12
  }
]

export async function GET() {
  return NextResponse.json(celulasGerenciar)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const novaCelula = {
    id: Date.now().toString(),
    ...data,
    membros: 0
  }
  celulasGerenciar.push(novaCelula)
  return NextResponse.json(novaCelula)
}