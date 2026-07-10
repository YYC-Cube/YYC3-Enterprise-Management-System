"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Zap } from "lucide-react"

export default function CustomerReactivationPanel() {
  const dormantCustomers = [
    {
      id: 1,
      name: "周八",
      lastContact: "60天前",
      churnRisk: "high",
      aiStrategy: "发送专属优惠券，强调新品上市",
    },
    {
      id: 2,
      name: "吴九",
      lastContact: "45天前",
      churnRisk: "medium",
      aiStrategy: "电话回访，了解近期需求变化",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          沉睡客户唤醒
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dormantCustomers.map((customer) => (
            <Card key={customer.id} className="border-orange-200">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{customer.name}</h4>
                    <p className="text-sm text-muted-foreground">最后联系：{customer.lastContact}</p>
                  </div>
                  <Badge className={customer.churnRisk === "high" ? "bg-red-500" : "bg-yellow-500"}>
                    {customer.churnRisk === "high" ? "高风险" : "中风险"}
                  </Badge>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-primary mt-0.5" />
                    <div className="text-sm">
                      <strong>AI唤醒策略：</strong>
                      {customer.aiStrategy}
                    </div>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  执行唤醒方案
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
