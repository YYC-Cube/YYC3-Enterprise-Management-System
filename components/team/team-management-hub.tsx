"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Users, FileText, TrendingUp, Award, DollarSign, BarChart3 } from "lucide-react"
import OrganizationStructure from "./organization-structure"
import DailyReports from "./daily-reports"
import PerformanceManagement from "./performance-management"
import RewardPenaltySystem from "./reward-penalty-system"
import BonusPoolManagement from "./bonus-pool-management"
import TeamAnalytics from "./team-analytics"

export default function TeamManagementHub() {
  const [activeTab, setActiveTab] = useState("organization")

  const modules = [
    {
      id: "organization",
      name: "组织架构",
      icon: Users,
      description: "部门管理与人员配置",
      count: "5个部门",
    },
    {
      id: "reports",
      name: "日报表",
      icon: FileText,
      description: "工作日报与进度跟踪",
      count: "23份待审",
    },
    {
      id: "performance",
      name: "绩效考核",
      icon: TrendingUp,
      description: "多维度绩效评估",
      count: "本月排名",
    },
    {
      id: "rewards",
      name: "奖惩系统",
      icon: Award,
      description: "智能奖惩执行",
      count: "12条记录",
    },
    {
      id: "bonus",
      name: "奖金池",
      icon: DollarSign,
      description: "团队奖金分配",
      count: "¥50,000",
    },
    {
      id: "analytics",
      name: "团队分析",
      icon: BarChart3,
      description: "数据分析与洞察",
      count: "实时更新",
    },
  ]

  return (
    <div className="space-y-6">
      {/* 模块概览 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <Card
              key={module.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                activeTab === module.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveTab(module.id)}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <Icon className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold text-sm">{module.name}</div>
                  <div className="text-xs text-muted-foreground">{module.count}</div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* 详细面板 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {modules.map((module) => (
            <TabsTrigger key={module.id} value={module.id} className="text-xs">
              {module.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="organization" className="mt-6">
          <OrganizationStructure />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <DailyReports />
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <PerformanceManagement />
        </TabsContent>

        <TabsContent value="rewards" className="mt-6">
          <RewardPenaltySystem />
        </TabsContent>

        <TabsContent value="bonus" className="mt-6">
          <BonusPoolManagement />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <TeamAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
