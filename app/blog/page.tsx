'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Search, MoreHorizontal, Bookmark, Sparkles, TrendingUp, Flame, Users } from 'lucide-react'
import Link from 'next/link'

const exploreContent = [
  {
    id: 1,
    author: { name: 'Sarah Chen', avatar: 'SC', bio: 'Fitness Coach', followers: 2.4 },
    title: 'Morning Yoga Routine for Energy',
    description: 'Start your day right with this 10-minute energizing yoga flow. Perfect for beginners and advanced practitioners.',
    content: 'Discover how proper breathing techniques and mindful movement can transform your mornings. This routine combines traditional yoga with modern wellness science...',
    category: 'Fitness',
    image: null,
    likes: 324,
    comments: 45,
    shares: 12,
    liked: false,
    saved: false,
    trending: true,
  },
  {
    id: 2,
    author: { name: 'Dr. James Park', avatar: 'JP', bio: 'Nutritionist', followers: 1.8 },
    title: 'Plant-Based Protein Guide',
    description: 'Everything you need to know about getting complete proteins from plant sources.',
    content: 'Learn which plant-based foods provide all 9 essential amino acids, plus delicious recipes you can make today...',
    category: 'Nutrition',
    image: null,
    likes: 521,
    comments: 89,
    shares: 34,
    liked: false,
    saved: false,
    trending: true,
  },
]

export default function Explore() {
  const [content, setContent] = useState(exploreContent)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Fitness', 'Nutrition', 'Mental Health', 'Sleep', 'Wellness']

  const toggleLike = (id: number) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 } : item
    ))
  }

  const toggleSave = (id: number) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, saved: !item.saved } : item
    ))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with search */}
      <div className="sticky top-16 md:top-0 z-30 glass-nav border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search wellness tips..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border/40 outline-none focus:bg-secondary transition-all"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {content.map(item => (
          <article key={item.id} className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all">
            {/* Card header with author */}
            <div className="p-4 border-b border-border/40">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {item.author.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{item.author.name}</div>
                    <p className="text-xs text-muted-foreground">{item.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* Category badge */}
              <span className="inline-block px-2.5 py-1 bg-primary/15 text-primary text-xs font-semibold rounded-lg">
                {item.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
            </div>

            {/* Engagement stats */}
            <div className="px-4 py-3 bg-background/50 border-t border-border/40">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.likes} likes</span>
                <span>{item.comments} comments</span>
                <span>{item.shares} shares</span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-border/40">
              <button
                onClick={() => toggleLike(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  item.liked
                    ? 'text-red-500 bg-red-50 dark:bg-red-950/20'
                    : 'text-muted-foreground hover:text-red-500'
                }`}
              >
                <Heart size={16} fill={item.liked ? 'currentColor' : 'none'} />
                <span className="text-sm">{item.likes}</span>
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary">
                <MessageCircle size={16} />
                <span className="text-sm">{item.comments}</span>
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary">
                <Share2 size={16} />
                <span className="text-sm">{item.shares}</span>
              </button>

              <button
                onClick={() => toggleSave(item.id)}
                className={`p-2 rounded-lg transition-all ${
                  item.saved
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Bookmark size={16} fill={item.saved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
