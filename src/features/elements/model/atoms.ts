import { Elements } from "@/entities/element"
import { atom } from "recoil"

export const selectedIdState = atom<string[]>({
  key: "selectedIdState",
  default: [],
})
export const directionState = atom<"row" | "col">({
  key: "directionState",
  default: "row",
})

export const elementsState = atom<Elements>({
  key: "elementsState",
  default: [],
})
