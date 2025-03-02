"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "../components/LanguageProvider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Navigation, Clock, Info, Phone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import MapComponent from "../components/map-component"

export default function StationsPage() {
  const { t } = useTranslation()
  const [name, setName] = useState("")
  const [voterId, setVoterId] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStation, setSelectedStation] = useState<number | null>(null)

  const stations = [
    {
      id: 1,
      name: "Central School Yaoundé",
      address: "123 Main Street, Yaoundé",
      region: "Centre",
      hours: "7:00 AM - 6:00 PM",
      coordinates: { lat: 3.848, lng: 11.502 },
      waitTime: "15 min",
      contact: "+237 123 456 789",
    },
    {
      id: 2,
      name: "Municipal Hall Douala",
      address: "45 Ocean Road, Douala",
      region: "Littoral",
      hours: "7:00 AM - 6:00 PM",
      coordinates: { lat: 4.05, lng: 9.7 },
      waitTime: "30 min",
      contact: "+237 987 654 321",
    },
    {
      id: 3,
      name: "Community Center Bamenda",
      address: "78 Highland Avenue, Bamenda",
      region: "North-West",
      hours: "7:00 AM - 6:00 PM",
      coordinates: { lat: 5.959, lng: 10.146 },
      waitTime: "10 min",
      contact: "+237 456 789 123",
    },
  ]

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && voterId) {
      // In a real app, this would verify against an API
      setIsVerified(true)
    }
  }

  const filteredStations = stations.filter(
    (station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.region.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleStationSelect = (id: number) => {
    setSelectedStation(id === selectedStation ? null : id)
  }

  if (!isVerified) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t("verifyIdentity")}</CardTitle>
              <CardDescription>{t("verifyIdentityDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("fullName")}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("enterFullName")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voterId">{t("voterId")}</Label>
                  <Input
                    id="voterId"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value)}
                    placeholder={t("enterVoterId")}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t("findMyStation")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-6">{t("findPollingStation")}</h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchByRegion")}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("pollingStations")}</CardTitle>
                <CardDescription>{t("selectStation")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredStations.length > 0 ? (
                    filteredStations.map((station) => (
                      <motion.div key={station.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left h-auto py-3 ${
                            selectedStation === station.id ? "border-green-500 bg-green-50" : ""
                          }`}
                          onClick={() => handleStationSelect(station.id)}
                        >
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium">{station.name}</div>
                              <div className="text-sm text-gray-500">{station.address}</div>
                              <div className="text-sm text-gray-500">{station.region}</div>
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">{t("noStationsFound")}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="map">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="map">{t("map")}</TabsTrigger>
                <TabsTrigger value="details">{t("details")}</TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="mt-0">
                <Card>
                  <CardContent className="p-0">
                    <div className="h-[400px] rounded-md overflow-hidden">
                      <MapComponent
                        stations={stations}
                        selectedStation={selectedStation}
                        onStationSelect={handleStationSelect}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="mt-0">
                <Card>
                  {selectedStation ? (
                    <>
                      {stations
                        .filter((s) => s.id === selectedStation)
                        .map((station) => (
                          <div key={station.id}>
                            <CardHeader>
                              <CardTitle>{station.name}</CardTitle>
                              <CardDescription>{station.address}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex items-start">
                                  <Clock className="h-5 w-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <div className="font-medium">{t("openingHours")}</div>
                                    <div className="text-gray-500">{station.hours}</div>
                                  </div>
                                </div>

                                <div className="flex items-start">
                                  <Info className="h-5 w-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <div className="font-medium">{t("waitTime")}</div>
                                    <div className="text-gray-500">
                                      {t("estimated")}: {station.waitTime}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-start">
                                  <Phone className="h-5 w-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <div className="font-medium">{t("contact")}</div>
                                    <div className="text-gray-500">{station.contact}</div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                              <Button className="w-full sm:w-auto  bg-green-800 hover:bg-green-700">
                                <Navigation className="h-4 w-4 mr-2" />
                                {t("getDirections")}
                              </Button>
                              <Button variant="outline" className="w-full sm:w-auto bg-green-800 hover:bg-green-700">
                                {t("saveOffline")}
                              </Button>
                            </CardFooter>
                          </div>
                        ))}
                    </>
                  ) : (
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                      <MapPin className="h-12 w-12 mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-1">{t("selectStationPrompt")}</h3>
                      <p>{t("stationDetailsWillAppear")}</p>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

