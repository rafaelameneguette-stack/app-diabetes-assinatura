"use client"

import { useState, useEffect } from 'react'
import { Clock, Bell } from 'lucide-react'

interface Medication {
  id: string
  name: string
  dosage: string
  time: string
  taken: boolean
}

interface HeaderProps {
  initialTimeISO: string
  nextMed?: Medication
}

export default function Header({ initialTimeISO, nextMed }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date(initialTimeISO))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">DiabetCare</h1>
          </div>

          {/* Time and Next Medication */}
          <div className="flex items-center space-x-6">
            {/* Current Time */}
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <div className="text-right">
                <div className="text-sm font-medium">{formatTime(currentTime)}</div>
                <div className="text-xs text-gray-500">{formatDate(currentTime)}</div>
              </div>
            </div>

            {/* Next Medication Alert */}
            {nextMed && (
              <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg">
                <Bell className="w-4 h-4" />
                <div className="text-sm">
                  <span className="font-medium">Próxima:</span> {nextMed.name} às {nextMed.time}
                </div>
              </div>
            )}

            {/* User Avatar */}
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}