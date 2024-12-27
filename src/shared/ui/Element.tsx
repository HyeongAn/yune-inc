import { memo } from "react"

type ElementType = {
  type: "div" | "span" | "p"
  color: string
}

export const Element = memo(({ type, color }: ElementType) => {
  const style = {
    backgroundColor: color,
  }

  const commonProps = {
    style,
    className: "w-[100px] h-[100px] shrink-0 inline-block",
  }

  switch (type) {
    case "div":
      return <div {...commonProps}>Div</div>
    case "span":
      return <span {...commonProps}>Span</span>
    case "p":
      return <p {...commonProps}>Paragraph</p>
  }
})

Element.displayName = "Element"
