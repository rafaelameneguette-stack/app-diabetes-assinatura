"use client"

import { useState, useEffect } from 'react'
import { Clock, Heart, Star, Check, Calendar, Utensils, Crown, Shield, Zap, MessageCircle, Send, Users, Filter, ThumbsUp, Reply } from 'lucide-react'
import Header from '@/components/Header'

interface Medication {
  id: string
  name: string
  dosage: string
  time: string
  taken: boolean
}

interface Recipe {
  id: string
  title: string
  description: string
  prepTime: string
  carbs: string
  calories: string
  image: string
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
}

interface Plan {
  id: string
  name: string
  price: string
  period: string
  features: string[]
  popular?: boolean
  color: string
}

interface ChatMessage {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: string
  category: string
  likes: number
  replies: number
  liked?: boolean
}

interface ChatRoom {
  id: string
  name: string
  description: string
  members: number
  lastActivity: string
  category: string
}

interface DiabetesAppProps {
  initialTimeISO: string
}

export default function DiabetesApp({ initialTimeISO }: DiabetesAppProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeChatRoom, setActiveChatRoom] = useState('geral')
  const [newMessage, setNewMessage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [medications, setMedications] = useState<Medication[]>([
    { id: '1', name: 'Metformina', dosage: '500mg', time: '08:00', taken: false },
    { id: '2', name: 'Glibenclamida', dosage: '5mg', time: '12:00', taken: true },
    { id: '3', name: 'Metformina', dosage: '500mg', time: '20:00', taken: false },
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'Maria Silva',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      message: 'Pessoal, descobri uma receita incrível de pão integral sem açúcar! Alguém quer que eu compartilhe?',
      timestamp: '10:30',
      category: 'receitas',
      likes: 12,
      replies: 3,
      liked: false
    },
    {
      id: '2',
      user: 'João Santos',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: 'Hoje completei 3 meses controlando minha glicemia! A disciplina com os horários da medicação fez toda diferença.',
      timestamp: '09:45',
      category: 'motivacao',
      likes: 25,
      replies: 8,
      liked: true
    },
    {
      id: '3',
      user: 'Ana Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      message: 'Alguém mais tem dificuldade para lembrar de tomar a medicação no horário certo? Como vocês fazem?',
      timestamp: '08:20',
      category: 'medicacao',
      likes: 8,
      replies: 15,
      liked: false
    },
    {
      id: '4',
      user: 'Carlos Oliveira',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      message: 'Comecei a fazer caminhadas de 30 minutos todos os dias. Minha glicemia melhorou muito! 💪',
      timestamp: '07:55',
      category: 'exercicios',
      likes: 18,
      replies: 6,
      liked: false
    },
    {
      id: '5',
      user: 'Lucia Ferreira',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      message: 'Dica importante: sempre meçam a glicemia antes e depois das refeições. Me ajudou a entender melhor meu corpo.',
      timestamp: '07:30',
      category: 'dicas',
      likes: 22,
      replies: 4,
      liked: true
    }
  ])

  const chatRooms: ChatRoom[] = [
    {
      id: 'geral',
      name: 'Conversa Geral',
      description: 'Bate-papo aberto para todos os temas',
      members: 1247,
      lastActivity: '2 min atrás',
      category: 'geral'
    },
    {
      id: 'receitas',
      name: 'Receitas Saudáveis',
      description: 'Compartilhe e descubra receitas deliciosas',
      members: 892,
      lastActivity: '5 min atrás',
      category: 'receitas'
    },
    {
      id: 'medicacao',
      name: 'Medicação e Tratamento',
      description: 'Dicas sobre medicamentos e tratamentos',
      members: 654,
      lastActivity: '8 min atrás',
      category: 'medicacao'
    },
    {
      id: 'exercicios',
      name: 'Exercícios e Atividades',
      description: 'Motivação para manter-se ativo',
      members: 543,
      lastActivity: '12 min atrás',
      category: 'exercicios'
    },
    {
      id: 'motivacao',
      name: 'Motivação e Apoio',
      description: 'Compartilhe conquistas e receba apoio',
      members: 789,
      lastActivity: '15 min atrás',
      category: 'motivacao'
    }
  ]

  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Salada de Quinoa com Legumes',
      description: 'Rica em fibras e proteínas, perfeita para controlar a glicemia',
      prepTime: '20 min',
      carbs: '25g',
      calories: '180 kcal',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
      difficulty: 'Fácil'
    },
    {
      id: '2',
      title: 'Salmão Grelhado com Aspargos',
      description: 'Alto teor de ômega-3 e baixo índice glicêmico',
      prepTime: '25 min',
      carbs: '8g',
      calories: '320 kcal',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop',
      difficulty: 'Médio'
    },
    {
      id: '3',
      title: 'Smoothie Verde Detox',
      description: 'Refrescante e nutritivo, ideal para o café da manhã',
      prepTime: '10 min',
      carbs: '15g',
      calories: '120 kcal',
      image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&h=200&fit=crop',
      difficulty: 'Fácil'
    },
    {
      id: '4',
      title: 'Frango ao Curry com Couve-flor',
      description: 'Sabor exótico com ingredientes que ajudam no controle glicêmico',
      prepTime: '35 min',
      carbs: '12g',
      calories: '280 kcal',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      difficulty: 'Médio'
    },
    {
      id: '5',
      title: 'Omelete de Espinafre e Queijo',
      description: 'Rica em proteínas e baixa em carboidratos',
      prepTime: '15 min',
      carbs: '6g',
      calories: '250 kcal',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=200&fit=crop',
      difficulty: 'Fácil'
    },
    {
      id: '6',
      title: 'Sopa de Lentilha com Vegetais',
      description: 'Fonte de fibras e proteínas vegetais',
      prepTime: '40 min',
      carbs: '30g',
      calories: '200 kcal',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop',
      difficulty: 'Médio'
    }
  ]

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Básico',
      price: 'Grátis',
      period: '',
      features: [
        'Controle básico de medicações',
        'Receitas limitadas',
        'Acesso à comunidade',
        'Suporte por email'
      ],
      color: 'from-gray-400 to-gray-500'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 29,90',
      period: '/mês',
      features: [
        'Controle avançado de medicações',
        'Receitas ilimitadas e personalizadas',
        'Relatórios detalhados',
        'Lembretes inteligentes',
        'Consultas com nutricionista',
        'Suporte prioritário'
      ],
      popular: true,
      color: 'from-emerald-400 to-emerald-500'
    },
    {
      id: 'family',
      name: 'Família',
      price: 'R$ 49,90',
      period: '/mês',
      features: [
        'Todos os recursos Premium',
        'Até 4 perfis familiares',
        'Compartilhamento de dados',
        'Relatórios familiares',
        'Consultas em grupo',
        'Suporte 24/7'
      ],
      color: 'from-purple-400 to-purple-500'
    }
  ]

  const toggleMedication = (id: string) => {
    setMedications(prev => 
      prev.map(med => 
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    )
  }

  const getNextMedication = () => {
    const now = new Date()
    const currentTimeStr = now.toTimeString().slice(0, 5)
    
    return medications.find(med => 
      med.time > currentTimeStr && !med.taken
    ) || medications.find(med => !med.taken)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: 'Você',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        category: activeChatRoom,
        likes: 0,
        replies: 0,
        liked: false
      }
      setChatMessages(prev => [message, ...prev])
      setNewMessage('')
    }
  }

  const toggleLike = (messageId: string) => {
    setChatMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              liked: !msg.liked,
              likes: msg.liked ? msg.likes - 1 : msg.likes + 1
            }
          : msg
      )
    )
  }

  const filteredMessages = selectedCategory === 'todos' 
    ? chatMessages 
    : chatMessages.filter(msg => msg.category === selectedCategory)

  const nextMed = getNextMedication()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header com snapshot do horário */}
      <Header initialTimeISO={initialTimeISO} nextMed={nextMed} />

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Heart },
              { id: 'medications', label: 'Medicações', icon: Clock },
              { id: 'recipes', label: 'Receitas', icon: Utensils },
              { id: 'community', label: 'Comunidade', icon: MessageCircle },
              { id: 'plans', label: 'Planos', icon: Crown }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Olá! Como está se sentindo hoje?</h2>
              <p className="text-emerald-100 text-lg">
                Mantenha sua saúde em dia com nosso acompanhamento personalizado
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Medicações Hoje</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {medications.filter(med => med.taken).length}/{medications.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Check className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Próxima Medicação</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {nextMed ? nextMed.time : '--:--'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receitas Favoritas</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Medications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medicações de Hoje</h3>
              <div className="space-y-3">
                {medications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${med.taken ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-500">{med.dosage} às {med.time}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleMedication(med.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        med.taken
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {med.taken ? 'Tomada' : 'Marcar'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Controle de Medicações</h2>
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                Adicionar Medicação
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Horários de Hoje</h3>
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <Clock className="w-5 h-5 text-gray-400 mb-1" />
                          <span className="text-sm font-medium">{med.time}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{med.name}</p>
                          <p className="text-sm text-gray-500">{med.dosage}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleMedication(med.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            med.taken
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {med.taken && <Check className="w-4 h-4 text-white" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações de Notificação</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Notificações Push</p>
                      <p className="text-sm text-gray-500">Receba lembretes no seu dispositivo</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Lembrete Antecipado</p>
                      <p className="text-sm text-gray-500">15 minutos antes do horário</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Som de Notificação</p>
                      <p className="text-sm text-gray-500">Alerta sonoro personalizado</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recipes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Receitas Saudáveis</h2>
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                Adicionar Receita
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-lg transition-shadow">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        recipe.difficulty === 'Fácil' ? 'bg-green-100 text-green-800' :
                        recipe.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{recipe.prepTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{recipe.carbs}</span>
                        </div>
                      </div>
                      <span className="font-medium">{recipe.calories}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                        Ver Receita
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Comunidade DiabetCare</h2>
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="todos">Todas as categorias</option>
                  <option value="medicacao">Medicação</option>
                  <option value="receitas">Receitas</option>
                  <option value="exercicios">Exercícios</option>
                  <option value="motivacao">Motivação</option>
                  <option value="dicas">Dicas</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Chat Rooms Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Salas de Conversa</h3>
                  <div className="space-y-3">
                    {chatRooms.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => setActiveChatRoom(room.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          activeChatRoom === room.id
                            ? 'bg-emerald-50 border border-emerald-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 text-sm">{room.name}</h4>
                          <span className="text-xs text-gray-500">{room.members}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{room.description}</p>
                        <p className="text-xs text-emerald-600">{room.lastActivity}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-sm border">
                  {/* Chat Header */}
                  <div className="border-b p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {chatRooms.find(room => room.id === activeChatRoom)?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {chatRooms.find(room => room.id === activeChatRoom)?.members} membros online
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <Filter className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="p-4 h-96 overflow-y-auto">
                    <div className="space-y-4">
                      {filteredMessages.map((message) => (
                        <div key={message.id} className="flex space-x-3">
                          <img 
                            src={message.avatar} 
                            alt={message.user}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900 text-sm">{message.user}</span>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                message.category === 'medicacao' ? 'bg-blue-100 text-blue-800' :
                                message.category === 'receitas' ? 'bg-green-100 text-green-800' :
                                message.category === 'exercicios' ? 'bg-purple-100 text-purple-800' :
                                message.category === 'motivacao' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {message.category}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">{message.message}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <button 
                                onClick={() => toggleLike(message.id)}
                                className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                                  message.liked ? 'text-red-500' : ''
                                }`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>{message.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                                <Reply className="w-3 h-3" />
                                <span>{message.replies}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-3">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" 
                        alt="Você"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Compartilhe sua experiência..."
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Guidelines */}
                <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Diretrizes da Comunidade</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Seja respeitoso e empático com outros membros</li>
                    <li>• Compartilhe experiências construtivas sobre diabetes</li>
                    <li>• Não substitua orientação médica profissional</li>
                    <li>• Mantenha conversas relevantes ao tema de cada sala</li>
                    <li>• Reporte conteúdo inadequado aos moderadores</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Escolha Seu Plano</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tenha acesso completo às ferramentas que vão transformar seu controle da diabetes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div key={plan.id} className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden ${
                  plan.popular ? 'border-emerald-500 scale-105' : 'border-gray-200'
                }`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-white text-center py-2 text-sm font-medium">
                      Mais Popular
                    </div>
                  )}
                  
                  <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
                  
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-500 ml-1">{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}>
                      {plan.popular ? 'Começar Agora' : 'Escolher Plano'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Garantia de 30 dias</h3>
              <p className="text-blue-100 mb-6">
                Experimente qualquer plano sem riscos. Se não ficar satisfeito, devolvemos seu dinheiro.
              </p>
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6" />
                  <span>Seguro e Confiável</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-6 h-6" />
                  <span>Ativação Imediata</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}