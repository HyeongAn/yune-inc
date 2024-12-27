import { useRecoilValue } from "recoil"
import { Layout } from "@/widgets/layouts"
import { Header } from "@/widgets"
import { directionState, Elements } from "@/features/elements"
import { elementsState } from "@/entities/element"

export const MainPage = () => {
  const elements = useRecoilValue(elementsState)

  return (
    <Layout>
      <Elements elements={elements} />
    </Layout>
  )
}
