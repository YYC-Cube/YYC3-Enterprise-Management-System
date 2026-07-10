"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, Settings, TrendingUp, Zap, Clock, CheckCircle2 } from "lucide-react"
import { WorkflowDesigner } from "@/components/workflow-designer"
import { WorkflowOptimizer } from "@/components/workflow-optimizer"

interface Workflow {
  id: string
  name: string
  description: string
  status: "active" | "draft" | "paused"
  steps: WorkflowStep[]
  executions: number
  avgDuration: number
  successRate: number
}

interface WorkflowStep {
  id: string
  type: "trigger" | "action" | "condition" | "ai"
  name: string
  config: Record<string, any>
}

export function AIWorkflowAutomation() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: "1",
      name: "客户入职流程",
      description: "自动化新客户注册、验证和欢迎流程",
      status: "active",
      steps: [],
      executions: 1247,
      avgDuration: 45,
      successRate: 98.5,
    },
    {
      id: "2",
      name: "发票处理流程",
      description: "AI 自动识别、分类和处理发票",
      status: "active",
      steps: [],
      executions: 856,
      avgDuration: 12,
      successRate: 99.2,
    },
    {
      id: "3",
      name: "内容审核流程",
      description: "使用 AI 自动审核用户生成内容",
      status: "draft",
      steps: [],
      executions: 0,
      avgDuration: 0,
      successRate: 0,
    },
  ])

  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: Workflow["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "draft":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "paused":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusText = (status: Workflow["status"]) => {
    switch (status) {
      case "active":
        return "运行中"
      case "draft":
        return "草稿"
      case "paused":
        return "已暂停"
    }
  }

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃工作流</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.filter((w) => w.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">共 {workflows.length} 个工作流</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总执行次数</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.reduce((sum, w) => sum + w.executions, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">本月 +12.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均执行时间</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(workflows.reduce((sum, w) => sum + w.avgDuration, 0) / workflows.length)}s
            </div>
            <p className="text-xs text-muted-foreground">比上月快 8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">成功率</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">稳定运行</p>
          </CardContent>
        </Card>
      </div>

      {/* 主内容区 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">工作流概览</TabsTrigger>
          <TabsTrigger value="designer">流程设计器</TabsTrigger>
          <TabsTrigger value="optimizer">AI 优化建议</TabsTrigger>
          <TabsTrigger value="templates">模板库</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">我的工作流</h2>
            <Button onClick={() => setActiveTab("designer")}>
              <Plus className="mr-2 h-4 w-4" />
              创建工作流
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      <CardDescription className="text-sm">{workflow.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getStatusColor(workflow.status)}>
                      {getStatusText(workflow.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">执行次数</div>
                      <div className="font-semibold">{workflow.executions}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">平均时长</div>
                      <div className="font-semibold">{workflow.avgDuration}s</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">成功率</div>
                      <div className="font-semibold">{workflow.successRate}%</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setSelectedWorkflow(workflow)
                        setActiveTab("designer")
                      }}
                    >
                      <Settings className="mr-2 h-3 w-3" />
                      编辑
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setSelectedWorkflow(workflow)
                        setActiveTab("optimizer")
                      }}
                    >
                      <TrendingUp className="mr-2 h-3 w-3" />
                      优化
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="designer">
          <WorkflowDesigner workflow={selectedWorkflow} />
        </TabsContent>

        <TabsContent value="optimizer">
          <WorkflowOptimizer workflow={selectedWorkflow} />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>工作流模板库</CardTitle>
              <CardDescription>从预设模板快速开始，或浏览社区分享的工作流</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "客户反馈处理",
                    description: "自动收集、分类和响应客户反馈",
                    category: "客户服务",
                    uses: 342,
                  },
                  {
                    name: "数据备份流程",
                    description: "定期备份关键数据到云存储",
                    category: "运维",
                    uses: 567,
                  },
                  {
                    name: "营销活动自动化",
                    description: "根据用户行为触发个性化营销活动",
                    category: "营销",
                    uses: 891,
                  },
                  {
                    name: "代码审查流程",
                    description: "AI 辅助代码审查和质量检查",
                    category: "开发",
                    uses: 234,
                  },
                ].map((template, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <CardDescription className="text-sm mt-1">{template.description}</CardDescription>
                        </div>
                        <Badge variant="secondary">{template.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{template.uses} 次使用</span>
                        <Button size="sm" variant="outline">
                          使用模板
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
