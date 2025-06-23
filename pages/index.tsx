import Link from 'next/link'
export default function Home() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Мониторинг Кавказа</h1>
      <ul className="list-disc list-inside">
        <li><Link href="/posts" className="text-blue-600 underline">Посты</Link></li>
        <li><Link href="/sources" className="text-blue-600 underline">Источники</Link></li>
        <li><Link href="/add-source" className="text-blue-600 underline">Добавить источник</Link></li>
      </ul>
    </div>
  )
}
