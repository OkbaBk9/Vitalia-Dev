"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Clock, Sparkles } from "lucide-react"

const tasks = [
  { id: 1, title: "Morning Energy Stretch", duration: "10 min", completed: false, isAI: true },
  { id: 2, title: "Drink Water", description: "Refill bottle", duration: null, completed: false, isAI: false },
  { id: 3, title: "Morning Meditation", duration: "15 min", completed: false, isAI: false },
  { id: 4, title: "Healthy Breakfast", description: "Rich in protein", completed: true, isAI: false },
  { id: 5, title: "Evening Walk", duration: "30 min", completed: false, isAI: false },
]

export function HealthTasks() {
  const [items, setItems] = useState(tasks)

  const toggleTask = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  return (
    <div className="space-y-2">
      {items.map((task) => (
        <Card
          key={task.id}
          className="bg-card border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div className="pt-1">
              <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} className="rounded-md" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p
                  className={`font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                >
                  {task.title}
                </p>
                {task.isAI && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Sparkles className="w-3 h-3" />
                    AI
                  </span>
                )}
              </div>
              {task.description && <p className="text-sm text-muted-foreground mb-2">{task.description}</p>}
              {task.duration && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {task.duration}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
