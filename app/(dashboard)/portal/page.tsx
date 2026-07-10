"use client"

import { I18nProvider } from "@/components/i18n-provider"
import { NewYorkerSpline } from "@/components/new-yorker-spline"
import { ThemeProvider } from "@/components/theme-provider"

export default function PortalPage() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <NewYorkerSpline />
      </I18nProvider>
    </ThemeProvider>
  )
}
