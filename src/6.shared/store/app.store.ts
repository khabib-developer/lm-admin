import { create } from "zustand";
import { IAppStore } from "./type.store";
import { IQtyNotification, IUserAdmin, MessageTypes } from "../types";

export const initialNotificationQuantity: IQtyNotification = {
  [MessageTypes.rejected_sentence]: 0,
  [MessageTypes.message]: 0,
  [MessageTypes.transaction]: 0,
  [MessageTypes.appeal]: 0,
  [MessageTypes.proper_nouns]: 0,
};
export const useAppStore = create<IAppStore>((set) => ({
  user: null,
  setUser: (user: IUserAdmin | null) => set({ user }),
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
  cookie: "",
  setCookie: (cookie: string) => set({ cookie }),
  notifications: [],
  setNotifications(notifications) {
    return set({ notifications });
  },
}));
