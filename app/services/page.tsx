"use client"

import { useState, useMemo } from "react"
import { Search, Heart, ShoppingCart, MessageCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const servicesData = {
  "digital": {
    label: "الخدمات الرقمية",
    items: [
      { name: "إنشاء بريد إلكتروني", price: 100, icon: "📧" },
      { name: "إدارة / استرجاع البريد", price: 100, icon: "📧" },
      { name: "إنشاء فيسبوك", price: 200, icon: "👥" },
      { name: "إدارة فيسبوك", price: 200, icon: "👥" },
      { name: "سيرة ذاتية بسيطة", price: 200, icon: "📄" },
      { name: "سيرة ذاتية مع تصميم", price: 400, icon: "✨" },
      { name: "الكتابة (فرنسي)", price: 150, icon: "⌨️" },
      { name: "الكتابة (عربي)", price: 200, icon: "⌨️" },
      { name: "البحث عبر الإنترنت", price: 100, icon: "🔍" },
      { name: "التحميل من الإنترنت", price: 100, icon: "⬇️" },
      { name: "إضافة/تعديل خرائط جوجل", price: 200, icon: "🗺️" },
      { name: "الحجز عبر الإنترنت", price: "متغير", icon: "📅" },
      { name: "مواعيد عبر الإنترنت", price: "متغير", icon: "⏰" },
      { name: "طباعة المستندات أونلاين", price: 100, icon: "🖨️" },
    ]
  },
  "printing": {
    label: "الطباعة والتصوير",
    items: [
      { name: "طباعة A4 أبيض وأسود", price: 20, icon: "📋" },
      { name: "طباعة A3 أبيض وأسود", price: 40, icon: "📋" },
      { name: "طباعة A4 ملون (وجه واحد)", price: 50, icon: "🖨️" },
      { name: "طباعة A4 ملون (وجهين)", price: 80, icon: "🖨️" },
      { name: "طباعة A3 ملون (وجه واحد)", price: 100, icon: "🖨️" },
      { name: "طباعة A3 ملون (وجهين)", price: 150, icon: "🖨️" },
      { name: "تصوير A4 أبيض وأسود", price: 20, icon: "📠" },
      { name: "تصوير A3 أبيض وأسود", price: 40, icon: "📠" },
      { name: "تصوير A4 ملون", price: 100, icon: "📠" },
      { name: "تصوير A3 ملون", price: 200, icon: "📠" },
      { name: "ماسح ضوئي", price: 40, icon: "📸" },
      { name: "إرسال عبر البريد الإلكتروني", price: 100, icon: "📧" },
      { name: "إرسال فاكس", price: 100, icon: "📠" },
      { name: "استقبال فاكس", price: 50, icon: "📬" },
      { name: "تلميع A4", price: 100, icon: "✨" },
      { name: "تلميع A3", price: 150, icon: "✨" },
      { name: "ربط بسيط", price: 150, icon: "📎" },
    ]
  },
  "administrative": {
    label: "الخدمات الإدارية",
    items: [
      { name: "رسائل / طلبات / شكاوى", price: 200, icon: "📝" },
      { name: "الملفات الإدارية", price: 300, icon: "📁" },
      { name: "تسجيلات مختلفة", price: 300, icon: "📋" },
      { name: "حجز المواعيد", price: 100, icon: "📅" },
      { name: "الشهادات", price: "متغير", icon: "📜" },
      { name: "طباعة المواضيع", price: "متغير", icon: "📚" },
      { name: "استشارة الوثائق", price: 100, icon: "📖" },
      { name: "ملء الاستمارات", price: 100, icon: "✍️" },
      { name: "الوثائق الرسمية", price: 200, icon: "🏛️" },
      { name: "إعلان المنصات", price: 200, icon: "📢" },
    ]
  },
  "payment": {
    label: "الدفع والتمويل",
    items: [
      { name: "بطاقة إدهبية", price: "300-400", icon: "💳" },
      { name: "تحويل CCP", price: 150, icon: "🏦" },
      { name: "دفع الفواتير", price: 100, icon: "💰" },
      { name: "خدمة إضافية (250 دج)", price: 250, icon: "⚡" },
      { name: "الشراء من الإنترنت", price: 200, icon: "🛒" },
      { name: "شحن الحسابات", price: 100, icon: "🔋" },
      { name: "G12/G12 BIS/G51/G8", price: "متغير", icon: "📋" },
      { name: "دفع المخالفات", price: 150, icon: "🚨" },
      { name: "ملء قسيمة", price: 100, icon: "📋" },
      { name: "طباعة إيصال CCP", price: 50, icon: "🧾" },
    ]
  }
}

type Category = keyof typeof servicesData;

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("digital")
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const categories: { key: Category; label: string }[] = [
    { key: "digital", label: "الخدمات الرقمية" },
    { key: "printing", label: "الطباعة والتصوير" },
    { key: "administrative", label: "الخدمات الإدارية" },
    { key: "payment", label: "الدفع والتمويل" },
  ]

  const filteredItems = useMemo(() => {
    const categoryItems = servicesData[selectedCategory].items
    if (!searchQuery.trim()) return categoryItems

    return categoryItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [selectedCategory, searchQuery])

  const toggleFavorite = (itemName: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(itemName)) {
      newFavorites.delete(itemName)
    } else {
      newFavorites.add(itemName)
    }
    setFavorites(newFavorites)
  }

  return (
    <main className="min-h-screen bg-background overflow-hidden pt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-400/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-down">
            <h1 className="hero-title mb-4">خدماتنا المتنوعة</h1>
            <p className="text-lg text-muted-foreground">
              اكتشف مجموعة شاملة من الخدمات المهنية والموثوقة
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="ابحث عن خدمة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-4 rounded-xl bg-white dark:bg-slate-800 border border-border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-8 animate-slide-up">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 md:px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === cat.key
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white dark:bg-slate-800 text-foreground hover:bg-slate-50 dark:hover:bg-slate-700 border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const isFavorite = favorites.has(item.name)
                return (
                  <div
                    key={item.name}
                    className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{item.icon}</div>
                      <button
                        onClick={() => toggleFavorite(item.name)}
                        className={`p-2 rounded-lg transition-all ${
                          isFavorite
                            ? "bg-red-100 dark:bg-red-900/30 text-red-600"
                            : "bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:text-red-600"
                        }`}
                      >
                        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Service Name */}
                    <h3 className="font-bold text-foreground text-lg mb-2">{item.name}</h3>

                    {/* Price */}
                    <div className="mb-6">
                      <p className="text-2xl font-black text-blue-600">
                        {typeof item.price === "number" ? `${item.price} DA` : item.price}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">السعر قد يتغير حسب المتطلبات</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 size={16} className="text-blue-600" />
                        <span>خدمة احترافية</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 size={16} className="text-blue-600" />
                        <span>ضمان الجودة</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href={`https://wa.me/213780229481?text=أنا%20مهتم%20بخدمة:%20${encodeURIComponent(item.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageCircle size={16} />
                      اطلب الآن
                    </a>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground mb-4">لم نجد خدمات تطابق بحثك</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="btn-outline"
                >
                  إعادة تعيين البحث
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            لم تجد الخدمة التي تبحث عنها؟
          </h2>
          <p className="text-lg text-muted-foreground">
            تواصل معنا وتحدث عن احتياجاتك الخاصة. نحن هنا لمساعدتك!
          </p>
          <a
            href="https://wa.me/213780229481"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            تواصل معنا الآن
          </a>
        </div>
      </section>
    </main>
  )
}
