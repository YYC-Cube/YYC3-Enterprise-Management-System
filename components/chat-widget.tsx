"use client"

import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, Send, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const SYSTEM_PROMPT = `你是 YYC³ Nexus Portal 的 AI 助手，基于 Qwen3:32B 本地推理引擎。
你代表 YanYuCloudCube（言渝云枢）团队，核心理念是「五高五标五化五维」框架。
用简洁友好的中文回答，可以适当使用 emoji。如果用户用英文提问，用英文回答。`

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [streaming, setStreaming] = useState(false)
  const [buffer, setBuffer] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, buffer])

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  const send = async () => {
    const text = input.trim()
    if (!text || streaming) return
    setInput("")

    const userMsg: Message = { role: "user", content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setStreaming(true)
    setBuffer("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
        }),
      })

      if (!res.ok) throw new Error("API error")

      const reader = res.body?.getReader()
      if (!reader) throw new Error("No stream")
      const decoder = new TextDecoder()
      let accumulated = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "))
        for (const line of lines) {
          const data = line.slice(6)
          if (data === "[DONE]") break
          try {
            const parsed = JSON.parse(data)
            accumulated += parsed.content
            setBuffer(accumulated)
          } catch {}
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: accumulated }])
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ 连接失败，请确认 Ollama 服务正在运行 (ollama serve)" }])
    } finally {
      setStreaming(false)
      setBuffer("")
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl shadow-black/40 flex flex-col z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-violet-600/20 to-cyan-600/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">Qwen3:32B</span>
                <span className="text-white/30 text-xs">本地推理</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && !streaming && (
                <div className="text-center py-12">
                  <div className="text-3xl mb-3">🧠</div>
                  <div className="text-white/50 text-sm">YYC³ AI 助手已就绪</div>
                  <div className="text-white/25 text-xs mt-1">基于 Qwen3:32B · 完全本地推理</div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-br-md"
                      : "bg-white/5 text-white/80 rounded-bl-md"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {streaming && buffer && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-white/5 text-white/80 text-sm leading-relaxed">
                    {buffer}
                    <span className="inline-block w-[2px] h-[1em] bg-violet-400 ml-0.5 animate-pulse align-middle" />
                  </div>
                </div>
              )}
              {streaming && !buffer && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-white/5 text-white/40 text-sm">
                    思考中...
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/10">
              <form
                onSubmit={(e) => { e.preventDefault(); send() }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入消息..."
                  disabled={streaming}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white disabled:opacity-30 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/25 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
