import { PropsWithChildren } from "react"
import { RecoilRoot } from "recoil"

export const RecoilProvider = ({ children }: PropsWithChildren) => {
  return <RecoilRoot>{children}</RecoilRoot>
}
