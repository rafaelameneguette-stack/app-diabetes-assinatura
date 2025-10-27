'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bell, Heart } from 'lucide-react';

interface HeaderProps {
  initialTimeISO: string;
  nextMed?: {
    id: string;
    name: string;
    time: string;
  } | null;
}

export default function Header({ initialTimeISO, nextMed }: HeaderProps) {
  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo',
      }),
    []
  );

  // ⚠️ A PRIMEIRA renderização usa o mesmo valor do SSR:
  const [now, setNow] = useState(() => fmt.format(new Date(initialTimeISO)));

  useEffect(() => {
    const update = () => setNow(fmt.format(new Date()));
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [fmt]);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              DiabetCare
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {now}
            </div>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {nextMed && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}