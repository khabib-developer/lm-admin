import { IUserItem } from "../../User/types";

export interface IUserChat extends Omit<IUserItem, "score" | "transaction"> {
  messages: IMessage[];
}

export interface IMessage {
  id: number;
  receiver: number;
  sender: number;
  message: string;
  seen: boolean;
  timestamp: Date;
}

export interface IScrollOffsets {
  [key: number]: number;
}
