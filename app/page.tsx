"use client"

import { useState, useEffect } from "react"
import { VitalityScore } from "@/components/vitality-score"
import { DailyPath } from "@/components/daily-path"
import { Leaderboard } from "@/components/leaderboard"
import { ActiveChallenge } from "@/components/active-challenge"
import { HealthMetrics } from "@/components/health-metrics"
import { ActivityChart } from "@/components/activity-chart"
import { Flame, Zap, Award, TrendingUp, Sparkles, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [userName] = useState("Elmehdi")
  const [date, setDate] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [greeting, setGreeting] = useState("Hello")
  const streak = 7
  const vitaPoints = 2650
  const level = 12

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    setDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
    )
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/8 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[var(--color-blue)]/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/3 via-transparent to-[var(--color-orange)]/3 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 relative">
        {/* Header with greeting, streak, and XP */}
        <div
          className={`mb-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
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
                <div className="w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all group-hover:scale-110 duration-300" style={{ backgroundColor: "color-mix(in srgb, var(--color-streak) 20%, transparent)" }}>
                  <Flame size={16} style={{ color: "var(--color-streak)" }} className="animate-pulse-soft" />
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
                  <span className="text-sm sm:text-lg font-bold text-foreground">{vitaPoints.toLocaleString()}</span>
                  <p className="text-[9px] sm:text-[10px] font-medium text-muted-foreground leading-none">VitaPoints</p>
                </div>
              </div>
              
              {/* Level Badge */}
              <Link href="/profile" className="hidden sm:flex items-center gap-2 glass-button px-4 py-2 rounded-2xl btn-bounce group hover:scale-105 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all group-hover:scale-110 duration-300" style={{ backgroundColor: "color-mix(in srgb, var(--color-blue) 20%, transparent)" }}>
                  <Award size={16} style={{ color: "var(--color-blue)" }} />
                </div>
                <div>
                  <span className="text-lg font-bold text-foreground">Lv.{level}</span>
                  <p className="text-[10px] font-medium text-muted-foreground leading-none">Vitalian</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Grid - Vitality Score + Daily Path + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left: Vitality Score + Daily Path */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vitality Score Card */}
            <div className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden animate-fade-scale">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[var(--color-blue)]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <VitalityScore score={87} size={160} />
              
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-bold text-foreground">Your Vitality Today</h2>
                  <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold">Great!</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  You are above average this week. Complete your daily path to keep climbing the leaderboard!
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { label: "Steps", value: "7,890", color: "var(--color-activity)", trend: "+12%" },
                    { label: "Water", value: "1.8L", color: "var(--color-hydration)", trend: "+5%" },
                    { label: "Sleep", value: "6.5h", color: "var(--color-sleep)", trend: "-8%" },
                    { label: "Calories", value: "1,650", color: "var(--color-nutrition)", trend: "+3%" },
                  ].map((stat, index) => (
                    <div 
                      key={stat.label} 
                      className="glass-button rounded-xl p-3 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</span>
                        <span className={`text-[10px] font-bold ${stat.trend.startsWith("+") ? "text-primary" : "text-destructive"}`}>
                          {stat.trend}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                      <div className="w-full h-1 bg-secondary/50 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            backgroundColor: stat.color, 
                            width: `${60 + Math.random() * 30}%` 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Path */}
            <DailyPath />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Leaderboard />
            <ActiveChallenge />
            
            {/* Quick links card */}
            <div className="glass-card rounded-2xl p-4 animate-fade-scale glass-hover relative overflow-hidden" style={{ animationDelay: "200ms" }}>
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="font-bold text-foreground mb-3 text-sm relative z-10">Quick Actions</h3>
              <div className="space-y-2 relative z-10">
                {[
                  { label: "View All Stats", href: "/profile", color: "var(--color-blue)" },
                  { label: "Join a Club", href: "/clubs", color: "var(--primary)" },
                  { label: "Browse Shop", href: "/shop", color: "var(--color-orange)" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/70 hover:backdrop-blur-sm transition-all group btn-bounce duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-2 h-2 rounded-full transition-transform group-hover:scale-150 duration-300"
                        style={{ backgroundColor: link.color }}
                      />
                      <span className="text-sm font-medium text-foreground">{link.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Today's Progress</h2>
            <Link href="/profile" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <HealthMetrics />
        </div>

        {/* Activity Chart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Weekly Activity</h3>
            <div className="flex items-center gap-2">
              {["Steps", "Calories", "Sleep"].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all btn-bounce ${
                    i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <ActivityChart />
        </div>
      </div>
    </div>
  )
}
