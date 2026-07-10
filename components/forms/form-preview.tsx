"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function FormPreview() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>客户信息采集表</CardTitle>
          <p className="text-sm text-muted-foreground">请填写以下信息，我们将尽快与您联系</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label>
                姓名 <span className="text-destructive">*</span>
              </Label>
              <Input placeholder="请输入您的姓名" />
            </div>

            <div className="space-y-2">
              <Label>
                手机号 <span className="text-destructive">*</span>
              </Label>
              <Input type="tel" placeholder="请输入手机号" />
              <p className="text-xs text-muted-foreground">我们将通过此号码与您联系</p>
            </div>

            <div className="space-y-2">
              <Label>邮箱</Label>
              <Input type="email" placeholder="请输入邮箱地址" />
            </div>

            <div className="space-y-2">
              <Label>意向产品</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                <option>请选择</option>
                <option>产品 A</option>
                <option>产品 B</option>
                <option>产品 C</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>备注</Label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[100px]"
                placeholder="请输入其他需求或问题"
              />
            </div>

            <Button className="w-full" size="lg">
              提交
            </Button>

            <div className="text-xs text-center text-muted-foreground">提交即表示您同意我们的隐私政策</div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-2">
            <Badge className="bg-primary">AI</Badge>
            <div className="text-sm">
              <p className="font-medium mb-1">智能验证已启用</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• 手机号格式自动验证</li>
                <li>• 邮箱地址有效性检查</li>
                <li>• 重复提交智能识别</li>
                <li>• 客户信息自动补全</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
