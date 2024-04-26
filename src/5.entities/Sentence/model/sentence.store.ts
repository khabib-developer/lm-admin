import { create } from "zustand";
import { ChangeProperNounValueType, ISentenceStore } from "./type.store";
import {
  IOtherWord,
  IProperNoun,
  IQuantity,
  ISentence,
  sentenceStatus,
  sortSentence,
  typeOfSortSentence,
} from "../types";
import { sortType, sortTypeValues } from "../../../6.shared";
const initialQauntity = {
  [sentenceStatus.new]: 0,
  [sentenceStatus.other]: 0,
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
      let sentenceText = "";
      let otherWords: IOtherWord[] = [];
      if (state.sentenceId && sentence.status === sentenceStatus.other) {
        sentenceText = sentence.new_value
          .replaceAll("<r>", "")
          .replaceAll("</r>", "")
          .replaceAll("<x>", "")
          .replaceAll("</x>", "");
        sentence.new_value.split(" ").forEach((item, i) => {
          if (item.startsWith("<o>") && item.endsWith("</o>")) {
            otherWords.push({ id: i, word: item });
          }
        });
      }
      return {
        sentences: state.sentences.map((s) => {
          if (s.id === sentence.id) return sentence;
          return s;
        }),
        sentenceText,
        otherWords,
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
  setSentenceId: (sentenceId: null | number) => {
    set((state) => {
      let otherWords: IOtherWord[] = [];
      let sentenceText: string = "";
      if (sentenceId) {
        const sentence = state.sentences.find(
          (sentence) => sentence.id === sentenceId
        );
        sentenceText = sentence?.new_value || "";
        if (sentence?.status === sentenceStatus.other) {
          sentence.new_value.split(" ").forEach((item, i) => {
            if (item.startsWith("<o>") && item.endsWith("</o>")) {
              otherWords.push({ id: i, word: item });
            }
          });
          sentenceText =
            sentence?.new_value
              .replaceAll("<r>", "")
              .replaceAll("</r>", "")
              .replaceAll("<x>", "")
              .replaceAll("</x>", "") || "";
        }
      }
      return {
        sentenceId,
        otherWords,
        sentenceText,
      };
    });
  },
  deleteSentenceId: null,
  setDeleteSentenceId: (deleteSentenceId: null | number) =>
    set({ deleteSentenceId }),
  properNouns: [],
  setProperNouns: (properNouns: IProperNoun[]) => set({ properNouns }),
  changeProperNoun: <T extends keyof IProperNoun>(
    id: IProperNoun["id"],
    key: T,
    value: ChangeProperNounValueType<T>
  ) =>
    set((state) => ({
      properNouns: state.properNouns.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    })),
  otherWords: [],
  changeOtherWords: (id: number, word: string) => {
    set((state) => ({
      otherWords: state.otherWords.map((item) => {
        if (item.id === id) return { ...item, word };
        return item;
      }),
      sentenceText: state.sentenceText
        .split(" ")
        .map((item, i) => {
          if (id === i) return `<o>${word}</o>`;
          return item;
        })
        .join(" "),
    }));
  },
  sentenceText: "",
  setSentenceText: (sentenceText: string) => {
    set((state) => {
      return {
        sentenceText,
        sentences: state.sentences.map((s) => {
          if (s.id === state.sentenceId)
            return {
              ...s,
              new_value: sentenceText,
            };
          return s;
        }),
      };
    });
  },
}));
