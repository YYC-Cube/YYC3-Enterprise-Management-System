"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Trash2, Save, Play, Zap, GitBranch, Database, Mail, Webhook, Sparkles } from "lucide-react"

interface WorkflowStep {
  id: string
  type: "trigger" | "action" | "condition" | "ai"
  name: string
  icon: any
  config: Record<string, any>
}

interface WorkflowDesignerProps {
  workflow?: any
}

export function WorkflowDesigner({ workflow }: WorkflowDesignerProps) {
  const [workflowName, setWorkflowName] = useState(workflow?.name || "")
  const [workflowDescription, setWorkflowDescription] = useState(workflow?.description || "")
  const [steps, setSteps] = useState<WorkflowStep[]>([])

  const availableSteps = [
    { type: "trigger", name: "Webhook 触发器", icon: Webhook, color: "text-blue-500" },
    { type: "trigger", name: "定时触发器", icon: Zap, color: "text-yellow-500" },
    { type: "action", name: "数据库操作", icon: Database, color: "text-green-500" },
    { type: "action", name: "发送邮件", icon: Mail, color: "text-purple-500" },
    { type: "condition", name: "条件判断", icon: GitBranch, color: "text-orange-500" },
    { type: "ai", name: "AI 处理", icon: Sparkles, color: "text-pink-500" },
  ]

  const addStep = (stepTemplate: any) => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type: stepTemplate.type,
      name: stepTemplate.name,
      icon: stepTemplate.icon,
      config: {},
    }
    setSteps([...steps, newStep])
  }

  const removeStep = (stepId: string) => {
    setSteps(steps.filter((s) => s.id !== stepId))
  }

  const handleSave = async () => {
    // 保存工作流逻辑
    console.log("Saving workflow:", { workflowName, workflowDescription, steps })
  }

  const handleRun = async () => {
    // 执行工作流逻辑
    console.log("Running workflow:", { workflowName, workflowDescription, steps })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 左侧：工作流配置 */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>工作流配置</CardTitle>
            <CardDescription>设置工作流的基本信息和执行步骤</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workflow-name">工作流名称</Label>
              <Input
                id="workflow-name"
                placeholder="例如：客户入职自动化"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workflow-description">描述</Label>
              <Textarea
                id="workflow-description"
                placeholder="描述这个工作流的用途..."
                value={workflowDescription}
                onChange={(e) => setWorkflowDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>工作流步骤</CardTitle>
            <CardDescription>拖拽或点击右侧组件来构建您的工作流</CardDescription>
          </CardHeader>
          <CardContent>
            {steps.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>还没有添加任何步骤</p>
                <p className="text-sm">从右侧选择组件开始构建工作流</p>
              </div>
            ) : (
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        {index < steps.length - 1 && <div className="w-0.5 h-8 bg-border my-1" />}
                      </div>

                      <Card className="flex-1">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{step.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {step.type === "trigger" && "触发器"}
                                  {step.type === "action" && "操作"}
                                  {step.type === "condition" && "条件"}
                                  {step.type === "ai" && "AI"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">步骤 {index + 1}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            保存工作流
          </Button>
          <Button onClick={handleRun} variant="outline" className="flex-1 bg-transparent">
            <Play className="mr-2 h-4 w-4" />
            测试运行
          </Button>
        </div>
      </div>

      {/* 右侧：可用组件 */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>可用组件</CardTitle>
            <CardDescription>点击添加到工作流</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {availableSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addStep(step)}
                >
                  <Icon className={`mr-2 h-4 w-4 ${step.color}`} />
                  {step.name}
                </Button>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI 智能建议</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">添加条件判断可以让工作流根据不同情况执行不同操作</p>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">使用 AI 处理步骤可以自动分析和处理非结构化数据</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
