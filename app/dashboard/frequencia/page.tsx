'use client'

import { useState, useEffect } from 'react'
import { Calendar, Users, Check, X } from 'lucide-react'
import Link from 'next/link'

interface Membro {
  id: string
  nome: string
  telefone?: string
  presente?: boolean
}

interface Celula {
  id: string
  nome: string
  membros: Membro[]
}

export default function FrequenciaPage() {
  const [celulas, setCelulas] = useState<Celula[]>([])
  const [celulaSelecionada, setCelulaSelecionada] = useState<string>('')
  const [dataReuniao, setDataReuniao] = useState('')
  const [membrosFrequencia, setMembrosFrequencia] = useState<Membro[]>([])
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    // Simulando dados
    const celulasMock: Celula[] = [
      {
        id: '1',
        nome: 'Célula Esperança',
        membros: [
          { id: '1', nome: 'Ana Silva', telefone: '11999999999' },
          { id: '2', nome: 'Carlos Santos', telefone: '11888888888' },
          { id: '3', nome: 'Maria Oliveira', telefone: '11777777777' },
          { id: '4', nome: 'João Costa', telefone: '11666666666' },
          { id: '5', nome: 'Paula Lima', telefone: '11555555555' }
        ]
      },
      {
        id: '2',
        nome: 'Célula Jovens Unidos',
        membros: [
          { id: '6', nome: 'Pedro Alves', telefone: '11444444444' },
          { id: '7', nome: 'Lucia Ferreira', telefone: '11333333333' },
          { id: '8', nome: 'Rafael Souza', telefone: '11222222222' },
          { id: '9', nome: 'Camila Rocha', telefone: '11111111111' }
        ]
      }
    ]
    setCelulas(celulasMock)
    
    // Definir data atual como padrão
    const hoje = new Date().toISOString().split('T')[0]
    setDataReuniao(hoje)
  }, [])

  useEffect(() => {
    if (celulaSelecionada) {
      const celula = celulas.find(c => c.id === celulaSelecionada)
      if (celula) {
        setMembrosFrequencia(celula.membros.map(m => ({ ...m, presente: false })))
      }
    }
  }, [celulaSelecionada, celulas])

  const togglePresenca = (membroId: string) => {
    setMembrosFrequencia(membros =>
      membros.map(m =>
        m.id === membroId ? { ...m, presente: !m.presente } : m
      )
    )
  }

  const marcarTodosPresentes = () => {
    setMembrosFrequencia(membros =>
      membros.map(m => ({ ...m, presente: true }))
    )
  }

  const marcarTodosAusentes = () => {
    setMembrosFrequencia(membros =>
      membros.map(m => ({ ...m, presente: false }))
    )
  }

  const salvarFrequencia = async () => {
    if (!celulaSelecionada || !dataReuniao) {
      alert('Selecione uma célula e data')
      return
    }

    setSalvando(true)
    
    // Simulando salvamento
    setTimeout(() => {
      setSalvando(false)
      alert('Frequência salva com sucesso!')
      
      // Reset do formulário
      setCelulaSelecionada('')
      setDataReuniao(new Date().toISOString().split('T')[0])
      setMembrosFrequencia([])
    }, 1000)
  }

  const presentes = membrosFrequencia.filter(m => m.presente).length
  const ausentes = membrosFrequencia.filter(m => !m.presente).length
  const percentualPresenca = membrosFrequencia.length > 0 
    ? Math.round((presentes / membrosFrequencia.length) * 100) 
    : 0

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
              <span className="text-gray-600">Controle de Frequência</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seleção de Célula e Data */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Registrar Frequência
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecionar Célula
              </label>
              <select
                value={celulaSelecionada}
                onChange={(e) => setCelulaSelecionada(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Escolha uma célula</option>
                {celulas.map(celula => (
                  <option key={celula.id} value={celula.id}>
                    {celula.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data da Reunião
              </label>
              <input
                type="date"
                value={dataReuniao}
                onChange={(e) => setDataReuniao(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Estatísticas */}
          {membrosFrequencia.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{presentes}</div>
                <div className="text-sm text-green-600">Presentes</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">{ausentes}</div>
                <div className="text-sm text-red-600">Ausentes</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{percentualPresenca}%</div>
                <div className="text-sm text-blue-600">Presença</div>
              </div>
            </div>
          )}

          {/* Ações Rápidas */}
          {membrosFrequencia.length > 0 && (
            <div className="flex space-x-4 mb-6">
              <button
                onClick={marcarTodosPresentes}
                className="btn-primary flex items-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Marcar Todos Presentes
              </button>
              <button
                onClick={marcarTodosAusentes}
                className="btn-secondary flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Marcar Todos Ausentes
              </button>
            </div>
          )}
        </div>

        {/* Lista de Membros */}
        {membrosFrequencia.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Lista de Membros
            </h3>
            
            <div className="space-y-2">
              {membrosFrequencia.map((membro) => (
                <div
                  key={membro.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    membro.presente
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => togglePresenca(membro.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                      membro.presente
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {membro.presente && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {membro.nome}
                      </div>
                      {membro.telefone && (
                        <div className="text-sm text-gray-500">
                          {membro.telefone}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    membro.presente
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {membro.presente ? 'Presente' : 'Ausente'}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={salvarFrequencia}
                disabled={salvando}
                className="btn-primary disabled:opacity-50"
              >
                {salvando ? 'Salvando...' : 'Salvar Frequência'}
              </button>
            </div>
          </div>
        )}

        {celulaSelecionada && membrosFrequencia.length === 0 && (
          <div className="card text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Esta célula ainda não possui membros cadastrados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}