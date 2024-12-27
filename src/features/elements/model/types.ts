import type { Elements } from "@/entities/element"

export interface ElementsProps {
  elements: Elements
  parentDirection?: "row" | "col"
}
