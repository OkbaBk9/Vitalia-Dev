import { useState, useEffect } from "react"

export interface Event {
  id: string
  title: string
  time: string
  location: string
  attendees: number
  organizer: string
  description: string
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/events")
        if (!response.ok) throw new Error("Failed to fetch events")
        const data = await response.json()
        setEvents(data.data || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const addEvent = async (eventData: Omit<Event, "id">) => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      })
      if (!response.ok) throw new Error("Failed to create event")
      const data = await response.json()
      setEvents([...events, data.data])
      return data.data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      throw err
    }
  }

  return { events, loading, error, addEvent }
}
