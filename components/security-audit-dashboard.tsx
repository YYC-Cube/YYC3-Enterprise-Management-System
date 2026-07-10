"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, CheckCircle, XCircle, Download, Eye } from "lucide-react"

interface AuditLog {
  id: string
  timestamp: string
  userId: string
  eventType: string
  action: string
  result: "success" | "failure" | "blocked"
  ipAddress: string
}

export function SecurityAuditDashboard() {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: "2024-12-25 14:32:15",
      userId: "user-123",
      eventType: "ai_request",
      action: "智能数据分析查询",
      result: "success",
      ipAddress: "192.168.1.***",
    },
    {
      id: "2",
      timestamp: "2024-12-25 14:30:42",
      userId: "user-456",
      eventType: "access",
      action: "导出用户数据",
      result: "success",
      ipAddress: "192.168.1.***",
    },
    {
      id: "3",
      timestamp: "2024-12-25 14:28:33",
      userId: "user-789",
      eventType: "ai_request",
      action: "包含敏感信息的查询",
      result: "blocked",
      ipAddress: "192.168.1.***",
    },
    {
      id: "4",
      timestamp: "2024-12-25 14:25:18",
      userId: "user-123",
      eventType: "modification",
      action: "更新隐私设置",
      result: "success",
      ipAddress: "192.168.1.***",
    },
    {
      id: "5",
      timestamp: "2024-12-25 14:20:05",
      userId: "user-456",
      eventType: "ai_request",
      action: "工作流优化分析",
      result: "failure",
      ipAddress: "192.168.1.***",
    },
  ])

  const getResultBadge = (result: string) => {
    switch (result) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            成功
          </Badge>
        )
      case "failure":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            失败
          </Badge>
        )
      case "blocked":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="mr-1 h-3 w-3" />
            已拦截
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总事件数</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">最近 7 天</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">异常检测</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">需要关注</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">拦截请求</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">安全拦截</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">合规率</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.6%</div>
            <p className="text-xs text-muted-foreground">符合安全标准</p>
          </CardContent>
        </Card>
      </div>

      {/* 审计日志 */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">最近事件</TabsTrigger>
          <TabsTrigger value="anomalies">异常检测</TabsTrigger>
          <TabsTrigger value="blocked">拦截记录</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>审计日志</CardTitle>
                  <CardDescription>系统安全事件和操作记录</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  导出日志
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{log.action}</span>
                        {getResultBadge(log.result)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{log.timestamp}</span>
                        <span>用户: {log.userId}</span>
                        <span>IP: {log.ipAddress}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>异常行为检测</CardTitle>
              <CardDescription>AI 驱动的异常行为识别</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-b pb-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
                  <div className="flex-1">
                    <div className="font-medium">异常请求频率</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      用户 user-789 在 1 分钟内发起了 150 次 AI 请求，超过正常阈值
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">2024-12-25 14:15:32</div>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    中等风险
                  </Badge>
                </div>

                <div className="flex items-start gap-4 border-b pb-4">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
                  <div className="flex-1">
                    <div className="font-medium">异常时间段访问</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      用户 user-456 在凌晨 3 点进行了大量数据导出操作
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">2024-12-25 03:12:45</div>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    高风险
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocked" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>拦截记录</CardTitle>
              <CardDescription>被安全策略拦截的请求</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 border-b pb-4">
                  <XCircle className="h-5 w-5 text-red-600 mt-1" />
                  <div className="flex-1">
                    <div className="font-medium">敏感信息未脱敏</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      AI 请求中包含未脱敏的身份证号和手机号，已自动拦截
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">2024-12-25 14:28:33</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b pb-4">
                  <XCircle className="h-5 w-5 text-red-600 mt-1" />
                  <div className="flex-1">
                    <div className="font-medium">超出使用限制</div>
                    <div className="text-sm text-muted-foreground mt-1">用户已达到月度 Token 使用限制</div>
                    <div className="text-xs text-muted-foreground mt-2">2024-12-25 13:45:12</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
