export interface Celula {
  id: string
  nome: string
  lider: string
  whatsapp: string
  dia: string
  horario: string
  descricao: string
  faixaEtaria: 'jovens' | 'adultos' | 'idosos' | 'todas'
  endereco: string
  bairro: string
  cidade: string
  latitude?: number
  longitude?: number
  avaliacao: number
  igrejaMae: string
  ativa: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Igreja {
  id: string
  nome: string
  pastor: string
  email: string
  telefone: string
  endereco: string
  cidade: string
  estado: string
  createdAt: Date
  updatedAt: Date
}

export interface Usuario {
  id: string
  nome: string
  email: string
  tipo: 'admin' | 'lider'
  igrejaId: string
  createdAt: Date
  updatedAt: Date
}

export interface Membro {
  id: string
  nome: string
  telefone?: string
  email?: string
  celulaId: string
  ativo: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Frequencia {
  id: string
  membroId: string
  celulaId: string
  data: Date
  presente: boolean
  createdAt: Date
}

export interface Equipe {
  id: string
  nome: string
  descricao?: string
  celulaId: string
  createdAt: Date
  updatedAt: Date
}

export interface MembroEquipe {
  id: string
  membroId: string
  equipeId: string
  funcao: string
  ativo: boolean
  createdAt: Date
}

export interface Escala {
  id: string
  celulaId: string
  data: Date
  observacoes?: string
  createdAt: Date
  updatedAt: Date
}

export interface EscalaMembro {
  id: string
  escalaId: string
  membroId: string
  equipeId: string
  funcao: string
  createdAt: Date
}