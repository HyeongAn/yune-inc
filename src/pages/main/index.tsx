import { useRecoilValue } from "recoil"
import { Layout } from "@/widgets/layouts"
import { Header } from "@/widgets"
import { Elements, elementsState } from "@/features/elements"
import { cn } from "@/shared/lib"
import { useDownloadAsSvg } from "@/shared/model"

export const MainPage = () => {
  const elements = useRecoilValue(elementsState)

  const { ref, downloadAsPng } = useDownloadAsSvg()

  return (
    <Layout>
      <Header downloadAsSvg={downloadAsPng} />
      <div ref={ref} className={cn("flex flex-nowrap gap-2 bg-slate-100 p-2")}>
        <Elements elements={elements} />
      </div>
    </Layout>
  )
}
