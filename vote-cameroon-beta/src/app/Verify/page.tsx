"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "../components/LanguageProvider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Camera, CheckCircle, XCircle, Loader2, MapPin, Clock, Users, Info } from "lucide-react"
import { Toaster, toast } from 'sonner'
import { verifyVoter, getPollingStation } from "@/lib/pocketbase"
import Image from "next/image"

interface VoterData {
  id: string;
  full_name: string;
  national_id_number: string;
  voter_card_number: string;
  passport_id_number: string;
  address: string;
  voter_status: string;
  polling_station_id: string;
  expand?: {
    polling_station_id?: PollingStationData
  }
}

interface PollingStationData {
  id: string;
  collectionId: string;
  collectionName: string;
  station_name: string;
  Region: string;
  latitude_code: number;
  longitude_code: number;
  station_capacity: number;
  station_status: string;
  operating_hours: string;
  city: string;
  municipal: string;
  picture_Url: string;
  ward_number?: number;
  created: string;
  updated: string;
}

export default function VerifyPage() {
  const { t } = useTranslation()
  const [idType, setIdType] = useState("national")
  const [idNumber, setIdNumber] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [voterData, setVoterData] = useState<VoterData | null>(null)
  const [stationData, setStationData] = useState<PollingStationData | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!idNumber) {
      toast(t("errorTitle"), {
        description: t("enterIdNumber")
      })
      return
    }

    setStatus("loading")

    try {
      // Verify the voter
      const result = await verifyVoter(idType, idNumber)

      if (result.success && result.data) {
        setVoterData(result.data as unknown as VoterData)

        // If polling station is not expanded, fetch it separately
        if (!result.data.expand?.polling_station_id && result.data.polling_station_id) {
          const stationResult = await getPollingStation(result.data.polling_station_id)
          if (stationResult.success) {
            setStationData(stationResult.data as unknown as PollingStationData)
          }
        }

        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Error verifying voter:", error)
      setStatus("error")
    }
  }
  const openCamera = () => {
    toast(t("cameraTitle"), {
      description: t("cameraDesc")
    })
  }

  // Get polling station info from either expanded data or separate fetch
  const getPollingInfo = () => {
    if (voterData?.expand?.polling_station_id) {
      return voterData.expand.polling_station_id
    }
    return stationData
  }

  const pollingInfo = getPollingInfo()

  // Format operating hours if available
  const formatOperatingHours = (hours: any) => {
    if (!hours) return "N/A";
    try {
      if (typeof hours === 'string') {
        hours = JSON.parse(hours);
      }
      return `${hours.open || "7:00 AM"} - ${hours.close || "6:00 PM"}`;
    } catch (e) {
      return "7:00 AM - 6:00 PM";
    }
  };

  // Open Google Maps with the polling station location
  const openMaps = () => {
    if (pollingInfo?.latitude_code && pollingInfo?.longitude_code) {
      window.open(`https://www.google.com/maps?q=${pollingInfo.latitude_code},${pollingInfo.longitude_code}`, '_blank');
    } else {
      toast(t("locationNotAvailable"), {
        description: t("locationNotAvailableDesc")
      });
    }
  };

  // Get directions to polling station
  const getDirections = () => {
    if (pollingInfo?.latitude_code && pollingInfo?.longitude_code) {
      // Use Google Maps directions API
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${pollingInfo.latitude_code},${pollingInfo.longitude_code}`, '_blank');
    } else {
      toast(t("locationNotAvailable"), {
        description: t("locationNotAvailableDesc")
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-6">{t("verifyRegistration")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("checkStatus")}</CardTitle>
              <CardDescription>{t("enterDetails")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("idType")}</Label>
                    <RadioGroup value={idType} onValueChange={setIdType} className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="national" id="national" className="text-green-700 border-green-700 focus:ring-green-700" />
                        <Label htmlFor="national">{t("nationalId")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="voter" id="voter" className="text-green-700 border-green-700 focus:ring-green-700" />
                        <Label htmlFor="voter">{t("voterId")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="passport" id="passport" className="text-green-700 border-green-700 focus:ring-green-700" />
                        <Label htmlFor="passport">{t("passport")}</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">{t("idNumber")}</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="idNumber"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder={t("enterIdNumber")}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="icon" onClick={openCamera}>
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-6 bg-green-800 hover:bg-green-700" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("checking")}
                    </>
                  ) : (
                    t("checkNow")
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div>
            {status === "success" && voterData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="space-y-6"
              >
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <CardTitle className="text-green-800">{t("registered")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{t("registeredDesc")}</p>
                    <div className="mt-4 p-4 bg-white rounded-md border border-green-200">
                      <h3 className="font-medium text-green-800 mb-2">{t("yourDetails")}</h3>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">{t("name")}:</span> {voterData.full_name}
                        </p>
                        <p>
                          <span className="font-medium">{t("voterStatus")}:</span> {voterData.voter_status}
                        </p>
                        {pollingInfo && (
                          <p>
                            <span className="font-medium">{t("pollingStation")}:</span> {pollingInfo.station_name}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {pollingInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        {pollingInfo.picture_Url ? (
                          <Image
                            src={pollingInfo.picture_Url}
                            alt={pollingInfo.station_name}
                            className="object-cover w-full h-full"
                            width={800}
                            height={400}
                          />
                        ) : (
                          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                            <MapPin className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle>{pollingInfo.station_name}</CardTitle>
                        <CardDescription>
                          {pollingInfo.Region}, {pollingInfo.city}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-5 w-5 text-green-700 mt-0.5" />
                            <div>
                              <p className="font-medium">{t("location")}</p>
                              <p className="text-sm text-gray-600">{`${pollingInfo.municipal}, ${pollingInfo.city}`}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Clock className="h-5 w-5 text-green-700 mt-0.5" />
                            <div>
                              <p className="font-medium">{t("operatingHours")}</p>
                              <p className="text-sm text-gray-600">{formatOperatingHours(pollingInfo.operating_hours)}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Users className="h-5 w-5 text-green-700 mt-0.5" />
                            <div>
                              <p className="font-medium">{t("capacity")}</p>
                              <p className="text-sm text-gray-600">{pollingInfo.station_capacity || "N/A"} {t("voters")}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-green-700 mt-0.5" />
                            <div>
                              <p className="font-medium">{t("stationStatus")}</p>
                              <p className="text-sm text-gray-600">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pollingInfo.station_status === 'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                  {pollingInfo.station_status}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={openMaps}>
                          {t("viewOnMap")}
                        </Button>
                        <Button className="bg-green-700 hover:bg-green-600" onClick={getDirections}>
                          {t("getDirections")}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="bg-red-50 border-red-200">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-6 w-6 text-red-600" />
                      <CardTitle className="text-red-800">{t("notRegistered")}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{t("notRegisteredDesc")}</p>
                    <div className="mt-4 p-4 bg-white rounded-md border border-red-200">
                      <h3 className="font-medium text-red-800 mb-2">{t("nextSteps")}</h3>
                      <ul className="list-disc list-inside">
                        <li>{t("bringDocuments")}</li>
                        <li>{t("checkDeadlines")}</li>
                      </ul>
                    </div>
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