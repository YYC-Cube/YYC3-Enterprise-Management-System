<p align="center">
  <img src="public/YYC3-Family-001.png" alt="YYC³ Enterprise Management System — 四源合一智能企业管理平台" width="100%" />
</p>

<h1 align="center">YYC³ Enterprise Management System</h1>

<p align="center">
  <strong>四源合一 · 全功能企业管理底盘 · 智能化中台引擎</strong>
</p>

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript&logoColor=white" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2-000000?logo=next.js&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black" />
  <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-latest-E4E4E7?logo=shadcnui&logoColor=black" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-9.x-F69220?logo=pnpm&logoColor=white" />
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-5.0-FF6B6B" />
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-4.0-6E9F18?logo=vitest&logoColor=white" />
  <img alt="AI SDK" src="https://img.shields.io/badge/AI_SDK-v5-007ACC" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue" />
  <img alt="Build" src="https://img.shields.io/badge/Build-Passing-brightgreen" />
  <img alt="tsc" src="https://img.shields.io/badge/tsc-0%20errors-success" />
  <img alt="Pages" src="https://img.shields.io/badge/Pages-78+-orange" />
  <img alt="i18n" src="https://img.shields.io/badge/i18n-10%20langs-purple" />
</p>

<p align="center">
  <code>Nexus-Portal</code> 壳 &nbsp;+&nbsp; <code>Management</code> 器官 &nbsp;+&nbsp; <code>Business-Mgmt</code> 审批流 &nbsp;+&nbsp; <code>Saas</code> CRM/团队
</p>

<p align="center">
  <a href="https://github.com/YYC-Cube/YYC3-Enterprise-Management-System"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-YYC3--EMS-181717?logo=github" /></a>
  <a href="https://management.yyc3.vip"><img alt="Live Demo" src="https://img.shields.io/badge/Live-management.yyc3.vip-success?logo=globalentry" /></a>
</p>

<p align="center">
  <code>pnpm install && pnpm dev</code> &nbsp;—&nbsp; 即可运行（端口 <code>3223</code>）
</p>

---

## 概述

**YYC³ Enterprise Management System** 是一套基于 Next.js 16 App Router 构建的**全功能企业管理中台**，融合四个独立项目的核心能力，形成「门户壳 + 业务器官 + 审批流 + CRM/团队」的四源合一架构。

