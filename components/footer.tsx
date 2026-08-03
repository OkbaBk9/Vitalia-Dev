"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black">O</span>
              </div>
              <div>
                <div className="text-sm font-bold">Okba Services</div>
                <div className="text-xs text-blue-300">أوقبة سرفيسز</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              خدمات احترافية ومتكاملة لجميع احتياجاتك
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm mb-4">الروابط السريعة</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                  الأسعار
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  حولنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-sm mb-4">الخدمات الرئيسية</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  خدمات رقمية
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  طباعة وتصوير
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  خدمات إدارية
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  دفع وتحويل
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <a href="tel:+213780229481" className="hover:text-blue-400 transition-colors">
                  0780229481
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <a href="mailto:okbaservices09@gmail.com" className="hover:text-blue-400 transition-colors break-all">
                  okbaservices09@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>باب الجزائر، البليدة</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-6 mb-6">
          {/* Newsletter */}
          <div className="max-w-md mx-auto mb-6">
            <h3 className="font-bold text-sm mb-3 text-center">اشترك في النشرة البريدية</h3>
            <form className="flex items-center gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© 2024 Okba Services. جميع الحقوق محفوظة</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
