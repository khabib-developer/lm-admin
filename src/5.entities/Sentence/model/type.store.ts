import { sortTypeValues } from "../../../6.shared";
import {
  IProperNoun,
  IQuantity,
  ISentence,
  typeOfSortSentence,
} from "../types";

export type ChangeProperNounValueType<T extends keyof IProperNoun> =
  IProperNoun[T];

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
  properNouns: IProperNoun[];
  setProperNouns: (properNouns: IProperNoun[]) => void;
  changeProperNoun: <T extends keyof IProperNoun>(
    id: IProperNoun["id"],
    key: T,
    value: ChangeProperNounValueType<T>
  ) => void;
}
