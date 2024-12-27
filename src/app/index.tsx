import { MainPage } from "@/pages/main"
import { RecoilProvider } from "@/app/providers"
import "@/shared/styles/index.css"

const App = () => {
  return (
    <RecoilProvider>
      <MainPage />
    </RecoilProvider>
  )
}

export default App
