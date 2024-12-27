import { Elements, ElementType, SingleElement } from "@/entities/element"
import { getRandomColor } from "@/shared/lib"
import { v4 as uuidv4 } from "uuid"

export const createElement = (type: "div" | "span" | "p"): SingleElement => {
  return {
    type,
    color: getRandomColor(),
    id: uuidv4(),
    kind: "element",
    direction: "row",
  }
}

export const addElement = (elements: Elements, element: ElementType): Elements => {
  return [...elements, element]
}
