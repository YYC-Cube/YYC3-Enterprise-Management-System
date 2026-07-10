"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { MeetingNotesGenerator } from "@/components/meeting-notes-generator"
import { SmartTaskManager } from "@/components/smart-task-manager"
import { FileText, ListTodo, Users, Sparkles } from "lucide-react"

export function AICollaborationHub() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* 页面标题 */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI 协作中心
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          智能会议纪要生成、任务自动分配，让团队协作更高效
        </p>
      </div>

      {/* 功能标签页 */}
      <Tabs defaultValue="meeting-notes" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="meeting-notes" className="gap-2">
            <FileText className="h-4 w-4" />
            会议纪要
          </TabsTrigger>
          <TabsTrigger value="task-management" className="gap-2">
            <ListTodo className="h-4 w-4" />
            智能任务
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meeting-notes" className="mt-0">
          <MeetingNotesGenerator />
        </TabsContent>

        <TabsContent value="task-management" className="mt-0">
          <SmartTaskManager />
        </TabsContent>
      </Tabs>

      {/* 功能说明 */}
      <Card className="mt-8 p-6 bg-muted/50">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">智能会议纪要</h3>
              <p className="text-sm text-muted-foreground">
                上传会议录音或输入文字内容，AI 自动生成结构化纪要，提取关键决策和待办事项
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">智能任务分配</h3>
              <p className="text-sm text-muted-foreground">
                基于团队成员技能、工作量和可用性，AI 智能推荐最佳任务分配方案
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
