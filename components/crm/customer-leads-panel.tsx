"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, Filter, UserPlus, Sparkles } from "lucide-react"

export default function CustomerLeadsPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [qualityFilter, setQualityFilter] = useState("all")

  // 模拟数据
  const leads = [
    {
      id: 1,
      name: "张三",
      phone: "138****1234",
      source: "线上表单",
      qualityScore: 85,
      intentScore: 72,
      tags: ["高意向", "首次咨询"],
      assignedTo: "李销售",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "李四",
      phone: "139****5678",
      source: "电话咨询",
      qualityScore: 68,
      intentScore: 55,
      tags: ["价格敏感"],
      assignedTo: "王销售",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "王五",
      phone: "136****9012",
      source: "朋友推荐",
      qualityScore: 92,
      intentScore: 88,
      tags: ["高质量", "转介绍"],
      assignedTo: "李销售",
      createdAt: "2024-01-13",
    },
  ]

  const getQualityBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-500">A级</Badge>
    if (score >= 60) return <Badge className="bg-blue-500">B级</Badge>
    if (score >= 40) return <Badge className="bg-yellow-500">C级</Badge>
    return <Badge variant="secondary">D级</Badge>
  }

  return (
    <div className="space-y-6">
      {/* 操作栏 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>客资管理</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                导入客资
              </Button>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                新增客资
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索客户姓名、手机号..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={qualityFilter} onValueChange={setQualityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="质量筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部质量</SelectItem>
                <SelectItem value="a">A级（80-100分）</SelectItem>
                <SelectItem value="b">B级（60-79分）</SelectItem>
                <SelectItem value="c">C级（40-59分）</SelectItem>
                <SelectItem value="d">D级（0-39分）</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              更多筛选
            </Button>
            <Button variant="outline">
              <Sparkles className="h-4 w-4 mr-2" />
              AI 自动分配
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 客资列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>客户信息</TableHead>
                <TableHead>来源</TableHead>
                <TableHead>质量评分</TableHead>
                <TableHead>意向度</TableHead>
                <TableHead>标签</TableHead>
                <TableHead>分配给</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getQualityBadge(lead.qualityScore)}
                      <span className="text-sm text-muted-foreground">{lead.qualityScore}分</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${lead.intentScore}%` }} />
                      </div>
                      <span className="text-sm">{lead.intentScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {lead.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{lead.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        查看
                      </Button>
                      <Button variant="ghost" size="sm">
                        跟进
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI 洞察 */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-5 w-5 text-primary" />
            AI 智能洞察
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">今日新增客资</div>
              <div className="text-2xl font-bold">23</div>
              <div className="text-xs text-green-600">↑ 较昨日 +15%</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">平均质量评分</div>
              <div className="text-2xl font-bold">76</div>
              <div className="text-xs text-muted-foreground">B级水平</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">AI 推荐跟进</div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-orange-600">高意向客户待跟进</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
