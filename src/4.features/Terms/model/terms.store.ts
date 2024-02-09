import { create } from "zustand";
import { ITermsStore } from "./type.store";

export const useTermsStore = create<ITermsStore>((set) => ({
  terms: "",
  setTerms: (terms: string) => set({ terms }),
}));
