# 贡献指南

感谢你对 YYC³ Nexus Portal 项目的关注！本文档描述如何参与项目贡献。

## 开发环境要求

| 工具 | 版本 |
|------|------|
| Node.js | >= 22 |
| pnpm | latest |
| Git | >= 2.40 |

## 快速上手

```bash
git clone https://github.com/YYC-Cube/YYC3-Nexus-Portal.git
cd YYC3-Nexus-Portal
pnpm install
pnpm dev
```

## 开发流程

### 1. 分支策略

| 分支 | 用途 |
|------|------|
| `main` | 生产分支，触发 GitHub Pages 自动部署 |
| `develop` | 开发集成分支 |
| `feature/*` | 功能开发分支 |
| `fix/*` | 缺陷修复分支 |

### 2. 提交规范

使用 Conventional Commits 格式：

```
<type>(<scope>): <subject>

type: feat | fix | refactor | docs | style | test | chore | ci
scope: i18n | ui | api | config | docs | test
```

示例：

```
feat(i18n): add Thai language support
fix(api): resolve SSE stream timeout on slow connections
ci(pages): add GitHub Pages auto-deploy pipeline
```

### 3. 质量门禁

提交 PR 前确保全部通过：

```bash
pnpm lint                   # ESLint 0 errors
pnpm exec tsc --noEmit      # TypeScript 0 errors
pnpm test                   # Vitest 全部通过
pnpm build                  # 构建成功
```

CI/CD 会自动运行以上检查，未通过不予合并。

### 4. Pull Request

- PR 目标分支：`main`
- 标题遵循 Conventional Commits 格式
- 描述包含：变更内容、关联 Issue、测试说明
- 确保 CI 全部通过后请求 Review

## i18n 贡献

翻译文件位于 `locales/` 目录，权威源为 `zh-CN.ts`。

**添加新键流程**：

1. 在 `locales/zh-CN.ts` 添加中文键值
2. 在 `locales/en.ts` 添加英文键值
3. 运行 `pnpm test` 验证翻译完整性

**添加新语言**：

1. 创建 `locales/{locale}.ts`，复制 zh-CN.ts 全部键并翻译
2. 在 `lib/i18n-client.ts` 注册新语言
3. 在 `components/i18n-provider.tsx` 的 `detectLocale` 添加检测

## 组件开发

项目使用 shadcn/ui (new-york style) + Radix UI primitives：

- 新增 UI 组件使用 `npx shadcn@latest add <component>`
- 自定义组件放置于 `components/sections/` 或 `components/lib/`
- 遵循现有组件的代码风格和命名约定

## 项目约定

- 代码无注释（除非明确要求）
- 变量/函数 camelCase，文件名 kebab-case
- 端口约定：开发 3000+，生产 3200-3500
- i18n 键名空间：`nav.*` / `hero.*` / `philosophy.*` / `scenario.*` / `architecture.*` / `footer.*`

---

<div align="center">

> **YanYuCloudCube** — 言启象限 · 语枢未来

</div>
