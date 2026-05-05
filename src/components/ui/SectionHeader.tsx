import { cn } from '@/lib/utils'

type Props = {
  tag: string
  title: React.ReactNode
  center?: boolean
  className?: string
}

export default function SectionHeader({ tag, title, center, className }: Props) {
  return (
    <div className={cn(className)} style={center ? { textAlign: 'center' } : {}}>
      <p className="section-tag reveal" style={center ? { justifyContent: 'center' } : {}}>{tag}</p>
      <h2 className="section-title reveal">{title}</h2>
    </div>
  )
}
