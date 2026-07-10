"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building2, Users, Plus, Settings } from "lucide-react"

export default function OrganizationStructure() {
  const departments = [
    {
      id: 1,
      name: "销售部",
      manager: "张经理",
      members: 12,
      performance: 92,
      children: [
        { name: "销售一组", members: 6, leader: "李组长" },
        { name: "销售二组", members: 6, leader: "王组长" },
      ],
    },
    {
      id: 2,
      name: "客服部",
      manager: "刘经理",
      members: 8,
      performance: 88,
      children: [],
    },
    {
      id: 3,
      name: "运营部",
      manager: "陈经理",
      members: 10,
      performance: 85,
      children: [],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              组织架构
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                管理权限
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                新增部门
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departments.map((dept) => (
              <Card key={dept.id} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{dept.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{dept.name}</h3>
                        <p className="text-sm text-muted-foreground">负责人：{dept.manager}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="mb-2">绩效 {dept.performance}分</Badge>
                      <div className="text-sm text-muted-foreground">
                        <Users className="h-4 w-4 inline mr-1" />
                        {dept.members} 人
                      </div>
                    </div>
                  </div>

                  {dept.children.length > 0 && (
                    <div className="ml-8 space-y-2 border-l-2 border-muted pl-4">
                      {dept.children.map((child, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2">
                          <div>
                            <span className="font-medium">{child.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">· {child.leader}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{child.members} 人</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
