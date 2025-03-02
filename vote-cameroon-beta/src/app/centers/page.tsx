"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "../components/LanguageProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import MapComponent from "../components/map-component"

// Mock data - In a real app, this would come from an API
const regions = [
  { value: "centre", label: "Centre" },
  { value: "littoral", label: "Littoral" },
  { value: "west", label: "West" },
]

const cities = {
  centre: [
    { value: "yaounde", label: "Yaoundé" },
    { value: "obala", label: "Obala" },
  ],
  littoral: [
    { value: "douala", label: "Douala" },
    { value: "edea", label: "Edéa" },
  ],
  west: [
    { value: "bafoussam", label: "Bafoussam" },
    { value: "dschang", label: "Dschang" },
  ],
}

const municipalities = {
  yaounde: [
    { value: "yaounde1", label: "Yaoundé 1" },
    { value: "yaounde2", label: "Yaoundé 2" },
    { value: "yaounde3", label: "Yaoundé 3" },
  ],
  douala: [
    { value: "douala1", label: "Douala 1" },
    { value: "douala2", label: "Douala 2" },
    { value: "douala3", label: "Douala 3" },
  ],
}

const centers = {
  yaounde1: [
    {
      id: 1,
      name: "Centre Principal Yaoundé",
      address: "123 Avenue Kennedy",
      coordinates: { lat: 3.848, lng: 11.502 },
      hours: "8:00 AM - 4:00 PM",
      contact: "+237 123 456 789",
    },
    {
      id: 2,
      name: "Centre Annexe Bastos",
      address: "45 Rue Bastos",
      coordinates: { lat: 3.855, lng: 11.505 },
      hours: "8:00 AM - 4:00 PM",
      contact: "+237 123 456 790",
    },
  ],
}

export default function CentersPage() {
  const { t } = useTranslation()
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedMunicipality, setSelectedMunicipality] = useState("")
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null)

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

  const availableCenters = selectedMunicipality ? centers[selectedMunicipality as keyof typeof centers] || [] : []

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
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("region")}</label>
                  <Select value={selectedRegion} onValueChange={handleRegionChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectRegion")} />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
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
                        cities[selectedRegion as keyof typeof cities]?.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
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
                        municipalities[selectedCity as keyof typeof municipalities]?.map((municipality) => (
                          <SelectItem key={municipality.value} value={municipality.value}>
                            {municipality.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedMunicipality && (
                  <div className="space-y-4 mt-6">
                    <h3 className="font-medium">{t("availableCenters")}</h3>
                    <div className="space-y-2">
                      {availableCenters.map((center) => (
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
                                <div className="font-medium">{center.name}</div>
                                <div className="text-sm text-gray-500">{center.address}</div>
                              </div>
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="h-[600px] rounded-md overflow-hidden">
                  <MapComponent
                    stations={availableCenters}
                    selectedStation={selectedCenter}
                    onStationSelect={(id) => setSelectedCenter(id)}
                  />
                </div>
              </CardContent>
            </Card>

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
                    {availableCenters
                      .filter((center) => center.id === selectedCenter)
                      .map((center) => (
                        <div key={center.id} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">{t("openingHours")}</label>
                              <p>{center.hours}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">{t("contact")}</label>
                              <p>{center.contact}</p>
                            </div>
                          </div>
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

