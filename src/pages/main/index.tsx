import { useRecoilValue } from "recoil"
import { Layout } from "@/widgets/layouts"
import { Header } from "@/widgets"
import { directionState, Elements } from "@/features/elements"
import { elementsState } from "@/entities/element"
import { cn } from "@/shared/lib"
import { useDownloadAsSvg } from "@/shared/model"

export const MainPage = () => {
  const elements = useRecoilValue(elementsState)
  const direction = useRecoilValue(directionState)
  const { ref, downloadAsPng } = useDownloadAsSvg()

  return (
    <Layout>
      <Header downloadAsSvg={downloadAsPng} />
      <div
        ref={ref}
        className={cn("flex flex-nowrap gap-2 bg-slate-100 p-2", direction === "row" ? "flex-row" : "flex-col")}
      >
        <Elements elements={elements} />
      </div>
    </Layout>
  )
}
