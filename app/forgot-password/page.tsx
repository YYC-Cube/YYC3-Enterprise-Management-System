"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    setStep(2)
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setError("密码长度至少6位")
      return
    }
    setIsLoading(true)
    setError("")
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    setStep(3)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">重置密码</CardTitle>
          <CardDescription>通过邮箱验证找回您的账号</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>错误</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">注册邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入您的注册邮箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />发送中...</> : "发送验证码"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                想起密码了？{" "}
                <Link href="/login" className="hover:underline">
                  返回登录
                </Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleReset} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>错误</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <p className="text-sm text-muted-foreground">
                验证码已发送至 <strong>{email}</strong>
              </p>
              <div className="space-y-2">
                <Label htmlFor="code">验证码</Label>
                <Input
                  id="code"
                  placeholder="请输入6位验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">新密码</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="设置新密码（至少6位）"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />重置中...</> : "确认重置"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                <button type="button" onClick={() => setStep(1)} className="hover:underline">
                  重新发送验证码
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <h3 className="text-lg font-semibold">密码重置成功</h3>
              <p className="text-muted-foreground">您的密码已成功重置，请使用新密码登录</p>
              <Button asChild className="w-full">
                <Link href="/login">返回登录</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
