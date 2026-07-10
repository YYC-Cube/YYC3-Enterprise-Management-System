"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Copy } from "lucide-react"

export default function FormTemplates() {
  const templates = [
    {
      id: 1,
      name: "客户信息采集表",
      industry: "通用",
      fields: 5,
      usage: 1234,
      description: "适用于各行业的基础客户信息采集",
    },
    {
      id: 2,
      name: "预约登记表",
      industry: "服务业",
      fields: 7,
      usage: 856,
      description: "美容、健身、教育等行业预约登记",
    },
    {
      id: 3,
      name: "满意度调查表",
      industry: "通用",
      fields: 10,
      usage: 645,
      description: "客户满意度和服务质量调查",
    },
    {
      id: 4,
      name: "活动报名表",
      industry: "营销",
      fields: 8,
      usage: 523,
      description: "线上线下活动报名信息收集",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
              </div>
              <Badge variant="secondary">{template.industry}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>{template.fields} 个字段</span>
              <span>{template.usage} 次使用</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                预览
              </Button>
              <Button size="sm" className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                使用模板
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
