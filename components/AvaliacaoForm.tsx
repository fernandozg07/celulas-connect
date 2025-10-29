'use client'

import { useState } from 'react'
import { Star, Camera, Send } from 'lucide-react'

interface AvaliacaoFormProps {
  celulaId: string
  onSuccess?: () => void
}

export default function AvaliacaoForm({ celulaId, onSuccess }: AvaliacaoFormProps) {
  const [nome, setNome] = useState('')
  const [nota, setNota] = useState(0)
  const [comentario, setComentario] = useState('')
  const [foto, setFoto] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome || nota === 0) return

    setLoading(true)
    try {
      const response = await fetch('/api/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          celulaId,
          nome,
          nota,
          comentario,
          foto
        })
      })

      if (response.ok) {
        setNome('')
        setNota(0)
        setComentario('')
        setFoto('')
        onSuccess?.()
        alert('Avaliação enviada com sucesso!')
      } else {
        alert('Erro ao enviar avaliação')
      }
    } catch (error) {
      alert('Erro ao enviar avaliação')
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        ⭐ Avalie esta Célula
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Seu Nome
          </label>
          <input
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="input-field"
            placeholder="Como você gostaria de aparecer"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sua Nota (1 a 5 estrelas)
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((estrela) => (
              <button
                key={estrela}
                type="button"
                onClick={() => setNota(estrela)}
                className={`p-2 rounded-lg transition-colors ${
                  estrela <= nota
                    ? 'text-yellow-500 bg-yellow-50'
                    : 'text-gray-300 hover:text-yellow-400'
                }`}
              >
                <Star className="w-8 h-8 fill-current" />
              </button>
            ))}
          </div>
          {nota > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {nota === 1 && '😞 Muito ruim'}
              {nota === 2 && '😐 Ruim'}
              {nota === 3 && '😊 Regular'}
              {nota === 4 && '😄 Bom'}
              {nota === 5 && '🤩 Excelente'}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Comentário (opcional)
          </label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="input-field h-24 resize-none"
            placeholder="Conte sua experiência com esta célula..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Foto (opcional)
          </label>
          <div className="flex items-center space-x-3">
            <Camera className="w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="input-field"
              placeholder="URL da sua foto ou da célula"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Cole o link de uma foto do Google Fotos, Instagram, etc.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !nome || nota === 0}
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Enviando...' : 'Enviar Avaliação'}</span>
        </button>
      </form>
    </div>
  )
}