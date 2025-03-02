"use client"

import { useEffect, useRef } from "react"

type Station = {
  id: number
  name: string
  coordinates: {
    lat: number
    lng: number
  }
}

type MapComponentProps = {
  stations: Station[]
  selectedStation: number | null
  onStationSelect: (id: number) => void
}

export default function MapComponent({ stations, selectedStation, onStationSelect }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // This is a placeholder for an actual map implementation
    // In a real app, you would use a library like Leaflet, Google Maps, or Mapbox
    const mapContainer = mapRef.current

    // Create a simple placeholder map
    mapContainer.innerHTML = ""
    const mapElement = document.createElement("div")
    mapElement.className = "w-full h-full bg-gray-100 relative"
    mapElement.style.backgroundImage = "url('/placeholder.svg?height=400&width=800')"
    mapElement.style.backgroundSize = "cover"
    mapContainer.appendChild(mapElement)

    // Add markers for each station
    stations.forEach((station) => {
      const marker = document.createElement("div")
      marker.className = `absolute cursor-pointer transition-all duration-300 transform ${
        selectedStation === station.id ? "scale-125" : "scale-100"
      }`

      // Position markers based on coordinates (simplified for demo)
      // In a real map, you would use proper geo-positioning
      const x = (station.coordinates.lng + 15) * 20 // Simplified positioning
      const y = (10 - station.coordinates.lat) * 20 // Simplified positioning

      marker.style.left = `${x}px`
      marker.style.top = `${y}px`

      // Create marker icon
      const markerIcon = document.createElement("div")
      markerIcon.className = `flex items-center justify-center w-8 h-8 ${
        selectedStation === station.id ? "text-red-600" : "text-green-600 hover:text-green-700"
      }`
      markerIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`

      // Add tooltip
      const tooltip = document.createElement("div")
      tooltip.className =
        "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-white text-black text-xs rounded shadow whitespace-nowrap opacity-0 transition-opacity pointer-events-none"
      tooltip.textContent = station.name

      marker.appendChild(markerIcon)
      marker.appendChild(tooltip)

      // Show tooltip on hover
      marker.addEventListener("mouseenter", () => {
        tooltip.classList.remove("opacity-0")
        tooltip.classList.add("opacity-100")
      })

      marker.addEventListener("mouseleave", () => {
        tooltip.classList.remove("opacity-100")
        tooltip.classList.add("opacity-0")
      })

      // Handle click
      marker.addEventListener("click", () => {
        onStationSelect(station.id)
      })

      mapElement.appendChild(marker)
    })

    // Add a note that this is a placeholder
    const note = document.createElement("div")
    note.className = "absolute bottom-2 right-2 bg-white/80 text-black text-xs p-1 rounded"
    note.textContent = "Map placeholder - would use Leaflet/Google Maps in production"
    mapElement.appendChild(note)
  }, [stations, selectedStation, onStationSelect])

  return <div ref={mapRef} className="w-full h-full" />
}

