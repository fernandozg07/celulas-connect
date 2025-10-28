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
            O que é uma Célula?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra o poder transformador das células saudáveis e como elas podem revolucionar sua vida espiritual e comunitária.
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
            É um pequeno grupo de pessoas que se reúne regularmente para <strong>adorar a Deus</strong>, 
            <strong> estudar a Bíblia</strong>, <strong>orar uns pelos outros</strong> e 
            <strong> viver em comunhão genuína</strong>. É onde o amor de Cristo se torna real e prático.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Encontre uma célula saudável perto de você e comece sua jornada de crescimento espiritual em comunidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/buscar" className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
                🔍 Encontrar Célula Saudável
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