import { useRecoilState } from "recoil"
import { Button } from "@/shared/ui"
import { cn } from "@/shared/lib"
import { directionState } from "@/features/elements/model/atoms"

export const AlignmentControls = () => {
  const setDirection = useRecoilState(directionState)[1]

  const toggleAlign = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id as "row" | "col"
    setDirection(id)
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
    </section>
  )
}
