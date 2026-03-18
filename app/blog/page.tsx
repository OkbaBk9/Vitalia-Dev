'use client'

import { useState } from 'react'
import { Heart, MessageCircle2, Share2, Search, MoreHorizontal, BookMarked, HandHeart, Sparkles } from 'lucide-react'

const initialPosts = [
  {
    id: 1,
    author: 'Alex Runner',
    avatar: 'AR',
    time: '2h ago',
    content: 'Just hit a new personal record on my 10K run! 43:22 🏃‍♂️ Feeling incredible!',
    image: '/api/placeholder?w=400&h=300',
    likes: 234,
    comments: 12,
    shares: 8,
    liked: false,
    saved: false,
    comments: [
      { id: 1, author: 'Sarah', avatar: 'S', time: '1h ago', content: 'Amazing! Keep it up! 🎉', likes: 5, liked: false },
      { id: 2, author: 'Mike', avatar: 'M', time: '45m ago', content: 'That\''s awesome dude!', likes: 3, liked: false },
    ],
  },
  {
    id: 2,
    author: 'Emma Wellness',
    avatar: 'EW',
    time: '4h ago',
    content: 'Morning meditation changed my perspective. Starting the day with gratitude and intention 🧘‍♀️✨',
    image: '/api/placeholder?w=400&h=300',
    likes: 456,
    comments: 28,
    shares: 45,
    liked: false,
    saved: false,
    comments: [
      { id: 3, author: 'Chris', avatar: 'C', time: '3h ago', content: 'I need to try this!', likes: 8, liked: false },
    ],
  },
]

export default function BlogPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [expandedComments, setExpandedComments] = useState(new Set())
  const [commentInputs, setCommentInputs] = useState({})

  const toggleComments = (postId) => {
    const newExpanded = new Set(expandedComments)
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId)
    } else {
      newExpanded.add(postId)
    }
    setExpandedComments(newExpanded)
  }

  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const toggleSave = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ))
  }

  const addComment = (postId) => {
    const content = commentInputs[postId]
    if (!content) return

    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: [...post.comments, {
              id: post.comments.length + 1,
              author: 'You',
              avatar: 'EB',
              time: 'now',
              content,
              likes: 0,
              liked: false,
            }],
          }
        : post
    ))
    setCommentInputs({ ...commentInputs, [postId]: '' })
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-nav px-4 py-3 border-b border-border/30">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Learning Feed</h1>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Search size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="glass-card rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {post.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <MoreHorizontal size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
              <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
            </div>

            {/* Image */}
            {post.image && (
              <div className="px-4 pb-3">
                <img src={post.image} alt="" className="w-full rounded-xl object-cover" />
              </div>
            )}

            {/* Stats */}
            <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border/30 flex gap-4">
              <span>{post.likes} likes</span>
              <span>{post.comments.length} comments</span>
              <span>{post.shares} shares</span>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 flex items-center justify-around gap-2">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
                  post.liked
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} />
                <span className="text-sm font-medium">Like</span>
              </button>
              <button
                onClick={() => toggleComments(post.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-muted-foreground hover:bg-secondary transition-all"
              >
                <MessageCircle2 size={18} />
                <span className="text-sm font-medium">Comment</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-muted-foreground hover:bg-secondary transition-all">
                <Share2 size={18} />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button
                onClick={() => toggleSave(post.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
                  post.saved
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <BookMarked size={18} fill={post.saved ? 'currentColor' : 'none'} />
                <span className="text-sm font-medium">Save</span>
              </button>
            </div>

            {/* Comments Section */}
            {expandedComments.has(post.id) && (
              <div className="mt-4 pt-4 border-t border-border/30 px-4 pb-4 space-y-3">
                {/* Existing comments */}
                {post.comments.length > 0 && (
                  <div className="space-y-3">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground flex-shrink-0">
                          {comment.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-foreground">{comment.author}</span>
                            <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                          </div>
                          <p className="text-sm text-foreground mt-0.5 leading-relaxed">{comment.content}</p>
                          <button className="text-[10px] text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1">
                            <HandHeart size={10} />
                            {comment.likes > 0 && comment.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add comment input */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground flex-shrink-0">
                    EB
                  </div>
                  <div className="flex-1 flex items-center gap-2 bg-secondary/50 rounded-xl px-3 py-2 border-2 border-border focus-within:border-primary/30 transition-all">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addComment(post.id)
                      }}
                      placeholder="Add a comment..."
                      className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      className="p-1.5 rounded-lg hover:bg-primary/20 text-primary transition-colors"
                    >
                      <Sparkles size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
