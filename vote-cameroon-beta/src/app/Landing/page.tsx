"use client"
import { motion } from "framer-motion"
// import { useTranslation } from "../components/language-provider"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarClock, MapPin, BarChart3, BookOpen, HelpCircle, Search } from "lucide-react"
import Link from "next/link"
// import CountdownTimer from "@/components/countdown-timer"
import CountdownTimer from "../components/countdown-timer"
import { useTranslation } from "../components/LanguageProvider"

export default function Landing() {
    const { t } = useTranslation()

    const features = [
        {
            icon: <CalendarClock className="h-8 w-8 text-green-700" />,
            title: t("checkRegistration"),
            description: t("checkRegistrationDesc"),
            href: "/verify",
        },
        {
            icon: <MapPin className="h-8 w-8 text-green-700" />,
            title: t("findPollingStation"),
            description: t("findPollingStationDesc"),
            href: "/stations",
        },
        {
            icon: <Search className="h-8 w-8 text-green-700" />,
            title: t("findRegistrationCenter"),
            description: t("findRegistrationCenterDesc"),
            href: "/centers",
        },
        {
            icon: <BarChart3 className="h-8 w-8 text-green-700" />,
            title: t("electionResults"),
            description: t("electionResultsDesc"),
            href: "/results",
        },
        {
            icon: <BookOpen className="h-8 w-8 text-green-700" />,
            title: t("voterEducation"),
            description: t("voterEducationDesc"),
            href: "/education",
        },
        {
            icon: <HelpCircle className="h-8 w-8 text-green-700" />,
            title: t("support"),
            description: t("supportDesc"),
            href: "/support",
        },
    ]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 rounded-lg p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-20 rounded-full -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-600 opacity-20 rounded-full -ml-10 -mb-10" />
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-4">{t("heroTitle")}</h1>
                        <p className="text-xl mb-6">{t("heroSubtitle")}</p>
                        <div className="mb-6">
                            <CountdownTimer targetDate="2025-10-01T00:00:00" />
                        </div>
                        <div className="flex flex-wrap gap-4">
                            
                                <Link href="/verify" className="hover:underline">{t("checkStatus")}</Link>
                          
                            
                                <Link href="/education" className="hover:underline">{t("learnMore")}</Link>
                            
                        </div>
                    </div>
                </div>
            </motion.section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{t("latestUpdates")}</h2>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="font-medium">{t("updateContent")}</p>
                </div>
            </section>

            <motion.section
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {features.map((feature, index) => (
                    <motion.div key={index} variants={item} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href={feature.href} className="block h-full">
                            <Card className="h-full transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <div className="mb-2">{feature.icon}</div>
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50 p-0">
                                        {t("explore")} →
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </motion.section>
        </div>
    )
}