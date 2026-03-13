"use client"

import { useState } from "react"
import { Star, MapPin, Clock, MessageCircle, Video, Verified, Globe } from "lucide-react"

interface Consultant {
  id: string
  name: string
  specialty: string
  image: string
  rating: number
  reviews: number
  price: number
  location: string
  languages: string[]
  bio: string
  available: boolean
  responseTime: string
  sessions: number
}

const consultants: Consultant[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    specialty: "Nutritionist",
    image: "/professional-woman-doctor.jpg",
    rating: 4.9,
    reviews: 247,
    price: 5500,
    location: "Algiers",
    languages: ["Arabic", "French", "English"],
    bio: "Specialized in personalized meal planning and metabolic health. 10+ years experience.",
    available: true,
    responseTime: "< 1 hour",
    sessions: 1240,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    specialty: "Fitness Coach",
    image: "/professional-man-trainer.jpg",
    rating: 4.8,
    reviews: 189,
    price: 4500,
    location: "Oran",
    languages: ["Arabic", "French"],
    bio: "HIIT specialist with 10+ years of training experience. Certified personal trainer.",
    available: true,
    responseTime: "< 30 min",
    sessions: 890,
  },
  {
    id: "3",
    name: "Dr. Amina Benali",
    specialty: "Mental Health Therapist",
    image: "/professional-woman-coach.jpg",
    rating: 4.9,
    reviews: 312,
    price: 7000,
    location: "Constantine",
    languages: ["Arabic", "French", "English"],
    bio: "Clinical psychologist focusing on stress management and CBT therapy.",
    available: false,
    responseTime: "< 2 hours",
    sessions: 2100,
  },
  {
    id: "4",
    name: "Karim Hadj",
    specialty: "Wellness Coach",
    image: "/professional-man-therapist.jpg",
    rating: 4.7,
    reviews: 156,
    price: 4000,
    location: "Blida",
    languages: ["Arabic", "French"],
    bio: "Holistic wellness approach combining mindfulness and lifestyle coaching.",
    available: true,
    responseTime: "< 1 hour",
    sessions: 560,
  },
  {
    id: "5",
    name: "Dr. Fatima Zidane",
    specialty: "Nutrition Specialist",
    image: "/professional-woman-doctor.jpg",
    rating: 4.8,
    reviews: 203,
    price: 6000,
    location: "Setif",
    languages: ["Arabic", "French"],
    bio: "Sports nutrition and performance optimization specialist for athletes.",
    available: true,
    responseTime: "< 45 min",
    sessions: 780,
  },
  {
    id: "6",
    name: "Youssef Mebarki",
    specialty: "Fitness Coach",
    image: "/professional-man-trainer.jpg",
    rating: 4.9,
    reviews: 267,
    price: 5000,
    location: "Annaba",
    languages: ["Arabic", "English"],
    bio: "Personal trainer specializing in strength and functional training.",
    available: true,
    responseTime: "< 20 min",
    sessions: 1560,
  },
  {
    id: "7",
    name: "Dr. Nadia Khelifa",
    specialty: "Sleep Specialist",
    image: "/professional-woman-coach.jpg",
    rating: 4.9,
    reviews: 178,
    price: 6500,
    location: "Algiers",
    languages: ["Arabic", "French", "English"],
    bio: "Board-certified sleep medicine specialist. Treating insomnia and sleep disorders.",
    available: true,
    responseTime: "< 1 hour",
    sessions: 920,
  },
  {
    id: "8",
    name: "Ahmed Boudiaf",
    specialty: "Physiotherapist",
    image: "/professional-man-therapist.jpg",
    rating: 4.8,
    reviews: 234,
    price: 4500,
    location: "Tlemcen",
    languages: ["Arabic", "French"],
    bio: "Sports injury rehabilitation and chronic pain management expert.",
    available: false,
    responseTime: "< 2 hours",
    sessions: 1100,
  },
  {
    id: "9",
    name: "Lina Mansouri",
    specialty: "Yoga Instructor",
    image: "/professional-woman-doctor.jpg",
    rating: 4.7,
    reviews: 145,
    price: 3500,
    location: "Bejaia",
    languages: ["Arabic", "French"],
    bio: "Certified yoga teacher specializing in stress relief and flexibility.",
    available: true,
    responseTime: "< 30 min",
    sessions: 670,
  },
  {
    id: "10",
    name: "Dr. Omar Belkacem",
    specialty: "Cardiologist",
    image: "/professional-man-trainer.jpg",
    rating: 4.9,
    reviews: 389,
    price: 8000,
    location: "Algiers",
    languages: ["Arabic", "French", "English"],
    bio: "Heart health specialist with focus on preventive cardiology.",
    available: true,
    responseTime: "< 1 hour",
    sessions: 2450,
  },
]

