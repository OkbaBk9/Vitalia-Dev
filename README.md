# Okba Services - Arabic-First Professional Services Website

A premium, modern Arabic-first website for **Okba Services** (أوقبة سرفيسز) - a comprehensive professional services provider in Blida, Algeria.

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Built with Tailwind CSS](https://img.shields.io/badge/Built%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app)

## 🎨 Design Features

- **Premium glassmorphism design** with smooth animations
- **Full RTL (Right-to-Left) support** for Arabic language
- **Responsive mobile-first layout** for all devices
- **Dark mode support** for comfortable viewing
- **Smooth scroll animations** and interactive elements
- **Blue and Yellow brand colors** from Okba Services logo
- **Arabic fonts**: IBM Plex Sans Arabic, Montserrat

## 📱 Pages

### Core Pages
- **Home** - Hero section with animated title, features showcase, and CTA
- **Services** - Interactive service catalog with:
  - 4 service categories (Digital, Printing, Administrative, Payment)
  - Real-time search functionality
  - Favorite/bookmark system
  - Direct WhatsApp contact for each service
  - Full pricing display (67+ services)
  
- **Pricing** - Pricing plans with:
  - 3 tiers (Basic, Advanced, Enterprise)
  - Comprehensive feature comparison
  - FAQ section
  - Contact CTA

- **About** - Company story with:
  - Company values (Efficiency, Reliability, Team, Quality)
  - Timeline of milestones
  - Team statistics
  - Business achievements

- **FAQ** - 8 comprehensive frequently asked questions with smooth accordion

- **Contact** - Contact page with:
  - Contact information cards
  - Contact form with WhatsApp integration
  - Embedded Google Maps
  - Multiple contact methods

### Secondary Pages
- **Privacy Policy** - Data protection and privacy commitment
- **Terms of Service** - Usage terms and conditions

## 🎯 Key Features

### Services Catalog
- **67 total services** across 4 categories
- Each service displays: name, price, features, and WhatsApp link
- Responsive grid layout (1-3 columns)
- Instant search across all services
- Favorites/bookmark functionality

### Contact Integration
- **Direct WhatsApp integration** for all CTAs
- Contact form automatically sends to WhatsApp
- Phone, email, and physical address displayed
- Embedded Google Maps location
- 24/7 availability messaging

### Animations
- Page load animations with stagger effects
- Smooth scroll reveal animations
- Hover effects on interactive elements
- Typewriter effect on hero title
- Floating glassmorphic effects

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom themes
- **UI Components**: Radix UI with shadcn/ui base
- **Icons**: Lucide React
- **Fonts**: Google Fonts (IBM Plex Sans Arabic, Montserrat)
- **RTL Support**: Native HTML dir attribute with custom CSS

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3001` in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout with RTL support
├── globals.css         # Global styles with Arabic fonts and animations
├── page.tsx            # Home page
├── services/
│   └── page.tsx        # Services catalog
├── pricing/
│   └── page.tsx        # Pricing page
├── about/
│   └── page.tsx        # About page
├── faq/
│   └── page.tsx        # FAQ page
├── contact/
│   └── page.tsx        # Contact page
├── privacy/
│   └── page.tsx        # Privacy policy
└── terms/
    └── page.tsx        # Terms of service

components/
├── navigation.tsx      # Main navigation with RTL support
└── footer.tsx          # Footer with links and info
```

## 🎨 Customization

### Brand Colors
Located in `app/globals.css`:
- Primary Blue: `#1e40af`
- Accent Yellow: `#fbbf24`
- Dark Text: `#0f172a`

### Services Data
Modify service categories and items in `app/services/page.tsx`:
```typescript
const servicesData = {
  "digital": { label: "الخدمات الرقمية", items: [...] },
  // ... more categories
}
```

### Contact Information
Update contact details in:
- `app/contact/page.tsx` - Contact page
- `components/navigation.tsx` - Navigation
- `components/footer.tsx` - Footer

## 📊 Services Offered

### Digital Services (14)
- Email creation & management
- Facebook account management
- CV writing (simple & designed)
- Document typing (Arabic & French)
- Internet search & downloading
- Google Maps updates
- Online booking systems
- Online appointments
- Online document printing

### Printing & Copying (17)
- B&W printing (A4, A3)
- Color printing (A4, A3, single/double-sided)
- B&W copying (A4, A3)
- Color copying (A4, A3)
- Scanning services
- Email & fax services
- Plastification (A4, A3)
- Document binding

### Administrative Services (10)
- Letters & requests
- Administrative files
- Various registrations
- Appointment booking
- Certificates
- Document consultation
- Form filling
- Official documents

### Payment & Finance Services (10)
- EDAHBIA card processing
- CCP transfers
- Bill payment
- Online purchases
- Account charging
- Government tax forms
- Fine payment
- CCP receipt printing

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Build: `npm run build`
- Start: `npm start`
- Supports Next.js 16 on any Node.js hosting

## 📱 Responsive Design

- **Mobile** (< 768px) - Single column layout, full-width cards
- **Tablet** (768px - 1024px) - 2-column grid
- **Desktop** (> 1024px) - 3-column grid for optimal viewing

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators on buttons
- Alt text for icons and images
- Color contrast compliance

## 🔒 SEO & Meta Tags

- Optimized meta descriptions in Arabic
- OpenGraph tags for social sharing
- Structured data for services and business
- Sitemap ready (can add sitemap.xml)
- Robots.txt compatible

## 📧 Contact Information

All contact methods integrated:
- **WhatsApp**: +213 78 02 29 481
- **Email**: okbaservices09@gmail.com
- **Address**: Bab Dzair, Blida, Algeria
- **Google Maps**: Embedded location view
- **Hours**: Saturday - Thursday, 8:00 AM - 7:00 PM

## 🔧 Configuration

### Next.js Config
Standard Next.js 16 configuration with:
- Turbopack bundler (default)
- React Compiler ready
- Image optimization enabled
- RTL support configured

### Environment Variables
No external API keys required for core functionality. All contact forms integrate directly with WhatsApp.

---

**Professional Services Excellence** - Built for Okba Services with ❤️
