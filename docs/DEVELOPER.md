---
file: DEVELOPER.md
description: YYC³ Nexus Portal 开发者文档 — 技术架构、i18n体系、组件规范与快速启动指南
author: YanYuCloudCube Team <admin@0379.email>
version: v3.0.0
created: 2026-04-26
updated: 2026-04-30
status: published
tags: [开发者文档],[技术架构],[i18n],[组件规范],[AI集成]
category: developer-guide
language: zh-CN
audience: developers
complexity: intermediate
---

> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

# YYC³ Enterprise Management System — 开发者文档

## 仓库地址

- **GitHub**：[https://github.com/YYC-Cube/YYC3-Enterprise-Management-System](https://github.com/YYC-Cube/YYC3-Enterprise-Management-System)
- **在线演示**：[https://management.yyc3.vip](https://management.yyc3.vip)

## 核心理念

**五高架构**：高可用 | 高性能 | 高安全 | 高扩展 | 高智能
**五标体系**：标准化 | 规范化 | 自动化 | 可视化 | 智能化
**五化转型**：流程化 | 数字化 | 生态化 | 工具化 | 服务化
**五维评估**：时间维 | 空间维 | 属性维 | 事件维 | 关联维

---

## 文档概述

YYC³ Nexus Portal（言渝云枢 · 智能交互门户）是 YYC³ AI Family 的 3D 交互展示门户，
集成自研 i18n 翻译体系覆盖 10 国语言，基于 Next.js 16 + Spline 3D + Framer Motion 构建，
内置 Ollama 本地 AI 对话能力。

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.4 | React 全栈框架 (App Router + Turbopack) |
| React | 19.x | UI 渲染引擎 |
| TypeScript | 6.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS 框架 |
| Spline | latest | 3D 交互场景 |
| Framer Motion | latest | 动画引擎 (视差/粒子/打字机) |
| Ollama | qwen3:32b | 本地 LLM 推理引擎 |
| Vitest | latest | 单元测试框架 |
| Docker | latest | 容器化部署 |

---

## 项目结构

```
YYC³ Nexus Portal/
├── app/
│   ├── api/chat/route.ts             # Ollama SSE 对话代理
│   ├── globals.css                   # Tailwind v4 + 主题 CSS变量 (dark/light)
│   ├── layout.tsx                    # 根布局 (SSR元数据 + Vercel Analytics)
│   └── page.tsx                      # 入口 (ThemeProvider → I18nProvider → NewYorkerSpline)
├── components/
│   ├── new-yorker-spline.tsx         # 核心页面组件
│   ├── i18n-provider.tsx             # React Context i18n Provider
│   ├── theme-provider.tsx            # 主题切换 Provider (dark/light)
│   ├── chat-widget.tsx               # AI 对话浮窗组件
│   ├── code-demo.tsx                 # 代码演示组件
│   └── ui/                           # shadcn/ui 组件库
│       └── splite.tsx                # Spline 3D 懒加载封装
├── lib/
│   ├── i18n-client.ts               # 纯函数翻译系统 (translate + 类型导出)
│   └── utils.ts                     # cn() 工具函数
├── locales/                          # 10语言翻译文件 (63 keys/语言)
│   ├── zh-CN.ts                      # 权威源 (简体中文)
│   ├── en.ts                         # English
│   ├── zh-TW.ts / ja.ts / ko.ts     # CJK
│   ├── fr.ts / de.ts / es.ts        # 欧洲
│   ├── pt-BR.ts                      # 葡萄牙语(巴西)
│   └── ar.ts                         # العربية (RTL)
├── __tests__/
│   ├── setup.ts                      # Vitest 测试配置
│   └── i18n.test.ts                  # 32 测试用例 (翻译完整性 + key结构)
├── .github/workflows/ci.yml          # CI/CD (lint + tsc + build + docker)
├── Dockerfile                        # 4阶段多阶段构建
├── docker-compose.yml                # 端口3200 + 健康检查
├── vitest.config.ts                  # 测试配置
├── next.config.mjs                   # 安全头 + CSP + 图片优化
└── docs/                             # YYC³ 标准文档体系
```

---

## 快速开始

### 前置要求

- Node.js >= 18
- pnpm >= 8
- Ollama (可选，用于 AI 对话功能)

### 安装与启动

```bash
pnpm install
pnpm dev
```

访问 http://localhost:3000 (端口冲突时自动递增)

指定端口启动：

```bash
PORT=3146 pnpm dev
```

### AI 对话 (可选)

```bash
ollama pull qwen3:32b
ollama serve
```

对话组件自动连接 `http://localhost:11434`。

### 构建生产版本

```bash
pnpm build
pnpm start
```

Docker 部署：

```bash
docker compose up -d
```

端口 3200 (YYC³ 生产规范: 3200-3500)。

### 代码检查

```bash
pnpm lint
npx tsc --noEmit
pnpm test
```

---

## i18n 国际化体系

### 架构设计

```
locales/*.ts (10语言扁平翻译数据)
        ↓ import
lib/i18n-client.ts
  ├── translate(locale, key, params?)  ← 纯函数，同步，零副作用
  ├── SUPPORTED_LOCALES               ← 语言列表
  └── LOCALE_LABELS                    ← 语言显示名
        ↓ import
components/i18n-provider.tsx
  ├── I18nProvider (React Context)
  │   ├── useState("zh-CN")           ← SSR + 客户端初始值一致
  │   ├── useEffect → detectLocale()  ← localStorage + navigator 检测
  │   └── t(key, params)              → translate(locale, key, params)
  └── useI18n() Hook
        ↓ useContext
components/*.tsx
  └── const { t, locale, setLocale } = useI18n()
```

### 设计原则

| 原则 | 实现 |
|------|------|
| **SSR 安全** | `translate()` 是纯函数，无引擎状态依赖，SSR/客户端输出一致 |
| **零 Hydration 风险** | `useState("zh-CN")` 确保初始渲染 SSR 和客户端使用同一 locale |
| **纯函数翻译** | `translate(locale, key)` 不依赖任何外部状态或异步操作 |
| **扁平 key 直接查找** | 翻译数据保持扁平格式 `"nav.contact": "联系我们"`，无需嵌套转换 |
| **fallback 链** | `translations[locale][key]` → `translations["zh-CN"][key]` → `key` 本身 |

### 使用方式

```tsx
import { useI18n } from "@/components/i18n-provider"

function MyComponent() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div>
      <p>{t("hero.title.line1")}</p>
      <p>{t("hero.description", { name: "YYC³" })}</p>
      <button onClick={() => setLocale("en")}>English</button>
      <span>当前: {locale}</span>
    </div>
  )
}
```

### 翻译 Key 规范

| 前缀 | 用途 | 示例 |
|------|------|------|
| `nav.*` | 导航栏 | `nav.architecture`, `nav.contact` |
| `hero.*` | 首屏 | `hero.title.line1`, `hero.badge` |
| `philosophy.*` | 理念区 | `philosophy.title`, `philosophy.wugao.0` |
| `scenario.*` | 场景区 | `scenario.0.title`, `scenario.learn_more` |
| `architecture.*` | 架构区 | `architecture.eval.title` |
| `family.*` | AI成员 | `family.label`, `family.title` |
| `footer.*` | 页脚 | `footer.slogan.cn` |

### 新增翻译流程

1. 在 `locales/zh-CN.ts` 添加 key（权威源）
2. 同步更新 `locales/en.ts`
3. 更新其余 8 个语言文件
4. 运行 `pnpm test` 验证翻译完整性

---

## 核心组件

### NewYorkerSpline (主页面组件)

**文件**: `components/new-yorker-spline.tsx`

| 子组件 | 功能 |
|--------|------|
| Navbar | 固定导航 + 滚动毛玻璃 + ThemeToggle + LanguageSwitcher |
| HeroSection | 粒子背景 + Spline 3D + 打字机效果 |
| PhilosophySection | 五高/五标/五化/五维 视差滚动 |
| ScenarioSection | 4大应用场景卡片 |
| ArchitectureSection | 四层架构体系 |
| AIFamilySection | 8位AI成员卡片 + 能力指标动画 |
| KnowledgeSection | 知识库资产统计 (120+ Skills / 50+ API / 30+ MCP) |
| Footer | 品牌信息 + 社交链接 |
| ScrollProgress | 全局滚动进度条 |
| ParticleField | Canvas 粒子连线背景 (60fps) |
| TypewriterText | 逐字打出 + 闪烁光标 |

### ThemeProvider (主题切换)

**文件**: `components/theme-provider.tsx`

```tsx
import { useTheme } from "@/components/theme-provider"

function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>{theme === "dark" ? "🌙" : "☀️"}</button>
}
```

特性：
- dark/light 切换 + localStorage 持久化
- CSS 变量体系 (`[data-theme]` 属性选择器)
- 系统偏好检测

### ChatWidget (AI 对话)

**文件**: `components/chat-widget.tsx`

- 浮动按钮 (右下角)
- 可展开对话面板 (380×520px)
- SSE 流式响应
- 自动检测 Ollama 连接状态

### API Route (对话代理)

**文件**: `app/api/chat/route.ts`

```
POST /api/chat
├── Request:  { messages, model }
├── Proxy:    → http://localhost:11434/api/chat
└── Response: SSE stream (data: {content}\n\n)
```

环境变量：
- `OLLAMA_URL` — Ollama 服务地址 (默认 `http://localhost:11434`)

---

## 配置说明

### next.config.mjs

| 配置项 | 说明 |
|--------|------|
| 安全头 | HSTS / X-Frame / XSS / Referrer / CSP (仅生产环境) |
| CSP | 开发模式禁用，生产模式限制 script/connect/img/font |
| 图片优化 | avif/webp + Spline remotePatterns |
| output | 生产 standalone，开发 undefined |

### 路径别名

- `@/*` → 项目根目录
- `@/components/ui` → UI 组件
- `@/lib/*` → 工具库
- `@/locales/*` → 翻译文件

### 端口规范

| 环境 | 端口 | 说明 |
|------|------|------|
| 开发 | 3000+ | Next.js 默认，冲突自动递增 |
| 生产 | 3200 | Docker Compose 默认 |
| Ollama | 11434 | AI 推理服务 |

---

## 测试

### 测试框架

- **Vitest** + **@testing-library/react** + **jsdom**

### 测试覆盖

```bash
pnpm test
```

32 测试用例：
- 10 语言 × 3 完整性检查 (key数量 / key格式 / 必需key存在)
- 2 结构检查 (权威源完整性 / 语言列表一致性)

---

## CI/CD

### GitHub Actions

**文件**: `.github/workflows/ci.yml`

```
push/PR → main
├── Quality Gates
│   ├── pnpm lint
│   ├── npx tsc --noEmit
│   └── pnpm build
└── Docker Build
    └── docker build --provenance=false
```

---

## YYC³ 标准化审计评分

**综合评级: A- (92/100)**

| 维度 | 权重 | 得分 | 评级 |
|------|------|------|------|
| 技术架构 | 25% | 93 | A |
| 代码质量 | 20% | 90 | A- |
| 功能完整性 | 20% | 95 | A |
| DevOps | 15% | 88 | B+ |
| 性能与安全 | 15% | 90 | A- |
| 业务价值 | 5% | 95 | A |

### 已完成功能

- [x] i18n 纯函数翻译体系 (10语言, SSR安全, 零Hydration)
- [x] AI 对话集成 (Ollama qwen3:32b, SSE流式)
- [x] 主题切换系统 (dark/light, CSS变量)
- [x] 3D 场景联动 (鼠标视差 + 浮动动画)
- [x] AI 成员展示区 (8位真实成员 + 能力指标)
- [x] 知识库资产展示 (120+ Skills / 50+ API / 30+ MCP)
- [x] CI/CD 管道 (GitHub Actions)
- [x] 自动化测试 (Vitest 32/32)
- [x] Docker 容器化 (multi-stage + compose)
- [x] 安全头配置 (CSP/HSTS/X-Frame/XSS/Referrer)
- [x] 图片优化 (avif/webp)

### 待改进项

- [ ] E2E 测试 (Playwright)
- [ ] 性能监控 (Lighthouse CI)
- [ ] i18n 懒加载 (按需加载语言包)

---

## 文档追溯信息

| 属性 | 值 |
|------|-----|
| 文档版本 | v3.0.0 |
| 创建日期 | 2026-04-26 |
| 更新日期 | 2026-04-30 |
| 模版标准 | YYC³ 文档引擎模版 v3.0.0 |
| 审计评分 | A- (92/100) |
| 关联文档 | i18n-integration-context.md, document_registry.json |

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

**© 2025-2026 YYC³ Team. All Rights Reserved.**
</div>
