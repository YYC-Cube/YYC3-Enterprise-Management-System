"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, AlertCircle, Plus } from "lucide-react"

export default function RewardPenaltySystem() {
  const records = [
    {
      id: 1,
      employee: "张三",
      type: "reward",
      category: "业绩突出",
      amount: 1000,
      reason: "本月业绩超额完成150%",
      status: "approved",
      date: "2024-01-15",
    },
    {
      id: 2,
      employee: "李四",
      type: "penalty",
      category: "迟到",
      amount: 100,
      reason: "本周迟到3次",
      status: "pending",
      date: "2024-01-14",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              奖惩记录
            </span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              新增记录
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {records.map((record) => (
              <Card
                key={record.id}
                className={record.type === "reward" ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {record.type === "reward" ? (
                        <Award className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{record.employee}</h4>
                          <Badge variant={record.type === "reward" ? "default" : "destructive"}>
                            {record.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{record.reason}</p>
                        <p className="text-xs text-muted-foreground">{record.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${record.type === "reward" ? "text-green-600" : "text-red-600"}`}
                      >
                        {record.type === "reward" ? "+" : "-"}¥{record.amount}
                      </div>
                      <Badge variant={record.status === "approved" ? "default" : "secondary"} className="mt-2">
                        {record.status === "approved" ? "已审批" : "待审批"}
                      </Badge>
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
