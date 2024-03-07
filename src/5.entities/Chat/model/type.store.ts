import { IMessage, IScrollOffsets, IUserChat } from "../types";

export interface IChatStore {
  userList: IUserChat[];

  setUserList: (userList: IUserChat[]) => void;

  addMessage: (userId: number, message: IMessage) => void;

  modifyAppealStatus: (userId: number, messageId: number) => void;

  scrollOffsets: Partial<IScrollOffsets>;
  setScrollOffsets: (id: number, scrollOffset: number) => void;

  userId: number | null;
  setUserId: (userId: number | null) => void;

  permission: boolean;
  setPermission: (permission: boolean) => void;

  typedMessage: string;
  setTypedMessage: (message: string) => void;
}
