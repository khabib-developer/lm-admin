import { sortType } from "../../../6.shared";
import { IProperNoun } from "../types";

export interface IProperNounStore {
  properNouns: IProperNoun[];
  setProperNouns: (properNouns: IProperNoun[]) => void;
  deleteProperNoun: (id: number) => void;
  updateProperNoun: (id: number, properNoun: string) => void;
}
