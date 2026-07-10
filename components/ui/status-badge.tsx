"use client"
import { Badge } from "@/components/ui/badge"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "活跃", variant: "default" },
  inactive: { label: "非活跃", variant: "secondary" },
  pending: { label: "待处理", variant: "outline" },
  completed: { label: "已完成", variant: "default" },
  cancelled: { label: "已取消", variant: "destructive" },
  draft: { label: "草稿", variant: "secondary" },
  approved: { label: "已批准", variant: "default" },
  rejected: { label: "已拒绝", variant: "destructive" },
}

interface StatusBadgeProps { status: string; className?: string }

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: "secondary" as const }
  return <Badge variant={config.variant} className={className}>{config.label}</Badge>
}
