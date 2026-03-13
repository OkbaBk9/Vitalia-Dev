"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Calendar } from "lucide-react"

const data = [
  { day: "Mon", activity: 8500, target: 10000 },
  { day: "Tue", activity: 7200, target: 10000 },
  { day: "Wed", activity: 9100, target: 10000 },
  { day: "Thu", activity: 8800, target: 10000 },
  { day: "Fri", activity: 7890, target: 10000 },
  { day: "Sat", activity: 6500, target: 10000 },
  { day: "Sun", activity: 8200, target: 10000 },
]

export function ActivityChart() {
  return (
    <Card className="rounded-2xl border-2 border-border glass-card shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">Weekly Steps</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">58,187</span>
              <span className="text-sm text-muted-foreground">/ 70,000 goal</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary">+8% vs last week</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-activity)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-activity)" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
            <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: `1px solid var(--border)`,
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => `${value.toLocaleString()} steps`}
            />
            <Bar dataKey="activity" fill="url(#colorActivity)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Keep pushing! You're 83% toward your weekly goal.
        </p>
      </div>
    </Card>
  )
}
