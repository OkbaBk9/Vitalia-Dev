"use client"

import { useEffect, useState } from "react"

interface VitalityScoreProps {
  score: number
  size?: number
}

export function VitalityScore({ score, size = 180 }: VitalityScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const radius = (size - 24) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    // Animate the score number counting up
    const duration = 1500
    const steps = 60
    const increment = score / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= score) {
        setAnimatedScore(score)
        setIsAnimating(false)
        clearInterval(interval)
      } else {
        setAnimatedScore(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [score])

  const getScoreColor = () => {
    if (score >= 80) return "var(--primary)"
    if (score >= 60) return "var(--color-orange)"
    return "var(--destructive)"
  }

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Work"
  }

  const getGradientId = () => `vitality-gradient-${size}`

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow effect */}
        <div
          className="absolute inset-4 rounded-full blur-xl opacity-30 transition-opacity duration-1000"
          style={{ backgroundColor: getScoreColor(), opacity: isAnimating ? 0.1 : 0.3 }}
        />

        <svg width={size} height={size} className="transform -rotate-90 drop-shadow-lg">
          <defs>
            <linearGradient id={getGradientId()} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={getScoreColor()} />
              <stop offset="100%" stopColor={`color-mix(in srgb, ${getScoreColor()} 70%, transparent)`} />
            </linearGradient>
          </defs>
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            className="text-secondary"
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${getGradientId()})`}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${getScoreColor()})`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl sm:text-5xl font-bold text-foreground transition-all"
            style={{
              textShadow: isAnimating ? "none" : `0 0 20px ${getScoreColor()}40`,
            }}
          >
            {animatedScore}
          </span>
          <span
            className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 transition-all duration-500"
            style={{
              color: getScoreColor(),
              backgroundColor: `color-mix(in srgb, ${getScoreColor()} 15%, transparent)`,
            }}
          >
            {getScoreLabel()}
          </span>
        </div>
      </div>
      <p className="text-sm font-semibold text-foreground">Vitality Score</p>
    </div>
  )
}
