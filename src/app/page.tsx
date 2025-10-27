import DiabetesApp from '@/components/DiabetesApp'

export default function Page() {
  // Snapshot do horário no SSR - isso garante que servidor e cliente tenham o mesmo valor inicial
  const initialTimeISO = new Date().toISOString()
  
  return <DiabetesApp initialTimeISO={initialTimeISO} />
}