import { create } from "zustand";
import { ISentenceStore } from "./type.store";
import {
  IQuantity,
  ISentence,
  sentenceStatus,
  sortSentence,
  typeOfSortSentence,
} from "../types";
import { sortType, sortTypeValues } from "../../../6.shared";
const initialQauntity = {
  [sentenceStatus.new]: 0,
  [sentenceStatus.has_proper_noun]: 0,
  [sentenceStatus.processing]: 0,
  [sentenceStatus.waiting]: 0,
  [sentenceStatus.wrong]: 0,
  [sentenceStatus.done]: 0,
  [sentenceStatus.mock]: 0,
};

export const useSentenceStore = create<ISentenceStore>((set) => ({
  sentences: [],
  setSentences: (sentences: ISentence[]) => set({ sentences }),
  updateSentence: (sentence: ISentence) =>
    set((state) => {
      return {
        sentences: state.sentences.map((s) => {
          if (s.id === sentence.id) return sentence;
          return s;
        }),
      };
    }),
  deleteSentence: (quantityKey: keyof IQuantity) =>
    set((state) => ({
      sentences: [
        ...state.sentences.filter(
          (sentence) => sentence.id !== state.deleteSentenceId
        ),
      ],
      deleteSentenceId: null,
      sentenceId: null,
      quantity: {
        ...state.quantity,
        [quantityKey]: state.quantity[quantityKey] - 1,
      },
    })),

  quantity: initialQauntity,
  setQuantity: (quantity: IQuantity) => set({ quantity }),
  sortBy: sortSentence.Created,
  sortKeyword: sortType.asc,
  setSort: (sortBy: typeOfSortSentence, sortKeyword: sortTypeValues) =>
    set({ sortBy, sortKeyword }),
  sentenceId: null,
  setSentenceId: (sentenceId: null | number) => set({ sentenceId }),
  deleteSentenceId: null,
  setDeleteSentenceId: (deleteSentenceId: null | number) =>
    set({ deleteSentenceId }),
}));
