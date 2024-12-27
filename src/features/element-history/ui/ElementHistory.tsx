import { useRecoilValue } from "recoil"
import { ElementHistoryButton } from "@/features/element-history"
import { elementsState } from "@/features/elements"

export const ElementHistory = () => {
  const elements = useRecoilValue(elementsState)

  return (
    <div className="flex w-full flex-col gap-2">
      {elements.map((element, index) => (
        <ElementHistoryButton key={element.id} element={element} index={index} className="w-full" />
      ))}
    </div>
  )
}
