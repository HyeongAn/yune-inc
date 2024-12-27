import { useRecoilState } from "recoil"
import { Button } from "@/shared/ui"
import { cn } from "@/shared/lib"
import { directionState } from "@/features/elements/model/atoms"
import { useGroupAlign } from "../model/hooks"

export const AlignmentControls = () => {
  const setDirection = useRecoilState(directionState)[1]
  const { alignHandler } = useGroupAlign()

  const toggleAlign = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id as "row" | "col"

    if (id === "row" || id === "col") {
      setDirection(id)
    } else {
      const direction = id === "groupRow" ? "row" : "col"
      alignHandler(direction)
    }
  }

  return (
    <section className={cn("flex flex-col gap-2 bg-gray-700 p-2")}>
      <h3 className={cn("text-white")}>Align</h3>
      <Button id="row" onClick={toggleAlign}>
        row
      </Button>
      <Button id="col" onClick={toggleAlign}>
        column
      </Button>
      <Button id="groupRow" onClick={toggleAlign}>
        Group Row
      </Button>
      <Button id="groupCol" onClick={toggleAlign}>
        Group Column
      </Button>
    </section>
  )
}
