"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import type { Department, NewEmployee, Position } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

type EmployeeFormValues = z.infer<typeof employeeSchema>

const employeeSchema = z.object({
  name: z.string().min(2, { message: "姓名至少需要2个字符" }),
  role: z.string().min(1, { message: "请选择职位" }),
  department: z.string().min(1, { message: "请选择部门" }),
  email: z.string().email({ message: "请输入有效的电子邮件地址" }),
  phone: z.string().min(11, { message: "请输入有效的手机号码" }),
  joinDate: z.string().min(1, { message: "请选择入职日期" }),
})

interface EmployeeDialogProps {
  showEmployeeDialog: boolean
  setShowEmployeeDialog: (show: boolean) => void
  isEditing: boolean
  error: string | null
  newEmployee: NewEmployee
  setNewEmployee: (employee: NewEmployee) => void
  addEmployee: () => void
  isLoading: boolean
  departments: Department[]
  positions: Position[]
}

export function EmployeeDialog({
  showEmployeeDialog,
  setShowEmployeeDialog,
  isEditing,
  error,
  newEmployee,
  setNewEmployee,
  addEmployee,
  isLoading,
  departments,
  positions,
}: EmployeeDialogProps) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: newEmployee.name,
      role: newEmployee.role,
      department: newEmployee.department,
      email: newEmployee.email,
      phone: newEmployee.phone,
      joinDate: newEmployee.joinDate,
    },
  })

  const onSubmit = (values: EmployeeFormValues) => {
    setNewEmployee(values)
    addEmployee()
  }

  return (
    <Dialog open={showEmployeeDialog} onOpenChange={setShowEmployeeDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "编辑员工" : "添加新员工"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "修改员工信息，完成后点击保存。" : "填写新员工的详细信息，完成后点击添加。"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓名</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入员工姓名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>部门</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择部门" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>职位</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入职位名称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>电子邮件</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入电子邮件" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>手机号码</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入手机号码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="joinDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>入职日期</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEmployeeDialog(false)} disabled={isLoading}>
                取消
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    处理中...
                  </>
                ) : isEditing ? (
                  "保存"
                ) : (
                  "添加"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}