import { site as ar } from "@/locales/ar"
import { site as de } from "@/locales/de"
import { site as en } from "@/locales/en"
import { site as es } from "@/locales/es"
import { site as fr } from "@/locales/fr"
import { site as ja } from "@/locales/ja"
import { site as ko } from "@/locales/ko"
import { site as ptBR } from "@/locales/pt-BR"
import { site as zhCN } from "@/locales/zh-CN"
import { site as zhTW } from "@/locales/zh-TW"
import { describe, expect, it } from "vitest"

const allLocales: Record<string, Record<string, string>> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  ja,
  ko,
  fr,
  de,
  es,
  "pt-BR": ptBR,
  ar,
}

const requiredKeys = Object.keys(zhCN)

describe("i18n Translation Completeness", () => {
  for (const [locale, translations] of Object.entries(allLocales)) {
    describe(`${locale}`, () => {
      it("has all keys from zh-CN source", () => {
        const localeKeys = Object.keys(translations)
        for (const key of requiredKeys) {
          expect(localeKeys).toContain(key)
        }
      })

      it("has no empty values", () => {
        for (const [key, value] of Object.entries(translations)) {
          expect(value, `${locale}.${key} is empty`).toBeTruthy()
        }
      })

      it("has correct key count", () => {
        expect(Object.keys(translations).length).toBe(requiredKeys.length)
      })
    })
  }
})

describe("i18n Key Structure", () => {
  it("all keys follow namespace.key pattern", () => {
    for (const key of requiredKeys) {
      expect(key).toMatch(/^[a-z-]+\.[a-z0-9._-]+$/)
    }
  })

  it("has expected namespaces", () => {
    const namespaces = new Set(requiredKeys.map((k) => k.split(".")[0]))
    const expected = new Set(["nav", "hero", "philosophy", "scenario", "architecture", "footer", "lang", "family"])
    for (const ns of expected) {
      expect(namespaces.has(ns), `missing namespace: ${ns}`).toBe(true)
    }
  })
})
