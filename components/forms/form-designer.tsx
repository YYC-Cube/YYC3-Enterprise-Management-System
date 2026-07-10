"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Type,
  Hash,
  Calendar,
  Phone,
  Mail,
  List,
  CheckSquare,
  Radio,
  FileText,
  GripVertical,
  Trash2,
  Sparkles,
  Plus,
} from "lucide-react"

export default function FormDesigner() {
  const [fields, setFields] = useState([
    {
      id: "1",
      type: "text",
      label: "姓名",
      required: true,
      aiSuggested: true,
    },
    {
      id: "2",
      type: "phone",
      label: "手机号",
      required: true,
      aiSuggested: true,
    },
  ])

  const fieldTypes = [
    { type: "text", label: "文本", icon: Type },
    { type: "number", label: "数字", icon: Hash },
    { type: "date", label: "日期", icon: Calendar },
    { type: "phone", label: "手机", icon: Phone },
    { type: "email", label: "邮箱", icon: Mail },
    { type: "select", label: "下拉", icon: List },
    { type: "checkbox", label: "多选", icon: CheckSquare },
    { type: "radio", label: "单选", icon: Radio },
    { type: "textarea", label: "文本域", icon: FileText },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* 字段库 */}
      <Card className="lg:col-span-1">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">字段类型</h3>
          <div className="space-y-2">
            {fieldTypes.map((fieldType) => {
              const Icon = fieldType.icon
              return (
                <Button
                  key={fieldType.type}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {fieldType.label}
                </Button>
              )
            })}
          </div>

          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5" />
              <div className="text-sm font-medium">AI 推荐字段</div>
            </div>
            <div className="text-xs text-muted-foreground">根据行业和场景，AI 已为您推荐必填字段</div>
          </div>
        </CardContent>
      </Card>

      {/* 表单画布 */}
      <Card className="lg:col-span-2">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {fields.map((field) => (
              <Card key={field.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move mt-1" />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label>{field.label}</Label>
                          {field.required && (
                            <Badge variant="secondary" className="text-xs">
                              必填
                            </Badge>
                          )}
                          {field.aiSuggested && (
                            <Badge className="bg-primary/10 text-primary text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI推荐
                            </Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <Input placeholder={`请输入${field.label}`} disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              添加字段
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 字段属性 */}
      <Card className="lg:col-span-1">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">字段属性</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>字段标签</Label>
              <Input placeholder="输入字段标签" />
            </div>

            <div className="space-y-2">
              <Label>占位符</Label>
              <Input placeholder="输入占位符文本" />
            </div>

            <div className="flex items-center justify-between">
              <Label>必填字段</Label>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <Label>启用验证</Label>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <Label>AI 自动补全</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
