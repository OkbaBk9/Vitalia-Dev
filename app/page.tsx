'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Zap, Heart, TrendingUp, Shield, Smartphone, Users } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold text-sm">V</div>
            <span className="font-bold text-lg hidden sm:inline">Vitalia</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Sign In</Link>
            <Link href="/auth/login" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Gradient background */}
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 text-center mb-12">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-semibold text-primary">Welcome to a Healthier You</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              Your Personal AI<br />Health Guardian
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Track your wellness journey with intelligent insights, connect with friends, and achieve your health goals with Vitalia. Your companion for a healthier, happier life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/login" className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg shadow-primary/25 flex items-center gap-2">
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <Link href="/auth/signin" className="px-8 py-3 glass-card font-semibold rounded-lg hover:bg-secondary/50 transition-colors border border-border">
                Sign In
              </Link>
            </div>
          </div>

          {/* Hero Image - Notion style illustration */}
          <div className="relative z-10 mt-16 rounded-2xl overflow-hidden glass-card border border-border/50 p-1">
            <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl p-8 flex items-center justify-center min-h-96">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Heart size={48} className="text-primary" />
                </div>
                <p className="text-muted-foreground text-center">Beautiful dashboard with real-time health insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Everything you need to thrive</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Vitalia brings together all the tools you need for comprehensive health tracking</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'AI-Powered Insights', desc: 'Get personalized recommendations based on your health data and habits' },
              { icon: Users, title: 'Social Motivation', desc: 'Connect with friends, share achievements, and compete on leaderboards' },
              { icon: Heart, title: 'Health Tracking', desc: 'Monitor sleep, activity, nutrition, and wellness metrics in one place' },
              { icon: TrendingUp, title: 'Progress Analytics', desc: 'Visualize your improvements with detailed charts and statistics' },
              { icon: Shield, title: 'Privacy First', desc: 'Your health data is encrypted and stays completely under your control' },
              { icon: Smartphone, title: 'Mobile First', desc: 'Full-featured experience optimized for your smartphone and tablet' },
            ].map((feature, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Account CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 sm:p-12 border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Ready to get started?</h3>
              <p className="text-lg text-muted-foreground mb-8">Use our demo account to explore the full Vitalia experience</p>
              <div className="bg-secondary/50 rounded-lg p-6 mb-8 text-left inline-block">
                <p className="text-sm font-medium text-foreground mb-2">Test Account:</p>
                <p className="font-mono text-primary font-semibold">Email: test@vitalia.com</p>
                <p className="font-mono text-primary font-semibold">Password: password123</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signin" className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg shadow-primary/25 flex items-center gap-2">
                  Sign In Now <ArrowRight size={18} />
                </Link>
                <Link href="/auth/login" className="px-8 py-3 glass-card font-semibold rounded-lg hover:bg-secondary/50 transition-colors border border-border">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 Vitalia. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
