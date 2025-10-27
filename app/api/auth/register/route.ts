import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { nome, email, nomeIgreja } = await request.json()

    if (!nome || !email || !nomeIgreja) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    // Simular cadastro bem-sucedido
    return NextResponse.json({
      user: {
        id: Date.now().toString(),
        nome,
        email,
        tipo: 'admin',
        igreja: { nome: nomeIgreja }
      }
    })

  } catch (error) {
    console.error('Erro no cadastro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}