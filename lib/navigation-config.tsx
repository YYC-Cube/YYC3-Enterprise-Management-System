/**
 * @fileoverview YYC³ Enterprise Management System 四级导航配置
 * @description 基于「导航架构体系.md」7大分类 + 「复式导航系统.md」三层结构
 *
 * 层级：
 *   一级：7 大业务分类（数据中心/核心业务/人力资源/财务资产/办公协同/AI智能/系统设置）
 *   二级：具体页面路由
 *   三级：页面内 Tab（由各页面自行实现）
 *   四级：功能操作（由各页面自行实现）
 */

import type { LucideIcon } from "lucide-react"
import {
  Archive,
  Award,
  BarChart3,
  Bell,
  Bot,
  Box,
  Brain,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  CheckSquare, Users as Collaborators,
  Cpu,
  Database,
  DollarSign,
  FileEdit,
  FileText,
  FolderOpen,
  GitBranch,
  HelpCircle,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Monitor,
  Package,
  Palette,
  PenTool,
  PieChart,
  Settings, Shield,
  ShieldAlert,
  ShoppingCart,
  Sliders,
  Sparkles,
  TrendingUp,
  User,
  UserPlus,
  Users,
  Zap
} from "lucide-react"

// ==================== 类型定义 ====================

export interface NavLeafItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  badge?: string | number
}

export interface NavCategory {
  id: string
  label: string
  icon: React.ReactNode
  description: string
  items: NavLeafItem[]
}

// ==================== 图标快捷引用 ====================

const I = (icon: LucideIcon, className = "w-5 h-5") => {
  const C = icon as any
  return <C className={className} />
}

// ==================== 7 大一级分类 ====================

