"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Users } from "lucide-react"

export default function BonusPoolManagement() {
  const bonusPool = {
    period: "2024-01",
    totalAmount: 50000,
    distributedAmount: 35000,
    remainingAmount: 15000,
    distributionRate: 70,
  }

  const distributions = [
    { department: "销售部", amount: 20000, percentage: 40 },
    { department: "客服部", amount: 10000, percentage: 20 },
    { department: "运营部", amount: 5000, percentage: 10 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">奖金池总额</span>
            </div>
            <div className="text-3xl font-bold">¥{bonusPool.totalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-muted-foreground">已分配</span>
            </div>
            <div className="text-3xl font-bold text-green-600">¥{bonusPool.distributedAmount.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-muted-foreground">剩余</span>
            </div>
            <div className="text-3xl font-bold text-orange-600">¥{bonusPool.remainingAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>分配进度</span>
            <Button size="sm">执行分配</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">分配率</span>
              <span className="font-medium">{bonusPool.distributionRate}%</span>
            </div>
            <Progress value={bonusPool.distributionRate} />
          </div>

          <div className="space-y-3">
            {distributions.map((dist, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">{dist.department}</span>
                <div className="text-right">
                  <div className="font-bold">¥{dist.amount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{dist.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
