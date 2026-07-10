"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TreeNode as TreeNodeType } from "@/components/ui/tree"
import { Tree } from "@/components/ui/tree"
import { Loader2, Plus } from "lucide-react"
import type { Department } from "../types"

interface StructureTabProps {
  departments: Department[]
  isLoading: boolean
  setNewDepartment: (dept: any) => void
  setIsEditing: (editing: boolean) => void
  setEditingId: (id: string | null) => void
  setShowDepartmentDialog: (show: boolean) => void
  editDepartment: (id: string) => void
  confirmDelete: (id: string, type: "employee" | "department" | "position") => void
}

function buildTree(departments: Department[]): TreeNodeType[] {
  const map = new Map<string, TreeNodeType>()
  const roots: TreeNodeType[] = []

  departments.forEach((dept) => {
    map.set(dept.id, {
      id: dept.id,
      label: dept.name,
      children: [],
    })
  })

  departments.forEach((dept) => {
    const node = map.get(dept.id)!
    if (dept.parentId && map.has(dept.parentId)) {
      map.get(dept.parentId)!.children!.push(node)
    } else {
      roots.push(node)
    }
  })

  return roots
}

export function StructureTab({
  departments,
  isLoading,
  setNewDepartment,
  setIsEditing,
  setEditingId,
  setShowDepartmentDialog,
  editDepartment,
  confirmDelete,
}: StructureTabProps) {
  const treeData = buildTree(departments)

  const handleSelect = (node: TreeNodeType) => {
    editDepartment(node.id)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>组织架构</CardTitle>
        <Button
          onClick={() => {
            setNewDepartment({ name: "", managerId: "", parentId: "1" })
            setIsEditing(false)
            setEditingId(null)
            setShowDepartmentDialog(true)
          }}
          className="btn-3d"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加部门
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow">
            <Tree data={treeData} onSelect={handleSelect} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
