import { create } from "zustand";
import { IGlobalVariables, IVariablestore } from "./types.store";

export const useVariablesStore = create<IVariablestore>((set) => ({
  globalVariable: null,

  setGlobalVariable: (globalVariable: null | IGlobalVariables) =>
    set({ globalVariable }),

  updateGlobalVariable: (key: keyof IGlobalVariables, value: number) =>
    set((state) => {
      return {
        globalVariable: {
          ...state.globalVariable!,
          [key]: value,
        },
      };
    }),
}));
