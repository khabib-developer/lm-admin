import { create } from "zustand";
import { ITrasactionStore } from "./type.store";
import { ITransaction } from "../types";

export const useUsersStore = create<ITrasactionStore>((set) => ({
  transactions: [],
  setTransactions: (transactions: ITransaction[]) => set({ transactions }),
}));
