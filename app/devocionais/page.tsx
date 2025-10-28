'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, BookOpen, Calendar, Heart, Share, ChevronLeft, ChevronRight } from 'lucide-react'

interface Devocional {
  id: string
  data: string
  titulo: string
  versiculo: string
  referencia: string
  reflexao: string
  oracao: string
  aplicacao: string
  categoria: string
}

export default function DevocionaisPage() {
  const [devocionais, setDevocionais] = useState<Devocional[]>([])
  const [devocionalAtual, setDevocionalAtual] = useState<Devocional | null>(null)
  const [dataAtual, setDataAtual] = useState(new Date())

  useEffect(() => {
    // Dados mock de devocionais
    const devocionaisMock: Devocional[] = [
      {
        id: '1',
        data: '2024-01-15',
        titulo: 'O Amor que Transforma Comunidades',
        versiculo: 'Nisto conhecerão todos que sois meus discípulos: se tiverdes amor uns aos outros.',
        referencia: 'João 13:35',
        reflexao: 'Jesus deixou claro que o distintivo dos seus seguidores seria o amor mútuo. Em nossas células, este amor não é apenas um sentimento, mas uma ação concreta que transforma vidas e comunidades inteiras. Quando amamos verdadeiramente uns aos outros, criamos um ambiente onde Deus pode agir poderosamente. O amor genuíno quebra barreiras, cura feridas e atrai pessoas para Cristo. Nossa célula deve ser um lugar onde este amor de Jesus é experimentado de forma prática e real.',
        oracao: 'Senhor Jesus, enche nossos corações com Teu amor genuíno. Ajuda-nos a amar uns aos outros como Tu nos amaste. Que nossa célula seja conhecida pelo amor que demonstramos, e que através deste amor, muitas vidas sejam transformadas para Tua glória. Amém.',
        aplicacao: 'Hoje, escolha uma pessoa da sua célula e demonstre amor prático: faça uma ligação, envie uma mensagem de encorajamento ou ofereça ajuda em algo específico.',
        categoria: 'amor'
      },
      {
        id: '2',
        data: '2024-01-14',
        titulo: 'Unidos em Oração',
        versiculo: 'Onde dois ou três estiverem reunidos em meu nome, ali estou no meio deles.',
        referencia: 'Mateus 18:20',
        reflexao: 'A oração em comunidade tem um poder especial. Quando nos reunimos como célula para orar, não estamos apenas juntando nossas vozes, mas convidando Jesus para estar presente de forma especial entre nós. Cada pedido compartilhado, cada lágrima derramada, cada gratidão expressa cria uma atmosfera onde o céu toca a terra. Nossa célula deve ser um lugar de oração constante, onde uns carregam os fardos dos outros diante do trono da graça.',
        oracao: 'Pai celestial, obrigado pela promessa de Tua presença quando nos reunimos em oração. Ensina-nos a orar uns pelos outros com fé e perseverança. Que nossa célula seja uma casa de oração onde Teu poder se manifesta. Amém.',
        aplicacao: 'Organize um momento especial de oração na sua célula esta semana, focando nos pedidos específicos de cada membro.',
        categoria: 'oracao'
      },
      {
        id: '3',
        data: '2024-01-13',
        titulo: 'Servindo com Alegria',
        versiculo: 'Cada um administre aos outros o dom como recebeu, como bons despenseiros da multiforme graça de Deus.',
        referencia: '1 Pedro 4:10',
        reflexao: 'Deus nos deu dons únicos para edificarmos uns aos outros. Em nossa célula, cada pessoa tem algo especial para contribuir. Não existe membro sem propósito ou sem valor. Quando servimos uns aos outros com nossos dons, experimentamos a alegria do Reino e vemos a graça de Deus fluir através de nós. O serviço mútuo fortalece os laços de amor e cria uma comunidade verdadeiramente saudável.',
        oracao: 'Senhor, ajuda-me a descobrir e usar meus dons para edificar minha célula. Que eu sirva com alegria e humildade, sempre buscando o bem dos meus irmãos. Usa-me como instrumento da Tua graça. Amém.',
        aplicacao: 'Identifique um dom que você possui e pense em como pode usá-lo para servir sua célula esta semana.',
        categoria: 'servico'
      }
    ]
    
    setDevocionais(devocionaisMock)
    setDevocionalAtual(devocionaisMock[0])
  }, [])

  const navegarDevocional = (direcao: 'anterior' | 'proximo') => {
    if (!devocionalAtual) return
    
    const indiceAtual = devocionais.findIndex(d => d.id === devocionalAtual.id)
    let novoIndice
    
    if (direcao === 'anterior') {
      novoIndice = indiceAtual > 0 ? indiceAtual - 1 : devocionais.length - 1
    } else {
      novoIndice = indiceAtual < devocionais.length - 1 ? indiceAtual + 1 : 0
    }
    
    setDevocionalAtual(devocionais[novoIndice])
  }

  const compartilhar = () => {
    if (navigator.share && devocionalAtual) {
      navigator.share({
        title: devocionalAtual.titulo,
        text: `${devocionalAtual.versiculo} - ${devocionalAtual.referencia}`,
        url: window.location.href
      })
    } else {
      // Fallback para navegadores que não suportam Web Share API
      alert('Devocional copiado! Compartilhe com sua célula.')
    }
  }

  if (!devocionalAtual) return <div>Carregando...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Células Saudáveis</span>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/buscar" className="hidden sm:block text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                Buscar Células
              </Link>
              <button
                onClick={compartilhar}
                className="btn-primary text-sm md:text-base px-4 py-2 md:px-6 md:py-3"
              >
                <Share className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Compartilhar</span>
                <span className="sm:hidden">📤</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            📖 Devocional Diário
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Alimente sua alma diariamente com reflexões bíblicas especialmente preparadas para células saudáveis
          </p>
        </div>

        {/* Navegação de Data */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navegarDevocional('anterior')}
            className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Anterior</span>
          </button>
          
          <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-xl shadow-md">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-gray-900">
              {new Date(devocionalAtual.data).toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <button
            onClick={() => navegarDevocional('proximo')}
            className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <span>Próximo</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo do Devocional */}
        <div className="card">
          {/* Título */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {devocionalAtual.titulo}
          </h2>

          {/* Versículo */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-8 rounded-2xl mb-8 text-center">
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-4">
              "{devocionalAtual.versiculo}"
            </blockquote>
            <cite className="text-indigo-200 font-semibold">
              {devocionalAtual.referencia}
            </cite>
          </div>

          {/* Reflexão */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              💭 Reflexão
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {devocionalAtual.reflexao}
            </p>
          </div>

          {/* Oração */}
          <div className="mb-8 bg-purple-50 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              🙏 Oração
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg italic">
              {devocionalAtual.oracao}
            </p>
          </div>

          {/* Aplicação */}
          <div className="bg-green-50 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              ✨ Aplicação Prática
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {devocionalAtual.aplicacao}
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={compartilhar}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center"
          >
            <Share className="w-5 h-5 mr-2" />
            Compartilhar com Célula
          </button>
          <Link
            href="/oracoes"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center"
          >
            <Heart className="w-5 h-5 mr-2" />
            Pedir Oração
          </Link>
        </div>

        {/* Próximos Devocionais */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            📅 Próximos Devocionais
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {devocionais.slice(0, 3).map((dev, index) => (
              <div
                key={dev.id}
                className={`card cursor-pointer transition-all duration-300 ${
                  dev.id === devocionalAtual.id 
                    ? 'ring-2 ring-indigo-500 bg-indigo-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setDevocionalAtual(dev)}
              >
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(dev.data).toLocaleDateString('pt-BR')}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {dev.titulo}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {dev.referencia}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <div className="card bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Receba Devocionais Diários
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Cadastre-se e receba reflexões bíblicas todos os dias no seu WhatsApp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300">
                ⛪ Cadastrar Igreja
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