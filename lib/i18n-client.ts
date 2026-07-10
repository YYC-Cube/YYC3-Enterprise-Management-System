"use client"

export type Locale = string

export const SUPPORTED_LOCALES: Locale[] = [
  "zh-CN", "en", "zh-TW", "ja", "ko", "fr", "de", "es", "pt-BR", "ar",
]

export const LOCALE_LABELS: Record<Locale, string> = {
  "zh-CN": "简体中文",
  "en": "English",
  "zh-TW": "繁體中文",
  "ja": "日本語",
  "ko": "한국어",
  "fr": "Français",
  "de": "Deutsch",
  "es": "Español",
  "pt-BR": "Português",
  "ar": "العربية",
}

import { site as arSA } from "@/locales/ar"
import { site as deDE } from "@/locales/de"
import { site as enUS } from "@/locales/en"
import { site as esES } from "@/locales/es"
import { site as frFR } from "@/locales/fr"
import { site as jaJP } from "@/locales/ja"
import { site as koKR } from "@/locales/ko"
import { site as ptBR } from "@/locales/pt-BR"
import { site as zhCN } from "@/locales/zh-CN"
import { site as zhTW } from "@/locales/zh-TW"

const translations: Record<Locale, Record<string, string>> = {
  "zh-CN": zhCN,
  "en": enUS,
  "zh-TW": zhTW,
  "ja": jaJP,
  "ko": koKR,
  "fr": frFR,
  "de": deDE,
  "es": esES,
  "pt-BR": ptBR,
  "ar": arSA,
}

export function translate(locale: Locale, key: string, params?: Record<string, string>): string {
  const dict = translations[locale] ?? translations["zh-CN"]
  let value = dict[key] ?? translations["zh-CN"][key] ?? key
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(`{${k}}`, v)
    }
  }
  return value
}
