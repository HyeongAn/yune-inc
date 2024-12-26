import { ElementType } from "@/entities/element"
import { useElementSelection } from "../model/hooks"
import { cn } from "@/shared/lib"
import { memo, PropsWithChildren } from "react"

const ElementLayout = memo(({ children, element }: PropsWithChildren & { element: ElementType }) => {
  const { handleSelect, isSelected } = useElementSelection()

  return (
    <div
      onClick={handleSelect(element.id)}
      className={cn(
        "flex h-fit w-fit cursor-pointer flex-nowrap gap-2 border-2",
        element.kind === "element" ? "" : "border-dashed p-2",
        isSelected(element.id) ? "border-blue-500" : "border-gray-200",
        element.direction === "row" ? "flex-row" : "flex-col"
      )}
    >
      {children}
    </div>
  )
})

ElementLayout.displayName = "ElementLayout"

export default ElementLayout
