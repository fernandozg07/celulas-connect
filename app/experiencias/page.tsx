'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Camera, Heart, Plus, MessageCircle, Calendar, MapPin } from 'lucide-react'

interface Experiencia {
  id: string
  autor: string
  celula: string
  titulo: string
  descricao: string
  foto: string
  data: string
  likes: number
  comentarios: number
  categoria: string
}

export default function ExperienciasPage() {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    autor: '',
    celula: '',
    titulo: '',
    descricao: '',
    categoria: 'testemunho',
    foto: ''
  })
  const [fotoPreview, setFotoPreview] = useState<string>('')

  useEffect(() => {
    carregarExperiencias()
  }, [])

  const carregarExperiencias = async () => {
    try {
      const response = await fetch('/api/experiencias')
      if (response.ok) {
        const data = await response.json()
        const experienciasFormatadas = data.map((exp: any) => ({
          ...exp,
          data: exp.createdAt.split('T')[0],
          comentarios: 0 // Implementar depois
        }))
        setExperiencias(experienciasFormatadas)
      }
    } catch (error) {
      console.error('Erro ao carregar experiências:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/experiencias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const novaExperiencia = await response.json()
        const experienciaFormatada = {
          ...novaExperiencia,
          data: novaExperiencia.createdAt.split('T')[0],
          comentarios: 0
        }
        setExperiencias([experienciaFormatada, ...experiencias])
        setFormData({ autor: '', celula: '', titulo: '', descricao: '', categoria: 'testemunho', foto: '' })
        setFotoPreview('')
        setShowForm(false)
      } else {
        console.error('Erro ao salvar experiência')
      }
    } catch (error) {
      console.error('Erro ao salvar experiência:', error)
    }
  }

  const handleLike = async (id: string) => {
    try {
      const response = await fetch('/api/experiencias', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      if (response.ok) {
        const experienciaAtualizada = await response.json()
        setExperiencias(experiencias.map(exp => 
          exp.id === id ? { ...exp, likes: experienciaAtualizada.likes } : exp
        ))
      }
    } catch (error) {
      console.error('Erro ao curtir experiência:', error)
    }
  }

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'batismo': return '🌊'
      case 'acao-social': return '🤝'
      case 'milagre': return '🙌'
      case 'testemunho': return '✨'
      case 'evento': return '🎉'
      default: return '💝'
    }
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'batismo': return 'bg-blue-100 text-blue-700'
      case 'acao-social': return 'bg-green-100 text-green-700'
      case 'milagre': return 'bg-yellow-100 text-yellow-700'
      case 'testemunho': return 'bg-purple-100 text-purple-700'
      case 'evento': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-3xl font-bold text-gray-800">CélulasConnect</span>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/buscar" className="hidden sm:block text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Buscar Células
              </Link>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary text-sm md:text-base px-4 py-2 md:px-6 md:py-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Compartilhar</span>
                <span className="sm:hidden">📸</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl mr-4">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
              Fotos & Experiências
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compartilhe os momentos especiais da sua célula e inspire outras comunidades com seus testemunhos!
          </p>
        </div>

        {/* Feed de Experiências */}
        <div className="space-y-8">
          {experiencias.map((exp) => (
            <div key={exp.id} className="card hover:shadow-2xl transition-all duration-300">
              {/* Header do Post */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{exp.autor.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.autor}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.celula}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(exp.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoriaColor(exp.categoria)}`}>
                  {getCategoriaIcon(exp.categoria)} {exp.categoria}
                </div>
              </div>

              {/* Título */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {exp.titulo}
              </h2>

              {/* Foto */}
              <div className="mb-6 rounded-2xl overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
                {exp.foto && exp.foto !== '/api/placeholder/400/300' ? (
                  <img 
                    src={exp.foto} 
                    alt={exp.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      const nextEl = e.currentTarget.nextElementSibling as HTMLElement
                      if (nextEl) nextEl.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div className="text-center text-gray-500" style={{display: exp.foto && exp.foto !== '/api/placeholder/400/300' ? 'none' : 'flex'}}>
                  <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-medium">Foto da experiencia</p>
                  <p className="text-sm">Adicione uma foto via URL</p>
                </div>
              </div>

              {/* Descrição */}
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                {exp.descricao}
              </p>

              {/* Ações */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(exp.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{exp.likes}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <MessageCircle className="w-5 h-5" />
                    <span>{exp.comentarios}</span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-semibold">
                  Compartilhar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Nova Experiência */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  📸 Compartilhar Experiência
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.autor}
                      onChange={(e) => setFormData({...formData, autor: e.target.value})}
                      className="input-field"
                      placeholder="Como você gostaria de ser identificado?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome da Célula
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.celula}
                      onChange={(e) => setFormData({...formData, celula: e.target.value})}
                      className="input-field"
                      placeholder="Ex: Célula Esperança"
                    />
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
                      <option value="testemunho">✨ Testemunho</option>
                      <option value="batismo">🌊 Batismo</option>
                      <option value="acao-social">🤝 Ação Social</option>
                      <option value="milagre">🙌 Milagre</option>
                      <option value="evento">🎉 Evento</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Título da Experiência
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.titulo}
                      onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                      className="input-field"
                      placeholder="Dê um título marcante para sua experiência"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Conte sua Experiência
                    </label>
                    <textarea
                      required
                      value={formData.descricao}
                      onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                      rows={5}
                      className="input-field"
                      placeholder="Compartilhe os detalhes da sua experiência, como Deus agiu e o que isso significou para sua célula..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Foto (opcional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                      {fotoPreview ? (
                        <div className="relative">
                          <img src={fotoPreview} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-4" />
                          <button
                            type="button"
                            onClick={() => {
                              setFotoPreview('')
                              setFormData({...formData, foto: ''})
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Camera className="w-8 h-8 text-blue-600" />
                          </div>
                          <p className="text-gray-600 mb-4">Adicionar Foto</p>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (e) => {
                                const result = e.target?.result as string
                                setFotoPreview(result)
                                setFormData({...formData, foto: result})
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="hidden"
                          id="foto-upload"
                        />
                        <label
                          htmlFor="foto-upload"
                          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                        >
                          📸 Escolher da Galeria
                        </label>
                        
                        <div className="text-sm text-gray-500">
                          <p>Ou cole o link de uma foto:</p>
                          <input
                            type="url"
                            value={formData.foto.startsWith('data:') ? '' : formData.foto}
                            onChange={(e) => {
                              setFormData({...formData, foto: e.target.value})
                              if (e.target.value) setFotoPreview(e.target.value)
                            }}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://exemplo.com/foto.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-blue-700">
                      <Camera className="w-4 h-4 inline mr-2" />
                      Sua experiência inspirará outras células e fortalecerá nossa comunidade de fé!
                    </p>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      📸 Compartilhar Experiência
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