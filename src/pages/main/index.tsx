import { useRecoilValue } from "recoil"
import { elementsState } from "@/features/elements"
import { Layout } from "@/widgets/layouts"
import { Elements } from "@/features/elements"

export const MainPage = () => {
  const elements = useRecoilValue(elementsState)

  return (
    <Layout>
      <Elements elements={elements} />
    </Layout>
  )
}
