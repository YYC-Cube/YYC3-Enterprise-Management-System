"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, Upload, FileAudio, Sparkles, Download, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FileText } from "lucide-react" // Declare the FileText variable

interface MeetingNotes {
  topic: string
  keyPoints: string[]
  decisions: string[]
  actionItems: Array<{
    task: string
    assignee: string
    deadline: string
  }>
  nextMeeting?: string
}

export function MeetingNotesGenerator() {
  const [inputMethod, setInputMethod] = useState<"text" | "audio">("text")
  const [textInput, setTextInput] = useState("")
  const [participants, setParticipants] = useState("")
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [notes, setNotes] = useState<MeetingNotes | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (inputMethod === "text" && !textInput.trim()) {
      toast({
        title: "请输入会议内容",
        description: "请在文本框中输入会议讨论内容",
        variant: "destructive",
      })
      return
    }

    if (inputMethod === "audio" && !audioFile) {
      toast({
        title: "请上传音频文件",
        description: "请选择会议录音文件",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const formData = new FormData()
      formData.append("inputMethod", inputMethod)
      formData.append("participants", participants)

      if (inputMethod === "text") {
        formData.append("content", textInput)
      } else if (audioFile) {
        formData.append("audio", audioFile)
      }

      const response = await fetch("/api/ai/meeting-notes", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("生成失败")
      }

      const data = await response.json()
      setNotes(data.notes)

      toast({
        title: "会议纪要生成成功",
        description: "已自动提取关键信息和待办事项",
      })
    } catch (error) {
      toast({
        title: "生成失败",
        description: "请稍后重试或联系技术支持",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    if (!notes) return

    const text = `
会议主题: ${notes.topic}

关键讨论点:
${notes.keyPoints.map((point, i) => `${i + 1}. ${point}`).join("\n")}

决策事项:
${notes.decisions.map((decision, i) => `${i + 1}. ${decision}`).join("\n")}

待办任务:
${notes.actionItems.map((item, i) => `${i + 1}. ${item.task} - 负责人: ${item.assignee}, 截止: ${item.deadline}`).join("\n")}

${notes.nextMeeting ? `下次会议: ${notes.nextMeeting}` : ""}
    `.trim()

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "已复制到剪贴板",
      description: "会议纪要已复制",
    })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* 输入区域 */}
      <Card>
        <CardHeader>
          <CardTitle>会议内容输入</CardTitle>
          <CardDescription>选择输入方式并提供会议信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 输入方式选择 */}
          <div className="flex gap-2">
            <Button
              variant={inputMethod === "text" ? "default" : "outline"}
              onClick={() => setInputMethod("text")}
              className="flex-1"
            >
              文字输入
            </Button>
            <Button
              variant={inputMethod === "audio" ? "default" : "outline"}
              onClick={() => setInputMethod("audio")}
              className="flex-1"
            >
              <FileAudio className="h-4 w-4 mr-2" />
              音频上传
            </Button>
          </div>

          {/* 参会人员 */}
          <div className="space-y-2">
            <Label htmlFor="participants">参会人员（可选）</Label>
            <Input
              id="participants"
              placeholder="张三, 李四, 王五"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">用逗号分隔多个人员</p>
          </div>

          {/* 文字输入 */}
          {inputMethod === "text" && (
            <div className="space-y-2">
              <Label htmlFor="content">会议内容</Label>
              <Textarea
                id="content"
                placeholder="请输入会议讨论的内容、决策和待办事项..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={12}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">{textInput.length} / 5000 字符</p>
            </div>
          )}

          {/* 音频上传 */}
          {inputMethod === "audio" && (
            <div className="space-y-2">
              <Label htmlFor="audio">会议录音</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  id="audio"
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                />
                <label htmlFor="audio" className="cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  {audioFile ? (
                    <div>
                      <p className="font-medium">{audioFile.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium">点击上传音频文件</p>
                      <p className="text-sm text-muted-foreground mt-1">支持 MP3, WAV, M4A 等格式</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* 生成按钮 */}
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                AI 正在生成纪要...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                生成会议纪要
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* 结果展示区域 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>会议纪要</CardTitle>
              <CardDescription>AI 自动生成的结构化纪要</CardDescription>
            </div>
            {notes && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!notes ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">输入会议内容后，AI 将自动生成结构化纪要</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 会议主题 */}
              <div>
                <h3 className="font-semibold text-lg mb-2">{notes.topic}</h3>
                {participants && <p className="text-sm text-muted-foreground">参会人员: {participants}</p>}
              </div>

              {/* 关键讨论点 */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="secondary">关键讨论点</Badge>
                </h4>
                <ul className="space-y-2">
                  {notes.keyPoints.map((point, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <span className="text-muted-foreground">{index + 1}.</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 决策事项 */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="secondary">决策事项</Badge>
                </h4>
                <ul className="space-y-2">
                  {notes.decisions.map((decision, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <span className="text-muted-foreground">{index + 1}.</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 待办任务 */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="default">待办任务</Badge>
                </h4>
                <div className="space-y-3">
                  {notes.actionItems.map((item, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                      <p className="font-medium text-sm mb-2">{item.task}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>负责人: {item.assignee}</span>
                        <span>截止: {item.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 下次会议 */}
              {notes.nextMeeting && (
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm">
                    <span className="font-semibold">下次会议: </span>
                    {notes.nextMeeting}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
