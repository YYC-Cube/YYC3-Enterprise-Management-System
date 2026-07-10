"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CheckCircle2 } from "lucide-react"

export default function CustomerFollowupPanel() {
  const followups = [
    {
      id: 1,
      customer: "张三",
      type: "电话跟进",
      scheduledTime: "今天 14:00",
      priority: "high",
      status: "pending",
    },
    {
      id: 2,
      customer: "李四",
      type: "上门拜访",
      scheduledTime: "明天 10:00",
      priority: "medium",
      status: "pending",
    },
    {
      id: 3,
      customer: "王五",
      type: "微信沟通",
      scheduledTime: "今天 16:00",
      priority: "high",
      status: "completed",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") return <Badge className="bg-red-500">高优先级</Badge>
    if (priority === "medium") return <Badge className="bg-yellow-500">中优先级</Badge>
    return <Badge variant="secondary">低优先级</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>跟进计划</span>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            新建跟进
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {followups.map((followup) => (
            <Card key={followup.id} className={followup.status === "completed" ? "opacity-60" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {followup.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-orange-500" />
                    )}
                    <div>
                      <div className="font-medium">{followup.customer}</div>
                      <div className="text-sm text-muted-foreground">
                        {followup.type} · {followup.scheduledTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(followup.priority)}
                    {followup.status === "pending" && <Button size="sm">开始跟进</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
