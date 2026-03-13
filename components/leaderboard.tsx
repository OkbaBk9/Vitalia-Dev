"use client"

import { Trophy, TrendingUp, TrendingDown, Crown, Medal } from "lucide-react"

const friends = [
  { rank: 1, name: "Elmehdi B.", points: 2840, trend: "up", avatar: "EB", level: 15, isYou: true },
  { rank: 2, name: "Karim H.", points: 2650, trend: "up", avatar: "KH", level: 12 },
  { rank: 3, name: "Sara M.", points: 2480, trend: "down", avatar: "SM", level: 11 },
  { rank: 4, name: "Youssef D.", points: 2300, trend: "up", avatar: "YD", level: 10 },
  { rank: 5, name: "Nadia K.", points: 2150, trend: "down", avatar: "NK", level: 9 },
]

export function Leaderboard() {
  return (
    <div className="glass-card border-2 border-border rounded-3xl p-4 sm:p-5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[var(--color-orange)]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-4 relative">
        <div className="p-2 rounded-xl bg-[var(--color-orange)]/10">
          <Trophy size={18} style={{ color: "var(--color-orange)" }} />
        </div>
        <h3 className="font-bold text-foreground">Weekly Leaderboard</h3>
      </div>

      <div className="space-y-2 stagger-children">
        {friends.map((friend, index) => (
          <div
            key={friend.rank}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
              friend.isYou
                ? "glass border-2 border-primary/30 shadow-lg shadow-primary/10"
                : "hover:bg-secondary/50"
            }`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Rank badge */}
            <div className="relative">
              {friend.rank === 1 ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-orange)] to-yellow-500 flex items-center justify-center shadow-lg animate-pulse-soft">
                  <Crown size={14} className="text-white" />
                </div>
              ) : friend.rank === 2 ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <Medal size={14} className="text-white" />
                </div>
              ) : friend.rank === 3 ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
                  <Medal size={14} className="text-white" />
                </div>
              ) : (
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {friend.rank}
                </span>
              )}
            </div>

            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                friend.isYou
                  ? "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary text-foreground"
              }`}
            >
              {friend.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold text-foreground truncate">
                  {friend.name}
                  {friend.isYou && (
                    <span className="text-primary ml-1 text-xs">(You)</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground font-medium">
                  {friend.points.toLocaleString()} VP
                </p>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    color: "var(--color-blue)",
                    backgroundColor: "color-mix(in srgb, var(--color-blue) 15%, transparent)",
                  }}
                >
                  Lv.{friend.level}
                </span>
              </div>
            </div>

            {/* Trend indicator */}
            <div
              className={`p-1.5 rounded-lg ${
                friend.trend === "up" ? "bg-primary/10" : "bg-destructive/10"
              }`}
            >
              {friend.trend === "up" ? (
                <TrendingUp size={14} className="text-primary" />
              ) : (
                <TrendingDown size={14} className="text-destructive" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
