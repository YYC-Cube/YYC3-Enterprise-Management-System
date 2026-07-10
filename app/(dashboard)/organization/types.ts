export interface Department {
  id: string
  name: string
  parentId: string | null
  level: number
  managerId: string | null
  description: string
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface Employee {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  joinDate: string
  status: "active" | "inactive"
}

export interface Position {
  id: string
  title: string
  department: string
  level: string
  responsibilities: string[]
  requirements: string[]
}

export interface ItemToDelete {
  id: string
  name: string
  type: "department" | "employee" | "position"
}

export interface NewEmployee {
  name: string
  role: string
  department: string
  email: string
  phone: string
  joinDate: string
}

export interface NewDepartment {
  name: string
  parentId: string | null
  managerId: string | null
  description: string
  status: "active" | "inactive"
}
