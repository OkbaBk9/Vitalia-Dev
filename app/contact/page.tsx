"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create WhatsApp message with form data
    const message = `مرحبا، أنا ${formData.name}%0Aالبريد: ${formData.email}%0Aالهاتف: ${formData.phone}%0Aالرسالة: ${formData.message}`
    window.open(`https://wa.me/213780229481?text=${message}`, "_blank")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "الهاتف",
      info: "0780229481",
      action: "tel:+213780229481",
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      info: "okbaservices09@gmail.com",
      action: "mailto:okbaservices09@gmail.com",
    },
    {
      icon: MapPin,
      title: "العنوان",
      info: "باب الجزائر، البليدة",
      action: "https://maps.google.com/maps/place/okbaservices/@36.4738155,2.8306667",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      info: "السبت - الخميس: 8:00 - 19:00",
      action: "#",
    },
  ]

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
          <h1 className="hero-title">اتصل بنا</h1>
          <p className="text-xl text-muted-foreground">
            نحن هنا للإجابة على أسئلتك ومساعدتك
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 stagger-children">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <a
                  key={index}
                  href={item.action}
                  target={item.action.startsWith("http") ? "_blank" : undefined}
                  rel={item.action.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass-card p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/30 transition-colors">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.info}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="animate-slide-right">
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    الاسم
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="اسمك الكامل"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="بريدك الإلكتروني"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="رقم هاتفك"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    الرسالة
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    placeholder="اكتب رسالتك هنا..."
                    rows={5}
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6 animate-slide-left">
            <div className="glass-card rounded-3xl p-8 md:p-10 space-y-6">
              <h2 className="text-2xl font-bold">معلومات الاتصال</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">البريد الإلكتروني</p>
                  <a
                    href="mailto:okbaservices09@gmail.com"
                    className="text-blue-600 hover:text-blue-700 font-medium break-all"
                  >
                    okbaservices09@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">الهاتف</p>
                  <a href="tel:+213780229481" className="text-blue-600 hover:text-blue-700 font-medium">
                    +213 78 02 29 481
                  </a>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">العنوان</p>
                  <p className="text-foreground">باب الجزائر، البليدة، الجزائر</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">ساعات العمل</p>
                  <p className="text-foreground">السبت - الخميس: 08:00 - 19:00</p>
                  <p className="text-sm text-muted-foreground">الجمعة: مغلق</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <a
                  href="https://wa.me/213780229481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  تواصل عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">موقعنا</h2>
          <div className="glass-card rounded-3xl overflow-hidden h-96 animate-slide-up">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.7635848947025!2d2.8306667!3d36.4738155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128f0d000e05ac23%3A0x32e8d90a8ec3fc6f!2sokbaservices!5e0!3m2!1sar!2sdz!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
