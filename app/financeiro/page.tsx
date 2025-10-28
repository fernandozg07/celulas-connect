'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, DollarSign, Plus, TrendingUp, Calendar, PieChart, Download } from 'lucide-react'

interface Transacao {
  id: string
  tipo: 'entrada' | 'saida'
  categoria: string
  descricao: string
  valor: number
  data: string
  membro?: string
}

export default function FinanceiroPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    tipo: 'entrada' as 'entrada' | 'saida',
    categoria: 'oferta',
    descricao: '',
    valor: '',
    membro: ''
  })
  const [filtroMes, setFiltroMes] = useState(new Date().getMonth())
  const [filtroAno, setFiltroAno] = useState(new Date().getFullYear())

  useEffect(() => {
    // Dados mock de transações
    const transacoesMock: Transacao[] = [
      {
        id: '1',
        tipo: 'entrada',
        categoria: 'oferta',
        descricao: 'Oferta da reunião de célula',
        valor: 150.00,
        data: '2024-01-15',
        membro: 'Célula Esperança'
      },
      {
        id: '2',
        tipo: 'entrada',
        categoria: 'dizimo',
        descricao: 'Dízimo - João Silva',
        valor: 300.00,
        data: '2024-01-14',
        membro: 'João Silva'
      },
      {
        id: '3',
        tipo: 'saida',
        categoria: 'lanche',
        descricao: 'Compra de lanches para reunião',
        valor: 80.00,
        data: '2024-01-13'
      },
      {
        id: '4',
        tipo: 'entrada',
        categoria: 'doacao',
        descricao: 'Doação para ação social',
        valor: 200.00,
        data: '2024-01-12',
        membro: 'Maria Santos'
      },
      {
        id: '5',
        tipo: 'saida',
        categoria: 'material',
        descricao: 'Material para estudo bíblico',
        valor: 45.00,
        data: '2024-01-10'
      }
    ]
    setTransacoes(transacoesMock)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const novaTransacao: Transacao = {
      id: Date.now().toString(),
      tipo: formData.tipo,
      categoria: formData.categoria,
      descricao: formData.descricao,
      valor: parseFloat(formData.valor),
      data: new Date().toISOString().split('T')[0],
      membro: formData.membro || undefined
    }

    setTransacoes([novaTransacao, ...transacoes])
    setFormData({
      tipo: 'entrada',
      categoria: 'oferta',
      descricao: '',
      valor: '',
      membro: ''
    })
    setShowForm(false)
  }

  const transacoesFiltradas = transacoes.filter(t => {
    const data = new Date(t.data)
    return data.getMonth() === filtroMes && data.getFullYear() === filtroAno
  })

  const totalEntradas = transacoesFiltradas
    .filter(t => t.tipo === 'entrada')
    .reduce((acc, t) => acc + t.valor, 0)

  const totalSaidas = transacoesFiltradas
    .filter(t => t.tipo === 'saida')
    .reduce((acc, t) => acc + t.valor, 0)

  const saldo = totalEntradas - totalSaidas

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'oferta': return '🙏'
      case 'dizimo': return '💝'
      case 'doacao': return '❤️'
      case 'lanche': return '🍰'
      case 'material': return '📚'
      case 'evento': return '🎉'
      default: return '💰'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <Link href="/dashboard" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Financeiro</span>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="hidden sm:block text-gray-600 hover:text-green-600 font-medium transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary text-sm md:text-base px-4 py-2 md:px-6 md:py-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Nova Transação</span>
                <span className="sm:hidden">💰</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={filtroMes}
            onChange={(e) => setFiltroMes(parseInt(e.target.value))}
            className="input-field w-auto"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(2024, i).toLocaleDateString('pt-BR', { month: 'long' })}
              </option>
            ))}
          </select>
          <select
            value={filtroAno}
            onChange={(e) => setFiltroAno(parseInt(e.target.value))}
            className="input-field w-auto"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Entradas</p>
                <p className="text-2xl font-bold">{formatarMoeda(totalEntradas)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="card bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Saídas</p>
                <p className="text-2xl font-bold">{formatarMoeda(totalSaidas)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-200 rotate-180" />
            </div>
          </div>

          <div className={`card ${saldo >= 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-orange-500 to-red-500'} text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Saldo</p>
                <p className="text-2xl font-bold">{formatarMoeda(saldo)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="card bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Transações</p>
                <p className="text-2xl font-bold">{transacoesFiltradas.length}</p>
              </div>
              <PieChart className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Histórico de Transações
            </h2>
            <button className="text-green-600 hover:text-green-800 font-semibold flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
          </div>

          <div className="space-y-4">
            {transacoesFiltradas.map((transacao) => (
              <div key={transacao.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transacao.tipo === 'entrada' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    <span className="text-xl">{getCategoriaIcon(transacao.categoria)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{transacao.descricao}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(transacao.data).toLocaleDateString('pt-BR')}</span>
                      {transacao.membro && (
                        <>
                          <span>•</span>
                          <span>{transacao.membro}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transacao.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transacao.tipo === 'entrada' ? '+' : '-'} {formatarMoeda(transacao.valor)}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">{transacao.categoria}</p>
                </div>
              </div>
            ))}
          </div>

          {transacoesFiltradas.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma transação encontrada para este período.</p>
            </div>
          )}
        </div>

        {/* Modal de Nova Transação */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  💰 Nova Transação
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Transação
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, tipo: 'entrada'})}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.tipo === 'entrada'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                        Entrada
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, tipo: 'saida'})}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          formData.tipo === 'saida'
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <TrendingUp className="w-6 h-6 mx-auto mb-2 rotate-180" />
                        Saída
                      </button>
                    </div>
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
                      {formData.tipo === 'entrada' ? (
                        <>
                          <option value="oferta">🙏 Oferta</option>
                          <option value="dizimo">💝 Dízimo</option>
                          <option value="doacao">❤️ Doação</option>
                        </>
                      ) : (
                        <>
                          <option value="lanche">🍰 Lanche</option>
                          <option value="material">📚 Material</option>
                          <option value="evento">🎉 Evento</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descrição
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.descricao}
                      onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                      className="input-field"
                      placeholder="Descreva a transação"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Valor (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.valor}
                      onChange={(e) => setFormData({...formData, valor: e.target.value})}
                      className="input-field"
                      placeholder="0,00"
                    />
                  </div>

                  {formData.tipo === 'entrada' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Membro (opcional)
                      </label>
                      <input
                        type="text"
                        value={formData.membro}
                        onChange={(e) => setFormData({...formData, membro: e.target.value})}
                        className="input-field"
                        placeholder="Nome do membro ou célula"
                      />
                    </div>
                  )}

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      💰 Registrar Transação
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