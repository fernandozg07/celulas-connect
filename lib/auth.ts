import { NextRequest } from 'next/server'
import { prisma } from './prisma'

export async function verificarAutenticacao(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader) {
      return null
    }

    // Para simplificar, vamos usar o userId diretamente
    // Em produção, usar JWT ou NextAuth
    const userId = authHeader.replace('Bearer ', '')
    
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      include: { igreja: true }
    })

    return usuario
  } catch (error) {
    console.error('Erro na verificação de autenticação:', error)
    return null
  }
}

export function criarResposta(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}