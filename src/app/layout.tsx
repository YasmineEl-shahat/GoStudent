"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const LanguageToggle = ({
  currentLocale,
  onToggle,
}: {
  currentLocale: "en" | "ar";
  onToggle: () => void;
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "fixed top-4 z-50 gap-2",
        currentLocale === "ar" ? "start-4" : "end-4"
      )}
      onClick={onToggle}
    >
      <Globe className="h-4 w-4" />
      {currentLocale === "en" ? "العربية" : "English"}
    </Button>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const toggleLocale = () => {
    const newLocale = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(newLocale).then(() => {
      setCurrentLanguage(newLocale); // Update state after changing language
    });
  };

  useEffect(() => {
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]); // Use state as the dependency

  return (
    <I18nextProvider i18n={i18n}>
      <html
        lang={currentLanguage}
        dir={currentLanguage === "ar" ? "rtl" : "ltr"}
      >
        <body
          className={cn(
            geistSans.variable,
            geistMono.variable,
            "antialiased",
            currentLanguage === "ar" ? "font-arabic rtl" : "ltr"
          )}
        >
          <LanguageToggle
            currentLocale={currentLanguage as "en" | "ar"}
            onToggle={toggleLocale}
          />
          {children}
        </body>
      </html>
    </I18nextProvider>
  );
}
