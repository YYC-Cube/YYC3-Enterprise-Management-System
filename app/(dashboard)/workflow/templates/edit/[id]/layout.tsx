import { ReactNode } from 'react'

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

export default function TemplateEditLayout({ children }: { children: ReactNode }) {
  return children
}
