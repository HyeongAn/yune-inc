import { memo } from "react"
import { ElementLayout } from "@/features/elements"
import { ElementHistoryButtonProps } from "@/features/element-history"
import { Button } from "@/shared/ui"
import { cn } from "@/shared/lib"

export const ElementHistoryButton = memo(({ element, index, className, depth = 0 }: ElementHistoryButtonProps) => {
  switch (element.kind) {
    case "group":
      return (
        <div className="flex flex-col gap-2">
          <ElementLayout element={element} className={cn(className, "border-solid p-0")}>
            <Button>Group {index + depth}</Button>
          </ElementLayout>
          {element.children.map((childElement, childIndex) => (
            <ElementHistoryButton
              key={childElement.id}
              element={childElement}
              index={childIndex}
              className={className}
              depth={depth + index + 1}
            />
          ))}
        </div>
      )
    case "element":
      return (
        <ElementLayout element={element} className={cn(className)}>
          <Button>{element.type}</Button>
        </ElementLayout>
      )
  }
})
