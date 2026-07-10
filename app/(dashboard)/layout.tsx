import { AIWidgetProvider, AIWidgetTrigger } from "@/components/ai-floating-widget"
import { AppContent, AppNavigation } from "@/components/app-navigation"

/**
 * (dashboard) 路由组布局
 *
 * 所有需要导航栏的业务页面放在此路由组下。
 * 认证页面（login/forgot-password）和门户首页（/）保留在根级别。
 *
 * 布局结构：
 *   <AIWidgetProvider>     ← AI 浮窗上下文（Ctrl/Cmd+K 唤起）
 *     <AppNavigation />    ← 固定侧边栏（260px）
 *     <AppContent>         ← 左侧 padding 避让
 *       {children}
 *       <AIWidgetTrigger />← 右下角浮窗触发按钮
 *     </AppContent>
 *   </AIWidgetProvider>
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AIWidgetProvider>
      <AppNavigation />
      <AppContent>
        {children}
        {/* AI 浮窗触发按钮 */}
        <AIWidgetTrigger
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-linear-to-br from-[#00d4ff] to-[#7b2ff7] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        />
      </AppContent>
    </AIWidgetProvider>
  )
}
