import { NextResponse } from "next/server"

// Mock database - in production, use real database
const events = [
  {
    id: "1",
    title: "Morning Run",
    time: "Tomorrow 7:00 AM",
    location: "Algiers Bay",
    attendees: 12,
    organizer: "Karim H.",
    description: "Join us for a refreshing morning run along the coast",
  },
  {
    id: "2",
    title: "Yoga Session",
    time: "Fri 5:00 PM",
    location: "Community Center",
    attendees: 8,
    organizer: "Nadia K.",
    description: "Mindfulness and relaxation yoga session",
  },
  {
    id: "3",
    title: "10km Challenge",
    time: "Sat 6:30 AM",
    location: "Downtown",
    attendees: 45,
    organizer: "Running Club",
    description: "Community-wide 10km running challenge",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: events,
      count: events.length,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newEvent = {
      id: String(events.length + 1),
      title: body.title,
      time: body.time,
      location: body.location,
      attendees: 1,
      organizer: body.organizer,
      description: body.description,
    }
    
    events.push(newEvent)
    
    return NextResponse.json(
      { success: true, data: newEvent },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
      { status: 500 }
    )
  }
}
