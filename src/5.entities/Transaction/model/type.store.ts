import { ITransaction, updateTransactionStatus } from "../types";

export interface ITrasactionStore {
  transactions: ITransaction[];
  count: number;
  setTransactions: (transactions: ITransaction[], count: number) => void;
  updateTransaction: (transactions: ITransaction) => void;
  transactionId: number | null;
  transactionStatus: updateTransactionStatus | null;
  setTransactionData: (
    transactionId?: number | null,
    transactionStatu?: updateTransactionStatus | null
  ) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}
