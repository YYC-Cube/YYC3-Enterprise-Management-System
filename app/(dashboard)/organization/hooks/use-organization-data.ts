"use client"

import { useEffect, useState } from "react"
import type { Department, Employee, ItemToDelete, NewDepartment, Position } from "../types"

type UseOrganizationDataProps = {
  toast: any
  setError: (error: string | null) => void
}

export function useOrganizationData({ toast, setError }: UseOrganizationDataProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [employees, setEmployees] = useState<Employee[]>([
    { id: "1", name: "张三", role: "总经理", department: "管理层", email: "zhangsan@example.com", phone: "13800138001", joinDate: "2020-01-15", status: "active" },
    { id: "2", name: "李四", role: "销售主管", department: "销售部", email: "lisi@example.com", phone: "13800138002", joinDate: "2020-03-10", status: "active" },
    { id: "3", name: "王五", role: "技术主管", department: "技术部", email: "wangwu@example.com", phone: "13800138003", joinDate: "2020-02-20", status: "active" },
    { id: "4", name: "赵六", role: "市场专员", department: "市场部", email: "zhaoliu@example.com", phone: "13800138004", joinDate: "2021-05-15", status: "inactive" },
    { id: "5", name: "钱七", role: "人事主管", department: "人事部", email: "qianqi@example.com", phone: "13800138005", joinDate: "2020-06-18", status: "active" },
  ])

  const [departments, setDepartments] = useState<Department[]>([
    { id: "1", name: "公司总部", parentId: null, level: 0, managerId: "1", description: "集团总部", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
    { id: "2", name: "管理层", parentId: "1", level: 1, managerId: "1", description: "公司管理层", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
    { id: "3", name: "销售部", parentId: "1", level: 1, managerId: "2", description: "负责公司产品销售", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
    { id: "4", name: "技术部", parentId: "1", level: 1, managerId: "3", description: "负责技术研发", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
    { id: "5", name: "市场部", parentId: "1", level: 1, managerId: null, description: "负责市场推广", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
    { id: "6", name: "人事部", parentId: "1", level: 1, managerId: "5", description: "负责人力资源管理", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
    { id: "7", name: "国内销售组", parentId: "3", level: 2, managerId: null, description: "国内销售业务", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
    { id: "8", name: "国际销售组", parentId: "3", level: 2, managerId: null, description: "国际销售业务", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
    { id: "9", name: "前端开发组", parentId: "4", level: 2, managerId: null, description: "前端技术开发", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
    { id: "10", name: "后端开发组", parentId: "4", level: 2, managerId: null, description: "后端技术开发", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
    { id: "11", name: "测试组", parentId: "4", level: 2, managerId: null, description: "质量保证与测试", status: "active", createdAt: "2020-01-01", updatedAt: "2025-01-01" },
  ])

  const [positions, setPositions] = useState<Position[]>([
    { id: "1", title: "总经理", department: "管理层", level: "高级", responsibilities: ["负责公司整体运营", "制定公司战略", "管理各部门负责人"], requirements: ["10年以上管理经验", "MBA或相关学位", "优秀的领导能力"] },
    { id: "2", title: "销售主管", department: "销售部", level: "中级", responsibilities: ["管理销售团队", "制定销售策略", "达成销售目标"], requirements: ["5年以上销售经验", "优秀的沟通能力", "团队管理经验"] },
    { id: "3", title: "技术主管", department: "技术部", level: "中级", responsibilities: ["管理技术团队", "制定技术方案", "保证项目质量"], requirements: ["5年以上技术经验", "精通相关技术栈", "项目管理经验"] },
    { id: "4", title: "市场专员", department: "市场部", level: "初级", responsibilities: ["执行市场活动", "分析市场数据", "撰写市场报告"], requirements: ["市场营销相关学位", "良好的数据分析能力", "优秀的写作能力"] },
    { id: "5", title: "人事主管", department: "人事部", level: "中级", responsibilities: ["管理招聘流程", "员工培训与发展", "绩效管理"], requirements: ["人力资源管理相关经验", "熟悉劳动法规", "优秀的人际交往能力"] },
  ])

  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id" | "status">>({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    joinDate: "",
  })

  const [newDepartment, setNewDepartment] = useState<NewDepartment>({
    name: "",
    parentId: null,
    managerId: null,
    description: "",
    status: "active",
  })

  const [newPosition, setNewPosition] = useState<Omit<Position, "id" | "responsibilities" | "requirements">>({
    title: "",
    department: "",
    level: "",
  })

  const [newResponsibility, setNewResponsibility] = useState("")
  const [newRequirement, setNewRequirement] = useState("")
  const [tempResponsibilities, setTempResponsibilities] = useState<string[]>([])
  const [tempRequirements, setTempRequirements] = useState<string[]>([])

  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false)
  const [showDepartmentDialog, setShowDepartmentDialog] = useState(false)
  const [showPositionDialog, setShowPositionDialog] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete>({ id: "", name: "", type: "employee" })

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => { setIsLoading(false) }, 800)
    return () => clearTimeout(timer)
  }, [])

  const addEmployee = () => {
    setError(null)
    if (!newEmployee.name.trim()) { setError("请输入员工姓名"); return }
    if (!newEmployee.role) { setError("请选择员工角色"); return }
    if (!newEmployee.department) { setError("请选择所属部门"); return }
    if (!newEmployee.email) { setError("请输入电子邮箱"); return }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newEmployee.email)) { setError("请输入有效的电子邮箱"); return }

    setIsLoading(true)
    setTimeout(() => {
      if (isEditing && editingId) {
        setEmployees(employees.map((emp) => emp.id === editingId ? { ...newEmployee, id: editingId, status: emp.status } : emp))
        toast({ title: "更新成功", description: `员工 ${newEmployee.name} 的信息已更新` })
      } else {
        const newId = String(employees.length + 1)
        setEmployees([...employees, { ...newEmployee, id: newId, status: "active" }])
        toast({ title: "添加成功", description: `员工 ${newEmployee.name} 已添加到系统` })
      }
      setNewEmployee({ name: "", role: "", department: "", email: "", phone: "", joinDate: "" })
      setShowEmployeeDialog(false)
      setIsEditing(false)
      setEditingId(null)
      setIsLoading(false)
    }, 800)
  }

  const addDepartment = () => {
    setError(null)
    if (!newDepartment.name.trim()) { setError("请输入部门名称"); return }
    if (!newDepartment.parentId) { setError("请选择上级部门"); return }

    setIsLoading(true)
    setTimeout(() => {
      if (isEditing && editingId) {
        setDepartments(departments.map((dept) =>
          dept.id === editingId ? { ...dept, ...newDepartment, updatedAt: new Date().toISOString().split("T")[0] } : dept
        ))
        toast({ title: "更新成功", description: `部门 ${newDepartment.name} 的信息已更新` })
      } else {
        const maxId = Math.max(...departments.map((d) => Number(d.id)), 0)
        const parent = departments.find((d) => d.id === newDepartment.parentId)
        const newDept: Department = {
          id: String(maxId + 1),
          name: newDepartment.name,
          parentId: newDepartment.parentId,
          level: (parent?.level ?? 0) + 1,
          managerId: newDepartment.managerId,
          description: newDepartment.description,
          status: "active",
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        }
        setDepartments([...departments, newDept])
        toast({ title: "添加成功", description: `部门 ${newDepartment.name} 已添加到系统` })
      }
      setNewDepartment({ name: "", parentId: null, managerId: null, description: "", status: "active" })
      setShowDepartmentDialog(false)
      setIsEditing(false)
      setEditingId(null)
      setIsLoading(false)
    }, 800)
  }

  const addPosition = () => {
    setError(null)
    if (!newPosition.title.trim()) { setError("请输入职位名称"); return }
    if (!newPosition.department) { setError("请选择所属部门"); return }
    if (!newPosition.level) { setError("请选择职级"); return }
    if (tempResponsibilities.length === 0) { setError("请至少添加一项职责"); return }
    if (tempRequirements.length === 0) { setError("请至少添加一项要求"); return }

    setIsLoading(true)
    setTimeout(() => {
      if (isEditing && editingId) {
        setPositions(positions.map((pos) =>
          pos.id === editingId ? { ...pos, ...newPosition, responsibilities: tempResponsibilities, requirements: tempRequirements } : pos
        ))
        toast({ title: "更新成功", description: `职位 ${newPosition.title} 的信息已更新` })
      } else {
        const newId = String(positions.length + 1)
        setPositions([...positions, { id: newId, title: newPosition.title, department: newPosition.department, level: newPosition.level, responsibilities: tempResponsibilities, requirements: tempRequirements }])
        toast({ title: "添加成功", description: `职位 ${newPosition.title} 已添加到系统` })
      }
      setNewPosition({ title: "", department: "", level: "" })
      setTempResponsibilities([])
      setTempRequirements([])
      setNewResponsibility("")
      setNewRequirement("")
      setShowPositionDialog(false)
      setIsEditing(false)
      setEditingId(null)
      setIsLoading(false)
    }, 800)
  }

  const editEmployee = (id: string) => {
    const emp = employees.find((e) => e.id === id)
    if (emp) {
      setNewEmployee({ name: emp.name, role: emp.role, department: emp.department, email: emp.email, phone: emp.phone, joinDate: emp.joinDate })
      setIsEditing(true)
      setEditingId(id)
      setShowEmployeeDialog(true)
    }
  }

  const editDepartment = (id: string) => {
    const dept = departments.find((d) => d.id === id)
    if (dept) {
      setNewDepartment({ name: dept.name, parentId: dept.parentId ?? null, managerId: dept.managerId, description: dept.description, status: dept.status })
      setIsEditing(true)
      setEditingId(id)
      setShowDepartmentDialog(true)
    }
  }

  const editPosition = (id: string) => {
    const pos = positions.find((p) => p.id === id)
    if (pos) {
      setNewPosition({ title: pos.title, department: pos.department, level: pos.level })
      setTempResponsibilities(pos.responsibilities)
      setTempRequirements(pos.requirements)
      setIsEditing(true)
      setEditingId(id)
      setShowPositionDialog(true)
    }
  }

  const confirmDelete = (id: string, type: "employee" | "department" | "position") => {
    let name = ""
    if (type === "employee") name = employees.find((e) => e.id === id)?.name ?? ""
    else if (type === "department") name = departments.find((d) => d.id === id)?.name ?? ""
    else name = positions.find((p) => p.id === id)?.title ?? ""
    setItemToDelete({ id, name, type })
    setShowDeleteConfirm(true)
  }

  const handleDelete = () => {
    if (!itemToDelete) return
    setIsLoading(true)
    setTimeout(() => {
      switch (itemToDelete.type) {
        case "employee":
          setEmployees(employees.filter((emp) => emp.id !== itemToDelete.id))
          toast({ title: "删除成功", description: "员工已从系统中删除" })
          break
        case "department":
          setDepartments(departments.filter((d) => d.id !== itemToDelete.id))
          toast({ title: "删除成功", description: "部门已从系统中删除" })
          break
        case "position":
          setPositions(positions.filter((p) => p.id !== itemToDelete.id))
          toast({ title: "删除成功", description: "职位已从系统中删除" })
          break
      }
      setShowDeleteConfirm(false)
      setItemToDelete({ id: "", name: "", type: "employee" })
      setIsLoading(false)
    }, 800)
  }

  const getAllDepartmentIds = (): string[] => departments.map((d) => d.id)

  const getAllDepartments = (): { id: string; name: string }[] => {
    return departments.map((dept) => ({
      id: dept.id,
      name: dept.name,
    }))
  }

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setTempResponsibilities([...tempResponsibilities, newResponsibility.trim()])
      setNewResponsibility("")
    }
  }

  const removeResponsibility = (index: number) => {
    setTempResponsibilities(tempResponsibilities.filter((_, i) => i !== index))
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setTempRequirements([...tempRequirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setTempRequirements(tempRequirements.filter((_, i) => i !== index))
  }

  const toggleEmployeeStatus = (id: string) => {
    setEmployees(employees.map((emp) => emp.id === id ? { ...emp, status: emp.status === "active" ? "inactive" : "active" } : emp))
    const emp = employees.find((e) => e.id === id)
    if (emp) toast({ title: "状态已更新", description: `员工 ${emp.name} 的状态已更改为 ${emp.status === "active" ? "非活跃" : "活跃"}` })
  }

  return {
    employees, departments, positions, isLoading,
    newEmployee, setNewEmployee,
    newDepartment, setNewDepartment,
    newPosition, setNewPosition,
    tempResponsibilities, setTempResponsibilities,
    tempRequirements, setTempRequirements,
    newResponsibility, setNewResponsibility,
    newRequirement, setNewRequirement,
    showEmployeeDialog, setShowEmployeeDialog,
    showDepartmentDialog, setShowDepartmentDialog,
    showPositionDialog, setShowPositionDialog,
    isEditing, setIsEditing,
    editingId, setEditingId,
    showDeleteConfirm, setShowDeleteConfirm,
    itemToDelete, setItemToDelete,
    addEmployee, addDepartment, addPosition,
    editEmployee, editDepartment, editPosition,
    confirmDelete, handleDelete,
    getAllDepartmentIds, getAllDepartments,
    addResponsibility, removeResponsibility,
    addRequirement, removeRequirement,
    toggleEmployeeStatus,
  }
}
