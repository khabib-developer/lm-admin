import { create } from "zustand";
import { IAppStore } from "./type.store";

export const useAppStore = create<IAppStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => {
    return set({ loading });
  },
  error: null,
  setError: (error: string | null) => set({ error }),
  info: null,
  setInfo: (info: string | null) => set({ info }),
  modal: false,
  setModal: (modal: boolean) => set({ modal }),
}));
