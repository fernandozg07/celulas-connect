'use client'

import { useState } from 'react'

export default function TestBanco() {
  const [resultado, setResultado] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testarBanco = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-db')
      const data = await response.json()
      setResultado(data)
    } catch (error) {
      setResultado({
        status: 'error',
        message: 'Erro na requisição',
        error: error
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          🧪 Teste de Conexão do Banco
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
            onClick={testarBanco}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '🔄 Testando...' : '🚀 Testar Conexão do Banco'}
          </button>
        </div>

        {resultado && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className={`p-4 rounded-lg mb-4 ${
              resultado.status === 'success' 
                ? 'bg-green-100 border border-green-300' 
                : 'bg-red-100 border border-red-300'
            }`}>
              <h2 className="text-xl font-semibold mb-2">
                {resultado.status === 'success' ? '✅ Sucesso!' : '❌ Erro!'}
              </h2>
              <p className="text-gray-700">{resultado.message}</p>
            </div>

            {resultado.status === 'success' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">📊 Contadores</h3>
                  <ul className="space-y-1">
                    <li>Igrejas: {resultado.counts?.igrejas || 0}</li>
                    <li>Usuários: {resultado.counts?.usuarios || 0}</li>
                    <li>Células: {resultado.counts?.celulas || 0}</li>
                    <li>Membros: {resultado.counts?.membros || 0}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">📋 Amostras</h3>
                  <ul className="space-y-1">
                    <li>Igreja: {resultado.samples?.igreja}</li>
                    <li>Célula: {resultado.samples?.celula}</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🔧 Detalhes Técnicos</h3>
              <ul className="space-y-1 text-sm">
                <li>Ambiente: {resultado.environment}</li>
                <li>Banco: {resultado.database}</li>
                <li>Timestamp: {resultado.timestamp}</li>
                {resultado.error && (
                  <li className="text-red-600">Erro: {resultado.error}</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}