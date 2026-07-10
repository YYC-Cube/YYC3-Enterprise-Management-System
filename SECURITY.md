# 安全策略

## 安全架构

YYC³ Nexus Portal 实施多层安全防护机制。

### 生产环境安全头

| 头 | 值 | 说明 |
|---|---|------|
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | HSTS 强制 HTTPS |
| Content-Security-Policy | 完整 CSP 策略 | 防止 XSS 和注入 |
| X-Frame-Options | SAMEORIGIN | 防止点击劫持 |
| X-XSS-Protection | 1; mode=block | XSS 过滤 |
| X-Content-Type-Options | nosniff | MIME 嗅探防护 |
| Referrer-Policy | origin-when-cross-origin | 引用信息控制 |
| X-DNS-Prefetch-Control | on | DNS 预取优化 |

### CSP 策略范围

```
default-src 'self'
script-src 'self' 'unsafe-eval' 'unsafe-inline' (vercel.live)
style-src 'self' 'unsafe-inline' (fonts.googleapis.com)
font-src 'self' (fonts.gstatic.com)
img-src 'self' blob: data: (prod.spline.design)
connect-src 'self' (*.spline.design localhost:11434)
frame-src 'none'
object-src 'none'
```

### API 安全

| 措施 | 实现 |
|------|------|
| 输入验证 | zod schema (role/content/model) |
| 速率限制 | 20 req/min/IP 内存级限流 |
| 消息长度 | 单条 max 4000 chars |
| 历史限制 | max 50 messages |
| CORS | 同源策略 |

## 安全漏洞报告

如果你发现安全漏洞，请**不要**通过公开 Issue 报告。

### 报告方式

- **邮箱**: admin@0379.email
- **主题**: [Security] YYC3-Nexus-Portal - 漏洞简要描述

### 报告内容

1. 漏洞类型（XSS / CSRF / 注入 / 信息泄露 / 其他）
2. 影响范围和严重程度
3. 复现步骤
4. 可能的修复建议

### 响应流程

1. 确认收到报告（48小时内）
2. 评估漏洞严重程度
3. 开发修复方案
4. 发布安全更新
5. 公开致谢（如授权）

## 安全最佳实践

- 敏感信息使用环境变量，不提交至代码仓库
- `.env*` 文件已加入 `.gitignore`
- PAT/Token 不记录在文档或日志中
- 遵循最小权限原则

---

<div align="center">

> **YanYuCloudCube** — 言启象限 · 语枢未来

</div>
