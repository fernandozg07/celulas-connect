import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { nome, email, telefone, mensagem, tipo } = await request.json()

    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
        { status: 400 }
      )
    }

    // Simular envio de email
    const emailData = {
      to: 'contato@celulasconnect.com.br',
      from: email,
      subject: `${tipo || 'Contato'} - ${nome}`,
      html: `
        <h2>Nova mensagem do CélulasConnect</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
        <p><strong>Tipo:</strong> ${tipo || 'Contato geral'}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `
    }

    console.log('Email enviado:', emailData)

    return NextResponse.json({
      success: true,
      message: 'Email enviado com sucesso!'
    })

  } catch (error: any) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}