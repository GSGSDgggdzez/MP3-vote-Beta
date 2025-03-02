"use client"

import { motion } from "framer-motion"
import { useTranslation } from "../components/LanguageProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageCircle, Phone } from "lucide-react"

export default function SupportPage() {

  const { t } = useTranslation()

  const votingEligibility = [
    { question: t("whoCanVoteQ"), answer: t("whoCanVoteA") },
    { question: t("firstTimeVoterQ"), answer: t("firstTimeVoterA") },
    { question: t("disabledVoterQ"), answer: t("disabledVoterA") },
  ]

  const requiredDocuments = [
    { question: t("requiredDocsQ"), answer: t("requiredDocsA") },
    { question: t("lostCardQ"), answer: t("lostCardA") },
    { question: t("expiredDocsQ"), answer: t("expiredDocsA") },
  ]

  const importantDeadlines = [
    { question: t("registrationDeadlineQ"), answer: t("registrationDeadlineA") },
    { question: t("transferDeadlineQ"), answer: t("transferDeadlineA") },
    { question: t("specialVotingQ"), answer: t("specialVotingA") },
  ]

  const pollingDayTips = [
    { question: t("bestTimeToVoteQ"), answer: t("bestTimeToVoteA") },
    { question: t("whatToBringQ"), answer: t("whatToBringA") },
    { question: t("votingProcessQ"), answer: t("votingProcessA") },
  ]

  const howToVote = [
    { question: t("markingBallotQ"), answer: t("markingBallotA") },
    { question: t("spoiltBallotQ"), answer: t("spoiltBallotA") },
    { question: t("assistedVotingQ"), answer: t("assistedVotingA") },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-6">{t("supportAndFAQs")}</h1>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-green-600" />
                {t("phoneSupport")}
              </CardTitle>
              <CardDescription>{t("phoneSupportDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                {t("callHelpline")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 text-green-600" />
                {t("liveChat")}
              </CardTitle>
              <CardDescription>{t("liveChatDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                {t("startChat")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-green-600" />
                {t("email")}
              </CardTitle>
              <CardDescription>{t("emailDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                {t("sendEmail")}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("frequentlyAskedQuestions")}</CardTitle>
            <CardDescription>{t("faqDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="eligibility" className="space-y-4">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <TabsTrigger value="eligibility">{t("votingEligibility")}</TabsTrigger>
                <TabsTrigger value="documents">{t("requiredDocuments")}</TabsTrigger>
                <TabsTrigger value="deadlines">{t("deadlines")}</TabsTrigger>
                <TabsTrigger value="tips">{t("pollingDayTips")}</TabsTrigger>
                <TabsTrigger value="howto">{t("howToVote")}</TabsTrigger>
              </TabsList>

              <TabsContent value="eligibility">
                <Accordion type="single" collapsible className="w-full">
                  {votingEligibility.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="documents">
                <Accordion type="single" collapsible className="w-full">
                  {requiredDocuments.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="deadlines">
                <Accordion type="single" collapsible className="w-full">
                  {importantDeadlines.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="tips">
                <Accordion type="single" collapsible className="w-full">
                  {pollingDayTips.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="howto">
                <Accordion type="single" collapsible className="w-full">
                  {howToVote.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t("stillNeedHelp")}</CardTitle>
            <CardDescription>{t("contactUsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("name")}</label>
                  <Input placeholder={t("enterName")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("email")}</label>
                  <Input type="email" placeholder={t("enterEmail")} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("message")}</label>
                <textarea
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t("enterMessage")}
                />
              </div>
              <Button type="submit" className="w-full bg-green-800 hover:bg-green-700" >{t("sendMessage")}</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

