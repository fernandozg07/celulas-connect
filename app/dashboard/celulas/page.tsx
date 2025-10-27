'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Users, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

interface Celula {
  id: string
  nome: string
  lider: string
  whatsapp: string
  dia: string
  horario: string
  descricao: string
  faixaEtaria: string
  endereco: string
  bairro: string
  membros: number
}

export default function CelulasPage() {
  const [celulas, setCelulas] = useState<Celula[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingCelula, setEditingCelula] = useState<Celula | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    lider: '',
    whatsapp: '',
    dia: '',
    horario: '',
    descricao: '',
    faixaEtaria: 'adultos',
    endereco: '',
    bairro: ''
  })

  useEffect(() => {
    // Simulando dados
    const celulasMock: Celula[] = [
      {
        id: '1',
        nome: 'Célula Esperança',
        lider: 'João Silva',
        whatsapp: '11999999999',
        dia: 'Terça-feira',
        horario: '19:30',
        descricao: 'Uma célula acolhedora focada no crescimento espiritual',
        faixaEtaria: 'adultos',
        endereco: 'Rua das Flores, 123',
        bairro: 'Vila Madalena',
        membros: 15
      },
      {
        id: '2',
        nome: 'Célula Jovens Unidos',
        lider: 'Maria Santos',
        whatsapp: '11888888888',
        dia: 'Quinta-feira',
        horario: '20:00',
        descricao: 'Célula dinâmica para jovens de 18 a 30 anos',
        faixaEtaria: 'jovens',
        endereco: 'Av. Paulista, 456',
        bairro: 'Pinheiros',
        membros: 12
      }
    ]
    setCelulas(celulasMock)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingCelula) {
      // Editar célula existente
      setCelulas(celulas.map(c => 
        c.id === editingCelula.id 
          ? { ...c, ...formData, membros: c.membros }
          : c
      ))
    } else {
      // Criar nova célula
      const novaCelula: Celula = {
        id: Date.now().toString(),
        ...formData,
        membros: 0
      }
      setCelulas([...celulas, novaCelula])
    }
    
    setShowForm(false)
    setEditingCelula(null)
    setFormData({
      nome: '',
      lider: '',
      whatsapp: '',
      dia: '',
      horario: '',
      descricao: '',
      faixaEtaria: 'adultos',
      endereco: '',
      bairro: ''
    })
  }

  const handleEdit = (celula: Celula) => {
    setEditingCelula(celula)
    setFormData({
      nome: celula.nome,
      lider: celula.lider,
      whatsapp: celula.whatsapp,
      dia: celula.dia,
      horario: celula.horario,
      descricao: celula.descricao,
      faixaEtaria: celula.faixaEtaria,
      endereco: celula.endereco,
      bairro: celula.bairro
    })
    setShowForm(true)
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
              <span className="text-gray-600">Minhas Células</span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Célula
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lista de Células */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {celulas.map((celula) => (
            <div key={celula.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {celula.nome}
                </h3>
                <button
                  onClick={() => handleEdit(celula)}
                  className="text-gray-400 hover:text-primary"
                >
                  <Edit className="w-4 h-4" />
                </button>
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

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {celula.membros} membros
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {celula.faixaEtaria}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Formulário */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingCelula ? 'Editar Célula' : 'Nova Célula'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome da Célula
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome do Líder
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lider}
                        onChange={(e) => setFormData({...formData, lider: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        WhatsApp do Líder
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="11999999999"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Faixa Etária
                      </label>
                      <select
                        value={formData.faixaEtaria}
                        onChange={(e) => setFormData({...formData, faixaEtaria: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="jovens">Jovens (18-30)</option>
                        <option value="adultos">Adultos (30-60)</option>
                        <option value="idosos">Idosos (60+)</option>
                        <option value="todas">Todas as idades</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dia da Semana
                      </label>
                      <select
                        required
                        value={formData.dia}
                        onChange={(e) => setFormData({...formData, dia: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Selecione o dia</option>
                        <option value="Segunda-feira">Segunda-feira</option>
                        <option value="Terça-feira">Terça-feira</option>
                        <option value="Quarta-feira">Quarta-feira</option>
                        <option value="Quinta-feira">Quinta-feira</option>
                        <option value="Sexta-feira">Sexta-feira</option>
                        <option value="Sábado">Sábado</option>
                        <option value="Domingo">Domingo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Horário
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.horario}
                        onChange={(e) => setFormData({...formData, horario: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      required
                      value={formData.descricao}
                      onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço Completo
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.endereco}
                        onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bairro
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.bairro}
                        onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditingCelula(null)
                      }}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingCelula ? 'Salvar Alterações' : 'Criar Célula'}
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