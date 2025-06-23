import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Source = {
  id: string
  name: string
  tg_link: string
  region: string
  active: boolean
}

export default function Sources() {
  const [sources, setSources] = useState<Source[]>([])

  useEffect(() => {
    async function fetchSources() {
      const { data } = await supabase.from('sources').select('*')
      setSources(data || [])
    }
    fetchSources()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Источники</h1>
      {sources.map(source => (
        <div key={source.id} className="mb-3">
          <a href={source.tg_link} className="text-blue-600 underline">{source.name}</a>
          <div className="text-sm">Регион: {source.region} | Активен: {source.active ? 'Да' : 'Нет'}</div>
        </div>
      ))}
    </div>
  )
}
