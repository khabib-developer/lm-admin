import { create } from "zustand";
import { ITrasactionStore } from "./type.store";
import { ITransaction, updateTransactionStatus } from "../types";

export const useTransactionStore = create<ITrasactionStore>((set) => ({
  transactions: [],
  count: 0,
  setTransactions: (transactions: ITransaction[], count: number = 0) =>
    set({ transactions, count }),
  updateTransaction: (transaction: ITransaction) =>
    set((state) => {
      const transactions = state.transactions.map((tr) => {
        if (tr.id === transaction.id) return transaction;
        return tr;
      });
      return { transactions };
    }),
  transactionId: null,
  transactionStatus: null,
  setTransactionData: (
    transactionId: null | number = null,
    transactionStatus: updateTransactionStatus | null = null
  ) => set({ transactionId, transactionStatus }),
  searchValue: "",
  setSearchValue(searchValue) {
    set({ searchValue });
  },
}));
