import { atom } from "recoil"
import { Elements } from "./types"

export const elementsState = atom<Elements>({
  key: "elementsState",
  default: [],
})
