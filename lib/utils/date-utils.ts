import { format, parseISO, differenceInDays, addDays, startOfMonth, endOfMonth, isSameDay as _isSameDay } from "date-fns"
import { zhCN } from "date-fns/locale"

export function formatDate(date: string | Date, fmt = "yyyy-MM-dd"): string {
  const d = typeof date === "string" ? parseISO(date) : date
  return format(d, fmt, { locale: zhCN })
}

export function formatTime(date: string | Date): string {
  return formatDate(date, "HH:mm:ss")
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, "yyyy-MM-dd HH:mm:ss")
}

export function isSameDay(a: string | Date, b: string | Date): boolean {
  const da = typeof a === "string" ? parseISO(a) : a
  const db = typeof b === "string" ? parseISO(b) : b
  return _isSameDay(da, db)
}

export function daysBetween(a: string | Date, b: string | Date): number {
  const da = typeof a === "string" ? parseISO(a) : a
  const db = typeof b === "string" ? parseISO(b) : b
  return differenceInDays(db, da)
}

export function addDaysTo(date: string | Date, days: number): Date {
  const d = typeof date === "string" ? parseISO(date) : date
  return addDays(d, days)
}

export function getMonthRange(date?: Date): { start: Date; end: Date } {
  const d = date || new Date()
  return { start: startOfMonth(d), end: endOfMonth(d) }
}

export function getRemainingTime(deadline: string | Date): string {
  const target = typeof deadline === "string" ? parseISO(deadline) : deadline
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return "已过期"
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  return days > 0 ? `${days}天${hours}小时` : `${hours}小时`
}
