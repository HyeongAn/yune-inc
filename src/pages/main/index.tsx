import { Layout } from "@/widgets/layouts/ui/main"
import { Elements } from "@/features/elements"
import { useRecoilValue } from "recoil"
import { elementsState } from "@/entities/element"
import { cn } from "@/shared/lib"
import { directionState } from "@/features/elements/model/atoms"

export const MainPage = () => {
  const elements = useRecoilValue(elementsState)
  const direction = useRecoilValue(directionState)

  return (
    <Layout>
      <div className={cn("flex flex-nowrap gap-2", direction === "row" ? "flex-row" : "flex-col")}>
        <Elements elements={elements} />
      </div>
    </Layout>
  )
}
