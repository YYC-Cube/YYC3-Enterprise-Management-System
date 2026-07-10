export const dynamic = "force-static"

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434"

export async function POST(request: Request) {
  const { messages, model = "qwen3:32b" } = await request.json()

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  })

  if (!response.ok) {
    return Response.json({ error: "Ollama request failed" }, { status: response.status })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader()
      if (!reader) { controller.close(); return }
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n").filter((l) => l.trim())
        for (const line of lines) {
          try {
            const parsed = JSON.parse(line)
            const content = parsed.message?.content
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
            }
            if (parsed.done) {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"))
            }
          } catch {}
        }
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
