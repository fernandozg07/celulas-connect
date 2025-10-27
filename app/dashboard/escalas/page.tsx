'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Membro {
  id: string
  nome: string
  equipes: string[]
}

interface Equipe {
  id: string
  nome: string
  funcoes: string[]
}

interface EscalaItem {
  membroId: string
  membroNome: string
  equipeId: string
  equipeNome: string
  funcao: string
}

interface Escala {
  id: string
  data: string
  celulaId: string
  celulaNome: string
  itens: EscalaItem[]
  observacoes?: string
}

export default function EscalasPage() {
  const [escalas, setEscalas] = useState<Escala[]>([])
  const [equipes, setEquipes] = useState<Equipe[]>([])
  const [membros, setMembros] = useState<Membro[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingEscala, setEditingEscala] = useState<Escala | null>(null)
  const [formData, setFormData] = useState({
    data: '',
    celulaId: '1',
    observacoes: '',
    itens: [] as EscalaItem[]
  })

  useEffect(() => {
    // Simulando dados
    const equipesMock: Equipe[] = [
      {
        id: '1',
        nome: 'Louvor',
        funcoes: ['Vocal', 'Violão', 'Teclado', 'Bateria']
      },
      {
        id: '2',
        nome: 'Mídia',
        funcoes: ['Som', 'Projeção', 'Transmissão']
      },
      {
        id: '3',
        nome: 'Recepção',
        funcoes: ['Porteiro', 'Café', 'Limpeza']
      }
    ]

    const membrosMock: Membro[] = [
      { id: '1', nome: 'Ana Silva', equipes: ['1', '3'] },
      { id: '2', nome: 'Carlos Santos', equipes: ['1'] },
      { id: '3', nome: 'Maria Oliveira', equipes: ['2'] },
      { id: '4', nome: 'João Costa', equipes: ['2', '3'] },
      { id: '5', nome: 'Paula Lima', equipes: ['1', '2'] }
    ]

    const escalasMock: Escala[] = [
      {
        id: '1',
        data: '2024-01-15',
        celulaId: '1',
        celulaNome: 'Célula Esperança',
        observacoes: 'Reunião especial de oração',
        itens: [
          {
            membroId: '1',
            membroNome: 'Ana Silva',
            equipeId: '1',
            equipeNome: 'Louvor',
            funcao: 'Vocal'
          },
          {
            membroId: '2',
            membroNome: 'Carlos Santos',
            equipeId: '1',
            equipeNome: 'Louvor',
            funcao: 'Violão'
          },
          {
            membroId: '3',
            membroNome: 'Maria Oliveira',
            equipeId: '2',
            equipeNome: 'Mídia',
            funcao: 'Som'
          }
        ]
      }
    ]

    setEquipes(equipesMock)
    setMembros(membrosMock)
    setEscalas(escalasMock)
  }, [])

  const adicionarItem = () => {
    setFormData({
      ...formData,
      itens: [
        ...formData.itens,
        {
          membroId: '',
          membroNome: '',
          equipeId: '',
          equipeNome: '',
          funcao: ''
        }
      ]
    })
  }

  const removerItem = (index: number) => {
    setFormData({
      ...formData,
      itens: formData.itens.filter((_, i) => i !== index)
    })
  }

  const atualizarItem = (index: number, campo: string, valor: string) => {
    const novosItens = [...formData.itens]
    
    if (campo === 'membroId') {
      const membro = membros.find(m => m.id === valor)
      novosItens[index] = {
        ...novosItens[index],
        membroId: valor,
        membroNome: membro?.nome || ''
      }
    } else if (campo === 'equipeId') {
      const equipe = equipes.find(e => e.id === valor)
      novosItens[index] = {
        ...novosItens[index],
        equipeId: valor,
        equipeNome: equipe?.nome || '',
        funcao: '' // Reset função quando muda equipe
      }
    } else {
      novosItens[index] = {
        ...novosItens[index],
        [campo]: valor
      }
    }
    
    setFormData({
      ...formData,
      itens: novosItens
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingEscala) {
      setEscalas(escalas.map(e => 
        e.id === editingEscala.id 
          ? { 
              ...e, 
              data: formData.data,
              observacoes: formData.observacoes,
              itens: formData.itens
            }
          : e
      ))
    } else {
      const novaEscala: Escala = {
        id: Date.now().toString(),
        data: formData.data,
        celulaId: formData.celulaId,
        celulaNome: 'Célula Esperança',
        observacoes: formData.observacoes,
        itens: formData.itens
      }
      setEscalas([...escalas, novaEscala])
    }
    
    setShowForm(false)
    setEditingEscala(null)
    setFormData({
      data: '',
      celulaId: '1',
      observacoes: '',
      itens: []
    })
  }

  const handleEdit = (escala: Escala) => {
    setEditingEscala(escala)
    setFormData({
      data: escala.data,
      celulaId: escala.celulaId,
      observacoes: escala.observacoes || '',
      itens: escala.itens
    })
    setShowForm(true)
  }

  const handleDelete = (escalaId: string) => {
    if (confirm('Tem certeza que deseja excluir esta escala?')) {
      setEscalas(escalas.filter(e => e.id !== escalaId))
    }
  }

  const getMembrosDisponiveis = (equipeId: string) => {
    return membros.filter(m => m.equipes.includes(equipeId))
  }

  const getFuncoesEquipe = (equipeId: string) => {
    const equipe = equipes.find(e => e.id === equipeId)
    return equipe?.funcoes || []
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-2xl font-bold text-primary">
                CélulasConnect
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Escalas</span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Escala
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lista de Escalas */}
        <div className="space-y-6">
          {escalas.map((escala) => (
            <div key={escala.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Escala - {new Date(escala.data).toLocaleDateString('pt-BR')}
                  </h3>
                  <p className="text-gray-600">{escala.celulaNome}</p>
                  {escala.observacoes && (
                    <p className="text-sm text-gray-500 mt-1">{escala.observacoes}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(escala)}
                    className="text-gray-400 hover:text-primary"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(escala.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {escala.itens.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{item.membroNome}</div>
                    <div className="text-sm text-primary">{item.equipeNome}</div>
                    <div className="text-sm text-gray-600">{item.funcao}</div>
                  </div>
                ))}
              </div>

              {escala.itens.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhum membro escalado
                </div>
              )}
            </div>
          ))}
        </div>

        {escalas.length === 0 && (
          <div className="card text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Nenhuma escala criada ainda.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Criar Primeira Escala
            </button>
          </div>
        )}

        {/* Modal de Formulário */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingEscala ? 'Editar Escala' : 'Nova Escala'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data da Reunião
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.data}
                        onChange={(e) => setFormData({...formData, data: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Observações
                      </label>
                      <input
                        type="text"
                        value={formData.observacoes}
                        onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Observações opcionais"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Membros Escalados
                      </h3>
                      <button
                        type="button"
                        onClick={adicionarItem}
                        className="btn-primary flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Membro
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.itens.map((item, index) => (
                        <div key={index} className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Equipe
                            </label>
                            <select
                              value={item.equipeId}
                              onChange={(e) => atualizarItem(index, 'equipeId', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="">Selecione a equipe</option>
                              {equipes.map(equipe => (
                                <option key={equipe.id} value={equipe.id}>
                                  {equipe.nome}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Membro
                            </label>
                            <select
                              value={item.membroId}
                              onChange={(e) => atualizarItem(index, 'membroId', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                              disabled={!item.equipeId}
                            >
                              <option value="">Selecione o membro</option>
                              {getMembrosDisponiveis(item.equipeId).map(membro => (
                                <option key={membro.id} value={membro.id}>
                                  {membro.nome}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Função
                            </label>
                            <select
                              value={item.funcao}
                              onChange={(e) => atualizarItem(index, 'funcao', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                              disabled={!item.equipeId}
                            >
                              <option value="">Selecione a função</option>
                              {getFuncoesEquipe(item.equipeId).map(funcao => (
                                <option key={funcao} value={funcao}>
                                  {funcao}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() => removerItem(index)}
                              className="text-red-600 hover:text-red-800 p-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {formData.itens.length === 0 && (
                      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                        Nenhum membro escalado. Clique em "Adicionar Membro" para começar.
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditingEscala(null)
                      }}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingEscala ? 'Salvar Alterações' : 'Criar Escala'}
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