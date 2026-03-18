import { useState, useEffect } from "react"

export interface HealthData {
  userId: string
  date: string
  steps: number
  water: number
  sleep: number
  calories: number
  vitality: number
}

export function useHealthData(userId: string = "user1", days: number = 7) {
  const [data, setData] = useState<HealthData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/health?userId=${userId}&days=${days}`)
        if (!response.ok) throw new Error("Failed to fetch health data")
        const json = await response.json()
        setData(json.data || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, days])

  const addData = async (healthData: Omit<HealthData, "date">) => {
    try {
      const response = await fetch("/api/health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(healthData),
      })
      if (!response.ok) throw new Error("Failed to save health data")
      const json = await response.json()
      setData([...data, json.data])
      return json.data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      throw err
    }
  }

  return { data, loading, error, addData }
}
