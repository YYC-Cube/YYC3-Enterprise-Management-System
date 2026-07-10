"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, CheckCircle2, Clock, XCircle, Sparkles } from "lucide-react"

export default function DailyReports() {
  const reports = [
    {
      id: 1,
      employee: "张三",
      date: "2024-01-15",
      status: "submitted",
      followupCount: 8,
      newCustomers: 3,
      dealsClosedCount: 2,
      revenue: 15000,
      aiScore: 88,
      aiSuggestions: ["跟进效率较高，建议保持", "可增加高价值客户跟进时间"],
    },
    {
      id: 2,
      employee: "李四",
      date: "2024-01-15",
      status: "pending",
      followupCount: 0,
      newCustomers: 0,
      dealsClosedCount: 0,
      revenue: 0,
      aiScore: 0,
      aiSuggestions: [],
    },
  ]

  const getStatusBadge = (status: string) => {
    if (status === "submitted")
      return (
        <Badge className="bg-green-500">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          已提交
        </Badge>
      )
    if (status === "pending")
      return (
        <Badge className="bg-yellow-500">
          <Clock className="h-3 w-3 mr-1" />
          待提交
        </Badge>
      )
    return (
      <Badge variant="secondary">
        <XCircle className="h-3 w-3 mr-1" />
        未提交
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              工作日报
            </span>
            <Button size="sm">提交今日日报</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{report.employee[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{report.employee}</h4>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                    </div>
                    {getStatusBadge(report.status)}
                  </div>

                  {report.status === "submitted" && (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{report.followupCount}</div>
                          <div className="text-xs text-muted-foreground">跟进客户</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{report.newCustomers}</div>
                          <div className="text-xs text-muted-foreground">新增客户</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{report.dealsClosedCount}</div>
                          <div className="text-xs text-muted-foreground">成交数</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">¥{report.revenue.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">业绩</div>
                        </div>
                      </div>

                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <div className="font-medium text-sm mb-1">AI 评分：{report.aiScore}分</div>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {report.aiSuggestions.map((suggestion, idx) => (
                                <li key={idx}>• {suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {report.status === "pending" && (
                    <div className="text-center py-4 text-muted-foreground">尚未提交今日工作日报</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
