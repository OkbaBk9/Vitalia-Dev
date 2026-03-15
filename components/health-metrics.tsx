"use client"

import { Card } from "@/components/ui/card"
import { Activity, Droplet, Flame, Moon } from "lucide-react"
import { ActivityRing } from "./activity-ring"

const metrics = [
  {
    label: "Daily Steps",
    value: "7,890",
    target: "10,000",
    percentage: 78,
    icon: Activity,
    color: "var(--color-activity)",
    ringColor: "rgb(215, 95, 0)",
  },
  {
    label: "Hydration",
    value: "1.8",
    unit: "L",
    target: "2.5",
    percentage: 72,
    icon: Droplet,
    color: "var(--color-hydration)",
    ringColor: "rgb(100, 180, 255)",
  },
  {
    label: "Calories",
    value: "1,650",
    unit: "kcal",
    target: "2,200",
    percentage: 75,
    icon: Flame,
    color: "var(--color-nutrition)",
    ringColor: "rgb(255, 140, 0)",
  },
  {
    label: "Sleep",
    value: "6.5",
    unit: "hrs",
    target: "8",
    percentage: 81,
    icon: Moon,
    color: "var(--color-sleep)",
    ringColor: "rgb(100, 150, 255)",
  },
]

export function HealthMetrics() {
  return (
    <>
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-6">Activity Rings</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="flex justify-center animate-fade-scale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ActivityRing
                value={Number.parseInt(metric.value.replace(/,/g, ""))}
                max={Number.parseInt(metric.target.replace(/,/g, ""))}
                label={metric.label}
                color={metric.ringColor}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card
              key={metric.label}
              className="rounded-2xl glass-card border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer animate-fade-scale btn-bounce glass-hover"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="p-6 h-full flex flex-col relative overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                      {metric.label}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">{metric.value}</span>
                      {metric.unit && <span className="text-xs text-muted-foreground">{metric.unit}</span>}
                    </div>
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-sm"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${metric.ringColor} 15%, transparent)`,
                    }}
                  >
                    <Icon className="w-6 h-6 transition-transform duration-300" style={{ color: metric.ringColor }} />
                  </div>
                </div>

                <div className="space-y-2 mt-auto relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Goal: {metric.target}</span>
                    <span className="text-xs font-semibold text-foreground">{metric.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 shadow-sm"
                      style={{
                        width: `${metric.percentage}%`,
                        backgroundColor: metric.ringColor,
                        boxShadow: `0 0 12px ${metric.ringColor}40`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
