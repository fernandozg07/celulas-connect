'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, Download, BookOpen, Music, MessageCircle, CheckCircle, Mail } from 'lucide-react'

export default function DownloadsPage() {
  const [email, setEmail] = useState('')
  const [nome, setNome] = useState('')
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !nome) return

    // Simular download
    setDownloaded(true)
    
    // Aqui seria o link real do PDF
    const link = document.createElement('a')
    link.href = '/material-celulas-saudaveis.pdf' // PDF fictício
    link.download = 'Material-Celulas-Saudaveis.pdf'
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Células Saudáveis</span>
            </Link>
            <Link href="/buscar" className="btn-primary text-sm md:text-base px-4 py-2 md:px-8 md:py-3">
              🔍 Encontrar Célula
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            📚 Material Gratuito
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <strong>GRÁTIS:</strong> Kit completo que já transformou centenas de células pelo Brasil
          </p>
        </div>

        {/* Conteúdo do Material */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">10 Lições</h3>
            <p className="text-gray-600">
              Lições testadas que geram transformação real nas vidas
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">10 Louvores</h3>
            <p className="text-gray-600">
              Louvores que tocam corações e aproximam de Deus
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">10 Quebra-Gelos</h3>
            <p className="text-gray-600">
              Quebra-gelos que criam laços verdadeiros entre pessoas
            </p>
          </div>
        </div>

        {/* Formulário de Download */}
        {!downloaded ? (
          <div className="card max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Baixe Gratuitamente
              </h2>
              <p className="text-gray-600">
                <strong>Mais de 5.000 líderes já baixaram!</strong> Seja o próximo a transformar sua célula.
              </p>
            </div>

            <form onSubmit={handleDownload} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="input-field"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-green-700">
                    <p className="font-semibold mb-1">100% Gratuito</p>
                    <p>Não enviamos spam. Seus dados estão seguros conosco.</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-lg py-4"
              >
                🚀 BAIXAR AGORA - 100% GRÁTIS
              </button>
            </form>
          </div>
        ) : (
          <div className="card max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Download Iniciado!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Obrigado, <strong>{nome}</strong>! O download do material foi iniciado automaticamente.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl mb-8">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-500 mr-2" />
                <span className="font-semibold text-blue-700">Verifique seu email</span>
              </div>
              <p className="text-blue-600">
                Enviamos uma cópia do material para <strong>{email}</strong> junto com dicas exclusivas para líderes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/buscar" className="btn-primary">
                🔥 Encontrar Minha Célula
              </Link>
              <Link href="/o-que-e-celula" className="btn-secondary">
                📖 Saiba Mais sobre Células
              </Link>
            </div>
          </div>
        )}

        {/* Próximos Passos */}
        <div className="mt-16">
          <div className="card bg-gradient-to-r from-green-500 to-blue-500 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Quer Mais Conteúdo?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Em breve lançaremos a versão premium com centenas de recursos exclusivos para líderes de células saudáveis.
            </p>
            <div className="bg-white/20 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Versão Premium incluirá:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>100+ Lições de célula</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Treinamentos em vídeo</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Relatórios avançados</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Suporte especializado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}