import { memo } from "react"
import { useRecoilValue } from "recoil"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import {
  ElementsProps,
  ElementLayout,
  ElementGroup,
  useElementGroup,
  directionState,
  useElementDragAndDrop,
  Element,
} from "@/features/elements"
import { cn } from "@/shared/lib"

export const Elements = memo(({ elements, parentDirection }: ElementsProps) => {
  const direction = useRecoilValue(directionState)
  const currentDirection = parentDirection || direction
  const { handleDragEnd } = useElementDragAndDrop(elements)

  // 그룹 생성 hook
  useElementGroup()

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="root" type="ROOT" direction={currentDirection === "row" ? "horizontal" : "vertical"}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn("flex h-fit w-fit flex-nowrap gap-2", currentDirection === "row" ? "flex-row" : "flex-col")}
          >
            {elements.map((element, index) => (
              <Draggable key={element.id} draggableId={element.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.7 : 1,
                    }}
                  >
                    {element.kind === "group" ? (
                      <ElementGroup {...element} />
                    ) : (
                      <ElementLayout element={element}>
                        <Element {...element} />
                      </ElementLayout>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
})

Elements.displayName = "Elements"
