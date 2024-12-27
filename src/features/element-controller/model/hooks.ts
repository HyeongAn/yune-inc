import { Elements } from "@/entities/element"
import { selectedIdState, elementsState } from "@/features/elements"
import { useRecoilState } from "recoil"

export const useGroupAlign = () => {
  const [elements, setElements] = useRecoilState(elementsState)
  const [selectedIds] = useRecoilState(selectedIdState)

  const updateElement = (elements: Elements, targetId: string, direction: "row" | "col"): Elements => {
    return elements.map(element => {
      if (element.id === targetId) {
        return { ...element, direction }
      }

      if (element.kind === "group") {
        return {
          ...element,
          children: updateElement(element.children, targetId, direction),
        }
      }

      return element
    })
  }

  const alignHandler = (direction: "row" | "col") => {
    if (selectedIds.length === 0) return

    let updatedElements = [...elements]

    selectedIds.forEach(id => {
      updatedElements = updateElement(updatedElements, id, direction)
    })

    setElements(updatedElements)
  }

  return {
    alignHandler,
  }
}
