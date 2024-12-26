import { Element } from "@/entities/element"
import { ElementsProps } from "@/features/elements"
import ElementGroup from "./ElementGroup"

import ElementLayout from "./ElementLayout"
import { memo } from "react"
import { useElementGroup } from "../model/hooks"

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
