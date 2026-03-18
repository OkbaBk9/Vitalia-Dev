"use client"

import { useEffect, useRef, forwardRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Friend {
  id: string
  name: string
  avatar: string
  latitude: number
  longitude: number
  color: string
}

interface POI {
  id: string
  type: string
  name: string
  latitude: number
  longitude: number
  description: string
}

interface HikingRoute {
  id: string
  name: string
  coordinates: [number, number][]
}

interface MapViewerProps {
  friends: Friend[]
  pois: POI[]
  routes: HikingRoute[]
}

const MapViewer = forwardRef<HTMLDivElement, MapViewerProps>(({ friends, pois, routes }, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const routesRef = useRef<L.Polyline[]>([])

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([36.7538, 3.0588], 13)

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map.current)

      // Custom icon styles
      const createCustomIcon = (color: string, initial: string) => {
        return L.divIcon({
          html: `<div style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary) 100%); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">${initial}</div>`,
          className: "custom-marker",
          iconSize: [40, 40],
          iconAnchor: [20, 20],
          popupAnchor: [0, -20],
        })
      }

      const createPOIIcon = (type: string) => {
        const colors: { [key: string]: string } = {
          club: "var(--color-blue)",
          event: "var(--color-orange)",
          gym: "var(--primary)",
          cafe: "var(--color-orange)",
          hiking: "var(--color-blue)",
        }
        return L.divIcon({
          html: `<div style="background: ${colors[type] || "var(--muted-foreground)"}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">📍</div>`,
          className: "custom-poi-marker",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -18],
        })
      }

      // Add user location
      const userMarker = L.circleMarker([36.7538, 3.0588], {
        radius: 8,
        color: "var(--primary)",
        fillColor: "var(--primary)",
        fillOpacity: 0.8,
        weight: 3,
        opacity: 1,
      }).addTo(map.current!)

      userMarker.bindPopup("<strong>Your Location</strong>")

      // Add friends
      friends.forEach((friend) => {
        if (map.current) {
          const marker = L.marker([friend.latitude, friend.longitude], {
            icon: createCustomIcon("var(--primary)", friend.avatar),
          })
            .addTo(map.current)
            .bindPopup(`<strong>${friend.name}</strong><br>${friend.name} is here`)

          markersRef.current.push(marker)
        }
      })

      // Add POIs
      pois.forEach((poi) => {
        if (map.current) {
          const marker = L.marker([poi.latitude, poi.longitude], {
            icon: createPOIIcon(poi.type),
          })
            .addTo(map.current)
            .bindPopup(`<strong>${poi.name}</strong><br>${poi.description}`)

          markersRef.current.push(marker)
        }
      })

      // Add hiking routes
      routes.forEach((route) => {
        if (map.current) {
          const polyline = L.polyline(route.coordinates, {
            color: "var(--color-blue)",
            weight: 3,
            opacity: 0.7,
            dashArray: "5, 5",
          })
            .addTo(map.current)
            .bindPopup(`<strong>${route.name}</strong>`)

          routesRef.current.push(polyline)
        }
      })

      // Expose map flyTo method
      if (ref && typeof ref === "object" && "current" in ref) {
        ref.current = mapContainer.current
        ;(ref.current as any).flyTo = (coords: [number, number], zoom: number) => {
          if (map.current) {
            map.current.flyTo(coords, zoom)
          }
        }
      }
    }

    return () => {
      // Cleanup is handled by Leaflet
    }
  }, [friends, pois, routes, ref])

  return <div ref={mapContainer} className="w-full h-full" />
})

MapViewer.displayName = "MapViewer"

export default MapViewer
