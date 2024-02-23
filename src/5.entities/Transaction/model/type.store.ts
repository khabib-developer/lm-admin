import { ITransaction } from "../types";

export interface ITrasactionStore {
  transactions: ITransaction[];
  setTransactions: (transactions: ITransaction[]) => void;
}
