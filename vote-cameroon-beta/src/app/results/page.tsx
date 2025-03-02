"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "../components/LanguageProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

// Mock data for the results
const candidateData = [
  { name: "Candidate A", votes: 450000, percentage: 45 },
  { name: "Candidate B", votes: 350000, percentage: 35 },
  { name: "Candidate C", votes: 200000, percentage: 20 },
]

export default function ResultsPage() {
  const { t } = useTranslation()
  const [selectedRegion, setSelectedRegion] = useState("all")

  const regions = [
    { value: "all", label: t("allRegions") },
    { value: "adamawa", label: t("adamawa") },
    { value: "centre", label: t("centre") },
    { value: "east", label: t("east") },
    { value: "farNorth", label: t("farNorth") },
    { value: "littoral", label: t("littoral") },
    { value: "north", label: t("north") },
    { value: "northwest", label: t("northwest") },
    { value: "west", label: t("west") },
    { value: "south", label: t("south") },
    { value: "southwest", label: t("southwest") },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-6">{t("electionResults")}</h1>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("turnoutStatistics")}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">{t("registeredVoters")}</dt>
                  <dd className="text-2xl font-bold">7,523,421</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">{t("totalVotesCast")}</dt>
                  <dd className="text-2xl font-bold">5,678,901</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">{t("voterTurnout")}</dt>
                  <dd className="text-2xl font-bold">75.4%</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">{t("invalidVotes")}</dt>
                  <dd className="text-2xl font-bold">1.2%</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("keyUpdates")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
                  <p className="ml-4 text-sm text-muted-foreground">{t("update1")}</p>
                </li>
                <li className="flex items-start">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
                  <p className="ml-4 text-sm text-muted-foreground">{t("update2")}</p>
                </li>
                <li className="flex items-start">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
                  <p className="ml-4 text-sm text-muted-foreground">{t("update3")}</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("latestResults")}</CardTitle>
            <CardDescription>{t("resultsDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[200px]">
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
              <Button variant="outline" className="ml-2">
                <AlertCircle className="mr-2 h-4 w-4" />
                {t("reportIssue")}
              </Button>
            </div>

            <div className="space-y-4">
              {candidateData.map((candidate, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{candidate.name}</span>
                    <span className="font-medium">{candidate.percentage}%</span>
                  </div>
                  <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-green-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${candidate.percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Intl.NumberFormat().format(candidate.votes)} votes
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

