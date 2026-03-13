"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bell,
  Flame,
  Zap,
  Trophy,
  Users,
  Calendar,
  X,
  Check,
  Trash2,
} from "lucide-react"

interface Notification {
  id: string
  type: "streak" | "points" | "achievement" | "social" | "event"
  title: string
  message: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "streak",
    title: "Keep it going!",
    message: "You're on a 7-day streak. Don't break it!",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "points",
    title: "+50 VitaPoints",
    message: "You completed your morning hydration goal",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "achievement",
    title: "New Badge Unlocked!",
    message: "You earned the 'Hydration Hero' badge",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "social",
    title: "Karim H. high-fived you",
    message: "For your post in Running Club",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "event",
    title: "Event Tomorrow",
    message: "Morning Run at Algiers Bay starts at 6:30 AM",
    time: "Yesterday",
    read: true,
  },
]

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "streak":
      return { icon: Flame, color: "var(--color-orange)" }
    case "points":
      return { icon: Zap, color: "var(--primary)" }
    case "achievement":
      return { icon: Trophy, color: "var(--color-blue)" }
    case "social":
      return { icon: Users, color: "var(--color-orange)" }
    case "event":
      return { icon: Calendar, color: "var(--primary)" }
  }
}

interface NotificationsDropdownProps {
  isOpen: boolean
  onClose: () => void
  onClearBadge: () => void
}

export function NotificationsDropdown({ isOpen, onClose, onClearBadge }: NotificationsDropdownProps) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      onClearBadge()
    }
  }, [isOpen, unreadCount, onClearBadge])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-80 sm:w-96 glass-card rounded-2xl border-2 border-border shadow-2xl overflow-hidden animate-scale-in z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {notifications.length > 0 && (
            <>
              <button
                onClick={markAllAsRead}
                className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                title="Mark all as read"
              >
                <Check size={16} className="text-muted-foreground" />
              </button>
              <button
                onClick={clearAll}
                className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                title="Clear all"
              >
                <Trash2 size={16} className="text-muted-foreground" />
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <div className="stagger-children">
            {notifications.map((notification) => {
              const { icon: Icon, color } = getNotificationIcon(notification.type)
              return (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`flex items-start gap-3 p-4 border-b border-border/30 hover:bg-secondary/50 cursor-pointer transition-all group ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70 mt-1">
                      {notification.time}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeNotification(notification.id)
                    }}
                    className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all"
                  >
                    <X size={14} className="text-muted-foreground" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-border/50 bg-secondary/30">
          <button className="w-full py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            View All Notifications
          </button>
        </div>
      )}
    </div>
  )
}
