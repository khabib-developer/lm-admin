import { create } from "zustand";
import { ITerm, ITermsStore } from "./type.store";

export const useTermsStore = create<ITermsStore>((set) => ({
  deleteTermId: null,
  setDeleteTermId: (deleteTermId) => set({ deleteTermId }),
  terms: [],
  setTerms: (terms: ITerm[]) => set({ terms }),
  addTerm: (term: ITerm) =>
    set((state) => {
      return {
        terms: [term, ...state.terms],
      };
    }),
  updateTerm: (term: ITerm) =>
    set((state) => {
      return {
        terms: state.terms.map((t) => {
          if (t.id === term.id) return term;
          return t;
        }),
      };
    }),
  deleteTerm: (id: number) =>
    set((state) => ({ terms: state.terms.filter((term) => term.id !== id) })),
}));
