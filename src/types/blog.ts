export interface BlogAuthor {
  name: string
  role: string
  clinic: string
  avatar: string
  bio?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  keywords: string[]
  description: string
  image: string
  imageCaption?: string
  content: string
  category: string
  categoryLabel: string
  author: BlogAuthor
  publishedAt: string // YYYY-MM-DD
  readingTime: string
  featured?: boolean
  status: 'published' | 'draft'
}

export type BlogFilterCategory = 'all' | 'orthodontics' | 'aligners' | 'smile-design' | 'dentofacial' | 'pediatric' | 'oral-health'
