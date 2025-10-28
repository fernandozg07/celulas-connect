'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Heart, Plus, MessageCircle, Clock, User } from 'lucide-react'

interface PedidoOracao {
  id: string
  nome: string
  pedido: string
  categoria: string
  data: string
  oracoes: number
  anonimo: boolean
}

export default function OracoesPage() {
  const [pedidos, setPedidos] = useState<PedidoOracao[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    pedido: '',
    categoria: 'saude',
    anonimo: false
  })

  useEffect(() => {
    // Dados mock de pedidos
    const pedidosMock: PedidoOracao[] = [
      {
        id: '1',
        nome: 'Maria Silva',
        pedido: 'Oração pela saúde da minha mãe que está internada no hospital.',
        categoria: 'saude',
        data: '2024-01-15',
        oracoes: 23,
        anonimo: false
      },
      {
        id: '2',
        nome: 'Anônimo',
        pedido: 'Por favor, orem por minha situação financeira. Estou desempregado há 3 meses.',
        categoria: 'financeiro',
        data: '2024-01-14',
        oracoes: 15,
        anonimo: true
      },
      {
        id: '3',
        nome: 'João Santos',
        pedido: 'Oração pela reconciliação familiar. Preciso de sabedoria para resolver conflitos.',
        categoria: 'familia',
        data: '2024-01-13',
        oracoes: 31,
        anonimo: false
      }
    ]
    setPedidos(pedidosMock)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const novoPedido: PedidoOracao = {
      id: Date.now().toString(),
      nome: formData.anonimo ? 'Anônimo' : formData.nome,
      pedido: formData.pedido,
      categoria: formData.categoria,
      data: new Date().toISOString().split('T')[0],
      oracoes: 0,
      anonimo: formData.anonimo
    }

    setPedidos([novoPedido, ...pedidos])
    setFormData({ nome: '', pedido: '', categoria: 'saude', anonimo: false })
    setShowForm(false)
  }

  const handleOrar = (id: string) => {
    setPedidos(pedidos.map(p => 
      p.id === id ? { ...p, oracoes: p.oracoes + 1 } : p
    ))
  }

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'saude': return '🏥'
      case 'financeiro': return '💰'
      case 'familia': return '👨‍👩‍👧‍👦'
      case 'trabalho': return '💼'
      case 'espiritual': return '🙏'
      default: return '💝'
    }
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'saude': return 'bg-red-100 text-red-700'
      case 'financeiro': return 'bg-green-100 text-green-700'
      case 'familia': return 'bg-blue-100 text-blue-700'
      case 'trabalho': return 'bg-purple-100 text-purple-700'
      case 'espiritual': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Heart className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Células Saudáveis</span>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/buscar" className="hidden sm:block text-gray-600 hover:text-purple-600 font-medium transition-colors">
                Buscar Células
              </Link>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary text-sm md:text-base px-4 py-2 md:px-6 md:py-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Pedir Oração</span>
                <span className="sm:hidden">🙏</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            🙏 Muro de Oração
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compartilhe seus pedidos de oração e ore pelos pedidos de outros irmãos. Juntos somos mais fortes!
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">{pedidos.length}</div>
            <div className="text-sm text-gray-600">Pedidos Ativos</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-pink-600">{pedidos.reduce((acc, p) => acc + p.oracoes, 0)}</div>
            <div className="text-sm text-gray-600">Orações Feitas</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">24h</div>
            <div className="text-sm text-gray-600">Disponível</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">Confidencial</div>
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="card hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    {pedido.anonimo ? (
                      <User className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white font-bold text-lg">{pedido.nome.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{pedido.nome}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(pedido.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoriaColor(pedido.categoria)}`}>
                  {getCategoriaIcon(pedido.categoria)} {pedido.categoria}
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {pedido.pedido}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-500">
                  <Heart className="w-4 h-4 mr-2" />
                  <span className="text-sm">{pedido.oracoes} pessoas oraram</span>
                </div>
                <button
                  onClick={() => handleOrar(pedido.id)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Orar por isso
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Novo Pedido */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  🙏 Compartilhar Pedido de Oração
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      required={!formData.anonimo}
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      className="input-field"
                      placeholder="Como você gostaria de ser chamado?"
                      disabled={formData.anonimo}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="anonimo"
                      checked={formData.anonimo}
                      onChange={(e) => setFormData({...formData, anonimo: e.target.checked})}
                      className="mr-3"
                    />
                    <label htmlFor="anonimo" className="text-sm text-gray-700">
                      Quero manter meu pedido anônimo
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select
                      value={formData.categoria}
                      onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                      className="input-field"
                    >
                      <option value="saude">🏥 Saúde</option>
                      <option value="financeiro">💰 Financeiro</option>
                      <option value="familia">👨‍👩‍👧‍👦 Família</option>
                      <option value="trabalho">💼 Trabalho</option>
                      <option value="espiritual">🙏 Espiritual</option>
                      <option value="outros">💝 Outros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Seu Pedido de Oração
                    </label>
                    <textarea
                      required
                      value={formData.pedido}
                      onChange={(e) => setFormData({...formData, pedido: e.target.value})}
                      rows={4}
                      className="input-field"
                      placeholder="Compartilhe seu pedido de oração com carinho e fé..."
                    />
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-sm text-purple-700">
                      <Heart className="w-4 h-4 inline mr-2" />
                      Seu pedido será compartilhado com amor e confidencialidade na nossa comunidade de fé.
                    </p>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      🙏 Compartilhar Pedido
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}