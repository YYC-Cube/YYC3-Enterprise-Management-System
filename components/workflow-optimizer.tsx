"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, TrendingUp, AlertTriangle, Zap, Download, RefreshCw } from "lucide-react"

interface WorkflowOptimizerProps {
  workflow?: any
}

export function WorkflowOptimizer({ workflow }: WorkflowOptimizerProps) {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!workflow) return

    setAnalyzing(true)
    try {
      const response = await fetch("/api/workflow/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflowId: workflow.id }),
      })

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleDownloadReport = async () => {
    if (!workflow) return

    try {
      const response = await fetch("/api/workflow/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflowId: workflow.id }),
      })

      const data = await response.json()
      const blob = new Blob([data.report], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `workflow-optimization-report-${workflow.id}.md`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download report:", error)
    }
  }

  if (!workflow) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>请先选择一个工作流</p>
            <p className="text-sm">从概览页面选择要优化的工作流</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI 流程优化分析</CardTitle>
              <CardDescription>使用 AI 分析工作流执行历史，识别瓶颈并提供优化建议</CardDescription>
            </div>
            <Button onClick={handleAnalyze} disabled={analyzing}>
              {analyzing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  分析中...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  开始分析
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">工作流名称</span>
              <span className="font-medium">{workflow.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">执行次数</span>
              <span className="font-medium">{workflow.executions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">平均执行时间</span>
              <span className="font-medium">{workflow.avgDuration}秒</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">成功率</span>
              <span className="font-medium">{workflow.successRate}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <>
          {/* 性能评分 */}
          <Card>
            <CardHeader>
              <CardTitle>性能评分</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold">{analysis.performanceScore}</span>
                  <span className="text-muted-foreground">/100</span>
                </div>
                <Progress value={analysis.performanceScore} className="h-2" />
                <p className="text-sm text-muted-foreground">{analysis.summary}</p>
              </div>
            </CardContent>
          </Card>

          {/* 瓶颈分析 */}
          {analysis.bottlenecks && analysis.bottlenecks.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <CardTitle>识别的瓶颈</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.bottlenecks.map((bottleneck: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold">{bottleneck.step}</h4>
                            <Badge
                              variant="outline"
                              className={
                                bottleneck.severity === "high"
                                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                                  : bottleneck.severity === "medium"
                                    ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                    : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                              }
                            >
                              {bottleneck.severity === "high" ? "高" : bottleneck.severity === "medium" ? "中" : "低"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>问题：</strong>
                            {bottleneck.issue}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>影响：</strong>
                            {bottleneck.impact}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 优化建议 */}
          {analysis.optimizations && analysis.optimizations.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <CardTitle>优化建议</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.optimizations.map((optimization: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold">{optimization.suggestion}</h4>
                            <Badge
                              variant="outline"
                              className={
                                optimization.priority === "high"
                                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                                  : optimization.priority === "medium"
                                    ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                    : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                              }
                            >
                              {optimization.priority === "high"
                                ? "高优先级"
                                : optimization.priority === "medium"
                                  ? "中优先级"
                                  : "低优先级"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>预期改进：</strong>
                            {optimization.expectedImprovement}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>实施方法：</strong>
                            {optimization.implementation}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 自动化机会 */}
          {analysis.automationOpportunities && analysis.automationOpportunities.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <CardTitle>自动化机会</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.automationOpportunities.map((opportunity: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold">{opportunity.task}</h4>
                            <Badge variant="outline">
                              {opportunity.complexity === "easy"
                                ? "简单"
                                : opportunity.complexity === "medium"
                                  ? "中等"
                                  : "复杂"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>自动化方法：</strong>
                            {opportunity.automationMethod}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>预计节省时间：</strong>
                            {opportunity.timeSaved}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 关键建议 */}
          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>关键建议</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* 下载报告 */}
          <div className="flex justify-end">
            <Button onClick={handleDownloadReport} variant="outline" className="bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              下载完整报告
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
