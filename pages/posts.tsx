import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Post = {
  id: string
  text: string | null
  link: string | null
  created_at: string | null
  tags: string[] | null
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Ошибка загрузки постов:', error)
      } else {
        console.log('Загруженные посты:', data)
        setPosts(data || [])
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Мониторинг Кавказа</h1>

      {posts.length === 0 && <p>Постов пока нет.</p>}

      {posts.map(post => (
        <div key={post.id} className="mb-4 border-b pb-2">
          <div className="text-sm text-gray-600">
            {post.created_at
              ? new Date(post.created_at).toLocaleString()
              : '⏳ Без даты'}
          </div>

          {post.link ? (
            <a href={post.link} className="text-lg text-blue-600 underline break-all">
              {post.link}
            </a>
          ) : (
            <div className="text-red-600">⚠️ Нет ссылки</div>
          )}

          <p className="mt-1">{post.text || '— Текста нет —'}</p>

          <div className="text-sm text-gray-500">
            Теги:{' '}
            {Array.isArray(post.tags) && post.tags.length > 0
              ? post.tags.join(', ')
              : '—'}
          </div>
        </div>
      ))}
    </div>
  )
}
