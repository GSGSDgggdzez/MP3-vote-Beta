"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "../components/LanguageProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Navigation, Clock, Info, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPollingStations, getAllPollingStations } from "@/lib/pocketbase"

export default function CentersPage() {
  const { t } = useTranslation()
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedMunicipality, setSelectedMunicipality] = useState("")
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null)
  
  // State for data from PocketBase
  const [regions, setRegions] = useState<string[]>([])
  const [cities, setCities] = useState<{[key: string]: string[]}>({})
  const [municipalities, setMunicipalities] = useState<{[key: string]: string[]}>({})
  const [centers, setCenters] = useState<any[]>([])
  const [filteredCenters, setFilteredCenters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch all polling stations on component mount
  useEffect(() => {
    async function fetchPollingStations() {
      setLoading(true)
      const result = await getAllPollingStations()
      
      if (result.success && result.data) {
        const stations = result.data
        
        // Extract unique regions
        const uniqueRegions = [...new Set(stations.map((station: any) => station.Region))]
        setRegions(uniqueRegions)
        
        // Create cities map by region
        const citiesMap: {[key: string]: string[]} = {}
        uniqueRegions.forEach((region: string) => {
          const regionStations = stations.filter((station: any) => station.Region === region)
          citiesMap[region] = [...new Set(regionStations.map((station: any) => station.city))]
        })
        setCities(citiesMap)
        
        // Create municipalities map by city
        const municipalitiesMap: {[key: string]: string[]} = {}
        Object.keys(citiesMap).forEach(region => {
          citiesMap[region].forEach(city => {
            const cityStations = stations.filter((station: any) => 
              station.Region === region && station.city === city
            )
            municipalitiesMap[city] = [...new Set(cityStations.map((station: any) => station.municipal))]
          })
        })
        setMunicipalities(municipalitiesMap)
        
        // Store all centers
        setCenters(stations)
      }
      
      setLoading(false)
    }
    
    fetchPollingStations()
  }, [])

  // Filter centers based on selections
  useEffect(() => {
    if (centers.length === 0) return
    
    let filtered = [...centers]
    
    if (selectedRegion) {
      filtered = filtered.filter(center => center.Region === selectedRegion)
    }
    
    if (selectedCity) {
      filtered = filtered.filter(center => center.city === selectedCity)
    }
    
    if (selectedMunicipality) {
      filtered = filtered.filter(center => center.municipal === selectedMunicipality)
    }
    
    setFilteredCenters(filtered)
  }, [centers, selectedRegion, selectedCity, selectedMunicipality])

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    setSelectedCity("")
    setSelectedMunicipality("")
    setSelectedCenter(null)
  }

  const handleCityChange = (value: string) => {
    setSelectedCity(value)
    setSelectedMunicipality("")
    setSelectedCenter(null)
  }

  const handleMunicipalityChange = (value: string) => {
    setSelectedMunicipality(value)
    setSelectedCenter(null)
  }

  // Format operating hours from JSON
  const formatOperatingHours = (hours: any) => {
    if (!hours) return "N/A"
    try {
      const hoursObj = typeof hours === 'string' ? JSON.parse(hours) : hours
      return `${hoursObj.open} - ${hoursObj.close}`
    } catch (e) {
      return "N/A"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-6">{t("findRegistrationCenter")}</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t("selectLocation")}</CardTitle>
                <CardDescription>{t("selectLocationDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("region")}</label>
                      <Select value={selectedRegion} onValueChange={handleRegionChange}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectRegion")} />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("city")}</label>
                      <Select value={selectedCity} onValueChange={handleCityChange} disabled={!selectedRegion}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectCity")} />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedRegion &&
                            cities[selectedRegion]?.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("municipality")}</label>
                      <Select
                        value={selectedMunicipality}
                        onValueChange={handleMunicipalityChange}
                        disabled={!selectedCity}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectMunicipality")} />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCity &&
                            municipalities[selectedCity]?.map((municipality) => (
                              <SelectItem key={municipality} value={municipality}>
                                {municipality}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {filteredCenters.length > 0 && (
                      <div className="space-y-4 mt-6">
                        <h3 className="font-medium">{t("availableCenters")}</h3>
                        <div className="space-y-2">
                          {filteredCenters.map((center) => (
                            <motion.div
                              key={center.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left h-auto py-3 ${
                                  selectedCenter === center.id ? "border-green-500 bg-green-50" : ""
                                }`}
                                onClick={() => setSelectedCenter(center.id)}
                              >
                                <div className="flex items-start">
                                  <MapPin className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <div className="font-medium">{center.station_name}</div>
                                    <div className="text-sm text-gray-500">{center.location_address}</div>
                                  </div>
                                </div>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedCenter && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{t("centerDetails")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {filteredCenters
                      .filter((center) => center.id === selectedCenter)
                      .map((center) => (
                        <div key={center.id} className="space-y-4">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Card className="overflow-hidden">
                              <CardHeader>
                                <CardTitle>{center.station_name}</CardTitle>
                                <CardDescription>
                                  {center.Region}, {center.city}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="flex items-start space-x-2">
                                    <MapPin className="h-5 w-5 text-green-700 mt-0.5" />
                                    <div>
                                      <p className="font-medium">{t("location")}</p>
                                      <p className="text-sm text-gray-600">{`${center.municipal}, ${center.city}`}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start space-x-2">
                                    <Clock className="h-5 w-5 text-green-700 mt-0.5" />
                                    <div>
                                      <p className="font-medium">{t("operatingHours")}</p>
                                      <p className="text-sm text-gray-600">{formatOperatingHours(center.operating_hours)}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start space-x-2">
                                    <Users className="h-5 w-5 text-green-700 mt-0.5" />
                                    <div>
                                      <p className="font-medium">{t("capacity")}</p>
                                      <p className="text-sm text-gray-600">{center.station_capacity || "N/A"} {t("voters")}</p>
                                    </div>
                                  </div>

                                  <div className="flex items-start space-x-2">
                                    <Info className="h-5 w-5 text-green-700 mt-0.5" />
                                    <div>
                                      <p className="font-medium">{t("stationStatus")}</p>
                                      <p className="text-sm text-gray-600">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                          center.station_status === 'Active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                          {center.station_status || "Unknown"}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>                          </motion.div>
                          <Button className="w-full sm:w-auto">
                            <Navigation className="mr-2 h-4 w-4" />
                            {t("getDirections")}
                          </Button>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
