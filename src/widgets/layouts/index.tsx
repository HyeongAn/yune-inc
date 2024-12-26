import { Header } from "@/widgets/header"
import { Sidebar } from "@/widgets/sidebar"
import { PropsWithChildren } from "react"

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex h-full w-full">
      <Sidebar />
      <div className="h-full w-full">
        <Header />
        {children}
      </div>
    </main>
  )
}
