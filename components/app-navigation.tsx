"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserProfile } from "@/components/user-profile"
import { cn } from "@/lib/utils"
import { navCategories, findCategoryByHref, type NavCategory } from "@/lib/navigation-config"
import {
  ChevronRight,
  Menu,
  Search,
  X,
  Home,
} from "lucide-react"

/**
 * AppNavigation — 全局应用导航组件
 *
 * 基于「导航架构体系.md」四级导航 + 「复式导航系统.md」三层结构
 * - 第一层：侧边栏 7 大分类（可折叠）
 * - 第二层：分类下的页面路由
 * - 第三层/第四层：由各页面内 Tab 和操作按钮实现
 *
 * 特性：
 * - 桌面端：固定 260px 侧边栏
 * - 移动端：抽屉式，遮罩 + 滑入动画
 * - 路由感知：自动展开当前页面所属分类
 * - 搜索过滤：全量页面快速检索
 */
export function AppNavigation() {
  const pathname = usePathname()
  const [isMobileView, setIsMobileView] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // 检测屏幕尺寸
  useEffect(() => {
    const checkSize = () => setIsMobileView(window.innerWidth < 1024)
    checkSize()
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  // 路由变化时自动展开当前分类 + 关闭移动菜单
  useEffect(() => {
    const activeCategory = findCategoryByHref(pathname)
    if (activeCategory && !openCategories.includes(activeCategory.id)) {
      setOpenCategories((prev) => [...prev, activeCategory.id])
    }
    setIsMobileOpen(false)
  }, [pathname])

  const toggleCategory = useCallback((id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }, [])

  const closeMobile = useCallback(() => setIsMobileOpen(false), [])

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/"
      return pathname === href || pathname.startsWith(href + "/")
    },
    [pathname]
  )

  // 搜索过滤
  const filteredCategories = searchQuery
    ? navCategories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : navCategories

  // ============ 侧边栏内容 ============
  const sidebarContent = (
    <div className="flex flex-col h-full bg-white">
      {/* 品牌 Logo */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/yyc3-dist/yanyu_cloud_64x64.png" alt="YYC³ Logo" className="w-8 h-8 rounded-lg object-contain shrink-0" />
          {!searchQuery && (
            <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
              YYC³
            </span>
          )}
        </Link>
        {isMobileView && (
          <Button variant="ghost" size="icon" onClick={closeMobile} className="shrink-0">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* 搜索框 */}
      <div className="p-3 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          <Input
            placeholder="搜索功能模块..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white h-9"
          />
        </div>
      </div>

      {/* 导航列表 */}
      <nav className="flex-1 overflow-y-auto px-2 pb-2">
        {/* 首页快捷入口 */}
        {!searchQuery && (
          <Link
            href="/"
            onClick={isMobileView ? closeMobile : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mb-1",
              isActive("/")
                ? "bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md transition-all",
                isActive("/")
                  ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              <Home className="w-5 h-5" />
            </div>
            <span>首页</span>
          </Link>
        )}

        {/* 7 大分类 */}
        {filteredCategories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            isOpen={openCategories.includes(category.id)}
            onToggle={() => toggleCategory(category.id)}
            isActive={isActive}
            onItemClick={isMobileView ? closeMobile : undefined}
          />
        ))}

        {/* 空搜索结果 */}
        {searchQuery && filteredCategories.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            未找到「{searchQuery}」相关功能
          </div>
        )}
      </nav>

      {/* 底部用户区 */}
      <div className="p-3 border-t border-gray-100 shrink-0">
        <UserProfile />
      </div>
    </div>
  )

  // ============ 渲染 ============
  return (
    <>
      {/* 桌面端：固定侧边栏 */}
      {!isMobileView && (
        <aside className="fixed top-0 left-0 h-full w-[260px] shadow-lg z-30">
          {sidebarContent}
        </aside>
      )}

      {/* 移动端：抽屉 */}
      {isMobileView && (
        <>
          {/* 触发按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-40 bg-white shadow-md rounded-full"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* 遮罩 */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={closeMobile}
              />
            )}
          </AnimatePresence>

          {/* 抽屉面板 */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                className="fixed top-0 left-0 h-full w-[280px] z-50 shadow-2xl"
              >
                {sidebarContent}
              </motion.aside>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  )
}

// ==================== 分类区块子组件 ====================

interface CategorySectionProps {
  category: NavCategory
  isOpen: boolean
  onToggle: () => void
  isActive: (href: string) => boolean
  onItemClick?: () => void
}

function CategorySection({
  category,
  isOpen,
  onToggle,
  isActive,
  onItemClick,
}: CategorySectionProps) {
  // 检查分类下是否有激活项
  const hasActiveChild = category.items.some((item) => isActive(item.href))

  return (
    <div className="mb-1">
      {/* 分类标题按钮 */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
          hasActiveChild
            ? "text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md transition-all shrink-0",
            hasActiveChild
              ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
          )}
        >
          {category.icon}
        </div>
        <span className="flex-1 text-left truncate">{category.label}</span>
        <ChevronRight
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0",
            isOpen && "rotate-90"
          )}
        />
      </button>

      {/* 子项列表（动画展开） */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-11 pr-1 py-0.5 space-y-0.5">
              {category.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onItemClick}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-150",
                      active
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "flex h-5 min-w-[20px] items-center justify-center rounded-full text-[10px] font-medium px-1.5",
                          typeof item.badge === "number"
                            ? "bg-red-500 text-white"
                            : "bg-linear-to-r from-blue-500 to-indigo-600 text-white"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    )}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * 用于页面内容的包裹容器
 * 自动添加左侧 padding 以避让固定侧边栏
 */
export function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:pl-[260px] min-h-screen">
      {children}
    </div>
  )
}
