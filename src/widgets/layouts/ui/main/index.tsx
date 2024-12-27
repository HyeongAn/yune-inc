import { PropsWithChildren } from "react"
import { Sidebar } from "@/widgets/sidebar"

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex h-full w-full">
      <Sidebar />
      <div className="h-full w-full overflow-x-auto">{children}</div>
    </main>
  )
}
