'use client'

import { useState, useEffect } from 'react'
import { Star, User } from 'lucide-react'

interface Avaliacao {
  id: string
  nome: string
  nota: number
  comentario?: string
  foto?: string
  createdAt: string
}

interface AvaliacoesListProps {
  celulaId: string
}

export default function AvaliacoesList({ celulaId }: AvaliacoesListProps) {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAvaliacoes()
  }, [celulaId])

  const fetchAvaliacoes = async () => {
    try {
      const response = await fetch(`/api/avaliacoes?celulaId=${celulaId}`)
      if (response.ok) {
        const data = await response.json()
        setAvaliacoes(data)
      }
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error)
    }
    setLoading(false)
  }

  const renderStars = (nota: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((estrela) => (
          <Star
            key={estrela}
            className={`w-4 h-4 ${
              estrela <= nota
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">
        💬 Avaliações ({avaliacoes.length})
      </h3>

      {avaliacoes.length === 0 ? (
        <div className="card text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">
            Seja o primeiro a avaliar esta célula!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {avaliacoes.map((avaliacao) => (
            <div key={avaliacao.id} className="card">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {avaliacao.foto ? (
                    <img
                      src={avaliacao.foto}
                      alt={avaliacao.nome}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {avaliacao.nome}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {renderStars(avaliacao.nota)}
                        <span className="text-sm text-gray-500">
                          {formatDate(avaliacao.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {avaliacao.comentario && (
                    <p className="text-gray-700 leading-relaxed">
                      "{avaliacao.comentario}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}