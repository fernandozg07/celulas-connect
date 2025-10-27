import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { 
      nome, 
      email, 
      senha, 
      nomeIgreja, 
      pastor, 
      telefone, 
      endereco, 
      cidade, 
      estado 
    } = await request.json()

    // Validações
    if (!nome || !email || !senha || !nomeIgreja || !pastor) {
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
        { status: 409 }
      )
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10)

    // Criar igreja e usuário em transação
    const resultado = await prisma.$transaction(async (tx) => {
      const igreja = await tx.igreja.create({
        data: {
          nome: nomeIgreja,
          pastor,
          email,
          telefone: telefone || '',
          endereco: endereco || '',
          cidade: cidade || '',
          estado: estado || ''
        }
      })

      const usuario = await tx.usuario.create({
        data: {
          nome,
          email,
          senha: senhaHash,
          tipo: 'admin',
          igrejaId: igreja.id
        },
        include: {
          igreja: true
        }
      })

      return { usuario, igreja }
    })

    return NextResponse.json({
      user: {
        id: resultado.usuario.id,
        nome: resultado.usuario.nome,
        email: resultado.usuario.email,
        tipo: resultado.usuario.tipo,
        igreja: resultado.igreja
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