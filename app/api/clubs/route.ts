import { NextResponse } from "next/server"

const clubs = [
  {
    id: "1",
    name: "Running Club Algiers",
    description: "Join us for group runs and fitness challenges",
    members: 247,
    location: "Algiers Bay",
    latitude: 36.7538,
    longitude: 3.0588,
    nextEvent: "Tomorrow 7:00 AM",
    category: "fitness",
  },
  {
    id: "2",
    name: "Psych Support Hub",
    description: "Safe space for mental health and wellness",
    members: 184,
    location: "Community Center",
    latitude: 36.7548,
    longitude: 3.0598,
    nextEvent: "Today 5:00 PM",
    category: "mental-health",
  },
  {
    id: "3",
    name: "Yoga & Mindfulness",
    description: "Find peace and balance through yoga",
    members: 92,
    location: "Downtown",
    latitude: 36.7558,
    longitude: 3.0608,
    nextEvent: "Fri 6:00 PM",
    category: "wellness",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: clubs,
      count: clubs.length,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch clubs" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newClub = {
      id: String(clubs.length + 1),
      name: body.name,
      description: body.description,
      members: 1,
      location: body.location,
      latitude: body.latitude,
      longitude: body.longitude,
      nextEvent: body.nextEvent,
      category: body.category,
    }
    
    clubs.push(newClub)
    
    return NextResponse.json(
      { success: true, data: newClub },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create club" },
      { status: 500 }
    )
  }
}
