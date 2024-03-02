export enum sortType {
  asc = "+",
  desc = "-",
}

export type sortTypeValues = (typeof sortType)[keyof typeof sortType];

export enum MessageTypes {
  chat = "chat",
  history = "history",
  appeal = "appeal",
  transaction = "transaction",
  message = "message",
  rejected_sentence = "rejected_sentence",
  proper_nouns = "proper_nouns",
}

interface IMessageNotification {
  datetime: Date;
  message: string;
  seen: boolean;
  type: MessageTypes.chat;
  user: string;
}

export interface INotification<Type = any> {
  id: number;
  created_at: Date;
  is_seen: boolean;
  title: string;
  to_user: number;
  type: keyof typeof MessageTypes;
  value: Type;
}

export interface IQtyNotification {
  [MessageTypes.rejected_sentence]: number;
  [MessageTypes.message]: number;
  [MessageTypes.transaction]: number;
  [MessageTypes.appeal]: number;
  [MessageTypes.proper_nouns]: number;
}

export interface IUserAdmin {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
}
