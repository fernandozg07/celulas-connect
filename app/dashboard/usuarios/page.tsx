'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Plus, Edit, Trash2, FileText, Phone, Mail } from 'lucide-react'

interface Usuario {
  id: string
  nome: string
  email: string
  tipo: string
  cpf?: string
  rg?: string
  telefone?: string
  cidade?: string
  ativo: boolean
  createdAt: string
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<Usuario | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    tipo: 'lider',
    cpf: '',
    rg: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    senha: ''
  })

  useEffect(() => {
    // Dados mock
    const usuariosMock: Usuario[] = [
      {
        id: '1',
        nome: 'João Silva',
        email: 'joao@ibcentral.com.br',
        tipo: 'admin',
        cpf: '123.456.789-00',
        rg: '12.345.678-9',
        telefone: '(11) 99999-9999',
        cidade: 'São Paulo',
        ativo: true,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        nome: 'Carlos Oliveira',
        email: 'carlos@ibcentral.com.br',
        tipo: 'lider',
        cpf: '987.654.321-00',
        rg: '98.765.432-1',
        telefone: '(11) 88888-8888',
        cidade: 'São Paulo',
        ativo: true,
        createdAt: '2024-01-14'
      }
    ]
    setUsuarios(usuariosMock)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const novoUsuario: Usuario = {
      id: Date.now().toString(),
      nome: formData.nome,
      email: formData.email,
      tipo: formData.tipo,
      cpf: formData.cpf,
      rg: formData.rg,
      telefone: formData.telefone,
      cidade: formData.cidade,
      ativo: true,
      createdAt: new Date().toISOString().split('T')[0]
    }

    if (editingUser) {
      setUsuarios(usuarios.map(u => u.id === editingUser.id ? { ...novoUsuario, id: editingUser.id } : u))
    } else {
      setUsuarios([novoUsuario, ...usuarios])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nome: '', email: '', tipo: 'lider', cpf: '', rg: '',
      telefone: '', endereco: '', cidade: '', estado: '', senha: ''
    })
    setShowForm(false)
    setEditingUser(null)
  }

  const editUser = (user: Usuario) => {
    setFormData({
      nome: user.nome,
      email: user.email,
      tipo: user.tipo,
      cpf: user.cpf || '',
      rg: user.rg || '',
      telefone: user.telefone || '',
      endereco: '',
      cidade: user.cidade || '',
      estado: '',
      senha: ''
    })
    setEditingUser(user)
    setShowForm(true)
  }

  const toggleUserStatus = (id: string) => {
    setUsuarios(usuarios.map(u => 
      u.id === id ? { ...u, ativo: !u.ativo } : u
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Usuários</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Usuário</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600">{usuarios.length}</div>
            <div className="text-sm text-gray-600">Total de Usuários</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600">
              {usuarios.filter(u => u.tipo === 'admin').length}
            </div>
            <div className="text-sm text-gray-600">Administradores</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600">
              {usuarios.filter(u => u.tipo === 'lider').length}
            </div>
            <div className="text-sm text-gray-600">Líderes</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-red-600">
              {usuarios.filter(u => !u.ativo).length}
            </div>
            <div className="text-sm text-gray-600">Inativos</div>
          </div>
        </div>

        {/* Lista de Usuários */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {usuario.nome.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {usuario.nome}
                          </div>
                          <div className="text-sm text-gray-500">
                            {usuario.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        usuario.tipo === 'admin' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {usuario.tipo === 'admin' ? 'Administrador' : 'Líder'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="space-y-1">
                        {usuario.telefone && (
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {usuario.telefone}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {usuario.cidade}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleUserStatus(usuario.id)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          usuario.ativo
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {usuario.ativo ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editUser(usuario)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Formulário */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo *
                      </label>
                      <select
                        value={formData.tipo}
                        onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                        className="input-field"
                      >
                        <option value="lider">Líder</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CPF *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cpf}
                        onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                        className="input-field"
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        RG *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.rg}
                        onChange={(e) => setFormData({...formData, rg: e.target.value})}
                        className="input-field"
                        placeholder="00.000.000-0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone *
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Senha {!editingUser && '*'}
                      </label>
                      <input
                        type="password"
                        required={!editingUser}
                        value={formData.senha}
                        onChange={(e) => setFormData({...formData, senha: e.target.value})}
                        className="input-field"
                        placeholder={editingUser ? "Deixe vazio para manter" : "••••••••"}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                      {editingUser ? 'Atualizar' : 'Criar'} Usuário
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