import { create } from "zustand";
import { ISentenceStore } from "./type.store";
import { IQuantity, ISentence, sentenceStatus } from "../types";
const initialQauntity = {
  [sentenceStatus.new]: 0,
  [sentenceStatus.processing]: 0,
  [sentenceStatus.waiting]: 0,
  [sentenceStatus.wrong]: 0,
  [sentenceStatus.done]: 0,
  [sentenceStatus.mock]: 0,
};

export const useSentenceStore = create<ISentenceStore>((set) => ({
  sentences: [],
  setSentences: (sentences: ISentence[]) => set({ sentences }),
  quantity: initialQauntity,
  setQuantity: (quantity: IQuantity) => set({ quantity }),
}));
