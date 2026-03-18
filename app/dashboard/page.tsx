'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { VitalityScore } from '@/components/vitality-score'
import { DailyPath } from '@/components/daily-path'
import { Leaderboard } from '@/components/leaderboard'
import { ActiveChallenge } from '@/components/active-challenge'
import { HealthMetrics } from '@/components/health-metrics'
import { ActivityChart } from '@/components/activity-chart'
import { Flame, Zap, Award, TrendingUp, Sparkles, ChevronRight, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [userName] = useState('Elmehdi')
  const [date, setDate] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [greeting, setGreeting] = useState('Hello')
  const streak = 7
  const vitaPoints = 2650
  const level = 12

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    setDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }),
    )
    setIsLoaded(true)
  }, [])

  const handleLogout = () => {
    // Clear auth cookie
    document.cookie = 'authToken=; path=/; max-age=0'
    router.push('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/8 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[var(--color-blue)]/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/3 via-transparent to-[var(--color-orange)]/3 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 relative">
        {/* Header with greeting, streak, and logout */}
        <div
          className={`mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  {greeting}, {userName}
                </h1>
                <Sparkles size={24} className="text-primary animate-pulse-soft" />
              </div>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
            
            {/* Stats pills */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Streak */}
              <div className="flex items-center gap-2 glass-button px-3 sm:px-4 py-2 rounded-2xl btn-bounce cursor-pointer group hover:scale-105 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all group-hover:scale-110 duration-300" style={{ backgroundColor: 'color-mix(in srgb, var(--color-streak) 20%, transparent)' }}>
                  <Flame size={16} style={{ color: 'var(--color-streak)' }} className="animate-pulse-soft" />
                </div>
                <div>
                  <span className="text-sm sm:text-lg font-bold text-foreground">{streak}</span>
                  <p className="text-[9px] sm:text-[10px] font-medium text-muted-foreground leading-none">Day Streak</p>
                </div>
              </div>
              
              {/* VitaPoints */}
              <div className="flex items-center gap-2 glass-button px-3 sm:px-4 py-2 rounded-2xl btn-bounce cursor-pointer group hover:scale-105 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center backdrop-blur-sm transition-all group-hover:scale-110 duration-300">
                  <Zap size={16} className="text-primary" />
                </div>
                <div>
                  <span className="text-sm sm:text-lg font-bold text-foreground">{vitaPoints}</span>
                  <p className="text-[9px] sm:text-[10px] font-medium text-muted-foreground leading-none">VitaPoints</p>
                </div>
              </div>
              
              {/* Level Badge */}
              <Link href="/profile" className="hidden sm:flex items-center gap-2 glass-button px-4 py-2 rounded-2xl btn-bounce group hover:scale-105 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all group-hover:scale-110 duration-300" style={{ backgroundColor: 'color-mix(in srgb, var(--color-blue) 20%, transparent)' }}>
                  <Award size={16} style={{ color: 'var(--color-blue)' }} />
                </div>
                <div>
                  <span className="text-lg font-bold text-foreground">Lv.{level}</span>
                  <p className="text-[10px] font-medium text-muted-foreground leading-none">Vitalian</p>
                </div>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 glass-button px-3 sm:px-4 py-2 rounded-2xl text-muted-foreground hover:text-destructive transition-colors duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left column - Vitality & Daily Path */}
          <div className="lg:col-span-2 space-y-6">
            <VitalityScore />
            <DailyPath />
            <ActivityChart />
          </div>

          {/* Right column - Challenges & Tasks */}
          <div className="space-y-6">
            <ActiveChallenge />
            <HealthMetrics />
          </div>
        </div>

        {/* Leaderboard & Shop */}
        <div className="grid lg:grid-cols-2 gap-6 space-y-6 lg:space-y-0">
          <Leaderboard />
          
          {/* Quick Shop Section */}
          <div className="glass-card border-2 border-border rounded-3xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-amber-500/10 backdrop-blur-sm border border-amber-500/20">
                <TrendingUp size={18} className="text-amber-600" />
              </div>
              <h3 className="font-bold text-foreground">Premium Items</h3>
              <Link href="/shop" className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                Shop All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Premium Badge', price: '99 VP' },
                { name: 'Theme Pack', price: '149 VP' },
                { name: 'Exclusive Avatar', price: '199 VP' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.name}</p>
                  <span className="text-sm font-bold text-amber-600">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
