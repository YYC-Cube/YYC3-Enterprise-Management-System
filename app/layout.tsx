import { PageTitleProvider } from '@/contexts/page-title-context'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

// ============ PWA / 多端 Viewport 配置 ============
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
  userScalable: true,
  viewportFit: 'cover',
}

// ============ 全端 Metadata 配置 ============
export const metadata: Metadata = {
  title: {
    default: 'YYC³ Enterprise Management System | 言启象限 · 语枢未来',
    template: '%s | YYC³ EMS',
  },
  description:
    'YYC³ Enterprise Management System — YanYuCloudCube 四源合一全功能企业管理底盘。以五高五标五化五维核心机制，构建面向AI时代的智能应用。',
  applicationName: 'YYC³ Enterprise Management System',
  generator: 'Next.js',
  keywords: [
    'YYC³', '企业管理', 'ERP', 'CRM', 'AI', '智能管理',
    '言启象限', '语枢未来', 'YanYuCloudCube',
    '五高', '五标', '五化', '五维',
  ],
  authors: [{ name: 'YYC³ Team', url: 'https://ems.yyc3.vip' }],
  creator: 'YYC³ Team',
  publisher: 'YYC³ Team',

  // ===== 图标配置（全端覆盖） =====
  icons: {
    // 根级 favicon
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/yyc3-dist/yanyu_cloud_16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/yyc3-dist/yanyu_cloud_32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/yyc3-dist/yanyu_cloud_48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/yyc3-dist/yanyu_cloud_192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/yyc3-dist/yanyu_cloud_512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    // Apple 全尺寸 touch icon
    apple: [
      { url: '/yyc3-dist/yanyu_cloud_120x120.png', sizes: '120x120', type: 'image/png' },   // iPhone
      { url: '/yyc3-dist/yanyu_cloud_152x152.png', sizes: '152x152', type: 'image/png' },   // iPad
      { url: '/yyc3-dist/yanyu_cloud_167x167.png', sizes: '167x167', type: 'image/png' },   // iPad Pro
      { url: '/yyc3-dist/yanyu_cloud_180x180.png', sizes: '180x180', type: 'image/png' },   // iPhone Retina
      { url: '/yyc3-dist/yanyu_cloud_192x192.png', sizes: '192x192', type: 'image/png' },   // 通用
    ],
    // 其他平台
    other: [
      { rel: 'mask-icon', url: '/icon.svg', color: '#3b82f6' },
    ],
  },

  // ===== PWA Manifest =====
  manifest: '/yyc3-dist/manifest.json',

  // ===== Apple Web App =====
  appleWebApp: {
    capable: true,
    title: 'YYC³ EMS',
    statusBarStyle: 'default',
    startupImage: [
      '/yyc3-dist/yanyu_cloud_512x512.png',
    ],
  },

  // ===== 格式检测 =====
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },

  // ===== Open Graph / 社交分享 =====
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'YYC³ Enterprise Management System',
    title: 'YYC³ Enterprise Management System | 言启象限 · 语枢未来',
    description:
      'YanYuCloudCube 四源合一全功能企业管理底盘。以五高五标五化五维核心机制，构建面向AI时代的智能应用。',
    url: 'https://ems.yyc3.vip',
    images: [
      {
        url: '/yyc3-dist/yanyu_cloud_512x512.png',
        width: 512,
        height: 512,
        alt: 'YYC³ Logo',
      },
    ],
  },

  // ===== Twitter Card =====
  twitter: {
    card: 'summary_large_image',
    title: 'YYC³ Enterprise Management System',
    description:
      'YanYuCloudCube 四源合一全功能企业管理底盘。面向AI时代的智能应用。',
    images: ['/yyc3-dist/yanyu_cloud_512x512.png'],
  },

  // ===== 其他 Meta =====
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  metadataBase: new URL('https://ems.yyc3.vip'),

  // ===== 预连接 =====
  alternates: {
    canonical: 'https://ems.yyc3.vip',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* ===== PWA 安装引导 ===== */}
        <link rel="apple-touch-startup-image" href="/yyc3-dist/yanyu_cloud_512x512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="HandheldFriendly" content="true" />

        {/* ===== 预连接关键域名 ===== */}
        <link rel="dns-prefetch" href="//ems.yyc3.vip" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <PageTitleProvider>
          {children}
        </PageTitleProvider>
        <Analytics />
      </body>
    </html>
  )
}
