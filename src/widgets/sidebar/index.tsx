import { cn } from "@/shared/lib"
import { AlignmentControls, ElementCreator } from "@/features/element-controller"
import { ElementHistory } from "@/features/element-history"
export const Sidebar = () => {
  return (
    <aside className={cn("flex h-full w-[340px] flex-shrink-0 flex-col gap-2 bg-gray-900 p-2")}>
      <AlignmentControls />
      <ElementCreator />
      <ElementHistory />
    </aside>
  )
}

// todo: 선택한 그룹 direction 변경
