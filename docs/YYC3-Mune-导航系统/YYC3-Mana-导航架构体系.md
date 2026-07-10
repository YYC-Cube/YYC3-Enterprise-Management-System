# YYC³ Mana 企业智能管理系统

> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

## 📋 目录

1. [导航架构总览](#导航架构总览)
2. [一级导航分类详解](#一级导航分类详解)
3. [完整文件树结构](#完整文件树结构)

---

## 🎯 导航架构总览

### 架构设计原则

YYC³ 企业智能管理系统采用**四级导航架构**设计，遵循以下核心原则：

- **层级清晰**: 从一级到四级，逐层深入，逻辑递进
- **功能聚合**: 相关功能模块归类，便于用户快速定位
- **业务导向**: 以企业业务流程为核心组织导航
- **AI赋能**: 深度集成AI能力，提升智能化水平
- **视觉统一**: 统一的色彩系统和交互模式
- **响应式设计**: 支持桌面端、平板端、移动端多设备适配

### 导航层级结构

```
┌─────────────────────────────────────────────────────────────────┐
│                    一级导航 (7大分类)                       │
│  数据中心 | 核心业务 | 人力资源 | 财务资产 | 办公协同 | AI智能 | 系统设置 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    二级导航 (73个页面)                       │
│  AI数据屏 | 市场信息 | 客户管理 | 智能销售 | ... | 系统配置 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    三级导航 (页面内Tab)                       │
│  创意项目 | 创意库 | 团队协作 | AI工具 | 数据分析          │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    四级导航 (功能操作)                       │
│  新建项目 | 编辑 | 查看 | 分享 | AI头脑风暴 | ...          │
└─────────────────────────────────────────────────────────────────┘
```

### 整合策略

- **保留四级架构**: 维持原有的四级导航设计，保证用户体验一致性
- **重组分类体系**: 将7大一级分类重新组织，更符合业务逻辑
- **融合功能模块**: 将两个导航系统的功能模块进行整合和优化
- **增强AI能力**: 突出AI智能赋能，体现系统智能化特色
- **完善业务流程**: 覆盖企业完整的业务流程链路

---

## 📂 一级导航分类详解

### 1️⃣ 数据中心 (Data Center)

**设计理念**: 以数据驱动为核心，提供企业级数据可视化大屏和决策支持

**功能定位**: 提供企业数据总览、实时监控、趋势分析等数据驱动功能，支持管理层决策

**用户体验考量**:

- 数据可视化直观，一目了然
- 实时数据更新，及时掌握动态
- 关键指标突出，快速定位问题
- 交互式图表，支持深度分析

**二级导航列表**:

| 序号 | 页面名称 | 路由路径            | 图标            | 主题色 | 功能描述                           |
| ---- | -------- | ------------------- | --------------- | ------ | ---------------------------------- |
| 1    | AI数据屏 | `/ai-data-screen`   | BarChart3       | 蓝色   | 企业级驾驶舱，实时监控核心指标     |
| 2    | 数据总览 | `/data-overview`    | LayoutDashboard | 蓝色   | 企业数据总览、关键指标监控         |
| 3    | 数据分析 | `/data-analytics`   | PieChart        | 青色   | 多维数据分析、报表生成、数据挖掘   |
| 4    | 智能预测 | `/smart-prediction` | TrendingUp      | 紫色   | 业务趋势预测、数据建模、预测分析   |
| 5    | 智能预警 | `/smart-alert`      | AlertTriangle   | 橙色   | 异常情况实时报警、风险预警         |
| 6    | 数据报表 | `/data-reports`     | FileText        | 绿色   | 自定义报表、报表模板、报表导出     |
| 7    | 数据治理 | `/data-governance`  | Database        | 灰色   | 主数据管理、数据质量管理、数据标准 |

---

### 2️⃣ 核心业务 (Core Business)

**设计理念**: 以业务流程为核心，覆盖企业核心业务全链路

**功能定位**: 提供市场、客户、销售、订单、采购、物流、生产等核心业务功能，支持企业日常运营

**用户体验考量**:

- 业务流程清晰，操作顺畅
- 数据关联紧密，减少重复录入
- 智能辅助决策，提升效率
- 移动端支持，随时随地办公

**二级导航列表**:

| 序号 | 页面名称   | 路由路径             | 图标           | 主题色 | 功能描述                         |
| ---- | ---------- | -------------------- | -------------- | ------ | -------------------------------- |
| 1    | 市场信息   | `/market-info`       | TrendingUp     | 蓝色   | 实时金属行情与趋势分析           |
| 2    | 客户管理   | `/customer-mgmt`     | Users          | 绿色   | 客户档案与关系维护               |
| 3    | 智能销售   | `/smart-sales`       | ShoppingCart   | 橙色   | 销售订单与跟单管理               |
| 4    | 线索管理   | `/lead-mgmt`         | Target         | 紫色   | 销售线索捕捉与转化               |
| 5    | 合同管理   | `/contract-mgmt`     | FileText       | 青色   | 电子合同全生命周期管理           |
| 6    | 订单管理   | `/order-mgmt`        | ShoppingBag    | 蓝色   | 订单执行与状态追踪               |
| 7    | 智能采购   | `/smart-procurement` | Package        | 棕色   | 供应商管理与采购执行             |
| 8    | 供应商门户 | `/supplier-portal`   | Building2      | 灰色   | 供应商协同与绩效评估             |
| 9    | 智能物流   | `/smart-logistics`   | Truck          | 靛蓝   | 全球物流追踪与车队管理           |
| 10   | 库存管理   | `/inventory-mgmt`    | Box            | 翠绿   | 实时库存监控与盘点               |
| 11   | 智能生产   | `/smart-production`  | Factory        | 紫红   | 生产计划与加工管理               |
| 12   | 项目管理   | `/project-mgmt`      | FolderOpen     | 靛蓝   | 项目进度与成本控制               |
| 13   | 工单管理   | `/work-orders`       | ClipboardCheck | 绿色   | 任务分配与执行反馈               |
| 14   | 智能获客   | `/smart-acquisition` | UserPlus       | 粉色   | 多渠道获客分析                   |
| 15   | 智能风控   | `/smart-risk`        | ShieldAlert    | 红色   | 业务风险识别与预警               |
| 16   | 智能履约   | `/smart-fulfillment` | CheckCircle    | 青色   | 履约全流程监控                   |
| 17   | 门店管理   | `/store-mgmt`        | Store          | 蓝色   | 门店信息管理、门店运营、门店数据 |

---

### 3️⃣ 人力资源 (Human Resources)

**设计理念**: 以人才管理为核心，优化人力资源配置

**功能定位**: 提供员工全生命周期管理、招聘、培训、薪酬、绩效等HR功能，支持人才发展

**用户体验考量**:

- 员工档案完整，信息一目了然
- 招聘流程顺畅，提升招聘效率
- 培训体系完善，支持员工成长
- 绩效考核公平，激励员工发展

**二级导航列表**:

| 序号 | 页面名称 | 路由路径             | 图标       | 主题色 | 功能描述               |
| ---- | -------- | -------------------- | ---------- | ------ | ---------------------- |
| 1    | 员工管理 | `/employee-mgmt`     | User       | 蓝色   | 员工档案与生命周期     |
| 2    | 智能招聘 | `/smart-recruitment` | UserPlus   | 绿色   | 招聘流程与人才库       |
| 3    | 智能培训 | `/smart-training`    | BookOpen   | 紫色   | 培训计划与考核         |
| 4    | 薪酬管理 | `/payroll-mgmt`      | DollarSign | 橙色   | 薪资计算与发放         |
| 5    | 绩效管理 | `/performance-mgmt`  | Target     | 红色   | 绩效考核与评估         |
| 6    | 考勤管理 | `/attendance-mgmt`   | Clock      | 青色   | 排班与考勤统计         |
| 7    | 商务管理 | `/business-mgmt`     | Plane      | 灰色   | 商务差旅与费用         |
| 8    | 人才画像 | `/talent-profile`    | UserCircle | 粉色   | 人才能力模型分析       |
| 9    | 智能排班 | `/smart-scheduling`  | Calendar   | 紫色   | 自动化排班优化         |
| 10   | 组织架构 | `/org-structure`     | GitBranch  | 蓝色   | 组织架构管理、部门设置 |

---

### 4️⃣ 财务资产 (Finance & Assets)

**设计理念**: 以财务管理为核心，保障企业资金和资产安全

**功能定位**: 提供财务核算、发票、支付、预算、资产等财务功能，支持企业财务管理

**用户体验考量**:

- 财务数据准确，核算规范
- 发票管理便捷，减少人工操作
- 预算控制严格，防范财务风险
- 资产管理完善，保障资产安全

**二级导航列表**:

| 序号 | 页面名称 | 路由路径                | 图标          | 主题色 | 功能描述           |
| ---- | -------- | ----------------------- | ------------- | ------ | ------------------ |
| 1    | 智能记账 | `/smart-accounting`     | Calculator    | 蓝色   | 自动化财务核算     |
| 2    | 发票管理 | `/invoice-mgmt`         | FileText      | 绿色   | 进销项发票处理     |
| 3    | 支付管理 | `/payment-mgmt`         | CreditCard    | 橙色   | 资金收付与流水     |
| 4    | 贷款管理 | `/loan-mgmt`            | Landmark      | 紫色   | 融资与信贷管理     |
| 5    | 智能税务 | `/smart-tax`            | Receipt       | 红色   | 税务申报与合规     |
| 6    | 智能预算 | `/smart-budget`         | PieChart      | 青色   | 预算编制与控制     |
| 7    | 智能报销 | `/smart-reimbursement`  | Wallet        | 棕色   | 费用报销流程       |
| 8    | 资产管理 | `/asset-mgmt`           | Building      | 灰色   | 固定资产全生命周期  |
| 9    | 设备管理 | `/equipment-mgmt`       | Cpu           | 靛蓝   | 设备维护与折旧     |
| 10   | 智能审计 | `/smart-audit`          | Search        | 紫红   | 财务审计与合规检查  |
| 11   | 资产盘点 | `/asset-inventory`      | ClipboardList | 绿色   | 资产实物盘点       |
| 12   | 智能对账 | `/smart-reconciliation` | RefreshCw     | 蓝色   | 银企对账与往来对账  |

---

### 5️⃣ 办公协同 (Office Collaboration)

**设计理念**: 以协作为核心，提升团队工作效率

**功能定位**: 提供办公管理、审批、文档、流程、权限等协同功能，支持团队高效协作

**用户体验考量**:

- 审批流程顺畅，提升办公效率
- 文档管理便捷，支持知识沉淀
- 协作工具丰富，满足不同场景
- 权限控制严格，保障数据安全

**二级导航列表**:

| 序号 | 页面名称 | 路由路径                  | 图标        | 主题色 | 功能描述             |
| ---- | -------- | ------------------------- | ----------- | ------ | -------------------- |
| 1    | 办公管理 | `/office-mgmt`            | Building2   | 灰色   | 行政事务与资源       |
| 2    | 智能审批 | `/smart-approval`         | CheckSquare | 绿色   | 统一审批中心         |
| 3    | 文档管理 | `/document-mgmt`          | FileText    | 蓝色   | 企业知识库与网盘     |
| 4    | 流程管理 | `/workflow-mgmt`          | GitBranch   | 紫色   | 业务流程设计与优化   |
| 5    | 权限管理 | `/permission-mgmt`        | Shield      | 红色   | 角色与权限配置       |
| 6    | 数据管理 | `/data-mgmt`              | Database    | 青色   | 主数据与数据治理     |
| 7    | 工具管理 | `/tool-mgmt`              | Wrench      | 橙色   | 办公工具箱           |
| 8    | 企业管理 | `/enterprise-mgmt`        | Briefcase   | 棕色   | 企业工商与资质       |
| 9    | 智能文档 | `/smart-docs`             | FileEdit    | 蓝色   | 在线协作文档         |
| 10   | 智能协同 | `/smart-collaboration`    | Users       | 绿色   | 任务协作与沟通       |
| 11   | 智能会议 | `/smart-meetings`         | Video       | 紫色   | 会议预定与纪要       |
| 12   | 智能搜索 | `/smart-search`           | Search      | 靛蓝   | 全局智能检索         |
| 13   | 创意协作 | `/creative-collaboration` | Palette     | 粉色   | AI驱动的创意协作平台 |

---

### 6️⃣ AI智能 (AI Intelligence)

**设计理念**: 以AI赋能为核心，提升企业智能化水平

**功能定位**: 提供智能决策、数据分析、预测、自然语言、图像识别等AI功能，支持企业数字化转型

**用户体验考量**:

- AI功能直观易用，降低学习成本
- 智能推荐精准，提升工作效率
- 自然语言交互，提升用户体验
- AI能力开放，支持生态扩展

**二级导航列表**:

| 序号 | 页面名称   | 路由路径                      | 图标          | 主题色  | 功能描述  
| 1    | 智能决策   | `/smart-decision`           | Brain         | 紫色   | 辅助决策建议
| 2    | 数据分析   | `/ai-analytics`             | BarChart3     | 蓝色   | 多维数据分析报表
| 3    | 智能预测   | `/ai-prediction`            | TrendingUp    | 绿色   | 业务趋势预测
| 4    | 自然语言   | `/natural-language`         | MessageSquare | 橙色   | NLP 文本处理
| 5    | 图像识别   | `/image-recognition`        | Image         | 靛蓝   | 票据与实物识别
| 6    | 智能推荐   | `/smart-recommendation`     | Star          | 黄色   | 业务机会推荐
| 7    | 流程自动化 | `/process-automation`       | Zap           | 紫红   | RPA 自动化执行
| 8    | 智能客服   | `/smart-customer-service`   | Headphones    | 粉色   | AI 客服应答
| 9    | 数据挖掘   | `/data-mining`              | Pickaxe       | 棕色   | 深层数据价值挖掘
| 10   | AI助手     | `/ai-assistant`             | Bot           | 紫色   | 智能问答、任务辅助、决策支持
| 11   | 高级BI     | `/advanced-bi`              | PieChart      | 青色   | 商业智能分析、数据可视化
| 12   | 租户管理   | `/tenant-mgmt`              | Building2      | 灰色   | 多租户管理、租户隔离
| 13   | 移动应用   | `/mobile-app`               | Smartphone     | 蓝色   | 移动端管理、APP配置
| 14   | 性能优化   | `/performance-optimization` | Zap            | 黄色   | 系统性能优化、资源优化
| 15   | 用户培训   | `/user-training`            | BookOpen       | 绿色   | 培训课程、学习资源
| 16   | 系统测试   | `/system-testing`           | TestTube       | 紫色   | 功能测试、性能测试
| 17   | AI内容创作 | `/ai-content-creator`       | PenTool        | 粉色   | AI写作、AI设计、内容生成

---

### 7️⃣ 系统设置 (System Settings)

**设计理念**: 以系统管理为核心，保障系统稳定运行

**功能定位**: 提供系统配置、用户管理、日志、监控、备份等系统功能，支持系统运维

**用户体验考量**:

- 系统配置灵活，满足个性化需求
- 用户管理便捷，权限控制严格
- 日志完整，可追溯
- 监控及时，快速响应

**二级导航列表**:

| 序号 | 页面名称   | 路由路径              | 图标          | 主题色 | 功能描述                   |
| ---- | ---------- | --------------------- | ------------- | ------ | -------------------------- |
| 1    | 系统设置   | `/system-settings`    | Settings      | 灰色   | 系统参数与个性化设置       |
| 2    | 用户管理   | `/user-mgmt`          | UserCog       | 蓝色   | 用户账户管理、角色分配     |
| 3    | 角色权限   | `/role-permission`    | Shield        | 红色   | 权限配置、角色管理         |
| 4    | 日志管理   | `/log-mgmt`           | FileText      | 绿色   | 操作日志、系统日志         |
| 5    | 系统监控   | `/system-monitor`     | Monitor       | 紫色   | 性能监控、资源监控         |
| 6    | 备份恢复   | `/backup-recovery`    | Archive       | 橙色   | 数据备份、数据恢复         |
| 7    | 帮助中心   | `/help-center`        | HelpCircle    | 青色   | 使用文档、常见问题         |
| 8    | 参数设置   | `/parameter-settings` | Sliders       | 灰色   | 业务参数配置、规则设置     |
| 9    | 平台设置   | `/platform-settings`  | Settings2     | 灰色   | 平台配置、接口管理         |
| 10   | 微信配置   | `/wechat-config`      | MessageSquare | 绿色   | 微信公众号配置、小程序配置 |
| 11   | 渠道中心   | `/channel-center`     | Megaphone     | 橙色   | 渠道管理、渠道分析         |
| 12   | 数据集成   | `/data-integration`   | Database      | 蓝色   | 数据源管理、数据同步       |
| 13   | API集成    | `/api-integration`    | Code2         | 紫色   | API密钥管理、集成配置      |
| 14   | 插件市场   | `/plugin-market`      | Puzzle        | 粉色   | 插件浏览、插件安装         |
| 15   | 开发者中心 | `/developer-center`   | Code          | 靛蓝   | API文档、SDK下载           |
| 16   | 应用市场   | `/app-market`         | Package       | 绿色   | 应用浏览、应用安装         |

---

## 🌳 完整文件树结构

```
yyc3-mana/
├── app/                                    # Next.js App Router
│   ├── (auth)/                             # 认证相关页面组
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/                        # 主应用页面组
│   │   ├── layout.tsx                      # 主布局（导航栏、侧边栏）
│   │   ├── page.tsx                        # 首页（重定向到数据中心）
│   │   │
│   │   ├── data-center/                    # 1. 数据中心
│   │   │   ├── ai-data-screen/
│   │   │   │   └── page.tsx                # AI数据屏
│   │   │   ├── data-overview/
│   │   │   │   └── page.tsx                # 数据总览
│   │   │   ├── data-analytics/
│   │   │   │   └── page.tsx                # 数据分析
│   │   │   ├── smart-prediction/
│   │   │   │   └── page.tsx                # 智能预测
│   │   │   ├── smart-alert/
│   │   │   │   └── page.tsx                # 智能预警
│   │   │   ├── data-reports/
│   │   │   │   └── page.tsx                # 数据报表
│   │   │   └── data-governance/
│   │   │       └── page.tsx                # 数据治理
│   │   │
│   │   ├── core-business/                 # 2. 核心业务
│   │   │   ├── market-info/
│   │   │   │   └── page.tsx                # 市场信息
│   │   │   ├── customer-mgmt/
│   │   │   │   ├── page.tsx                # 客户管理
│   │   │   │   ├── components/
│   │   │   │   │   ├── customer-list.tsx
│   │   │   │   │   ├── customer-detail.tsx
│   │   │   │   │   └── customer-form.tsx
│   │   │   │   └── tabs/
│   │   │   │       ├── customers-tab.tsx
│   │   │   │       ├── leads-tab.tsx
│   │   │   │       └── analysis-tab.tsx
│   │   │   ├── smart-sales/
│   │   │   │   └── page.tsx                # 智能销售
│   │   │   ├── lead-mgmt/
│   │   │   │   └── page.tsx                # 线索管理
│   │   │   ├── contract-mgmt/
│   │   │   │   └── page.tsx                # 合同管理
│   │   │   ├── order-mgmt/
│   │   │   │   └── page.tsx                # 订单管理
│   │   │   ├── smart-procurement/
│   │   │   │   └── page.tsx                # 智能采购
│   │   │   ├── supplier-portal/
│   │   │   │   └── page.tsx                # 供应商门户
│   │   │   ├── smart-logistics/
│   │   │   │   └── page.tsx                # 智能物流
│   │   │   ├── inventory-mgmt/
│   │   │   │   └── page.tsx                # 库存管理
│   │   │   ├── smart-production/
│   │   │   │   └── page.tsx                # 智能生产
│   │   │   ├── project-mgmt/
│   │   │   │   └── page.tsx                # 项目管理
│   │   │   ├── work-orders/
│   │   │   │   └── page.tsx                # 工单管理
│   │   │   ├── smart-acquisition/
│   │   │   │   └── page.tsx                # 智能获客
│   │   │   ├── smart-risk/
│   │   │   │   └── page.tsx                # 智能风控
│   │   │   ├── smart-fulfillment/
│   │   │   │   └── page.tsx                # 智能履约
│   │   │   └── store-mgmt/
│   │   │       └── page.tsx                # 门店管理
│   │   │
│   │   ├── human-resources/               # 3. 人力资源
│   │   │   ├── employee-mgmt/
│   │   │   │   └── page.tsx                # 员工管理
│   │   │   ├── smart-recruitment/
│   │   │   │   └── page.tsx                # 智能招聘
│   │   │   ├── smart-training/
│   │   │   │   └── page.tsx                # 智能培训
│   │   │   ├── payroll-mgmt/
│   │   │   │   └── page.tsx                # 薪酬管理
│   │   │   ├── performance-mgmt/
│   │   │   │   └── page.tsx                # 绩效管理
│   │   │   ├── attendance-mgmt/
│   │   │   │   └── page.tsx                # 考勤管理
│   │   │   ├── business-mgmt/
│   │   │   │   └── page.tsx                # 商务管理
│   │   │   ├── talent-profile/
│   │   │   │   └── page.tsx                # 人才画像
│   │   │   ├── smart-scheduling/
│   │   │   │   └── page.tsx                # 智能排班
│   │   │   └── org-structure/
│   │   │       └── page.tsx                # 组织架构
│   │   │
│   │   ├── finance-assets/                # 4. 财务资产
│   │   │   ├── smart-accounting/
│   │   │   │   └── page.tsx                # 智能记账
│   │   │   ├── invoice-mgmt/
│   │   │   │   └── page.tsx                # 发票管理
│   │   │   ├── payment-mgmt/
│   │   │   │   └── page.tsx                # 支付管理
│   │   │   ├── loan-mgmt/
│   │   │   │   └── page.tsx                # 贷款管理
│   │   │   ├── smart-tax/
│   │   │   │   └── page.tsx                # 智能税务
│   │   │   ├── smart-budget/
│   │   │   │   └── page.tsx                # 智能预算
│   │   │   ├── smart-reimbursement/
│   │   │   │   └── page.tsx                # 智能报销
│   │   │   ├── asset-mgmt/
│   │   │   │   └── page.tsx                # 资产管理
│   │   │   ├── equipment-mgmt/
│   │   │   │   └── page.tsx                # 设备管理
│   │   │   ├── smart-audit/
│   │   │   │   └── page.tsx                # 智能审计
│   │   │   ├── asset-inventory/
│   │   │   │   └── page.tsx                # 资产盘点
│   │   │   └── smart-reconciliation/
│   │   │       └── page.tsx                # 智能对账
│   │   │
│   │   ├── office-collaboration/          # 5. 办公协同
│   │   │   ├── office-mgmt/
│   │   │   │   └── page.tsx                # 办公管理
│   │   │   ├── smart-approval/
│   │   │   │   └── page.tsx                # 智能审批
│   │   │   ├── document-mgmt/
│   │   │   │   └── page.tsx                # 文档管理
│   │   │   ├── workflow-mgmt/
│   │   │   │   └── page.tsx                # 流程管理
│   │   │   ├── permission-mgmt/
│   │   │   │   └── page.tsx                # 权限管理
│   │   │   ├── data-mgmt/
│   │   │   │   └── page.tsx                # 数据管理
│   │   │   ├── tool-mgmt/
│   │   │   │   └── page.tsx                # 工具管理
│   │   │   ├── enterprise-mgmt/
│   │   │   │   └── page.tsx                # 企业管理
│   │   │   ├── smart-docs/
│   │   │   │   └── page.tsx                # 智能文档
│   │   │   ├── smart-collaboration/
│   │   │   │   └── page.tsx                # 智能协同
│   │   │   ├── smart-meetings/
│   │   │   │   └── page.tsx                # 智能会议
│   │   │   ├── smart-search/
│   │   │   │   └── page.tsx                # 智能搜索
│   │   │   └── creative-collaboration/
│   │   │       ├── page.tsx                # 创意协作
│   │   │       └── components/
│   │   │           ├── creative-projects-tab.tsx
│   │   │           ├── idea-library-tab.tsx
│   │   │           ├── team-collaboration-tab.tsx
│   │   │           ├── ai-tools-tab.tsx
│   │   │           └── data-analytics-tab.tsx
│   │   │
│   │   ├── ai-intelligence/               # 6. AI智能
│   │   │   ├── smart-decision/
│   │   │   │   └── page.tsx                # 智能决策
│   │   │   ├── ai-analytics/
│   │   │   │   └── page.tsx                # 数据分析
│   │   │   ├── ai-prediction/
│   │   │   │   └── page.tsx                # 智能预测
│   │   │   ├── natural-language/
│   │   │   │   └── page.tsx                # 自然语言
│   │   │   ├── image-recognition/
│   │   │   │   └── page.tsx                # 图像识别
│   │   │   ├── smart-recommendation/
│   │   │   │   └── page.tsx                # 智能推荐
│   │   │   ├── process-automation/
│   │   │   │   └── page.tsx                # 流程自动化
│   │   │   ├── smart-customer-service/
│   │   │   │   └── page.tsx                # 智能客服
│   │   │   ├── data-mining/
│   │   │   │   └── page.tsx                # 数据挖掘
│   │   │   ├── ai-assistant/
│   │   │   │   └── page.tsx                # AI助手
│   │   │   ├── advanced-bi/
│   │   │   │   └── page.tsx                # 高级BI
│   │   │   ├── tenant-mgmt/
│   │   │   │   └── page.tsx                # 租户管理
│   │   │   ├── mobile-app/
│   │   │   │   └── page.tsx                # 移动应用
│   │   │   ├── performance-optimization/
│   │   │   │   └── page.tsx                # 性能优化
│   │   │   ├── user-training/
│   │   │   │   └── page.tsx                # 用户培训
│   │   │   ├── system-testing/
│   │   │   │   └── page.tsx                # 系统测试
│   │   │   └── ai-content-creator/
│   │   │       └── page.tsx                # AI内容创作
│   │   │
│   │   └── system-settings/               # 7. 系统设置
│   │       ├── system-settings/
│   │       │   └── page.tsx                # 系统设置
│   │       ├── user-mgmt/
│   │       │   └── page.tsx                # 用户管理
│   │       ├── role-permission/
│   │       │   └── page.tsx                # 角色权限
│   │       ├── log-mgmt/
│   │       │   └── page.tsx                # 日志管理
│   │       ├── system-monitor/
│   │       │   └── page.tsx                # 系统监控
│   │       ├── backup-recovery/
│   │       │   └── page.tsx                # 备份恢复
│   │       ├── help-center/
│   │       │   └── page.tsx                # 帮助中心
│   │       ├── parameter-settings/
│   │       │   └── page.tsx                # 参数设置
│   │       ├── platform-settings/
│   │       │   └── page.tsx                # 平台设置
│   │       ├── wechat-config/
│   │       │   └── page.tsx                # 微信配置
│   │       ├── channel-center/
│   │       │   └── page.tsx                # 渠道中心
│   │       ├── data-integration/
│   │       │   └── page.tsx                # 数据集成
│   │       ├── api-integration/
│   │       │   └── page.tsx                # API集成
│   │       ├── plugin-market/
│   │       │   └── page.tsx                # 插件市场
│   │       ├── developer-center/
│   │       │   └── page.tsx                # 开发者中心
│   │       └── app-market/
│   │           └── page.tsx                # 应用市场
│   │
│   ├── api/                                # API路由
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── data-center/
│   │   ├── core-business/
│   │   ├── human-resources/
│   │   ├── finance-assets/
│   │   ├── office-collaboration/
│   │   ├── ai-intelligence/
│   │   └── system-settings/
│   │
│   └── layout.tsx                          # 根布局
│
├── components/                             # 共享组件
│   ├── layout/                             # 布局组件
│   │   ├── header.tsx                      # 顶部导航栏（一级导航）
│   │   ├── sidebar.tsx                     # 侧边栏（二级导航）
│   │   ├── breadcrumb.tsx                  # 面包屑导航
│   │   └── tab-navigation.tsx             # Tab导航（三级导航）
│   │
│   ├── ui/                                 # shadcn/ui组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   │
│   ├── data-center/                        # 数据中心组件
│   ├── core-business/                      # 核心业务组件
│   ├── human-resources/                    # 人力资源组件
│   ├── finance-assets/                     # 财务资产组件
│   ├── office-collaboration/               # 办公协同组件
│   ├── ai-intelligence/                    # AI智能组件
│   └── system-settings/                    # 系统设置组件
│
├── lib/                                    # 工具库
│   ├── db.ts                               # 数据库连接
│   ├── auth.ts                             # 认证工具
│   ├── utils.ts                            # 通用工具
│   ├── constants.ts                        # 常量定义
│   └── navigation-config.ts                # 导航配置
│
├── hooks/                                  # 自定义Hooks
│   ├── use-navigation.ts                   # 导航Hook
│   ├── use-auth.ts                         # 认证Hook
│   └── use-permission.ts                   # 权限Hook
│
├── store/                                  # 状态管理（Zustand）
│   ├── navigation-store.ts                 # 导航状态
│   ├── auth-store.ts                       # 认证状态
│   └── user-store.ts                       # 用户状态
│
├── services/                               # 业务服务
│   ├── data-center/
│   ├── core-business/
│   ├── human-resources/
│   ├── finance-assets/
│   ├── office-collaboration/
│   ├── ai-intelligence/
│   └── system-settings/
│
├── types/                                 # TypeScript类型定义
│   ├── navigation.ts                      # 导航类型
│   ├── user.ts                            # 用户类型
│   └── api.ts                             # API类型
│
├── styles/                                # 样式文件
│   └── globals.css                        # 全局样式
│
├── public/                                # 静态资源
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── docs/                                  # 文档
│   ├── 导航架构完整文档.md
│   ├── YYC3-项目全量规划指导文件.md
│   └── YYC3-导航架构整合完整版.md
│
├── tests/                                 # 测试文件
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.local                            # 环境变量
├── .eslintrc.json                        # ESLint配置
├── .prettierrc.json                      # Prettier配置
├── next.config.js                        # Next.js配置
├── tailwind.config.js                    # Tailwind CSS配置
├── tsconfig.json                         # TypeScript配置
├── package.json                          # 项目依赖
├── README.md                             # 项目说明
└── .gitignore                            # Git忽略文件
```

---

## 📊 导航架构统计

### 一级导航统计

| 分类名称 | 二级页面数 | 功能覆盖                                               |
| -------- | ---------- | ------------------------------------------------------ |
| 数据中心 | 7          | 数据可视化、分析、预测、预警、报表、治理               |
| 核心业务 | 17         | 市场、客户、销售、订单、采购、物流、生产、项目、门店等 |
| 人力资源 | 10         | 员工、招聘、培训、薪酬、绩效、考勤、排班、组织等       |
| 财务资产 | 12         | 记账、发票、支付、税务、预算、报销、资产、审计等       |
| 办公协同 | 13         | 办公、审批、文档、流程、权限、协同、会议、搜索等       |
| AI智能   | 17         | 决策、分析、预测、NLP、图像、推荐、自动化、客服等      |
| 系统设置 | 16         | 设置、用户、权限、日志、监控、备份、集成、市场等       |
| **总计** | **92**     | **覆盖企业完整业务流程**                               |

### 功能特性统计

| 特性分类     | 功能数量 | 说明                           |
| ------------ | -------- | ------------------------------ |
| AI智能功能   | 17+      | 深度集成AI能力，提升智能化水平 |
| 核心业务功能 | 17       | 覆盖企业核心业务全链路         |
| 协作功能     | 13       | 支持团队高效协作               |
| 系统管理功能 | 16       | 保障系统稳定运行               |
| 数据分析功能 | 10+      | 支持数据驱动决策               |
| 移动端支持   | 10+      | 支持移动办公场景               |

---

## 🎨 设计规范

### 色彩系统

```typescript
// 主题色定义
const themeColors = {
  // 一级导航分类色
  dataCenter: 'blue',           // 数据中心 - 蓝色
  coreBusiness: 'green',         // 核心业务 - 绿色
  humanResources: 'purple',      // 人力资源 - 紫色
  financeAssets: 'orange',       // 财务资产 - 橙色
  officeCollaboration: 'cyan',    // 办公协同 - 青色
  aiIntelligence: 'pink',        // AI智能 - 粉色
  systemSettings: 'gray',        // 系统设置 - 灰色

  // 状态色
  success: 'green',
  warning: 'yellow',
  error: 'red',
  info: 'blue',
};
```

### 图标系统

使用 Lucide React 图标库，保持风格统一：

```typescript
import {
  // 数据中心
  BarChart3, PieChart, TrendingUp, AlertTriangle, FileText, Database,

  // 核心业务
  TrendingUp, Users, ShoppingCart, Target, FileText, ShoppingBag,
  Package, Building2, Truck, Box, Factory, FolderOpen,
  ClipboardCheck, UserPlus, ShieldAlert, CheckCircle, Store,

  // 人力资源
  User, UserPlus, BookOpen, DollarSign, Target, Clock,
  Plane, UserCircle, Calendar, GitBranch,

  // 财务资产
  Calculator, CreditCard, Landmark, Receipt, PieChart,
  Wallet, Building, Cpu, Search, RefreshCw,

  // 办公协同
  Building2, CheckSquare, FileText, GitBranch, Shield,
  Database, Wrench, Briefcase, FileEdit, Users, Video, Search, Palette,

  // AI智能
  Brain, BarChart3, TrendingUp, MessageSquare, Image,
  Star, Zap, Headphones, Pickaxe, Bot, PenTool,

  // 系统设置
  Settings, UserCog, Shield, FileText, Monitor, Archive,
  HelpCircle, Sliders, Megaphone, Code2, Puzzle, Package,
} from 'lucide-react';
```

---

## 🔧 技术实现要点

### 导航配置

```typescript
// lib/navigation-config.ts
export const navigationConfig = {
  // 一级导航
  primary: [
    {
      id: 'data-center',
      title: '数据中心',
      icon: BarChart3,
      color: 'blue',
      // 二级导航
      secondary: [
        { id: 'ai-data-screen', title: 'AI数据屏', path: '/data-center/ai-data-screen' },
        { id: 'data-overview', title: '数据总览', path: '/data-center/data-overview' },
        { id: 'data-analytics', title: '数据分析', path: '/data-center/data-analytics' },
        // ...
      ],
    },
    {
      id: 'core-business',
      title: '核心业务',
      icon: Briefcase,
      color: 'green',
      secondary: [
        { id: 'market-info', title: '市场信息', path: '/core-business/market-info' },
        { id: 'customer-mgmt', title: '客户管理', path: '/core-business/customer-mgmt' },
        // ...
      ],
    },
    // ... 其他一级导航
  ],
};
```

### 路由结构

```typescript
// 使用Next.js 14+ App Router
app/
├── (dashboard)/
│   ├── data-center/
│   │   ├── ai-data-screen/
│   │   │   └── page.tsx
│   │   ├── data-overview/
│   │   │   └── page.tsx
│   │   └── ...
│   ├── core-business/
│   │   ├── market-info/
│   │   │   └── page.tsx
│   │   ├── customer-mgmt/
│   │   │   └── page.tsx
│   │   └── ...
│   └── ...
```

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