export default function ConsultantsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null)

  const specialties = ["all", "Nutritionist", "Fitness Coach", "Mental Health Therapist", "Wellness Coach", "Sleep Specialist", "Physiotherapist", "Yoga Instructor", "Cardiologist"]

  const filtered = selectedFilter === "all" ? consultants : consultants.filter((c) => c.specialty === selectedFilter)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b-2 border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Health Consultants</h1>
              <p className="text-sm text-muted-foreground">Book sessions with certified professionals</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{consultants.length}</p>
              <p className="text-xs text-muted-foreground">Available experts</p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedFilter(spec)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedFilter === spec
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {spec === "all" ? "All" : spec}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-sm text-muted-foreground mb-4">{filtered.length} consultants found</p>
        
        {/* Consultants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((consultant) => (
            <div
              key={consultant.id}
              className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg group cursor-pointer"
              onClick={() => setSelectedConsultant(consultant)}
            >
              {/* Header with image and status */}
              <div className="relative">
                <div className="h-24 bg-gradient-to-br from-primary/20 to-primary/5" />
                <div className="absolute -bottom-8 left-4">
                  <div className="relative">
                    <img
                      src={consultant.image || "/placeholder.svg"}
                      alt={consultant.name}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-card"
                    />
                    {consultant.available && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 pt-10">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-1">
                      {consultant.name}
                      <Verified size={14} className="text-primary fill-primary" />
                    </h3>
                    <p className="text-sm text-primary">{consultant.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{consultant.price.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">DZD/session</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{consultant.bio}</p>

                {/* Stats row */}
                <div className="flex items-center gap-3 mb-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Star size={12} fill="#2ECC71" color="#2ECC71" />
                    <span className="font-medium">{consultant.rating}</span>
                    <span className="text-muted-foreground">({consultant.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin size={12} />
                    {consultant.location}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock size={10} />
                    {consultant.responseTime}
                  </span>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Globe size={10} />
                    {consultant.languages.slice(0, 2).join(", ")}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {consultant.sessions}+ sessions
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-lg py-2 hover:bg-primary/90 transition-colors text-sm font-medium">
                    <Video size={14} />
                    Book
                  </button>
                  <button className="flex items-center justify-center gap-1.5 bg-secondary text-foreground rounded-lg py-2 hover:bg-secondary/80 transition-colors text-sm font-medium">
                    <MessageCircle size={14} />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedConsultant && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedConsultant(null)}
          >
            <div
              className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedConsultant.name}</h2>
                  <p className="text-primary font-medium">{selectedConsultant.specialty}</p>
                </div>
                <button
                  onClick={() => setSelectedConsultant(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-6 mb-6">
                <img
                  src={selectedConsultant.image || "/placeholder.svg"}
                  alt={selectedConsultant.name}
                  className="w-32 h-32 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < Math.floor(selectedConsultant.rating) ? "fill-primary text-primary" : "text-border"
                        }
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">
                      {selectedConsultant.rating} ({selectedConsultant.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{selectedConsultant.bio}</p>
                  <p className="text-2xl font-bold text-foreground mb-2">{selectedConsultant.price.toLocaleString()} DZD/session</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={16} />
                    {selectedConsultant.location}
                  </div>
                </div>
              </div>

              <div className="bg-secondary border border-primary/20 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Clock size={18} />
                  Response Time
                </h3>
                <p className="text-sm text-muted-foreground">{selectedConsultant.responseTime}</p>
                <p className="text-sm text-muted-foreground mt-1">{selectedConsultant.sessions}+ sessions completed</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-primary text-primary-foreground rounded-lg py-3 hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Video size={18} />
                  Book Video Call
                </button>
                <button className="bg-secondary text-foreground border border-primary/20 rounded-lg py-3 hover:bg-secondary/80 transition-colors font-semibold flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
