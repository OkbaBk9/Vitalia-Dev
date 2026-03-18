'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('test@vitalia.com')
  const [password, setPassword] = useState('password123')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate auth delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock authentication - accept test account
    if (email === 'test@vitalia.com' && password === 'password123') {
      // Set cookie for middleware
      document.cookie = `authToken=demo-token-${Date.now()}; path=/; max-age=${60 * 60 * 24 * 7}`
      router.push('/dashboard')
    } else {
      alert('Invalid credentials. Use test@vitalia.com / password123')
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold">V</div>
        <span className="font-bold text-lg">Vitalia</span>
      </Link>

      {/* Card */}
      <div className="glass-card rounded-2xl p-8 border border-border">
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground mb-8">Sign in to your Vitalia account</p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@vitalia.com"
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Signing in...' : 'Sign In'} {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground mb-4">Don't have an account?</p>
          <Link href="/auth/login" className="w-full px-6 py-2.5 rounded-lg glass-button border border-border text-center font-semibold hover:bg-secondary/50 transition-colors">
            Create Account
          </Link>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Demo: test@vitalia.com / password123
        </p>
      </div>
    </div>
  )
}
