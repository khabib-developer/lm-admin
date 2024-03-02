import { IMessage, IScrollOffsets, IUserChat } from "../types";

export interface IChatStore {
  userList: IUserChat[];

  setUserList: (userList: IUserChat[]) => void;

  addMessage: (userId: number, message: IMessage) => void;

  scrollOffsets: Partial<IScrollOffsets>;
  setScrollOffsets: (id: number, scrollOffset: number) => void;

  userId: number | null;
  setUserId: (userId: number | null) => void;
}
