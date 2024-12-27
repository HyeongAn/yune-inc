import { ElementType } from "@/entities/element"

export interface ElementHistoryButtonProps {
  element: ElementType
  index: number
  className?: string
  depth?: number
}
