"use client"

import { Zap, Shield, Clock, Users, Award, Target } from "lucide-react"
import Link from "next/link"

export default function About() {
  const values = [
    { icon: Zap, title: "الكفاءة", description: "خدمات سريعة ومحترفة" },
    { icon: Shield, title: "الموثوقية", description: "نضمن أعلى معايير الجودة" },
    { icon: Users, title: "الفريق المتخصص", description: "خبرة تزيد عن 8 سنوات" },
    { icon: Award, title: "الجودة", description: "ضمان 100% على جميع الخدمات" },
  ]

  const timeline = [
    { year: "2016", milestone: "بدء أول خدمة طباعة وتصوير" },
    { year: "2018", milestone: "توسيع الخدمات الرقمية" },
    { year: "2020", milestone: "إطلاق الخدمات الإدارية" },
    { year: "2023", milestone: "توسيع محلي وإقليمي" },
  ]

  return (
    <main className="min-h-screen bg-background overflow-hidden pt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-400/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-slide-down">
          <h1 className="hero-title">من نحن؟</h1>
          <p className="text-xl text-muted-foreground">
            منذ عام 2016، نقدم خدمات احترافية وموثوقة لآلاف العملاء الراضين
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold">قصتنا</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              بدأت أوقبة سرفيسز برؤية بسيطة: توفير خدمات احترافية موثوقة وسهلة الوصول للجميع. ما بدأ كمركز صغير للطباعة والتصوير، تطور ليصبح مركزاً متعدد الخدمات يخدم آلاف العملاء.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              اليوم، نفخر بخدماتنا الشاملة التي تغطي الخدمات الرقمية والطباعة والخدمات الإدارية والمالية. كل خدمة نقدمها تعكس التزامنا بالجودة والاحترافية.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title mb-12">قيمنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="glass-card p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-12">رحلتنا</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 animate-slide-right" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  {index < timeline.length - 1 && <div className="w-1 h-16 bg-blue-600 mt-4" />}
                </div>
                <div className="glass-card rounded-2xl p-6 flex-1">
                  <h3 className="text-lg font-bold text-blue-600 mb-2">{item.year}</h3>
                  <p className="text-foreground">{item.milestone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: "500+", label: "عميل راضي" },
              { number: "1000+", label: "مشروع منجز" },
              { number: "8+", label: "سنوات خبرة" },
              { number: "100%", label: "معدل الرضا" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl text-center">
                <p className="text-4xl font-black text-blue-600 mb-2">{stat.number}</p>
                <p className="text-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            هل تريد التعاون معنا؟
          </h2>
          <p className="text-lg text-muted-foreground">
            تواصل معنا لمعرفة كيفية يمكننا خدمتك بأفضل طريقة
          </p>
          <a
            href="https://wa.me/213780229481"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            تواصل الآن
          </a>
        </div>
      </section>
    </main>
  )
}
