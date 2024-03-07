import { sortTypeValues } from "../../../6.shared";
import { IQuantity, ISentence, typeOfSortSentence } from "../types";

export interface ISentenceStore {
  sentences: ISentence[];
  setSentences: (sentences: ISentence[]) => void;
  updateSentence: (sentence: ISentence) => void;
  deleteSentence: (quantityKey: keyof IQuantity) => void;
  quantity: IQuantity;
  setQuantity: (quantity: IQuantity) => void;
  sortBy: typeOfSortSentence;
  sortKeyword: sortTypeValues;
  setSort: (sortBy: typeOfSortSentence, sortKeyword: sortTypeValues) => void;
  sentenceId: null | number;
  setSentenceId: (sentenceId: number | null) => void;
  deleteSentenceId: number | null;
  setDeleteSentenceId: (id: number | null) => void;
}
