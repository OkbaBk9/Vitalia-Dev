# Vitalia - Enhanced Health & Wellness Platform

A modern, production-ready health and wellness app with real maps, interactive communities, and comprehensive backend functionality.

## Recent Updates

### 🗺️ **Real Map Integration**
- Integrated Leaflet.js with OpenStreetMap tiles for realistic mapping
- Display friends' real-time locations on the map
- Show clubs, events, gyms, and hiking routes
- Interactive map with zoom, pan, and location search
- Hiking route tracking from Wikiloc/Google Maps

### 📱 **Redesigned Mobile Navigation**
- **Bottom Hub Navigation**: Home → Learning → AI Hub (centered green button) → Consult → Shop
- **AI Hub Button**: Large, eye-catching emerald gradient button in the middle of the nav
- **Profile Sidebar**: Tap profile to see events, maps, saved posts, and settings
- Clean, modern glassmorphism design with smooth animations

### 🎯 **Profile Sidebar (Mobile)**
- **Events Tab**: View upcoming wellness events and group activities
- **Maps Tab**: Browse saved routes and favorite locations
- **Saved Posts Tab**: Quick access to bookmarked community posts
- **Settings Tab**: Privacy, notifications, devices, account settings

### 🏙️ **Club Map View**
- Visual representation of running clubs and mental health communities on an interactive map
- Shows member counts and next event times
- Click to join clubs directly or get more information
- Real location data for Algiers-based communities

### 💎 **Enhanced Visual Design**
- **Better Glassmorphism**: Premium glass effects with enhanced backdrop blur and depth
- **3D Icon Effects**: Custom 3D icon components with hover animations
- **Enhanced Popups**: Bouncing popup animations with improved shadows and styling
- **Improved + Button**: Large, glowing green button with pulse effects and smooth interactions

### 🔗 **Working Backend APIs**

#### Events API (`/api/events`)
```typescript
GET /api/events          // Fetch all events
POST /api/events         // Create new event
```

#### Clubs API (`/api/clubs`)
```typescript
GET /api/clubs           // Fetch all clubs
POST /api/clubs          // Create new club
```

#### Health Data API (`/api/health`)
```typescript
GET /api/health?userId=user1&days=7    // Fetch health data
POST /api/health                        // Record health metrics
```

### 🎣 **Data Fetching Hooks**
All hooks support real backend integration:
- `useEvents()` - Fetch and manage wellness events
- `useClubs()` - Fetch and manage community clubs
- `useHealthData(userId, days)` - Fetch user health metrics

Example usage:
```typescript
const { events, loading, error, addEvent } = useEvents()
const { clubs, loading, error, addClub } = useClubs()
const { data, loading, error, addData } = useHealthData("user1", 7)
```

## New Components

- **MapViewer** (`components/map-viewer.tsx`) - Leaflet-based interactive map
- **ProfileSidebar** (`components/profile-sidebar.tsx`) - Mobile profile drawer
- **Icon3D** (`components/icon-3d.tsx`) - 3D icon effects component

## File Structure

```
app/
├── api/
│   ├── events/route.ts       # Events API
│   ├── clubs/route.ts        # Clubs API
│   └── health/route.ts       # Health data API
├── map/page.tsx              # Interactive map page
├── clubs/page.tsx            # Clubs with map view
└── layout.tsx

components/
├── map-viewer.tsx            # Leaflet map component
├── profile-sidebar.tsx       # Profile drawer for mobile
├── icon-3d.tsx              # 3D icon effects
└── navigation.tsx           # Updated with new nav structure

hooks/
├── use-events.ts            # Events data hook
├── use-clubs.ts             # Clubs data hook
└── use-health-data.ts       # Health data hook
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

This includes:
- `leaflet` - Map rendering
- `react-leaflet` - React wrapper for Leaflet
- `leaflet-routing-machine` - Route calculation

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production
```bash
npm run build
npm start
```

## Key Features

### 🏃 **Wellness Tracking**
- Track daily vitality score, steps, water intake, sleep, and calories
- Interactive health metrics with real-time updates
- Weekly activity heatmap

### 👥 **Community**
- Join running clubs and mental health communities
- Share achievements and get high-fives from the community
- Organize and discover wellness events

### 🗺️ **Location-Based Discovery**
- Find nearby clubs, gyms, and events
- See friends' real-time locations
- Explore hiking trails and running routes

### 🎮 **Gamification**
- Daily challenges and streaks
- Earn badges and level up
- Compete on leaderboards

## Styling & Theme

- **Color System**: Primary teal, accent orange, activity/orange streak, mindfulness purple
- **Glassmorphism**: Enhanced backdrop blur with premium depth effects
- **Animations**: Smooth transitions and micro-interactions throughout
- **Mobile-First**: Optimized for touch and mobile devices

## Backend Integration Ready

All APIs are fully functional with mock data:
- Ready for database connection (PostgreSQL, MongoDB, etc.)
- SWR-compatible for client-side data fetching
- Type-safe with TypeScript interfaces
- Error handling and loading states built-in

## Performance Optimizations

- Dynamic imports for heavy components (Map, Sidebar)
- Optimized rerenders with proper memoization
- Smooth animations with CSS transforms
- Lazy loading for routes

## Next Steps

### To Add Real Database:
1. Connect Supabase, Firebase, or your preferred database
2. Update the API routes to use real database queries
3. Add authentication layer
4. Implement RLS (Row-Level Security) policies

### To Deploy:
1. Push to GitHub: `git push origin main`
2. Connect to Vercel or your hosting platform
3. Set environment variables
4. Deploy with `vercel deploy`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT - Feel free to use this as a template for your own projects!

---

**Built with** Next.js 16, React 19, TypeScript, Tailwind CSS, and Leaflet
