import { cn } from "@/shared/lib"
import { AlignmentControls, ElementCreator } from "@/features/element-controller"

export const Sidebar = () => {
  return (
    <aside className={cn("h-full w-[340px] flex-shrink-0 bg-gray-900 p-2")}>
      <AlignmentControls />
      <ElementCreator />
    </aside>
  )
}
