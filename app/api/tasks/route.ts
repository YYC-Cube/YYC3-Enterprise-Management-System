import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-static"

const MOCK_TASKS = [
  { id: 1, title: "完成Q2季度财务报告", description: "整理并提交第二季度财务数据汇总", assignee_id: 6, assignee_name: "孙七", project_id: 1, project_name: "财务系统升级", priority: "high", status: "in_progress", progress: 65, due_date: "2025-06-15", created_at: "2025-05-01", updated_at: "2025-06-01" },
  { id: 2, title: "客户满意度调查", description: "发起年度客户满意度在线调查", assignee_id: 2, assignee_name: "张三", project_id: 2, project_name: "CRM优化", priority: "medium", status: "in_progress", progress: 40, due_date: "2025-06-20", created_at: "2025-05-10", updated_at: "2025-05-28" },
  { id: 3, title: "新员工入职培训", description: "组织6月份新员工入职培训", assignee_id: 5, assignee_name: "赵六", project_id: null, project_name: null, priority: "medium", status: "completed", progress: 100, due_date: "2025-06-05", created_at: "2025-05-15", updated_at: "2025-06-05" },
  { id: 4, title: "系统安全审计", description: "执行季度系统安全审计检查", assignee_id: 1, assignee_name: "系统管理员", project_id: 3, project_name: "安全加固", priority: "urgent", status: "pending", progress: 0, due_date: "2025-06-10", created_at: "2025-06-01", updated_at: "2025-06-01" },
  { id: 5, title: "网站性能优化", description: "优化首页加载速度至3秒以内", assignee_id: 4, assignee_name: "王五", project_id: 4, project_name: "性能优化", priority: "high", status: "in_progress", progress: 30, due_date: "2025-06-25", created_at: "2025-05-20", updated_at: "2025-06-02" },
  { id: 6, title: "供应商合同续签", description: "完成年度供应商合同续签工作", assignee_id: 3, assignee_name: "李四", project_id: null, project_name: null, priority: "medium", status: "completed", progress: 100, due_date: "2025-05-30", created_at: "2025-05-01", updated_at: "2025-05-30" },
  { id: 7, title: "移动端适配方案设计", description: "制定企业应用移动端适配技术方案", assignee_id: 8, assignee_name: "吴九", project_id: 5, project_name: "移动平台", priority: "high", status: "pending", progress: 10, due_date: "2025-06-30", created_at: "2025-06-01", updated_at: "2025-06-03" },
  { id: 8, title: "数据备份检查", description: "验证所有数据库备份完整性", assignee_id: 1, assignee_name: "系统管理员", project_id: 3, project_name: "安全加固", priority: "low", status: "completed", progress: 100, due_date: "2025-05-31", created_at: "2025-05-25", updated_at: "2025-05-31" },
  { id: 9, title: "用户反馈整理", description: "汇总上个月用户反馈并分类", assignee_id: 2, assignee_name: "张三", project_id: null, project_name: null, priority: "low", status: "completed", progress: 100, due_date: "2025-06-05", created_at: "2025-05-25", updated_at: "2025-06-04" },
  { id: 10, title: "API文档编写", description: "为新增API接口编写技术文档", assignee_id: 10, assignee_name: "刘一", project_id: 5, project_name: "移动平台", priority: "medium", status: "in_progress", progress: 50, due_date: "2025-06-18", created_at: "2025-05-28", updated_at: "2025-06-03" },
  { id: 11, title: "销售目标拆解", description: "将Q3销售目标分解到各团队", assignee_id: 9, assignee_name: "郑十", project_id: null, project_name: null, priority: "high", status: "in_progress", progress: 25, due_date: "2025-06-12", created_at: "2025-06-01", updated_at: "2025-06-03" },
  { id: 12, title: "员工满意度调研", description: "开展半年度员工满意度匿名调研", assignee_id: 5, assignee_name: "赵六", project_id: null, project_name: null, priority: "medium", status: "cancelled", progress: 0, due_date: "2025-06-15", created_at: "2025-05-20", updated_at: "2025-06-01" },
]

let tasks = [...MOCK_TASKS]
let nextId = 13

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get("page") || "1")
  const limit = parseInt(url.searchParams.get("limit") || "20")
  const search = url.searchParams.get("search") || ""
  const status = url.searchParams.get("status") || ""

  let filtered = tasks
  if (search) {
    const s = search.toLowerCase()
    filtered = filtered.filter((t) => t.title.toLowerCase().includes(s))
  }
  if (status) {
    filtered = filtered.filter((t) => t.status === status)
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
    const newTask = {
      id: nextId++,
      title: body.title || "",
      description: body.description || "",
      assignee_id: body.assignee_id || 0,
      assignee_name: body.assignee_name || "",
      project_id: body.project_id || null,
      project_name: body.project_name || null,
      priority: body.priority || "medium",
      status: "pending",
      progress: 0,
      due_date: body.due_date || "",
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0],
    }
    tasks.unshift(newTask)
    return NextResponse.json({ success: true, data: newTask })
  } catch {
    return NextResponse.json({ success: false, error: "创建任务失败" }, { status: 400 })
  }
}