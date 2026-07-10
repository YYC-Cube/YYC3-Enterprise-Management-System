import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PageTitleProvider } from '@/contexts/page-title-context'
import './globals.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'YYC³ Enterprise Management System | 言启象限 · 语枢未来',
  description: 'YYC³ Enterprise Management System — YanYuCloudCube 四源合一全功能企业管理底盘。以五高五标五化五维核心机制，构建面向AI时代的智能应用。',
  icons: {
    icon: '/yyc3-dist/favicon.ico',
    apple: '/yyc3-dist/yanyu_cloud_192x192.png',
  },
  manifest: '/yyc3-dist/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`} suppressHydrationWarning>
        <PageTitleProvider>
          {children}
        </PageTitleProvider>
        <Analytics />
      </body>
    </html>
  )
}
