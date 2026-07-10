"use client"
import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TreeNode { id: string; label: string; children?: TreeNode[] }
export interface TreeProps { data: TreeNode[]; className?: string; onSelect?: (node: TreeNode) => void }

function TreeNodeItem({ node, onSelect, level = 0 }: { node: TreeNode; onSelect?: (node: TreeNode) => void; level?: number }) {
  const [open, setOpen] = React.useState(false)
  const hasChildren = node.children && node.children.length > 0
  return (
    <div>
      <div className={cn("flex items-center gap-1 py-1 px-2 hover:bg-accent rounded cursor-pointer", level > 0 && "ml-4")}
        onClick={() => { if (hasChildren) setOpen(!open); onSelect?.(node) }}>
        {hasChildren && <ChevronRight className={cn("h-4 w-4 transition-transform", open && "rotate-90")} />}
        <span className="text-sm">{node.label}</span>
      </div>
      {open && hasChildren && node.children!.map(child => <TreeNodeItem key={child.id} node={child} onSelect={onSelect} level={level + 1} />)}
    </div>
  )
}

export function Tree({ data, className, onSelect }: TreeProps) {
  return <div className={cn("space-y-0.5", className)}>{data.map(node => <TreeNodeItem key={node.id} node={node} onSelect={onSelect} />)}</div>
}
