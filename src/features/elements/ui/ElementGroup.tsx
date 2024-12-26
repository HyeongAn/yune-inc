import { GroupElement } from "@/entities/element"
import { Elements } from "./Elements"
import ElementLayout from "./ElementLayout"
import { memo } from "react"

const ElementGroup = memo((element: GroupElement) => {
  return (
    <ElementLayout element={element}>
      <Elements elements={element.children} />
    </ElementLayout>
  )
})

ElementGroup.displayName = "ElementGroup"

export default ElementGroup
