'use client'

import { useState, useEffect } from 'react'
import { MapPin, Users, Clock, Star, Phone } from 'lucide-react'
import Link from 'next/link'

interface CelulaCard {
  id: string
  nome: string
  lider: string
  whatsapp: string
  dia: string
  horario: string
  descricao: string
  faixaEtaria: string
  bairro: string
  avaliacao: number
  igrejaMae: string
}

export default function BuscarPage() {
  const [celulas, setCelulas] = useState<CelulaCard[]>([])
  const [filtros, setFiltros] = useState({
    dia: '',
    faixaEtaria: '',
    localizacao: ''
  })
  const [loading, setLoading] = useState(true)

  const buscarCelulas = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filtros.dia) params.append('dia', filtros.dia)
      if (filtros.faixaEtaria) params.append('faixaEtaria', filtros.faixaEtaria)
      if (filtros.localizacao) params.append('bairro', filtros.localizacao)

      const response = await fetch(`/api/celulas?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        const celulasFormatadas = data.map((celula: any) => ({
          id: celula.id,
          nome: celula.nome,
          lider: celula.lider,
          whatsapp: celula.whatsapp,
          dia: celula.dia,
          horario: celula.horario,
          descricao: celula.descricao,
          faixaEtaria: celula.faixaEtaria,
          bairro: celula.bairro,
          avaliacao: celula.avaliacao,
          igrejaMae: celula.igreja.nome
        }))
        setCelulas(celulasFormatadas)
      }
    } catch (error) {
      console.error('Erro ao buscar células:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarCelulas()
  }, [])

  // Buscar novamente quando filtros mudarem
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      buscarCelulas()
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [filtros])

  const celulasFiltradas = celulas

  const handleWhatsApp = (whatsapp: string, nome: string) => {
    const message = `Olá! Vi a célula "${nome}" na plataforma CélulasConnect e gostaria de saber mais informações.`
    const url = `https://wa.me/55${whatsapp}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CélulasConnect</span>
            </Link>
            <Link href="/login" className="btn-primary text-sm md:text-base px-4 py-2 md:px-8 md:py-3">
              <span className="hidden sm:inline">🔑 Login</span>
              <span className="sm:hidden">🔑</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4 md:mb-6">
            🔍 Encontre Sua Célula
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Use os filtros abaixo para encontrar a célula perfeita para você e sua família
          </p>
        </div>

        {/* Filtros */}
        <div className="card mb-8 md:mb-12">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
            ⚙️ Filtros de Busca
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📅 Dia da Semana
              </label>
              <select
                value={filtros.dia}
                onChange={(e) => setFiltros({...filtros, dia: e.target.value})}
                className="input-field"
              >
                <option value="">Todos os dias</option>
                <option value="segunda">Segunda-feira</option>
                <option value="terça">Terça-feira</option>
                <option value="quarta">Quarta-feira</option>
                <option value="quinta">Quinta-feira</option>
                <option value="sexta">Sexta-feira</option>
                <option value="sábado">Sábado</option>
                <option value="domingo">Domingo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                👥 Faixa Etária
              </label>
              <select
                value={filtros.faixaEtaria}
                onChange={(e) => setFiltros({...filtros, faixaEtaria: e.target.value})}
                className="input-field"
              >
                <option value="">Todas as idades</option>
                <option value="jovens">Jovens (18-30)</option>
                <option value="adultos">Adultos (30-60)</option>
                <option value="idosos">Idosos (60+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📍 Localização
              </label>
              <input
                type="text"
                placeholder="Digite o bairro..."
                value={filtros.localizacao}
                onChange={(e) => setFiltros({...filtros, localizacao: e.target.value})}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Resultados */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando células...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {celulasFiltradas.map((celula) => (
              <div key={celula.id} className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {celula.nome}
                  </h3>
                  <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-semibold text-yellow-700">
                      {celula.avaliacao}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">Líder: {celula.lider}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{celula.dia} às {celula.horario}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{celula.bairro}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {celula.descricao}
                </p>

                <div className="text-xs text-gray-500 mb-4">
                  {celula.igrejaMae}
                </div>

                <button
                  onClick={() => handleWhatsApp(celula.whatsapp, celula.nome)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  📱 Entrar em Contato
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && celulasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Nenhuma célula encontrada com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}