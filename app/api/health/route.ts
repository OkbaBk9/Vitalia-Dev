import { NextResponse } from "next/server"

interface HealthData {
  userId: string
  date: string
  steps: number
  water: number
  sleep: number
  calories: number
  vitality: number
}

// Mock database
const healthData: HealthData[] = [
  {
    userId: "user1",
    date: "2026-03-18",
    steps: 7890,
    water: 1800,
    sleep: 6.5,
    calories: 1650,
    vitality: 87,
  },
  {
    userId: "user1",
    date: "2026-03-17",
    steps: 8234,
    water: 2000,
    sleep: 7,
    calories: 1620,
    vitality: 89,
  },
  {
    userId: "user1",
    date: "2026-03-16",
    steps: 6500,
    water: 1600,
    sleep: 6,
    calories: 1700,
    vitality: 82,
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const days = searchParams.get("days") || "7"

    let filtered = healthData
    if (userId) {
      filtered = healthData.filter((d) => d.userId === userId)
    }

    // Return last N days
    filtered = filtered.slice(-parseInt(days))

    return NextResponse.json({
      success: true,
      data: filtered,
      count: filtered.length,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch health data" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newData: HealthData = {
      userId: body.userId,
      date: new Date().toISOString().split("T")[0],
      steps: body.steps || 0,
      water: body.water || 0,
      sleep: body.sleep || 0,
      calories: body.calories || 0,
      vitality: body.vitality || 0,
    }

    healthData.push(newData)

    return NextResponse.json(
      { success: true, data: newData },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to record health data" },
      { status: 500 }
    )
  }
}
