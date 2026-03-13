"use client"

import { useState, useEffect } from "react"
import { Target, Users, Clock, Zap, ChevronRight } from "lucide-react"

export function ActiveChallenge() {
  const [progress, setProgress] = useState(0)
  const targetProgress = 65

  useEffect(() => {
    const timer = setTimeout(() => setProgress(targetProgress), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="glass-card border-2 border-border rounded-3xl p-4 sm:p-5 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-blue)]/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="flex items-center justify-between mb-3 relative">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[var(--color-blue)]/10">
            <Target size={18} style={{ color: "var(--color-blue)" }} />
          </div>
          <h3 className="font-bold text-foreground">Active Challenge</h3>
        </div>
        <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
      </div>

      <div className="bg-gradient-to-br from-[var(--color-blue)]/10 to-[var(--color-blue)]/5 border border-[var(--color-blue)]/20 rounded-2xl p-4 relative overflow-hidden">
        {/* Shimmer effect on progress */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />

        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-bold text-foreground mb-1">ITC Running Challenge</h4>
            <p className="text-sm text-muted-foreground mb-3">Complete 5km this week</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold">
            <Zap size={12} />
            <span>+100 VP</span>
          </div>
        </div>

        <div className="relative w-full h-3 bg-secondary/50 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, var(--color-blue), color-mix(in srgb, var(--color-blue) 70%, white))`,
              boxShadow: `0 0 10px var(--color-blue)`,
            }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>3.25km / 5km</span>
          <span className="font-bold" style={{ color: "var(--color-blue)" }}>
            {progress}%
          </span>
        </div>

        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-secondary/50">
            <Users size={12} />
            <span>243 joined</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-secondary/50">
            <Clock size={12} />
            <span>3 days left</span>
          </div>
        </div>
      </div>
    </div>
  )
}
