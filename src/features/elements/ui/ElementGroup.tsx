import { memo } from "react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import { GroupElement } from "@/entities/element"
import { ElementLayout, Element } from "@/features/elements"
import { cn } from "@/shared/lib"

export const ElementGroup = memo((element: GroupElement) => {
  return (
    <ElementLayout element={element}>
      <Droppable
        droppableId={`group-${element.id}`}
        direction={element.direction === "row" ? "horizontal" : "vertical"}
        type={`GROUP-${element.id}`}
      >
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn("flex flex-nowrap gap-2", element.direction === "row" ? "flex-row" : "flex-col")}
          >
            {element.children.map((child, index) => (
              <Draggable key={child.id} draggableId={child.id} index={index}>
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
                    {child.kind === "group" ? (
                      <ElementGroup {...child} />
                    ) : (
                      <ElementLayout element={child}>
                        <Element {...child} />
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
    </ElementLayout>
  )
})

ElementGroup.displayName = "ElementGroup"
