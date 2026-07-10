"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { login } from "@/lib/auth-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const user = await login(identifier, password)
      if (user) {
        router.push("/dashboard")
      } else {
        setError("用户名或密码错误")
      }
    } catch {
      setError("登录失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">言启象限 · 语枢未来</CardTitle>
          <CardDescription>YYC³ Enterprise Management System 管理平台</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>登录失败</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="identifier">账号</Label>
              <Input
                id="identifier"
                placeholder="邮箱 / 用户名 / 手机号"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  登录中...
                </>
              ) : (
                "登录"
              )}
            </Button>
            <div className="flex justify-between text-sm text-muted-foreground">
              <Link href="/forgot-password" className="hover:underline">
                忘记密码？
              </Link>
              <Link href="/register" className="hover:underline">
                注册账号
              </Link>
            </div>
          </form>
          <div className="mt-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
            <p className="font-medium mb-2">演示账号：</p>
            <p>管理员：admin@yanyu.cloud / admin123</p>
            <p>经理：manager@yanyu.cloud / manager123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
