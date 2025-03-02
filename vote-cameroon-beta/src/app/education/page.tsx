"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "../components/LanguageProvider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search, FileText, Video, HelpCircle } from "lucide-react"

export default function EducationPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")

  const resources = [
    { id: 1, title: t("voterRegistration"), type: "guide", icon: FileText },
    { id: 2, title: t("votingProcess"), type: "video", icon: Video },
    { id: 3, title: t("electoralSystem"), type: "guide", icon: FileText },
    { id: 4, title: t("voterRights"), type: "guide", icon: FileText },
    { id: 5, title: t("electionDayPrep"), type: "video", icon: Video },
  ]

  const faqs = [
    { question: t("faq1Question"), answer: t("faq1Answer") },
    { question: t("faq2Question"), answer: t("faq2Answer") },
    { question: t("faq3Question"), answer: t("faq3Answer") },
    { question: t("faq4Question"), answer: t("faq4Answer") },
    { question: t("faq5Question"), answer: t("faq5Answer") },
  ]

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-6">{t("voterEducation")}</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("educationalResources")}</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchResources")}
              className="pl-10"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <resource.icon className="mr-2 h-5 w-5 text-green-800" />
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.type === "guide" ? t("readingTime") : t("watchTime")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t("resourceDescription")}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-800 hover:bg-green-700">{resource.type === "guide" ? t("readGuide") : t("watchVideo")}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("frequentlyAskedQuestions")}</h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("needMoreHelp")}</CardTitle>
            <CardDescription>{t("contactDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{t("helplineNumber")}: 1234-5678</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              {t("contactSupport")}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

