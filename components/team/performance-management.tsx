"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Trophy, Medal, Award } from "lucide-react"

export default function PerformanceManagement() {
  const performances = [
    {
      id: 1,
      employee: "张三",
      department: "销售部",
      totalScore: 92,
      rank: 1,
      level: "S",
      revenue: 150000,
      dealsCount: 25,
      satisfaction: 4.8,
      bonus: 5000,
    },
    {
      id: 2,
      employee: "李四",
      department: "销售部",
      totalScore: 88,
      rank: 2,
      level: "A",
      revenue: 120000,
      dealsCount: 20,
      satisfaction: 4.6,
      bonus: 3000,
    },
    {
      id: 3,
      employee: "王五",
      department: "销售部",
      totalScore: 85,
      rank: 3,
      level: "A",
      revenue: 100000,
      dealsCount: 18,
      satisfaction: 4.5,
      bonus: 2000,
    },
  ]

  const getLevelBadge = (level: string) => {
    if (level === "S") return <Badge className="bg-yellow-500">S级</Badge>
    if (level === "A") return <Badge className="bg-blue-500">A级</Badge>
    if (level === "B") return <Badge className="bg-green-500">B级</Badge>
    return <Badge variant="secondary">C级</Badge>
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Award className="h-6 w-6 text-orange-600" />
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            本月绩效排名
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performances.map((perf) => (
              <Card key={perf.id} className={perf.rank <= 3 ? "border-primary/50" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12">{getRankIcon(perf.rank)}</div>

                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{perf.employee[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{perf.employee}</h4>
                          <p className="text-sm text-muted-foreground">{perf.department}</p>
                        </div>
                        <div className="text-right">
                          {getLevelBadge(perf.level)}
                          <div className="text-2xl font-bold mt-1">{perf.totalScore}分</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-muted-foreground">业绩</div>
                          <div className="font-semibold">¥{perf.revenue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">成交数</div>
                          <div className="font-semibold">{perf.dealsCount}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">满意度</div>
                          <div className="font-semibold">{perf.satisfaction}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">综合评分</span>
                          <span>{perf.totalScore}%</span>
                        </div>
                        <Progress value={perf.totalScore} />
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">本月奖金</span>
                        <span className="text-lg font-bold text-green-600">+¥{perf.bonus.toLocaleString()}</span>
                      </div>
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
