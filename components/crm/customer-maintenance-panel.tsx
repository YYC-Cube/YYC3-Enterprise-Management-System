"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Star, Gift } from "lucide-react"

export default function CustomerMaintenancePanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>客户运维</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vip">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vip">VIP客户</TabsTrigger>
            <TabsTrigger value="active">活跃客户</TabsTrigger>
            <TabsTrigger value="birthday">生日提醒</TabsTrigger>
            <TabsTrigger value="anniversary">纪念日</TabsTrigger>
          </TabsList>

          <TabsContent value="vip" className="space-y-4 mt-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>VIP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">VIP客户 {i}</h4>
                        <Badge className="bg-yellow-500">
                          <Star className="h-3 w-3 mr-1" />
                          VIP
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        累计消费 ¥{(i * 50000).toLocaleString()} | 最后消费 {i}天前
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4 mr-2" />
                        关怀
                      </Button>
                      <Button size="sm">
                        <Gift className="h-4 w-4 mr-2" />
                        赠礼
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active">
            <div className="text-center py-8 text-muted-foreground">活跃客户列表</div>
          </TabsContent>

          <TabsContent value="birthday">
            <div className="text-center py-8 text-muted-foreground">生日提醒列表</div>
          </TabsContent>

          <TabsContent value="anniversary">
            <div className="text-center py-8 text-muted-foreground">纪念日提醒列表</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
