import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-static"

const MOCK_USERS = [
  { id: 1, username: "admin", email: "admin@yyc3.com", real_name: "系统管理员", role: "admin", department: "技术部", status: "active", created_at: "2025-01-15", updated_at: "2025-06-01" },
  { id: 2, username: "zhangsan", email: "zhangsan@yyc3.com", real_name: "张三", role: "manager", department: "市场部", status: "active", created_at: "2025-02-10", updated_at: "2025-05-20" },
  { id: 3, username: "lisi", email: "lisi@yyc3.com", real_name: "李四", role: "manager", department: "销售部", status: "active", created_at: "2025-02-15", updated_at: "2025-05-18" },
  { id: 4, username: "wangwu", email: "wangwu@yyc3.com", real_name: "王五", role: "user", department: "技术部", status: "active", created_at: "2025-03-01", updated_at: "2025-06-01" },
  { id: 5, username: "zhaoliu", email: "zhaoliu@yyc3.com", real_name: "赵六", role: "user", department: "人事部", status: "active", created_at: "2025-03-15", updated_at: "2025-05-30" },
  { id: 6, username: "sunqi", email: "sunqi@yyc3.com", real_name: "孙七", role: "user", department: "财务部", status: "active", created_at: "2025-04-01", updated_at: "2025-06-01" },
  { id: 7, username: "zhouba", email: "zhouba@yyc3.com", real_name: "周八", role: "user", department: "市场部", status: "inactive", created_at: "2025-04-15", updated_at: "2025-05-01" },
  { id: 8, username: "wujiu", email: "wujiu@yyc3.com", real_name: "吴九", role: "user", department: "技术部", status: "active", created_at: "2025-05-01", updated_at: "2025-06-01" },
  { id: 9, username: "zhengshi", email: "zhengshi@yyc3.com", real_name: "郑十", role: "user", department: "销售部", status: "active", created_at: "2025-05-15", updated_at: "2025-06-01" },
  { id: 10, username: "liuyi", email: "liuyi@yyc3.com", real_name: "刘一", role: "manager", department: "研发部", status: "active", created_at: "2025-01-20", updated_at: "2025-06-01" },
]

let users = [...MOCK_USERS]
let nextId = 11

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get("page") || "1")
  const limit = parseInt(url.searchParams.get("limit") || "10")
  const search = url.searchParams.get("search") || ""

  let filtered = users
  if (search) {
    const s = search.toLowerCase()
    filtered = users.filter(
      (u) =>
        u.username.toLowerCase().includes(s) ||
        u.real_name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s)
    )
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
    const newUser = {
      id: nextId++,
      username: body.username || "",
      email: body.email || "",
      real_name: body.real_name || body.name || "",
      role: body.role || "user",
      department: body.department || "",
      status: "active",
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0],
    }
    users.unshift(newUser)
    return NextResponse.json({ success: true, data: newUser })
  } catch {
    return NextResponse.json({ success: false, error: "创建用户失败" }, { status: 400 })
  }
}