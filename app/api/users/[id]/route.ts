import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-static"

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    return NextResponse.json({ success: true, data: { id: parseInt(id), ...body } })
  } catch {
    return NextResponse.json({ success: false, error: "更新用户失败" }, { status: 400 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return NextResponse.json({ success: true, data: { id: parseInt(id) } })
}
