import { useState, useEffect } from "react"

export interface Club {
  id: string
  name: string
  description: string
  members: number
  location: string
  latitude: number
  longitude: number
  nextEvent: string
  category: string
}

export function useClubs() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/clubs")
        if (!response.ok) throw new Error("Failed to fetch clubs")
        const data = await response.json()
        setClubs(data.data || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        setClubs([])
      } finally {
        setLoading(false)
      }
    }

    fetchClubs()
  }, [])

  const addClub = async (clubData: Omit<Club, "id">) => {
    try {
      const response = await fetch("/api/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clubData),
      })
      if (!response.ok) throw new Error("Failed to create club")
      const data = await response.json()
      setClubs([...clubs, data.data])
      return data.data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      throw err
    }
  }

  return { clubs, loading, error, addClub }
}
