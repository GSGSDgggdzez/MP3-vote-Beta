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
import { Camera, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Toaster, toast } from 'sonner'

export default function VerifyPage() {
  const { t } = useTranslation()
  const [idType, setIdType] = useState("national")
  const [idNumber, setIdNumber] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!idNumber) {
      toast(t("errorTitle"), {
        description: t("enterIdNumber")
      })
      return
    }

    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll consider even numbers as registered
      if (Number.parseInt(idNumber) % 2 === 0) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    }, 2000)
  }

  const openCamera = () => {
    toast(t("cameraTitle"), {
      description: t("cameraDesc")
    })
  }

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
                    </RadioGroup>                  </div>

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
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                          <span className="font-medium">{t("name")}:</span> John Doe
                        </p>
                        <p>
                          <span className="font-medium">{t("pollingStation")}:</span> Central School, Yaoundé
                        </p>
                        <p>
                          <span className="font-medium">{t("ward")}:</span> Ward 5
                        </p>
                        <p>
                          <span className="font-medium">{t("constituency")}:</span> Yaoundé Central
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      {t("downloadDetails")}
                    </Button>
                  </CardFooter>
                </Card>
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
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>{t("visitOffice")}</li>
                        <li>{t("bringDocuments")}</li>
                        <li>{t("checkDeadlines")}</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button className="w-full bg-red-600 hover:bg-red-700">{t("registerNow")}</Button>
                    <Button variant="outline" className="w-full">
                      {t("learnMore")}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {status === "idle" && (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500 border-2 border-dashed rounded-lg">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">{t("enterDetailsPrompt")}</p>
                <p className="mt-1">{t("resultsWillAppear")}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
