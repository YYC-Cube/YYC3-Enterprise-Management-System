"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Phone, MessageSquare, Calendar } from "lucide-react"

export default function CustomerProspectsPanel() {
  const prospects = [
    {
      id: 1,
      name: "赵六",
      phone: "137****3456",
      intentScore: 88,
      stage: "需求确认",
      lastContact: "2小时前",
      nextAction: "发送产品方案",
      aiSuggestion: "客户对价格敏感，建议强调性价比优势",
    },
    {
      id: 2,
      name: "孙七",
      phone: "135****7890",
      intentScore: 75,
      stage: "方案沟通",
      lastContact: "1天前",
      nextAction: "预约上门演示",
      aiSuggestion: "客户关注售后服务，建议详细介绍服务体系",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>准客户管理</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prospects.map((prospect) => (
              <Card key={prospect.id} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{prospect.name}</h3>
                      <p className="text-sm text-muted-foreground">{prospect.phone}</p>
                    </div>
                    <Badge>{prospect.stage}</Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">意向度</span>
                        <span className="text-sm font-medium">{prospect.intentScore}%</span>
                      </div>
                      <Progress value={prospect.intentScore} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">最后联系：</span>
                        <span className="ml-2">{prospect.lastContact}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">下一步：</span>
                        <span className="ml-2">{prospect.nextAction}</span>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="text-sm">{prospect.aiSuggestion}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        拨打电话
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        发送短信
                      </Button>
                      <Button size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        安排跟进
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
