"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [locale, setLocale] = useState<"en" | "ar">("en");

  const toggleLocale = () => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  };

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased",
          locale === "ar" ? "font-arabic rtl" : "ltr"
        )}
      >
        <LanguageToggle currentLocale={locale} onToggle={toggleLocale} />
        {children}
      </body>
    </html>
  );
}
