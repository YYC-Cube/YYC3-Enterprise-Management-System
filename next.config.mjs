/**
 * @fileoverview YYC³ Enterprise Management System — Next.js 配置
 * @description 四源合一：Nexus-Portal 安全策略 + Management 性能优化
 * @author YYC³
 */

const isStaticExport = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,

  // 静态导出模式（GitHub Pages）
  ...(isStaticExport && {
    output: 'export',
    images: { unoptimized: true },
    // GitHub Pages 可能需要 basePath（如果使用 <user>.github.io/<repo>）
    // 本项目使用自定义域名 management.yyc3.vip，无需 basePath
    basePath: '',
    trailingSlash: true,
  }),

  typescript: { ignoreBuildErrors: true },

  ...(!isStaticExport && {
    images: {
      unoptimized: false,
      formats: ['image/avif', 'image/webp'],
    },
  }),

  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-accordion', '@radix-ui/react-avatar', '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-label',
      '@radix-ui/react-popover', '@radix-ui/react-progress', '@radix-ui/react-scroll-area',
      '@radix-ui/react-select', '@radix-ui/react-slider', '@radix-ui/react-switch',
      '@radix-ui/react-tabs', '@radix-ui/react-toast', '@radix-ui/react-tooltip',
      'lucide-react', 'framer-motion', 'recharts', 'date-fns',
    ],
  },

  // Turbopack 配置（Next.js 16 默认 bundler）
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // headers() 仅在非静态导出模式下生效
  ...(!isStaticExport && {
    async headers() {
      return [
        {
          source: '/:path*', headers: [
            { key: 'X-DNS-Prefetch-Control', value: 'on' },
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-XSS-Protection', value: '1; mode=block' },
            { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          ]
        },
      ];
    },
  }),
};

export default nextConfig;
