"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Target } from "lucide-react"

export default function TeamAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">团队人数</span>
            </div>
            <div className="text-3xl font-bold">30</div>
            <div className="text-xs text-green-600 mt-1">↑ 较上月 +3</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-muted-foreground">团队业绩</span>
            </div>
            <div className="text-3xl font-bold">¥850K</div>
            <div className="text-xs text-green-600 mt-1">↑ 较上月 +25%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-muted-foreground">目标完成率</span>
            </div>
            <div className="text-3xl font-bold">85%</div>
            <div className="text-xs text-muted-foreground mt-1">目标 ¥1M</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-muted-foreground">平均绩效</span>
            </div>
            <div className="text-3xl font-bold">86分</div>
            <div className="text-xs text-green-600 mt-1">↑ 较上月 +2分</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>团队数据分析</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">团队数据可视化图表开发中...</div>
        </CardContent>
      </Card>
    </div>
  )
}
