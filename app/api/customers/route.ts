import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-static"

const MOCK_CUSTOMERS = [
  { id: 1, name: "陈明", company: "创新科技有限公司", email: "chenming@tech.com", phone: "13800138001", level: "VIP", status: "active", total_spent: 1580000, last_contact: "2025-05-28", created_at: "2025-01-05", updated_at: "2025-05-28" },
  { id: 2, name: "林小红", company: "宏达集团", email: "linxh@hongda.com", phone: "13800138002", level: "VIP", status: "active", total_spent: 1230000, last_contact: "2025-05-25", created_at: "2025-01-10", updated_at: "2025-05-25" },
  { id: 3, name: "黄伟", company: "盛世科技", email: "huangwei@shengshi.cn", phone: "13800138003", level: "普通", status: "active", total_spent: 450000, last_contact: "2025-05-20", created_at: "2025-02-15", updated_at: "2025-05-20" },
  { id: 4, name: "刘芳", company: "东方医药集团", email: "liufang@dongfang.com", phone: "13800138004", level: "VIP", status: "active", total_spent: 2100000, last_contact: "2025-06-01", created_at: "2025-01-20", updated_at: "2025-06-01" },
  { id: 5, name: "张强", company: "北方制造有限公司", email: "zhangqiang@beifang.com", phone: "13800138005", level: "普通", status: "active", total_spent: 320000, last_contact: "2025-05-15", created_at: "2025-03-01", updated_at: "2025-05-15" },
  { id: 6, name: "王丽", company: "南方贸易公司", email: "wangli@nanfang.cn", phone: "13800138006", level: "潜在", status: "active", total_spent: 85000, last_contact: "2025-05-10", created_at: "2025-04-01", updated_at: "2025-05-10" },
  { id: 7, name: "赵军", company: "西部建设集团", email: "zhaojun@xibu.com", phone: "13800138007", level: "普通", status: "active", total_spent: 560000, last_contact: "2025-05-30", created_at: "2025-02-20", updated_at: "2025-05-30" },
  { id: 8, name: "孙琦", company: "东海物流", email: "sunqi@donghai.com", phone: "13800138008", level: "普通", status: "inactive", total_spent: 280000, last_contact: "2025-04-01", created_at: "2025-03-15", updated_at: "2025-04-01" },
  { id: 9, name: "李娜", company: "星辰科技", email: "lina@xingchen.cn", phone: "13800138009", level: "VIP", status: "active", total_spent: 980000, last_contact: "2025-06-02", created_at: "2025-01-25", updated_at: "2025-06-02" },
  { id: 10, name: "周涛", company: "万里集团", email: "zhoutao@wanli.com", phone: "13800138010", level: "潜在", status: "active", total_spent: 45000, last_contact: "2025-05-22", created_at: "2025-05-01", updated_at: "2025-05-22" },
]

let customers = [...MOCK_CUSTOMERS]
let nextId = 11

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get("page") || "1")
  const limit = parseInt(url.searchParams.get("limit") || "10")
  const search = url.searchParams.get("search") || ""

  let filtered = customers
  if (search) {
    const s = search.toLowerCase()
    filtered = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.company.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s)
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
    const newCustomer = {
      id: nextId++,
      name: body.name || "",
      company: body.company || "",
      email: body.email || "",
      phone: body.phone || "",
      level: body.level || "潜在",
      status: "active",
      total_spent: body.total_spent || 0,
      last_contact: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0],
    }
    customers.unshift(newCustomer)
    return NextResponse.json({ success: true, data: newCustomer })
  } catch {
    return NextResponse.json({ success: false, error: "创建客户失败" }, { status: 400 })
  }
}