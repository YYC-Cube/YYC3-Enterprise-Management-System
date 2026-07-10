import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, FileText, Calendar, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { sidebarVariants } from "@/utils/animation"

type SidebarProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <motion.div
      className="bg-gray-800 text-white"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="flex justify-end p-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
      <nav className="space-y-2 p-4">
        <SidebarItem href="/" icon={<Home />} text="首页" isOpen={isOpen} />
        <SidebarItem href="/documents" icon={<FileText />} text="文档管理" isOpen={isOpen} />
        <SidebarItem href="/calendar" icon={<Calendar />} text="日程安排" isOpen={isOpen} />
        <SidebarItem href="/users" icon={<Users />} text="用户管理" isOpen={isOpen} />
        <SidebarItem href="/settings" icon={<Settings />} text="设置" isOpen={isOpen} />
      </nav>
    </motion.div>
  )
}

type SidebarItemProps = {
  href: string
  icon: React.ReactNode
  text: string
  isOpen: boolean
}

function SidebarItem({ href, icon, text, isOpen }: SidebarItemProps) {
  return (
    <motion.div
      className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={href} className="flex items-center w-full">
        <div className="mr-2">{icon}</div>
        <motion.span
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap overflow-hidden"
        >
          {text}
        </motion.span>
      </Link>
    </motion.div>
  )
}
