"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Award } from "lucide-react"

export default function CustomerUpgradePanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          客户提档
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">成交客户自动提档，VIP客户智能识别</p>
          <Button>查看提档规则</Button>
        </div>
      </CardContent>
    </Card>
  )
}
