"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChevronDown, ChevronRight, Download, ExternalLink, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// 模拟部门绩效数据，增加同比和环比指标
const departmentPerformanceData = [
  { department: "技术部", currentScore: 92, targetScore: 85, previousMonth: 88, yearOnYear: 105 },
  { department: "市场部", currentScore: 88, targetScore: 80, previousMonth: 84, yearOnYear: 108 },
  { department: "人事部", currentScore: 95, targetScore: 85, previousMonth: 92, yearOnYear: 102 },
  { department: "财务部", currentScore: 90, targetScore: 85, previousMonth: 87, yearOnYear: 103 },
  { department: "运营部", currentScore: 87, targetScore: 80, previousMonth: 82, yearOnYear: 109 },
]

// 模拟月度出勤数据，增加目标线和异常标记
const attendanceData = [
  { month: "1月", actual: 95, target: 92, absences: 3, late: 5, holiday: 10 },
  { month: "2月", actual: 93, target: 92, absences: 4, late: 8, holiday: 12 },
  { month: "3月", actual: 97, target: 92, absences: 2, late: 3, holiday: 8 },
  { month: "4月", actual: 94, target: 92, absences: 3, late: 6, holiday: 9 },
  { month: "5月", actual: 96, target: 92, absences: 2, late: 4, holiday: 11 },
  { month: "6月", actual: 98, target: 92, absences: 1, late: 2, holiday: 7 },
]

// 模拟季度绩效趋势数据
const quarterlyPerformanceData = [
  { quarter: "Q1 2023", average: 85, high: 92, low: 78 },
  { quarter: "Q2 2023", average: 87, high: 95, low: 80 },
  { quarter: "Q3 2023", average: 89, high: 96, low: 82 },
  { quarter: "Q4 2023", average: 91, high: 97, low: 85 },
  { quarter: "Q1 2024", average: 93, high: 98, low: 88 },
  { quarter: "Q2 2024", average: 94, high: 99, low: 89 },
]

// 自定义工具提示组件，增加数据追溯信息
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg border rounded-md">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <span style={{ color: entry.color }} className="h-3 w-3 rounded-full inline-block"></span>
            <span className="text-sm text-gray-600">{entry.name}:</span>
            <span className="text-sm font-semibold">{entry.value}</span>
          </div>
        ))}
        <Button variant="ghost" size="sm" className="w-full mt-2 text-xs flex items-center justify-center gap-1 text-primary">
          <ExternalLink className="h-3 w-3" />
          查看详细数据
        </Button>
      </div>
    )
  }
  return null
}

export function MultiDimensionalDashboard() {
  const [timeRange, setTimeRange] = useState("monthly")
  const [loading, setLoading] = useState(false)

  // 模拟数据加载效果
  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="space-y-6">
      {/* 标题和操作区 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">绩效管理与出勤分析</h2>
          <p className="text-muted-foreground text-sm">实时监控部门绩效和员工出勤情况</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              筛选
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" />
              导出
            </Button>
          </div>
          <Button onClick={handleRefresh} size="sm" className="gap-1">
            {loading ? (
              <svg className="animate-spin h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <Refresh className="h-3.5 w-3.5" />
            )}
            刷新数据
          </Button>
        </div>
      </div>

      {/* 统计概览卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="overflow-hidden">
          <div className="absolute -right-4 -top-4 h-24 w-24 bg-primary/10 rounded-full" />
          <CardHeader className="pb-2 relative z-10">
            <CardDescription>平均绩效得分</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              {loading ? <Skeleton className="h-8 w-16" /> : 92}
              <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">+3.2%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-xs text-muted-foreground">同比增长 3.2%，环比增长 1.8%</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="absolute -right-4 -top-4 h-24 w-24 bg-green-100 rounded-full" />
          <CardHeader className="pb-2 relative z-10">
            <CardDescription>平均出勤率</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              {loading ? <Skeleton className="h-8 w-16" /> : 95.5}%
              <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">+1.2%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-xs text-muted-foreground">目标值 92%，超出 3.5 个百分点</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="absolute -right-4 -top-4 h-24 w-24 bg-blue-100 rounded-full" />
          <CardHeader className="pb-2 relative z-10">
            <CardDescription>达标部门数</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              {loading ? <Skeleton className="h-8 w-16" /> : 5/5}
              <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">100%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-xs text-muted-foreground">所有部门均已达成月度目标</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="absolute -right-4 -top-4 h-24 w-24 bg-amber-100 rounded-full" />
          <CardHeader className="pb-2 relative z-10">
            <CardDescription>员工出勤异常</CardDescription>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              {loading ? <Skeleton className="h-8 w-16" /> : 12}
              <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">-8%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-xs text-muted-foreground">较上月减少 8%，包含 5 次迟到和 7 次缺勤</p>
          </CardContent>
        </Card>
      </div>

      {/* 数据可视化区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 部门绩效对比图表 */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">部门绩效对比分析</CardTitle>
            <CardDescription>各部门当前得分与目标值对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              {loading ? (
                <Skeleton className="w-full h-full rounded-md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={departmentPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="department" tickLine={false} axisLine={false} />
                    <YAxis domain={[70, 100]} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="targetScore" name="目标值" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="currentScore" name="当前得分" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-sm bg-indigo-500 inline-block"></span>
              当前得分
            </span>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              查看部门详情
              <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>

        {/* 月度出勤率趋势图表 */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">月度出勤率趋势</CardTitle>
            <CardDescription>近6个月出勤率变化与目标线对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              {loading ? (
                <Skeleton className="w-full h-full rounded-md" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={attendanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis domain={[85, 100]} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      name="目标值" 
                      stroke="#9ca3af" 
                      strokeDasharray="5 5" 
                      dot={false} 
                      activeDot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      name="实际出勤率" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      dot={{ r: 6, strokeWidth: 2, fill: "white" }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
              实际出勤率
            </span>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              查看出勤详情
              <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* 季度绩效趋势图表 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">季度绩效趋势分析</CardTitle>
          <CardDescription>近6个季度绩效变化范围</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {loading ? (
              <Skeleton className="w-full h-full rounded-md" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={quarterlyPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="quarter" tickLine={false} axisLine={false} />
                  <YAxis domain={[70, 100]} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="low" name="最低分" stroke="#f43f5e" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="average" name="平均分" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="high" name="最高分" stroke="#10b981" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-indigo-500 inline-block"></span>
              平均分
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
              最高分
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-red-500 inline-block"></span>
              最低分
            </span>
          </div>
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            查看历史数据
            <ChevronDown className="ml-1 h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      </Card>

      {/* 数据洞察卡片 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">数据洞察</CardTitle>
          <CardDescription>基于绩效和出勤数据的关键发现</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h4 className="font-medium mb-1">绩效领先部门</h4>
              <p className="text-sm text-muted-foreground">人事部连续3个月保持绩效领先，得分95分</p>
              <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-indigo-600 hover:text-indigo-700">
                查看详情
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-medium mb-1">出勤率提升</h4>
              <p className="text-sm text-muted-foreground">6月份出勤率达到98%，创年内新高，环比提升2%</p>
              <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-green-600 hover:text-green-700">
                查看详情
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-medium mb-1">改进机会</h4>
              <p className="text-sm text-muted-foreground">2月份出勤异常较多，建议分析节假日后员工返岗情况</p>
              <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-amber-600 hover:text-amber-700">
                查看详情
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 刷新图标组件
function Refresh(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  )
}
