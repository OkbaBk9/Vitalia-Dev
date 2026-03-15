"use client"

import { useState, useEffect } from "react"
import { Sparkles, MessageCircle, X, Droplet, Apple, Brain, Moon, Activity, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const quickActions = [
  { label: "Log Water", emoji: "💧", icon: Droplet, color: "var(--color-hydration)" },
  { label: "Track Meal", emoji: "🍎", icon: Apple, color: "var(--color-nutrition)" },
  { label: "Mental Check", emoji: "🧘", icon: Brain, color: "var(--color-mindfulness)" },
  { label: "Log Sleep", emoji: "😴", icon: Moon, color: "var(--color-sleep)" },
  { label: "Add Activity", emoji: "🏃", icon: Activity, color: "var(--color-activity)" },
]

export function FloatingGuardian() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [actionFeedback, setActionFeedback] = useState<string | null>(null)

  // Show tooltip after 3 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenTooltip = localStorage.getItem("vitalia-tooltip-seen")
      if (!hasSeenTooltip) {
        setShowTooltip(true)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const dismissTooltip = () => {
    setShowTooltip(false)
    localStorage.setItem("vitalia-tooltip-seen", "true")
  }

  const handleQuickAction = (label: string) => {
    setActionFeedback(label)
    setTimeout(() => {
      setActionFeedback(null)
      setIsExpanded(false)
    }, 1500)
  }

  if (pathname === "/guardian") {
    return null
  }

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40">
      {/* Action feedback toast */}
      {actionFeedback && (
        <div className="absolute bottom-full right-0 mb-3 animate-bounce-in">
          <div className="glass-card rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2 border border-primary/40">
            <div className="w-6 h-6 rounded-full bg-primary/25 flex items-center justify-center shadow-sm shadow-primary/30">
              <span className="text-primary text-xs font-bold">+</span>
            </div>
            <p className="text-sm font-medium text-foreground">{actionFeedback} logged!</p>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && !isExpanded && !actionFeedback && (
        <div className="absolute bottom-full right-0 mb-3 animate-bounce-in">
          <div className="glass-card rounded-2xl px-4 py-3 shadow-xl max-w-[220px] relative border border-border/50">
            <button
              onClick={dismissTooltip}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors btn-bounce shadow-sm"
            >
              <X size={12} className="text-muted-foreground" />
            </button>
            <p className="text-sm font-medium text-foreground">
              Quick actions here! Log water, meals, and more.
            </p>
          </div>
          <div className="absolute bottom-0 right-6 w-3 h-3 glass-card transform rotate-45 translate-y-1.5 border border-border/50" />
        </div>
      )}

      {/* Expanded menu */}
      {isExpanded && (
        <div className="absolute bottom-full right-0 mb-4 animate-scale-in">
          <div className="glass-card rounded-3xl p-4 shadow-2xl min-w-[240px] border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </p>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg hover:bg-secondary/50 transition-all duration-300 group"
              >
                <X size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.label)}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-secondary/50 transition-all group btn-bounce"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `color-mix(in srgb, ${action.color} 15%, transparent)` }}
                    >
                      <Icon size={20} style={{ color: action.color }} />
                    </div>
                    <span className="text-xs font-medium text-foreground">{action.label}</span>
                  </button>
                )
              })}
            </div>
            
            <div className="border-t border-border/50 pt-3">
              <Link
                href="/guardian"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg shadow-primary/25 btn-bounce"
              >
                <MessageCircle size={18} className="text-primary-foreground" />
                <span className="text-sm font-bold text-primary-foreground">Open AI Coach</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main button */}
      <div className="relative">
        {/* Decorative rings */}
        {!isExpanded && (
          <>
            <span className="absolute inset-[-8px] rounded-full border-2 border-primary/20 animate-pulse-soft" />
            <span className="absolute inset-[-4px] rounded-full bg-primary/10 animate-pulse-ring" />
          </>
        )}
        
        <button
          onClick={() => {
            setIsExpanded(!isExpanded)
            dismissTooltip()
          }}
          className={`relative w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center btn-bounce ${
            isExpanded
              ? "bg-secondary text-foreground scale-90"
              : "bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground hover:shadow-primary/40"
          }`}
        >
          {isExpanded ? (
            <X size={24} className="transition-transform" />
          ) : (
            <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          )}
        </button>
      </div>
    </div>
  )
}
