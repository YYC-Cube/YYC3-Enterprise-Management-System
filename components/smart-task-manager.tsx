"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles, Plus, User, Clock, Target, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeamMember {
  id: string
  name: string
  skills: string[]
  currentWorkload: number
  availability: number
}

interface Task {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  priority: "low" | "medium" | "high"
  estimatedHours: number
  assignedTo?: string
  aiRecommendation?: {
    assignee: string
    reasoning: string
    confidence: number
  }
}

// 模拟团队成员数据
const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "张三",
    skills: ["React", "TypeScript", "UI设计"],
    currentWorkload: 60,
    availability: 40,
  },
  {
    id: "2",
    name: "李四",
    skills: ["Node.js", "数据库", "API开发"],
    currentWorkload: 45,
    availability: 55,
  },
  {
    id: "3",
    name: "王五",
    skills: ["Python", "数据分析", "机器学习"],
    currentWorkload: 70,
    availability: 30,
  },
  {
    id: "4",
    name: "赵六",
    skills: ["测试", "质量保证", "自动化"],
    currentWorkload: 30,
    availability: 70,
  },
]

export function SmartTaskManager() {
  const [teamMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [isAssigning, setIsAssigning] = useState(false)

  // 新任务表单状态
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    priority: "medium" as "low" | "medium" | "high",
    estimatedHours: 8,
  })

  const { toast } = useToast()

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "请输入任务标题",
        variant: "destructive",
      })
      return
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      requiredSkills: newTask.requiredSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      priority: newTask.priority,
      estimatedHours: newTask.estimatedHours,
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      requiredSkills: "",
      priority: "medium",
      estimatedHours: 8,
    })
    setIsCreatingTask(false)

    toast({
      title: "任务创建成功",
      description: "可以使用 AI 智能分配功能推荐最佳负责人",
    })
  }

  const handleAIAssignment = async (taskId: string) => {
    setIsAssigning(true)

    try {
      const task = tasks.find((t) => t.id === taskId)
      if (!task) return

      const response = await fetch("/api/ai/task-assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: {
            title: task.title,
            description: task.description,
            requiredSkills: task.requiredSkills,
            priority: task.priority,
            estimatedHours: task.estimatedHours,
          },
          teamMembers,
        }),
      })

      if (!response.ok) {
        throw new Error("分配失败")
      }

      const data = await response.json()

      setTasks(
        tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                aiRecommendation: {
                  assignee: data.assignedTo,
                  reasoning: data.reasoning,
                  confidence: data.confidence,
                },
              }
            : t,
        ),
      )

      toast({
        title: "AI 分配建议已生成",
        description: `推荐分配给: ${data.assignedTo}`,
      })
    } catch (error) {
      toast({
        title: "分配失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsAssigning(false)
    }
  }

  const handleConfirmAssignment = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task?.aiRecommendation) return

    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              assignedTo: t.aiRecommendation!.assignee,
            }
          : t,
      ),
    )

    toast({
      title: "任务已分配",
      description: `已分配给 ${task.aiRecommendation.assignee}`,
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "高优先级"
      case "medium":
        return "中优先级"
      case "low":
        return "低优先级"
      default:
        return priority
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* 左侧：团队成员 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            团队成员
          </CardTitle>
          <CardDescription>当前团队成员技能和工作负载</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{member.name}</h4>
                <Badge variant="outline">{member.availability}% 可用</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>工作负载</span>
                    <span>{member.currentWorkload}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${member.currentWorkload}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 右侧：任务列表 */}
      <div className="lg:col-span-2 space-y-6">
        {/* 创建任务 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>任务管理</CardTitle>
                <CardDescription>创建任务并使用 AI 智能分配</CardDescription>
              </div>
              {!isCreatingTask && (
                <Button onClick={() => setIsCreatingTask(true)} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  新建任务
                </Button>
              )}
            </div>
          </CardHeader>
          {isCreatingTask && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">任务标题</Label>
                <Input
                  id="task-title"
                  placeholder="例如: 实现用户登录功能"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-description">任务描述</Label>
                <Textarea
                  id="task-description"
                  placeholder="详细描述任务需求和目标..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="task-skills">所需技能</Label>
                  <Input
                    id="task-skills"
                    placeholder="React, TypeScript"
                    value={newTask.requiredSkills}
                    onChange={(e) => setNewTask({ ...newTask, requiredSkills: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">用逗号分隔</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task-priority">优先级</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: "low" | "medium" | "high") => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger id="task-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低优先级</SelectItem>
                      <SelectItem value="medium">中优先级</SelectItem>
                      <SelectItem value="high">高优先级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-hours">预计工时（小时）</Label>
                <Input
                  id="task-hours"
                  type="number"
                  min="1"
                  value={newTask.estimatedHours}
                  onChange={(e) => setNewTask({ ...newTask, estimatedHours: Number.parseInt(e.target.value) || 8 })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateTask} className="flex-1">
                  创建任务
                </Button>
                <Button variant="outline" onClick={() => setIsCreatingTask(false)}>
                  取消
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* 任务列表 */}
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Target className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">暂无任务，点击"新建任务"开始</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* 任务头部 */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                        {task.description && <p className="text-sm text-muted-foreground mb-3">{task.description}</p>}
                      </div>
                      <Badge variant={getPriorityColor(task.priority)}>{getPriorityLabel(task.priority)}</Badge>
                    </div>

                    {/* 任务信息 */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{task.estimatedHours} 小时</span>
                      </div>
                      {task.requiredSkills.length > 0 && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          <div className="flex gap-1">
                            {task.requiredSkills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* AI 推荐 */}
                    {task.aiRecommendation && (
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-sm">AI 推荐分配</span>
                          </div>
                          <Badge variant="secondary">{Math.round(task.aiRecommendation.confidence * 100)}% 匹配</Badge>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">推荐负责人: </span>
                            {task.aiRecommendation.assignee}
                          </p>
                          <p className="text-sm text-muted-foreground">{task.aiRecommendation.reasoning}</p>
                        </div>

                        {!task.assignedTo && (
                          <Button size="sm" onClick={() => handleConfirmAssignment(task.id)} className="w-full">
                            确认分配
                          </Button>
                        )}
                      </div>
                    )}

                    {/* 已分配 */}
                    {task.assignedTo && (
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <p className="text-sm text-green-700 dark:text-green-400">
                          已分配给: <span className="font-semibold">{task.assignedTo}</span>
                        </p>
                      </div>
                    )}

                    {/* 操作按钮 */}
                    {!task.assignedTo && !task.aiRecommendation && (
                      <Button
                        onClick={() => handleAIAssignment(task.id)}
                        disabled={isAssigning}
                        variant="outline"
                        className="w-full"
                      >
                        {isAssigning ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            AI 正在分析...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            AI 智能分配
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
