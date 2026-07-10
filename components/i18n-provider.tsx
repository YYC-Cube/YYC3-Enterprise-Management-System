"use client"

import type { Locale } from "@/lib/i18n-client"
import { LOCALE_LABELS, SUPPORTED_LOCALES, translate } from "@/lib/i18n-client"
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
  supportedLocales: typeof SUPPORTED_LOCALES
  localeLabels: typeof LOCALE_LABELS
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = "yyc3-locale"
const DEFAULT_LOCALE: Locale = "zh-CN"

function detectLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) return stored as Locale
  const nav = navigator.language
  if (nav.startsWith("zh") && (nav.includes("TW") || nav.includes("Hant"))) return "zh-TW"
  if (nav.startsWith("zh")) return "zh-CN"
  if (nav.startsWith("ja")) return "ja"
  if (nav.startsWith("ko")) return "ko"
  if (nav.startsWith("fr")) return "fr"
  if (nav.startsWith("de")) return "de"
  if (nav.startsWith("es")) return "es"
  if (nav.startsWith("pt")) return "pt-BR"
  if (nav.startsWith("ar")) return "ar"
  return "en"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    const detected = detectLocale()
    if (detected !== DEFAULT_LOCALE) {
      setLocaleState(detected)
    }
    document.documentElement.lang = detected
    document.documentElement.dir = detected === "ar" ? "rtl" : "ltr"
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
    document.documentElement.lang = newLocale
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr"
  }, [])

  const t = useCallback((key: string, params?: Record<string, string>) => {
    return translate(locale, key, params)
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, supportedLocales: SUPPORTED_LOCALES, localeLabels: LOCALE_LABELS }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
