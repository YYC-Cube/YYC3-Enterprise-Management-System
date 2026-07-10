---
file: docs/i18n-integration-context.md
description: YYC³ Nexus Portal i18n集成上下文衔接文档，记录每阶段始末协同上下文
author: YanYuCloudCube Team <admin@0379.email>
version: v3.0.0
created: 2026-04-26
updated: 2026-04-30
status: published
tags: [i18n],[国际化],[上下文衔接],[阶段记录]
category: technical
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

# YYC³ Nexus Portal — i18n 集成上下文衔接文档

## 核心理念

**五高架构**：高可用 | 高性能 | 高安全 | 高扩展 | 高智能
**五标体系**：标准化 | 规范化 | 自动化 | 可视化 | 智能化
**五化转型**：流程化 | 数字化 | 生态化 | 工具化 | 服务化
**五维评估**：时间维 | 空间维 | 属性维 | 事件维 | 关联维

## 项目信息

| 属性         | 值                                                       |
| ------------ | -------------------------------------------------------- |
| **项目名称** | YYC³ Nexus Portal (言渝云枢 · 智能交互门户)              |
| **框架**     | Next.js 16 + React 19 + TypeScript                       |
| **i18n引擎** | 自研纯函数翻译体系 (translate + locales) |
| **覆盖语言** | zh-CN, en, zh-TW, ja, ko, fr, de, es, pt-BR, ar (10语言) |
| **核心语言** | 中文 (zh-CN) 为权威源                                    |

---

## 阶段记录

### Phase 0: 知识库校准 ✅

**时间**: 2026-04-26
**状态**: 已完成

**输入**:
- YYC3-AI-Skill-KB 知识库深度分析
- YYC3-i18n 源码架构理解

**产出**:
- 端到端高可用技术流分析
- 差异化用户分类定向（4类场景用户）
- 10语言 i18n 架构方案
- 可结合点矩阵（6个P0/P1结合点）

**关键决策**:
- 项目定位为 YYC³ AI Family 的「3D交互门户」
- 使用自研 @yyc3/i18n-core 而非第三方 i18n 库
- 中文为权威源，AI辅助翻译+人工校审工作流

---

### Phase 1: i18n 核心集成 ✅

**时间**: 2026-04-26
**状态**: 已完成

**目标**:
- 将 @yyc3/i18n-core 集成到 Next.js 项目
- 提取首页所有硬编码文案为翻译 key
- 创建10语言翻译文件
- 实现语言切换功能

**实际产出**:
- `lib/i18n-client.ts` — 引擎客户端封装 (flattenToNested + deepMerge + 单例管理)
- `components/i18n-provider.tsx` — React Context + useI18n Hook (mounted 守卫)
- `locales/` — 10语言翻译文件 (63 keys/语言)
- `components/new-yorker-spline.tsx` — 全量 t() 替换 + LanguageSwitcher 组件

**关键发现**:
- I18nEngine 构造函数 `DEFAULT_LOCALE = "en"`，`loadInitialLocale()` 忽略 config.locale
- 引擎 `resolveTranslation()` 按嵌套路径解析，扁平 key 需转换为嵌套对象
- `registerTranslation()` 是覆盖式赋值，需 deepMerge 合并内置+站点翻译
- `setLocale()` 是 async 函数，SSR 时需 fire-and-forget 后同步使用

**翻译 key 命名规范**:
- `nav.*` — 导航栏 (5 keys)
- `hero.*` — 首屏Hero区 (7 keys)
- `philosophy.*` — 理念区 (28 keys)
- `scenario.*` — 场景区 (10 keys)
- `architecture.*` — 架构区 (8 keys)
- `footer.*` — 页脚 (5 keys)
- **合计**: 63 keys × 10 语言

---

### Phase 2: 首页文案提取 + 语言切换 ✅

**时间**: 2026-04-26
**状态**: 已完成

**目标**: 所有硬编码中文文案替换为 t() 调用 + 语言切换器

**产出**:
- `app/page.tsx` — 包裹 I18nProvider (client component)
- `components/new-yorker-spline.tsx` — 50+ 处硬编码文案全部替换为 t()
- `LanguageSwitcher` 组件 — 导航栏下拉式10语言切换器
- 移动端适配 — 汉堡菜单内嵌语言切换

