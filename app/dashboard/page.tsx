'use client'

import { useState, useEffect } from 'react'
import { Users, Calendar, Plus, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalCelulas: 0,
    totalMembros: 0,
    proximasEscalas: 0,
    frequenciaMedia: 0
  })
  const [celulasProximas, setCelulasProximas] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    const userParsed = JSON.parse(userData)
    setUser(userParsed)
    
    // Carregar estatísticas
    carregarEstatisticas(userParsed.id)
  }, [router])
  
  const carregarEstatisticas = async (userId: string) => {
    try {
      const response = await fetch(`/api/celulas/gerenciar?userId=${userId}`)
      if (response.ok) {
        const celulas = await response.json()
        const totalMembros = celulas.reduce((acc: number, celula: any) => acc + celula.membros, 0)
        
        setStats({
          totalCelulas: celulas.length,
          totalMembros,
          proximasEscalas: 2, // Implementar depois
          frequenciaMedia: 85 // Implementar depois
        })
        
        // Próximas reuniões (próximos 2 dias)
        const hoje = new Date().getDay()
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
        
        const proximasCelulas = celulas.filter((celula: any) => {
          const diaCelula = diasSemana.findIndex(dia => celula.dia.includes(dia))
          return diaCelula >= hoje && diaCelula <= hoje + 2
        }).slice(0, 2)
        
        setCelulasProximas(proximasCelulas)
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CélulasConnect</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-6">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-500">Bem-vindo,</p>
                <p className="font-semibold text-gray-900">{user.nome}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 md:px-4 md:py-2 rounded-xl flex items-center transition-colors font-medium text-sm md:text-base"
              >
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="card group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-600 mb-1">Total de Células</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCelulas}</p>
              </div>
            </div>
          </div>

          <div className="card group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-600 mb-1">Total de Membros</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalMembros}</p>
              </div>
            </div>
          </div>

          <div className="card group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-2xl shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-600 mb-1">Próximas Escalas</p>
                <p className="text-3xl font-bold text-gray-900">{stats.proximasEscalas}</p>
              </div>
            </div>
          </div>

          <div className="card group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="ml-6">
                <p className="text-sm font-medium text-gray-600 mb-1">Frequência Média</p>
                <p className="text-3xl font-bold text-gray-900">{stats.frequenciaMedia}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <Link href="/dashboard/celulas" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Plus className="w-5 h-5 text-primary mr-3" />
                <span>Cadastrar Nova Célula</span>
              </Link>
              
              <Link href="/dashboard/frequencia" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Users className="w-5 h-5 text-green-600 mr-3" />
                <span>Registrar Frequência</span>
              </Link>
              
              <Link href="/dashboard/escalas" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Calendar className="w-5 h-5 text-yellow-600 mr-3" />
                <span>Gerenciar Escalas</span>
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Reuniões</h3>
            <div className="space-y-3">
              {celulasProximas.length > 0 ? (
                celulasProximas.map((celula, index) => (
                  <div key={celula.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{celula.nome}</p>
                      <p className="text-sm text-gray-600">{celula.dia}, {celula.horario}</p>
                    </div>
                    <span className="text-sm text-primary">
                      {index === 0 ? 'Próxima' : 'Em breve'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-center text-gray-500">
                  Nenhuma reunião próxima
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="mt-6 md:mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu Principal</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/celulas" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                <Users className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold">Minhas Células</h4>
                <p className="text-sm text-gray-600">Gerencie suas células e membros</p>
              </Link>
              
              <Link href="/dashboard/frequencia" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                <Calendar className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold">Frequência</h4>
                <p className="text-sm text-gray-600">Controle de presença dos membros</p>
              </Link>
              
              <Link href="/dashboard/escalas" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                <Settings className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold">Escalas</h4>
                <p className="text-sm text-gray-600">Organize equipes e funções</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}