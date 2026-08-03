"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap, Shield, Clock, Users } from "lucide-react"

export default function Home() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "أوقبة سرفيسز - خدماتك الموثوقة"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: Zap,
      title: "سرعة عالية",
      description: "خدمات سريعة وفعالة بأقل وقت ممكن"
    },
    {
      icon: Shield,
      title: "الأمان والموثوقية",
      description: "نضمن سلامة وخصوصية معلوماتك"
    },
    {
      icon: Clock,
      title: "توفر دائم",
      description: "متاح 24/7 لخدمتك"
    },
    {
      icon: Users,
      title: "فريق محترف",
      description: "فريق متخصص وذو خبرة عالية"
    }
  ]

  const stats = [
    { number: "500+", label: "عميل راضي" },
    { number: "1000+", label: "مشروع منجز" },
    { number: "8+", label: "سنوات خبرة" },
    { number: "100%", label: "ضمان الجودة" }
  ]

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-400/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-slide-right">
              <div>
                <p className="text-blue-600 font-semibold mb-2">مرحبا بك في</p>
                <h1 className="hero-title text-gradient">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </h1>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                نقدم مجموعة شاملة من الخدمات الاحترافية: من الخدمات الرقمية إلى الطباعة والتصوير والخدمات الإدارية والمالية. كل شيء تحتاجه في مكان واحد.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/213780229481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  تواصل الآن
                  <ArrowRight size={18} />
                </a>
                <Link
                  href="/services"
                  className="btn-outline inline-flex items-center justify-center gap-2"
                >
                  استكشف الخدمات
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-xl md:text-2xl font-bold text-blue-600">{stat.number}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative h-96 md:h-full min-h-96 animate-slide-left">
              <div className="absolute inset-0 glass-card rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-yellow-400/20 group-hover:from-blue-600/30 transition-all duration-500" />
                <div className="text-center space-y-4 relative z-10">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white text-5xl font-black shadow-lg shadow-blue-500/30">
                    O
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">أوقبة سرفيسز</h2>
                  <p className="text-sm text-muted-foreground">الخدمات الموثوقة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">لماذا تختارنا؟</h2>
            <p className="section-subtitle">نحن نقدم الأفضل في كل جانب</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              هل أنت مستعد لتحويل احتياجاتك إلى واقع؟
            </h2>
            <p className="text-lg text-muted-foreground">
              تواصل معنا اليوم واكتشف كيف يمكننا مساعدتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="https://wa.me/213780229481"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                تواصل عبر واتساب
                <ArrowRight size={18} />
              </a>
              <Link
                href="/contact"
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                اتصل بنا مباشرة
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
