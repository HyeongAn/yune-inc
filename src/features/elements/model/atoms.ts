import { atom } from "recoil"

export const selectedIdState = atom<string[]>({
  key: "selectedIdState",
  default: [],
})
export const directionState = atom<"row" | "col">({
  key: "directionState",
  default: "row",
})