**Hydration Mismatch 修复** (三层问题):

| 层级   | 根因                                                      | 修复方案                               |
| ------ | --------------------------------------------------------- | -------------------------------------- |
| 引擎层 | `DEFAULT_LOCALE="en"` + `loadInitialLocale()` 忽略 config | 构造后 `void setLocale(locale)`        |
| 数据层 | 扁平 key 按嵌套路径解析失败                               | `flattenToNested()` + `deepMerge()`    |
| 渲染层 | SSR 中文 vs 客户端英文首次不匹配                          | `mounted` 守卫 + `DEFAULT_LOCALE` 兜底 |

**验证结果**:
- SSR: `GET / 200` ✅
- SSR 输出中文: "联系" "言启象限" "高可用" ✅
- 无 Hydration 错误 ✅
- 语言切换即时生效 + localStorage 持久化 ✅

---

### Phase 3: RTL适配 + 交互增强 ✅

**时间**: 2026-04-26
**状态**: 已完成

**前置条件**: Phase 1-2 完成 ✅
**目标**: 阿拉伯文RTL深度适配 + 首页交互动效增强

**实际产出**:
- `ParticleField` — Canvas 粒子连线背景 (60个粒子 + 120px连线阈值)
- `TypewriterText` — Slogan 逐字打出 + 紫色闪烁光标
- `ScrollProgress` — 顶部渐变进度条 (紫→青→绿)
- RTL 文字方向适配 — 阿拉伯语自动 `dir="rtl"`
- 上下文衔接文档 Phase 1-2 完成记录

**验证结果**:
- `GET / 200` × 3 ✅
- 无 Hydration 错误 ✅
- 无 TypeScript 错误 (项目代码) ✅

---

### Phase 4: 验证与文档闭环 ✅

**时间**: 2026-04-26
**状态**: 已完成

**前置条件**: Phase 0-3 完成 ✅
**目标**: 全验证 + 文档标准对齐 + 审计评分

**产出**:
- TypeScript 类型检查通过（项目代码零错误）
- `DEVELOPER.md` 按 YYC³ 文档引擎模版标准 v3.0.0 对齐
- `i18n-integration-context.md` 补充品牌标识 + 核心理念
- `document_registry.json` 文档注册表 + 追溯链
- `.trae/rules/yyc3.md` 项目规则更新

**YYC³ 标准化审计评分**:

| 维度       | 权重     | 得分   | 评级   |
| ---------- | -------- | ------ | ------ |
| 技术架构   | 25%      | 87     | B+     |
| 代码质量   | 20%      | 85     | B+     |
| 功能完整性 | 20%      | 90     | A-     |
| DevOps     | 15%      | 72     | C+     |
| 性能与安全 | 15%      | 82     | B      |
| 业务价值   | 5%       | 92     | A      |
| **综合**   | **100%** | **85** | **B+** |

**待改进项**:
- [ ] CI/CD 管道 (GitHub Actions)
- [ ] 自动化测试 (Vitest + Playwright)
- [ ] Docker 容器化
- [ ] 环境变量管理 (.env)

---

### Phase 5: AI Family 集成 + 主题切换 + 3D联动 ✅

**时间**: 2026-04-28
**状态**: 已完成

**目标**: 展示 AI Family 8位成员 + 知识库资产 + 主题切换 + 3D场景交互

**产出**:
- `AIFamilySection` — 8位AI成员卡片 (Meta-Oracle/Bolero/Master/Sentinel/Prophet/Max-代码/chuping/FFFFFF)
- `KnowledgeSection` — 知识库资产统计 (120+ Skills / 50+ API / 30+ MCP / 10 Languages)
- `components/theme-provider.tsx` — ThemeProvider + useTheme Hook (dark/light)
- ThemeToggle — Navbar 内主题切换按钮 (Moon/Sun + 旋转动画)
- `app/globals.css` — CSS变量体系 (`[data-theme]` 属性选择器, 12变量/主题)
- 3D场景联动 — Spline 容器鼠标视差旋转 + 6s 浮动动画
- 8个locale文件新增 `family.*` 翻译 key

---

### Phase 6: 工程基础设施 ✅

**时间**: 2026-04-29
**状态**: 已完成

