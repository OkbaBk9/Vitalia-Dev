"use client"

import { Check, MessageCircle } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "الخطة الأساسية",
    description: "للمشاريع الصغيرة والطلبات البسيطة",
    price: "100",
    features: [
      "خدمة واحدة أو أكثر",
      "استشارة مجانية",
      "دعم عبر البريد الإلكتروني",
      "تسليم سريع",
      "ضمان الجودة",
    ],
    highlighted: false,
  },
  {
    name: "الخطة المتقدمة",
    description: "للمشاريع المتوسطة والطلبات المنتظمة",
    price: "500",
    features: [
      "خدمات متعددة",
      "استشارة مخصصة",
      "دعم أولوية",
      "تسليم في الوقت المحدد",
      "ضمان الجودة الممتد",
      "خصم خاص",
    ],
    highlighted: true,
  },
  {
    name: "الخطة المؤسسية",
    description: "للمشاريع الكبيرة والعقود طويلة الأجل",
    price: "مخصص",
    features: [
      "حل متكامل مخصص",
      "فريق مخصص",
      "دعم 24/7",
      "تسليم ملبي",
      "ضمان الجودة الكامل",
      "أسعار تفضيلية",
      "استشارات استراتيجية",
    ],
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <main className="min-h-screen bg-background overflow-hidden pt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-400/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-slide-down">
          <h1 className="hero-title">خطط الأسعار</h1>
          <p className="text-xl text-muted-foreground">
            اختر الخطة التي تناسب احتياجاتك
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-3xl transition-all duration-300 animate-slide-up ${
                  plan.highlighted
                    ? "glass-card border-2 border-blue-500 shadow-2xl shadow-blue-500/20 md:scale-105"
                    : "glass-card"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8 md:p-10 space-y-6 h-full flex flex-col">
                  {plan.highlighted && (
                    <div className="inline-block bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full w-fit">
                      الأفضل قيمة
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="py-6 border-y border-border">
                    <p className="text-4xl font-black text-blue-600 mb-2">
                      {plan.price === "مخصص" ? "مخصص" : `${plan.price} DA`}
                    </p>
                    {plan.price !== "مخصص" && (
                      <p className="text-xs text-muted-foreground">والخدمات الإضافية حسب الطلب</p>
                    )}
                  </div>

                  <div className="space-y-3 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://wa.me/213780229481"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      plan.highlighted
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                  >
                    <MessageCircle size={18} />
                    اختر هذه الخطة
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title mb-12">مقارنة شاملة</h2>
          
          <div className="glass-card rounded-3xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-right font-bold text-foreground">الميزة</th>
                  <th className="px-6 py-4 text-center font-bold text-foreground">الأساسية</th>
                  <th className="px-6 py-4 text-center font-bold text-foreground bg-blue-600/10">المتقدمة</th>
                  <th className="px-6 py-4 text-center font-bold text-foreground">المؤسسية</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "الدعم الفني", basic: "✓", advanced: "✓", enterprise: "✓" },
                  { feature: "ضمان الجودة", basic: "✓", advanced: "✓", enterprise: "✓" },
                  { feature: "استشارة مجانية", basic: "✓", advanced: "✓", enterprise: "✓" },
                  { feature: "دعم أولوية", basic: "", advanced: "✓", enterprise: "✓" },
                  { feature: "فريق مخصص", basic: "", advanced: "", enterprise: "✓" },
                  { feature: "دعم 24/7", basic: "", advanced: "", enterprise: "✓" },
                  { feature: "أسعار تفضيلية", basic: "", advanced: "✓", enterprise: "✓" },
                  { feature: "استشارات استراتيجية", basic: "", advanced: "", enterprise: "✓" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{row.basic}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground bg-blue-600/5 font-bold text-blue-600">{row.advanced}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-12">أسئلة الأسعار</h2>
          
          <div className="space-y-6">
            {[
              {
                question: "هل يمكن تخصيص الأسعار؟",
                answer: "نعم بالتأكيد! جميع أسعارنا قابلة للتفاوض حسب متطلبات مشروعك.",
              },
              {
                question: "هل هناك خصومات للعقود طويلة الأجل؟",
                answer: "نعم، نقدم خصومات خاصة للعقود طويلة الأجل والطلبات المنتظمة.",
              },
              {
                question: "هل تشملون الضرائب في الأسعار المعروضة؟",
                answer: "الأسعار المعروضة لا تشمل الضرائب. سيتم إضافة الضرائب المطبقة عند الفاتورة.",
              },
              {
                question: "ما هي شروط الدفع؟",
                answer: "نقبل الدفع نقداً، وتحويل بنكي، ودفع جزئي عند الشروع وجزء عند التسليم.",
              },
            ].map((faq, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            هل أنت مستعد للبدء؟
          </h2>
          <p className="text-lg text-muted-foreground">
            اختر الخطة المناسبة وابدأ اليوم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/213780229481"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              تواصل معنا الآن
            </a>
            <Link
              href="/services"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              عرض جميع الخدمات
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
