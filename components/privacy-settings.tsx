"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Database, Download, Eye, Shield, Sparkles, Trash2 } from "lucide-react"
import { useState } from "react"

type PrivacySettingsType = any
const DEFAULT_PRIVACY_SETTINGS: PrivacySettingsType = {}

export function PrivacySettings() {
  const [settings, setSettings] = useState<PrivacySettingsType>(DEFAULT_PRIVACY_SETTINGS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      // 这里应该调用 API 保存设置
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("保存设置失败:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleExportData = () => {
    // 导出用户数据
    alert("数据导出功能即将推出")
  }

  const handleDeleteData = () => {
    if (confirm("确定要删除所有 AI 交互历史吗？此操作不可撤销。")) {
      alert("数据删除功能即将推出")
    }
  }

  return (
    <div className="space-y-6">
      {/* AI 功能控制 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI 功能控制</CardTitle>
          </div>
          <CardDescription>控制 AI 功能如何处理您的数据</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ai-processing">允许 AI 处理</Label>
              <p className="text-sm text-muted-foreground">允许 AI 功能分析和处理您的数据以提供智能服务</p>
            </div>
            <Switch
              id="ai-processing"
              checked={settings.allowAIProcessing}
              onCheckedChange={(checked) => setSettings({ ...settings, allowAIProcessing: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="personalization">个性化服务</Label>
              <p className="text-sm text-muted-foreground">根据您的使用习惯提供个性化建议和优化</p>
            </div>
            <Switch
              id="personalization"
              checked={settings.allowPersonalization}
              onCheckedChange={(checked) => setSettings({ ...settings, allowPersonalization: checked })}
            />
          </div>

          {!settings.allowAIProcessing && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>关闭 AI 处理后，智能分析、协作助手等功能将不可用</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 数据收集与存储 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle>数据收集与存储</CardTitle>
          </div>
          <CardDescription>管理数据收集和保留策略</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-collection">数据收集</Label>
              <p className="text-sm text-muted-foreground">收集使用数据以改进服务质量和用户体验</p>
            </div>
            <Switch
              id="data-collection"
              checked={settings.allowDataCollection}
              onCheckedChange={(checked) => setSettings({ ...settings, allowDataCollection: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="retention">数据保留期限</Label>
            <Select
              value={settings.dataRetentionDays.toString()}
              onValueChange={(value) => setSettings({ ...settings, dataRetentionDays: Number.parseInt(value) })}
            >
              <SelectTrigger id="retention">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 天</SelectItem>
                <SelectItem value="90">90 天（推荐）</SelectItem>
                <SelectItem value="180">180 天</SelectItem>
                <SelectItem value="365">1 年</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">超过此期限的数据将自动删除</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-delete">自动删除历史</Label>
              <p className="text-sm text-muted-foreground">定期自动清理 AI 对话和分析历史</p>
            </div>
            <Switch
              id="auto-delete"
              checked={settings.autoDeleteHistory}
              onCheckedChange={(checked) => setSettings({ ...settings, autoDeleteHistory: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* 数据管理 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>数据管理</CardTitle>
          </div>
          <CardDescription>导出或删除您的数据</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              导出我的数据
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleDeleteData}>
              <Trash2 className="mr-2 h-4 w-4" />
              删除 AI 历史
            </Button>
          </div>

          <Alert>
            <Eye className="h-4 w-4" />
            <AlertDescription>
              您可以随时导出或删除您的数据。我们承诺保护您的隐私，所有敏感信息在发送给 AI 前都会进行脱敏处理。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* 保存按钮 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => setSettings(DEFAULT_PRIVACY_SETTINGS)}>
          重置为默认
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "保存中..." : saved ? "已保存" : "保存设置"}
        </Button>
      </div>

      {saved && (
        <Alert className="bg-green-50 border-green-200">
          <Shield className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">隐私设置已成功保存</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
