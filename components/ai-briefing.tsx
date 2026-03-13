"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, MessageCircle, ChevronRight, X } from "lucide-react"

export function AIBriefing() {
  const [isLoading, setIsLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)

  return (
    <>
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
          <div className="p-8 relative z-10">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6 animate-slide-down">
                  <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center animate-float">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold">Analyzing your wellness data...</p>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-primary-foreground/20 rounded-lg w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-primary-foreground/20 rounded-lg w-full animate-pulse"></div>
                  <div className="h-4 bg-primary-foreground/20 rounded-lg w-5/6 animate-pulse"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-4 mb-6 animate-slide-down">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/15 flex items-center justify-center flex-shrink-0 backdrop-blur-sm group hover:scale-110 transition-all duration-300 animate-float">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Your Daily Briefing</h3>
                    <p className="text-sm opacity-90">AI-powered personalized health insights</p>
                  </div>
                </div>

                <div
                  className="bg-primary-foreground/10 rounded-xl p-6 mb-6 backdrop-blur-sm border border-primary-foreground/10 animate-fade-scale"
                  style={{ animationDelay: "200ms" }}
                >
                  <div className="space-y-4">
                    <p className="text-base leading-relaxed">
                      Your sleep was <span className="font-semibold">6.5 hours</span> last night — below your 8-hour
                      goal. This can affect afternoon focus and energy levels.
                    </p>
                    <div className="bg-primary-foreground/10 rounded-lg p-4 hover:bg-primary-foreground/20 transition-all duration-300">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <span className="text-lg animate-bounce">💡</span> Recommendation
                      </p>
                      <p className="text-sm opacity-90">
                        I've added a <span className="font-semibold">10-minute Morning Energizer</span> to boost blood
                        flow and perceived energy for the day.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 animate-slide-up"
                    style={{ animationDelay: "300ms" }}
                    onClick={() => setShowChat(true)}
                  >
                    <ChevronRight className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                    Start Activity
                  </Button>
                  <button
                    onClick={() => setShowChat(true)}
                    className="text-primary-foreground hover:bg-primary-foreground/10 px-4 py-2.5 rounded-lg transition-all duration-300 font-medium flex items-center gap-2 hover:scale-105 active:scale-95 animate-slide-up"
                    style={{ animationDelay: "400ms" }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    More Details
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {showChat && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-scale">
          <Card
            className="w-full max-w-md rounded-2xl overflow-hidden flex flex-col shadow-xl animate-fade-scale"
            style={{ animationDelay: "100ms" }}
          >
            <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center animate-float">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="font-semibold">Vitalia Assistant</h2>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="p-1 hover:bg-primary-foreground/10 rounded-lg transition-all duration-300 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-background/50 space-y-4 max-h-96">
              <div className="bg-primary text-primary-foreground rounded-2xl p-4 rounded-tl-none max-w-xs animate-slide-up">
                <p className="text-sm leading-relaxed">
                  Your sleep was 1.5 hours below goal, which typically impacts afternoon energy. Light movement helps
                  counteract this effect—especially effective within 2 hours of waking.
                </p>
              </div>
              <div
                className="bg-muted text-foreground rounded-2xl p-4 rounded-br-none max-w-xs ml-auto animate-slide-up"
                style={{ animationDelay: "100ms" }}
              >
                <p className="text-sm">Makes sense! What else should I do today?</p>
              </div>
              <div
                className="bg-primary text-primary-foreground rounded-2xl p-4 rounded-tl-none max-w-xs animate-slide-up"
                style={{ animationDelay: "200ms" }}
              >
                <p className="text-sm">
                  Focus on hydration — you're at 72% of your goal. Aim for 2-3 glasses this afternoon.
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-border flex gap-2">
              <Button
                onClick={() => setShowChat(false)}
                className="flex-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Got It
              </Button>
              <Button
                onClick={() => setShowChat(false)}
                variant="outline"
                className="flex-1 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Later
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
