"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Plus, Eye, Code, Save, Share2 } from "lucide-react"
import FormDesigner from "./form-designer"
import FormPreview from "./form-preview"
import FormTemplates from "./form-templates"

export default function SmartFormBuilder() {
  const [activeTab, setActiveTab] = useState("designer")
  const [formConfig, setFormConfig] = useState({
    name: "",
    industry: "",
    scenario: "",
    fields: [],
  })

  return (
    <div className="space-y-6">
      {/* AI 表单生成器 */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI 智能表单生成
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>行业类型</Label>
              <Select
                value={formConfig.industry}
                onValueChange={(value) => setFormConfig({ ...formConfig, industry: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择行业" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">零售</SelectItem>
                  <SelectItem value="restaurant">餐饮</SelectItem>
                  <SelectItem value="beauty">美容美发</SelectItem>
                  <SelectItem value="fitness">健身</SelectItem>
                  <SelectItem value="education">教育培训</SelectItem>
                  <SelectItem value="realestate">房地产</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>应用场景</Label>
              <Select
                value={formConfig.scenario}
                onValueChange={(value) => setFormConfig({ ...formConfig, scenario: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择场景" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">客户信息采集</SelectItem>
                  <SelectItem value="appointment">预约登记</SelectItem>
                  <SelectItem value="survey">满意度调查</SelectItem>
                  <SelectItem value="registration">活动报名</SelectItem>
                  <SelectItem value="feedback">意见反馈</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>表单名称</Label>
              <Input
                placeholder="输入表单名称"
                value={formConfig.name}
                onChange={(e) => setFormConfig({ ...formConfig, name: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button className="flex-1">
              <Sparkles className="h-4 w-4 mr-2" />
              AI 自动生成表单
            </Button>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              从模板创建
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 表单编辑器 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="designer">
              <Plus className="h-4 w-4 mr-2" />
              设计器
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" />
              预览
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Code className="h-4 w-4 mr-2" />
              模板库
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
            <Button size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              发布
            </Button>
          </div>
        </div>

        <TabsContent value="designer">
          <FormDesigner />
        </TabsContent>

        <TabsContent value="preview">
          <FormPreview />
        </TabsContent>

        <TabsContent value="templates">
          <FormTemplates />
        </TabsContent>
      </Tabs>
    </div>
  )
}
