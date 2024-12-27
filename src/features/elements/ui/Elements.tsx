import { memo } from "react"
import { useElementGroup } from "../model/hooks"
import { ElementsProps, ElementLayout, ElementGroup } from "@/features/elements"
import { Element } from "@/entities/element"

export const Elements = memo(({ elements }: ElementsProps) => {
  useElementGroup()

  return elements.map((element, index) => {
    if (element.kind === "group") {
      return <ElementGroup {...element} key={`${element.id}-${index}`} />
    }
    return (
      <ElementLayout element={element} key={`${element.id}-${index}`}>
        <Element {...element} />
      </ElementLayout>
    )
  })
})

Elements.displayName = "Elements"
