import { NextRequest, NextResponse } from 'next/server'

// Usuários hardcoded para funcionar na Vercel
const usuarios = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@ibcentral.com.br',
    senha: '123456',
    tipo: 'admin',
    igreja: { nome: 'Igreja Batista Central' }
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@metodista.com.br',
    senha: '123456',
    tipo: 'admin',
    igreja: { nome: 'Igreja Metodista São Paulo' }
  },
  {
    id: '3',
    nome: 'Carlos Oliveira',
    email: 'carlos@ibcentral.com.br',
    senha: '123456',
    tipo: 'lider',
    igreja: { nome: 'Igreja Batista Central' }
  },
  {
    id: '4',
    nome: 'Ana Costa',
    email: 'ana@metodista.com.br',
    senha: '123456',
    tipo: 'lider',
    igreja: { nome: 'Igreja Metodista São Paulo' }
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json()

    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    const usuario = usuarios.find(u => u.email === email && u.senha === senha)

    if (!usuario) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
        igreja: usuario.igreja
      }
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}