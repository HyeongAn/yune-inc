import { Layout } from "@/widgets/layouts/ui/main"
import { Elements } from "@/features/elements"
import { useRecoilValue } from "recoil"
import { elementsState } from "@/entities/element"

export const MainPage = () => {
  const elements = useRecoilValue(elementsState)

  return (
    <Layout>
      <Elements elements={elements} />
    </Layout>
  )
}
