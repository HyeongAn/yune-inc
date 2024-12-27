import { v4 as uuidv4 } from "uuid"
import { useCallback, useEffect } from "react"
import type { DropResult } from "@hello-pangea/dnd"
import { useSetRecoilState, useRecoilState } from "recoil"
import { elementsState, selectedIdState } from "@/features/elements"
import { GroupElement, Elements } from "@/entities/element"

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

/**
 * 그룹 생성 훅
 * Shift + Ctrl(Command) + G 단축키로 동작
 */
export const useElementGroup = () => {
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdState)
  const [elements, setElements] = useRecoilState(elementsState)

  /**
   * 새로운 그룹 요소를 생성하는 함수.
   * 요소들을 감싸는 그룹핑 정보를 담았음.
   * @param selectedElements 그룹으로 만들 요소들의 배열
   */
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
      // Shift + Ctrl(Command) + G 단축키 감지 및 2개 이상 선택 확인.
      if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g" && selectedIds.length >= 2) {
        e.preventDefault()

        // 선택된 요소들을 찾아서 반환하는 재귀 함수
        const findSelectedElements = (elements: Elements, selectedIds: string[]): Elements => {
          const selected: Elements = []
          const usedIds = new Set<string>()

          const findElement = (elements: Elements) => {
            elements.forEach(element => {
              // 중복 선택 요소는 제외
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

        /**
         * 선택된 요소들을 제거하고 새 그룹이 들어갈 위치를 찾는 재귀 함수
         * @returns newElements: 선택된 요소가 제거된 새 배열
         * @returns insertIndex: 새 그룹이 삽입될 위치 인덱스
         */
        const removeSelectedElements = (
          elements: Elements,
          selectedIds: string[]
        ): {
          newElements: Elements
          insertIndex: number
        } => {
          let firstSelectedIndex = Infinity // 첫 번째 요소의 인덱스로 가장 큰 수 사용. 삽입될 인덱스의 앞쪽으로 정렬이 될 수 있도록함.

          const result = elements.filter((element, index) => {
            if (selectedIds.includes(element.id)) {
              firstSelectedIndex = Math.min(firstSelectedIndex, index) // 인덱스 최소값 갱신
              return false // 선택된 요소는 제거
            }

            // 그룹 요소일 경우, 하위 요소들을 재귀적으로 검사.
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

        // 실제 그룹화 로직 실행
        const selectedElements = findSelectedElements(elements, selectedIds)

        if (selectedElements.length >= 2) {
          // 선택된 id가 2개 이상일 경우 그룹화 실행
          const { newElements, insertIndex } = removeSelectedElements(elements, selectedIds) // 선택된 요소들을 제거하고 새 그룹이 들어갈 위치를 찾음.
          const groupElement = createGroup(selectedElements) // 새 그룹 요소 생성

          newElements.splice(insertIndex, 0, groupElement) // 새 그룹 요소 삽입
          setElements(newElements)
          setSelectedIds([]) // 선택 상태 초기화
        }
      }
    },
    [selectedIds, elements, setElements, setSelectedIds]
  )

  // 키보드 이벤트 리스너 등록 및 정리
  useEffect(() => {
    window.addEventListener("keydown", handleGroupElements)
    return () => {
      window.removeEventListener("keydown", handleGroupElements)
    }
  }, [handleGroupElements])
}

/**
 * dnd 처리 훅
 */
export const useElementDragAndDrop = (elements: Elements) => {
  const setElements = useSetRecoilState(elementsState)

  const handleDragEnd = (result: DropResult) => {
    // 영역이 넘어가면 dnd 실행하지 않음.
    if (!result.destination) return

    // sourceId는 droppableId.
    // droppableId는 처음 넣어준 'root' 또는 'group-${element.id}'
    const sourceId = result.source.droppableId.split("-")[0] // group인지, root인지 판별
    const sourceIndex = result.source.index

    // dnd 대상의 영역임. 드롭된 위치의 droppableId를 가져옴.
    const destinationId = result.destination.droppableId.split("-")[0]
    const destinationIndex = result.destination.index

    // group, root영역 간의 이동 허용하지 않기.
    if (sourceId !== destinationId) return

    // 최상위 root일 경우 dnd처리
    if (sourceId === "root") {
      const newElements = [...elements]
      const [removed] = newElements.splice(sourceIndex, 1) // 이동 요소 제거

      newElements.splice(destinationIndex, 0, removed) // 새위치에 삽입
      setElements(newElements)
      return
    }

    // 그룹 내부 dnd처리
    const updateElements = (elements: Elements): Elements => {
      return elements.map(element => {
        if (element.kind === "group") {
          const groupId = `group-${element.id}`

          // 현재 이동하는 그룹에서 드래그가 발생한 경우.
          if (groupId === result.source.droppableId) {
            const newChildren = [...element.children] // 그룹 내부 요소 복사
            const [removed] = newChildren.splice(sourceIndex, 1) // 이동 요소 제거

            newChildren.splice(destinationIndex, 0, removed) // 새위치에 삽입
            return { ...element, children: newChildren }
          }

          // 현재 이동하는 그룹에서 드래그가 발생한 경우가 아닐때, 하위 children을 재귀적으로 검사.
          const updatedChildren = updateElements(element.children)

          // 하위 children이 변경된 경우, 변경된 하위 children을 반환.
          if (updatedChildren !== element.children) {
            return { ...element, children: updatedChildren }
          }
        }
        return element
      })
    }

    setElements(updateElements(elements))
  }

  return { handleDragEnd }
}