export const navCategories: NavCategory[] = [
  // 1. 数据中心
  {
    id: "data-center",
    label: "数据中心",
    icon: I(Database),
    description: "数据驱动决策、实时监控、趋势分析",
    items: [
      { id: "dashboard", label: "仪表盘", href: "/dashboard", icon: I(LayoutDashboard) },
      { id: "analytics", label: "数据分析", href: "/analytics", icon: I(PieChart) },
      { id: "advanced-bi", label: "高级BI", href: "/advanced-bi", icon: I(BarChart3) },
      { id: "performance", label: "性能看板", href: "/performance", icon: I(TrendingUp) },
      { id: "performance-optimization", label: "性能优化", href: "/performance-optimization", icon: I(Zap) },
    ],
  },

  // 2. 核心业务
  {
    id: "core-business",
    label: "核心业务",
    icon: I(ShoppingCart),
    description: "客户、销售、库存、项目全链路",
    items: [
      { id: "customers", label: "客户管理", href: "/customers", icon: I(Users) },
      { id: "customer-followup", label: "客户回访", href: "/customer-followup", icon: I(UserPlus) },
      { id: "channel-center", label: "渠道中心", href: "/channel-center", icon: I(Megaphone) },
      { id: "cashier", label: "收银系统", href: "/cashier", icon: I(ShoppingCart) },
      { id: "inventory", label: "库存管理", href: "/inventory", icon: I(Box) },
      { id: "finance", label: "财务管理", href: "/finance", icon: I(DollarSign) },
      { id: "projects", label: "项目管理", href: "/projects", icon: I(FolderOpen) },
      { id: "tasks", label: "任务协作", href: "/tasks", icon: I(CheckCircle) },
      { id: "schedule", label: "日程安排", href: "/schedule", icon: I(Calendar) },
      { id: "communication", label: "沟通中心", href: "/communication", icon: I(MessageSquare) },
      { id: "collaboration", label: "协同工作", href: "/collaboration", icon: I(Collaborators) },
      { id: "progress", label: "进度跟踪", href: "/progress", icon: I(TrendingUp) },
      { id: "business-club", label: "商务管理", href: "/business-club", icon: I(Briefcase) },
    ],
  },

  // 3. 人力资源
  {
    id: "human-resources",
    label: "人力资源",
    icon: I(Users),
    description: "员工、组织、绩效、考勤",
    items: [
      { id: "organization", label: "组织架构", href: "/organization", icon: I(GitBranch) },
      { id: "personnel", label: "人员管理", href: "/personnel", icon: I(User) },
      { id: "position-settings", label: "岗位设置", href: "/position-settings", icon: I(Briefcase) },
      { id: "honors", label: "荣誉展示", href: "/honors", icon: I(Award), badge: "新" },
    ],
  },

  // 4. 办公协同
  {
    id: "office-collaboration",
    label: "办公协同",
    icon: I(FileText),
    description: "文档、审批、流程、知识库",
    items: [
      { id: "documents", label: "文档管理", href: "/documents", icon: I(FileText) },
      { id: "approval", label: "审批中心", href: "/approval", icon: I(CheckSquare) },
      { id: "workflow", label: "流程管理", href: "/workflow", icon: I(GitBranch) },
      { id: "notifications", label: "消息通知", href: "/notifications", icon: I(Bell), badge: 3 },
      { id: "message-center", label: "消息中心", href: "/message-center", icon: I(MessageSquare) },
      { id: "design-tools", label: "设计工具", href: "/design-tools", icon: I(Palette) },
      { id: "creative-collaboration", label: "创意协作", href: "/creative-collaboration", icon: I(Palette) },
    ],
  },

  // 5. AI 智能
  {
    id: "ai-intelligence",
    label: "AI 智能",
    icon: I(Bot),
    description: "AI 助手、内容创作、智能分析",
    items: [
      { id: "ai-assistant", label: "AI 助手", href: "/ai-assistant", icon: I(Bot) },
      { id: "ai-content-creator", label: "AI 内容创作", href: "/ai-content-creator", icon: I(PenTool) },
      { id: "ai-customer-data", label: "AI 客户洞察", href: "/ai-customer-data", icon: I(Brain) },
      { id: "ai-smart-forms", label: "AI 智能表单", href: "/ai-smart-forms", icon: I(FileEdit) },
      { id: "ai-maintenance", label: "AI 智能维护", href: "/ai-maintenance", icon: I(Zap) },
      { id: "enhanced-ai-demo", label: "AI 增强演示", href: "/enhanced-ai-demo", icon: I(Sparkles) },
      { id: "chat", label: "AI 对话", href: "/chat", icon: I(MessageSquare) },
    ],
  },

  // 6. 系统设置
  {
    id: "system-settings",
    label: "系统设置",
    icon: I(Settings),
    description: "用户、权限、监控、日志、安全",
    items: [
      { id: "user-management", label: "用户管理", href: "/user-management", icon: I(User) },
      { id: "permission-management", label: "权限管理", href: "/permission-management", icon: I(Shield) },
      { id: "system-settings", label: "系统配置", href: "/system-settings", icon: I(Settings) },
      { id: "platform-settings", label: "平台设置", href: "/platform-settings", icon: I(Sliders) },
      { id: "tenant-management", label: "租户管理", href: "/tenant-management", icon: I(Building) },
      { id: "system-monitor", label: "系统监控", href: "/system-monitor", icon: I(Monitor) },
      { id: "log-management", label: "日志管理", href: "/log-management", icon: I(FileText) },
      { id: "security-center", label: "安全中心", href: "/security-center", icon: I(ShieldAlert) },
      { id: "backup-recovery", label: "备份恢复", href: "/backup-recovery", icon: I(Archive) },
      { id: "system-testing", label: "系统测试", href: "/system-testing", icon: I(Cpu) },
      { id: "data-integration", label: "数据集成", href: "/data-integration", icon: I(Database) },
      { id: "modules", label: "模块管理", href: "/modules", icon: I(Package) },
      { id: "settings", label: "个人设置", href: "/settings", icon: I(Sliders) },
      { id: "help-center", label: "帮助中心", href: "/help-center", icon: I(HelpCircle) },
    ],
  },
]

// ==================== 扁平化快捷查询 ====================

export const allNavItems: NavLeafItem[] = navCategories.flatMap((cat) => cat.items)

export function findNavItemByHref(href: string): NavLeafItem | undefined {
  return allNavItems.find((item) => item.href === href)
}

export function findCategoryByHref(href: string): NavCategory | undefined {
  return navCategories.find((cat) => cat.items.some((item) => item.href === href))
}
