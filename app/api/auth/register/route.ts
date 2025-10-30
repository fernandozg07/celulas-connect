import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { 
      nome, email, senha, cpf, rg, telefone, endereco, cidade, estado,
      nomeIgreja, pastor, comprovanteResidencia 
    } = await request.json()

    // Validações obrigatórias
    if (!nome || !email || !senha || !cpf || !rg || !telefone || !endereco || !cidade || !estado || !nomeIgreja || !pastor) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    // Verificar se email já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    })

    if (usuarioExistente) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Criar igreja
    const igreja = await prisma.igreja.create({
      data: {
        nome: nomeIgreja,
        pastor,
        email,
        telefone,
        endereco,
        cidade,
        estado
      }
    })

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10)

    // Criar usuário
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        tipo: 'admin',
        cpf,
        rg,
        telefone,
        endereco,
        cidade,
        estado,
        comprovanteResidencia,
        igrejaId: igreja.id
      },
      include: {
        igreja: true
      }
    })

    // Remover senha do retorno
    const { senha: _, ...usuarioSemSenha } = usuario

    return NextResponse.json({
      user: usuarioSemSenha
    })

  } catch (error) {
    console.error('Erro no cadastro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}