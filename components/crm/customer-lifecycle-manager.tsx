"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Users, UserPlus, Activity, TrendingUp, Bell, MessageSquare, Calendar, Target } from "lucide-react"
import CustomerLeadsPanel from "./customer-leads-panel"
import CustomerProspectsPanel from "./customer-prospects-panel"
import CustomerMaintenancePanel from "./customer-maintenance-panel"
import CustomerFollowupPanel from "./customer-followup-panel"
import CustomerUpgradePanel from "./customer-upgrade-panel"
import CustomerReactivationPanel from "./customer-reactivation-panel"
import CustomerRevisitPanel from "./customer-revisit-panel"
import CustomerInvitationPanel from "./customer-invitation-panel"

export default function CustomerLifecycleManager() {
  const [activeStage, setActiveStage] = useState("leads")

  const stages = [
    {
      id: "leads",
      name: "客资",
      icon: Users,
      description: "潜在客户资源",
      count: 156,
      color: "text-blue-500",
    },
    {
      id: "prospects",
      name: "准客户",
      icon: UserPlus,
      description: "意向客户",
      count: 89,
      color: "text-purple-500",
    },
    {
      id: "maintenance",
      name: "运维",
      icon: Activity,
      description: "客户维护",
      count: 234,
      color: "text-green-500",
    },
    {
      id: "followup",
      name: "跟踪",
      icon: Target,
      description: "跟进记录",
      count: 67,
      color: "text-orange-500",
    },
    {
      id: "upgrade",
      name: "提档",
      icon: TrendingUp,
      description: "客户升级",
      count: 45,
      color: "text-cyan-500",
    },
    {
      id: "reactivation",
      name: "唤醒",
      icon: Bell,
      description: "沉睡客户激活",
      count: 32,
      color: "text-yellow-500",
    },
    {
      id: "revisit",
      name: "回访",
      icon: MessageSquare,
      description: "售后回访",
      count: 78,
      color: "text-pink-500",
    },
    {
      id: "invitation",
      name: "邀约",
      icon: Calendar,
      description: "活动邀请",
      count: 23,
      color: "text-indigo-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* 阶段概览 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {stages.map((stage) => {
          const Icon = stage.icon
          return (
            <Card
              key={stage.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                activeStage === stage.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveStage(stage.id)}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <Icon className={`h-6 w-6 ${stage.color}`} />
                <div>
                  <div className="font-semibold text-sm">{stage.name}</div>
                  <div className="text-2xl font-bold">{stage.count}</div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* 详细面板 */}
      <Tabs value={activeStage} onValueChange={setActiveStage}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {stages.map((stage) => (
            <TabsTrigger key={stage.id} value={stage.id} className="text-xs">
              {stage.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="leads" className="mt-6">
          <CustomerLeadsPanel />
        </TabsContent>

        <TabsContent value="prospects" className="mt-6">
          <CustomerProspectsPanel />
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <CustomerMaintenancePanel />
        </TabsContent>

        <TabsContent value="followup" className="mt-6">
          <CustomerFollowupPanel />
        </TabsContent>

        <TabsContent value="upgrade" className="mt-6">
          <CustomerUpgradePanel />
        </TabsContent>

        <TabsContent value="reactivation" className="mt-6">
          <CustomerReactivationPanel />
        </TabsContent>

        <TabsContent value="revisit" className="mt-6">
          <CustomerRevisitPanel />
        </TabsContent>

        <TabsContent value="invitation" className="mt-6">
          <CustomerInvitationPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
