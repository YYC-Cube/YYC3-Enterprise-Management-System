import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-static"

const MOCK_PROJECTS = [
  { id: 1, name: "财务系统升级", description: "升级现有财务系统到最新版本，提升处理效率", manager_id: 6, manager_name: "孙七", status: "in_progress", progress: 65, budget: 500000, start_date: "2025-03-01", end_date: "2025-07-31", created_at: "2025-02-15", updated_at: "2025-06-01" },
  { id: 2, name: "CRM优化", description: "客户关系管理系统功能增强和界面优化", manager_id: 2, manager_name: "张三", status: "in_progress", progress: 40, budget: 300000, start_date: "2025-04-01", end_date: "2025-08-31", created_at: "2025-03-15", updated_at: "2025-05-28" },
  { id: 3, name: "安全加固", description: "全面安全审计和系统加固项目", manager_id: 1, manager_name: "系统管理员", status: "in_progress", progress: 25, budget: 800000, start_date: "2025-05-01", end_date: "2025-09-30", created_at: "2025-04-15", updated_at: "2025-06-01" },
  { id: 4, name: "性能优化", description: "核心系统性能优化，目标响应时间降低50%", manager_id: 4, manager_name: "王五", status: "in_progress", progress: 30, budget: 200000, start_date: "2025-05-15", end_date: "2025-08-15", created_at: "2025-05-01", updated_at: "2025-06-02" },
  { id: 5, name: "移动平台", description: "企业移动办公平台开发", manager_id: 10, manager_name: "刘一", status: "planning", progress: 10, budget: 1500000, start_date: "2025-06-01", end_date: "2025-12-31", created_at: "2025-05-20", updated_at: "2025-06-03" },
  { id: 6, name: "数据中台建设", description: "构建企业统一数据中台", manager_id: 1, manager_name: "系统管理员", status: "planning", progress: 5, budget: 2000000, start_date: "2025-07-01", end_date: "2026-03-31", created_at: "2025-06-01", updated_at: "2025-06-01" },
  { id: 7, name: "智能客服系统", description: "AI驱动的智能客服系统实施", manager_id: 2, manager_name: "张三", status: "completed", progress: 100, budget: 600000, start_date: "2025-01-01", end_date: "2025-05-31", created_at: "2024-12-15", updated_at: "2025-05-31" },
  { id: 8, name: "ERP集成", description: "ERP系统与现有平台深度集成", manager_id: 3, manager_name: "李四", status: "on_hold", progress: 55, budget: 1200000, start_date: "2025-02-01", end_date: "2025-09-30", created_at: "2025-01-15", updated_at: "2025-05-01" },
]

let projects = [...MOCK_PROJECTS]
let nextId = 9

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get("page") || "1")
  const limit = parseInt(url.searchParams.get("limit") || "10")
  const search = url.searchParams.get("search") || ""
  const status = url.searchParams.get("status") || ""

  let filtered = projects
  if (search) {
    const s = search.toLowerCase()
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(s))
  }
  if (status) {
    filtered = filtered.filter((p) => p.status === status)
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  const data = filtered.slice(start, start + limit)

  return NextResponse.json({
    success: true,
    data,
    pagination: { page, limit, total, totalPages },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newProject = {
      id: nextId++,
      name: body.name || "",
      description: body.description || "",
      manager_id: body.manager_id || 0,
      manager_name: body.manager_name || "",
      status: "planning",
      progress: 0,
      budget: body.budget || 0,
      start_date: body.start_date || new Date().toISOString().split("T")[0],
      end_date: body.end_date || "",
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0],
    }
    projects.unshift(newProject)
    return NextResponse.json({ success: true, data: newProject })
  } catch {
    return NextResponse.json({ success: false, error: "创建项目失败" }, { status: 400 })
  }
}