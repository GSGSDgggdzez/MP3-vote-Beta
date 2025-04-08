"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "./LanguageProvider";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ClipboardCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/Landing", label: t("home") },
    { href: "/Verify", label: t("verify") },
    { href: "/centers", label: t("findRegistrationCenter") },
    { href: "/results", label: t("results") },
    { href: "/education", label: t("education") },
    { href: "/support", label: t("support") },
  ];

  return (
    <header className="bg-green-800 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-green-800 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="font-bold text-xl">Vote Cameroon</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className="relative group">
                  <span
                    className={`px-3 py-2 text-sm font-medium transition-all ${
                      isActive ? "text-yellow-400" : "text-green-100 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  {/* Animated Underline */}
                  <motion.div
                    className="absolute left-1/2 bottom-0 h-0.5 bg-yellow-400 origin-center"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            {/* Scrutineer Portal Link */}
            <Link href="/scrutineer/auth">
              <Button variant="ghost" size="icon" className="text-white hover:bg-green-700" title="Scrutineer Portal">
                <ClipboardCheck className="h-5 w-5" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-green-700">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  <span className={language === "en" ? "font-bold" : ""}>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("fr")}>
                  <span className={language === "fr" ? "font-bold" : ""}>Français</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-green-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-green-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Scrutineer Link in Mobile Menu */}
            <DropdownMenuSeparator className="my-1 border-green-700" />
            <Link
              href="/scrutineer/auth"
              className="block px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Scrutineer Portal
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
