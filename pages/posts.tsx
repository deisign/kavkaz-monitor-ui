import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Post = {
  id: string
  text: string
  date: string
  link: string
  tags: string[]
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from('posts').select('*').order('date', { ascending: false })
      setPosts(data || [])
    }
    fetchPosts()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Посты</h1>
      {posts.map(post => (
        <div key={post.id} className="mb-4 border-b pb-2">
          <div className="text-sm text-gray-600">{new Date(post.date).toLocaleString()}</div>
          <a href={post.link} className="text-lg text-blue-600 underline">{post.link}</a>
          <p>{post.text}</p>
          <div className="text-sm text-gray-500">Теги: {post.tags?.join(', ')}</div>
        </div>
      ))}
    </div>
  )
}
