import { create } from "zustand";
import { IProperNounStore } from "./type.store";
import { IProperNoun } from "../types";

export const useProperNounStore = create<IProperNounStore>((set) => ({
  properNouns: [{ id: 1, text: "string" }],
  setProperNouns: (properNouns: IProperNoun[]) => set({ properNouns }),
  deleteProperNoun: (id: number) =>
    set((store) => {
      return {
        properNouns: [
          ...store.properNouns.filter((properNoun) => properNoun.id !== id),
        ],
      };
    }),
  updateProperNoun: (id: number, text: string) =>
    set((store) => {
      const item = store.properNouns.find(
        (properNoun) => properNoun.id === id
      )!;
      const excludeItem = store.properNouns.filter(
        (properNoun) => properNoun.id !== id
      );
      return {
        properNouns: [...excludeItem, { ...item, text }],
      };
    }),
}));
