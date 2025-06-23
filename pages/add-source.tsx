import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AddSource() {
  const [name, setName] = useState('')
  const [tgLink, setTgLink] = useState('')
  const [region, setRegion] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.from('sources').insert({ name, tg_link: tgLink, region })
    if (!error) setSubmitted(true)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Добавить канал</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Имя" className="border w-full p-2" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Ссылка на Telegram" className="border w-full p-2" value={tgLink} onChange={e => setTgLink(e.target.value)} />
        <input type="text" placeholder="Регион" className="border w-full p-2" value={region} onChange={e => setRegion(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Сохранить</button>
      </form>
      {submitted && <p className="mt-4 text-green-600">Добавлено!</p>}
    </div>
  )
}
