"use client"

import { useState, useRef, useEffect } from "react"
import {
  Send,
  Sparkles,
  History,
  BarChart3,
  Plus,
  Mic,
  Camera,
  MoreHorizontal,
  X,
  Apple,
  Utensils,
  Flame as FlameIcon,
  Droplet,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "guardian"
  content: string
  timestamp: Date
  foodScan?: FoodScanResult
}

interface FoodScanResult {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  healthScore: number
  tips: string
}

interface ChatHistory {
  id: string
  title: string
  date: string
  preview: string
}

export default function AIGuardianPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showFoodScanner, setShowFoodScanner] = useState(false)
  const [scanningFood, setScanningFood] = useState(false)
  const messagesEnd = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"history" | "stats">("history")
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`
    }
  }, [input])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const responses = [
        "Based on your recent activity, I'd recommend focusing on hydration today. You've been averaging 1.5L but your goal is 2.5L. Try setting hourly reminders!",
        "Your sleep patterns have improved by 15% this week. The consistent bedtime routine is working well. Keep it up!",
        "I notice you've been consistent with morning workouts. Your body is responding well - your resting heart rate has decreased by 4 BPM.",
        "Great question! For stress management, I'd suggest trying the 4-7-8 breathing technique. Inhale for 4 seconds, hold for 7, exhale for 8.",
      ]

      const guardianMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "guardian",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, guardianMessage])
      setIsLoading(false)
    }, 1200)
  }

  const handleFoodScan = () => {
    setScanningFood(true)

    setTimeout(() => {
      setScanningFood(false)
      setShowFoodScanner(false)

      const foodResults: FoodScanResult[] = [
        {
          name: "Grilled Chicken Salad",
          calories: 380,
          protein: 35,
          carbs: 18,
          fat: 16,
          fiber: 6,
          healthScore: 92,
          tips: "Excellent choice! High in protein and fiber. Consider adding some nuts for healthy fats.",
        },
        {
          name: "Couscous with Vegetables",
          calories: 420,
          protein: 12,
          carbs: 68,
          fat: 8,
          fiber: 5,
          healthScore: 85,
          tips: "Great traditional dish! The vegetables add important micronutrients. Try adding chickpeas for extra protein.",
        },
        {
          name: "Shakshuka",
          calories: 310,
          protein: 18,
          carbs: 22,
          fat: 14,
          fiber: 4,
          healthScore: 88,
          tips: "Rich in protein from eggs and lycopene from tomatoes. Pair with whole grain bread for sustained energy.",
        },
      ]

      const result = foodResults[Math.floor(Math.random() * foodResults.length)]

      const userMsg: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `Scanned my food`,
        timestamp: new Date(),
      }

      const guardianMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "guardian",
        content: result.tips,
        timestamp: new Date(),
        foodScan: result,
      }

      setMessages((prev) => [...prev, userMsg, guardianMsg])
    }, 2000)
  }

  const chatHistory: ChatHistory[] = [
    { id: "1", title: "Sleep optimization", date: "Today", preview: "Tips for better sleep quality..." },
    { id: "2", title: "Workout recovery", date: "Yesterday", preview: "Post-exercise nutrition..." },
    { id: "3", title: "Nutrition planning", date: "2 days ago", preview: "Meal prep strategies..." },
    { id: "4", title: "Food scan: Lunch", date: "2 days ago", preview: "Grilled chicken analysis..." },
    { id: "5", title: "Stress management", date: "Last week", preview: "Breathing exercises..." },
    { id: "6", title: "Morning routines", date: "Last week", preview: "Starting your day right..." },
    { id: "7", title: "Food scan: Dinner", date: "Last week", preview: "Couscous nutritional info..." },
    { id: "8", title: "Hydration habits", date: "2 weeks ago", preview: "Water intake goals..." },
  ]

  const stats = {
    totalChats: 47,
    questionsAsked: 312,
    streakDays: 23,
    foodScans: 18,
    topTopics: ["Sleep", "Nutrition", "Exercise", "Food Scans"],
  }

  const suggestions = [
    "How can I improve my sleep?",
    "What should I eat before workout?",
    "Tips for reducing stress",
    "Scan my food",
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-72 border-r border-border bg-card/50 hidden lg:flex flex-col">
          <div className="p-4 border-b border-border">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-foreground transition-all group">
              <Plus size={18} className="text-primary" />
              <span className="font-medium">New conversation</span>
            </button>
          </div>

          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all ${
                activeTab === "history"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <History size={16} />
              History
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all ${
                activeTab === "stats"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 size={16} />
              Stats
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {activeTab === "history" && (
              <div className="space-y-1">
                {chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    className="w-full text-left p-3 rounded-lg hover:bg-secondary/80 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-foreground truncate flex-1">{chat.title}</p>
                      <MoreHorizontal size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{chat.preview}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{chat.date}</p>
                  </button>
                ))}
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-4 p-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-2xl font-bold text-foreground">{stats.totalChats}</p>
                    <p className="text-xs text-muted-foreground">Total Chats</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-2xl font-bold text-foreground">{stats.streakDays}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <p className="text-lg font-bold text-foreground mb-1">{stats.foodScans}</p>
                  <p className="text-xs text-muted-foreground">Food Scans</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground mb-2">Top Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {stats.topTopics.map((topic) => (
                      <span key={topic} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-5 sm:mb-6">
                <Sparkles size={28} className="text-primary-foreground" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-2 text-center">How can I help you today?</h1>
              <p className="text-muted-foreground text-center max-w-md mb-6 sm:mb-8 text-sm">
                I'm your AI health coach. Ask me anything about nutrition, fitness, sleep, or scan your food for instant analysis.
              </p>

              {/* Quick action: Scan Food */}
              <button
                onClick={() => setShowFoodScanner(true)}
                className="flex items-center gap-3 px-6 py-3.5 bg-[var(--color-orange)]/10 border-2 border-[var(--color-orange)]/20 rounded-2xl mb-6 transition-all hover:bg-[var(--color-orange)]/20 active:scale-[0.98]"
              >
                <Camera size={22} style={{ color: "var(--color-orange)" }} />
                <div className="text-left">
                  <p className="font-bold text-sm text-foreground">Scan My Food</p>
                  <p className="text-xs text-muted-foreground">Get instant nutritional analysis</p>
                </div>
              </button>

              <div className="flex flex-wrap gap-2 justify-center max-w-lg px-4">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      if (suggestion === "Scan my food") {
                        setShowFoodScanner(true)
                      } else {
                        setInput(suggestion)
                      }
                    }}
                    className="px-3 sm:px-4 py-2 rounded-full border-2 border-border bg-card hover:bg-secondary hover:border-primary/30 text-xs sm:text-sm text-foreground transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="animate-fade-scale">
                    {message.type === "user" ? (
                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-br-sm max-w-[85%] sm:max-w-lg">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                          <Sparkles size={14} className="text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {/* Food Scan Result Card */}
                          {message.foodScan && (
                            <div className="bg-card border-2 border-border rounded-2xl p-4 mb-3 max-w-[85%] sm:max-w-lg">
                              <div className="flex items-center gap-2 mb-3">
                                <Utensils size={16} className="text-primary" />
                                <h4 className="font-bold text-sm text-foreground">{message.foodScan.name}</h4>
                              </div>

                              {/* Health Score */}
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary rounded-full transition-all duration-700"
                                    style={{ width: `${message.foodScan.healthScore}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-primary">{message.foodScan.healthScore}/100</span>
                              </div>

                              {/* Macros Grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                                <div className="bg-secondary/50 rounded-xl p-2 text-center">
                                  <FlameIcon size={14} className="mx-auto mb-1" style={{ color: "var(--color-orange)" }} />
                                  <p className="text-sm font-bold text-foreground">{message.foodScan.calories}</p>
                                  <p className="text-[9px] text-muted-foreground">Calories</p>
                                </div>
                                <div className="bg-secondary/50 rounded-xl p-2 text-center">
                                  <Apple size={14} className="mx-auto mb-1 text-primary" />
                                  <p className="text-sm font-bold text-foreground">{message.foodScan.protein}g</p>
                                  <p className="text-[9px] text-muted-foreground">Protein</p>
                                </div>
                                <div className="bg-secondary/50 rounded-xl p-2 text-center">
                                  <Utensils size={14} className="mx-auto mb-1" style={{ color: "var(--color-blue)" }} />
                                  <p className="text-sm font-bold text-foreground">{message.foodScan.carbs}g</p>
                                  <p className="text-[9px] text-muted-foreground">Carbs</p>
                                </div>
                                <div className="bg-secondary/50 rounded-xl p-2 text-center">
                                  <Droplet size={14} className="mx-auto mb-1" style={{ color: "var(--color-nutrition)" }} />
                                  <p className="text-sm font-bold text-foreground">{message.foodScan.fat}g</p>
                                  <p className="text-[9px] text-muted-foreground">Fat</p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="bg-secondary/50 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] sm:max-w-lg">
                            <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
                          </div>
                          <div className="flex gap-2 mt-2 ml-1">
                            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Copy</button>
                            <span className="text-muted-foreground/30">|</span>
                            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Regenerate</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={14} className="text-primary-foreground" />
                    </div>
                    <div className="bg-secondary/50 px-4 py-3 rounded-2xl rounded-tl-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEnd} />
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border bg-background p-3 sm:p-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative bg-secondary/30 border-2 border-border rounded-2xl focus-within:border-primary/50 transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Ask me anything about your health..."
                  rows={1}
                  className="w-full bg-transparent px-4 py-3 pr-28 sm:pr-32 text-foreground placeholder:text-muted-foreground focus:outline-none resize-none text-sm"
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-0.5 sm:gap-1">
                  <button
                    onClick={() => setShowFoodScanner(true)}
                    className="p-2 rounded-lg hover:bg-[var(--color-orange)]/10 transition-colors group"
                    title="Scan Food"
                  >
                    <Camera size={18} className="text-muted-foreground group-hover:text-[var(--color-orange)] transition-colors" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <Mic size={18} />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-2">
                Your AI Coach may provide general wellness information. Always consult a healthcare professional for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Food Scanner Modal */}
      {showFoodScanner && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => !scanningFood && setShowFoodScanner(false)}
        >
          <div
            className="bg-card border-2 border-border rounded-3xl max-w-sm w-full p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFoodScanner(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
            >
              <X size={18} />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-[var(--color-orange)]/10 flex items-center justify-center mx-auto mb-4">
              <Camera size={32} style={{ color: "var(--color-orange)" }} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Scan Your Food</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Take a photo of your meal to get instant nutritional analysis, calorie count, and health recommendations.
            </p>

            {/* Camera preview */}
            <div className="w-full aspect-[4/3] mx-auto border-2 border-dashed border-border rounded-2xl flex items-center justify-center mb-6 bg-secondary/30 overflow-hidden relative">
              {scanningFood ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-semibold text-foreground">Analyzing food...</p>
                  <p className="text-xs text-muted-foreground">Identifying nutrients</p>
                </div>
              ) : (
                <div className="text-center p-4">
                  <Camera size={40} className="text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Camera preview</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleFoodScan}
                disabled={scanningFood}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all border-2 border-primary active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Camera size={16} />
                {scanningFood ? "Scanning..." : "Take Photo"}
              </button>
              <button
                onClick={() => setShowFoodScanner(false)}
                disabled={scanningFood}
                className="px-4 py-3 bg-secondary text-foreground rounded-2xl font-bold text-sm border-2 border-border hover:bg-secondary/80 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
