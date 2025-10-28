'use client'

import { MapPin, Users, Clock, Star } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Células Saudáveis</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/login" className="hidden sm:block text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                Login
              </Link>
              <Link href="/login" className="btn-primary text-sm md:text-base px-4 py-2 md:px-8 md:py-3">
                <span className="hidden sm:inline">Cadastrar Igreja</span>
                <span className="sm:hidden">⛪</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Viva o
            <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Ide de Jesus
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Transforme vidas através de células que realmente fazem a diferença no Reino de Deus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link href="/buscar" className="w-full sm:w-auto bg-white text-indigo-600 px-6 sm:px-10 py-4 rounded-2xl text-base sm:text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-center">
🔥 Encontre Sua Célula Agora
            </Link>
            <Link href="/o-que-e-celula" className="w-full sm:w-auto glass-card text-white px-6 sm:px-10 py-4 rounded-2xl text-base sm:text-lg font-semibold hover:bg-white/20 transition-all duration-300 text-center">
              📚 O que é uma Célula?
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
              Como Funciona
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deus tem uma família espiritual esperando por você - descubra em 3 passos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-gray-900">1. Busque por Localização</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Deus colocou uma família espiritual perto de você - descubra onde ela está
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-gray-900">2. Filtre por Perfil</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Encontre pessoas na sua faixa etária que compartilham a mesma paixão por Jesus
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-4 text-gray-900">3. Conecte-se Direto</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Converse com líderes apaixonados que vão te acolher como família
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Lidere Células Saudáveis
          </h3>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Lidere com propósito: ferramentas que multiplicam vidas e expandem o Reino de Deus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Link href="/login" className="w-full sm:w-auto bg-white text-indigo-600 px-6 sm:px-10 py-4 rounded-2xl text-base sm:text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:-translate-y-1 text-center">
              🚀 Começar Agora - É Grátis!
            </Link>
            <Link href="/downloads" className="w-full sm:w-auto glass-card text-white px-6 sm:px-10 py-4 rounded-2xl text-base sm:text-lg font-semibold hover:bg-white/20 transition-all duration-300 text-center">
              🎁 Kit Gratuito (30 Recursos)
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Células Saudáveis</h4>
              </div>
              <p className="text-gray-400">
                Viva o Ide de Jesus através de células saudáveis e transformadoras.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold text-white mb-4">Descubra</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/o-que-e-celula" className="hover:text-white transition-colors">📚 O que é uma Célula?</Link></li>
                <li><Link href="/buscar" className="hover:text-white transition-colors">🔍 Buscar Células</Link></li>
                <li><Link href="/visitante" className="hover:text-white transition-colors">👋 Sou Visitante</Link></li>
                <li><Link href="/downloads" className="hover:text-white transition-colors">📚 Material Gratuito</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold text-white mb-4">Comunidade</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/oracoes" className="hover:text-white transition-colors">🙏 Pedidos de Oração</Link></li>
                <li><Link href="/experiencias" className="hover:text-white transition-colors">📸 Fotos & Experiências</Link></li>
                <li><Link href="/depoimentos" className="hover:text-white transition-colors">🎤 Depoimentos</Link></li>
                <li><Link href="/devocionais" className="hover:text-white transition-colors">📝 Devocionais</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold text-white mb-4">Líderes</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white transition-colors">🔑 Login</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">📊 Dashboard</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">💰 Gestão</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 Células Saudáveis - Viva o Ide de Jesus. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}