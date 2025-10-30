import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json()

    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário no banco
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: { igreja: true }
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    
    if (!senhaValida) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Verificar se usuário está ativo
    if (!usuario.ativo) {
      return NextResponse.json(
        { error: 'Usuário inativo. Contate o administrador.' },
        { status: 403 }
      )
    }

    // Remover senha do retorno
    const { senha: _, ...usuarioSemSenha } = usuario

    return NextResponse.json({
      user: usuarioSemSenha
    })

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}