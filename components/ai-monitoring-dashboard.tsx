"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, DollarSign, Zap, Users, Clock, CheckCircle } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface UsageStats {
  totalRequests: number
  totalTokens: number
  totalCost: number
  avgLatency: number
  successRate: number
  activeUsers: number
}

interface FeatureUsage {
  feature: string
  requests: number
  tokens: number
  cost: number
}

export function AIMonitoringDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [stats, setStats] = useState<UsageStats>({
    totalRequests: 12543,
    totalTokens: 3456789,
    totalCost: 45.67,
    avgLatency: 1234,
    successRate: 98.5,
    activeUsers: 456,
  })

  // 模拟数据
  const usageTrend = [
    { date: "12/19", requests: 1200, tokens: 345000, cost: 4.5 },
    { date: "12/20", requests: 1350, tokens: 389000, cost: 5.1 },
    { date: "12/21", requests: 1180, tokens: 334000, cost: 4.3 },
    { date: "12/22", requests: 1420, tokens: 412000, cost: 5.4 },
    { date: "12/23", requests: 1580, tokens: 456000, cost: 6.0 },
    { date: "12/24", requests: 1650, tokens: 478000, cost: 6.3 },
    { date: "12/25", requests: 1763, tokens: 512000, cost: 6.7 },
  ]

  const featureUsage: FeatureUsage[] = [
    { feature: "智能数据分析", requests: 4523, tokens: 1234567, cost: 16.23 },
    { feature: "AI 协作助手", requests: 3456, tokens: 987654, cost: 12.98 },
    { feature: "智能客服", requests: 2789, tokens: 765432, cost: 10.05 },
    { feature: "工作流自动化", requests: 1775, tokens: 469136, cost: 6.41 },
  ]

  const modelDistribution = [
    { name: "GPT-4", value: 45, color: "#8b5cf6" },
    { name: "GPT-3.5", value: 30, color: "#3b82f6" },
    { name: "Claude", value: 15, color: "#10b981" },
    { name: "其他", value: 10, color: "#6b7280" },
  ]

  const performanceData = [
    { time: "00:00", latency: 1100, success: 99 },
    { time: "04:00", latency: 950, success: 99.5 },
    { time: "08:00", latency: 1300, success: 98 },
    { time: "12:00", latency: 1450, success: 97.5 },
    { time: "16:00", latency: 1250, success: 98.5 },
    { time: "20:00", latency: 1150, success: 99 },
  ]

  return (
    <div className="space-y-6">
      {/* 时间范围选择 */}
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">最近 24 小时</SelectItem>
            <SelectItem value="7d">最近 7 天</SelectItem>
            <SelectItem value="30d">最近 30 天</SelectItem>
            <SelectItem value="90d">最近 90 天</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 关键指标卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总请求数</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> 较上周
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token 使用量</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.totalTokens / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.3%</span> 较上周
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总成本</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+10.1%</span> 较上周
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均延迟</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgLatency}ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+5.2%</span> 较上周
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">成功率</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.3%</span> 较上周
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.7%</span> 较上周
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 详细分析 */}
      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">使用趋势</TabsTrigger>
          <TabsTrigger value="features">功能分析</TabsTrigger>
          <TabsTrigger value="models">模型分布</TabsTrigger>
          <TabsTrigger value="performance">性能监控</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>使用趋势</CardTitle>
              <CardDescription>AI 功能请求量和成本趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#8b5cf6" name="请求数" />
                  <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#10b981" name="成本 ($)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>功能使用分析</CardTitle>
              <CardDescription>各 AI 功能的使用情况和成本</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featureUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="feature" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="requests" fill="#8b5cf6" name="请求数" />
                  <Bar dataKey="cost" fill="#10b981" name="成本 ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>模型使用分布</CardTitle>
              <CardDescription>不同 AI 模型的使用占比</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={modelDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {modelDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>性能监控</CardTitle>
              <CardDescription>响应延迟和成功率监控</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[95, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="latency" stroke="#f59e0b" name="延迟 (ms)" />
                  <Line yAxisId="right" type="monotone" dataKey="success" stroke="#10b981" name="成功率 (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