> **仓库地址**：[https://github.com/YYC-Cube/YYC3-Enterprise-Management-System](https://github.com/YYC-Cube/YYC3-Enterprise-Management-System)
>
> **在线演示**：[https://management.yyc3.vip](https://management.yyc3.vip)

项目面向**中大型企业**的全链路数字化需求，覆盖从客户获客、项目协作、审批流转到财务人事的完整业务闭环，并内置 AI 引擎、性能监控、安全防护、灾备自愈等企业级基础设施。采用 React 19 + Tailwind CSS 4 最新技术栈，享受 React Compiler、Server Components、Turbopack 等前沿能力。

### 核心定位

| 维度 | 描述 |
|------|------|
| **业务覆盖** | 78 个业务页面 · 9 个 API 路由 · 50+ UI 组件 · 40+ 业务组件 |
| **技术深度** | 全栈 TypeScript · 零编译错误 · 100% 类型覆盖 |
| **架构层次** | 应用层 → 服务层 → 数据层 · 三层分离 · 清晰边界 |
| **智能化** | Agentic Core · 多模型适配 · 上下文管理 · 持续学习 |
| **国际化** | 10 种语言 · RTL 支持 · 动态切换 |
| **安全等级** | CSRF · 签名验证 · 安全头 · 审计日志 · 多租户 |

---

## 项目可视化架构

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        YYC³ EMS · Application Layer                   │
│                                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  门户     │  │  AI 智能  │  │  仪表盘   │  │  客户CRM  │  │  审批流   │      │
│  │  Portal  │  │  AI Hub  │  │ Dashboard│  │   CRM    │  │ Approval│      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │              │              │              │              │            │
│  ┌────┴──────────────┴──────────────┴──────────────┴──────────────┴────┐    │
│  │          78 页面 · 9 API · Next.js 16 App Router                       │    │
│  │                    (dashboard) 路由组 · 全局导航                        │    │
│  └────────────────────────────┬────────────────────────────────────────┘    │
│                               │                                                 │
│  ┌────────────────────────────┴────────────────────────────────────────┐    │
│  │          50+ shadcn/ui 组件 · Radix UI · Tailwind CSS 4.3               │    │
│  └────────────────────────────┬────────────────────────────────────────┘    │
│                               │                                                 │
├───────────────────────────────┼─────────────────────────────────────────────┤
│                        Service Layer · 服务层                                  │
│                               │                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ AI 引擎  │ │ 安全层   │ │ API 网关 │ │ 性能监控 │ │ 审计日志 │ │ 缓存层   │  │
│  │Agentic  │ │Security │ │   API   │ │ Monitor │ │  Audit  │ │  Cache  │  │
│  │  Core   │ │CSRF/Sig │ │Middleware│ │Optimize │ │  Log    │ │  Layer  │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                        Data Layer · 数据层                                     │
│                                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐  │
│  │  Zustand 5.0     │  │  Prisma 5.22     │  │  PostgreSQL + Redis      │  │
│  │  user·task·      │  │  schema.prisma   │  │  6 Repository            │  │
│  │  project·customer│  │  15+ Model       │  │  Multi-tenant            │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 技术栈

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **运行时** | Node.js | ≥ 18.18 | 服务端运行环境 |
| **框架** | Next.js | 16.2.9 | App Router · Turbopack · SSR · ISR · API Routes · Cache Components |
| **UI 库** | React | 19.2 | 组件化渲染 · React Compiler 兼容 · `ref` as prop |
| **类型系统** | TypeScript | 5.6+ | 全量类型安全（0 编译错误） |
| **组件库** | shadcn/ui + Radix UI | latest | 50+ 可访问性组件 · React 19 兼容 |
| **样式引擎** | Tailwind CSS | 4.3.1 | CSS 优先配置 · `@theme` 设计令牌 · `bg-linear-*` 语法 |
| **状态管理** | Zustand | 5.0 | 轻量客户端状态 |
| **数据获取** | SWR | 2.2 | 远程数据缓存与重新验证 |
| **表单** | React Hook Form + Zod | 7.5 / 3.25 | 类型安全表单校验 |
| **ORM** | Prisma | 5.22 | 类型安全数据库操作 |
| **数据库** | PostgreSQL + Redis | 8.16 / 5.10 | 持久化 + 缓存 |
| **包管理** | pnpm | 9.x | 高效磁盘空间 |
| **测试框架** | Vitest | 4.0 | 单元/集成测试 · V8 覆盖率 |
| **AI 集成** | Vercel AI SDK | 5.0 | LLM 对话 · 工具调用 · 流式响应 |
| **动画** | Framer Motion | 11.0 | 声明式动画 |
| **图表** | Recharts | 3.5 | 数据可视化 |
| **流程图** | ReactFlow | 11.11 | 审批流可视化设计 |
| **CSS 动画** | tw-animate-css | 1.4 | Tailwind v4 兼容动画库（替代 tailwindcss-animate） |
| **国际化** | 内置 i18n | — | 10 语言支持 |

---

## Next.js 16 / React 19 升级要点

本项目已从 Next.js 14 + React 18 + Tailwind 3.4 全量升级至最新技术栈：

| 升级项 | 变更 |
|--------|------|
| **Next.js 14 → 16** | Turbopack 默认 · `middleware.ts` → `proxy.ts` · `params` 为 `Promise`（需 `await`） |
| **React 18 → 19** | `useRef()` 需初始值参数 · `forwardRef` 可选（`ref` as prop）· React Compiler 就绪 |
| **Tailwind 3.4 → 4.3** | 删除 `tailwind.config.ts` · CSS 优先配置（`@theme`）· `bg-gradient-*` → `bg-linear-*` |
| **PostCSS** | `tailwindcss + autoprefixer` → `@tailwindcss/postcss` 单插件 |
| **动画库** | `tailwindcss-animate`（v3 插件）→ `tw-animate-css`（v4 CSS 导入） |

---

## 源代码构成

| 来源 | 注入内容 | 路径 |
|------|---------|------|
| **Nexus-Portal** | 50+ shadcn/ui 组件、10语言 i18n、安全策略 | `components/ui/` `locales/` |
| **YYC3-Management** | 48 业务页、DB层、AI引擎、Agent Core | `app/` `lib/` `store/` |
| **Business-Management** | 15文档审批组件、Prisma、收银/库存/人事 | `prisma/` `components/approval/` |
| **Saas-landing** | 9 CRM面板、7 团队面板、智能表单 | `components/crm/` `components/team/` |

---

## 页面总览（78 页）

| 分类 | 页面 |
|------|------|
| 门户 | `/` — 首页 |
| AI 智能 | `ai-assistant` `ai-content-creator` `ai-customer-data` `ai-floating-demo` `ai-maintenance` `ai-smart-forms` `enhanced-ai-demo` `chat` |
| 仪表盘 | `dashboard` `analytics` `advanced-bi` `performance` `performance-optimization` |
| 客户管理 | `customers` `crm/*` `channel-center` `customer-followup` |
| 任务协作 | `tasks` `okr` `projects` `schedule` `communication` `collaboration` |
| 审批流程 | `approval` `workflow` `documents`（15文档审批组件） |
| 财务管理 | `finance` `cashier` `inventory` |
| 人事组织 | `organization` `personnel` `honors` `position-settings` `business-club` |
| 系统管理 | `user-management` `tenant-management` `permission-management` `system-settings` `platform-settings` |
| 运维监控 | `system-monitor` `log-management` `system-testing` `backup-recovery` `security-center` |
| 数据集成 | `data-integration` `modules` |
| 消息通知 | `notifications` `message-center` |
| 设计工具 | `design-tools` `creative-collaboration` |
| 其他 | `help` `help-center` `settings` `profile` `offline` `mobile-app` `forgot-password` |

### API 路由（9 个）

| 路由 | 方法 | 用途 |
|------|------|------|
| `/api/chat` | POST | AI 对话接口 |
| `/api/customers` | GET/POST | 客户 CRUD |
| `/api/customers/[id]` | PUT/DELETE | 客户更新/删除（`params: Promise`） |
| `/api/projects` | GET/POST | 项目 CRUD |
| `/api/projects/[id]` | PUT/DELETE | 项目更新/删除（`params: Promise`） |
| `/api/tasks` | GET/POST | 任务 CRUD |
| `/api/tasks/[id]` | PUT/DELETE | 任务更新/删除（`params: Promise`） |
| `/api/users` | GET/POST | 用户 CRUD |
| `/api/users/[id]` | PUT/DELETE | 用户更新/删除（`params: Promise`） |

---

## 组件库

### shadcn/ui 标准（50+）

`accordion` `alert-dialog` `aspect-ratio` `avatar` `badge` `button` `card` `checkbox` `collapsible` `command` `context-menu` `dialog` `dropdown-menu` `form` `hover-card` `input` `input-otp` `label` `menubar` `navigation-menu` `pagination` `popover` `progress` `radio-group` `resizable` `scroll-area` `select` `separator` `sheet` `sidebar` `skeleton` `slider` `sonner` `switch` `table` `tabs` `textarea` `toast` `toaster` `toggle` `toggle-group` `tooltip`

### 增强组件

`advanced-search-bar` `batch-operations-panel` `data-import-export` `enhanced-button` `enhanced-card` `enhanced-progress` `floating-nav-buttons` `form-error` `interactive-progress` `status-badge` `tree` `virtual-scroll` `charts`

### 业务组件

| 模块 | 组件 |
|------|------|
| **CRM**（9） | customer-followup · invitation · leads · lifecycle · maintenance · prospects · reactivation · revisit · upgrade |
| **Team**（7） | bonus-pool · daily-reports · organization-structure · performance-management · reward-penalty · team-analytics · team-management-hub |
| **Forms**（4） | form-designer · form-preview · form-templates · smart-form-builder |
| **Approval**（15） | approval-detail · process-designer · statistics + 12 document-approval-* |
| **AI**（7） | ai-analytics-chat · ai-assistant · ai-collaboration-hub · ai-customer-support · ai-monitoring-dashboard · ai-smart-forms · ai-workflow-automation |

### 全局导航

| 组件 | 路径 | 说明 |
|------|------|------|
| AppNavigation | `components/app-navigation.tsx` | 四级导航（7大分类 · 66 页面映射） · 搜索过滤 · 路由感知 · 移动抽屉 |
| 导航配置 | `lib/navigation-config.tsx` | 四级分类数据源（数据中心/核心业务/人力资源/办公协同/AI智能/系统设置） |
| AI 浮窗 | `components/ai-floating-widget/` | `AIWidgetProvider` + `AIWidgetTrigger` · Ctrl/Cmd+K 唤起 |

---

## 基础设施

| 层 | 路径 | 说明 |
|----|------|------|
| 数据库 | `lib/db/` | PostgreSQL + Redis · 6 Repository |
| 安全 | `lib/security/` | CSRF · 签名 · 告警 |
| API | `lib/api/` | 中间件 · 日志 · 验证 · 响应 |
| AI 引擎 | `lib/agentic-core/` | Agent StateBus · MessageBus · TaskScheduler |
| AI 动作 | `lib/ai-actions-manager/` | AI 动作管理与调度 |
| AI 组件 | `lib/ai-components/` | 事件总线 · 生命周期 · React 集成 |
| 模型适配 | `lib/ai-models.ts` | OpenAI · 智谱 · 本地模型热切换 |
| 自治引擎 | `lib/autonomous-engine/` | 自治决策与执行 |
| 上下文 | `lib/context-manager/` | 上下文记忆管理 |
| 持续学习 | `lib/continuous-learning/` | 模型反馈与迭代 |
| 目标管理 | `lib/goal-management/` | OKR 目标分解 |
| 性能 | `lib/performance/` | 监控 · 优化 · Web Vitals 5.1 |
| 审计 | `lib/audit/` | 审计日志 |
| 缓存 | `lib/cache-layer/` | 多级缓存 |
| 灾备 | `lib/disaster-recovery/` | 灾备 · 多活 |
| 自愈 | `lib/self-healing-ecosystem/` | 反馈闭环 · 自动恢复 |
| 数据优化 | `lib/data-optimization/` | 数据分层与索引优化 |

---

## 存储层

| 层 | 路径 | 说明 |
|----|------|------|
| Zustand | `store/` | user-store · task-store · project-store · customer-store · notification-store |
| Prisma | `prisma/schema.prisma` | 数据库 Schema · 15+ Model |
| Hooks | `hooks/` | use-users · use-tasks · use-customers · use-projects · use-form-validation |

---

## i18n 国际化（10 语言）

| 语言 | 文件 |
|------|------|
| 简体中文 | `locales/zh-CN.ts` |
| 繁体中文 | `locales/zh-TW.ts` |
| English | `locales/en.ts` |
| 日本語 | `locales/ja.ts` |
| 한국어 | `locales/ko.ts` |
| Deutsch | `locales/de.ts` |
| Français | `locales/fr.ts` |
| Español | `locales/es.ts` |
| Português | `locales/pt-BR.ts` |
| العربية | `locales/ar.ts` |

---

## 安全策略

- X-DNS-Prefetch-Control
- X-Frame-Options: `SAMEORIGIN`
- X-Content-Type-Options: `nosniff`
- X-XSS-Protection: `1; mode=block`
- Referrer-Policy: `origin-when-cross-origin`
- CSRF Token 验证
- 请求签名验证

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式（端口 3223，Webpack 模式）
pnpm dev

# 生产构建
pnpm build

# 启动生产服务（端口 3223）
pnpm start

# 类型检查
pnpm type-check

# 运行测试
pnpm test

# 测试监听模式
pnpm test:watch

# ESLint 检查
pnpm lint

# Docker 部署
docker-compose up -d
```

> **注**：dev 脚本使用 `--webpack` 标志。Tailwind CSS v4.3 与 Turbopack 存在已知兼容性问题（`var(--$color)` 解析错误），待 Tailwind v4.4+ 修复后可移除此标志切换回 Turbopack。

## 可选增强

```bash
# Sentry 错误追踪
pnpm add @sentry/nextjs
# 配置 NEXT_PUBLIC_SENTRY_DSN 环境变量

# 数据库迁移
pnpm prisma migrate dev
pnpm prisma generate

# Prisma Studio 可视化
pnpm prisma studio
```

---

## 项目结构

```
YYC3-Enterprise/
├── app/                      # Next.js 16 App Router（78 页面）
│   ├── (dashboard)/          # 主应用路由组（注入全局导航 + AI 浮窗）
│   │   ├── layout.tsx        # AIWidgetProvider + AppNavigation
│   │   ├── dashboard/        # 仪表盘
│   │   ├── customers/        # 客户管理
│   │   ├── projects/         # 项目管理
│   │   ├── approval/         # 审批流程
│   │   └── ... (66 个业务页面)
│   ├── api/                  # API 路由（9 个）
│   │   ├── chat/             # AI 对话
│   │   ├── customers/        # 客户 CRUD（含 [id] params: Promise）
│   │   ├── projects/         # 项目 CRUD
│   │   ├── tasks/            # 任务 CRUD
│   │   └── users/            # 用户 CRUD
│   ├── login/                # 认证页（无导航）
│   ├── forgot-password/      # 认证页（无导航）
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 首页
├── components/               # 组件库
│   ├── ui/                   # shadcn/ui 基础组件（50+）
│   ├── app-navigation.tsx    # 全局四级导航组件
│   ├── crm/                  # CRM 业务组件（9）
│   ├── team/                 # 团队管理组件（7）
│   ├── approval/             # 审批流程组件（15）
│   ├── charts/               # 图表组件
│   └── ai-floating-widget/   # AI 悬浮组件
├── lib/                      # 核心库（30+ 模块）
│   ├── navigation-config.tsx # 四级导航配置数据
│   ├── db/                   # 数据库层（PostgreSQL + Redis）
│   ├── security/             # 安全模块（CSRF · 签名）
│   ├── api/                  # API 中间件
│   ├── agentic-core/         # AI Agent 引擎
│   ├── autonomous-engine/    # 自治引擎
│   ├── performance/          # 性能监控优化
│   ├── disaster-recovery/    # 灾备系统
│   └── ...
├── store/                    # Zustand 状态管理
├── hooks/                    # React Hooks
├── prisma/                   # Prisma Schema（15+ Model）
├── locales/                  # i18n（10 语言）
├── public/                   # 静态资源
├── types/                    # 类型声明
├── proxy.ts                  # Next.js 16 代理（原 middleware.ts）
├── next.config.mjs           # Turbopack 配置
├── postcss.config.mjs        # @tailwindcss/postcss 单插件
└── docs/                     # 项目文档
```

---

## 质量保障

| 指标 | 状态 |
|------|------|
| TypeScript 编译 | 0 错误 |
| 生产代码类型覆盖 | 100% |
| IDE 实时诊断 | 0 报错 |
| 核心页面 HTTP | 全部 200 |
| API 路由 | 全部 200 |

---

*YYC³ Enterprise Management System v1.0.0 — 四源合一，永不回头。*

*言启千行代码，语枢万物智能。*
