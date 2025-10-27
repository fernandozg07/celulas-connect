import { NextRequest, NextResponse } from 'next/server'

// Células hardcoded
const celulas = [
  {
    id: '1',
    nome: 'Célula Esperança',
    lider: 'Carlos Oliveira',
    whatsapp: '11999999999',
    dia: 'Terça-feira',
    horario: '19:30',
    descricao: 'Uma célula acolhedora focada no crescimento espiritual e comunhão fraternal.',
    faixaEtaria: 'adultos',
    endereco: 'Rua das Palmeiras, 789',
    bairro: 'Vila Madalena',
    cidade: 'São Paulo',
    avaliacao: 4.8,
    ativa: true,
    igreja: { nome: 'Igreja Batista Central' }
  },
  {
    id: '2',
    nome: 'Célula Jovens Unidos',
    lider: 'Ana Costa',
    whatsapp: '11888888888',
    dia: 'Quinta-feira',
    horario: '20:00',
    descricao: 'Célula dinâmica para jovens de 18 a 30 anos com foco em crescimento e propósito.',
    faixaEtaria: 'jovens',
    endereco: 'Rua dos Pinheiros, 456',
    bairro: 'Pinheiros',
    cidade: 'São Paulo',
    avaliacao: 4.9,
    ativa: true,
    igreja: { nome: 'Igreja Metodista São Paulo' }
  },
  {
    id: '3',
    nome: 'Célula Família Abençoada',
    lider: 'João Silva',
    whatsapp: '11777777777',
    dia: 'Sábado',
    horario: '15:00',
    descricao: 'Célula para famílias com crianças, focada no fortalecimento dos laços familiares.',
    faixaEtaria: 'todas',
    endereco: 'Av. Rebouças, 321',
    bairro: 'Jardins',
    cidade: 'São Paulo',
    avaliacao: 4.7,
    ativa: true,
    igreja: { nome: 'Igreja Batista Central' }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dia = searchParams.get('dia')
    const faixaEtaria = searchParams.get('faixaEtaria')
    const bairro = searchParams.get('bairro')

    let celulasFiltradas = celulas.filter(c => c.ativa)

    if (dia) {
      celulasFiltradas = celulasFiltradas.filter(c => 
        c.dia.toLowerCase().includes(dia.toLowerCase())
      )
    }

    if (faixaEtaria && faixaEtaria !== 'todas') {
      celulasFiltradas = celulasFiltradas.filter(c => c.faixaEtaria === faixaEtaria)
    }

    if (bairro) {
      celulasFiltradas = celulasFiltradas.filter(c => 
        c.bairro.toLowerCase().includes(bairro.toLowerCase())
      )
    }

    return NextResponse.json(celulasFiltradas)

  } catch (error) {
    console.error('Erro ao buscar células:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}