export interface BaseElement {
  id: string
  type: "div" | "span" | "p"
  color: string
  direction: "row" | "col"
}

export interface SingleElement extends BaseElement {
  kind: "element"
}

export interface GroupElement extends BaseElement {
  kind: "group"
  children: Elements
}

export type Elements = (SingleElement | GroupElement)[]
export type ElementType = SingleElement | GroupElement
