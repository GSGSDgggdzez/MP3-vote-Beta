"use client"

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Set access token directly on mapboxgl
mapboxgl.accessToken = process.env.NEXT_PUBLIC_LOCATION_API || ''

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [11.5021, 3.8480], // Centered on Cameroon coordinates
      zoom: 6
    })

    // Add navigation control
    map.current.addControl(new mapboxgl.NavigationControl())

    // Add marker for Yaoundé
    new mapboxgl.Marker()
      .setLngLat([11.5021, 3.8480])
      .addTo(map.current)

    return () => {
      map.current?.remove()
    }
  }, [])

  return (
    <div 
      ref={mapContainer} 
      style={{ 
        height: '100vh', 
        width: '100vw' 
      }} 
    />
  )
}