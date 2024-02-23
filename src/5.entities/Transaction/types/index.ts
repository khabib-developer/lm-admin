export interface ITransaction {
  id: number;
  verify_score: number;
  gift: number;
  amount: number;
  status: keyof typeof transactionStatus;
  description?: string;
  created_at: Date;
  updeted_at: Date;
  user: number;
  receipe: IReceipe;
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

export enum sortKeys {
  amount = "amount",
  created_at = "created_at",
}

export type typeOfSortKeys = keyof typeof sortKeys;
