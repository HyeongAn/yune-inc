import { useRecoilState } from "recoil"
import { selectedIdState } from "./atoms"
import { elementsState, GroupElement, Elements } from "@/entities/element"
import { v4 as uuidv4 } from "uuid"
import { useCallback, useEffect } from "react"
export const useElementSelection = () => {
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdState)

  const handleSelect = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.shiftKey) {
      setSelectedIds(prev => {
        if (prev.includes(id)) {
          return prev.filter(selectedId => selectedId !== id)
        } else {
          return [...prev, id]
        }
      })
    } else {
      setSelectedIds([id])
    }
  }

  return {
    handleSelect,
    isSelected: (id: string) => selectedIds.includes(id),
    selectedIds,
  }
}

export const useElementGroup = () => {
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdState)
  const [elements, setElements] = useRecoilState(elementsState)

  const createGroup = (selectedElements: Elements): GroupElement => {
    return {
      id: uuidv4(),
      kind: "group",
      type: "div",
      color: "transparent",
      direction: "row",
      children: selectedElements,
    }
  }

  const handleGroupElements = useCallback(
    (e: KeyboardEvent) => {
      if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g" && selectedIds.length >= 2) {
        e.preventDefault()

        const findSelectedElements = (elements: Elements, selectedIds: string[]): Elements => {
          const selected: Elements = []
          const usedIds = new Set<string>()

          // 여기서 중복 id 엘리먼트 제거
          const findElement = (elements: Elements) => {
            elements.forEach(element => {
              if (selectedIds.includes(element.id) && !usedIds.has(element.id)) {
                selected.push(element)
                usedIds.add(element.id)
              } else if (element.kind === "group") {
                findElement(element.children)
              }
            })
          }

          findElement(elements)
          return selected
        }

        const removeSelectedElements = (
          elements: Elements,
          selectedIds: string[]
        ): {
          newElements: Elements
          insertIndex: number
        } => {
          let firstSelectedIndex = Infinity
          const result = elements.filter((element, index) => {
            if (selectedIds.includes(element.id)) {
              firstSelectedIndex = Math.min(firstSelectedIndex, index)
              return false
            }
            if (element.kind === "group") {
              return {
                ...element,
                children: removeSelectedElements(element.children, selectedIds).newElements,
              }
            }
            return true
          })

          return {
            newElements: result,
            insertIndex: firstSelectedIndex === Infinity ? result.length : firstSelectedIndex,
          }
        }

        const selectedElements = findSelectedElements(elements, selectedIds)
        if (selectedElements.length >= 2) {
          const { newElements, insertIndex } = removeSelectedElements(elements, selectedIds)
          const groupElement = createGroup(selectedElements)
          newElements.splice(insertIndex, 0, groupElement)
          setElements(newElements)
          setSelectedIds([])
        }
      }
    },
    [selectedIds, elements, setElements, setSelectedIds]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleGroupElements)
    return () => {
      window.removeEventListener("keydown", handleGroupElements)
    }
  }, [handleGroupElements])
}
