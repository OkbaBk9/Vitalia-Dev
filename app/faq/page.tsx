"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqItems = [
  {
    question: "ما هي ساعات العمل؟",
    answer: "نحن نعمل من السبت إلى الخميس من 8:00 صباحاً إلى 7:00 مساءً. نرحب بطلباتك على مدار الساعة عبر الواتس اب والبريد الإلكتروني.",
  },
  {
    question: "كم يستغرق تنفيذ الطلب؟",
    answer: "يختلف الوقت حسب نوع الخدمة. معظم الخدمات تنجز خلال 24-48 ساعة. الطلبات الطارئة قد تنجز بشكل أسرع حسب التوفر.",
  },
  {
    question: "هل توفرون خدمة التوصيل؟",
    answer: "نعم، نوفر خدمة التوصيل لجميع الطلبات في محافظة البليدة. يمكنك أيضاً الاستلام مباشرة من فرعنا.",
  },
  {
    question: "ما طرق الدفع المتاحة؟",
    answer: "نقبل الدفع نقداً، وتحويل بنكي، وأيضاً الدفع عند الاستلام للطلبات المحلية.",
  },
  {
    question: "هل هناك ضمان على الخدمات؟",
    answer: "نعم، نضمن جودة جميع خدماتنا. في حالة عدم رضاك، نعيد تنفيذ الخدمة مجاناً.",
  },
  {
    question: "هل تقبلون طلبات خاصة مخصصة؟",
    answer: "نعم بالتأكيد! يمكنك التواصل معنا لمناقشة احتياجاتك الخاصة، وسنقدم لك حلاً مناسباً.",
  },
  {
    question: "ما هي أسعاركم مقارنة بالمنافسين؟",
    answer: "نقدم أسعاراً تنافسية جداً مع جودة عالية. جميع أسعارنا محددة بوضوح وبدون رسوم مخفية.",
  },
  {
    question: "كيف يمكنني الاستفسار عن خدمة معينة؟",
    answer: "يمكنك التواصل معنا عبر الهاتف، البريد الإلكتروني، أو الواتس اب. فريقنا جاهز للإجابة على جميع أسئلتك.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
          <h1 className="hero-title">الأسئلة الشائعة</h1>
          <p className="text-xl text-muted-foreground">
            إجابات على أكثر الأسئلة التي يطرحها عملاؤنا
          </p>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <h3 className="font-bold text-foreground text-left">{item.question}</h3>
                <ChevronDown
                  size={24}
                  className={`text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            لم تجد إجابتك؟
          </h2>
          <p className="text-lg text-muted-foreground">
            تواصل معنا مباشرة، فريقنا جاهز للمساعدة
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
