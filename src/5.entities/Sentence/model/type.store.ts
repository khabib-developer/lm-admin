import { IQuantity, ISentence } from "../types";

export interface ISentenceStore {
  sentences: ISentence[];
  setSentences: (sentences: ISentence[]) => void;
  quantity: IQuantity;
  setQuantity: (quantity: IQuantity) => void;
}
