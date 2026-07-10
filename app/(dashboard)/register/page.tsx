"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { register } from "@/lib/auth-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    name: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const user = await register({
        username: form.username,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
        name: form.name || undefined,
      })
      if (user) {
        router.push("/dashboard")
      } else {
        setError("用户名或邮箱已被注册")
      }
    } catch {
      setError("注册失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">创建账号</CardTitle>
          <CardDescription>加入 YYC³ Enterprise Management System</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>注册失败</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input id="username" name="username" placeholder="设置用户名" value={form.username} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input id="password" name="password" type="password" placeholder="设置密码（至少6位）" value={form.password} onChange={handleChange} required minLength={6} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">手机号（可选）</Label>
              <Input id="phone" name="phone" type="tel" placeholder="13800138000" value={form.phone} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">姓名（可选）</Label>
              <Input id="name" name="name" placeholder="您的姓名" value={form.name} onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  注册中...
                </>
              ) : (
                "立即注册"
              )}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              已有账号？{" "}
              <Link href="/login" className="hover:underline">
                登录
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
