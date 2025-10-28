'use client'

import Link from 'next/link'
import { Users, Heart, BookOpen, Home, ArrowRight, CheckCircle } from 'lucide-react'

export default function OQueECelulaPage() {
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
            <div className="flex items-center space-x-2">
              <Link href="/buscar" className="hidden sm:block text-gray-600 hover:text-green-600 font-medium transition-colors">
                Buscar Células
              </Link>
              <Link href="/buscar" className="btn-primary text-sm md:text-base px-4 py-2 md:px-6 md:py-3">
                <span className="hidden sm:inline">🔍 Encontrar Célula</span>
                <span className="sm:hidden">🔍</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            O que é uma Célula?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra por que milhões de cristãos ao redor do mundo estão vivendo o verdadeiro cristianismo em células.
          </p>
        </div>

        {/* Definição Principal */}
        <div className="card mb-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Uma Célula é uma Família Espiritual
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            É onde você deixa de ser apenas mais um na multidão e se torna <strong>família</strong>. 
            Onde suas <strong>orações são ouvidas</strong>, seus <strong>dons são desenvolvidos</strong> e 
            você <strong>cresce espiritualmente</strong> de forma real e prática.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Não espere mais! Sua família espiritual está esperando por você. Dê o primeiro passo hoje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/buscar" className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
                🔥 Quero Fazer Parte Agora!
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/downloads" className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 flex items-center justify-center">
                📚 Material Gratuito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}