import { IUserAdmin } from "../../../6.shared";

export interface ITransaction {
  id: number;
  verify_score: number;
  gift: number;
  amount: number;
  status: keyof typeof transactionStatus;
  description?: string;
  created_at: Date;
  updated_at: Date;
  user: IUserAdmin;
  receipt: IReceipe;
}

interface IReceipe {
  id: number;
  url: string;
}

export enum transactionStatus {
  pending = "pending",
  rejected = "rejected",
  paid = "paid",
}

export type typeofTransactionStatus = keyof typeof transactionStatus;

export type updateTransactionStatus = Omit<
  typeofTransactionStatus,
  transactionStatus.pending
>;

export enum sortKeys {
  amount = "amount",
  created_at = "created_at",
}

export type typeOfSortKeys = keyof typeof sortKeys;
