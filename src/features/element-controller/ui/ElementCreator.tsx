import { useRecoilState } from "recoil"
import { addElement, createElement, elementsState } from "@/entities/element"
import { Button } from "@/shared/ui"
import { cn } from "@/shared/lib"

export const ElementCreator = () => {
  const setElements = useRecoilState(elementsState)[1]

  const handleAddElement = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elementType = e.currentTarget.id as "div" | "span" | "p"
    const newElement = createElement(elementType)
    setElements(prev => addElement(prev, newElement))
  }

  return (
    <section className={cn("flex flex-col gap-2")}>
      <h3 className={cn("text-white")}>Elements</h3>
      <Button id="div" onClick={handleAddElement}>
        Div
      </Button>
      <Button id="span" onClick={handleAddElement}>
        Span
      </Button>
      <Button id="p" onClick={handleAddElement}>
        Paragraph
      </Button>
    </section>
  )
}
