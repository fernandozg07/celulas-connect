'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '../../lib/useToast'
import Toast from '../../components/Toast'
import { Users } from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    nomeIgreja: '',
    pastor: '',
    liderPrincipal: '',
    liderTreinamento: '',
    anfitriao: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toasts, success, error, removeToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin 
        ? { email: formData.email, senha: formData.senha }
        : formData

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        error(data.error || 'Erro ao processar solicitação')
        setLoading(false)
        return
      }

      success(isLogin ? 'Login realizado com sucesso!' : 'Cadastro realizado com sucesso!')
      localStorage.setItem('user', JSON.stringify(data.user))
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)

    } catch (err) {
      console.error('Erro:', err)
      error('Erro de conexão. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex justify-center items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Users className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Células Saudáveis</h1>
        </Link>
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
          {isLogin ? 'Bem-vindo de volta!' : 'Cadastre sua igreja'}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {isLogin ? 'Entre e continue fortalecendo células saudáveis' : 'Crie sua conta e comece a liderar células saudáveis'}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="input-field"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome da Igreja
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nomeIgreja}
                    onChange={(e) => setFormData({...formData, nomeIgreja: e.target.value})}
                    className="input-field"
                    placeholder="Nome da sua igreja"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pastor Responsável
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pastor}
                    onChange={(e) => setFormData({...formData, pastor: e.target.value})}
                    className="input-field"
                    placeholder="Nome do pastor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Líder Principal
                  </label>
                  <input
                    type="text"
                    value={formData.liderPrincipal || ''}
                    onChange={(e) => setFormData({...formData, liderPrincipal: e.target.value})}
                    className="input-field"
                    placeholder="Nome do líder principal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Líder em Treinamento
                  </label>
                  <input
                    type="text"
                    value={formData.liderTreinamento || ''}
                    onChange={(e) => setFormData({...formData, liderTreinamento: e.target.value})}
                    className="input-field"
                    placeholder="Nome do líder em treinamento"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Anfitrião
                  </label>
                  <input
                    type="text"
                    value={formData.anfitriao || ''}
                    onChange={(e) => setFormData({...formData, anfitriao: e.target.value})}
                    className="input-field"
                    placeholder="Nome do anfitrião (dono da casa)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="input-field"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.endereco}
                    onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                    className="input-field"
                    placeholder="Endereço da igreja"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cidade}
                      onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                      className="input-field"
                      placeholder="Cidade"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estado
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value})}
                      className="input-field"
                      placeholder="SP"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-field"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                value={formData.senha}
                onChange={(e) => setFormData({...formData, senha: e.target.value})}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Processando...' : (isLogin ? '🔑 Entrar' : '⛪ Cadastrar Igreja')}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
              >
                {isLogin ? '🆕 Cadastre sua igreja' : '🔑 Faça login'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}