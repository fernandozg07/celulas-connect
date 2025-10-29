'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Play, Star, Quote, Church, User } from 'lucide-react'

interface Depoimento {
  id: string
  nome: string
  cargo: string
  igreja: string
  depoimento: string
  tipo: 'video' | 'texto'
  videoUrl?: string
  foto: string
  avaliacao: number
}

export default function DepoimentosPage() {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([])
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    // Dados mock de depoimentos
    const depoimentosMock: Depoimento[] = [
      {
        id: '1',
        nome: 'Pastor Roberto Silva',
        cargo: 'Pastor Presidente',
        igreja: 'Igreja Batista Esperança',
        depoimento: 'O Células Saudáveis revolucionou nossa igreja! Em 6 meses, conseguimos organizar melhor nossas 15 células, aumentar a frequência em 40% e formar 8 novos líderes. A plataforma é intuitiva e realmente focada no crescimento espiritual. Recomendo para todas as igrejas que desejam fortalecer seu ministério de células.',
        tipo: 'texto',
        foto: '/api/placeholder/100/100',
        avaliacao: 5
      },
      {
        id: '2',
        nome: 'Pastora Maria Santos',
        cargo: 'Pastora de Células',
        igreja: 'Igreja Metodista Central',
        depoimento: 'Como pastora responsável pelas células, posso afirmar que esta plataforma trouxe uma organização que nunca tivemos antes. O sistema de frequência, escalas e principalmente o muro de oração criaram uma conexão real entre nossas 23 células. Nossos líderes estão mais capacitados e engajados!',
        tipo: 'video',
        videoUrl: 'https://example.com/video1',
        foto: '/api/placeholder/100/100',
        avaliacao: 5
      },
      {
        id: '3',
        nome: 'Carlos Oliveira',
        cargo: 'Líder de Célula',
        igreja: 'Igreja Assembleia de Deus',
        depoimento: 'Sou líder há 3 anos e nunca tive ferramentas tão práticas! O material gratuito me ajudou muito no início, e agora uso a plataforma para tudo: controlar frequência, organizar escalas e até receber visitantes. Minha célula cresceu de 8 para 18 pessoas em 4 meses. Glória a Deus!',
        tipo: 'texto',
        foto: '/api/placeholder/100/100',
        avaliacao: 5
      },
      {
        id: '4',
        nome: 'Ana Costa',
        cargo: 'Supervisora de Células',
        igreja: 'Igreja Presbiteriana Renovada',
        depoimento: 'O que mais me impressiona é o foco espiritual da plataforma. Não é apenas uma ferramenta administrativa, mas um verdadeiro instrumento para o crescimento do Reino. O sistema de pedidos de oração uniu nossas células de uma forma incrível. Recomendo de coração!',
        tipo: 'video',
        videoUrl: 'https://example.com/video2',
        foto: '/api/placeholder/100/100',
        avaliacao: 5
      },
      {
        id: '5',
        nome: 'João Ferreira',
        cargo: 'Pastor Auxiliar',
        igreja: 'Igreja Quadrangular',
        depoimento: 'Implementamos o Células Saudáveis há 8 meses e os resultados são visíveis: mais organização, melhor comunicação entre líderes e principalmente, mais pessoas sendo alcançadas. O sistema de visitantes já trouxe 12 novas pessoas para nossas células. É uma bênção!',
        tipo: 'texto',
        foto: '/api/placeholder/100/100',
        avaliacao: 5
      }
    ]
    setDepoimentos(depoimentosMock)
  }, [])

  const depoimentosFiltrados = depoimentos.filter(dep => {
    if (filtro === 'todos') return true
    if (filtro === 'pastores') return dep.cargo.toLowerCase().includes('pastor')
    if (filtro === 'lideres') return dep.cargo.toLowerCase().includes('líder')
    if (filtro === 'videos') return dep.tipo === 'video'
    return true
  })

  const renderStars = (avaliacao: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < avaliacao ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Quote className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-3xl font-bold text-gray-800">CélulasConnect</span>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/buscar" className="hidden sm:block text-gray-600 hover:text-yellow-600 font-medium transition-colors">
                Buscar Células
              </Link>
              <Link href="/login" className="btn-primary text-sm md:text-base px-4 py-2 md:px-6 md:py-3">
                <span className="hidden sm:inline">Cadastrar Igreja</span>
                <span className="sm:hidden">⛪</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center shadow-xl mr-4">
              <Quote className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
              Depoimentos
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Veja como o Células Saudáveis tem transformado igrejas e fortalecido comunidades pelo Brasil
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="card text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">150+</div>
            <div className="text-sm text-gray-600">Igrejas Cadastradas</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">2.500+</div>
            <div className="text-sm text-gray-600">Células Ativas</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">15.000+</div>
            <div className="text-sm text-gray-600">Membros Conectados</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9</div>
            <div className="text-sm text-gray-600">Avaliação Média</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filtro === 'todos' 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro('pastores')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filtro === 'pastores' 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Pastores
          </button>
          <button
            onClick={() => setFiltro('lideres')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filtro === 'lideres' 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Líderes
          </button>
          <button
            onClick={() => setFiltro('videos')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filtro === 'videos' 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Vídeos
          </button>
        </div>

        {/* Lista de Depoimentos */}
        <div className="grid md:grid-cols-2 gap-8">
          {depoimentosFiltrados.map((dep) => (
            <div key={dep.id} className="card hover:shadow-2xl transition-all duration-300">
              {/* Header do Depoimento */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{dep.nome}</h3>
                  <p className="text-yellow-600 font-semibold">{dep.cargo}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <Church className="w-4 h-4" />
                    <span>{dep.igreja}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    {renderStars(dep.avaliacao)}
                  </div>
                </div>
                {dep.tipo === 'video' && (
                  <div className="bg-red-100 p-2 rounded-full">
                    <Play className="w-5 h-5 text-red-600" />
                  </div>
                )}
              </div>

              {/* Conteúdo do Depoimento */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-yellow-200" />
                <p className="text-gray-700 leading-relaxed text-lg pl-6">
                  {dep.depoimento}
                </p>
              </div>

              {/* Ações */}
              {dep.tipo === 'video' && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Assistir Depoimento Completo
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <div className="card bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Faça Parte desta Transformação!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a centenas de igrejas que já estão fortalecendo suas células com nossa plataforma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="bg-white text-yellow-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300">
                ⛪ Cadastrar Minha Igreja
              </Link>
              <Link href="/downloads" className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300">
                📚 Material Gratuito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}