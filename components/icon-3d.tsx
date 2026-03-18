"use client"

import React from "react"

interface Icon3DProps {
  icon: React.ReactNode
  color?: string
  size?: number
  className?: string
}

export function Icon3D({ icon, color = "currentColor", size = 24, className = "" }: Icon3DProps) {
  return (
    <div className={`icon-3d inline-flex items-center justify-center ${className}`}>
      <div
        style={{
          color,
          fontSize: size,
          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))",
        }}
      >
        {icon}
      </div>
    </div>
  )
}

// Export utility for common icons with 3D effect
export const Icon3DVariants = {
  activity: "🏃",
  star: "⭐",
  target: "🎯",
  trophy: "🏆",
  heart: "❤️",
  fire: "🔥",
  zap: "⚡",
  users: "👥",
  map: "🗺️",
  mountain: "⛰️",
  camera: "📷",
  settings: "⚙️",
  shield: "🛡️",
  check: "✓",
  plus: "➕",
}
