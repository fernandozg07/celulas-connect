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
    categoria: 'testemunho'
  })

  useEffect(() => {
    // Dados mock de experiências
    const experienciasMock: Experiencia[] = [
      {
        id: '1',
        autor: 'Maria Santos',
        celula: 'Célula Esperança',
        titulo: 'Batismo na Praia - Momento Inesquecível! 🌊',
        descricao: 'Que alegria imensa ver 3 irmãos sendo batizados hoje! Foi um momento de muita emoção e presença de Deus. Nossa célula cresceu não só em número, mas em fé e união. Glória a Deus! 🙏✨',
        foto: '/api/placeholder/400/300',
        data: '2024-01-15',
        likes: 47,
        comentarios: 12,
        categoria: 'batismo'
      },
      {
        id: '2',
        autor: 'João Silva',
        celula: 'Célula Jovens Unidos',
        titulo: 'Ação Social no Bairro - Amor em Prática ❤️',
        descricao: 'Nossa célula se mobilizou para distribuir cestas básicas e roupas para famílias carentes do bairro. Ver o sorriso das crianças e a gratidão das mães foi o maior presente que poderíamos receber. Jesus nos ensina a amar através de ações! 🤝',
        foto: '/api/placeholder/400/300',
        data: '2024-01-14',
        likes: 63,
        comentarios: 18,
        categoria: 'acao-social'
      },
      {
        id: '3',
        autor: 'Ana Costa',
        celula: 'Célula Família Abençoada',
        titulo: 'Cura Milagrosa na Oração 🙌',
        descricao: 'Durante nossa reunião de oração, nossa irmã Carla foi completamente curada de uma dor nas costas que a incomodava há meses. Deus ainda faz milagres! Que testemunho poderoso para toda nossa célula. Aleluia! 🙏',
        foto: '/api/placeholder/400/300',
        data: '2024-01-13',
        likes: 89,
        comentarios: 25,
        categoria: 'milagre'
      }
    ]
    setExperiencias(experienciasMock)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const novaExperiencia: Experiencia = {
      id: Date.now().toString(),
      autor: formData.autor,
      celula: formData.celula,
      titulo: formData.titulo,
      descricao: formData.descricao,
      foto: '/api/placeholder/400/300',
      data: new Date().toISOString().split('T')[0],
      likes: 0,
      comentarios: 0,
      categoria: formData.categoria
    }

    setExperiencias([novaExperiencia, ...experiencias])
    setFormData({ autor: '', celula: '', titulo: '', descricao: '', categoria: 'testemunho' })
    setShowForm(false)
  }

  const handleLike = (id: string) => {
    setExperiencias(experiencias.map(exp => 
      exp.id === id ? { ...exp, likes: exp.likes + 1 } : exp
    ))
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
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Camera className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Células Saudáveis</span>
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
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            📸 Fotos & Experiências
          </h1>
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
              <div className="mb-6 rounded-2xl overflow-hidden bg-gray-100 h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-medium">Foto da experiência</p>
                  <p className="text-sm">Upload em desenvolvimento</p>
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
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload de foto em desenvolvimento</p>
                      <p className="text-sm text-gray-500">Em breve você poderá adicionar fotos às suas experiências</p>
                      <button type="button" className="mt-3 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed">
                        Selecionar Foto
                      </button>
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