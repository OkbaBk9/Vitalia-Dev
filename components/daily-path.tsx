"use client"

import { useState } from "react"
import { Droplet, Brain, Footprints, Apple, Moon, Check, Lock, Sparkles } from "lucide-react"

interface PathNode {
  id: number
  title: string
  description: string
  icon: React.ElementType
  xp: number
  completed: boolean
  locked: boolean
  color: string
}

const initialNodes: PathNode[] = [
  {
    id: 1,
    title: "Hydration",
    description: "Log your water intake",
    icon: Droplet,
    xp: 15,
    completed: false,
    locked: false,
    color: "var(--color-hydration)",
  },
  {
    id: 2,
    title: "Mental Check",
    description: "2-min breathing exercise",
    icon: Brain,
    xp: 20,
    completed: false,
    locked: false,
    color: "var(--color-blue)",
  },
  {
    id: 3,
    title: "Movement",
    description: "Sync your daily steps",
    icon: Footprints,
    xp: 25,
    completed: false,
    locked: true,
    color: "var(--color-activity)",
  },
  {
    id: 4,
    title: "Nutrition",
    description: "Log a healthy meal",
    icon: Apple,
    xp: 20,
    completed: false,
    locked: true,
    color: "var(--color-nutrition)",
  },
  {
    id: 5,
    title: "Rest",
    description: "Log your sleep quality",
    icon: Moon,
    xp: 20,
    completed: false,
    locked: true,
    color: "var(--color-sleep)",
  },
]

export function DailyPath() {
  const [nodes, setNodes] = useState(initialNodes)
  const [justCompleted, setJustCompleted] = useState<number | null>(null)

  const completeNode = (id: number) => {
    setJustCompleted(id)
    setNodes((prev) => {
      const updated = prev.map((node) => {
        if (node.id === id && !node.locked) {
          return { ...node, completed: true }
        }
        return node
      })
      // unlock next node
      const idx = updated.findIndex((n) => n.id === id)
      if (idx >= 0 && idx + 1 < updated.length) {
        updated[idx + 1] = { ...updated[idx + 1], locked: false }
      }
      return updated
    })
    // Clear animation after delay
    setTimeout(() => setJustCompleted(null), 1000)
  }

  const completedCount = nodes.filter((n) => n.completed).length
  const totalXp = nodes.filter((n) => n.completed).reduce((s, n) => s + n.xp, 0)

  return (
    <div className="glass-card border-2 border-border rounded-3xl p-4 sm:p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6 relative">
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            Daily Path
            <Sparkles size={16} className="text-primary animate-pulse-soft" />
          </h3>
          <p className="text-sm text-muted-foreground">
            {completedCount}/{nodes.length} completed
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-1.5 border border-primary/20">
          <span className="animate-pulse-soft">+{totalXp}</span>
          <span className="text-xs">VP</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3 bg-secondary rounded-full mb-8 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${(completedCount / nodes.length) * 100}%` }}
        />
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* Winding path nodes */}
      <div className="relative flex flex-col gap-3">
        {nodes.map((node, index) => {
          const Icon = node.icon
          const isEven = index % 2 === 0
          const isJustCompleted = justCompleted === node.id

          return (
            <div key={node.id}>
              {/* Connector line */}
              {index > 0 && (
                <div className="flex justify-center -mt-3 mb-0">
                  <div
                    className={`w-0.5 h-3 transition-all duration-500 ${
                      node.completed || !node.locked ? "bg-primary/40" : "bg-border"
                    }`}
                  />
                </div>
              )}

              <button
                onClick={() => !node.completed && !node.locked && completeNode(node.id)}
                disabled={node.locked || node.completed}
                className={`w-full flex items-center gap-4 p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 ${
                  isEven ? "" : "flex-row-reverse text-right"
                } ${
                  node.completed
                    ? "bg-primary/5 border-primary/30"
                    : node.locked
                      ? "bg-secondary/30 border-border opacity-50 cursor-not-allowed"
                      : "bg-card border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                } ${isJustCompleted ? "animate-bounce-in" : ""}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                    node.completed
                      ? "bg-primary border-primary text-primary-foreground"
                      : node.locked
                        ? "bg-secondary border-border text-muted-foreground"
                        : ""
                  }`}
                  style={
                    !node.completed && !node.locked
                      ? {
                          borderColor: node.color,
                          color: node.color,
                          backgroundColor: `color-mix(in srgb, ${node.color} 10%, transparent)`,
                        }
                      : {}
                  }
                >
                  {node.completed ? (
                    <Check size={24} className={isJustCompleted ? "animate-bounce-in" : ""} />
                  ) : node.locked ? (
                    <Lock size={18} />
                  ) : (
                    <Icon size={24} />
                  )}

                  {/* Pulse indicator for available nodes */}
                  {!node.locked && !node.completed && (
                    <span
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse-soft"
                      style={{ backgroundColor: node.color }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 min-w-0 ${isEven ? "" : "flex flex-col items-end"}`}>
                  <div className={`flex items-center gap-2 ${isEven ? "" : "flex-row-reverse"}`}>
                    <h4
                      className={`font-bold text-sm sm:text-base truncate ${
                        node.completed
                          ? "text-primary"
                          : node.locked
                            ? "text-muted-foreground"
                            : "text-foreground"
                      }`}
                    >
                      {node.title}
                    </h4>
                    {!node.locked && !node.completed && (
                      <span
                        className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{
                          color: "var(--color-orange)",
                          backgroundColor: "color-mix(in srgb, var(--color-orange) 15%, transparent)",
                        }}
                      >
                        +{node.xp} VP
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{node.description}</p>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Completion message */}
      {completedCount === nodes.length && (
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-center animate-bounce-in">
          <p className="text-sm font-bold text-primary">
            Path Complete! You earned {totalXp} VP today!
          </p>
        </div>
      )}
    </div>
  )
}
