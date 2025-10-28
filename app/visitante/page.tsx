'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, MapPin, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react'

export default function VisitantePage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    celular: '',
    cep: ''
  })
  const [celulasProximas, setCelulasProximas] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular busca por CEP
    setTimeout(() => {
      const celulas = [
        {
          id: '1',
          nome: 'Célula Esperança',
          lider: 'Carlos Oliveira',
          whatsapp: '11999999999',
          dia: 'Terça-feira',
          horario: '19:30',
          endereco: 'Rua das Palmeiras, 789',
          bairro: 'Vila Madalena',
          distancia: '1.2 km',
          igreja: 'Igreja Batista Central'
        },
        {
          id: '2',
          nome: 'Célula Jovens Unidos',
          lider: 'Ana Costa',
          whatsapp: '11888888888',
          dia: 'Quinta-feira',
          horario: '20:00',
          endereco: 'Rua dos Pinheiros, 456',
          bairro: 'Pinheiros',
          distancia: '2.1 km',
          igreja: 'Igreja Metodista São Paulo'
        }
      ]
      setCelulasProximas(celulas)
      setLoading(false)
      setStep(2)
    }, 2000)
  }

  const handleEscolherCelula = (celula: any) => {
    // Simular notificação ao líder
    alert(`Notificação enviada para ${celula.lider}!\n\nMensagem: "Você receberá um visitante hoje em sua célula.\nNome: ${formData.nome}\nContato: ${formData.celular}"`)
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Células Saudáveis</span>
            </Link>
            <Link href="/buscar" className="btn-primary text-sm md:text-base px-4 py-2 md:px-8 md:py-3">
              🔍 Buscar Células
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === 1 && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                🙏 Seja Bem-vindo!
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Não faz parte de nenhuma igreja? Sem problema! Encontre uma célula saudável perto de você e comece sua jornada espiritual.
              </p>
            </div>

            {/* Formulário */}
            <div className="card max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Encontre Células Próximas
                </h2>
                <p className="text-gray-600">
                  Preencha seus dados e encontraremos células saudáveis na sua região
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    Celular (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.celular}
                    onChange={(e) => setFormData({...formData, celular: e.target.value})}
                    className="input-field"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cep}
                    onChange={(e) => setFormData({...formData, cep: e.target.value})}
                    className="input-field"
                    placeholder="00000-000"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50"
                >
                  {loading ? '🔍 Buscando células próximas...' : '🔍 Encontrar Células Próximas'}
                </button>
              </form>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                🎉 Encontramos células para você!
              </h1>
              <p className="text-xl text-gray-600">
                Olá <strong>{formData.nome}</strong>, aqui estão as células saudáveis mais próximas:
              </p>
            </div>

            <div className="grid gap-8">
              {celulasProximas.map((celula) => (
                <div key={celula.id} className="card hover:shadow-2xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{celula.nome}</h3>
                      <p className="text-gray-600">{celula.igreja}</p>
                    </div>
                    <div className="bg-green-100 px-4 py-2 rounded-full">
                      <span className="text-green-700 font-semibold">{celula.distancia}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-5 h-5 mr-3" />
                        <span>Líder: {celula.lider}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-5 h-5 mr-3" />
                        <span>{celula.dia} às {celula.horario}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-3" />
                        <span>{celula.endereco}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-3" />
                        <span>{celula.bairro}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEscolherCelula(celula)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center"
                  >
                    ✨ Quero Participar desta Célula
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <div className="card max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 Tudo Pronto!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              O líder da célula foi notificado e entrará em contato com você em breve pelo WhatsApp <strong>{formData.celular}</strong>.
            </p>
            
            <div className="bg-green-50 p-6 rounded-xl mb-8">
              <h3 className="font-bold text-green-800 mb-2">📱 Próximos Passos:</h3>
              <ul className="text-green-700 space-y-2">
                <li>• Aguarde o contato do líder</li>
                <li>• Confirme sua presença na próxima reunião</li>
                <li>• Prepare-se para uma experiência transformadora!</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/o-que-e-celula" className="btn-secondary">
                📖 Saiba Mais sobre Células
              </Link>
              <Link href="/downloads" className="btn-primary">
                📚 Material Gratuito
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}