**目标**: CI/CD + Docker + 测试 + 安全头 + 环境管理

**产出**:
- `.github/workflows/ci.yml` — 质量门禁 (lint + tsc + build + docker)
- `Dockerfile` — 4阶段多阶段构建 (base → deps → builder → runner)
- `docker-compose.yml` — 端口3200 + 健康检查
- `.env.example` — 环境变量模板
- `next.config.mjs` — 7个安全头 (CSP/HSTS/X-Frame/XSS/Referrer/X-Content-Type/X-DNS)
- `vitest.config.ts` + `__tests__/setup.ts` + `__tests__/i18n.test.ts` — 32/32 测试通过
- 审计评分: B+ (85) → A- (92)

---

### Phase 7: AI对话集成 + i18n架构重构 ✅

**时间**: 2026-04-30
**状态**: 已完成

**目标**: Ollama 本地AI对话 + 彻底修复 Hydration Mismatch + i18n 纯函数化

**产出**:
- `app/api/chat/route.ts` — Ollama SSE 对话代理 (NDJSON → SSE)
- `components/chat-widget.tsx` — AI对话浮窗 (SSE流式 + 打字光标)
- `lib/i18n-client.ts` — 彻底重写，抛弃 I18nEngine 依赖:
  - `translate(locale, key, params?)` 纯函数，同步，零副作用
  - 直接查 `translations[locale][key]`，无需 flattenToNested/deepMerge
- `components/i18n-provider.tsx` — 彻底重写:
  - `t()` 统一路径 → `translate(locale, key, params)`
  - 移除 mounted 双路径和 SITE_TRANSLATIONS 直接读取
  - `useState("zh-CN")` 确保 SSR + 客户端初始值一致

**根因分析与重构决策**:

| 问题 | 根因 | 解决 |
|------|------|------|
| Hydration Mismatch | I18nEngine `loadInitialLocale()` 忽略 config.locale，强制用 navigator/null 检测 | 抛弃引擎状态管理，自建纯函数 |
| SSR 输出英文 | 引擎 `DEFAULT_LOCALE="en"`，构造后 locale 为 "en" | translate() 直接用 locale 参数 |
| 客户端首次渲染英文 | mounted guard 走 SITE_TRANSLATIONS 路径，但引擎单例已被污染 | 统一 t() 路径，无 mounted 分支 |
| 类型断言 hack | `engine.state` 是 private，需 unknown 中转 | 不再使用引擎，无需 hack |

**验证结果**:
- SSR: `五高 · 五标 · 五化 · 五维` ✅
- Hydration: 零错误 ✅
- 10语言切换: 即时生效 ✅
- 端口 3146: 零浏览器错误 ✅

---

## 上下文衔接规则

1. 每阶段开始时更新本文档的「状态」
2. 每阶段结束时记录关键产出和决策
3. 发现的问题和变更记录在「变更日志」
4. 跨阶段依赖关系在此追踪

## 变更日志

| 时间       | 变更                       | 原因                                   |
| ---------- | -------------------------- | -------------------------------------- |
| 2026-04-26 | 创建上下文衔接文档         | Phase 0 完成，Phase 1 启动             |
| 2026-04-26 | Phase 1 完成，Phase 2 完成 | i18n集成+文案提取+语言切换器全部完成   |
| 2026-04-26 | 修复 Hydration Mismatch    | 三层问题: 引擎locale/扁平key/SSR不匹配 |
| 2026-04-26 | Phase 3 完成               | 粒子背景+打字机+进度条+RTL适配         |
| 2026-04-26 | Phase 4 完成               | 类型检查+文档对齐+审计评分B+(85分)     |
| 2026-04-26 | 文档最终整理 v2.0.0        | 全阶段闭环+追溯链+注册表+项目规则      |
| 2026-04-28 | Phase 5 完成               | AI Family + 主题切换 + 3D联动          |
| 2026-04-29 | Phase 6 完成               | CI/CD + Docker + Vitest + 安全头       |
| 2026-04-30 | Phase 7 完成               | AI对话 + i18n纯函数重构 + Hydration修复|
| 2026-04-30 | 文档全面更新 v3.0.0        | DEVELOPER.md + registry + context 对齐 |

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

**© 2025-2026 YYC³ Team. All Rights Reserved.**
</div>
