import { GroupElement } from "@/entities/element"
import { Elements, ElementLayout } from "@/features/elements"
import { memo } from "react"

export const ElementGroup = memo((element: GroupElement) => {
  return (
    <ElementLayout element={element}>
      <Elements elements={element.children} />
    </ElementLayout>
  )
})

ElementGroup.displayName = "ElementGroup"
